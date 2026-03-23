export const CONFIG = {
  scene: {
    background: 'white',
  },

  renderer: {
    antialias: true,
  },

  camera: {
    frustumSize: 5,
    near: 1,
    far: 1000,
    position: { x: 0, y: 0, z: 10 },
  },

  cubes: {
    size: 2,
    colorApart: 'green',
    colorTogether: 'red',
    minDistance: 3.0,
    maxDistance: 8.0,
    animationSpeed: 0.15,
  },

  lights: {
    directional: {
      color: 'white',
      intensity: 100,
      position: { x: 8, y: 2, z: -10 },
    },
    ambient: {
      color: 'white',
      intensity: 5,
    },
  },

  shear: {
    alpha: Math.PI / 4,
    scaleZ: 0.25,
  },
};
