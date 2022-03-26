/**
 * File where we store types
 */

import { Block } from "./models";

export interface Chunk {
  [key: string]: Block;
}
