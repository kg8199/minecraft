/**
 * File where we store types
 */

import { InstancedMesh, MeshBasicMaterial } from "three";

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
}

export type InstancedMeshes = {
  [key in BlockType]: InstancedMesh;
}

export enum BlockType {
  GRASS = "GRASS",
  DIRT = "DIRT",
  STONE = "STONE",
  SAND = "SAND",
  LOG = "LOG",
  GLASS = "GLASS",
  COBBLESTONE = "COBBLESTONE",
  PLANK = "PLANK",
  BRICK = "BRICK",
  OBSIDIAN = "OBSIDIAN",
  BEDROCK = "BEDROCK",
  SNOW = "SNOW",
  SNOW_LEAVES = "SNOW_LEAVES",
  WATER = "WATER",
  LEAVES = "LEAVES",
}

export enum BiomeType {
  PLAIN = "PLAIN",
  DESERT = "DESERT",
  SNOW = "SNOW",
  FORREST = "FORREST",
  SNOW_FORREST = "SNOW_FORREST"
}

export interface Biome {
  top: BlockType;
  bottom: BlockType;
  neighbors: BiomeType[];
  amplitudeRange: [number, number];
  treeFrequency: number;
  leafType: BlockType;
}

export type Biomes = {
  [key in BiomeType]: Biome;
}