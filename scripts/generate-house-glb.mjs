import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

let THREE;
let GLTFExporter;
let mergeGeometries;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.resolve(__dirname, "../public/models/modern-house-kestrix-style.glb");

const DECK_H = 0.16;
const GF_H = 2.64;
const UF_H = 2.5;
const Y0 = DECK_H;
const Y1 = Y0 + GF_H;
const Y2 = Y1 + UF_H;

const GF_X0 = -4.05;
const GF_X1 = 3.02;
const GF_Z0 = -2.2;
const GF_Z1 = 2.18;

const UW_X0 = -4.05;
const UW_X1 = 0.38;
const UW_Z0 = -2.2;
const UW_Z1 = 1.62;
const BALC_Z = 2.18;

const UB_X0 = 0.3;
const UB_X1 = 4.68;
const UB_Z0 = -2.2;
const UB_Z1 = 2.22;

const DK_X0 = -4.28;
const DK_X1 = 5.42;
const DK_Z0 = -2.38;
const DK_Z1 = 3.28;

const batches = {};

function matKey(name) {
  if (!batches[name]) batches[name] = [];
  return batches[name];
}

function addBox(key, w, h, d, x, y, z, ry = 0) {
  const g = new THREE.BoxGeometry(Math.max(w, 0.001), Math.max(h, 0.001), Math.max(d, 0.001));
  if (ry) g.rotateY(ry);
  g.translate(x, y, z);
  matKey(key).push(g);
}

function addCyl(key, r, h, x, y, z, segs = 8) {
  const g = new THREE.CylinderGeometry(r, r, h, segs);
  g.translate(x, y, z);
  matKey(key).push(g);
}

function addIco(key, r, x, y, z, detail = 1) {
  const g = new THREE.IcosahedronGeometry(r, detail);
  g.translate(x, y, z);
  matKey(key).push(g);
}

function addSiding(keySet, x0, x1, y0, y1, z, axis = "z", outward = 1) {
  const board = 0.108;
  const gap = 0.007;
  const thick = 0.028;
  let y = y0;
  let i = 0;
  while (y < y1 - 0.015) {
    const h = Math.min(board, y1 - y);
    const key = keySet[i % keySet.length];
    const cy = y + h / 2;
    if (axis === "z") {
      addBox(key, x1 - x0, h, thick, (x0 + x1) / 2, cy, z + outward * (thick / 2));
    } else {
      addBox(key, thick, h, x1 - x0, z + outward * (thick / 2), cy, (x0 + x1) / 2);
    }
    y += board + gap;
    i += 1;
  }
}

function addFrame(x0, x1, y0, y1, z, axis = "z") {
  const t = 0.055;
  const d = 0.09;
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  const w = x1 - x0;
  const h = y1 - y0;
  if (axis === "z") {
    addBox("frame", w, t, d, cx, y1 - t / 2, z);
    addBox("frame", w, t, d, cx, y0 + t / 2, z);
    addBox("frame", t, h - 2 * t, d, x0 + t / 2, cy, z);
    addBox("frame", t, h - 2 * t, d, x1 - t / 2, cy, z);
  } else {
    addBox("frame", d, t, w, z, y1 - t / 2, cx);
    addBox("frame", d, t, w, z, y0 + t / 2, cx);
    addBox("frame", d, h - 2 * t, t, z, cy, x0 + t / 2);
    addBox("frame", d, h - 2 * t, t, z, cy, x1 - t / 2);
  }
}

function addGlass(x0, x1, y0, y1, z, axis = "z", mullions = 1) {
  const inset = 0.06;
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  const w = x1 - x0 - inset;
  const h = y1 - y0 - inset;
  if (axis === "z") {
    addBox("glass", w, h, 0.018, cx, cy, z);
    for (let i = 1; i <= mullions; i += 1) {
      const x = x0 + ((x1 - x0) * i) / (mullions + 1);
      addBox("frame", 0.04, h, 0.07, x, cy, z);
    }
  } else {
    addBox("glass", 0.018, h, w, z, cy, cx);
    for (let i = 1; i <= mullions; i += 1) {
      const zz = x0 + ((x1 - x0) * i) / (mullions + 1);
      addBox("frame", 0.07, h, 0.04, z, cy, zz);
    }
  }
}

