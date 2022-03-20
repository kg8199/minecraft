/**
 * Update game is a function that gets called 60 times per second, we store the updates of the state of the game
 */

import { PointerLockControls } from "../models";

import { MOVING_SPEED } from "../constants";

const updateGame = (
  controls: PointerLockControls,
  pressedKeys: Set<string>
) => {
  // This algorithm will be executed at every frame, if a certain key is pressed -> move accordingly
  if (pressedKeys.has("w")) {
    controls.moveForward(MOVING_SPEED);
  }
  if (pressedKeys.has("a")) {
    controls.moveRight(-1 * MOVING_SPEED);
  }
  if (pressedKeys.has("s")) {
    controls.moveForward(-1 * MOVING_SPEED);
  }
  if (pressedKeys.has("d")) {
    controls.moveRight(MOVING_SPEED);
  }
};

export default updateGame;
