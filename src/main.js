import { WebGLController } from './webgl/WebGLController.js';
import { SVGController } from './svg/SVGController.js';

// WebGL
const webglContainer = document.getElementById('scene-webgl-container');
const webgl = new WebGLController(webglContainer);
webgl.init();

// SVG
const svgContainer = document.getElementById('scene-svg-container');
const svg = new SVGController(svgContainer);
await svg.init();

// Action
const btnCloser = document.getElementById('btn');
btnCloser.addEventListener('click', async (event) => {
  event.preventDefault();
  svg.updateCircleColor(await webgl.toggle());
});
