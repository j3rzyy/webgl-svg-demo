import { CONFIG } from '../config.js';

export function createCubeAnimation(cube1, cube2, renderer, scene, camera) {
  const {
    minDistance,
    maxDistance,
    animationSpeed,
    colorApart = CONFIG.colorApart,
    colorTogether = CONFIG.colorTogether,
  } = CONFIG.cubes;

  let currentDistance = maxDistance;
  let targetDistance = maxDistance;
  let isAnimating = false;
  let isTogether = false;

  let resolveAnimation = null;

  function updatePositions() {
    cube1.position.set(-currentDistance / 2, 0, 0);
    cube2.position.set(currentDistance / 2, 0, 0);
  }

  function updateColor() {
    const targetColor = isTogether ? colorTogether : colorApart;
    cube1.material.color.set(targetColor);
    cube2.material.color.set(targetColor);
  }

  function animate() {
    if (isAnimating) {
      const diff = targetDistance - currentDistance;

      if (Math.abs(diff) < animationSpeed) {
        currentDistance = targetDistance;
        isAnimating = false;
        updateColor();

        if (resolveAnimation) {
          resolveAnimation(isTogether);
          resolveAnimation = null;
        }
      } else {
        currentDistance += Math.sign(diff) * animationSpeed;
        requestAnimationFrame(animate);
      }

      updatePositions();
    }

    renderer.render(scene, camera);
  }

  function toggle() {
    return new Promise((resolve) => {
      if (isAnimating) {
        resolve(false);
        return;
      }

      resolveAnimation = resolve;

      if (isTogether) {
        targetDistance = maxDistance;
      } else {
        targetDistance = minDistance;
      }

      isTogether = !isTogether;
      isAnimating = true;
      animate();
    });
  }

  updatePositions();

  return {
    animate,
    toggle,
    isTogether: () => isTogether,
  };
}
