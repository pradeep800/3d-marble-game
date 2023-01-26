import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { addEffect } from "@react-three/fiber";
import useGame from "../lib/useGame";

export default function Interface() {
  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);

  const time = useRef();
  const { forward, backward, leftward, rightward, jump } = useKeyboardControls(
    (state) => state
  );
  useEffect(() => {
    const unsub = addEffect(() => {
      let elapsedTime = 0;
      const state = useGame.getState();
      if (state.phase === "playing") elapsedTime = Date.now() - state.startTime;
      else if (state.phase === "ended")
        elapsedTime = state.endTime - state.startTime;
      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2);
      if (time.current) time.current.textContent = elapsedTime;
    });
    return unsub;
  }, []);
  return (
    <div className="interface">
      {/*Time */}
      <div ref={time} className="time">
        0.00
      </div>
      {/*Restart*/}
      {phase === "ended" && (
        <div className="restart" onClick={restart}>
          RESTART
        </div>
      )}

      {/* Controls */}
      <div className="controls">
        <div className="raw">
          <div className={`key ${forward ? "active" : ""}`}></div>
        </div>
        <div className="raw">
          <div className={`key ${leftward ? "active" : ""}`}></div>
          <div className={`key ${backward ? "active" : ""}`}></div>
          <div className={`key ${rightward ? "active" : ""}`}></div>
        </div>
        <div className="raw">
          <div className={`key ${jump ? "active" : ""} large`}></div>
        </div>
      </div>
    </div>
  );
}