function addRailing(x0, x1, z, yBottom, height = 0.92, axis = "z") {
  const topY = yBottom + height;
  const postH = height;
  const spacing = 0.11;
  if (axis === "z") {
    addBox("rail", x1 - x0 + 0.04, 0.03, 0.03, (x0 + x1) / 2, topY, z);
    addBox("rail", x1 - x0 + 0.04, 0.018, 0.018, (x0 + x1) / 2, yBottom + 0.08, z);
    for (let x = x0; x <= x1 + 0.001; x += spacing) {
      addCyl("rail", 0.009, postH, x, yBottom + postH / 2, z, 6);
    }
  } else {
    addBox("rail", 0.03, 0.03, x1 - x0 + 0.04, z, topY, (x0 + x1) / 2);
    addBox("rail", 0.018, 0.018, x1 - x0 + 0.04, z, yBottom + 0.08, (x0 + x1) / 2);
    for (let zz = x0; zz <= x1 + 0.001; zz += spacing) {
      addCyl("rail", 0.009, postH, z, yBottom + postH / 2, zz, 6);
    }
  }
}

function addSofa(x, y, z, ry = 0, w = 1.85) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.rotation.y = ry;
  const parts = [];
  const seat = new THREE.BoxGeometry(w, 0.38, 0.78);
  seat.translate(0, 0.28, 0);
  parts.push(["fabric", seat]);
  const back = new THREE.BoxGeometry(w, 0.48, 0.14);
  back.translate(0, 0.58, -0.32);
  parts.push(["fabric", back]);
  const armL = new THREE.BoxGeometry(0.12, 0.42, 0.78);
  armL.translate(-(w / 2 - 0.06), 0.42, 0);
  parts.push(["fabricDark", armL]);
  const armR = new THREE.BoxGeometry(0.12, 0.42, 0.78);
  armR.translate(w / 2 - 0.06, 0.42, 0);
  parts.push(["fabricDark", armR]);
  const base = new THREE.BoxGeometry(w - 0.1, 0.08, 0.7);
  base.translate(0, 0.08, 0);
  parts.push(["frame", base]);
  for (const [key, geo] of parts) {
    geo.rotateY(ry);
    geo.translate(x, y, z);
    matKey(key).push(geo);
  }
}

function addChair(x, y, z, ry = 0) {
  const seat = new THREE.BoxGeometry(0.68, 0.34, 0.7);
  seat.rotateY(ry);
  seat.translate(x, y + 0.28, z);
  matKey("fabric").push(seat);
  const back = new THREE.BoxGeometry(0.68, 0.42, 0.12);
  back.rotateY(ry);
  back.translate(x - Math.sin(ry) * 0.28, y + 0.52, z - Math.cos(ry) * 0.28);
  matKey("fabric").push(back);
  const base = new THREE.BoxGeometry(0.62, 0.08, 0.62);
  base.rotateY(ry);
  base.translate(x, y + 0.08, z);
  matKey("fabricDark").push(base);
}

function addTable(x, y, z, w = 0.9, d = 0.55) {
  addBox("woodC", w, 0.05, d, x, y + 0.32, z);
  addCyl("frame", 0.03, 0.3, x - w * 0.35, y + 0.16, z - d * 0.3, 8);
  addCyl("frame", 0.03, 0.3, x + w * 0.35, y + 0.16, z - d * 0.3, 8);
  addCyl("frame", 0.03, 0.3, x - w * 0.35, y + 0.16, z + d * 0.3, 8);
  addCyl("frame", 0.03, 0.3, x + w * 0.35, y + 0.16, z + d * 0.3, 8);
}

function addPlant(x, y, z, scale = 1) {
  addCyl("pot", 0.16 * scale, 0.28 * scale, x, y + 0.14 * scale, z, 10);
  addIco("foliage", 0.32 * scale, x, y + 0.48 * scale, z, 1);
  addIco("foliage2", 0.22 * scale, x + 0.12 * scale, y + 0.58 * scale, z + 0.05 * scale, 1);
}

function addPanels(x0, x1, y0, y1, z, cols, rows, axis = "z", outward = 1) {
  const gap = 0.034;
  const thick = 0.02;
  const spanU = x1 - x0;
  const spanV = y1 - y0;
  const u = (spanU - gap * (cols + 1)) / cols;
  const v = (spanV - gap * (rows + 1)) / rows;
  for (let c = 0; c < cols; c += 1) {
    for (let r = 0; r < rows; r += 1) {
      const u0 = x0 + gap + c * (u + gap);
      const v0 = y0 + gap + r * (v + gap);
      if (axis === "z") {
        addBox("panel", u, v, thick, u0 + u / 2, v0 + v / 2, z + outward * (thick / 2));
      } else {
        addBox("panel", thick, v, u, z + outward * (thick / 2), v0 + v / 2, u0 + u / 2);
      }
    }
  }
}

