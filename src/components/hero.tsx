import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import type { Group } from "three";
import "../styles/hero.css";
import "../styles/hero-blobs.css";

const MODEL_PATH = "/models/building3.glb";

function BuildingModel({ scrollY }: { scrollY: number }) {
  const { scene } = useGLTF(MODEL_PATH);
  const modelRef = useRef<Group>(null);
  const baseRotation = useRef(0);
  const baseScale = 0.08;

  useFrame((_, delta) => {
    if (modelRef.current) {
      const rotationSpeed = 0.3 + scrollY * 0.001;
      baseRotation.current += delta * rotationSpeed;
      modelRef.current.rotation.y = baseRotation.current;
    }
  });

  const scrollScale = baseScale + Math.min(scrollY * 0.00003, 0.02);
  const scrollPosY = -Math.min(scrollY * 0.003, 5);

  return (
    <group position={[1, scrollPosY, 0]}>
      <group ref={modelRef}>
        <Center>
          <primitive object={scene} scale={scrollScale} />
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

  const maxScroll = 800;
  const progress = Math.min(scrollY / maxScroll, 1);
  const moveLeft = progress * 20;

  return (
    <>
      <div
        className="hero-canvas-layer"
        style={{ transform: `translateX(-${moveLeft}vw)` }}
      >
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
