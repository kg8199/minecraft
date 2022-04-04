/**
 * File where we store the constants
 */

import { BoxGeometry, MeshBasicMaterial, TextureLoader } from "three";
import { BlockType, MapBlockTypeToTexture } from "./types";

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
export const INITIAL_WORLD_DEPTH = 2;
export const MAX_WORLD_DEPTH = -50 * BLOCK_SIZE;
export const TOP_BLOCK_LIMIT = 0;
export const MID_BLOCK_LIMIT = 2;

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
export const RENDER_DISTANCE = 8; // Number of chunks we render around the player
export const CHUNK_SIZE = 8; // The size of a chunk (16x16)
export const INITIAL_BLOCK_COUNT = 0;

export const BLOCK_TYPES = Object.values(BlockType);

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
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/leaves/side.webp") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/leaves/side.webp") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/leaves/side.webp") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/leaves/side.webp") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/leaves/side.webp") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/leaves/side.webp") }),
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
export const SNOW_TEXTURE: MeshBasicMaterial[] = [
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/snow/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/snow/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/snow/top.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/snow/bottom.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/snow/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/snow/side.png") }),
];
export const SNOW_LEAVES_TEXTURE: MeshBasicMaterial[] = [
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/snow_leaves/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/snow_leaves/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/snow_leaves/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/snow_leaves/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/snow_leaves/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/snow_leaves/side.png") }),
];

export const MAP_BLOCK_TO_TEXTURE: MapBlockTypeToTexture = {
	[BlockType.GRASS]: GRASS_TEXTURE,
	[BlockType.DIRT]: DIRT_TEXTURE,
	[BlockType.STONE]: STONE_TEXTURE,
	[BlockType.SAND]: SAND_TEXTURE,
	[BlockType.LOG]: LOG_TEXTURE,
	[BlockType.COBBLESTONE]: COBBLESTONE_TEXTURE,
	[BlockType.PLANK]: PLANK_TEXTURE,
	[BlockType.BEDROCK]: BEDROCK_TEXTURE,
	[BlockType.WATER]: WATER_TEXTURE,
	[BlockType.LEAVES]: LEAVES_TEXTURE,
	[BlockType.BRICK]: BRICK_TEXTURE,
	[BlockType.OBSIDIAN]: OBSIDIAN_TEXTURE,
	[BlockType.SNOW]: SNOW_TEXTURE,
	[BlockType.SNOW_LEAVES]: SNOW_LEAVES_TEXTURE,
};

export const MAP_BLOCK_TO_PREVIEW: { [key in BlockType]: string } = {
	[BlockType.GRASS]: "../assets/previews/grass.png",
	[BlockType.DIRT]: "../assets/previews/dirt.png",
	[BlockType.STONE]: "../assets/previews/stone.png",
	[BlockType.SAND]: "../assets/previews/sand.png",
	[BlockType.LOG]: "../assets/previews/log.png",
	[BlockType.COBBLESTONE]: "../assets/previews/cobblestone.png",
	[BlockType.PLANK]: "../assets/previews/plank.png",
	[BlockType.BEDROCK]: "../assets/previews/bedrock.png",
	[BlockType.BRICK]: "../assets/previews/brick.png",
	[BlockType.OBSIDIAN]: "../assets/previews/obsidian.png",
	[BlockType.WATER]: "",
	[BlockType.LEAVES]: "",
	[BlockType.SNOW]: "",
	[BlockType.SNOW_LEAVES]: "",
};