function buildHouse() {
  const wood = ["woodA", "woodB", "woodC"];

  addBox("stone", DK_X1 - DK_X0 + 1.6, 0.04, DK_Z1 - DK_Z0 + 1.8, (DK_X0 + DK_X1) / 2, -0.02, (DK_Z0 + DK_Z1) / 2 + 0.15);

  const plank = 0.115;
  let z = DK_Z0;
  let pi = 0;
  while (z < DK_Z1) {
    const d = Math.min(plank, DK_Z1 - z);
    addBox(pi % 2 ? "deckA" : "deckB", DK_X1 - DK_X0, 0.045, d - 0.004, (DK_X0 + DK_X1) / 2, DECK_H - 0.01, z + d / 2);
    z += plank;
    pi += 1;
  }
  addBox("woodC", DK_X1 - DK_X0, DECK_H - 0.04, 0.06, (DK_X0 + DK_X1) / 2, (DECK_H - 0.04) / 2, DK_Z1);
  addBox("woodC", 0.06, DECK_H - 0.04, DK_Z1 - DK_Z0, DK_X1, (DECK_H - 0.04) / 2, (DK_Z0 + DK_Z1) / 2);
  addBox("woodC", 0.06, DECK_H - 0.04, DK_Z1 - DK_Z0, DK_X0, (DECK_H - 0.04) / 2, (DK_Z0 + DK_Z1) / 2);

  addBox("structure", GF_X1 - GF_X0 - 0.08, 0.12, GF_Z1 - GF_Z0 - 0.08, (GF_X0 + GF_X1) / 2, Y0 + 0.06, (GF_Z0 + GF_Z1) / 2);
  addBox("interior", GF_X1 - GF_X0 - 0.35, 0.04, GF_Z1 - GF_Z0 - 0.35, (GF_X0 + GF_X1) / 2, Y0 + 0.14, (GF_Z0 + GF_Z1) / 2);
  addBox("structure", GF_X1 - GF_X0, 0.16, GF_Z1 - GF_Z0, (GF_X0 + GF_X1) / 2, Y1 - 0.08, (GF_Z0 + GF_Z1) / 2);
  addBox("interiorWall", GF_X1 - GF_X0 - 0.3, GF_H - 0.3, 0.08, (GF_X0 + GF_X1) / 2, Y0 + GF_H / 2, GF_Z0 + 0.16);
  addBox("interiorWall", 0.08, GF_H - 0.3, GF_Z1 - GF_Z0 - 0.4, GF_X0 + 0.16, Y0 + GF_H / 2, (GF_Z0 + GF_Z1) / 2);

  addBox("structure", 0.16, GF_H, GF_Z1 - GF_Z0, GF_X0 + 0.08, Y0 + GF_H / 2, (GF_Z0 + GF_Z1) / 2);
  addBox("structure", 0.16, GF_H, GF_Z1 - GF_Z0, GF_X1 - 0.08, Y0 + GF_H / 2, (GF_Z0 + GF_Z1) / 2);
  addBox("structure", GF_X1 - GF_X0, GF_H, 0.16, (GF_X0 + GF_X1) / 2, Y0 + GF_H / 2, GF_Z0 + 0.08);

  const W1 = { x0: -3.62, x1: -1.12, y0: Y0 + 0.06, y1: Y1 - 0.12 };
  const W2 = { x0: 0.22, x1: 2.72, y0: Y0 + 0.06, y1: Y1 - 0.12 };
  addBox("structure", W1.x0 - GF_X0, GF_H, 0.16, (GF_X0 + W1.x0) / 2, Y0 + GF_H / 2, GF_Z1 - 0.08);
  addBox("structure", W2.x0 - W1.x1, GF_H, 0.16, (W1.x1 + W2.x0) / 2, Y0 + GF_H / 2, GF_Z1 - 0.08);
  addBox("structure", GF_X1 - W2.x1, GF_H, 0.16, (W2.x1 + GF_X1) / 2, Y0 + GF_H / 2, GF_Z1 - 0.08);
  addBox("structure", W1.x1 - W1.x0, 0.12, 0.16, (W1.x0 + W1.x1) / 2, Y1 - 0.06, GF_Z1 - 0.08);
  addBox("structure", W2.x1 - W2.x0, 0.12, 0.16, (W2.x0 + W2.x1) / 2, Y1 - 0.06, GF_Z1 - 0.08);

  addSiding(wood, GF_X0, W1.x0, Y0, Y1, GF_Z1, "z", 1);
  addSiding(wood, W1.x1, W2.x0, Y0, Y1, GF_Z1, "z", 1);
  addSiding(wood, W2.x1, GF_X1, Y0, Y1, GF_Z1, "z", 1);
  addSiding(wood, GF_Z0, GF_Z1, Y0, Y1, GF_X0, "x", -1);
  addSiding(wood, GF_Z0, GF_Z1, Y0, Y1, GF_X1, "x", 1);
  addSiding(wood, GF_X0, GF_X1, Y0, Y1, GF_Z0, "z", -1);

  addFrame(W1.x0, W1.x1, W1.y0, W1.y1, GF_Z1 + 0.02, "z");
  addGlass(W1.x0, W1.x1, W1.y0, W1.y1, GF_Z1 + 0.02, "z", 1);
  addFrame(W2.x0, W2.x1, W2.y0, W2.y1, GF_Z1 + 0.02, "z");
  addGlass(W2.x0, W2.x1, W2.y0, W2.y1, GF_Z1 + 0.02, "z", 1);

  addBox("sconce", 0.08, 0.22, 0.1, (W1.x1 + W2.x0) / 2, Y0 + 1.55, GF_Z1 + 0.06);
  addBox("sconce", 0.08, 0.22, 0.1, W2.x1 + 0.22, Y0 + 1.55, GF_Z1 + 0.06);

  addBox("structure", UW_X1 - UW_X0, 0.14, BALC_Z - UW_Z0, (UW_X0 + UW_X1) / 2, Y1 + 0.07, (UW_Z0 + BALC_Z) / 2);
  addBox("deckA", UW_X1 - UW_X0 - 0.1, 0.04, BALC_Z - UW_Z1 - 0.02, (UW_X0 + UW_X1) / 2, Y1 + 0.16, (UW_Z1 + BALC_Z) / 2);
  addBox("structure", 0.16, UF_H, UW_Z1 - UW_Z0, UW_X0 + 0.08, Y1 + UF_H / 2, (UW_Z0 + UW_Z1) / 2);
  addBox("structure", 0.16, UF_H, UW_Z1 - UW_Z0, UW_X1 - 0.08, Y1 + UF_H / 2, (UW_Z0 + UW_Z1) / 2);
  addBox("structure", UW_X1 - UW_X0, UF_H, 0.16, (UW_X0 + UW_X1) / 2, Y1 + UF_H / 2, UW_Z0 + 0.08);
  addBox("structure", UW_X1 - UW_X0, 0.12, UW_Z1 - UW_Z0, (UW_X0 + UW_X1) / 2, Y2 - 0.06, (UW_Z0 + UW_Z1) / 2);

  const U1 = { x0: -3.58, x1: -1.82, y0: Y1 + 0.38, y1: Y2 - 0.28 };
  const U2 = { x0: -1.58, x1: -0.52, y0: Y1 + 0.38, y1: Y2 - 0.28 };
  addBox("structure", U1.x0 - UW_X0, UF_H, 0.14, (UW_X0 + U1.x0) / 2, Y1 + UF_H / 2, UW_Z1 - 0.07);
  addBox("structure", U2.x0 - U1.x1, UF_H, 0.14, (U1.x1 + U2.x0) / 2, Y1 + UF_H / 2, UW_Z1 - 0.07);
  addBox("structure", UW_X1 - U2.x1, UF_H, 0.14, (U2.x1 + UW_X1) / 2, Y1 + UF_H / 2, UW_Z1 - 0.07);
  addBox("structure", U1.x1 - U1.x0, U1.y0 - Y1, 0.14, (U1.x0 + U1.x1) / 2, (Y1 + U1.y0) / 2, UW_Z1 - 0.07);
  addBox("structure", U1.x1 - U1.x0, Y2 - U1.y1, 0.14, (U1.x0 + U1.x1) / 2, (U1.y1 + Y2) / 2, UW_Z1 - 0.07);
  addBox("structure", U2.x1 - U2.x0, U2.y0 - Y1, 0.14, (U2.x0 + U2.x1) / 2, (Y1 + U2.y0) / 2, UW_Z1 - 0.07);
  addBox("structure", U2.x1 - U2.x0, Y2 - U2.y1, 0.14, (U2.x0 + U2.x1) / 2, (U2.y1 + Y2) / 2, UW_Z1 - 0.07);

  addSiding(wood, UW_X0, U1.x0, Y1, Y2, UW_Z1, "z", 1);
  addSiding(wood, U1.x1, U2.x0, Y1, Y2, UW_Z1, "z", 1);
  addSiding(wood, U2.x1, UW_X1, Y1, Y2, UW_Z1, "z", 1);
  addSiding(wood, UW_Z0, UW_Z1, Y1, Y2, UW_X0, "x", -1);
  addSiding(wood, UW_X0, UW_X1, Y1, Y2, UW_Z0, "z", -1);

  addFrame(U1.x0, U1.x1, U1.y0, U1.y1, UW_Z1 + 0.02, "z");
  addGlass(U1.x0, U1.x1, U1.y0, U1.y1, UW_Z1 + 0.02, "z", 0);
  addFrame(U2.x0, U2.x1, U2.y0, U2.y1, UW_Z1 + 0.02, "z");
  addGlass(U2.x0, U2.x1, U2.y0, U2.y1, UW_Z1 + 0.02, "z", 0);
  addRailing(UW_X0 + 0.05, UW_X1 - 0.02, BALC_Z - 0.04, Y1 + 0.16, 0.9, "z");
  addRailing(UW_Z1, BALC_Z - 0.04, UW_X0 + 0.04, Y1 + 0.16, 0.9, "x");

  const ubW = UB_X1 - UB_X0;
  const ubD = UB_Z1 - UB_Z0;
  const ubH = UF_H;
  addBox("dark", ubW, ubH, ubD, (UB_X0 + UB_X1) / 2, Y1 + ubH / 2, (UB_Z0 + UB_Z1) / 2);
  addBox("dark", ubW + 0.08, 0.08, ubD + 0.08, (UB_X0 + UB_X1) / 2, Y2 + 0.02, (UB_Z0 + UB_Z1) / 2);
  addBox("soffit", ubW, 0.05, ubD, (UB_X0 + UB_X1) / 2, Y1 + 0.02, (UB_Z0 + UB_Z1) / 2);

  addPanels(UB_X0, UB_X1, Y1, Y2, UB_Z1, 2, 2, "z", 1);
  addPanels(UB_X0, UB_X1, Y1, Y2, UB_Z0, 2, 2, "z", -1);

  const BW = { z0: 0.22, z1: 2.05, y0: Y1 + 0.22, y1: Y2 - 0.22 };
  addPanels(UB_Z0, BW.z0, Y1, Y2, UB_X1, 1, 2, "x", 1);
  addPanels(BW.z1, UB_Z1, Y1, Y2, UB_X1, 1, 2, "x", 1);
  addBox("dark", 0.08, BW.y0 - Y1, BW.z1 - BW.z0, UB_X1 - 0.04, (Y1 + BW.y0) / 2, (BW.z0 + BW.z1) / 2);
  addBox("dark", 0.08, Y2 - BW.y1, BW.z1 - BW.z0, UB_X1 - 0.04, (BW.y1 + Y2) / 2, (BW.z0 + BW.z1) / 2);
  addFrame(BW.z0, BW.z1, BW.y0, BW.y1, UB_X1 + 0.01, "x");
  addGlass(BW.z0, BW.z1, BW.y0, BW.y1, UB_X1 + 0.01, "x", 0);
  addBox("curtain", 0.01, BW.y1 - BW.y0 - 0.12, 0.55, UB_X1 - 0.12, (BW.y0 + BW.y1) / 2, BW.z0 + 0.42);
  addRailing(BW.z0 + 0.08, BW.z1 - 0.08, UB_X1 + 0.05, Y1 + 0.18, 0.88, "x");

  addPanels(UW_Z0, UW_Z1, Y1, Y2, UB_X0, 2, 2, "x", -1);

  addSofa(-1.6, Y0 + 0.14, 0.15, Math.PI, 1.9);
  addTable(-1.55, Y0 + 0.14, 0.85, 0.8, 0.45);
  addBox("emissive", 1.4, 0.02, 0.4, -1.4, Y1 - 0.22, 0.2);
  addBox("emissive", 1.2, 0.02, 0.35, 1.4, Y1 - 0.22, 0.35);

  addSofa(1.55, DECK_H, 2.62, 0.08, 1.7);
  addChair(2.72, DECK_H, 2.72, -0.55);
  addChair(3.38, DECK_H, 2.42, -1.05);
  addTable(2.35, DECK_H, 2.78, 0.78, 0.5);
  addPlant(-0.35, DECK_H, 2.42, 1.05);
  addPlant(4.55, DECK_H, 2.95, 0.92);
  addPlant(4.95, DECK_H, 1.1, 0.7);

  addBox("interiorWall", 0.06, UF_H - 0.3, 1.6, (UW_X0 + UW_X1) / 2, Y1 + UF_H / 2, UW_Z0 + 0.22);
}

