/**
 * Function that generates a tree at x, y, z coordinates
 */

import { Block } from "../models";

import { BLOCK_SIZE, MAX_TREE_HEIGHT, TREE_HEIGHT, TREE_WIDTH } from "../constants";
import { BlockType, Chunk } from "../types";
import { randRange } from "../utils";

const generateTree = (chunk: Chunk, x: number, y: number, z: number, leafType: BlockType) => {
  // Generate trunc
  const height = randRange(TREE_HEIGHT, MAX_TREE_HEIGHT);
  for (let i = 1; i <= height; i++) {
    chunk[`${x},${z}`].push(new Block(x, y + i * BLOCK_SIZE, z, BlockType.LOG));
  }

  // Generate leaves
  for (let j = x - Math.floor(TREE_WIDTH / 2) * BLOCK_SIZE; j <= x + Math.floor(TREE_WIDTH / 2) * BLOCK_SIZE; j+=BLOCK_SIZE) {
    for (let k = z - Math.floor(TREE_WIDTH / 2) * BLOCK_SIZE; k <= z + Math.floor(TREE_WIDTH / 2) * BLOCK_SIZE; k+=BLOCK_SIZE) {
      const key = `${j},${k}`;
      if (chunk[key]) {
        chunk[key].push(new Block(j, y + BLOCK_SIZE * height + BLOCK_SIZE, k, leafType));
        if (j === x || k === z) {
          chunk[key].push(new Block(j, y + BLOCK_SIZE * height + BLOCK_SIZE * 2, k, leafType));
        }
        if (j === x && k === z) {
          chunk[key].push(new Block(j, y + BLOCK_SIZE * height + BLOCK_SIZE * 3, k, leafType));
        }
      }
    }
  }
};

export default generateTree;