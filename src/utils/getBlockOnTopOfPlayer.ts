/**
 * Function that returns the block that is on top of the player
 */

import { Block } from "../models";

import getCurrentChunk from "./getCurrentChunk";
import getCurrentBlocks from "./getCurrentBlocks";

import { Chunks } from "../types";

const getBlockOnTopOfPlayer = (x: number, y: number, z: number, chunks: Chunks): Block | null => {
  let currentBlock: Block | null = null;

  const chunk = getCurrentChunk(x, z);
  const blocksKey = getCurrentBlocks(x, z);

  if (chunks[chunk] && chunks[chunk][blocksKey]) {
    const blocks = chunks[chunk][blocksKey];
    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i].y > y && (!currentBlock || blocks[i].y < currentBlock.y)) {
        currentBlock = blocks[i];
      }
    }
  }

  return currentBlock;
};

export default getBlockOnTopOfPlayer;