/**
 * File where we store types
 */

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