import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

const Scene = () => {

  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  useEffect(() => {

    if (!canvasDiv.current) return;

    const rect = canvasDiv.current.getBoundingClientRect();
    const aspect = rect.width / rect.height;

    const scene = sceneRef.current;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });

    renderer.setSize(rect.width, rect.height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;

    canvasDiv.current.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    let mixer: THREE.AnimationMixer | undefined;
    let characterObject: THREE.Object3D | null = null;

    const clock = new THREE.Clock();

    const light = setLighting(scene);

    const progress = setProgress((value) => setLoading(value));
    const { loadCharacter } = setCharacter(renderer, scene, camera);

    /* LOAD CHARACTER */

    loadCharacter().then((gltf) => {

      if (!gltf) return;

      const animations = setAnimations(gltf);

      if ("mixer" in animations && animations.mixer) {
        mixer = animations.mixer;
      }

      characterObject = gltf.scene;
      scene.add(characterObject);

      progress.loaded().then(() => {

        setTimeout(() => {

          light.turnOnLights();

          if ("startIntro" in animations && typeof animations.startIntro === "function") {
            animations.startIntro();
          }

        }, 2500);

      });

      window.addEventListener("resize", () =>
        handleResize(renderer, camera, canvasDiv, characterObject!)
      );

    });

    /* SCROLL HIDE LOGIC */

    const handleScroll = () => {

      const section = document.querySelector(".whatIDO");

      if (!section || !canvasDiv.current) return;

      const rect = section.getBoundingClientRect();

      if (rect.top < window.innerHeight * 0.8) {

        canvasDiv.current.style.transition = "all 0.8s ease";
        canvasDiv.current.style.opacity = "0";
        canvasDiv.current.style.transform = "translateY(-200px) scale(0.85)";

      } else {

        canvasDiv.current.style.transition = "all 0.8s ease";
        canvasDiv.current.style.opacity = "1";
        canvasDiv.current.style.transform = "translateY(0px) scale(1)";

      }

    };

    window.addEventListener("scroll", handleScroll);

    /* RENDER LOOP */

    const animate = () => {

      requestAnimationFrame(animate);

      const delta = clock.getDelta();

      if (mixer) mixer.update(delta);

      renderer.render(scene, camera);

    };

    animate();

    return () => {

      scene.clear();
      renderer.dispose();

      window.removeEventListener("scroll", handleScroll);

      if (canvasDiv.current) {
        canvasDiv.current.removeChild(renderer.domElement);
      }

    };

  }, []);

  return (

    <div className="character-container">

      <div className="character-model" ref={canvasDiv}>
        <div className="character-rim"></div>
      </div>

    </div>

  );

};

export default Scene;