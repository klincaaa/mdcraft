"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Html, Line, PerspectiveCamera, useGLTF, useProgress } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { cn } from "@/lib/cn";

const MODEL_SRC = "/models/modern-house-kestrix-style.glb";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  useGLTF.preload(MODEL_SRC);
}

type Shot = {
  t: number;
  pos: THREE.Vector3;
  look: THREE.Vector3;
};

type HouseExtent = {
  x: number;
  y: number;
  z: number;
};

const CAPTIONS = [
  {
    start: 0,
    end: 0.22,
    index: "01",
    title: "MODULARNI OBJEKAT",
    body: "Moderan modularni objekat projektovan za savremen način života, uz maksimalno iskorišćenje prostora.",
  },
  {
    start: 0.22,
    end: 0.38,
    index: "02",
    title: "DRVENA FASADA",
    body: "Prirodna drvena obloga daje objektu topao i moderan izgled, uz skladno uklapanje u prirodno okruženje.",
  },
  {
    start: 0.38,
    end: 0.53,
    index: "03",
    title: "PANORAMSKI PROZORI",
    body: "Velike staklene površine omogućavaju obilje prirodnog svetla i povezuju unutrašnji prostor sa okruženjem.",
  },
  {
    start: 0.53,
    end: 0.68,
    index: "04",
    title: "KONZOLNI SPRAT",
    body: "Gornja etaža je projektovana kao izdvojeni volumen koji objektu daje karakterističan moderan izgled.",
  },
  {
    start: 0.68,
    end: 0.82,
    index: "05",
    title: "PRIVATNI BALKON",
    body: "Prostrani balkon predstavlja dodatni prostor za odmor i uživanje na otvorenom.",
  },
  {
    start: 0.82,
    end: 0.94,
    index: "06",
    title: "PROSTRANA TERASA",
    body: "Velika terasa proširuje životni prostor i stvara prirodan prelaz između enterijera i eksterijera.",
  },
] as const;

const MODEL_SIZE = 2.15;
const DEFAULT_EXTENT: HouseExtent = { x: MODEL_SIZE, y: MODEL_SIZE * 0.58, z: MODEL_SIZE };

type PinDef = {
  captionIndex: number;
  label: string;
  x: number;
  y: number;
  z: number;
  out: [number, number, number];
};

const PINS: PinDef[] = [
  { captionIndex: 0, label: "Modularni objekat", x: 0.15, y: 2.7, z: 2.2, out: [1.05, 1.45, 1.85] },
  { captionIndex: 1, label: "Drvena fasada", x: -2.45, y: 1.52, z: 2.22, out: [-0.85, 1.05, 1.75] },
  { captionIndex: 2, label: "Panoramski prozori", x: 1.48, y: 1.42, z: 2.22, out: [1.35, 0.95, 1.7] },
  { captionIndex: 3, label: "Konzolni sprat", x: 2.55, y: 4.18, z: 2.24, out: [1.75, 0.85, 1.15] },
  { captionIndex: 4, label: "Balkon", x: -1.82, y: 3.58, z: 2.18, out: [-0.7, 1.25, 1.8] },
  { captionIndex: 5, label: "Terasa", x: 2.45, y: 0.2, z: 3.08, out: [1.4, 1.15, 1.45] },
];

type FitTransform = { s: number; ox: number; oy: number; oz: number };

function captionIndexFor(progress: number) {
  if (progress >= 0.94) return -1;
  const i = CAPTIONS.findIndex((c) => progress >= c.start && progress < c.end);
  return i < 0 ? 0 : i;
}

function smoothstep(x: number) {
  const t = THREE.MathUtils.clamp(x, 0, 1);
  return t * t * (3 - 2 * t);
}

function pulse(progress: number, start: number, end: number, fade = 0.08) {
  if (progress < start - fade || progress > end + fade) return 0;
  if (progress >= start && progress <= end) return 1;
  if (progress < start) return smoothstep((progress - (start - fade)) / fade);
  return smoothstep((end + fade - progress) / fade);
}

function orbitPoint(azimuthDeg: number, elevationDeg: number, distance: number, look: THREE.Vector3) {
  const az = THREE.MathUtils.degToRad(azimuthDeg);
  const el = THREE.MathUtils.degToRad(elevationDeg);
  const cosEl = Math.cos(el);
  return new THREE.Vector3(
    look.x + Math.sin(az) * cosEl * distance,
    look.y + Math.sin(el) * distance,
    look.z + Math.cos(az) * cosEl * distance,
  );
}

