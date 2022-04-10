/**
 * Generates an instanced mesh for each block type
 */

import { InstancedMesh } from "three";
import { BLOCK_BOX, BLOCK_BOX_CHEST_BASE, BLOCK_BOX_CHEST_TOP, INITIAL_BLOCK_COUNT, MAP_BLOCK_TO_TEXTURE } from "../constants";
import { BlockType, InstancedMeshes } from "../types";

const generateInstancedMeshes = (): InstancedMeshes => {
  let instancedMeshes: InstancedMeshes = {} as InstancedMeshes;

  for (const blockType in MAP_BLOCK_TO_TEXTURE) {
    const type = blockType as BlockType;
    if (type === BlockType.CHEST) {
      instancedMeshes[type] = new InstancedMesh(
        BLOCK_BOX_CHEST_BASE,
        MAP_BLOCK_TO_TEXTURE[type],
        INITIAL_BLOCK_COUNT
      );
    } else if (type === BlockType.CHEST_TOP) {
      instancedMeshes[type] = new InstancedMesh(
        BLOCK_BOX_CHEST_TOP,
        MAP_BLOCK_TO_TEXTURE[type],
        INITIAL_BLOCK_COUNT
      );
    } else {
      instancedMeshes[type] = new InstancedMesh(
        BLOCK_BOX,
        MAP_BLOCK_TO_TEXTURE[type],
        INITIAL_BLOCK_COUNT
      );
    }
  }

  return instancedMeshes;
};

export default generateInstancedMeshes;