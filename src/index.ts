import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  Color,
  Mesh,
  PlaneGeometry,
  MeshBasicMaterial,
} from "three";

import { Noise, PointerLockControls } from "./models";
import {
  addBlock,
  buildInitialStructure,
  cleanTerrain,
  displayChunks,
  removeBlock,
  updateChunks
} from "./game";
import {
  generateInstancedMeshes,
  getBlockOnTopOfPlayer,
  getCurrentBlock,
  getRaycasterIntersection
} from "./utils";

import {
  CAMERA_FIELD_OF_VIEW,
  CAMERA_MIN_DISTANCE,
  CAMERA_MAX_DISTANCE,
  GRAVITY,
  MOVING_SPEED,
  CAMERA_INITIAL_POSITION,
  JUMPING,
  SKY_COLOR,
  RAYCASTER_DISTANCE,
  BLOCK_SIZE,
  RAYCASTER_COLOR,
  PLANE_OPACITY,
  MAP_BLOCK_TO_PREVIEW,
  BLOCK_TYPES,
  BIOMES,
  INITIAL_AMPLITUDE,
  MIN_INITIAL_TERRAIN_X,
  MAX_INITIAL_TERRAIN_X,
  MIN_INITIAL_TERRAIN_Z,
  MAX_INITIAL_TERRAIN_Z,
  INITIAL_TERRAIN_LEVEL,
  ITEM_COUNT
} from "./constants";
import {
  Biome,
  BiomeType,
  Chunks,
  Exists,
  InstancedMeshes,
  Level,
  Reference
} from "./types";

let isGameLocked = false; // If the game is locked

// Add cursor to the screen
let cursor = document.getElementById("crosshair");
cursor.style.left = (0.5 * window.innerWidth - 0.5 * cursor.clientWidth).toString() + "px";
cursor.style.top = (0.5 * window.innerHeight - 0.5 * cursor.clientHeight).toString() + "px";

// Manage the item bar
let currentItemIndex = 0; // The current block we are using
let itemBar = document.getElementById("item-bar");

for (let i = 0; i < ITEM_COUNT; i++) {
  itemBar.appendChild(document.createElement("div"));
}

Array.from(itemBar.children).forEach((value, idx) => {
  const element = value as HTMLElement;

  // Set the border of the element
  if (idx === currentItemIndex) {
    element.style.border = "6px solid white";
  } else {
    element.style.border = "6px solid gray";
  }

  // Set the background image of the elements
  element.innerHTML = `<img
    src="${MAP_BLOCK_TO_PREVIEW[BLOCK_TYPES[idx]]}"
    alt="item"
  />`;
});

// If navigator is Safari, remove pickaxe (causes problems)
if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
  let pickaxe = document.getElementById("pickaxe");
  pickaxe.setAttribute("style", "display: none");
}

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
let canAddBlock = true // Variable that indicates whether the player can add a block or not
let canRemoveBlock = true; // Variable that indicates whether the player can remove a block or not
let chunks: Chunks = {}; // Database of all the chunks that are generated
let displayableChunks: Reference<Chunks> = { value: {} }; // Chunks that are currently displayed on the map
let currentChunk: Reference<string> = { value: "" }; // The Chunk we are currently on
let plane: Mesh; // The plane that will be displayed on top of a block to detect which block we're pointing at
let knownTerritory: Reference<Exists> = { value: {} }; // Database that keeps track of the blocks that have been placed
let topLevel: Reference<Level> = { value: {} }; // Database that keeps track of the blocks that are on the top layer
let currentBiome: Reference<Biome> = { value:BIOMES[BiomeType.PLAIN] }; // The current type of blocks we are building
let currentBiomeCount: Reference<number> = { value: 0 }; // How many chunks of the current biome have been built so far
let currentAmplitude: Reference<number> = { value: INITIAL_AMPLITUDE }; // The current amplitude of the biome
let isChestOpen: Reference<boolean> = { value: false };
let initialDisplay: Reference<boolean> = { value: false };

// Create a chunk of mesh that will be sent to the GPU without having to send the mesh every single time we display the
// block. InstancedMesh will allow us to limit interactions between CPU and GPU, and therefore, improve performance.
let instancedMeshes: Reference<InstancedMeshes> = {
  value: generateInstancedMeshes()
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
  cursor.style.left = (0.5 * window.innerWidth - 0.5 * cursor.clientWidth).toString() + "px";
  cursor.style.top = (0.5 * window.innerHeight - 0.5 * cursor.clientHeight).toString() + "px";
  camera.updateProjectionMatrix(); // Apply changes on the camera
});

// Controls - listeners that add and remove keys from the set of pressed keys
document.addEventListener("keydown", (event: KeyboardEvent) => {
  if (isGameLocked) {
    if (event.key === " " && canJump) {
      yAcceleration = JUMPING; // Change y position
      canJump = false; // Disable jump (to avoid infinite jump)
    } else if (event.key >= "1" && event.key <= "9") {
      currentItemIndex = Number(event.key) - 1;
      Array.from(itemBar.children).forEach((value, idx) => {
        if (idx === currentItemIndex) {
          (value as HTMLElement).style.border = "6px solid white";
        } else {
          (value as HTMLElement).style.border = "6px solid gray";
        }
      });
    } else {
      pressedKeys.add(event.key.toLowerCase());
    }
  }
});

