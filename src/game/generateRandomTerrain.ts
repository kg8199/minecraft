/**
 * Function that generates random blocks using Perlin Noise
 */

import { Scene } from "three";

import { Noise, Block } from "../models";

import { BLOCK_SIZE, PERLIN_INCREMENT, PERLIN_AMPLITUDE } from "../constants";
import { BlockStorage } from "../types";

const generateRandomTerrain = (scene: Scene, blocks: BlockStorage) => {
  let noise = new Noise();
  noise.seed(Math.random());

  let xoff = 0; // Increment on the x axis
  let zoff = 0; // Increment on the y axis
  for (let x = 0; x < 20; x++) {
    xoff = 0;
    for (let z = 0; z < 20; z++) {
      const blockX = x * BLOCK_SIZE;
      const blockZ = z * BLOCK_SIZE;
      const y =
        Math.round(
          (noise.perlin2(xoff, zoff) * PERLIN_AMPLITUDE) / BLOCK_SIZE
        ) * BLOCK_SIZE;
      const block = new Block(blockX, y, blockZ);

      blocks[`${blockX},${blockZ}`] = block;
      block.display(scene);
      xoff += PERLIN_INCREMENT;
    }
    zoff += PERLIN_INCREMENT;
  }
};

export default generateRandomTerrain;
