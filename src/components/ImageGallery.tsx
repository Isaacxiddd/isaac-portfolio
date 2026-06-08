import { useState, useEffect, useCallback } from "react";

interface Props {
  images: string[];
  projectName: string;
}

const ImageGallery: React.FC<Props> = ({ images, projectName }) => {
  const [index, setIndex] = useState(0);
  const total = images.length;

  const prev = useCallback(() => setIndex(i => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIndex(i => (i + 1) % total), [total]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  if (total === 0) return null;

  return (
    <div className="gallery-container">
      <div className="gallery-viewport">
        {total > 1 && (
          <button onClick={prev} className="gallery-arrow left" aria-label="Previous image">‹</button>
        )}
        <img
          src={images[index]}
          alt={`${projectName} screenshot ${index + 1}`}
          className="gallery-image"
        />
        {total > 1 && (
          <button onClick={next} className="gallery-arrow right" aria-label="Next image">›</button>
        )}
      </div>
      {total > 1 && (
        <div className="gallery-dots">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`gallery-dot ${i === index ? "active" : ""}`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