function makeMaterials() {
  const std = (color, extra = {}) =>
    new THREE.MeshStandardMaterial({
      color,
      roughness: 0.72,
      metalness: 0.02,
      ...extra,
    });

  return {
    woodA: std(0xd09a5c, { roughness: 0.66 }),
    woodB: std(0xdeb070, { roughness: 0.62 }),
    woodC: std(0xc08648, { roughness: 0.7 }),
    deckA: std(0xd2a86e, { roughness: 0.6 }),
    deckB: std(0xe0b87c, { roughness: 0.58 }),
    structure: std(0xa87542, { roughness: 0.78 }),
    dark: std(0x1e2126, { roughness: 0.44, metalness: 0.16 }),
    panel: std(0x2a2e34, { roughness: 0.4, metalness: 0.2 }),
    soffit: std(0x111214, { roughness: 0.5, metalness: 0.12 }),
    frame: std(0x121212, { roughness: 0.35, metalness: 0.55 }),
    rail: std(0x0c0c0c, { roughness: 0.32, metalness: 0.65 }),
    glass: new THREE.MeshPhysicalMaterial({
      color: 0x9ec0d4,
      metalness: 0.05,
      roughness: 0.05,
      transmission: 0.72,
      thickness: 0.05,
      ior: 1.45,
      transparent: true,
      opacity: 1,
      envMapIntensity: 1.25,
    }),
    interior: std(0xd9c4a8, { roughness: 0.8 }),
    interiorWall: std(0xe8dcd0, { roughness: 0.86, emissive: 0x3a2814, emissiveIntensity: 0.12 }),
    fabric: std(0xd5cfc4, { roughness: 0.9 }),
    fabricDark: std(0x5c5854, { roughness: 0.82 }),
    pot: std(0xefefe8, { roughness: 0.55 }),
    foliage: std(0x3a6a38, { roughness: 0.85 }),
    foliage2: std(0x2f572c, { roughness: 0.85 }),
    curtain: std(0xf2f0ea, { roughness: 0.9, transparent: true, opacity: 0.72 }),
    sconce: std(0x1a1a1a, { roughness: 0.4, metalness: 0.5, emissive: 0xffd2a8, emissiveIntensity: 0.35 }),
    emissive: std(0xffe0b0, { roughness: 1, emissive: 0xffc07a, emissiveIntensity: 0.85 }),
    stone: std(0x6b6762, { roughness: 0.92 }),
  };
}

