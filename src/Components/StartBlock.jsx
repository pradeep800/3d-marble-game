import { boxGeometry } from "../lib/Geomatry";
import { floor1Material } from "../lib/Materials";
import { Float, Text } from "@react-three/drei";
export default function StartBlock({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor1Material}
        position={[0, -0.1, 0]}
        scale={[4, -0.2, 4]}
        receiveShadow
      ></mesh>
      <Float>
        <Text
          font="./bebas-neue-v9-latin-regular.woff"
          maxWidth={0.25}
          lineHeight={0.75}
          textAlign="right"
          position={[0.75, 0.65, 0]}
          rotation-y={-0.25}
          scale={0.6}
        >
          Marble Race
          <meshBasicMaterial toneMapped={false} />
        </Text>
      </Float>
    </group>
  );
}
