import { useEffect, useRef } from 'react';
import cn from 'classnames';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BufferAttribute,
  BufferGeometry,
  DoubleSide,
  Mesh,
  MeshPhongMaterial,
  PointLight,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import triangulation from './triangulation';
import S from './Face.styl';

type Props = {
  className?: string;
  points?: Float32Array;
  onData?: (data: object) => void;
};

function getScene(canvas) {
  const scene = new Scene();
  const { clientHeight: height, clientWidth: width } = canvas;
  const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
  const light = new PointLight(0xffffff, 1, 50);
  const renderer = new WebGLRenderer({ canvas, alpha: true });
  const controls = new OrbitControls(camera, renderer.domElement);

  light.position.set(10, 10, 10);
  scene.add(light);
  controls.update();

  renderer.setSize(width, height);

  return { scene, camera, renderer };
}

function getObject(scene) {
  const geometry = new BufferGeometry();
  const material = new MeshPhongMaterial({
    color: '#0f0',
    flatShading: true,
    side: DoubleSide,
  });
  const mesh = new Mesh(geometry, material);

  geometry.setIndex(new BufferAttribute(new Uint16Array(triangulation), 1));

  mesh.scale.set(0.05, 0.05, 0.05);
  mesh.position.set(-16, 14, -8);
  mesh.rotation.set(3, 0, 0);

  scene.add(mesh);

  return { geometry, material };
}

export default function Face({ className, points }: Props) {
  const canvas = useRef(null);
  const obj = useRef({ inited: false });
  const o = obj.current;

  useEffect(() => {
    Object.assign(o, getScene(canvas.current));
    Object.assign(o, getObject(o.scene));
  }, []);

  useEffect(() => {
    const { geometry, scene, camera, renderer } = o;

    if (points?.byteLength) {
      geometry.setAttribute('position', new BufferAttribute(points, 3));
      renderer.render(scene, camera);
    }
  }, [points]);

  return <canvas className={cn(className, S.root)} ref={canvas} />;
}
