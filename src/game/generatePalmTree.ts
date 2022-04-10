/**
 * Function that generates a palm tree
 */

import { Block } from "../models";

import { BLOCK_SIZE, MAX_PALM_TREE_HEIGHT, PALM_TREE_HEIGHT, PALM_TREE_SHIFT_TRESHOLD, PALM_TREE_WIDTH } from "../constants";
import { BlockType, Chunk } from "../types";
import { randRange } from "../utils";
 
const generatePalmTree = (chunk: Chunk, x: number, y: number, z: number, leafType: BlockType) => {
  // Generate trunc
  let chunkKey = `${x},${z}`;
  let currentTruncX = x;
  let currentTruncZ = z;
  const height = randRange(PALM_TREE_HEIGHT, MAX_PALM_TREE_HEIGHT);
  for (let i = 1; i <= height; i++) {
    chunk[chunkKey].push(new Block(currentTruncX, y + i * BLOCK_SIZE, currentTruncZ, BlockType.LOG));

    // Shift the trunc of the key when treshold reached
    if (i === PALM_TREE_SHIFT_TRESHOLD) {
      if (Math.random() < 1/4) {
        currentTruncX += BLOCK_SIZE;
        chunkKey = `${currentTruncX},${currentTruncZ}`;
      } else if (Math.random() < 1/2) {
        currentTruncX -= BLOCK_SIZE;
        chunkKey = `${currentTruncX},${currentTruncZ}`;
      } else if (Math.random() < 3/4) {
        currentTruncZ += BLOCK_SIZE;
        chunkKey = `${currentTruncX},${currentTruncZ}`;
      } else {
        currentTruncZ -= BLOCK_SIZE
        chunkKey = `${currentTruncX},${currentTruncZ}`;
      }
    }
  }

  // Generate leaves
  for (let j = currentTruncX - Math.floor(PALM_TREE_WIDTH / 2) * BLOCK_SIZE;
  j <= currentTruncX + Math.floor(PALM_TREE_WIDTH / 2) * BLOCK_SIZE; j+=BLOCK_SIZE) {
    for (let k = currentTruncZ - Math.floor(PALM_TREE_WIDTH / 2) * BLOCK_SIZE;
    k <= currentTruncZ + Math.floor(PALM_TREE_WIDTH / 2) * BLOCK_SIZE; k+=BLOCK_SIZE) {
      const key = `${j},${k}`;
      if (chunk[key] && (j === currentTruncX || k === currentTruncZ)) {
        if (
          j === currentTruncX - Math.floor(PALM_TREE_WIDTH / 2) * BLOCK_SIZE
          || j === currentTruncX + Math.floor(PALM_TREE_WIDTH / 2) * BLOCK_SIZE
          || k === currentTruncZ - Math.floor(PALM_TREE_WIDTH / 2) * BLOCK_SIZE
          || k === currentTruncZ + Math.floor(PALM_TREE_WIDTH / 2) * BLOCK_SIZE
        ) {
          chunk[key].push(new Block(j, y + BLOCK_SIZE * height, k, leafType));
        } else {
          chunk[key].push(new Block(j, y + BLOCK_SIZE * height + BLOCK_SIZE, k, leafType));
        }
      }
    }
  }
};
 
export default generatePalmTree;