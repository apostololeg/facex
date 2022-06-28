import { useCallback, useEffect, useMemo, useRef } from 'react';
import cn from 'classnames';

import Renderer from 'workers/offscreenFaceRenderer.worker';
import S from './Face.styl';

type Props = {
  className?: string;
  points?: Float32Array;
  onData?: (data: object) => void;
};

export default function Face({ className, points }: Props) {
  const worker = useMemo(() => new Renderer(), []);

  const onCanvasRef = useCallback(elem => {
    if (!elem) return;
    console.log('onCanvasRef');

    const { clientHeight: height, clientWidth: width } = elem;
    const canvas = elem.transferControlToOffscreen();

    // @ts-ignore
    worker.postMessage({ canvas, height, width }, [canvas]);
  }, []);

  useEffect(() => {
    if (points?.byteLength) worker.postMessage({ points });
  }, [points]);

  return <canvas className={cn(className, S.root)} ref={onCanvasRef} />;
}
