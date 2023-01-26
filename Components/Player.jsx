import { RigidBody, useRapier } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import useGame from "../lib/useGame";
export default function Player() {
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const body = useRef();
  const { rapier, world } = useRapier();
  const start = useGame((state) => state.start);
  const restart = useGame((state) => state.restart);
  const end = useGame((state) => state.end);
  const blockCount = useGame((state) => state.blocksCount);
  const rapierWorld = world.raw();
  const [smoothedCameraPosition] = useState(
    () => new THREE.Vector3(10, 10, 10)
  );
  const reset = () => {
    body.current.setTranslation({ x: 0, y: 1, z: 0 });
    body.current.setLinvel({ x: 0, y: 0, z: 0 });
    body.current.setAngvel({ x: 0, y: 0, z: 0 });
  };
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());
  useEffect(() => {
    const unsubScribeReset = useGame.subscribe(
      (state) => state.phase,
      (value) => {
        if (value === "ready") {
          reset();
        }
      }
    );
    const unsubscribeJump = subscribeKeys(
      //selector
      (state) => state.jump,
      (value) => {
        if (value) {
          jump();
        }
      }
    );
    const unsubscribeAny = subscribeKeys(() => {
      start();
    });
    return () => {
      unsubscribeJump();
      unsubscribeAny();
      unsubScribeReset();
    };
  }, []);

  useFrame((state, delta) => {
    /**
     * control
     */
    const { forward, backward, leftward, rightward } = getKeys();
    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };
    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;
    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }
    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }
    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }
    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }
    body.current.applyImpulse(impulse);
    body.current.applyTorqueImpulse(torque);
    /**
     * camera
     */
    const bodyPosition = body.current.translation();
    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(bodyPosition);
    cameraPosition.z += 2.25;
    cameraPosition.y += 0.65;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(bodyPosition);
    cameraTarget.y += 0.25;
    smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta);
    state.camera.position.copy(smoothedCameraPosition);
    state.camera.lookAt(smoothedCameraTarget);
    /**
     * Phases
     */
    if (bodyPosition.z < -(blockCount * 4 + 2)) {
      end();
    }
    if (bodyPosition.y < -4) {
      restart();
    }
  });
  function jump() {
    const origin = body.current.translation();
    origin.y -= 0.31;
    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, direction);
    const { toi } = rapierWorld.castRay(ray, 10, true);
    if (toi < 0.15) {
      body.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
    }
  }
  return (
    <>
      <RigidBody
        ref={body}
        colliders="ball"
        restitution={0.2}
        friction={1}
        position={[0, 1, 0]}
        linearDamping={0.5}
        angularDamping={0.5}
      >
        <mesh castShadow>
          <icosahedronGeometry args={[0.3, 2]} />
          <meshStandardMaterial flatShading color="mediumpurple" />
        </mesh>
      </RigidBody>
    </>
  );
}
