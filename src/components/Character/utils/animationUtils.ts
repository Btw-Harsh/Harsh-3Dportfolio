import * as THREE from "three";
import { GLTF } from "three-stdlib";

const setAnimations = (gltf: GLTF) => {

  if (!gltf.animations || gltf.animations.length === 0) {
    console.warn("No animations found in model");
    return { mixer: null };
  }

  const character = gltf.scene;
  const mixer = new THREE.AnimationMixer(character);

  gltf.animations.forEach((clip) => {
    const action = mixer.clipAction(clip);
    action.play();
  });

  return { mixer };
};

export default setAnimations;