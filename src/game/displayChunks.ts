/**
 * Function that displays the chunks we pass on the canvas
 */

import { Scene } from "three";

import { Chunks } from "../types";

const displayChunks = (scene: Scene, chunks: Chunks) => {
  for (const chunkKey in chunks) {
    const chunk = chunks[chunkKey];
    for (const key in chunk) {
      chunk[key].display(scene);
    }
  }
};

export default displayChunks;