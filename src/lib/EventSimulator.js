function simulateKeyEvent(eventType, key) {
  var event = new KeyboardEvent(eventType, {
    bubbles: true,
    cancelable: true,
    key: key,
    code: key === " " ? "Space" : key,
    keyCode: key === " " ? 32 : key.charCodeAt(0),
    which: key === " " ? 32 : key.charCodeAt(0),
  });
  document.dispatchEvent(event);
}
export function ArrowLeftKeyDown(e) {
  simulateKeyEvent("keydown", "ArrowLeft");
}
export function ArrowLeftKeyUp(e) {
  simulateKeyEvent("keyup", "ArrowLeft");
}
export function ArrowRightKeyDown(e) {
  simulateKeyEvent("keydown", "ArrowRight");
}
export function ArrowRightKeyUp(e) {
  simulateKeyEvent("keyup", "ArrowRight");
}
export function ArrowUpKeyDown(e) {
  simulateKeyEvent("keydown", "ArrowUp");
}
export function ArrowUpKeyUp(e) {
  simulateKeyEvent("keyup", "ArrowUp");
}
export function ArrowDownKeyDown(e) {
  simulateKeyEvent("keydown", "ArrowDown");
}
export function ArrowDownKeyUp(e) {
  simulateKeyEvent("keyup", "ArrowDown");
}
export function SpaceKeyDown(e) {
  simulateKeyEvent("keydown", " ");
}
export function SpaceKeyUp(e) {
  simulateKeyEvent("keyup", " ");
}
