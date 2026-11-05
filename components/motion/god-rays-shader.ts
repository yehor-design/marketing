"use client";

/**
 * Paper GodRays shader from GodRays_Prod. Connections Bottom feeds this
 * with frequency 0.1, spotty 5, offset Y 1.2, density 0.5, and center 0.57 / 0.8.
 * Time is seconds times speed, the same clock ShaderMount uses.
 */

const VERTEX = `#version 300 es
layout(location = 0) in vec4 a_position;

uniform vec2 u_resolution;
uniform float u_pixelRatio;

uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;

uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

uniform float u_pxSize;

out vec2 v_objectUV;
out vec2 v_objectBoxSize;
out vec2 v_objectHelperBox;

out vec2 v_responsiveUV;
out vec2 v_responsiveBoxSize;
out vec2 v_responsiveHelperBox;
out vec2 v_responsiveBoxGivenSize;

out vec2 v_patternUV;
out vec2 v_patternBoxSize;
out vec2 v_patternHelperBox;

// #define ADD_HELPERS

vec3 getBoxSize(float boxRatio, vec2 givenBoxSize, vec2 maxBoxSize) {
  vec2 box = vec2(0.);
  // fit = none
  box.x = boxRatio * min(givenBoxSize.x / boxRatio, givenBoxSize.y);
  float noFitBoxWidth = box.x;
  if (u_fit == 1.) { // fit = contain
    box.x = boxRatio * min(maxBoxSize[0] / boxRatio, maxBoxSize[1]);
  } else if (u_fit == 2.) { // fit = cover
    box.x = boxRatio * max(maxBoxSize[0] / boxRatio, maxBoxSize[1]);
  }
  box.y = box.x / boxRatio;
  return vec3(box, noFitBoxWidth);
}

void main() {
  gl_Position = a_position;

  vec2 uv = gl_Position.xy * .5;
  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
  vec2 maxBoxSize = vec2(max(u_resolution.x, givenBoxSize.x), max(u_resolution.y, givenBoxSize.y));
  float r = u_rotation * 3.14159265358979323846 / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);


  // ===================================================
  // Sizing api for graphic objects with fixed ratio
  // (currently supports only ratio = 1)

  float fixedRatio = 1.;
  vec2 fixedRatioBoxGivenSize = vec2(
    (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
    (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );

  v_objectBoxSize = getBoxSize(fixedRatio, fixedRatioBoxGivenSize, maxBoxSize).xy;
  vec2 objectWorldScale = u_resolution.xy / v_objectBoxSize;

  #ifdef ADD_HELPERS
    v_objectHelperBox = uv;
    v_objectHelperBox *= objectWorldScale;
    v_objectHelperBox += boxOrigin * (objectWorldScale - 1.);
  #endif

  v_objectUV = uv;
  v_objectUV *= objectWorldScale;
  v_objectUV += boxOrigin * (objectWorldScale - 1.);
  v_objectUV += graphicOffset;
  v_objectUV /= u_scale;
  v_objectUV = graphicRotation * v_objectUV;


  // ===================================================


  // ===================================================
  // Sizing api for graphic objects with either givenBoxSize ratio or canvas ratio.
  // Full-screen mode available with u_worldWidth = u_worldHeight = 0

  v_responsiveBoxGivenSize = vec2(
    (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
    (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  float responsiveRatio = v_responsiveBoxGivenSize.x / v_responsiveBoxGivenSize.y;
  v_responsiveBoxSize = getBoxSize(responsiveRatio, v_responsiveBoxGivenSize, maxBoxSize).xy;
  vec2 responsiveBoxScale = u_resolution.xy / v_responsiveBoxSize;

  #ifdef ADD_HELPERS
    v_responsiveHelperBox = uv;
    v_responsiveHelperBox *= responsiveBoxScale;
    v_responsiveHelperBox += boxOrigin * (responsiveBoxScale - 1.);
  #endif

  v_responsiveUV = uv;
  v_responsiveUV *= responsiveBoxScale;
  v_responsiveUV += boxOrigin * (responsiveBoxScale - 1.);
  v_responsiveUV += graphicOffset;
  v_responsiveUV /= u_scale;
  v_responsiveUV.x *= responsiveRatio;
  v_responsiveUV = graphicRotation * v_responsiveUV;
  v_responsiveUV.x /= responsiveRatio;

  // ===================================================


  // ===================================================
  // Sizing api for patterns
  // (treating graphics as a image u_worldWidth x u_worldHeight size)

  float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
  vec2 patternBoxGivenSize = vec2(
    (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
    (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  patternBoxRatio = patternBoxGivenSize.x / patternBoxGivenSize.y;

  vec3 boxSizeData = getBoxSize(patternBoxRatio, patternBoxGivenSize, maxBoxSize);
  v_patternBoxSize = boxSizeData.xy;
  float patternBoxNoFitBoxWidth = boxSizeData.z;
  vec2 patternBoxScale = u_resolution.xy / v_patternBoxSize;

  #ifdef ADD_HELPERS
    v_patternHelperBox = uv;
    v_patternHelperBox *= patternBoxScale;
    v_patternHelperBox += boxOrigin * (patternBoxScale - 1.);
  #endif

  v_patternUV = uv;
  v_patternUV += graphicOffset / patternBoxScale;
  v_patternUV += boxOrigin;
  v_patternUV -= boxOrigin / patternBoxScale;
  v_patternUV *= u_resolution.xy;
  v_patternUV /= u_pixelRatio;
  if (u_fit > 0.) {
    v_patternUV *= (patternBoxNoFitBoxWidth / v_patternBoxSize.x);
  }
  v_patternUV /= u_scale;
  v_patternUV = graphicRotation * v_patternUV;
  v_patternUV += boxOrigin / patternBoxScale;
  v_patternUV -= boxOrigin;
  v_patternUV += .5;

  // ===================================================

}`;