async function main() {
  if (typeof globalThis.FileReader === "undefined") {
    globalThis.FileReader = class FileReader {
      result = null;
      onloadend = null;
      onerror = null;
      readAsArrayBuffer(blob) {
        Promise.resolve(blob.arrayBuffer())
          .then((buffer) => {
            this.result = buffer;
            this.onloadend?.();
          })
          .catch((error) => {
            this.onerror?.(error);
          });
      }
    };
  }

  THREE = await import("three");
  ({ GLTFExporter } = await import("three/addons/exporters/GLTFExporter.js"));
  ({ mergeGeometries } = await import("three/addons/utils/BufferGeometryUtils.js"));

  buildHouse();
  const materials = makeMaterials();
  const root = new THREE.Group();
  root.name = "MDCraftHouse";

  for (const [key, geos] of Object.entries(batches)) {
    if (!geos.length) continue;
    const merged = mergeGeometries(geos, false);
    if (!merged) continue;
    merged.computeVertexNormals();
    const mesh = new THREE.Mesh(merged, materials[key] ?? materials.structure);
    mesh.name = key;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    root.add(mesh);
    for (const g of geos) g.dispose();
  }

  const scene = new THREE.Scene();
  scene.add(root);
  scene.updateMatrixWorld(true);

  const exporter = new GLTFExporter();
  const result = await exporter.parseAsync(scene, {
    binary: true,
    onlyVisible: true,
  });

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, Buffer.from(result));
  fs.copyFileSync(outPath, path.resolve(__dirname, "../public/modern-house-kestrix-style.glb"));
  console.log(`Wrote ${outPath} (${(result.byteLength / 1024).toFixed(1)} KB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
