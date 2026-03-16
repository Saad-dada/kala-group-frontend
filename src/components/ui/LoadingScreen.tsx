import { useState, useEffect, useRef, useCallback } from "react";
import "./loading-screen.css";
import logo from "../../assets/logo.png";

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

export default function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const hasCompletedRef = useRef(false);
  const onLoadCompleteRef = useRef(onLoadComplete);

  useEffect(() => {
    onLoadCompleteRef.current = onLoadComplete;
  }, [onLoadComplete]);

  const completeOnce = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    onLoadCompleteRef.current();
  }, []);

  useEffect(() => {
    const duration = 900;
    const start = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const next = Math.min(100, (elapsed / duration) * 100);
      setProgress(next);

      if (next < 100) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    if (progress < 100) return;

    const exitTimer = window.setTimeout(() => {
      setIsExiting(true);
    }, 120);

    const completeTimer = window.setTimeout(() => {
      completeOnce();
    }, 980);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
    };
  }, [progress, completeOnce]);

  useEffect(() => {
    const fallbackTimer = window.setTimeout(() => {
      completeOnce();
    }, 3500);

    return () => {
      window.clearTimeout(fallbackTimer);
    };
  }, [completeOnce]);

  return (
    <div className={`loading-screen ${isExiting ? "exiting" : ""}`}>
      <div className="loading-content">
        <div className="loading-logo">
          <img src={logo} alt="Kala Group" />
        </div>
        
        <div className="loading-bar-container">
          <div 
            className="loading-bar" 
            style={{ width: `${Math.min(progress, 100)}%` }} 
          />
        </div>
      </div>

      <div className="loading-reveal-overlay" />
    </div>
  );
}
