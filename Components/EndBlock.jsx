import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { boxGeometry } from "../lib/Geomatry";
import { floor1Material } from "../lib/Materials";
import { Text } from "@react-three/drei";
export default function EndBlock({ position = [0, 0, 0] }) {
  const { scene } = useGLTF("./hamburger.glb");
  scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });
  return (
    <group position={position}>
      <Text
        font="./babas-neue-v9-latin-regular.woff"
        scale={0.8}
        position={[0, 2.25, 2]}
      >
        FINISH
        <meshBasicMaterial toneMapped={false} />
      </Text>
      <mesh
        geometry={boxGeometry}
        material={floor1Material}
        position={[0, 0, 0]}
        scale={[4, -0.2, 4]}
        receiveShadow
      />
      <RigidBody
        type="fixed"
        colliders="hull"
        position={[0, 0.25, 0]}
        restitution={0}
        friction={0}
      >
        <primitive object={scene} scale={0.2}></primitive>
      </RigidBody>
    </group>
  );
}
