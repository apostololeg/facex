import { useCallback, useEffect, useState } from 'react';
import { Container, queryParams } from '@homecode/ui';
import { Peer } from 'peerjs';
// import pako from 'pako';
// import fi from 'fastintcompression';

import Face from 'components/Face/Face';
import useFaceLandmarks from 'hooks/useFaceLandmarks';

import S from './Call.styl';
import ShareId from './ShareId/ShareId';

const qParams = queryParams.parseQueryParams();

let peer;
let connection;

let lastReveivedTime = Date.now();
const dataReceivedTime = [0, 0, 0, 0, 0];

function packPoints(points: number[]) {
  // const arr = pako.inflate(data.faceMesh);
  // const arr = fi.compressSigned(data.faceMesh);
  return new Int16Array(points.map(i => i * 10)).buffer;
}

function unpackPoints(points): number[] {
  return Array.from(new Int16Array(points)).map(i => i / 10);
}

export default function Call() {
  const [id, setId] = useState(null);
  const [selfPoints, setSelfPoints] = useState(new Float32Array());
  const [companionPoints, setCompanionPoints] = useState(new Float32Array());
  const [avgReceiveTime, setAvgReceiveTime] = useState(0);

  const onPeerConnected = useCallback(conn => {
    connection = conn;
    console.log('peer connection', connection);

    connection.on('open', () => {
      console.log('connection open');
      connection.on('data', async data => {
        console.log('on data', data);

        const d = Date.now();
        dataReceivedTime.pop();
        dataReceivedTime.unshift(d - lastReveivedTime);
        lastReveivedTime = d;
        const avg = Math.ceil(
          dataReceivedTime.reduce((acc, t) => acc + t, 0) /
            dataReceivedTime.length
        );

        setAvgReceiveTime(avg);

        setCompanionPoints(new Float32Array(unpackPoints(data.faceMesh)));
      });
    });
  }, []);

  useEffect(() => {
    peer = new Peer();

    peer.on('open', id => {
      console.log('peer open', id);

      if (qParams.id) {
        console.log(`connecting to "${qParams.id}"`);
        onPeerConnected(peer.connect(qParams.id));
      } else {
        setId(id);
        peer.on('connection', onPeerConnected);
      }
    });
  }, []);

  const onFaceLandmarksData = useCallback(async faceMesh => {
    setSelfPoints(new Float32Array(faceMesh));

    if (!connection) return;

    connection.send({
      // faceMesh: fi.uncompressSigned(faceMesh).map(i => i / 10),
      faceMesh: packPoints(faceMesh),
    });
  }, []);

  useFaceLandmarks(onFaceLandmarksData);

  return (
    <Container size="l" fullHeight className={S.root}>
      {/* <Face className={S.selfFace} points={selfPoints} /> */}
      {/* <Face
        className={S.companionFace}
        points={new Float32Array(companionPoints)}
      /> */}

      {id && !companionPoints.byteLength && (
        <ShareId id={id} className={S.share} />
      )}

      <div className={S.monitor}>
        {avgReceiveTime}
        <br />
        {connection?.bufferSize}
      </div>
    </Container>
  );
}