// Detect mouse event
document.addEventListener("mousedown", event => {
  // Animate the pickaxe
  const pickaxe = document.getElementById("pickaxe");
  pickaxe.classList.add("hit");

  if (isGameLocked) {
    if (event.button === 2) { // Right click
      if (canAddBlock) {
        addBlock(
          camera,
          instancedMeshes,
          chunks,
          displayableChunks,
          knownTerritory,
          scene,
          currentItemIndex
        );
        canAddBlock = false;
      }
    } else if (event.button === 0) {
      if (canRemoveBlock) {
        removeBlock(
          camera,
          instancedMeshes,
          chunks,
          displayableChunks,
          knownTerritory,
          topLevel,
          scene,
          isChestOpen
        );
        canRemoveBlock = false;
      }
    }
  }
});

document.addEventListener("mouseup", event => {
  // Animate the pickaxe
  const pickaxe = document.getElementById("pickaxe");
  pickaxe.classList.remove("hit");

  if (isGameLocked) {
    if (event.button === 2) {
      canAddBlock = true;
    } else if (event.button === 0) {
      canRemoveBlock = true;
    }
  }
});

document.addEventListener("keyup", event => {
  pressedKeys.delete(event.key.toLowerCase());
});

controls.addEventListener("lock", () => {
  isGameLocked = true;
});
controls.addEventListener("unlock", () => {
  isGameLocked = false;
});

// The update function runs at every frame - it updates the state of the game
const update = () => {
  // Controls - This algorithm will be executed at every frame, if a certain key is pressed -> move accordingly
  if (pressedKeys.has("w")) {
    controls.moveForward(MOVING_SPEED);
    // Get the current block we are on
    const currentBlock = getCurrentBlock(camera.position.x, camera.position.y, camera.position.z, chunks);
    // if current block is higher than user, move back to initial position => collision
    if (currentBlock.y > camera.position.y - CAMERA_INITIAL_POSITION) {
      controls.moveForward(-1 * MOVING_SPEED);
    }
  }
  if (pressedKeys.has("a")) {
    controls.moveRight(-1 * MOVING_SPEED);
    // Get the current block we are on
    const currentBlock = getCurrentBlock(camera.position.x, camera.position.y, camera.position.z, chunks);
    // if current block is higher than user, move back to initial position => collision
    if (currentBlock.y > camera.position.y - CAMERA_INITIAL_POSITION) {
      controls.moveRight(MOVING_SPEED);
    }
  }
  if (pressedKeys.has("s")) {
    controls.moveForward(-1 * MOVING_SPEED);
    // Get the current block we are on
    const currentBlock = getCurrentBlock(camera.position.x, camera.position.y, camera.position.z, chunks);
    // if current block is higher than user, move back to initial position => collision
    if (currentBlock.y > camera.position.y - CAMERA_INITIAL_POSITION) {
      controls.moveForward(MOVING_SPEED);
    }
  }
  if (pressedKeys.has("d")) {
    controls.moveRight(MOVING_SPEED);
    // Get the current block we are on
    const currentBlock = getCurrentBlock(camera.position.x, camera.position.y, camera.position.z, chunks);
    // if current block is higher than user, move back to initial position => collision
    if (currentBlock.y > camera.position.y - CAMERA_INITIAL_POSITION) {
      controls.moveRight(-1 * MOVING_SPEED);
    }
  }

  const currentBlock = getCurrentBlock(camera.position.x, camera.position.y, camera.position.z, chunks);

  // Physics - This algorithm will reposition the camera at every frame to make sure the player is on top of the block
  // At every frame, apply gravity to the position
  camera.position.y = camera.position.y - yAcceleration;

  // If the position of y touches the block on top of the player, bring jumping acceleration back to 0 (stop jumping)
  const blockOnTopOfPlayer = getBlockOnTopOfPlayer(camera.position.x, camera.position.y, camera.position.z, chunks);
  if (blockOnTopOfPlayer && camera.position.y >= blockOnTopOfPlayer.y - BLOCK_SIZE / 2) {
    // Reset the camera position and put acceleration to 0
    camera.position.y = camera.position.y + yAcceleration
    yAcceleration = 0;
  }

  yAcceleration += GRAVITY;

  // If we're under the block or on top of the block, go back to the block's y
  if (
    currentBlock && // If we're on a block
    camera.position.y <= currentBlock.y + CAMERA_INITIAL_POSITION
  ) {
    camera.position.y = currentBlock.y + CAMERA_INITIAL_POSITION; // Back to the ground
    yAcceleration = 0; // Reset acceleration
    canJump = true; // Can jump once we touch the ground
  }

  // Code that updates chunks as we move through the map
  updateChunks(
    instancedMeshes,
    scene,
    noise,
    currentChunk,
    chunks,
    displayableChunks,
    knownTerritory,
    topLevel,
    camera.position.x,
    camera.position.z,
    currentBiome,
    currentBiomeCount,
    currentAmplitude
  );

  if (!initialDisplay.value) {
    initialDisplay.value = true;

    cleanTerrain(
      chunks,
      MIN_INITIAL_TERRAIN_X,
      MAX_INITIAL_TERRAIN_X,
      MIN_INITIAL_TERRAIN_Z,
      MAX_INITIAL_TERRAIN_Z,
      INITIAL_TERRAIN_LEVEL - BLOCK_SIZE
    );

    buildInitialStructure(
      chunks,
      MIN_INITIAL_TERRAIN_X,
      MAX_INITIAL_TERRAIN_X,
      MIN_INITIAL_TERRAIN_Z,
      MAX_INITIAL_TERRAIN_Z,
      INITIAL_TERRAIN_LEVEL
    );

    displayChunks(scene, instancedMeshes, displayableChunks.value);
  }
};

