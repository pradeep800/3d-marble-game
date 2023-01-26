import Bounds from "./Bounds";
import { useMemo } from "react";
import * as THREE from "three";
import AxeBlock from "./AxeBlock";
import EndBlock from "./EndBlock";
import LimboBlock from "./LimboBlock";
import SpinnerBlock from "./SpinnerBlock";
import StartBlock from "./StartBlock";

export default function Level({
  count = 5,
  types = [SpinnerBlock, AxeBlock, LimboBlock],
  seed = 0,
}) {
  const blocks = useMemo(() => {
    const blocks = [];
    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      blocks.push(type);
    }
    return blocks;
  }, [count, types, seed]);
  return (
    <>
      <StartBlock position={[0, 0, 0]} />
      {blocks.map((Block, index) => {
        return <Block key={index} position={[0, 0, -(index + 1) * 4]} />;
      })}
      <EndBlock position={[0, 0, -(count + 1) * 4]} />
      <Bounds length={count + 2} />
    </>
  );
}
