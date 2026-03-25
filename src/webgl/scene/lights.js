import * as THREE from 'three';
import { CONFIG } from '../../config.js';

export function createLights(scene, camera) {
  const { directional, ambient } = CONFIG.lights;

  const directionalLight = new THREE.DirectionalLight(directional.color, directional.intensity);
  directionalLight.position.set(directional.position.x, directional.position.y, directional.position.z);

  const ambientLight = new THREE.AmbientLight(ambient.color, ambient.intensity);

  return { directionalLight, ambientLight };
}
