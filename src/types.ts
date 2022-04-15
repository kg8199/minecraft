/**
 * File where we store types
 */

import { InstancedMesh, Matrix4, MeshBasicMaterial } from "three";

import { Block } from "./models";

export interface Chunk {
  [key: string]: Block[];
}

export interface Chunks {
  [key: string]: Chunk;
}

export interface Exists {
  [key: string]: boolean;
}

export interface Level {
  [key: string]: number;
}

export interface Reference<T> {
  value: T;
}

export interface Coordinates {
  x: number;
  y: number;
  z: number;
}

export type MapBlockTypeToTexture = {
  [key in BlockType]: MeshBasicMaterial[];
};

export type InstancedMeshes = {
  [key in BlockType]: InstancedMesh;
};

export enum BlockType {
  GRASS = "GRASS",
  DIRT = "DIRT",
  SAND = "SAND",
  LOG = "LOG",
  GLASS = "GLASS",
  COBBLESTONE = "COBBLESTONE",
  PLANK = "PLANK",
  BRICK = "BRICK",
  OBSIDIAN = "OBSIDIAN",
  LEAVES = "LEAVES",
  BEDROCK = "BEDROCK",
  SNOW = "SNOW",
  SNOW_LEAVES = "SNOW_LEAVES",
  WATER = "WATER",
  LOG_EDUCATION = "LOG_EDUCATION",
  LOG_PROFESSIONAL_EXPERIENCE = "LOG_PROFESSIONAL_EXPERIENCE",
  LOG_PERSONAL_PROJECTS = "LOG_PERSONAL_PROJECTS",
  LOG_COMPETITIONS = "LOG_COMPETITIONS",
  LOG_LEADERSHIP = "LOG_LEADERSHIP",
  LOG_HOBBIES = "LOG_HOBBIES",
  CHEST = "CHEST",
  STONE = "STONE",
  CHEST_TOP = "CHEST_TOP",
}

export enum BiomeType {
  PLAIN = "PLAIN",
  DESERT = "DESERT",
  SNOW = "SNOW",
  FORREST = "FORREST",
  SNOW_FORREST = "SNOW_FORREST",
}

export interface Tree {
  leafType: BlockType;
  width: number;
}

export interface Biome {
  type: BiomeType;
  top: BlockType;
  bottom: BlockType;
  neighbors: BiomeType[];
  amplitudeRange: [number, number];
  treeFrequency: number;
  tree: Tree;
}

export type Biomes = {
  [key in BiomeType]: Biome;
};

export interface Chest {
  coords: Coordinates;
  labelTexture: BlockType;
  modalId: string;
}

export interface BlockSound {
  place: string;
  break: string;
  open?: string;
  close?: string;
}

export type MapBlockToSound = {
  [key in BlockType]: BlockSound;
}