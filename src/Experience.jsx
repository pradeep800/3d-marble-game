import { OrbitControls } from "@react-three/drei";
import { Debug, Physics } from "@react-three/rapier";
import Level from "./Components/Level";
import Lights from "./Components/Lights";
import Player from "./Components/Player";
import useGame from "./lib/useGame";

export default function Experience() {
  const blockCount = useGame((state) => state.blocksCount);
  const blockSeed = useGame((state) => state.blocksSeed);

  return (
    <>
      <color args={["#bdedfc"]} attach="background" />
      <OrbitControls makeDefault />
      <Physics>
        {/* <Debug /> */}
        <Lights />
        <Level count={blockCount} seed={blockSeed} />
        <Player />
      </Physics>
    </>
  );
}
