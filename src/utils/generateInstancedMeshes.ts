/**
 * Generates an instanced mesh for each block type
 */

import { InstancedMesh } from "three";
import { BLOCK_BOX, INITIAL_BLOCK_COUNT, MAP_BLOCK_TO_TEXTURE } from "../constants";
import { BlockType, InstancedMeshes } from "../types";

const generateInstancedMeshes = (): InstancedMeshes => {
  let instancedMeshes: InstancedMeshes = {} as InstancedMeshes;

  for (const blockType in MAP_BLOCK_TO_TEXTURE) {
    instancedMeshes[blockType as BlockType] = new InstancedMesh(
      BLOCK_BOX,
      MAP_BLOCK_TO_TEXTURE[blockType as BlockType],
      INITIAL_BLOCK_COUNT
    );
  }

  return instancedMeshes;
};

export default generateInstancedMeshes;