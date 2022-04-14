/**
 * File where we store the constants
 */

import { BoxGeometry, MeshBasicMaterial, TextureLoader } from "three";

import { Biomes, BiomeType, BlockSound, BlockType, Chest, MapBlockToSound, MapBlockTypeToTexture } from "./types";

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
export const BLOCK_BOX_CHEST_BASE = new BoxGeometry(
  BLOCK_SIZE,
  CHEST_BASE_BLOCK_HEIGHT,
  BLOCK_SIZE
);
export const BLOCK_BOX_CHEST_TOP = new BoxGeometry(
  BLOCK_SIZE,
  CHEST_TOP_BLOCK_HEIGHT,
  BLOCK_SIZE
);
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
export const TREE_FREQUENCY_PLAIN = 1 / 1000;
export const TREE_FREQUENCY_FORREST = 1 / 10;
export const THREE_FREQUENCY_DESERT = 1 / 40;

// Sounds
export const BASIC_PLACE_BREAK_SOUND = "basic-place-break";
export const BUTTON_SOUND = "button";
export const CHEST_CLOSE_SOUND = "chest-close";
export const CHEST_OPEN_SOUND = "chest-open";
export const DIRT_PLACE_BREAK_SOUND = "dirt-place-break";
export const GLASS_BREAK_SOUND = "glass-break";
export const GRASS_PLACE_BREAK_SOUND = "grass-place-break";
export const SAND_BREAK_SOUND = "sand-break";
export const WOOD_BREAK_SOUND = "wood-break";
export const WOOD_PLACE_SOUND = "wood-place";

export const MAP_BLOCK_TO_SOUND: MapBlockToSound = {
  [BlockType.GRASS]: {
    place: GRASS_PLACE_BREAK_SOUND,
    break: GRASS_PLACE_BREAK_SOUND
  },
  [BlockType.DIRT]: {
    place: DIRT_PLACE_BREAK_SOUND,
    break: DIRT_PLACE_BREAK_SOUND
  },
  [BlockType.STONE]: {
    place: BASIC_PLACE_BREAK_SOUND,
    break: BASIC_PLACE_BREAK_SOUND
  },
  [BlockType.SAND]: {
    place: BASIC_PLACE_BREAK_SOUND,
    break: SAND_BREAK_SOUND
  },
  [BlockType.LOG]: {
    place: WOOD_PLACE_SOUND,
    break: WOOD_BREAK_SOUND
  },
  [BlockType.COBBLESTONE]: {
    place: BASIC_PLACE_BREAK_SOUND,
    break: BASIC_PLACE_BREAK_SOUND
  },
  [BlockType.PLANK]: {
    place: WOOD_PLACE_SOUND,
    break: WOOD_BREAK_SOUND
  },
  [BlockType.BEDROCK]: {
    place: BASIC_PLACE_BREAK_SOUND,
    break: BASIC_PLACE_BREAK_SOUND
  },
  [BlockType.WATER]: {
    place: BASIC_PLACE_BREAK_SOUND,
    break: BASIC_PLACE_BREAK_SOUND
  },
  [BlockType.LEAVES]: {
    place: GRASS_PLACE_BREAK_SOUND,
    break: GRASS_PLACE_BREAK_SOUND
  },
  [BlockType.BRICK]: {
    place: BASIC_PLACE_BREAK_SOUND,
    break: BASIC_PLACE_BREAK_SOUND
  },
  [BlockType.GLASS]: {
    place: BASIC_PLACE_BREAK_SOUND,
    break: GLASS_BREAK_SOUND
  },
  [BlockType.OBSIDIAN]: {
    place: BASIC_PLACE_BREAK_SOUND,
    break: BASIC_PLACE_BREAK_SOUND
  },
  [BlockType.SNOW]: {
    place: GRASS_PLACE_BREAK_SOUND,
    break: GRASS_PLACE_BREAK_SOUND
  },
  [BlockType.SNOW_LEAVES]: {
    place: GRASS_PLACE_BREAK_SOUND,
    break: GRASS_PLACE_BREAK_SOUND
  },
  [BlockType.CHEST]: {
    place: BASIC_PLACE_BREAK_SOUND,
    break: BASIC_PLACE_BREAK_SOUND,
    open: CHEST_OPEN_SOUND,
    close: CHEST_CLOSE_SOUND
  },
  [BlockType.CHEST_TOP]: {
    place: BASIC_PLACE_BREAK_SOUND,
    break: BASIC_PLACE_BREAK_SOUND
  },
  [BlockType.LOG_EDUCATION]: {
    place: WOOD_PLACE_SOUND,
    break: WOOD_BREAK_SOUND
  },
  [BlockType.LOG_PROFESSIONAL_EXPERIENCE]: {
    place: WOOD_PLACE_SOUND,
    break: WOOD_BREAK_SOUND
  },
  [BlockType.LOG_PERSONAL_PROJECTS]: {
    place: WOOD_PLACE_SOUND,
    break: WOOD_BREAK_SOUND
  },
  [BlockType.LOG_COMPETITIONS]: {
    place: WOOD_PLACE_SOUND,
    break: WOOD_BREAK_SOUND
  },
  [BlockType.LOG_LEADERSHIP]: {
    place: WOOD_PLACE_SOUND,
    break: WOOD_BREAK_SOUND
  },
  [BlockType.LOG_HOBBIES]: {
    place: WOOD_PLACE_SOUND,
    break: WOOD_BREAK_SOUND
  },
};

