"use client";

import { useEffect, useState } from "react";
import { Dither, orderedDither, randomDither } from "@/components/motion";

type Preset = {
  algorithm: "ordered" | "random";
  animation: boolean;
  intensity: number;
  interval: number;
  brightness: number;
  pixelSize: number;
  threshold: number;
  midtones: number;
  glow?: number;
  radius?: number;
  dot?: string;
};

export function DitherImage({
  src,
  label,
  preset,
}: {
  src: string;
  label: string;
  preset: Preset;
}) {
  const [source, setSource] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const image = new Image();
    image.decoding = "async";
    image.src = src;
    const ready = () => setSource(image);
    if (image.complete && image.naturalWidth > 0) {
      ready();
    } else {
      image.addEventListener("load", ready);
    }
    return () => image.removeEventListener("load", ready);
  }, [src]);

  if (!source) {
    return null;
  }

  return <Dither source={source} {...preset} label={label} />;
}
