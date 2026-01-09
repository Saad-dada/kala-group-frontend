import { useState, useEffect, useRef } from "react";
import "../styles/loading-screen.css";
import logo from "../assets/logo.png";

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

export default function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    // Simulate loading progress
    const duration = 800; // 0.8 seconds total
    const interval = 20; // Update every 20ms
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment + Math.random() * 2;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100 && !hasCompletedRef.current) {
      hasCompletedRef.current = true;
      
      // Start exit animation
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
      }, 300);

      // Complete loading after exit animation
      const completeTimer = setTimeout(() => {
        onLoadComplete();
      }, 1100);

      return () => {
        clearTimeout(exitTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [progress, onLoadComplete]);

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
