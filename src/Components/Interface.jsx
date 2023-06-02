import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { addEffect } from "@react-three/fiber";
import useGame from "../lib/useGame";
import {
  ArrowDownKeyDown,
  ArrowDownKeyUp,
  ArrowLeftKeyDown,
  ArrowLeftKeyUp,
  ArrowRightKeyDown,
  ArrowRightKeyUp,
  ArrowUpKeyDown,
  ArrowUpKeyUp,
  SpaceKeyDown,
  SpaceKeyUp,
} from "../lib/EventSimulator";

export default function Interface() {
  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);
  const highScoreElement = useRef();
  const time = useRef();
  const { forward, backward, leftward, rightward, jump } = useKeyboardControls(
    (state) => state
  );
  useEffect(() => {
    let highScoreTime = localStorage.getItem("highScore");
    if (highScoreTime) {
      highScoreElement.current.textContent =
        "HighScore : " + (highScoreTime / 1000).toFixed(2);
    }
    const unsub = addEffect(() => {
      let elapsedTime = 0;
      const state = useGame.getState();
      if (state.phase === "playing") elapsedTime = Date.now() - state.startTime;
      else if (state.phase === "ended") {
        const score = parseInt(localStorage.getItem("highScore"));

        elapsedTime = state.endTime - state.startTime;
        if (score > elapsedTime || isNaN(score)) {
          localStorage.setItem("highScore", elapsedTime);
          highScoreElement.current.textContent =
            "HighScore : " + (elapsedTime / 1000).toFixed(2);
        }
      }

      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2);

      if (time.current) time.current.textContent = elapsedTime;
    });
    return unsub;
  }, []);
  return (
    <div className="interface">
      {/*High Score*/}
      <div ref={highScoreElement} className="highScore">
        HighScore : NA
      </div>
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
        <div
          onPointerUp={ArrowUpKeyUp}
          onPointerDown={ArrowUpKeyDown}
          onPointerLeave={ArrowUpKeyUp}
          className="raw"
        >
          <div className={`key ${forward ? "active" : ""}`}></div>
        </div>
        <div className="raw">
          <div
            onPointerUp={ArrowLeftKeyUp}
            onPointerDown={ArrowLeftKeyDown}
            onPointerLeave={ArrowLeftKeyUp}
            className={`key ${leftward ? "active" : ""}`}
          ></div>
          <div
            onPointerUp={ArrowDownKeyUp}
            onPointerDown={ArrowDownKeyDown}
            onPointerLeave={ArrowDownKeyUp}
            className={`key ${backward ? "active" : ""}`}
          ></div>
          <div
            onPointerUp={ArrowRightKeyUp}
            onPointerDown={ArrowRightKeyDown}
            onPointerLeave={ArrowRightKeyUp}
            className={`key ${rightward ? "active" : ""}`}
          ></div>
        </div>
        <div className="raw">
          <div
            onPointerUp={SpaceKeyUp}
            onPointerDown={SpaceKeyDown}
            onPointerLeave={SpaceKeyUp}
            className={`key ${jump ? "active" : ""} large`}
          ></div>
        </div>
      </div>
    </div>
  );
}
