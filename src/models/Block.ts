import {
  MeshBasicMaterial,
  Mesh,
} from "three";

import { BLOCK_SIZE, SIDES } from "../constants";
import { Chunks, Side } from "../types";

/**
 * The Block class builds the squared object that we see in the game (example: cube of dirt, cube of sand, water...)
 */

class Block {
  // Coordinates of the block
  x: number;
  y: number;
  z: number;

  // Texture of the block (grass, stone, dirt...)
  texture: MeshBasicMaterial[];

  // Visuals of the Block
  hiddenSides: Side[] = [];
  mesh: Mesh;

  public constructor(x: number, y: number, z: number, texture: MeshBasicMaterial[]) {
    this.x = x;
    this.y = y - BLOCK_SIZE * 2; // Initiate the Block Y position under the player position
    this.z = z;
    this.texture = texture;
  }

  // Method that determines whether a block is at position x,y,z
  private getVoxel = (chunks: Chunks, x: number, y: number, z: number): boolean => {
    const potentialKey = `${x},${z}`;
    for (let chunk in chunks) {
      if (chunks[chunk][potentialKey] && chunks[chunk][potentialKey].y === y) return true;
    }
    return false;
  }

  // Methods that finds the hidden faces of the Block
  getHiddenSides = (chunks: Chunks) => {
    for (let key in SIDES) {
      const side = SIDES[key as Side];
      const neighbor = this.getVoxel(chunks, this.x + side[0], this.y + side[1], this.z + side[2]);
      if (neighbor) {
        this.hiddenSides.push(key as Side);
      }
    }
  }
}

export default Block;
