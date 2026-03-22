import * as THREE from 'three';

export function addDirectionalLightHelpers(scene, directionalLight, size = 2) {
  const helper = new THREE.DirectionalLightHelper(directionalLight, size, 0xff0000);

  const sourceHelper = new THREE.Mesh(new THREE.SphereGeometry(0.2), new THREE.MeshBasicMaterial({ color: 0xffff00 }));
  sourceHelper.position.copy(directionalLight.position);

  const targetHelper = new THREE.Mesh(new THREE.SphereGeometry(0.15), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
  targetHelper.position.set(0, 0, 0);

  scene.add(helper);
  scene.add(sourceHelper);
  scene.add(targetHelper);

  return { helper, sourceHelper, targetHelper };
}

export function removeDirectionalLightHelpers(scene, helpers) {
  if (!helpers) return;

  Object.values(helpers).forEach((obj) => {
    if (obj) {
      scene.remove(obj);
      obj.geometry?.dispose?.();
      obj.material?.dispose?.();
    }
  });
}
