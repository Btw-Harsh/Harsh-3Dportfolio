import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const blobUrl = "/models/avatar.glb";

        let character: THREE.Object3D;
      loader.load(
        blobUrl,
        async (gltf) => {

          character = gltf.scene;

          // Adjust size of model
          character.scale.set(8.2, 8.2, 8.2);

          await renderer.compileAsync(character, camera, scene);

          character.traverse((child: any) => {
            if (child.isMesh) {

              const mesh = child as THREE.Mesh;

              mesh.castShadow = true;
              mesh.receiveShadow = true;
              mesh.frustumCulled = true;

            }
          });

          resolve(gltf);

          // Scroll animation
          try {
            setCharTimeline(character, camera);
            setAllTimeline();
          } catch (e) {
            console.warn("GSAP animation skipped for custom model");
          }

          // Safe bone handling
          const footR = character.getObjectByName("footR");
          const footL = character.getObjectByName("footL");

          if (footR) footR.position.y = 3.36;
          if (footL) footL.position.y = 3.36;

          dracoLoader.dispose();

        },
        undefined,
        (error) => {
          console.error("Error loading GLTF model:", error);
          reject(error);
        }
      );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
