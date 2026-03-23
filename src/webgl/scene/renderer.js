import * as THREE from 'three';

export function createRenderer(container) {
  const renderer = new THREE.WebGLRenderer();

  function updateSize() {
    const width = container.clientWidth;
    const height = container.clientHeight;

    renderer.setSize(width, height);
  }

  updateSize();
  container.appendChild(renderer.domElement);

  return { renderer, updateSize };
}
