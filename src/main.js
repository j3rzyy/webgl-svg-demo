import { CONFIG } from './config.js';
import { createScene } from './scene/scene.js';
import { createCamera } from './scene/camera.js';
import { createRenderer } from './scene/renderer.js';
import { createLights } from './scene/lights.js';
import { createCubes } from './scene/cubes.js';
import { createCubeAnimation } from './animation/cubeAnimation.js';
import { addSvg, getSvg } from './svg/svgController.js';

function getAspect() {
  return container.clientWidth / container.clientHeight;
}

function onWindowResize() {
  const aspect = getAspect();
  const d = CONFIG.camera.frustumSize;

  camera.left = -d * aspect;
  camera.right = d * aspect;
  camera.top = d;
  camera.bottom = -d;
  camera.updateProjectionMatrix();

  updateSize();
  animation.animate();
}

async function onClickHandler(event) {
  event.preventDefault();
  const isTogether = await animation.toggle();
  updateCircleColor(isTogether);
}

function updateCircleColor(isTogether) {
  if (!circle) return;

  const color = isTogether ? CONFIG.cubes.colorTogether : CONFIG.cubes.colorApart;

  circle.setAttribute('fill', color);
}

// wedgl
const container = document.getElementById('scene-webgl-container');

const scene = createScene();
const { renderer, updateSize } = createRenderer(container);

const camera = createCamera(getAspect());
const { directionalLight } = createLights(scene, camera);
const { cube1, cube2 } = createCubes(scene);

window.addEventListener('resize', onWindowResize);

const animation = createCubeAnimation(cube1, cube2, renderer, scene, camera);

if (CONFIG.DEBUG_LIGHT) {
  import('./helpers/lightHelper.js').then(({ addDirectionalLightHelpers }) => {
    addDirectionalLightHelpers(scene, directionalLight, 2);
    animation.animate();
  });
}

animation.animate();

// svg
const svgContainer = document.getElementById('scene-svg-container');
let circle = null;

const svgEl = await getSvg('./src/assets/circle.svg');
circle = addSvg(svgEl, svgContainer).getElementById('main-circle');

// action
const btnCloser = document.getElementById('btn');

btnCloser.addEventListener('click', onClickHandler);