const FRAGMENT = `#version 300 es
precision mediump float;

uniform float u_time;

uniform vec4 u_colorBack;
uniform vec4 u_colors[5];
uniform float u_colorsCount;

uniform float u_frequency;
uniform float u_spotty;
uniform float u_midSize;
uniform float u_midIntensity;
uniform float u_density;
uniform float u_blending;


in vec2 v_objectUV;
in vec2 v_responsiveUV;
in vec2 v_responsiveBoxGivenSize;
in vec2 v_patternUV;

out vec4 fragColor;


#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846


float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}


vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}


float hash(float n) {
  return fract(sin(n * 43758.5453123) * 43758.5453123);
}

float valueNoise(vec2 uv) {
  vec2 i = floor(uv);
  vec2 f = fract(uv);

  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

float raysShape(vec2 uv, float r, float freq, float density, float radius) {
  float a = atan(uv.y, uv.x);
  vec2 left = vec2(a * freq, r);
  vec2 right = vec2(mod(a, TWO_PI) * freq, r);
  float n_left = pow(valueNoise(left), density);
  float n_right = pow(valueNoise(right), density);
  float shape = mix(n_right, n_left, smoothstep(-.15, .15, uv.x));
  return shape;
}

void main() {
  vec2 shape_uv = v_objectUV;

  float t = .2 * u_time;

  float radius = length(shape_uv);
  float spots = 5. * abs(u_spotty);

  float density = 4. - 3. * clamp(u_density, 0., 1.);

  float delta = 1. - smoothstep(0., 1., radius);

  float middleShape = pow(u_midIntensity, .3) * smoothstep(abs(u_midSize), 0.02 * abs(u_midSize), 3.0 * radius);
  middleShape = pow(middleShape, 5.0);

  vec3 accumColor = vec3(0.0);
  float accumAlpha = 0.0;

  for (int i = 0; i < 5; i++) {
    if (i >= int(u_colorsCount)) break;

    vec2 rotatedUV = rotate(shape_uv, float(i) + 1.0);

    float r1 = radius * (1.0 + 0.4 * float(i)) - 3.0 * t;
    float r2 = 0.5 * radius * (1.0 + spots) - 2.0 * t;
    float f = mix(1.0, 3.0 + 0.5 * float(i), hash(float(i) + 10.0)) * u_frequency;

    float ray = raysShape(rotatedUV, r1, 5.0 * f, density, radius);
    ray *= raysShape(rotatedUV, r2, 4.0 * f, density, radius);
    ray += (1. + 4. * ray) * middleShape;
    ray = clamp(ray, 0.0, 1.0);

    float srcAlpha = u_colors[i].a * ray;
    vec3 srcColor = u_colors[i].rgb * srcAlpha;

    vec3 alphaBlendColor = accumColor + (1.0 - accumAlpha) * srcColor;
    float alphaBlendAlpha = accumAlpha + (1.0 - accumAlpha) * srcAlpha;

    vec3 addBlendColor = accumColor + srcColor;
    float addBlendAlpha = accumAlpha + srcAlpha;

    accumColor = mix(alphaBlendColor, addBlendColor, u_blending);
    accumAlpha = mix(alphaBlendAlpha, addBlendAlpha, u_blending);
  }

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;

  vec3 alphaBlendColor = accumColor + (1.0 - accumAlpha) * bgColor;
  float alphaBlendAlpha = accumAlpha + (1.0 - accumAlpha) * u_colorBack.a;

  vec3 addBlendColor = accumColor + bgColor;
  float addBlendAlpha = accumAlpha + u_colorBack.a;

  accumColor = mix(alphaBlendColor, addBlendColor, u_blending);
  accumAlpha = mix(alphaBlendAlpha, addBlendAlpha, u_blending);

  vec3 color = clamp(accumColor, 0.0, 1.0);
  float opacity = clamp(accumAlpha, 0.0, 1.0);


  
  color += 1. / 256. * (fract(sin(dot(.014 * gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453123) - .5);


  fragColor = vec4(color, opacity);
}
`;

