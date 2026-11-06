const maskCanvas = typeof document === "undefined" ? null : document.createElement("canvas");
const pending = new Map<string, Promise<HTMLImageElement | null>>();

export function loadMask(src: string) {
  const existing = pending.get(src);
  if (existing) {
    return existing;
  }
  const promise = new Promise<HTMLImageElement | null>((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });
  pending.set(src, promise);
  return promise;
}

/** Add the published alpha mask on top of an opaque field. */
export function punchMask(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  image: HTMLImageElement,
  veil: boolean,
) {
  if (!maskCanvas) {
    return;
  }
  if (maskCanvas.width !== width || maskCanvas.height !== height) {
    maskCanvas.width = width;
    maskCanvas.height = height;
  }
  const mask = maskCanvas.getContext("2d");
  if (!mask) {
    return;
  }
  mask.setTransform(1, 0, 0, 1, 0, 0);
  mask.globalCompositeOperation = "source-over";
  mask.clearRect(0, 0, width, height);
  const scale = Math.max(width / image.width, height / image.height);
  const drawnWidth = image.width * scale;
  const drawnHeight = image.height * scale;
  mask.drawImage(image, (width - drawnWidth) / 2, height - drawnHeight, drawnWidth, drawnHeight);
  if (veil) {
    const gradient = mask.createLinearGradient(0, height, 0, 0);
    gradient.addColorStop(0.46, "rgba(255,255,255,0)");
    gradient.addColorStop(1, "rgba(255,255,255,0.7)");
    mask.globalCompositeOperation = "lighter";
    mask.fillStyle = gradient;
    mask.fillRect(0, 0, width, height);
    mask.globalCompositeOperation = "source-over";
  }
  ctx.globalCompositeOperation = "destination-in";
  ctx.drawImage(maskCanvas, 0, 0);
  ctx.globalCompositeOperation = "source-over";
}