function framingDistance(size: HouseExtent, fovDeg: number, fill: number) {
  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = THREE.MathUtils.degToRad(fovDeg);
  return (maxDim / fill) / (2 * Math.tan(fov / 2));
}

function buildShots(size: HouseExtent, simplified: boolean): Shot[] {
  const fov = simplified ? 42 : 40;
  const pad = simplified ? 0.82 : 1;
  const lookY = size.y * 0.38;
  const lookAt = (x = 0, y = lookY, z = 0) => new THREE.Vector3(x, y, z);
  const distWide = framingDistance(size, fov, 0.36 * pad);
  const distMid = framingDistance(size, fov, 0.48 * pad);
  const distClose = framingDistance(size, fov, 0.56 * pad);

  const shot = (t: number, az: number, el: number, dist: number, target: THREE.Vector3): Shot => ({
    t,
    pos: orbitPoint(az, el, dist, target),
    look: target,
  });

  const overview = lookAt();
  const wood = lookAt(size.x * 0.1, size.y * 0.4, 0);
  const glass = lookAt(0, size.y * 0.42, size.z * 0.06);
  const upper = lookAt(0, size.y * 0.58, 0);
  const balcony = lookAt(-size.x * 0.08, size.y * 0.44, size.z * 0.04);
  const terrace = lookAt(0, size.y * 0.22, size.z * 0.05);

  return [
    shot(0, 48, 18, distWide, overview),
    shot(0.15, 40, 14, distMid, overview),
    shot(0.3, 78, 12, distClose, wood),
    shot(0.45, 8, 10, distClose, glass),
    shot(0.6, 32, 24, distMid, upper),
    shot(0.75, -42, 14, distClose, balcony),
    shot(0.88, 14, 6, distMid, terrace),
    shot(1, 138, 20, distWide, overview),
  ];
}

function sampleShots(progress: number, shots: Shot[], outPos: THREE.Vector3, outLook: THREE.Vector3) {
  const p = THREE.MathUtils.clamp(progress, 0, 1);
  let i = 0;
  while (i < shots.length - 1 && shots[i + 1].t < p) i += 1;
  const a = shots[i];
  const b = shots[Math.min(i + 1, shots.length - 1)];
  const u = smoothstep((p - a.t) / Math.max(b.t - a.t, 1e-5));
  outPos.lerpVectors(a.pos, b.pos, u);
  outLook.lerpVectors(a.look, b.look, u);
}

type LightPose = {
  t: number;
  key: THREE.Vector3;
  fill: THREE.Vector3;
  rim: THREE.Vector3;
  keyInt: number;
  fillInt: number;
  rimInt: number;
  hemiInt: number;
  ambientInt: number;
  keyColor: THREE.Color;
  rimColor: THREE.Color;
  exposure: number;
};

function buildLightPoses(mobile: boolean): LightPose[] {
  const k = mobile ? 0.78 : 1;
  const pose = (
    t: number,
    key: [number, number, number],
    fill: [number, number, number],
    rim: [number, number, number],
    keyInt: number,
    fillInt: number,
    rimInt: number,
    hemiInt: number,
    ambientInt: number,
    keyColor: number,
    rimColor: number,
    exposure: number,
  ): LightPose => ({
    t,
    key: new THREE.Vector3(...key),
    fill: new THREE.Vector3(...fill),
    rim: new THREE.Vector3(...rim),
    keyInt: keyInt * k,
    fillInt: fillInt * k,
    rimInt: rimInt * k,
    hemiInt,
    ambientInt,
    keyColor: new THREE.Color(keyColor),
    rimColor: new THREE.Color(rimColor),
    exposure,
  });

  return [
    pose(0, [6.6, 8.4, 4.6], [-4.8, 2.4, -3.0], [1.2, 3.2, -5.2], 1.9, 0.32, 0.2, 0.48, 0.2, 0xfff1dd, 0xd4652f, 1.08),
    pose(0.15, [6.8, 7.2, 4.2], [-4.4, 2.5, -2.6], [1.0, 3.6, -4.8], 1.95, 0.3, 0.2, 0.46, 0.19, 0xffead0, 0xd4652f, 1.07),
    pose(0.3, [8.8, 3.6, 2.4], [-3.2, 2.8, 4.2], [-1.5, 4.8, -3.4], 2.15, 0.28, 0.18, 0.4, 0.16, 0xffd4a0, 0xe8895a, 1.05),
    pose(0.45, [3.4, 5.8, 7.4], [-5.2, 1.8, 1.2], [4.8, 2.2, -2.8], 1.05, 0.22, 0.12, 0.32, 0.12, 0xe8f2ff, 0xc9a36a, 0.96),
    pose(0.6, [5.4, 2.4, -4.6], [2.6, 0.9, 4.2], [-3.2, 6.2, 1.4], 1.45, 0.55, 0.28, 0.36, 0.14, 0xffe0c0, 0xffc090, 1.0),
    pose(0.75, [-5.8, 5.6, 4.8], [3.4, 2.2, 2.6], [2.2, 6.4, -3.2], 1.55, 0.3, 0.22, 0.42, 0.18, 0xffe8d2, 0xd4652f, 1.04),
    pose(0.88, [4.8, 3.0, 6.8], [-4.2, 1.6, 2.2], [1.4, 5.5, -4.6], 1.7, 0.34, 0.16, 0.44, 0.18, 0xffd8b0, 0xe8895a, 1.06),
    pose(1, [7.6, 6.4, -5.8], [-3.8, 2.0, 4.0], [2.8, 4.6, 5.2], 1.5, 0.36, 0.32, 0.4, 0.16, 0xffc8a0, 0xd4652f, 1.02),
  ];
}

