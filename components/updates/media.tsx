"use client";

import { useEffect, useState } from "react";
import { Dither, orderedDither } from "@/components/motion";
import styles from "@/components/updates/updates.module.css";

/** Live update covers: ordered, pixel size 4, brightness 100, threshold 87, midtones 77. */
const coverDither = {
  ...orderedDither,
  animation: false,
  brightness: 100,
  pixelSize: 4,
  threshold: 87,
  midtones: 77,
  glow: 0,
  background: "#0c0c0c",
};

export function UpdateCover({
  src,
  alt,
  fallback,
}: {
  src: string;
  alt: string;
  fallback: string;
}) {
  const [source, setSource] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const image = new Image();
    image.decoding = "async";
    image.src = src;
    const ready = () => {
      if (image.naturalWidth > 0) {
        setSource(image);
      }
    };
    if (image.complete && image.naturalWidth > 0) {
      ready();
    } else {
      image.addEventListener("load", ready);
    }
    return () => image.removeEventListener("load", ready);
  }, [src]);

  return (
    <span className={styles.cover}>
      {source ? (
        <Dither
          source={source}
          {...coverDither}
          label={`Dithered version of ${alt} with ordered dithering applied`}
        />
      ) : null}
      <noscript>
        <img src={fallback} alt={`Dithered version of ${alt} with ordered dithering applied`} />
      </noscript>
    </span>
  );
}

export function VideoCover({ videoId, poster }: { videoId: string; poster: string }) {
  const [playing, setPlaying] = useState(false);
  const src = `https://www.youtube.com/embed/${videoId}?iv_load_policy=3&rel=0&modestbranding=1&playsinline=1&autoplay=1&color=white`;

  return (
    <span className={styles.cover}>
      {playing ? (
        <iframe
          className={styles.frame}
          src={src}
          title="YouTube video"
          allow="presentation; fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" className={styles.play} aria-label="Play" onClick={() => setPlaying(true)}>
          <img src={poster} alt="" />
          <span className={styles.playIcon} aria-hidden="true">
            <svg viewBox="0 0 68 48" width="68" height="48">
              <rect width="68" height="48" rx="10" fill="#111" />
              <path d="M28 14 L46 24 L28 34 Z" fill="#fff" />
            </svg>
          </span>
        </button>
      )}
    </span>
  );
}
