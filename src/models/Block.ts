import { MeshBasicMaterial } from "three";

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

  public constructor(x: number, y: number, z: number, texture: MeshBasicMaterial[]) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.texture = texture;
  }
}

export default Block;
