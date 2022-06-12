import { useCallback, useEffect, useState } from 'react';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import { setWasmPaths } from '@tensorflow/tfjs-backend-wasm';
import '@tensorflow/tfjs-backend-webgl';
import Time from 'timen';

import wasmSimdPath from '@tensorflow/tfjs-backend-wasm/dist/tfjs-backend-wasm-simd.wasm';
import wasmSimdThreadedPath from '@tensorflow/tfjs-backend-wasm/dist/tfjs-backend-wasm-threaded-simd.wasm';
import wasmPath from '@tensorflow/tfjs-backend-wasm/dist/tfjs-backend-wasm.wasm';

setWasmPaths({
  'tfjs-backend-wasm.wasm': wasmPath,
  'tfjs-backend-wasm-simd.wasm': wasmSimdPath,
  'tfjs-backend-wasm-threaded-simd.wasm': wasmSimdThreadedPath,
});

let video;
let detector;
let mounted;

async function initVideo() {
  if (!video) {
    video = document.createElement('video');
    video.srcObject = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
  }

  video.play();
}

async function initDetector() {
  if (detector) return;

  detector = await faceLandmarksDetection.createDetector(
    faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
    {
      runtime: 'mediapipe',
      solutionPath: '/face_mesh',
      refineLandmarks: true,
    }
  );
}

type Callback = (points: number[]) => void;

export default function useFaceLandmarks(onChange?: Callback) {
  const init = useCallback(async () => {
    await initVideo();
    if (!mounted) return;
    await initDetector();
    detect();
  }, []);

  const detect = useCallback(async () => {
    const face = await detector.estimateFaces(video, { flipHorizontal: true });

    if (!mounted) return;

    if (face[0]) {
      const { keypoints } = face[0];
      const points = [];

      for (let i = 0; i < keypoints.length; i++) {
        const p = keypoints[i];
        points.push(p.x, p.y, p.z);
      }

      onChange?.(points);
    }

    Time.after(30, detect);
  }, []);

  useEffect(() => {
    mounted = true;
    init();

    return () => {
      mounted = false;
      video.pause();
    };
  }, []);
}
