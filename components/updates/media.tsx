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
  smooth: true,
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

export function VideoCover({ videoId }: { videoId: string }) {
  const [playing, setPlaying] = useState(false);
  const src = `https://www.youtube.com/embed/${videoId}?iv_load_policy=3&rel=0&modestbranding=1&playsinline=1&autoplay=${playing ? "1" : "0"}&color=white`;

  return (
    <span className={styles.cover}>
      <span className={styles.video}>
        <img
          src={`https://i.ytimg.com/vi_webp/${videoId}/sddefault.webp`}
          alt=""
          decoding="async"
        />
        {playing ? (
          <iframe
            className={styles.frame}
            src={src}
            title="Youtube Video"
            allow="presentation; fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button type="button" className={styles.play} aria-label="Play" onClick={() => setPlaying(true)}>
            <svg viewBox="0 0 68 48" width="68" height="48" aria-hidden="true">
              <path
                className={styles.playPlate}
                d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
              />
              <path d="M45 24 L27 14 L27 34" fill="#fff" />
            </svg>
          </button>
        )}
      </span>
    </span>
  );
}
