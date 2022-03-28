/**
 * Function that returns the block count of a group of chunks
 */

import { Chunks } from "../types";

const getBlockCount = (chunks: Chunks): number => {
  let count = 0;
  for (const chunk in chunks) {
    for (const block in chunks[chunk]) {
      count += chunks[chunk][block].length;
    }
  }
  return count;
};

export default getBlockCount;