// Function that renders the game to the screen at every frame
const render = () => {
  const intersection = getRaycasterIntersection(camera, instancedMeshes);
  // Implement the plane if the object is in distance
  if (intersection.length && intersection[0] && intersection[0].distance <= RAYCASTER_DISTANCE) {
    // If the plane does not exist yet, create it
    if (!plane) {
      const planeGeometry = new PlaneGeometry(BLOCK_SIZE, BLOCK_SIZE); // Setup Geometry
      let planeMesh = new MeshBasicMaterial({ color: RAYCASTER_COLOR }); // Setup Mesh
      planeMesh.transparent = true;
      planeMesh.opacity = PLANE_OPACITY;
      plane = new Mesh(planeGeometry, planeMesh);
      scene.add(plane); // Add the plane to the scene
    } else {
      plane.visible = true; // Make the plane visible if it already exists
      const materialIndex = intersection[0].face.materialIndex; // Get the side of the object we're pointing at (top, bot...)
      const position = intersection[0].point; // Get the coordinates of the object in order to set the plane's coordinates
      const increment = 0.0001; // We add increment to the position in order for it not to be hidden by the block's mesh
      // Set the position and the rotation of the plane based on the side of the object we're pointing at
      switch (materialIndex) {
        case 0: // Right
          plane.rotation.x = 0;
          plane.rotation.y = Math.PI / 2;
          plane.rotation.z = 0;
          plane.position.x = position.x + increment;
          plane.position.y = Math.round(position.y / BLOCK_SIZE) * BLOCK_SIZE;
          plane.position.z = Math.round(position.z / BLOCK_SIZE) * BLOCK_SIZE;
          break;
        case 1: // Left
          plane.rotation.x = 0;
          plane.rotation.y = -Math.PI / 2;
          plane.rotation.z = 0;
          plane.position.x = position.x - increment;
          plane.position.y = Math.round(position.y / BLOCK_SIZE) * BLOCK_SIZE;
          plane.position.z = Math.round(position.z / BLOCK_SIZE) * BLOCK_SIZE;
          break;
        case 2: // Top
          plane.rotation.x = -Math.PI / 2;
          plane.rotation.y = 0;
          plane.rotation.z = 0;
          plane.position.x = Math.round(position.x / BLOCK_SIZE) * BLOCK_SIZE;
          plane.position.y = position.y + increment;
          plane.position.z = Math.round(position.z / BLOCK_SIZE) * BLOCK_SIZE;
          break;
        case 3: // Bottom
          plane.rotation.x = Math.PI / 2;
          plane.rotation.y = 0;
          plane.rotation.z = 0;
          plane.position.x = Math.round(position.x / BLOCK_SIZE) * BLOCK_SIZE;
          plane.position.y = position.y - increment;
          plane.position.z = Math.round(position.z / BLOCK_SIZE) * BLOCK_SIZE;
          break;
        case 4: // Front
          plane.rotation.x = 0;
          plane.rotation.y = 0;
          plane.rotation.z = 0;
          plane.position.x = Math.round(position.x / BLOCK_SIZE) * BLOCK_SIZE;
          plane.position.y = Math.round(position.y / BLOCK_SIZE) * BLOCK_SIZE;
          plane.position.z = position.z + increment;
          break;
        case 5: // Back
          plane.rotation.x = 0;
          plane.rotation.y = Math.PI;
          plane.rotation.z = 0;
          plane.position.x = Math.round(position.x / BLOCK_SIZE) * BLOCK_SIZE;
          plane.position.y = Math.round(position.y / BLOCK_SIZE) * BLOCK_SIZE;
          plane.position.z = position.z - increment;
          break;
      }
    }
  } else if (plane) {
    // If there are no objects detected, make the plane invisible
    plane.visible = false;
  }

  renderer.render(scene, camera); // Render the game
};

const gameLoop = () => {
  requestAnimationFrame(gameLoop);
  update();
  render();
};

gameLoop();
