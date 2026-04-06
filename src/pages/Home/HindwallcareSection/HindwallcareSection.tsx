import { useEffect, useRef, useState } from "react";
import "./HindwallcareSection.css";

// Carousel will look for images in `public/images/hindwallcare` named 1..N with common extensions.
// Add your images there (e.g. 1.jpg, 2.png, 3.webp). The component will probe up to `MAX_IMAGES`.
const MAX_IMAGES = 4;
const EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

async function probeImage(url: string) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
}

export default function HindwallcareSection() {
  const [images, setImages] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const playingRef = useRef(true);
  const touchStartXRef = useRef(0);
  const touchStartTimeRef = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const PLACEHOLDER_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' viewBox='0 0 1200 600'>
      <rect width='100%' height='100%' fill='%23f5f7fa' />
      <g fill='%23999' font-family='Arial, Helvetica, sans-serif' font-size='28' text-anchor='middle'>
        <text x='50%' y='45%'>No Hindwallcare images found</text>
        <text x='50%' y='55%' font-size='18' fill='%23777'>Place images in /images/hindwallcare as 1.jpg, 2.png …</text>
      </g>
    </svg>`,
  )}`;

  useEffect(() => {
    let mounted = true;
    async function load() {
      const CACHE_KEY = "hindwallcare_images_v1";
      const CACHE_TTL = 1000 * 60 * 60 * 24; // 24h
      const { readCache, writeCache } =
        (await import("../../../utils/clientCache")) as typeof import("../../../utils/clientCache");
      const cached = readCache<string[]>(CACHE_KEY);
      if (cached.data && cached.isFresh && mounted) {
        setImages(cached.data);
        setLoading(false);
        return;
      }
      if (cached.data && mounted) {
        setImages(cached.data);
      }

      const found: string[] = [];
      for (let i = 1; i <= MAX_IMAGES; i++) {
        let matched = false;
        for (const ext of EXTENSIONS) {
          const url = `/images/hindwallcare/${i}.${ext}`;
          // probe with HEAD to check file exists in `public/` folder
          // stop at first extension that exists for this index
          // eslint-disable-next-line no-await-in-loop
          const ok = await probeImage(url);
          if (ok) {
            found.push(url);
            matched = true;
            break;
          }
        }
        if (!matched) {
          // stop scanning once we hit a missing index (assume sequential files)
          break;
        }
      }
      if (mounted) {
        setImages(found);
        setLoading(false);
        writeCache(CACHE_KEY, found, CACHE_TTL);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!images.length) return;
    const interval = setInterval(() => {
      if (!playingRef.current) return;
      setIndex((i) => {
        // Loop back to start when reaching the end
        return i >= images.length - 1 ? 0 : i + 1;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [images]);

  function prev() {
    setIndex((i) => Math.max(i - 1, 0));
  }

  function next() {
    setIndex((i) => Math.min(i + 1, images.length - 1));
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartTimeRef.current = Date.now();
    playingRef.current = false;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const touchEndX = e.changedTouches[0].clientX;
    const touchDuration = Date.now() - touchStartTimeRef.current;
    const deltaX = touchStartXRef.current - touchEndX;
    const velocity = Math.abs(deltaX) / touchDuration;

    // Swipe threshold: 50px or velocity > 0.5px/ms
    const isSwipe = Math.abs(deltaX) > 50 || velocity > 0.5;

    if (isSwipe) {
      if (deltaX > 0) {
        // Swiped left — go to next slide
        setIndex((i) => Math.min(i + 1, images.length - 1));
      } else {
        // Swiped right — go to previous slide
        setIndex((i) => Math.max(i - 1, 0));
      }
    }

    // Resume auto-play
    setTimeout(() => {
      playingRef.current = true;
    }, 500);
  }

  return (
    <section className="hindwallcare-section">
      <div className="hindwallcare-boundary container">
        <h2 className="hindwallcare-title">Our Manufacturing Venture</h2>

        <div
          className="hindwallcare-slider"
          onMouseEnter={() => (playingRef.current = false)}
          onMouseLeave={() => (playingRef.current = true)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {loading && (
            <div className="hindwallcare-loading">Loading images…</div>
          )}

          {!loading && images.length === 0 && (
            <>
              <div
                className="hindwallcare-track"
                style={{ transform: `translateX(0%)` }}
              >
                <div className="hindwallcare-slide">
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    <img src={PLACEHOLDER_SVG} alt={`No Hindwallcare images`} />
                  </a>
                </div>
              </div>

              <div className="hindwallcare-empty">
                No images found in /images/hindwallcare — add files named 1.jpg,
                2.png, etc.
              </div>
            </>
          )}

          {!loading && images.length > 0 && (
            <>
              <div
                className="hindwallcare-track"
                ref={trackRef}
                style={{ transform: `translateX(${-index * 100}%)` }}
              >
                {images.map((src, i) => (
                  <div key={src} className="hindwallcare-slide">
                    <a
                      href="http://Hindwallcare.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={src} alt={`Hindwallcare ${i + 1}`} />
                    </a>
                  </div>
                ))}
              </div>

              <button
                className="hindwallcare-arrow hindwallcare-prev"
                onClick={prev}
                aria-label="Previous slide"
              >
                ‹
              </button>
              <button
                className="hindwallcare-arrow hindwallcare-next"
                onClick={next}
                aria-label="Next slide"
              >
                ›
              </button>

              <div className="hindwallcare-dots">
                {images.map((_, i) => (
                  <button
                    key={i}
                    className={`hindwallcare-dot ${i === index ? "active" : ""}`}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
