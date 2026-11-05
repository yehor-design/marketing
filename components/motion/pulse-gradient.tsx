"use client";

import { useCallback, useEffect, useRef } from "react";
import styles from "./motion.module.css";

/**
 * Paper Gradient, Pulse preset, custom hero colors.
 * proportion 92, distortion 54, swirl 75, iterations 3, softness 28,
 * shape Checks, shape size 79, scale 0, rotation -167, offset -813, speed 20.
 * The homepage hero masks this. It is not the GodRays shader.
 */

const PULSE_ROTATION = (-167 * Math.PI) / 180;
const PULSE_PROPORTION = 0.92;
const PULSE_SOFTNESS = 0.28;
const PULSE_DISTORTION = 54 / 50;
const PULSE_SWIRL = 0.75;
const PULSE_ITERATIONS = 3;
const PULSE_SHAPE_SCALE = 0.79;
const PULSE_SEED = -8130 * (1000 / 120) * 0.001;

function pulseSpeed(amount: number) {
  const x1 = 0.65;
  const x2 = 0.88;
  const y2 = 0.77;
  let low = 0;
  let high = 1;
  for (let step = 0; step < 24; step += 1) {
    const t = (low + high) / 2;
    const x = 3 * (1 - t) * (1 - t) * t * x1 + 3 * (1 - t) * t * t * x2 + t * t * t;
    if (x < amount) {
      low = t;
    } else {
      high = t;
    }
  }
  const t = (low + high) / 2;
  return (3 * (1 - t) * t * t * y2 + t * t * t) * 5;
}

const SPEED = pulseSpeed(0.2);

const FRAGMENT = `#version 300 es
precision highp float;

uniform float u_time;
uniform float u_pixelRatio;
uniform vec2 u_resolution;
uniform float u_scale;
uniform float u_rotation;
uniform vec4 u_color1;
uniform vec4 u_color2;
uniform vec4 u_color3;
uniform float u_proportion;
uniform float u_softness;
uniform float u_shape;
uniform float u_shapeScale;
uniform float u_distortion;
uniform float u_swirl;
uniform float u_swirlIterations;

out vec4 fragColor;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

vec4 blend_colors(vec4 c1, vec4 c2, vec4 c3, float mixer, float edgesWidth, float edge_blur) {
  vec3 color1 = c1.rgb * c1.a;
  vec3 color2 = c2.rgb * c2.a;
  vec3 color3 = c3.rgb * c3.a;
  float r1 = smoothstep(.0 + .35 * edgesWidth, .7 - .35 * edgesWidth + .5 * edge_blur, mixer);
  float r2 = smoothstep(.3 + .35 * edgesWidth, 1. - .35 * edgesWidth + edge_blur, mixer);
  vec3 blended_color_2 = mix(color1, color2, r1);
  float blended_opacity_2 = mix(c1.a, c2.a, r1);
  vec3 c = mix(blended_color_2, color3, r2);
  float o = mix(blended_opacity_2, c3.a, r2);
  return vec4(c, o);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float t = .5 * u_time;
  float noise_scale = .0005 + .006 * u_scale;
  uv -= .5;
  uv *= (noise_scale * u_resolution);
  uv = rotate(uv, u_rotation * .5 * PI);
  uv /= u_pixelRatio;
  uv += .5;

  float n1 = noise(uv * 1. + t);
  float n2 = noise(uv * 2. - t);
  float angle = n1 * TWO_PI;
  uv.x += 4. * u_distortion * n2 * cos(angle);
  uv.y += 4. * u_distortion * n2 * sin(angle);

  float iterations_number = ceil(clamp(u_swirlIterations, 1., 30.));
  for (float i = 1.; i <= iterations_number; i++) {
    uv.x += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1.5 * uv.y);
    uv.y += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1. * uv.x);
  }

  float proportion = clamp(u_proportion, 0., 1.);
  float shape = 0.;
  float mixer = 0.;
  if (u_shape < .5) {
    vec2 checks_shape_uv = uv * (.5 + 3.5 * u_shapeScale);
    shape = .5 + .5 * sin(checks_shape_uv.x) * cos(checks_shape_uv.y);
    mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
  } else if (u_shape < 1.5) {
    vec2 stripes_shape_uv = uv * (.25 + 3. * u_shapeScale);
    float f = fract(stripes_shape_uv.y);
    shape = smoothstep(.0, .55, f) * smoothstep(1., .45, f);
    mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
  } else {
    float sh = 1. - uv.y;
    sh -= .5;
    sh /= (noise_scale * u_resolution.y);
    sh += .5;
    float shape_scaling = .2 * (1. - u_shapeScale);
    shape = smoothstep(.45 - shape_scaling, .55 + shape_scaling, sh + .3 * (proportion - .5));
    mixer = shape;
  }

  vec4 color_mix = blend_colors(u_color1, u_color2, u_color3, mixer, 1. - clamp(u_softness, 0., 1.), .01 + .01 * u_scale);
  fragColor = vec4(color_mix.rgb, color_mix.a);
}
`;

