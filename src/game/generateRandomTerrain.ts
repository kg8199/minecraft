/**
 * Function that generates random blocks using Perlin Noise
 */

import { Scene, MeshBasicMaterial, TextureLoader } from "three";

import { Noise, Block } from "../models";

import { BLOCK_SIZE, PERLIN_INCREMENT, PERLIN_AMPLITUDE } from "../constants";
import { BlockStorage } from "../types";

const generateRandomTerrain = (scene: Scene, blocks: BlockStorage) => {
  let noise = new Noise();
  noise.seed(Math.random());

  // Load the texture of the blocks
  const loader = new TextureLoader();
  const texture: MeshBasicMaterial[] = [
    new MeshBasicMaterial({ map: loader.load("../../assets/texture/grass/side4.png") }),
    new MeshBasicMaterial({ map: loader.load("../../assets/texture/grass/side1.png") }),
    new MeshBasicMaterial({ map: loader.load("../../assets/texture/grass/top.png") }),
    new MeshBasicMaterial({ map: loader.load("../../assets/texture/grass/bottom.png") }),
    new MeshBasicMaterial({ map: loader.load("../../assets/texture/grass/side2.png") }),
    new MeshBasicMaterial({ map: loader.load("../../assets/texture/grass/side3.png") }),
  ];

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
      const block = new Block(blockX, y, blockZ, texture);

      blocks[`${blockX},${blockZ}`] = block;
      block.display(scene);
      xoff += PERLIN_INCREMENT;
    }
    zoff += PERLIN_INCREMENT;
  }
};

export default generateRandomTerrain;
