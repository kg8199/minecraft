/**
 * Returns the intersection from the raycaster
 */

import { Intersection, Object3D, Raycaster, Vector2, Event, Camera } from "three";

import { RAYCASTER_DISTANCE } from "../constants";
import { BlockType, InstancedMeshes, Reference } from "../types";

const getRaycasterIntersection = (
  camera: Camera,
  instancedMeshes: Reference<InstancedMeshes>): Intersection<Object3D<Event>>[] => {
  let intersection: Intersection<Object3D<Event>>[] = [];
  let currentDistance = Infinity;

  const raycaster = new Raycaster(); // Ray that is shot from the camera to detect objects
  const pointer = new Vector2(0,0); // Vector that is shot by the raycaster

  raycaster.setFromCamera(pointer, camera); // Create the ray

  // Loop over the meshes to check which mesh we intersect the closest
  for (const instancedMesh in instancedMeshes.value) {
    const potentialIntersection = raycaster.intersectObject(instancedMeshes.value[instancedMesh as BlockType]);
    if (
      potentialIntersection.length
      && potentialIntersection[0].distance < RAYCASTER_DISTANCE
      && potentialIntersection[0].distance < currentDistance
    ) {
      intersection = potentialIntersection;
      currentDistance = potentialIntersection[0].distance;
    }
  }

  return intersection;
};

export default getRaycasterIntersection;