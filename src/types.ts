/**
 * File where we store types
 */

import { Block } from "./models";

export interface Chunk {
  [key: string]: Block;
}

export interface Chunks {
  [key: string]: Chunk;
}

export interface CurrentChunk {
  value: string;
}

export enum Side {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  BOTTOM = "BOTTOM",
  TOP = "TOP",
  BACK = "BACK",
  FRONT = "FRONT"
}

export type Sides = {
  [key in Side]: [number, number, number];
};