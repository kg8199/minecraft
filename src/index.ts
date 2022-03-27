import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  Color,
  InstancedMesh,
} from "three";

import { Noise, PointerLockControls } from "./models";
import { updateChunks } from "./game";
import { getCurrentBlock } from "./utils";

import {
  CAMERA_FIELD_OF_VIEW,
  CAMERA_MIN_DISTANCE,
  CAMERA_MAX_DISTANCE,
  GRAVITY,
  MOVING_SPEED,
  CAMERA_INITIAL_POSITION,
  JUMPING,
  SKY_COLOR,
  BLOCK_BOX,
  GRASS_TEXTURE,
  RENDER_DISTANCE,
  CHUNK_SIZE
} from "./constants";
import { Chunks, CurrentChunk, InstancedMeshReference } from "./types";

let scene = new Scene();
scene.background = new Color(SKY_COLOR); // Change scene background
const renderer = new WebGLRenderer();

// Load Perlin Noise
let noise = new Noise();
noise.seed(Math.random());

// Variables shared accross the game
let pressedKeys: Set<string> = new Set<string>(); // Keys that are pressed at a certain frame
let yAcceleration = 0; // The acceleration of the camera on the y axis (vertical)
let canJump = true; // Variable that indicates whether the player can jump or not
let chunks: Chunks = {}; // Database of all the chunks that are generated
let displayableChunks: Chunks = {}; // Chunks that are currently displayed on the map
let currentChunk: CurrentChunk = { value: "" }; // The Chunk we are currently on

// Create a chunk of mesh that will be sent to the GPU without having to send the mesh every single time we display the
// block. InstancedMesh will allow us to limit interactions between CPU and GPU, and therefore, improve performance.
let instancedMesh: InstancedMeshReference = {
  value: new InstancedMesh(
    BLOCK_BOX,
    GRASS_TEXTURE,
    RENDER_DISTANCE**2 * CHUNK_SIZE**2
  )
};

// Set the size of the renderer to the screen width / height
renderer.setSize(window.innerWidth, window.innerHeight);

// Add the renderer to our page
document.body.appendChild(renderer.domElement);

// Setup camera - User POV
let camera = new PerspectiveCamera(
  CAMERA_FIELD_OF_VIEW, // Field of view - how wide the POV of the player is
  window.innerWidth / window.innerHeight, // Aspect ratio
  CAMERA_MIN_DISTANCE, // How near can the player see
  CAMERA_MAX_DISTANCE // How far can the player see
);

// Setup Controls
const controls = new PointerLockControls(camera, document.body); // Link the Controls to the Camera and the DOM
document.body.addEventListener("click", () => {
  controls.lock(); // Lock the camera on click
});

// Listener that resizes the renderer when the window is resized
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); // Apply changes on the camera
});

// Controls - listeners that add and remove keys from the set of pressed keys
document.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.key === " " && canJump) {
    yAcceleration = JUMPING; // Change y position
    canJump = false; // Disable jump (to avoid infinite jump)
  } else {
    pressedKeys.add(event.key);
  }
});

document.addEventListener("keyup", (event: KeyboardEvent) => {
  pressedKeys.delete(event.key);
});

// The update function runs at every frame - it updates the state of the game
const update = () => {
  // Controls - This algorithm will be executed at every frame, if a certain key is pressed -> move accordingly
  if (pressedKeys.has("w")) {
    controls.moveForward(MOVING_SPEED);
    // Get the current block we are on
    const currentBlock = getCurrentBlock(camera.position.x, camera.position.z, chunks);
    // if current block is higher than user, move back to initial position => collision
    if (currentBlock.y > camera.position.y - CAMERA_INITIAL_POSITION) {
      controls.moveForward(-1 * MOVING_SPEED);
    }
  }
  if (pressedKeys.has("a")) {
    controls.moveRight(-1 * MOVING_SPEED);
    // Get the current block we are on
    const currentBlock = getCurrentBlock(camera.position.x, camera.position.z, chunks);
    // if current block is higher than user, move back to initial position => collision
    if (currentBlock.y > camera.position.y - CAMERA_INITIAL_POSITION) {
      controls.moveRight(MOVING_SPEED);
    }
  }
  if (pressedKeys.has("s")) {
    controls.moveForward(-1 * MOVING_SPEED);
    // Get the current block we are on
    const currentBlock = getCurrentBlock(camera.position.x, camera.position.z, chunks);
    // if current block is higher than user, move back to initial position => collision
    if (currentBlock.y > camera.position.y - CAMERA_INITIAL_POSITION) {
      controls.moveForward(MOVING_SPEED);
    }
  }
  if (pressedKeys.has("d")) {
    controls.moveRight(MOVING_SPEED);
    // Get the current block we are on
    const currentBlock = getCurrentBlock(camera.position.x, camera.position.z, chunks);
    // if current block is higher than user, move back to initial position => collision
    if (currentBlock.y > camera.position.y - CAMERA_INITIAL_POSITION) {
      controls.moveRight(-1 * MOVING_SPEED);
    }
  }

  const currentBlock = getCurrentBlock(camera.position.x, camera.position.z, chunks);

  // Physics - This algorithm will reposition the camera at every frame to make sure the player is on top of the block
  // At every frame, apply gravity to the position
  camera.position.y = camera.position.y - yAcceleration;
  yAcceleration += GRAVITY;

  // If we're under the block or on top of the block, go back to the block's y
  if (
    currentBlock && // If we're on a block
    camera.position.y <= currentBlock.y + CAMERA_INITIAL_POSITION
    // camera.position.y >= currentBlock.y - BLOCK_SIZE * CAMERA_INITIAL_POSITION
  ) {
    camera.position.y = currentBlock.y + CAMERA_INITIAL_POSITION; // Back to the ground
    yAcceleration = 0; // Reset acceleration
    canJump = true; // Can jump once we touch the ground
  }

  // Code that updates chunks as we move through the map
  updateChunks(
    instancedMesh,
    scene,
    noise,
    currentChunk,
    chunks,
    displayableChunks,
    camera.position.x,
    camera.position.z
  );
};

const gameLoop = () => {
  requestAnimationFrame(gameLoop);
  update();
  renderer.render(scene, camera); // render the game
};

gameLoop();
