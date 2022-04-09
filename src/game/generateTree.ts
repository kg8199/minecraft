/**
 * Function that generates a tree at x, y, z coordinates
 */

import { Block } from "../models";

import { BLOCK_SIZE, MAX_TREE_HEIGHT, TREE_HEIGHT, TREE_WIDTH } from "../constants";
import { BlockType } from "../types";
import { randRange } from "../utils";

const generateTree = (x: number, y: number, z: number, snow: boolean) => {
  const tree: Block[] = []
  const type: BlockType = snow ? BlockType.SNOW_LEAVES : BlockType.LEAVES;

  // TODO: Check if we exceed chunk => return

  // Generate trunc
  const height = randRange(TREE_HEIGHT, MAX_TREE_HEIGHT);
  for (let i = 1; i <= height; i++) {
    tree.push(new Block(x, y + i * BLOCK_SIZE, z, BlockType.LOG));
  }

  // Generate leaves
  for (let j = x - Math.floor(TREE_WIDTH / 2) * BLOCK_SIZE; j <= x + Math.floor(TREE_WIDTH / 2) * BLOCK_SIZE; j+=BLOCK_SIZE) {
    for (let k = z - Math.floor(TREE_WIDTH / 2) * BLOCK_SIZE; k <= z + Math.floor(TREE_WIDTH / 2) * BLOCK_SIZE; k+=BLOCK_SIZE) {
      tree.push(new Block(j, y + BLOCK_SIZE * height + BLOCK_SIZE, k, type));
      if (j === x || k === z) {
        tree.push(new Block(j, y + BLOCK_SIZE * height + BLOCK_SIZE * 2, k, type));
      }
      if (j === x && k === z) {
        tree.push(new Block(j, y + BLOCK_SIZE * height + BLOCK_SIZE * 3, k, type));
      }
    }
  }

  return tree;
};

export default generateTree;