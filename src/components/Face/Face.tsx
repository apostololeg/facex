import { Canvas } from '@react-three/fiber';
import { BufferAttribute, BufferGeometry, DoubleSide } from 'three';

import triangulation from './triangulation';
// import S from './Face.styl';

type Props = {
  className?: string;
  points?: number[];
  onData?: (data: object) => void;
};

function buildGeometry(points) {
  const geometry = new BufferGeometry();

  geometry.setAttribute(
    'position',
    new BufferAttribute(new Float32Array(points), 3)
  );
  geometry.setIndex(new BufferAttribute(new Uint16Array(triangulation), 1));

  return geometry;
}

export default function Face({ className, points }: Props) {
  if (!points?.length) return null;

  return (
    <Canvas className={className}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh
        geometry={buildGeometry(points)}
        scale={0.05}
        position={[-16, 14, -8]}
        rotation={[3, 0, 0]}
      >
        <meshPhongMaterial color="green" flatShading side={DoubleSide} />
        <mesh position={[0, 0, 0]}>
          <boxGeometry attach="geometry" args={[50, 50, 50]} />
          <meshPhongMaterial attach="material" color="red" />
        </mesh>
      </mesh>
    </Canvas>
  );
}
