/**
 * Function that opens and closes a chest upon click
 */

import { InstancedMesh, Matrix4, Scene } from "three";

import { getBlockCount } from "../utils";

import {
  BLOCK_BOX_CHEST_TOP,
  BLOCK_SIZE,
  CHEST_BASE_BLOCK_HEIGHT,
  CHEST_OPEN_ANGLE,
  CHEST_TOP_BLOCK_HEIGHT,
  MAP_BLOCK_TO_TEXTURE
} from "../constants";
import { BlockType, Chunks, InstancedMeshes, Reference } from "../types";

const toggleChest = (
  scene: Scene,
  instancedMeshes: Reference<InstancedMeshes>,
  chunks: Chunks,
  x: number,
  y: number,
  z: number,
  isChestOpen: Reference<boolean>
) => {
  // Remove top chest mesh from scene
  scene.remove(instancedMeshes.value[BlockType.CHEST_TOP]);

  // Modify top chest mesh
  instancedMeshes.value[BlockType.CHEST_TOP] = new InstancedMesh(
    BLOCK_BOX_CHEST_TOP,
    MAP_BLOCK_TO_TEXTURE[BlockType.CHEST_TOP],
    getBlockCount(chunks)[BlockType.CHEST_TOP]
  );

  // Create count for InstancedMesh
  let count = 0;

  for (const chunk in chunks) {
    for (const blocks in chunks[chunk]) {
      for (let i = 0; i < chunks[chunk][blocks].length; i++) {
        const block = chunks[chunk][blocks][i];

        if (block && (block.type === BlockType.CHEST || block.type === BlockType.CHEST_TOP)) {
          let matrix = new Matrix4().makeTranslation(
            block.x,
            block.y - BLOCK_SIZE / 2 + CHEST_BASE_BLOCK_HEIGHT + CHEST_TOP_BLOCK_HEIGHT / 2,
            block.z
          );
  
          if (x === block.x && y === block.y && z === block.z) {
            matrix.makeRotationZ(
              isChestOpen.value ? 0 : CHEST_OPEN_ANGLE
            ).setPosition(
              isChestOpen.value ? block.x : block.x - BLOCK_SIZE,
              isChestOpen.value
                ? block.y - BLOCK_SIZE / 2 + CHEST_BASE_BLOCK_HEIGHT + CHEST_TOP_BLOCK_HEIGHT / 2
                : block.y - BLOCK_SIZE / 2 + CHEST_BASE_BLOCK_HEIGHT + CHEST_TOP_BLOCK_HEIGHT,
              block.z
            );
  
            isChestOpen.value = !isChestOpen.value;
          }
  
          instancedMeshes.value[BlockType.CHEST_TOP].setMatrixAt(count, matrix);
          count ++;
        }
      }
    }
  }

  scene.add(instancedMeshes.value[BlockType.CHEST_TOP]);
};

export default toggleChest;