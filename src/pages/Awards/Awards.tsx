import "./awards.css";
import { useMemo, useState, useEffect, type MouseEvent } from "react";
import { useAwards } from "../../hooks/useAwards";
import GalleryLightbox from "../../components/GalleryLightbox";

function getAwardYearSortValue(yearText?: string): number | null {
  if (!yearText) {
    return null;
  }

  const normalized = yearText.trim();
  if (!normalized) {
    return null;
  }

  const fourDigitYears = normalized.match(/\b(19|20)\d{2}\b/g);
  if (fourDigitYears && fourDigitYears.length > 0) {
    const parsedYears = fourDigitYears
      .map((year) => Number.parseInt(year, 10))
      .filter((year) => Number.isFinite(year));

    if (parsedYears.length > 0) {
      return Math.max(...parsedYears);
    }
  }

  const twoDigitYears = normalized.match(/\b\d{2}\b/g);
  if (twoDigitYears && twoDigitYears.length > 0) {
    const parsedYears = twoDigitYears
      .map((year) => Number.parseInt(year, 10))
      .filter((year) => Number.isFinite(year))
      .map((year) => (year <= 50 ? 2000 + year : 1900 + year));

    if (parsedYears.length > 0) {
      return Math.max(...parsedYears);
    }
  }

  return null;
}

export default function Awards() {
  const { data: awardsData, loading: awardsLoading, error: awardsError } = useAwards();
  const [isMobile, setIsMobile] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleAwardImageMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    const rect = container.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    container.style.setProperty("--zoom-x", `${x}%`);
    container.style.setProperty("--zoom-y", `${y}%`);
  };

  const handleAwardImageMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    container.style.setProperty("--zoom-x", "50%");
    container.style.setProperty("--zoom-y", "50%");
  };

  const sortedAwards = useMemo(() => {
    return [...awardsData].sort((a, b) => {
      const aYear = getAwardYearSortValue(a.acf?.year);
      const bYear = getAwardYearSortValue(b.acf?.year);

      if (aYear === null && bYear === null) {
        return b.id - a.id;
      }

      if (aYear === null) {
        return 1;
      }

      if (bYear === null) {
        return -1;
      }

      if (aYear !== bYear) {
        return bYear - aYear;
      }

      return b.id - a.id;
    });
  }, [awardsData]);

  const lightboxImages = useMemo(() => {
    return sortedAwards
      .map((award) => award._embedded?.["wp:featuredmedia"]?.[0]?.source_url)
      .filter((url): url is string => Boolean(url));
  }, [sortedAwards]);

  const getAwardImageIndex = (imageUrl: string) => {
    return lightboxImages.findIndex((url) => url === imageUrl);
  };

  const handleAwardImageClick = (imageUrl: string) => {
    if (!isMobile) {
      return;
    }

    const index = getAwardImageIndex(imageUrl);
    if (index < 0) {
      return;
    }

    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <main className="site-main awards-page">
      <section className="default-hero">
        <div className="hero-boundary">
          <div className="hero-badge">Awards & Recognition</div>
          <h1 className="awards-headline">
            Celebrating Excellence in Building Services
          </h1>
          <p className="awards-lede">
            Our commitment to quality, innovation, and customer satisfaction has been recognized
            by industry leaders and partners across the construction and paints sector.
          </p>
        </div>
      </section>

      <section className="awards-grid-section site-section">
        <div className="awards-container">
          {awardsLoading ? (
            <div className="loading-state">Loading awards...</div>
          ) : awardsError ? (
            <div className="error-state">Failed to load awards</div>
          ) : (
            <div className="awards-showcase">
              {sortedAwards.map((award) => (
                <div key={award.id} className="award-showcase-card">
                  {award._embedded?.['wp:featuredmedia']?.[0] && (
                    <div
                      className="award-showcase-image"
                      onMouseMove={handleAwardImageMouseMove}
                      onMouseLeave={handleAwardImageMouseLeave}
                      onClick={() => handleAwardImageClick(award._embedded!['wp:featuredmedia']![0].source_url)}
                      role={isMobile ? "button" : undefined}
                      tabIndex={isMobile ? 0 : undefined}
                      onKeyDown={(event) => {
                        if (!isMobile) return;
                        if (event.key !== "Enter" && event.key !== " ") return;
                        event.preventDefault();
                        handleAwardImageClick(award._embedded!['wp:featuredmedia']![0].source_url);
                      }}
                      aria-label={isMobile ? `Open award image for ${award.title.rendered}` : undefined}
                    >
                      <img
                        src={award._embedded['wp:featuredmedia'][0].source_url}
                        alt={award._embedded['wp:featuredmedia'][0].alt_text || award.title.rendered}
                        onError={(e) => {
                          // Hide image if it fails to load
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div className="award-showcase-content">
                    <h3>{award.title.rendered}</h3>
                    {award.acf?.description && <p className="award-description">{award.acf.description}</p>}
                    {award.acf?.year && <p className="award-year">{award.acf.year}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <GalleryLightbox
        images={lightboxImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </main>
  );
}