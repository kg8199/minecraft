import { BlockType } from "../types";

/**
 * The Block class builds the squared object that we see in the game (example: cube of dirt, cube of sand, water...)
 */

class Block {
  // Coordinates of the block
  x: number;
  y: number;
  z: number;

  // Modal
  modalId: string;

  // Texture of the block (grass, stone, dirt...)
  type: BlockType;

  public constructor(x: number, y: number, z: number, type: BlockType, modalId: string = "") {
    this.x = x;
    this.y = y;
    this.z = z;
    this.type = type;
    this.modalId = modalId;
  }
}

export default Block;
