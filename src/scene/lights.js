import * as THREE from 'three';
import { CONFIG } from '../config.js';

export function createLights(scene, camera) {
  const { directional, ambient } = CONFIG.lights;

  const directionalLight = new THREE.DirectionalLight(directional.color, directional.intensity);
  directionalLight.position.set(directional.position.x, directional.position.y, directional.position.z);

  camera.add(directionalLight);
  scene.add(camera);

  const ambientLight = new THREE.AmbientLight(ambient.color, ambient.intensity);
  scene.add(ambientLight);

  return { directionalLight, ambientLight };
}
