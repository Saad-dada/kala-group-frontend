import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import type { Group } from "three";
import * as THREE from "three";
import "../styles/hero.css";

const MODEL_PATH = "/models/building3.glb";

function BuildingModel({ scrollY, isMobile }: { scrollY: number; isMobile: boolean }) {
  const { scene } = useGLTF(MODEL_PATH);
  const modelRef = useRef<Group>(null);
  // Slightly larger on mobile as requested
  const baseScale = isMobile ? 0.12 : 0.07;
  const maxScale = isMobile ? 0.18 : 0.16;
  const currentRotation = useRef(0);
  const currentScale = useRef(baseScale);

  // Optimize materials and geometry once on mount
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Enable frustum culling
        child.frustumCulled = true;
        
        if (child.material) {
          const material = child.material as THREE.Material;
          // Optimize material settings
          material.precision = 'mediump';
          
          // Optimize shadows (disable if not needed)
          child.castShadow = false;
          child.receiveShadow = false;
        }

        // Simplify geometry on mobile devices
        if (isMobile && child.geometry) {
          const geometry = child.geometry;
          // Reduce vertices by computing simplified normals
          if (!geometry.attributes.normal) {
            geometry.computeVertexNormals();
          }
        }
      }
    });
  }, [scene, isMobile]);

  // Target rotation based on scroll position
  const targetRotation = (isMobile ? 0.004 : 0.006) * scrollY;
  // Target scale based on scroll position
  const targetScale = baseScale + Math.min(scrollY * (isMobile ? 0.00003 : 0.00005), maxScale - baseScale);

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
    // Center model on mobile, offset slightly on larger screens
    <group position={[isMobile ? 0 : 1, isMobile ? -1.2 : 0.4, 0]}>
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isCanvasVisible, setIsCanvasVisible] = useState(true);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger entrance animations after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Observe canvas visibility to pause rendering when off-screen
  useEffect(() => {
    if (!canvasRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCanvasVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, []);

  // Only track scroll when canvas is visible
  useEffect(() => {
    if (!isCanvasVisible) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isCanvasVisible]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener ? mq.addEventListener('change', update) : mq.addListener(update);
    return () => {
      mq.removeEventListener ? mq.removeEventListener('change', update) : mq.removeListener(update as any);
    };
  }, []);

  return (
    <>
      <div ref={canvasRef} className={`hero-canvas-layer ${isLoaded ? 'loaded' : ''}`}>
        <Canvas
          camera={{ position: [5, 3, 5], fov: 50 }}
          gl={{
            alpha: true,
            antialias: !isMobile,
            powerPreference: "high-performance",
            stencil: false,
            depth: true
          }}
          dpr={isMobile ? [0.75, 1] : [1, 1.5]}
          frameloop={isCanvasVisible ? "always" : "never"}
          performance={{ min: 0.5 }}
        >
          <ambientLight intensity={2} />
          <directionalLight position={[5, 5, 5]} intensity={2} castShadow={false} />
          <directionalLight position={[-5, 3, -5]} intensity={1} castShadow={false} />
          <Suspense fallback={null}>
            <BuildingModel scrollY={scrollY} isMobile={isMobile} />
          </Suspense>
        </Canvas>
      </div>

      <section className={`hero-section ${isLoaded ? 'loaded' : ''}`}>
        <div className="hero-video-bg">
          <video autoPlay muted loop playsInline className="hero-video">
            <source src="/videos/bg-main.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-overlay" />
        </div>

        <div className="hero-container">
          <div
            className="hero-content"
            style={{
              transform: `translateY(${isMobile ? 0 : scrollY * 0.3}px)`,
              opacity: Math.max(0, 1 - scrollY * 0.002),
            }}
          >
            <h1 className="hero-title hero-animate">
              Where Vision
              <br />
              Becomes Structure
            </h1>
            <p className="hero-description hero-animate hero-delay-1">
              Thoughtfully designed residential and commercial projects shaped by
              quality, safety, and innovation.
            </p>
            <button className="hero-cta hero-animate hero-delay-2">Explore Projects</button>
          </div>
        </div>
      </section>
    </>
  );
}
