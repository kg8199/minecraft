/**
 * File where we store the constants
 */

import { BoxGeometry, MeshBasicMaterial, PlaneGeometry, TextureLoader } from "three";

import { Biomes, BiomeType, BlockType, MapBlockTypeToTexture } from "./types";

// Camera
export const CAMERA_FIELD_OF_VIEW = 75;
export const CAMERA_MIN_DISTANCE = 0.001;
export const CAMERA_MAX_DISTANCE = 1000;
export const CAMERA_INITIAL_POSITION = 15;
export const RAYCASTER_DISTANCE = 40;

// Blocks
export const BLOCK_SIZE = 5;
export const CHEST_BASE_BLOCK_HEIGHT = 3.5;
export const CHEST_TOP_BLOCK_HEIGHT = 1.5;
export const EDGE_COLOR = 0x000000;
export const BLOCK_BOX = new BoxGeometry(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
export const BLOCK_BOX_CHEST_BASE = new BoxGeometry(BLOCK_SIZE, CHEST_BASE_BLOCK_HEIGHT, BLOCK_SIZE);
export const BLOCK_BOX_CHEST_TOP = new BoxGeometry(BLOCK_SIZE, CHEST_TOP_BLOCK_HEIGHT, BLOCK_SIZE);
export const INITIAL_WORLD_DEPTH = 3;
export const MAX_WORLD_DEPTH = -50 * BLOCK_SIZE;
export const TOP_BLOCK_LIMIT = 0;
export const MID_BLOCK_LIMIT = 2;
export const INITIAL_AMPLITUDE = 10;
export const TREE_HEIGHT = 3;
export const MAX_TREE_HEIGHT = 5;
export const TREE_WIDTH = 3;
export const PALM_TREE_HEIGHT = 4;
export const MAX_PALM_TREE_HEIGHT = 6;
export const PALM_TREE_WIDTH = 7;
export const PALM_TREE_SHIFT_TRESHOLD = 3;
export const CHEST_OPEN_ANGLE = 2.1;

// Perlin
export const PERLIN_INCREMENT = 0.05; // The higher the increment, the less smooth the terrain become (the more random)

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
export const CHUNK_SIZE = 8; // The size of a chunk (8x8)
export const INITIAL_BLOCK_COUNT = 0;
export const BIOME_SIZE = RENDER_DISTANCE ** 2; // How large should a biome be before switching to the next
export const TREE_FREQUENCY_PLAIN = 1/1000;
export const TREE_FREQUENCY_FORREST = 1/10;
export const THREE_FREQUENCY_DESERT = 1/40;

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
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/leaves/side.webp"), transparent: true }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/leaves/side.webp"), transparent: true }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/leaves/side.webp"), transparent: true }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/leaves/side.webp"), transparent: true }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/leaves/side.webp"), transparent: true }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/leaves/side.webp"), transparent: true }),
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
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/snow_leaves/side.png"), transparent: true }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/snow_leaves/side.png"), transparent: true }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/snow_leaves/side.png"), transparent: true }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/snow_leaves/side.png"), transparent: true }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/snow_leaves/side.png"), transparent: true }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/snow_leaves/side.png"), transparent: true }),
];
export const GLASS_TEXTURE: MeshBasicMaterial[] = [
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/glass/side.png"), transparent: true }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/glass/side.png"), transparent: true }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/glass/side.png"), transparent: true }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/glass/side.png"), transparent: true }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/glass/side.png"), transparent: true }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/glass/side.png"), transparent: true }),
];
export const CHEST_TEXTURE: MeshBasicMaterial[] = [
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/chest-base/front.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/chest-base/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/chest-base/top.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/chest-base/bottom.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/chest-base/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/chest-base/side.png") }),
];
export const CHEST_TOP_TEXTURE: MeshBasicMaterial[] = [
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/chest-cover/front.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/chest-cover/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/chest-cover/top.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/chest-cover/bottom.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/chest-cover/side.png") }),
	new MeshBasicMaterial({ map: LOADER.load("../assets/texture/chest-cover/side.png") }),
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
	[BlockType.GLASS]: GLASS_TEXTURE,
	[BlockType.OBSIDIAN]: OBSIDIAN_TEXTURE,
	[BlockType.SNOW]: SNOW_TEXTURE,
	[BlockType.SNOW_LEAVES]: SNOW_LEAVES_TEXTURE,
	[BlockType.CHEST]: CHEST_TEXTURE,
	[BlockType.CHEST_TOP]: CHEST_TOP_TEXTURE
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
	[BlockType.GLASS]: "../assets/previews/glass.png",
	[BlockType.OBSIDIAN]: "../assets/previews/obsidian.png",
	[BlockType.WATER]: "",
	[BlockType.LEAVES]: "",
	[BlockType.SNOW]: "",
	[BlockType.SNOW_LEAVES]: "",
	[BlockType.CHEST]: "",
	[BlockType.CHEST_TOP]: ""
};

export const BIOMES: Biomes = {
	[BiomeType.PLAIN]: {
		type: BiomeType.PLAIN,
		top: BlockType.GRASS,
		bottom: BlockType.DIRT,
		neighbors: [
			BiomeType.PLAIN,
			BiomeType.PLAIN,
			BiomeType.PLAIN,
			BiomeType.PLAIN,
			BiomeType.FORREST,
			BiomeType.SNOW,
			BiomeType.DESERT
		],
		amplitudeRange: [20, 30],
		treeFrequency: TREE_FREQUENCY_PLAIN,
		tree: {
			leafType: BlockType.LEAVES,
			width: TREE_WIDTH
		}
	},
	[BiomeType.DESERT]: {
		type: BiomeType.DESERT,
		top: BlockType.SAND,
		bottom: BlockType.SAND,
		neighbors: [BiomeType.DESERT, BiomeType.DESERT, BiomeType.DESERT, BiomeType.PLAIN],
		amplitudeRange: [20, 30],
		treeFrequency: THREE_FREQUENCY_DESERT,
		tree: {
			leafType: BlockType.LEAVES,
			width: PALM_TREE_WIDTH
		}
	},
	[BiomeType.SNOW]: {
		type: BiomeType.SNOW,
		top: BlockType.SNOW,
		bottom: BlockType.DIRT,
		neighbors: [BiomeType.SNOW, BiomeType.SNOW, BiomeType.SNOW, BiomeType.SNOW_FORREST, BiomeType.PLAIN],
		amplitudeRange: [20, 40],
		treeFrequency: TREE_FREQUENCY_PLAIN,
		tree: {
			leafType: BlockType.SNOW_LEAVES,
			width: TREE_WIDTH
		}
	},
	[BiomeType.FORREST]: {
		type: BiomeType.FORREST,
		top: BlockType.GRASS,
		bottom:BlockType.DIRT,
		neighbors: [BiomeType.FORREST, BiomeType.PLAIN, BiomeType.PLAIN],
		amplitudeRange: [20, 30],
		treeFrequency: TREE_FREQUENCY_FORREST,
		tree: {
			leafType: BlockType.LEAVES,
			width: TREE_WIDTH
		}
	},
	[BiomeType.SNOW_FORREST]: {
		type: BiomeType.SNOW_FORREST,
		top: BlockType.SNOW,
		bottom:BlockType.DIRT,
		neighbors: [BiomeType.SNOW_FORREST, BiomeType.SNOW, BiomeType.SNOW],
		amplitudeRange: [20, 40],
		treeFrequency: TREE_FREQUENCY_FORREST,
		tree: {
			leafType: BlockType.SNOW_LEAVES,
			width: TREE_WIDTH
		}
	},
};