function sampleLights(progress: number, poses: LightPose[]) {
  const p = THREE.MathUtils.clamp(progress, 0, 1);
  let i = 0;
  while (i < poses.length - 1 && poses[i + 1].t < p) i += 1;
  const a = poses[i];
  const b = poses[Math.min(i + 1, poses.length - 1)];
  const u = smoothstep((p - a.t) / Math.max(b.t - a.t, 1e-5));
  return { a, b, u };
}

function fittedPoint(pin: Pick<PinDef, "x" | "y" | "z">, fit: FitTransform) {
  return new THREE.Vector3(pin.x * fit.s + fit.ox, pin.y * fit.s + fit.oy, pin.z * fit.s + fit.oz);
}

const pinProject = new THREE.Vector3();

function clampPinLabelPosition(
  el: THREE.Object3D,
  camera: THREE.Camera,
  size: { width: number; height: number },
) {
  pinProject.setFromMatrixPosition(el.matrixWorld).project(camera);
  let x = pinProject.x * size.width * 0.5 + size.width * 0.5;
  let y = -(pinProject.y * size.height * 0.5) + size.height * 0.5;
  const mobile = size.width < 768;
  const padX = mobile ? 112 : 28;
  const padTop = mobile ? 100 : 28;
  const padBottom = mobile ? Math.max(210, size.height * 0.42) : 28;
  x = THREE.MathUtils.clamp(x, padX, size.width - padX);
  y = THREE.MathUtils.clamp(y, padTop, size.height - padBottom);
  return [x, y];
}

function pointOnPolyline(pts: THREE.Vector3[], t: number, out: THREE.Vector3) {
  const clamped = THREE.MathUtils.clamp(t, 0, 1);
  const n = pts.length - 1;
  const x = clamped * n;
  const i = Math.min(Math.floor(x), n - 1);
  out.lerpVectors(pts[i], pts[i + 1], x - i);
  return out;
}

