import { CONFIG } from '../config.js';

export async function loadSvg(svgPath) {
  const response = await fetch(svgPath);

  return await response.text();
}

export function createSvg(element, container) {
  container.innerHTML = element;

  const svg = container.querySelector('svg');
  svg.style.backgroundColor = CONFIG.scene.background;

  return svg;
}
