/**
 * File where we store types
 */

import { Block } from "./models";

export interface BlockStorage {
  [key: string]: Block;
}
