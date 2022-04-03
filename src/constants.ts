/**
 * File where we store the constants
 */

import { BoxGeometry, MeshBasicMaterial, TextureLoader } from "three";

// Camera
export const CAMERA_FIELD_OF_VIEW = 75;
export const CAMERA_MIN_DISTANCE = 0.001;
export const CAMERA_MAX_DISTANCE = 1000;
export const CAMERA_INITIAL_POSITION = 15;
export const RAYCASTER_DISTANCE = 40;

// Blocks
export const BLOCK_SIZE = 5;
export const EDGE_COLOR = 0x000000;
export const BLOCK_BOX = new BoxGeometry(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
export const INITIAL_WORLD_DEPTH = 3;
export const MAX_WORLD_DEPTH = -150;

// Perlin
export const PERLIN_INCREMENT = 0.05; // The higher the increment, the less smooth the terrain become (the more random)
export const PERLIN_AMPLITUDE = 50; // The higher the amplitude, the higher the terrain goes

// Physics
export const MOVING_SPEED = 0.6;
export const GRAVITY = 0.08;
export const JUMPING = -1;

// Colors
export const SKY_COLOR = 0x94d2ff;
export const RAYCASTER_COLOR = 0xffffff;

// Opacity
export const PLANE_OPACITY = 0.3;

// Chunks
export const RENDER_DISTANCE = 12; // Number of chunks we render around the player
export const CHUNK_SIZE = 8; // The size of a chunk (16x16)

// Textures
const LOADER = new TextureLoader();
export const GRASS_TEXTURE: MeshBasicMaterial[] = [
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/grass/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/grass/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/grass/top.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/grass/bottom.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/grass/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/grass/side.png") }),
];
export const DIRT_TEXTURE: MeshBasicMaterial[] = [
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/dirt/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/dirt/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/dirt/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/dirt/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/dirt/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/dirt/side.png") }),
];
export const STONE_TEXTURE: MeshBasicMaterial[] = [
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/stone/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/stone/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/stone/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/stone/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/stone/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/stone/side.png") }),
];
export const SAND_TEXTURE: MeshBasicMaterial[] = [
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/sand/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/sand/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/sand/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/sand/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/sand/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/sand/side.png") }),
];
export const LOG_TEXTURE: MeshBasicMaterial[] = [
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/face.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/face.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/side.png") }),
];
export const COBBLESTONE_TEXTURE: MeshBasicMaterial[] = [
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/cobblestone/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/cobblestone/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/cobblestone/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/cobblestone/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/cobblestone/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/cobblestone/side.png") }),
];
export const PLANK_TEXTURE: MeshBasicMaterial[] = [
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/plank/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/plank/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/plank/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/plank/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/plank/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/plank/side.png") }),
];
export const BEDROCK_TEXTURE: MeshBasicMaterial[] = [
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/bedrock/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/bedrock/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/bedrock/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/bedrock/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/bedrock/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/bedrock/side.png") }),
];
export const WATER_TEXTURE: MeshBasicMaterial[] = [
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/water/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/water/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/water/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/water/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/water/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/water/side.png") }),
];
export const LEAVES_TEXTURE: MeshBasicMaterial[] = [
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/leaves/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/leaves/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/leaves/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/leaves/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/leaves/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/leaves/side.png") }),
];
export const BRICK_TEXTURE: MeshBasicMaterial[] = [
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/brick/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/brick/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/brick/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/brick/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/brick/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/brick/side.png") }),
];
export const OBSIDIAN_TEXTURE: MeshBasicMaterial[] = [
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/obsidian/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/obsidian/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/obsidian/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/obsidian/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/obsidian/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/obsidian/side.png") }),
];