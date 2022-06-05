import { useCallback, useEffect, useState } from 'react';
import { Container, queryParams } from '@foreverido/uilib';
import { Peer } from 'peerjs';

import Face from 'components/Face/Face';
import useFaceLandmarks from 'hooks/useFaceLandmarks';

import S from './Call.styl';
import ShareId from './ShareId/ShareId';

const qParams = queryParams.parseQueryParams();

let peer;
let connection;

export default function Call() {
  const [id, setId] = useState(null);
  const [selfPoints, setSelfPoints] = useState([]);
  const [companionPoints, setCompanionPoints] = useState([]);

  const onPeerConnected = useCallback(conn => {
    connection = conn;
    console.log('peer connection', connection);

    connection.on('open', () => {
      console.log('connection open');
      connection.on('data', data => {
        console.log('data', data);
        setCompanionPoints(data.faceMesh);
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

  const onFaceLandmarksData = useCallback(faceMesh => {
    setSelfPoints(faceMesh);

    if (!connection) return;

    connection.send({ faceMesh });
  }, []);

  useFaceLandmarks(onFaceLandmarksData);

  return (
    <Container size="l" fullHeight className={S.root}>
      <Face className={S.selfFace} points={selfPoints} />
      <Face className={S.companionFace} points={companionPoints} />
      {id && <ShareId id={id} className={S.share} />}
    </Container>
  );
}
