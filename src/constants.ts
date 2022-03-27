/**
 * File where we store the constants
 */

import { BoxGeometry, MeshBasicMaterial, TextureLoader } from "three";

import { Sides, Side } from "./types";

// Camera
export const CAMERA_FIELD_OF_VIEW = 75;
export const CAMERA_MIN_DISTANCE = 0.1;
export const CAMERA_MAX_DISTANCE = 1000;
export const CAMERA_INITIAL_POSITION = 15;

// Blocks
export const BLOCK_SIZE = 5;
export const EDGE_COLOR = 0x000000;
export const BLOCK_BOX = new BoxGeometry(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
export const SIDES: Sides = {
	[Side.LEFT]: [-BLOCK_SIZE, 0, 0],
	[Side.RIGHT]: [BLOCK_SIZE, 0, 0],
	[Side.BOTTOM]: [0, -BLOCK_SIZE, 0],
	[Side.TOP]: [0, BLOCK_SIZE, 0],
	[Side.BACK]: [0, 0, -BLOCK_SIZE],
	[Side.FRONT]: [0, 0, BLOCK_SIZE],
}

// Perlin
export const PERLIN_INCREMENT = 0.05; // The higher the increment, the less smooth the terrain become (the more random)
export const PERLIN_AMPLITUDE = 50; // The higher the amplitude, the higher the terrain goes

// Physics
export const MOVING_SPEED = 0.6;
export const GRAVITY = 0.08;
export const JUMPING = -1;

// Colors
export const SKY_COLOR = 0x94d2ff;

// Chunks
export const RENDER_DISTANCE = 12; // Number of chunks we render around the player
export const CHUNK_SIZE = 8; // The size of a chunk (16x16)

// Textures
const LOADER = new TextureLoader();
export const GRASS_TEXTURE: MeshBasicMaterial[] = [
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/grass/side4.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/grass/side1.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/grass/top.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/grass/bottom.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/grass/side2.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/grass/side3.png") }),
];