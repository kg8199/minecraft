import {
  Scene,
  BoxBufferGeometry,
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

  // Method that displays the block
  public display = (scene: Scene, chunks: Chunks) => {
    // Get hidden sizes
    this.getHiddenSides(chunks);

    // Create the block
    // Create a new box (width, height, depth)
    const blockBox = new BoxBufferGeometry(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    this.mesh = new Mesh(
      blockBox,
      [
        this.hiddenSides.includes(Side.RIGHT) ? null : this.texture[0],
        this.hiddenSides.includes(Side.LEFT) ? null : this.texture[1],
        this.hiddenSides.includes(Side.TOP) ? null : this.texture[2],
        this.hiddenSides.includes(Side.BOTTOM) ? null : this.texture[3],
        this.hiddenSides.includes(Side.FRONT) ? null : this.texture[4],
        this.hiddenSides.includes(Side.BACK) ? null : this.texture[5],
      ]
    ); // Combine the block and the material

    // Position the block
    this.mesh.position.x = this.x;
    this.mesh.position.y = this.y;
    this.mesh.position.z = this.z;

    // Display the block
    scene.add(this.mesh); // Add the block to the scene (our environement)
  };
}

export default Block;