function Pinpoint({
  pin,
  fit,
  mobile,
}: {
  pin: PinDef;
  fit: FitTransform;
  active?: boolean;
  mobile: boolean;
}) {
  const origin = useMemo(() => fittedPoint(pin, fit), [pin, fit]);
  const points = useMemo(() => {
    const p0 = origin;
    const ox = pin.out[0] * fit.s * (mobile ? 0.22 : 1);
    const oy = pin.out[1] * fit.s * (mobile ? 0.38 : 1) + (mobile ? 0.1 : 0);
    const oz = pin.out[2] * fit.s * (mobile ? 0.16 : 1);
    const p1 = origin.clone().add(new THREE.Vector3(ox, oy, oz));
    const p2 = mobile
      ? p1.clone().add(new THREE.Vector3(ox * 0.2, 0.06, oz * 0.12))
      : p1.clone().add(new THREE.Vector3(pin.out[0] * fit.s * 0.85, 0.12 * fit.s, pin.out[2] * fit.s * 0.4));
    return [p0, p1, p2];
  }, [origin, pin, fit, mobile]);
  const end = points[2];
  const dot = mobile ? 0.022 : 0.028;
  const elapsed = useRef(0);
  const cursor = useRef(origin.clone());
  const dotRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const haloMat = useRef<THREE.MeshBasicMaterial>(null);
  const lineRef = useRef<THREE.Object3D>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useFrame((_, delta) => {
    elapsed.current += delta;
    const t = elapsed.current;
    const dotT = smoothstep(t / 0.1);
    const lineT = smoothstep((t - 0.06) / 0.26);
    const labelT = smoothstep((t - 0.26) / 0.16);

    if (dotRef.current) dotRef.current.scale.setScalar(dotT);
    if (haloRef.current) haloRef.current.scale.setScalar(0.35 + dotT * 0.65);
    if (haloMat.current) haloMat.current.opacity = 0.28 * dotT;

    pointOnPolyline(points, lineT, cursor.current);
    const lineGeo = (lineRef.current as { geometry?: { setPositions?: (positions: number[]) => void } } | null)
      ?.geometry;
    if (lineGeo?.setPositions && lineT > 0.02) {
      lineGeo.setPositions([
        origin.x,
        origin.y,
        origin.z,
        cursor.current.x,
        cursor.current.y,
        cursor.current.z,
      ]);
    }

    if (labelRef.current) {
      labelRef.current.style.opacity = String(labelT);
      labelRef.current.style.transform = `translateY(${(1 - labelT) * 10}px)`;
    }
  });

  return (
    <group>
      <mesh ref={dotRef} position={origin} scale={0.001} renderOrder={20}>
        <sphereGeometry args={[dot, 16, 16]} />
        <meshBasicMaterial color="#d4652f" depthTest={false} />
      </mesh>
      <mesh ref={haloRef} position={origin} scale={0.001} renderOrder={19}>
        <sphereGeometry args={[dot * 2.4, 16, 16]} />
        <meshBasicMaterial ref={haloMat} color="#d4652f" transparent opacity={0} depthTest={false} />
      </mesh>
      <Line
        ref={lineRef as never}
        points={[origin, origin.clone().add(new THREE.Vector3(0, 0.001, 0))]}
        color="#e8895a"
        lineWidth={mobile ? 2.4 : 3.2}
        transparent
        opacity={1}
        depthTest={false}
        renderOrder={21}
      />
      <Html
        position={end}
        center
        pointerEvents="none"
        zIndexRange={[30, 0]}
        calculatePosition={clampPinLabelPosition}
        style={{ pointerEvents: "none" }}
      >
        <div
          ref={labelRef}
          className="flex max-w-[calc(100vw-2rem)] items-center gap-2 rounded-sm bg-ink/85 px-2.5 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.45)] ring-1 ring-paper/15 backdrop-blur-sm sm:max-w-none sm:gap-3 sm:px-3 sm:py-2"
          style={{ opacity: 0, transform: "translateY(10px)" }}
        >
          <span className="h-px w-5 shrink-0 bg-corten sm:w-10" />
          <span className="font-display text-[13px] uppercase leading-none tracking-[0.12em] text-paper sm:text-[18px] md:text-[20px]">
            {pin.label}
          </span>
        </div>
      </Html>
    </group>
  );
}