const VERTEX = `#version 300 es
layout(location = 0) in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

function fract(value: number) {
  return value - Math.floor(value);
}

function hash2(x: number, y: number) {
  return fract(Math.sin(x * 12.9898 + y * 78.233) * 43758.5453123);
}

function valueNoise(x: number, y: number) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = hash2(ix, iy);
  const b = hash2(ix + 1, iy);
  const c = hash2(ix, iy + 1);
  const d = hash2(ix + 1, iy + 1);
  const x1 = a + (b - a) * ux;
  const x2 = c + (d - c) * ux;
  return x1 + (x2 - x1) * uy;
}

function smooth(edge0: number, edge1: number, value: number) {
  const span = edge1 - edge0;
  if (span === 0) {
    return value < edge0 ? 0 : 1;
  }
  const t = Math.min(1, Math.max(0, (value - edge0) / span));
  return t * t * (3 - 2 * t);
}

function paintFallback(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  cssWidth: number,
  cssHeight: number,
  time: number,
) {
  const image = ctx.createImageData(width, height);
  const data = image.data;
  const rotation = PULSE_ROTATION * 0.5 * Math.PI;
  const cosine = Math.cos(rotation);
  const sine = Math.sin(rotation);
  const edges = 1 - PULSE_SOFTNESS;
  const edgeBlur = 0.01;
  const lift = 0.48 * Math.sqrt(Math.abs(PULSE_PROPORTION - 0.5));
  const clock = 0.5 * time;
  const color1 = [0, 230, 197];
  const color2 = [50, 82, 77];

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const fragX = ((x + 0.5) / width) * cssWidth;
      const fragY = ((height - y - 0.5) / height) * cssHeight;
      let uvX = fragX / cssWidth - 0.5;
      let uvY = fragY / cssHeight - 0.5;
      uvX *= 0.0005 * cssWidth;
      uvY *= 0.0005 * cssHeight;
      const rotX = cosine * uvX - sine * uvY;
      const rotY = sine * uvX + cosine * uvY;
      uvX = rotX + 0.5;
      uvY = rotY + 0.5;
      const n1 = valueNoise(uvX + clock, uvY + clock);
      const n2 = valueNoise(uvX * 2 - clock, uvY * 2 - clock);
      const angle = n1 * Math.PI * 2;
      uvX += 4 * PULSE_DISTORTION * n2 * Math.cos(angle);
      uvY += 4 * PULSE_DISTORTION * n2 * Math.sin(angle);
      for (let i = 1; i <= PULSE_ITERATIONS; i += 1) {
        uvX += (PULSE_SWIRL / i) * Math.cos(clock + i * 1.5 * uvY);
        uvY += (PULSE_SWIRL / i) * Math.cos(clock + i * uvX);
      }
      const checksX = uvX * (0.5 + 3.5 * PULSE_SHAPE_SCALE);
      const checksY = uvY * (0.5 + 3.5 * PULSE_SHAPE_SCALE);
      const shape = 0.5 + 0.5 * Math.sin(checksX) * Math.cos(checksY);
      const mixer = shape + lift;
      const r1 = smooth(0.35 * edges, 0.7 - 0.35 * edges + 0.5 * edgeBlur, mixer);
      const r2 = smooth(0.3 + 0.35 * edges, 1 - 0.35 * edges + edgeBlur, mixer);
      let red = color1[0] + (color2[0] - color1[0]) * r1;
      let green = color1[1] + (color2[1] - color1[1]) * r1;
      let blue = color1[2] + (color2[2] - color1[2]) * r1;
      red *= 1 - r2;
      green *= 1 - r2;
      blue *= 1 - r2;
      const pixel = (y * width + x) * 4;
      data[pixel] = Math.min(255, Math.max(0, Math.round(red)));
      data[pixel + 1] = Math.min(255, Math.max(0, Math.round(green)));
      data[pixel + 2] = Math.min(255, Math.max(0, Math.round(blue)));
      data[pixel + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);
}

export function PulseGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGL2RenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const timeRef = useRef(PULSE_SEED);
  const lastFallback = useRef(0);

  const draw = useCallback((time: number) => {
    const canvas = canvasRef.current;
    const frame = canvas?.parentElement;
    if (!canvas || !frame) {
      return;
    }
    const rect = frame.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) {
      return;
    }
    const gl = glRef.current;
    const program = programRef.current;
    if (gl && program) {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(rect.width * ratio));
      const height = Math.max(1, Math.round(rect.height * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
      gl.useProgram(program);
      const loc = (name: string) => gl.getUniformLocation(program, name);
      gl.uniform1f(loc("u_time"), time);
      gl.uniform1f(loc("u_pixelRatio"), ratio);
      gl.uniform2f(loc("u_resolution"), width, height);
      gl.uniform1f(loc("u_scale"), 0);
      gl.uniform1f(loc("u_rotation"), PULSE_ROTATION);
      gl.uniform4f(loc("u_color1"), 0, 230 / 255, 197 / 255, 1);
      gl.uniform4f(loc("u_color2"), 50 / 255, 82 / 255, 77 / 255, 1);
      gl.uniform4f(loc("u_color3"), 0, 0, 0, 1);
      gl.uniform1f(loc("u_proportion"), PULSE_PROPORTION);
      gl.uniform1f(loc("u_softness"), PULSE_SOFTNESS);
      gl.uniform1f(loc("u_shape"), 0);
      gl.uniform1f(loc("u_shapeScale"), PULSE_SHAPE_SCALE);
      gl.uniform1f(loc("u_distortion"), PULSE_DISTORTION);
      gl.uniform1f(loc("u_swirl"), PULSE_SWIRL);
      gl.uniform1f(loc("u_swirlIterations"), PULSE_ITERATIONS);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      return;
    }
    const longest = Math.max(rect.width, rect.height);
    const scale = Math.min(1, 520 / longest);
    const width = Math.max(1, Math.round(rect.width * scale));
    const height = Math.max(1, Math.round(rect.height * scale));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    paintFallback(ctx, width, height, rect.width, rect.height, time);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      premultipliedAlpha: false,
    });
    if (gl) {
      const vertex = gl.createShader(gl.VERTEX_SHADER);
      const fragment = gl.createShader(gl.FRAGMENT_SHADER);
      const program = gl.createProgram();
      if (vertex && fragment && program) {
        gl.shaderSource(vertex, VERTEX);
        gl.shaderSource(fragment, FRAGMENT);
        gl.compileShader(vertex);
        gl.compileShader(fragment);
        gl.attachShader(program, vertex);
        gl.attachShader(program, fragment);
        gl.linkProgram(program);
        if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
          gl.useProgram(program);
          const buffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
          gl.enableVertexAttribArray(0);
          gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
          glRef.current = gl;
          programRef.current = program;
        }
      }
    }
    draw(PULSE_SEED);
    const frame = canvas.parentElement;
    if (!frame) {
      return;
    }
    const observer = new ResizeObserver(() => draw(timeRef.current));
    observer.observe(frame);
    return () => observer.disconnect();
  }, [draw]);

  useEffect(() => {
    const node = canvasRef.current?.parentElement;
    if (!node) {
      return;
    }
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const visibleRatio = () => {
      const rect = node.getBoundingClientRect();
      if (rect.height < 2) {
        return 0;
      }
      const visible = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      return visible / rect.height;
    };
    let visible = visibleRatio() >= 0.1;
    let last = performance.now();
    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.1);
        last = performance.now();
      },
      { threshold: [0, 0.1] },
    );
    observer.observe(node);
    const tick = (now: number) => {
      const delta = now - last;
      last = now;
      if (!motionQuery.matches && visible && delta > 0) {
        timeRef.current += delta * SPEED * 0.001;
      }
      if (glRef.current || now - lastFallback.current >= 240) {
        if (!glRef.current) {
          lastFallback.current = now;
        }
        draw(timeRef.current);
      }
      frame = window.requestAnimationFrame(tick);
    };
    const onMotion = () => {
      last = performance.now();
    };
    motionQuery.addEventListener("change", onMotion);
    frame = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      motionQuery.removeEventListener("change", onMotion);
    };
  }, [draw]);

  return (
    <div className={styles.pulse}>
      <canvas ref={canvasRef} role="img" aria-label="Hero background" />
    </div>
  );
}
