import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import type { Group } from "three";
import * as THREE from "three";
import "./hero.css";
import { useNavigate } from "react-router-dom";

// ============================================================================
// CONSTANTS
// ============================================================================
const MODEL_PATH = "/models/building.glb";

// Scale configuration for different devices
const SCALE_CONFIG = {
  desktop: { base: 0.06, max: 0.07 },
  mobile: { base: 0.09, max: 0.1 },
};

// Rotation multipliers (scroll responsiveness)
const ROTATION_CONFIG = {
  desktop: 0.005,
  mobile: 0.007,
};

// Scale multipliers (zoom on scroll)
const ZOOM_CONFIG = {
  desktop: 0.00005,
  mobile: 0.00003,
};

// Lerp smoothing factors (0–1: lower = smoother, higher = snappier)
// 0.01 = very delayed (~1.6s lag)
// 0.2 = responsive (~0.3s lag)
// 0.5 = very snappy (~0.1s lag)
// 1.0 = instant (no smoothing)
const LERP_CONFIG = {
  rotation: 0.3,  // Rotation responsiveness
  scale: 0.3,     // Scale responsiveness
};

// Model positioning
const POSITION_CONFIG = {
  desktop: { x: 1, y: 0.6 },
  mobile: { x: 0, y: -0.4 },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Optimize THREE.js materials and geometry for performance
 */
function optimizeScene(scene: THREE.Group | THREE.Scene, isMobile: boolean): void {
  scene.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;

    // Enable frustum culling for off-screen geometry
    child.frustumCulled = true;

    if (child.material) {
      const material = child.material as THREE.Material;
      material.precision = "mediump";
      child.castShadow = false;
      child.receiveShadow = false;
    }

    // Compute vertex normals on mobile for smoother geometry
    if (isMobile && child.geometry && !child.geometry.attributes.normal) {
      child.geometry.computeVertexNormals();
    }
  });
}

// ============================================================================
// BUILDING MODEL COMPONENT
// ============================================================================

function BuildingModel({ scrollY, isMobile }: { scrollY: number; isMobile: boolean }) {
  const { scene } = useGLTF(MODEL_PATH);
  const modelRef = useRef<Group>(null);

  // Get scale and position config based on device type
  const scaleConfig = isMobile ? SCALE_CONFIG.mobile : SCALE_CONFIG.desktop;
  const posConfig = isMobile ? POSITION_CONFIG.mobile : POSITION_CONFIG.desktop;
  const rotConfig = isMobile ? ROTATION_CONFIG.mobile : ROTATION_CONFIG.desktop;
  const zoomConfig = isMobile ? ZOOM_CONFIG.mobile : ZOOM_CONFIG.desktop;

  // Track current rotation and scale for smooth interpolation
  const currentRotation = useRef(0);
  const currentScale = useRef(scaleConfig.base);

  // Optimize scene on mount
  useEffect(() => {
    optimizeScene(scene, isMobile);
  }, [scene, isMobile]);

  // Calculate target values based on scroll position
  const targetRotation = rotConfig * scrollY;
  const targetScale = scaleConfig.base + Math.min(scrollY * zoomConfig, scaleConfig.max - scaleConfig.base);

  // Update rotation and scale each frame with smooth interpolation
  useFrame(() => {
    if (!modelRef.current) return;

    currentRotation.current = THREE.MathUtils.lerp(
      currentRotation.current,
      targetRotation,
      LERP_CONFIG.rotation
    );

    currentScale.current = THREE.MathUtils.lerp(
      currentScale.current,
      targetScale,
      LERP_CONFIG.scale
    );

    modelRef.current.rotation.y = currentRotation.current;
    modelRef.current.scale.setScalar(currentScale.current);
  });

  return (
    <group position={[posConfig.x, posConfig.y, 0]}>
      <group ref={modelRef} scale={scaleConfig.base}>
        <Center>
          <primitive object={scene} />
        </Center>
      </group>
    </group>
  );
}

// Preload the model for instant rendering
useGLTF.preload(MODEL_PATH);

// ============================================================================
// MAIN HERO COMPONENT
// ============================================================================

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isCanvasVisible, setIsCanvasVisible] = useState(true);
  const canvasRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // ──────────────────────────────────────────────────────────────────────
  // INITIALIZATION & ANIMATIONS
  // ──────────────────────────────────────────────────────────────────────

  useEffect(() => {
    // Trigger entrance animations after a brief delay
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // ──────────────────────────────────────────────────────────────────────
  // CANVAS VISIBILITY OPTIMIZATION
  // ──────────────────────────────────────────────────────────────────────

  /**
   * Pause 3D rendering when canvas is off-screen to save performance
   */
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

  // ──────────────────────────────────────────────────────────────────────
  // SCROLL TRACKING
  // ──────────────────────────────────────────────────────────────────────

  /**
   * Track scroll position only when canvas is visible
   */
  useEffect(() => {
    if (!isCanvasVisible) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isCanvasVisible]);

  // ──────────────────────────────────────────────────────────────────────
  // DEVICE DETECTION
  // ──────────────────────────────────────────────────────────────────────

  /**
   * Detect mobile/tablet viewport and adapt rendering settings
   */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();

    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // ──────────────────────────────────────────────────────────────────────
  // RENDER
  // ──────────────────────────────────────────────────────────────────────

  return (
    <>
      {/* 3D Canvas Layer */}
      <div ref={canvasRef} className={`hero-canvas-layer ${isLoaded ? "loaded" : ""}`}>
        <Canvas
          camera={{ position: [5, 3, 5], fov: 50 }}
          gl={{
            alpha: true,
            antialias: !isMobile,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
          }}
          dpr={isMobile ? [0.75, 1] : [1, 1.5]}
          frameloop={isCanvasVisible ? "always" : "never"}
          performance={{ min: 0.5 }}
        >
          {/* Lighting */}
          <ambientLight intensity={2} />
          <directionalLight position={[5, 5, 5]} intensity={2} castShadow={false} />
          <directionalLight position={[-5, 3, -5]} intensity={1} castShadow={false} />

          {/* 3D Model */}
          <Suspense fallback={null}>
            <BuildingModel scrollY={scrollY} isMobile={isMobile} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content Section */}
      <section className={`hero-section ${isLoaded ? "loaded" : ""}`}>
        {/* Video Background */}
        <div className="hero-video-bg">
          <video autoPlay muted loop playsInline className="hero-video">
            <source src="/videos/bg-main.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-overlay" />
        </div>

        {/* Hero Content */}
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
            <button className="btn btn--primary" onClick={() => navigate("/projects")}>
              Explore Projects
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