function createGroundTexture(kind: "grass" | "gravel", size = 256) {
  const data = new Uint8Array(size * size * 4);
  const mid = (size - 1) / 2;
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const i = (y * size + x) * 4;
      const nx = (x - mid) / mid;
      const ny = (y - mid) / mid;
      const d = Math.sqrt(nx * nx + ny * ny);
      const n = Math.abs(Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
      const n2 = Math.abs(Math.sin(x * 3.17 + y * 9.71) * 23421.13) % 1;
      if (kind === "grass") {
        data[i] = 32 + n * 22;
        data[i + 1] = 52 + n2 * 34;
        data[i + 2] = 24 + n * 12;
        data[i + 3] = (1 - smoothstep((d - 0.58) / 0.42)) * 255;
      } else {
        data[i] = 78 + n * 48;
        data[i + 1] = 72 + n2 * 36;
        data[i + 2] = 62 + n * 24;
        data[i + 3] = (1 - smoothstep((d - 0.76) / 0.24)) * 230;
      }
    }
  }
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function SiteGround({ extent, mobile }: { extent: HouseExtent; mobile: boolean }) {
  const grassMap = useMemo(() => createGroundTexture("grass", mobile ? 128 : 256), [mobile]);
  const gravelMap = useMemo(() => createGroundTexture("gravel", mobile ? 96 : 192), [mobile]);
  const span = Math.max(extent.x, extent.z);
  const grassR = span * 2.15;
  const gravelR = span * 0.92;
  const bushes = useMemo(
    () => [
      [-span * 0.78, gravelR * 0.22],
      [span * 0.72, gravelR * 0.38],
      [-span * 0.18, gravelR * 0.7],
      [span * 0.52, -gravelR * 0.55],
      [-span * 0.62, -gravelR * 0.42],
    ],
    [span, gravelR],
  );

  useEffect(() => {
    return () => {
      grassMap.dispose();
      gravelMap.dispose();
    };
  }, [grassMap, gravelMap]);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.018, 0]} receiveShadow>
        <circleGeometry args={[grassR, 48]} />
        <meshStandardMaterial map={grassMap} transparent roughness={0.95} metalness={0} color="#6a7a48" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0.08]} receiveShadow>
        <circleGeometry args={[gravelR, 40]} />
        <meshStandardMaterial map={gravelMap} transparent roughness={0.88} metalness={0.04} color="#8a8478" />
      </mesh>
      {bushes.map(([x, z], i) => (
        <mesh key={i} position={[x, 0.08 + (i % 2) * 0.04, z]} scale={[0.16 + (i % 3) * 0.05, 0.12 + (i % 2) * 0.04, 0.14]}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial color={i % 2 ? "#2f4a28" : "#3a5a32"} roughness={0.92} />
        </mesh>
      ))}
    </group>
  );
}

function CantileverShadow({ fit }: { fit: FitTransform }) {
  const pos = useMemo(() => fittedPoint({ x: 3.85, y: 0.028, z: 0.95 }, fit), [fit]);
  const w = 1.7 * fit.s;
  const d = 1.15 * fit.s;
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={pos} renderOrder={2}>
        <circleGeometry args={[Math.max(w, d) * 0.72, 24]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.22} depthWrite={false} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[pos.x, pos.y + 0.004, pos.z]} renderOrder={3}>
        <circleGeometry args={[Math.max(w, d) * 0.42, 20]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.28} depthWrite={false} />
      </mesh>
    </group>
  );
}

function InteriorGlow({
  fit,
  progress,
  mobile,
}: {
  fit: FitTransform;
  progress: { current: number };
  mobile: boolean;
}) {
  const left = useRef<THREE.PointLight>(null);
  const right = useRef<THREE.PointLight>(null);
  const upper = useRef<THREE.PointLight>(null);
  const soffit = useRef<THREE.PointLight>(null);
  const a = useMemo(() => fittedPoint({ x: -2.2, y: 1.42, z: 0.85 }, fit), [fit]);
  const b = useMemo(() => fittedPoint({ x: 1.48, y: 1.42, z: 0.92 }, fit), [fit]);
  const c = useMemo(() => fittedPoint({ x: 2.45, y: 4.02, z: 0.45 }, fit), [fit]);
  const d = useMemo(() => fittedPoint({ x: 2.5, y: 2.58, z: 2.05 }, fit), [fit]);
  const reach = 1.55;

  useFrame(() => {
    const p = progress.current;
    const glass = pulse(p, 0.36, 0.55, 0.1);
    const cantilever = pulse(p, 0.52, 0.7, 0.1);
    const base = mobile ? 0.9 : 1.25;
    const peak = mobile ? 2.4 : 3.6;
    const interior = base + glass * (peak - base);
    if (left.current) left.current.intensity = interior * 0.9;
    if (right.current) right.current.intensity = interior;
    if (upper.current) upper.current.intensity = (mobile ? 0.45 : 0.7) + cantilever * (mobile ? 1.1 : 1.6);
    if (soffit.current) soffit.current.intensity = 0.12 + cantilever * (mobile ? 1.2 : 1.8);
  });

  return (
    <group>
      <pointLight ref={left} position={a} color="#ffc07a" distance={reach} decay={2} intensity={1.2} />
      <pointLight ref={right} position={b} color="#ffd2a0" distance={reach} decay={2} intensity={1.35} />
      <pointLight ref={upper} position={c} color="#ffe0b8" distance={1.2} decay={2} intensity={0.6} />
      <pointLight ref={soffit} position={d} color="#ffb070" distance={1.1} decay={2} intensity={0.15} />
    </group>
  );
}

