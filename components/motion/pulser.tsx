"use client";

import { GodRays } from "./god-rays";

export const PULSER_SPOTTY = 0.8;
export const PULSER_OFFSET_Y = 0.54;
export const PULSER_DENSITY = 1;
export const PULSER_CENTER_INTENSITY = 0.47;
export const PULSER_CENTER_SIZE = 0.8;

export function Pulser({ speed = 0.2 }: { speed?: number }) {
  // Same Pulser ray field as the published pre-footer. Frequency is raised just
  // enough to read as vertical bars and short dashes, and the clock stays slow.
  return (
    <GodRays
      shader
      speed={speed}
      frequency={6}
      spotty={3}
      offsetY={1.15}
      density={0.4}
      centerIntensity={0.05}
      centerSize={0.2}
      label="Pulser"
    />
  );
}
