"use client";

import { GodRays } from "./god-rays";

export const PULSER_SPOTTY = 0.8;
export const PULSER_OFFSET_Y = 0.54;
export const PULSER_DENSITY = 1;
export const PULSER_CENTER_INTENSITY = 0.47;
export const PULSER_CENTER_SIZE = 0.8;

export function Pulser() {
  // canvasPreview false did not force speed to 0. The published canvas was moving.
  return (
    <GodRays
      spotty={PULSER_SPOTTY}
      offsetY={PULSER_OFFSET_Y}
      density={PULSER_DENSITY}
      centerIntensity={PULSER_CENTER_INTENSITY}
      centerSize={PULSER_CENTER_SIZE}
      label="Pulser"
    />
  );
}