function HouseModel({
  progress,
  onReady,
  captionIndex,
  mobile,
}: {
  progress: { current: number };
  onReady: (extent: HouseExtent) => void;
  captionIndex: number;
  mobile: boolean;
}) {
  const { scene } = useGLTF(MODEL_SRC);
  const group = useRef<THREE.Group>(null);
  const cloned = useMemo(() => scene.clone(true), [scene]);
  const ready = useRef(false);
  const [fit, setFit] = useState<FitTransform | null>(null);
  const glowMats = useRef<{ wall: THREE.MeshStandardMaterial[]; lamps: THREE.MeshStandardMaterial[] }>({
    wall: [],
    lamps: [],
  });

  useLayoutEffect(() => {
    glowMats.current = { wall: [], lamps: [] };
    cloned.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      child.castShadow = true;
      child.receiveShadow = true;
      child.frustumCulled = true;
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      mats.forEach((mat) => {
        if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhysicalMaterial) {
          mat.envMapIntensity = Math.max(mat.envMapIntensity, 0.9);
        }
        if (mat instanceof THREE.MeshStandardMaterial) {
          if (child.name === "interiorWall") glowMats.current.wall.push(mat);
          if (child.name === "emissive" || child.name === "sconce") glowMats.current.lamps.push(mat);
        }
      });
    });

    cloned.scale.set(1, 1, 1);
    cloned.position.set(0, 0, 0);
    cloned.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    const max = Math.max(size.x, size.y, size.z) || 1;
    cloned.scale.setScalar(MODEL_SIZE / max);

    const scaled = new THREE.Box3().setFromObject(cloned);
    const center = scaled.getCenter(new THREE.Vector3());
    cloned.position.set(-center.x, -scaled.min.y, -center.z);

    const grounded = new THREE.Box3().setFromObject(cloned);
    const finalSize = grounded.getSize(new THREE.Vector3());
    const nextFit = {
      s: MODEL_SIZE / max,
      ox: cloned.position.x,
      oy: cloned.position.y,
      oz: cloned.position.z,
    };
    setFit(nextFit);
    if (!ready.current) {
      ready.current = true;
      onReady({ x: finalSize.x, y: finalSize.y, z: finalSize.z });
    }
  }, [cloned, onReady]);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const target = progress.current * 0.1;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, target, 4.2, delta);
    const glass = pulse(progress.current, 0.36, 0.55, 0.1);
    const wallGlow = 0.1 + glass * 0.38;
    const lampGlow = 0.4 + glass * 1.15;
    glowMats.current.wall.forEach((mat) => {
      mat.emissiveIntensity = wallGlow;
    });
    glowMats.current.lamps.forEach((mat) => {
      mat.emissiveIntensity = lampGlow;
    });
  });

  return (
    <group ref={group}>
      <primitive object={cloned} />
      {fit ? <InteriorGlow fit={fit} progress={progress} mobile={mobile} /> : null}
      {fit ? <CantileverShadow fit={fit} /> : null}
      {fit
        ? PINS.filter((pin) => pin.captionIndex === captionIndex).map((pin) => (
            <Pinpoint key={pin.label} pin={pin} fit={fit} mobile={mobile} />
          ))
        : null}
    </group>
  );
}

function CameraRig({
  progress,
  shots,
  simplified,
}: {
  progress: { current: number };
  shots: { current: Shot[] };
  simplified: { current: boolean };
}) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(7, 3, 8));
  const targetLook = useRef(new THREE.Vector3(0, 1.1, 0));
  const look = useRef(new THREE.Vector3(0, 1.1, 0));
  const initialized = useRef(false);

  useFrame((_, delta) => {
    const list = shots.current;
    if (!list.length) return;
    sampleShots(progress.current, list, targetPos.current, targetLook.current);
    if (simplified.current) {
      targetLook.current.y -= 0.18;
    }
    const alpha = 1 - Math.exp(-delta * (simplified.current ? 7.2 : 5.4));
    if (!initialized.current) {
      camera.position.copy(targetPos.current);
      look.current.copy(targetLook.current);
      initialized.current = true;
    } else {
      camera.position.lerp(targetPos.current, alpha);
      look.current.lerp(targetLook.current, alpha);
    }
    camera.lookAt(look.current);
  });

  return null;
}

