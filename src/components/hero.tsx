import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import type { Group } from "three";
import * as THREE from "three";
import "../styles/hero.css";
import "../styles/hero-blobs.css";

const MODEL_PATH = "/models/building3.glb";

function BuildingModel({ scrollY }: { scrollY: number }) {
  const { scene } = useGLTF(MODEL_PATH);
  const modelRef = useRef<Group>(null);
  const baseScale = 0.08;
  const maxScale = 0.16;
  const currentRotation = useRef(0);
  const currentScale = useRef(baseScale);

  // Target rotation based on scroll position
  const targetRotation = scrollY * 0.006;
  // Target scale based on scroll position
  const targetScale = baseScale + Math.min(scrollY * 0.00005, maxScale - baseScale);

  // Smooth interpolation using useFrame for eased rotation and scale
  useFrame(() => {
    if (modelRef.current) {
      // Lerp for smooth easing (0.08 = smoothing factor, lower = smoother)
      currentRotation.current = THREE.MathUtils.lerp(
        currentRotation.current,
        targetRotation,
        0.08
      );
      currentScale.current = THREE.MathUtils.lerp(
        currentScale.current,
        targetScale,
        0.08
      );
      modelRef.current.rotation.y = currentRotation.current;
      modelRef.current.scale.setScalar(currentScale.current);
    }
  });

  return (
    <group position={[1, 0, 0]}>
      <group ref={modelRef} scale={baseScale}>
        <Center>
          <primitive object={scene} />
        </Center>
      </group>
    </group>
  );
}

// Preload the model
useGLTF.preload(MODEL_PATH);

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="hero-canvas-layer">
        <Canvas
          camera={{ position: [5, 3, 5], fov: 50 }}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={2} />
          <directionalLight position={[5, 5, 5]} intensity={2} />
          <directionalLight position={[-5, 3, -5]} intensity={1} />
          <Suspense fallback={null}>
            <BuildingModel scrollY={scrollY} />
          </Suspense>
        </Canvas>
      </div>

      <section className="hero-section">
        <div className="hero-blobs">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
          <div className="blob blob-4" />
          <div className="blob blob-5" />
          <div className="blob blob-6" />
        </div>

        <div className="hero-container">
          <div
            className="hero-content"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
              opacity: Math.max(0, 1 - scrollY * 0.002),
            }}
          >
            <h1 className="hero-title">
              Where Vision
              <br />
              Becomes Structure
            </h1>
            <p className="hero-description">
              Thoughtfully designed residential and commercial projects shaped by
              quality, safety, and innovation.
            </p>
            <button className="hero-cta">Explore Projects</button>
          </div>
        </div>
      </section>
    </>
  );
}
