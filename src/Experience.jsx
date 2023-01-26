import { OrbitControls } from "@react-three/drei";
import { Debug, Physics } from "@react-three/rapier";
import Level from "../Components/Level";
import Lights from "../Components/Lights";

export default function Experience() {
  return (
    <>
      <OrbitControls makeDefault />
      <Physics>
        <Debug />
        <Lights />
        <Level />
      </Physics>
    </>
  );
}
