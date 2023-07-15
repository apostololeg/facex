import { useState } from 'react';
import { Button, RouterStore, Container } from '@homecode/ui';

import useFaceLandmarks from 'hooks/useFaceLandmarks';
import Face from 'components/Face/Face';

import S from './Home.styl';

export default function Home() {
  const [points, setPoints] = useState(new Float32Array());

  useFaceLandmarks(points => setPoints(new Float32Array(points)));

  return (
    <Container size="l" className={S.root}>
      {/* <Face className={S.face} points={points} /> */}

      <Button
        size="l"
        className={S.startButton}
        onClick={() => RouterStore.go('/call')}
      >
        Open connection
      </Button>
    </Container>
  );
}