function StoryLights({
  progress,
  mobile,
}: {
  progress: { current: number };
  mobile: boolean;
}) {
  const keyRef = useRef<THREE.DirectionalLight>(null);
  const fillRef = useRef<THREE.DirectionalLight>(null);
  const rimRef = useRef<THREE.DirectionalLight>(null);
  const hemiRef = useRef<THREE.HemisphereLight>(null);
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const { gl } = useThree();
  const poses = useMemo(() => buildLightPoses(mobile), [mobile]);
  const keyColor = useRef(new THREE.Color());
  const rimColor = useRef(new THREE.Color());
  useFrame(() => {
    const { a, b, u } = sampleLights(progress.current, poses);
    const key = keyRef.current;
    const fill = fillRef.current;
    const rim = rimRef.current;
    if (key) {
      key.position.lerpVectors(a.key, b.key, u);
      key.intensity = THREE.MathUtils.lerp(a.keyInt, b.keyInt, u);
      keyColor.current.lerpColors(a.keyColor, b.keyColor, u);
      key.color.copy(keyColor.current);
    }
    if (fill) {
      fill.position.lerpVectors(a.fill, b.fill, u);
      fill.intensity = THREE.MathUtils.lerp(a.fillInt, b.fillInt, u);
    }
    if (rim) {
      rim.position.lerpVectors(a.rim, b.rim, u);
      rim.intensity = THREE.MathUtils.lerp(a.rimInt, b.rimInt, u);
      rimColor.current.lerpColors(a.rimColor, b.rimColor, u);
      rim.color.copy(rimColor.current);
    }
    if (hemiRef.current) hemiRef.current.intensity = THREE.MathUtils.lerp(a.hemiInt, b.hemiInt, u);
    if (ambientRef.current) ambientRef.current.intensity = THREE.MathUtils.lerp(a.ambientInt, b.ambientInt, u);
    gl.toneMappingExposure = THREE.MathUtils.lerp(a.exposure, b.exposure, u);
  });

  return (
    <>
      <color attach="background" args={["#0b0a08"]} />
      <hemisphereLight ref={hemiRef} args={["#f4eee6", "#1a1612", mobile ? 0.38 : 0.48]} />
      <ambientLight ref={ambientRef} intensity={0.2} color="#f4eee6" />
      <directionalLight
        ref={keyRef}
        position={[6.6, 8.4, 4.6]}
        intensity={mobile ? 1.4 : 1.9}
        color="#fff1dd"
        castShadow={!mobile}
        shadow-mapSize-width={mobile ? 512 : 1024}
        shadow-mapSize-height={mobile ? 512 : 1024}
        shadow-camera-near={0.5}
        shadow-camera-far={28}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0002}
      />
      <directionalLight ref={fillRef} position={[-4.8, 2.4, -3.0]} intensity={0.32} color="#f4eee6" />
      <directionalLight ref={rimRef} position={[1.2, 3.2, -5.2]} intensity={0.2} color="#d4652f" />
      {!mobile ? <Environment preset="sunset" environmentIntensity={0.28} /> : null}
      <ContactShadows
        position={[0, 0.012, 0]}
        opacity={mobile ? 0.38 : 0.55}
        scale={10}
        blur={mobile ? 3.2 : 2.6}
        far={5}
        color="#000000"
      />
    </>
  );
}

function LoadingOverlay({ visible }: { visible: boolean }) {
  const { progress } = useProgress();
  if (!visible) return null;
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-ink">
      <div className="text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.42em] text-corten">MD Craft · 3D</p>
        <p className="mt-4 font-display text-4xl uppercase leading-none text-paper">{Math.round(progress)}%</p>
        <p className="mt-3 font-serif text-sm text-muted">Učitavanje modela</p>
      </div>
    </div>
  );
}

