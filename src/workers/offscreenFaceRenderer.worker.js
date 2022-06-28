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

import triangulation from '../components/Face/triangulation';

const scene = new Scene();
const light = new PointLight(0xffffff, 1, 50);
const geometry = new BufferGeometry();
const material = new MeshPhongMaterial({
  color: '#0f0',
  flatShading: true,
  side: DoubleSide,
});
const mesh = new Mesh(geometry, material);

let camera;
let renderer;

function init({ canvas, height, width }) {
  camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
  renderer = new WebGLRenderer({ canvas, alpha: true });

  geometry.setIndex(new BufferAttribute(new Uint16Array(triangulation), 1));

  mesh.scale.set(0.05, 0.05, 0.05);
  mesh.position.set(-16, 14, -8);
  mesh.rotation.set(3, 0, 0);

  light.position.set(10, 10, 10);

  scene.add(light, mesh);

  renderer.setSize(width, height, false);
}

onmessage = function onMessage({ data }) {
  if (data.canvas) {
    init(data);
  } else {
    geometry.setAttribute('position', new BufferAttribute(data.points, 3));
    renderer.render(scene, camera);
  }
};
