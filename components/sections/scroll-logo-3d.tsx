"use client";

import { Suspense, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, useGLTF } from "@react-three/drei";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import * as THREE from "three";
import { Container } from "@/components/ui/container";

const MODEL_SRC = "/logo-3d.glb";

function LogoModel({ progress }: { progress: { current: number } }) {
  const { scene } = useGLTF(MODEL_SRC);
  const group = useRef<THREE.Group>(null);
  const cloned = useMemo(() => scene.clone(true), [scene]);

  useLayoutEffect(() => {
    cloned.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      child.castShadow = true;
      child.receiveShadow = true;
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      mats.forEach((mat) => {
        if (mat instanceof THREE.MeshStandardMaterial) {
          mat.metalness = Math.max(mat.metalness, 0.55);
          mat.roughness = Math.min(mat.roughness, 0.38);
          mat.envMapIntensity = 1.15;
        }
      });
    });

    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    const max = Math.max(size.x, size.y, size.z) || 1;
    cloned.scale.setScalar(2.35 / max);
    const centered = new THREE.Box3().setFromObject(cloned);
    const center = centered.getCenter(new THREE.Vector3());
    cloned.position.sub(center);
  }, [cloned]);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const p = progress.current ?? 0;
    const targetY = p * Math.PI * 2.4;
    const targetX = Math.sin(p * Math.PI) * 0.32;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 6, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 6, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, Math.sin(p * Math.PI) * 0.18, 5, delta);
    const s = 0.92 + p * 0.16;
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, s, 5, delta));
  });

  return (
    <group ref={group}>
      <primitive object={cloned} />
    </group>
  );
}

useGLTF.preload(MODEL_SRC);

function Scene({ progress }: { progress: { current: number } }) {
  return (
    <>
      <color attach="background" args={["#0b0a08"]} />
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[4.2, 5.5, 3.2]}
        intensity={2.15}
        color="#e8895a"
        castShadow
      />
      <directionalLight position={[-3.5, 1.4, -2.2]} intensity={0.85} color="#f4eee6" />
      <spotLight position={[0, 6, 2]} angle={0.45} penumbra={0.7} intensity={1.1} color="#d4652f" />
      <Suspense fallback={null}>
        <LogoModel progress={progress} />
      </Suspense>
      <ContactShadows position={[0, -1.35, 0]} opacity={0.45} scale={8} blur={2.4} far={3.5} color="#000000" />
    </>
  );
}

export function ScrollLogo3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progress.current = v;
  });

  useEffect(() => {
    progress.current = scrollYProgress.get();
  }, [scrollYProgress]);

  if (reduce) {
    return (
      <section className="relative bg-ink py-16" aria-label="3D logo MD Craft">
        <div className="h-[46vh] w-full">
          <Canvas camera={{ position: [0, 0.2, 4.2], fov: 38 }} gl={{ antialias: true }} style={{ pointerEvents: "none" }}>
            <Scene progress={progress} />
          </Canvas>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink"
      style={{ height: "220vh" }}
      aria-label="3D logo MD Craft"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,101,47,0.16),transparent_58%)]" />
        <Canvas
          camera={{ position: [0, 0.25, 4.35], fov: 38 }}
          dpr={[1, 1.6]}
          gl={{ antialias: true, alpha: true }}
          style={{ pointerEvents: "none", height: "100%", width: "100%" }}
        >
          <Scene progress={progress} />
        </Canvas>
        <Container className="pointer-events-none absolute inset-x-0 bottom-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-corten">MD Craft · 3D</p>
          <p className="mt-2 max-w-sm font-serif text-sm text-muted">Skrolujte — logo prati pokret.</p>
        </Container>
      </div>
    </section>
  );
}