export const BLOCK_TYPES = Object.values(BlockType);

// Textures
const LOADER = new TextureLoader();
export const GRASS_TEXTURE: MeshBasicMaterial[] = [
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/grass/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/grass/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/grass/top.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/grass/bottom.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/grass/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/grass/side.png"),
  }),
];
export const DIRT_TEXTURE: MeshBasicMaterial[] = [
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/dirt/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/dirt/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/dirt/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/dirt/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/dirt/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/dirt/side.png"),
  }),
];
export const STONE_TEXTURE: MeshBasicMaterial[] = [
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/stone/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/stone/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/stone/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/stone/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/stone/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/stone/side.png"),
  }),
];
export const SAND_TEXTURE: MeshBasicMaterial[] = [
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/sand/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/sand/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/sand/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/sand/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/sand/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/sand/side.png"),
  }),
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
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/cobblestone/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/cobblestone/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/cobblestone/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/cobblestone/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/cobblestone/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/cobblestone/side.png"),
  }),
];
export const PLANK_TEXTURE: MeshBasicMaterial[] = [
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/plank/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/plank/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/plank/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/plank/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/plank/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/plank/side.png"),
  }),
];
export const BEDROCK_TEXTURE: MeshBasicMaterial[] = [
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/bedrock/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/bedrock/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/bedrock/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/bedrock/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/bedrock/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/bedrock/side.png"),
  }),
];
export const WATER_TEXTURE: MeshBasicMaterial[] = [
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/water/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/water/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/water/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/water/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/water/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/water/side.png"),
  }),
];
export const LEAVES_TEXTURE: MeshBasicMaterial[] = [
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/leaves/side.webp"),
    transparent: true,
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/leaves/side.webp"),
    transparent: true,
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/leaves/side.webp"),
    transparent: true,
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/leaves/side.webp"),
    transparent: true,
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/leaves/side.webp"),
    transparent: true,
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/leaves/side.webp"),
    transparent: true,
  }),
];
export const BRICK_TEXTURE: MeshBasicMaterial[] = [
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/brick/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/brick/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/brick/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/brick/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/brick/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/brick/side.png"),
  }),
];
export const OBSIDIAN_TEXTURE: MeshBasicMaterial[] = [
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/obsidian/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/obsidian/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/obsidian/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/obsidian/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/obsidian/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/obsidian/side.png"),
  }),
];
export const SNOW_TEXTURE: MeshBasicMaterial[] = [
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/snow/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/snow/side.png"),
  }),
  new MeshBasicMaterial({ map: LOADER.load("../assets/texture/snow/top.png") }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/snow/bottom.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/snow/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/snow/side.png"),
  }),
];
export const SNOW_LEAVES_TEXTURE: MeshBasicMaterial[] = [
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/snow_leaves/side.png"),
    transparent: true,
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/snow_leaves/side.png"),
    transparent: true,
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/snow_leaves/side.png"),
    transparent: true,
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/snow_leaves/side.png"),
    transparent: true,
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/snow_leaves/side.png"),
    transparent: true,
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/snow_leaves/side.png"),
    transparent: true,
  }),
];
export const GLASS_TEXTURE: MeshBasicMaterial[] = [
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/glass/side.png"),
    transparent: true,
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/glass/side.png"),
    transparent: true,
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/glass/side.png"),
    transparent: true,
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/glass/side.png"),
    transparent: true,
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/glass/side.png"),
    transparent: true,
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/glass/side.png"),
    transparent: true,
  }),
];
export const CHEST_TEXTURE: MeshBasicMaterial[] = [
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/chest-base/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/chest-base/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/chest-base/top.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/chest-base/bottom.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/chest-base/front.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/chest-base/side.png"),
  }),
];
export const CHEST_TOP_TEXTURE: MeshBasicMaterial[] = [
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/chest-cover/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/chest-cover/side.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/chest-cover/top.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/chest-cover/bottom.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/chest-cover/front.png"),
  }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/chest-cover/side.png"),
  }),
];
export const LOG_PROFESSIONAL_EXPERIENCE_TEXTURE: MeshBasicMaterial[] = [
  new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/side.png") }),
  new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/side.png") }),
  new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/face.png") }),
  new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/face.png") }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/sign/professional-experience.png"),
  }),
  new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/side.png") }),
];
export const LOG_PERSONAL_PROJECTS_TEXTURE: MeshBasicMaterial[] = [
  new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/side.png") }),
  new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/side.png") }),
  new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/face.png") }),
  new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/face.png") }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/sign/personal-projects.png"),
  }),
  new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/side.png") }),
];
export const LOG_COMPETITIONS_TEXTURE: MeshBasicMaterial[] = [
  new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/side.png") }),
  new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/side.png") }),
  new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/face.png") }),
  new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/face.png") }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/sign/competitions.png"),
  }),
  new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/side.png") }),
];
export const LOG_EDUCATION_TEXTURE: MeshBasicMaterial[] = [
  new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/side.png") }),
  new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/side.png") }),
  new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/face.png") }),
  new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/face.png") }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/sign/education.png"),
  }),
  new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/side.png") }),
];
export const LOG_LEADERSHIP_TEXTURE: MeshBasicMaterial[] = [
  new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/side.png") }),
  new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/side.png") }),
  new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/face.png") }),
  new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/face.png") }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/sign/leadership.png"),
  }),
  new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/side.png") }),
];
export const LOG_HOBBIES_TEXTURE: MeshBasicMaterial[] = [
  new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/side.png") }),
  new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/side.png") }),
  new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/face.png") }),
  new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/face.png") }),
  new MeshBasicMaterial({
    map: LOADER.load("../assets/texture/sign/hobbies.png"),
  }),
  new MeshBasicMaterial({ map: LOADER.load("../assets/texture/log/side.png") }),
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
  [BlockType.CHEST_TOP]: CHEST_TOP_TEXTURE,
  [BlockType.LOG_EDUCATION]: LOG_EDUCATION_TEXTURE,
  [BlockType.LOG_PROFESSIONAL_EXPERIENCE]: LOG_PROFESSIONAL_EXPERIENCE_TEXTURE,
  [BlockType.LOG_PERSONAL_PROJECTS]: LOG_PERSONAL_PROJECTS_TEXTURE,
  [BlockType.LOG_COMPETITIONS]: LOG_COMPETITIONS_TEXTURE,
  [BlockType.LOG_LEADERSHIP]: LOG_LEADERSHIP_TEXTURE,
  [BlockType.LOG_HOBBIES]: LOG_HOBBIES_TEXTURE,
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
  [BlockType.LOG_EDUCATION]: "",
  [BlockType.LOG_PROFESSIONAL_EXPERIENCE]: "",
  [BlockType.LOG_PERSONAL_PROJECTS]: "",
  [BlockType.LOG_COMPETITIONS]: "",
  [BlockType.LOG_LEADERSHIP]: "",
  [BlockType.LOG_HOBBIES]: "",
  [BlockType.WATER]: "",
  [BlockType.LEAVES]: "",
  [BlockType.SNOW]: "",
  [BlockType.SNOW_LEAVES]: "",
  [BlockType.CHEST]: "",
  [BlockType.CHEST_TOP]: "",
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
      BiomeType.DESERT,
    ],
    amplitudeRange: [20, 30],
    treeFrequency: TREE_FREQUENCY_PLAIN,
    tree: {
      leafType: BlockType.LEAVES,
      width: TREE_WIDTH,
    },
  },
  [BiomeType.DESERT]: {
    type: BiomeType.DESERT,
    top: BlockType.SAND,
    bottom: BlockType.SAND,
    neighbors: [
      BiomeType.DESERT,
      BiomeType.DESERT,
      BiomeType.DESERT,
      BiomeType.PLAIN,
    ],
    amplitudeRange: [20, 30],
    treeFrequency: THREE_FREQUENCY_DESERT,
    tree: {
      leafType: BlockType.LEAVES,
      width: PALM_TREE_WIDTH,
    },
  },
  [BiomeType.SNOW]: {
    type: BiomeType.SNOW,
    top: BlockType.SNOW,
    bottom: BlockType.DIRT,
    neighbors: [
      BiomeType.SNOW,
      BiomeType.SNOW,
      BiomeType.SNOW,
      BiomeType.SNOW_FORREST,
      BiomeType.PLAIN,
    ],
    amplitudeRange: [20, 40],
    treeFrequency: TREE_FREQUENCY_PLAIN,
    tree: {
      leafType: BlockType.SNOW_LEAVES,
      width: TREE_WIDTH,
    },
  },
  [BiomeType.FORREST]: {
    type: BiomeType.FORREST,
    top: BlockType.GRASS,
    bottom: BlockType.DIRT,
    neighbors: [BiomeType.FORREST, BiomeType.PLAIN, BiomeType.PLAIN],
    amplitudeRange: [20, 30],
    treeFrequency: TREE_FREQUENCY_FORREST,
    tree: {
      leafType: BlockType.LEAVES,
      width: TREE_WIDTH,
    },
  },
  [BiomeType.SNOW_FORREST]: {
    type: BiomeType.SNOW_FORREST,
    top: BlockType.SNOW,
    bottom: BlockType.DIRT,
    neighbors: [BiomeType.SNOW_FORREST, BiomeType.SNOW, BiomeType.SNOW],
    amplitudeRange: [20, 40],
    treeFrequency: TREE_FREQUENCY_FORREST,
    tree: {
      leafType: BlockType.SNOW_LEAVES,
      width: TREE_WIDTH,
    },
  },
};

export const CHESTS: Chest[] = [
  { coords: { x: -20, y: 5, z: -40 }, labelTexture: BlockType.LOG_LEADERSHIP },
  { coords: { x: 20, y: 5, z: -40 }, labelTexture: BlockType.LOG_HOBBIES },
  { coords: { x: 0, y: 5, z: -40 }, labelTexture: BlockType.LOG_COMPETITIONS },
  { coords: { x: -10, y: 5, z: -25 }, labelTexture: BlockType.LOG_PERSONAL_PROJECTS },
  { coords: { x: 10, y: 5, z: -25 }, labelTexture: BlockType.LOG_EDUCATION },
  { coords: { x: 0, y: 5, z: -10 }, labelTexture: BlockType.LOG_PROFESSIONAL_EXPERIENCE },
];