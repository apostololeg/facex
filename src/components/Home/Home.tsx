import { Button, RouterStore, Container } from '@foreverido/uilib';

import useFaceLandmarks from 'hooks/useFaceLandmarks';
import Face from 'components/Face/Face';

import S from './Home.styl';
import { useState } from 'react';

export default function Home() {
  const [points, setPoints] = useState([]);

  useFaceLandmarks(setPoints);

  return (
    <Container size="l" className={S.root}>
      <Face className={S.face} points={points} />

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