function HouseCanvas({
  progress,
  mobile,
  onReady,
  inView,
  captionIndex,
}: {
  progress: { current: number };
  mobile: boolean;
  onReady: (extent: HouseExtent) => void;
  inView: boolean;
  captionIndex: number;
}) {
  const extentRef = useRef<HouseExtent>(DEFAULT_EXTENT);
  const shots = useRef<Shot[]>(buildShots(DEFAULT_EXTENT, mobile));
  const simplified = useRef(mobile);
  simplified.current = mobile;
  const [extent, setExtent] = useState<HouseExtent>(DEFAULT_EXTENT);

  useEffect(() => {
    shots.current = buildShots(extentRef.current, mobile);
  }, [mobile]);

  const handleReady = useCallback(
    (next: HouseExtent) => {
      extentRef.current = next;
      shots.current = buildShots(next, simplified.current);
      setExtent(next);
      onReady(next);
    },
    [onReady],
  );

  return (
    <Canvas
      dpr={mobile ? [1, 1.5] : [1, 2]}
      shadows={!mobile}
      frameloop={inView ? "always" : "never"}
      gl={{
        antialias: !mobile,
        alpha: false,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
      style={{ pointerEvents: "none", width: "100%", height: "100%" }}
    >
      <PerspectiveCamera makeDefault fov={mobile ? 42 : 40} near={0.1} far={120} position={[8.5, 3.6, 9.2]} />
      <StoryLights progress={progress} mobile={mobile} />
      <SiteGround extent={extent} mobile={mobile} />
      <CameraRig progress={progress} shots={shots} simplified={simplified} />
      <Suspense fallback={null}>
        <HouseModel progress={progress} onReady={handleReady} captionIndex={captionIndex} mobile={mobile} />
      </Suspense>
    </Canvas>
  );
}

export function House3DSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const captionIndexRef = useRef(0);
  const [mounted, setMounted] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [captionIndex, setCaptionIndex] = useState(0);
  const [sceneReady, setSceneReady] = useState(false);
  const [inView, setInView] = useState(true);
  const reduce = useReducedMotion() === true;
  const caption = captionIndex >= 0 ? CAPTIONS[captionIndex] : null;

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || reduce || !mounted) return;

    const proxy = { p: 0 };
    const ctx = gsap.context(() => {
      gsap.to(proxy, {
        p: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progress.current = self.progress;
            const next = captionIndexFor(self.progress);
            if (next !== captionIndexRef.current) {
              captionIndexRef.current = next;
              setCaptionIndex(next);
            }
          },
        },
      });
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    const t = window.setTimeout(refresh, 250);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [mounted, reduce, mobile]);

  useLayoutEffect(() => {
    const el = captionRef.current;
    if (!el || reduce) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 22, scale: 0.985 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power2.out", overwrite: true },
    );
  }, [captionIndex, reduce]);

  const handleReady = useCallback(() => {
    setSceneReady(true);
    ScrollTrigger.refresh();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn("relative bg-ink", reduce ? "h-[100svh]" : "h-[400vh] md:h-[600vh]")}
      aria-label="3D prezentacija modularnog objekta"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,101,47,0.12),transparent_58%)]" />
        <div className="relative flex h-full flex-col lg:grid lg:grid-cols-[minmax(0,68%)_minmax(0,32%)]">
          <div className="relative min-h-0 flex-1 lg:h-full">
            {mounted ? (
              <HouseCanvas
                progress={progress}
                mobile={mobile}
                onReady={handleReady}
                inView={inView}
                captionIndex={captionIndex}
              />
            ) : null}
            <LoadingOverlay visible={!sceneReady} />
          </div>

          <aside className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-ink via-ink/85 to-transparent px-5 pb-8 pt-24 sm:px-8 lg:static lg:flex lg:items-center lg:bg-none lg:px-10 lg:pb-0 lg:pt-0">
            <div className="mx-auto w-full max-w-md lg:mx-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.36em] text-corten">MD Craft · Objekat</p>
              <div className="mt-5 min-h-[9.5rem] sm:min-h-[10.5rem]">
                <div
                  ref={captionRef}
                  aria-live="polite"
                  className={cn("origin-left", !caption && "opacity-0")}
                >
                  {caption ? (
                    <>
                      <p className="font-mono text-[11px] tracking-[0.28em] text-corten">
                        {caption.index} / 06
                      </p>
                      <h2 className="mt-3 font-display text-[clamp(1.85rem,4.4vw,3.3rem)] uppercase leading-[0.9] text-paper">
                        {caption.title}
                      </h2>
                      <p className="mt-4 max-w-sm font-serif text-sm leading-relaxed text-paper/70 sm:text-base">
                        {caption.body}
                      </p>
                    </>
                  ) : (
                    <p className="font-serif text-sm text-muted">Skrolujte dalje</p>
                  )}
                </div>
              </div>
              <div className="mt-8 hidden gap-2 lg:flex" aria-hidden>
                {CAPTIONS.map((item, i) => (
                  <span
                    key={item.index}
                    className={cn(
                      "h-px flex-1 transition-colors duration-500",
                      i === captionIndex ? "bg-corten" : "bg-paper/20",
                    )}
                  />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
