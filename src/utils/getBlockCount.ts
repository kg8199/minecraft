/**
 * Function that returns the block count of a group of chunks
 */

import { BlockType, Chunks } from "../types";

const getBlockCount = (chunks: Chunks, blockType: BlockType): number => {
  let count = 0;
  for (const chunk in chunks) {
    for (const block in chunks[chunk]) {
      const blocks = chunks[chunk][block];
      for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].type === blockType) count++;
      }
    }
  }
  return count;
};

export default getBlockCount;