export type SourceRayOptions = {
  speed: number;
  frequency: number;
  spotty: number;
  offsetY: number;
  density: number;
  centerIntensity?: number;
  centerSize?: number;
};

const COLOR_BACK = [0, 0, 0, 1];
const COLORS = new Float32Array([
  0, 230 / 255, 197 / 255, 1,
  50 / 255, 82 / 255, 77 / 255, 1,
  0, 0, 0, 0,
  0, 0, 0, 0,
  0, 0, 0, 0,
]);

type ShaderState = {
  gl: WebGL2RenderingContext;
  program: WebGLProgram;
};

const states = new WeakMap<HTMLCanvasElement, ShaderState>();

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function mount(canvas: HTMLCanvasElement) {
  const existing = states.get(canvas);
  if (existing) return existing;
  const gl = canvas.getContext("webgl2", {
    alpha: true,
    antialias: false,
    premultipliedAlpha: true,
  });
  if (!gl) return null;
  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
  if (!vertex || !fragment) return null;
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  );
  const location = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(location);
  gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
  const state = { gl, program };
  states.set(canvas, state);
  return state;
}

function fit(canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const viewport = window.visualViewport;
  const scale = viewport?.scale ?? 1;
  const inner = viewport ? viewport.width * scale : window.innerWidth;
  const outer = window.outerWidth || inner || 1;
  const zoom = inner > 0 ? Math.round((10000 * outer) / inner) / 10000 : 1;
  const ratio = zoom ? dpr / zoom : dpr;
  let pixels = Math.max(ratio, 2) * (zoom || 1) * scale;
  const area = Math.max(1, rect.width * pixels * rect.height * pixels);
  pixels *= Math.min(1, Math.sqrt(8294400 / area));
  const width = Math.max(1, Math.round(rect.width * pixels));
  const height = Math.max(1, Math.round(rect.height * pixels));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  return { width, height, pixelRatio: pixels };
}

function uniform(gl: WebGL2RenderingContext, program: WebGLProgram, name: string) {
  return gl.getUniformLocation(program, name);
}

export function drawSourceGodRays(
  canvas: HTMLCanvasElement,
  time: number,
  options: SourceRayOptions,
) {
  const state = mount(canvas);
  if (!state) return false;
  const { gl, program } = state;
  const { width, height, pixelRatio } = fit(canvas);
  if (width < 2 || height < 2) return true;
  gl.viewport(0, 0, width, height);
  gl.useProgram(program);
  gl.uniform1f(uniform(gl, program, "u_time"), time);
  gl.uniform1f(uniform(gl, program, "u_pixelRatio"), pixelRatio);
  gl.uniform2f(uniform(gl, program, "u_resolution"), width, height);
  gl.uniform4f(uniform(gl, program, "u_colorBack"), COLOR_BACK[0], COLOR_BACK[1], COLOR_BACK[2], COLOR_BACK[3]);
  gl.uniform4fv(uniform(gl, program, "u_colors"), COLORS);
  gl.uniform1f(uniform(gl, program, "u_colorsCount"), 2);
  gl.uniform1f(uniform(gl, program, "u_frequency"), options.frequency);
  gl.uniform1f(uniform(gl, program, "u_spotty"), options.spotty);
  gl.uniform1f(uniform(gl, program, "u_midSize"), options.centerSize ?? 0);
  gl.uniform1f(uniform(gl, program, "u_midIntensity"), options.centerIntensity ?? 0);
  gl.uniform1f(uniform(gl, program, "u_density"), options.density);
  gl.uniform1f(uniform(gl, program, "u_blending"), 1);
  gl.uniform1f(uniform(gl, program, "u_fit"), 1);
  gl.uniform1f(uniform(gl, program, "u_scale"), 1);
  gl.uniform1f(uniform(gl, program, "u_rotation"), 0);
  gl.uniform1f(uniform(gl, program, "u_offsetX"), 0);
  gl.uniform1f(uniform(gl, program, "u_offsetY"), options.offsetY);
  gl.uniform1f(uniform(gl, program, "u_originX"), 0.5);
  gl.uniform1f(uniform(gl, program, "u_originY"), 0.5);
  gl.uniform1f(uniform(gl, program, "u_worldWidth"), 0);
  gl.uniform1f(uniform(gl, program, "u_worldHeight"), 0);
  gl.uniform1f(uniform(gl, program, "u_pxSize"), 1);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  return true;
}
