/**
 * Function that displays the chunks we pass on the canvas
 */

import { Scene } from "three";

import { Chunk } from "../types";

const displayChunks = (scene: Scene, chunks: Chunk[]) => {
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    for (const key in chunk) {
      chunk[key].display(scene);
    }
  }
};

export default displayChunks;