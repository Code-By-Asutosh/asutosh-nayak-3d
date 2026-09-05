import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface HeroSpacecraftProps {
  pointer: { x: number; y: number };
}

/**
 * Creates procedural sci-fi hull plating canvas textures with panel seams,
 * rivets, hazard warning stripes, and technical stencils.
 */
function createSciFiTextures() {
  if (typeof document === 'undefined') return { hullTexture: null, bumpTexture: null };

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return { hullTexture: null, bumpTexture: null };

  // Base metallic battleship steel gray (not dark black!)
  ctx.fillStyle = '#8293a6';
  ctx.fillRect(0, 0, 1024, 1024);

  // Random industrial armor panel tiles in shades of steel gray
  const panelColors = ['#8ea0b4', '#99abc0', '#76879a', '#a6b8cd', '#6d7e91', '#8899ac'];
  for (let x = 0; x < 1024; x += 128) {
    for (let y = 0; y < 1024; y += 64) {
      ctx.fillStyle = panelColors[Math.floor(Math.random() * panelColors.length)];
      ctx.fillRect(x + 2, y + 2, 124, 60);

      // Panel seam border (crisp dark steel seam)
      ctx.strokeStyle = '#2c3746';
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, 128, 64);

      // Corner rivets (gleaming silver metallic dots)
      ctx.fillStyle = '#e2edf7';
      ctx.fillRect(x + 6, y + 6, 3, 3);
      ctx.fillRect(x + 119, y + 6, 3, 3);
      ctx.fillRect(x + 6, y + 55, 3, 3);
      ctx.fillRect(x + 119, y + 55, 3, 3);
    }
  }

  // Industrial hazard stripes section
  for (let i = 0; i < 4; i++) {
    const startY = 800 + i * 50;
    ctx.fillStyle = '#ffb703';
    ctx.fillRect(0, startY, 1024, 20);
    ctx.fillStyle = '#1c2430';
    for (let x = -50; x < 1100; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, startY);
      ctx.lineTo(x + 20, startY);
      ctx.lineTo(x, startY + 20);
      ctx.lineTo(x - 20, startY + 20);
      ctx.closePath();
      ctx.fill();
    }
  }

  // Stencil markings
  ctx.fillStyle = '#00f0ff';
  ctx.font = 'bold 36px monospace';
  ctx.fillText('ASUTOSH // CX-41', 40, 200);
  ctx.fillText('ODYSSEY', 40, 450);
  ctx.fillStyle = '#ffffff';
  ctx.font = '22px monospace';
  ctx.fillText('SYSTEM: BATTLECRUISER // ARMORED', 40, 240);

  const hullTexture = new THREE.CanvasTexture(canvas);
  hullTexture.wrapS = THREE.RepeatWrapping;
  hullTexture.wrapT = THREE.RepeatWrapping;

  return { hullTexture };
}

export default function HeroSpacecraft({ pointer }: HeroSpacecraftProps) {
  const cruiserRef = useRef<THREE.Group>(null!);
  const beaconRef = useRef<THREE.PointLight>(null!);
  const plumesRef = useRef<THREE.Group>(null!);

  const escort1Ref = useRef<THREE.Group>(null!);
  const escort2Ref = useRef<THREE.Group>(null!);

  const { hullTexture } = useMemo(() => createSciFiTextures(), []);

  // Industrial Battleship Gray Materials (Matching Reference Photo)
  const mats = useMemo(() => {
    return {
      primaryArmor: new THREE.MeshStandardMaterial({
        color: '#8ea1b7', // Clear Battleship Steel Gray
        metalness: 0.82,
        roughness: 0.38,
        map: hullTexture || undefined,
      }),
      darkHull: new THREE.MeshStandardMaterial({
        color: '#465568', // Mid-Slate Gray for recessed hull plates (not black!)
        metalness: 0.85,
        roughness: 0.42,
      }),
      accentPlate: new THREE.MeshStandardMaterial({
        color: '#65778c', // Armor Accent Gray
        metalness: 0.82,
        roughness: 0.36,
      }),
      lightPlate: new THREE.MeshStandardMaterial({
        color: '#b8c9dc', // Light Titanium Gray for upper decks & bridge
        metalness: 0.78,
        roughness: 0.32,
      }),
      bridgeGlass: new THREE.MeshStandardMaterial({
        color: '#00f0ff',
        emissive: '#00f0ff',
        emissiveIntensity: 2.8,
        roughness: 0.1,
      }),
      observationAmber: new THREE.MeshStandardMaterial({
        color: '#ffb703',
        emissive: '#ff9900',
        emissiveIntensity: 2.4,
        roughness: 0.1,
      }),
      radiatorFins: new THREE.MeshStandardMaterial({
        color: '#ff5500',
        emissive: '#ff4400',
        emissiveIntensity: 1.8,
        roughness: 0.35,
      }),
      engineMetal: new THREE.MeshStandardMaterial({
        color: '#5c6d80', // Steel Gray Engine Cylinders
        metalness: 0.9,
        roughness: 0.28,
      }),
      engineGlowCoil: new THREE.MeshStandardMaterial({
        color: '#ff8c00',
        emissive: '#ff7700',
        emissiveIntensity: 3.5,
      }),
      plumeCore: new THREE.MeshBasicMaterial({
        color: '#ffffff',
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
      }),
      plumeFlameCyan: new THREE.MeshBasicMaterial({
        color: '#00e5ff',
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
      }),
      plumeFlameOrange: new THREE.MeshBasicMaterial({
        color: '#ff5500',
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
      }),
    };
  }, [hullTexture]);

  useFrame((state, delta) => {
    if (!cruiserRef.current) return;

    // Majestic slow heavy battlecruiser rotation with mouse banking
    const targetRotZ = -pointer.x * 0.25;
    const targetRotX = pointer.y * 0.15;
    const targetRotY = pointer.x * 0.3;

    cruiserRef.current.rotation.z += (targetRotZ - cruiserRef.current.rotation.z) * 0.04;
    cruiserRef.current.rotation.x += (targetRotX - cruiserRef.current.rotation.x) * 0.04;
    cruiserRef.current.rotation.y += (targetRotY - cruiserRef.current.rotation.y) * 0.04;

    // Thruster exhaust flame pulsing
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 18) * 0.12 + Math.sin(state.clock.elapsedTime * 35) * 0.06;
    if (plumesRef.current) {
      plumesRef.current.scale.set(1, 1, pulse);
    }

    // Flashing strobe beacon on bridge mast
    if (beaconRef.current) {
      beaconRef.current.intensity = Math.sin(state.clock.elapsedTime * 4) > 0.8 ? 4 : 0.2;
    }

    // Escort fighters cruising in formation
    if (escort1Ref.current) {
      escort1Ref.current.position.y = 1.4 + Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
      escort1Ref.current.position.z = -1.2 + Math.cos(state.clock.elapsedTime * 1.2) * 0.1;
    }
    if (escort2Ref.current) {
      escort2Ref.current.position.y = -1.5 + Math.sin(state.clock.elapsedTime * 1.8 + 1) * 0.12;
      escort2Ref.current.position.z = 0.8 + Math.cos(state.clock.elapsedTime * 1.4) * 0.1;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.4}>
      {/* Cinematic 3/4 Perspective Angle: matches reference image directly! */}
      <group
        ref={cruiserRef}
        position={[-0.2, 0, 0]}
        rotation={[0.15, -0.65, 0.08]}
        scale={[1.1, 1.1, 1.1]}
      >
        {/* ============================================================== */}
        {/* 1. FORWARD SECTION: ARMORED NOSE & SENSOR PROW                  */}
        {/* ============================================================== */}
        {/* Chamfered Tapered Bow Nose */}
        <mesh position={[0, 0, 2.5]} rotation={[Math.PI, 0, 0]} material={mats.primaryArmor}>
          <cylinderGeometry args={[0.35, 0.65, 1.6, 6]} />
        </mesh>
        {/* Armored Nose Cap */}
        <mesh position={[0, 0, 3.4]} material={mats.darkHull}>
          <boxGeometry args={[0.55, 0.6, 0.4]} />
        </mesh>
        {/* Dual Forward Sensor Antennae Probes */}
        <mesh position={[-0.18, 0.05, 3.75]} rotation={[Math.PI / 2, 0, 0]} material={mats.darkHull}>
          <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
        </mesh>
        <mesh position={[0.18, 0.05, 3.75]} rotation={[Math.PI / 2, 0, 0]} material={mats.darkHull}>
          <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
        </mesh>
        {/* Forward Headlight / Sensor Glow */}
        <pointLight position={[0, 0, 3.8]} color="#00f0ff" intensity={2.5} distance={8} />

        {/* ============================================================== */}
        {/* 2. MIDSECTION: MAIN SUPERSTRUCTURE & ARMORED SPONSONS           */}
        {/* ============================================================== */}
        {/* Primary Fuselage Core */}
        <mesh position={[0, 0, 0.8]} material={mats.primaryArmor}>
          <boxGeometry args={[1.3, 0.95, 2.2]} />
        </mesh>

        {/* Armored Dorsal Spine Plate */}
        <mesh position={[0, 0.55, 0.8]} material={mats.accentPlate}>
          <boxGeometry args={[0.9, 0.22, 2.3]} />
        </mesh>

        {/* Armored Ventral Keel */}
        <mesh position={[0, -0.55, 0.8]} material={mats.darkHull}>
          <boxGeometry args={[0.8, 0.25, 2.1]} />
        </mesh>

        {/* Port Lateral Armor Sponson */}
        <group position={[-0.85, 0, 0.7]}>
          <mesh material={mats.darkHull}>
            <boxGeometry args={[0.5, 0.75, 1.8]} />
          </mesh>
          {/* Recessed Glowing Airlock / Utility Windows */}
          <mesh position={[-0.26, 0.1, 0.1]} material={mats.bridgeGlass}>
            <boxGeometry args={[0.02, 0.1, 0.9]} />
          </mesh>
          <mesh position={[-0.26, -0.12, -0.2]} material={mats.observationAmber}>
            <boxGeometry args={[0.02, 0.08, 0.6]} />
          </mesh>
        </group>

        {/* Starboard Lateral Armor Sponson */}
        <group position={[0.85, 0, 0.7]}>
          <mesh material={mats.darkHull}>
            <boxGeometry args={[0.5, 0.75, 1.8]} />
          </mesh>
          {/* Recessed Glowing Airlock / Utility Windows */}
          <mesh position={[0.26, 0.1, 0.1]} material={mats.bridgeGlass}>
            <boxGeometry args={[0.02, 0.1, 0.9]} />
          </mesh>
          <mesh position={[0.26, -0.12, -0.2]} material={mats.observationAmber}>
            <boxGeometry args={[0.02, 0.08, 0.6]} />
          </mesh>
        </group>

        {/* Lateral Heat Radiator Grill Vents (Orange glowing heatsinks from photo) */}
        <mesh position={[-0.66, 0.35, 0.2]} rotation={[0, 0, 0.4]} material={mats.radiatorFins}>
          <boxGeometry args={[0.1, 0.25, 0.8]} />
        </mesh>
        <mesh position={[0.66, 0.35, 0.2]} rotation={[0, 0, -0.4]} material={mats.radiatorFins}>
          <boxGeometry args={[0.1, 0.25, 0.8]} />
        </mesh>

        {/* Point Defense Turrets (Dorsal & Ventral) */}
        <group position={[0, 0.7, 1.2]}>
          <mesh material={mats.darkHull}>
            <sphereGeometry args={[0.14, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          </mesh>
          <mesh position={[0, 0.08, 0.15]} rotation={[Math.PI / 2, 0, 0]} material={mats.engineMetal}>
            <cylinderGeometry args={[0.025, 0.025, 0.3, 8]} />
          </mesh>
        </group>
        <group position={[0, 0.7, 0.2]}>
          <mesh material={mats.darkHull}>
            <sphereGeometry args={[0.14, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          </mesh>
          <mesh position={[0, 0.08, 0.15]} rotation={[Math.PI / 2, 0, 0]} material={mats.engineMetal}>
            <cylinderGeometry args={[0.025, 0.025, 0.3, 8]} />
          </mesh>
        </group>

        {/* ============================================================== */}
        {/* 3. COMMAND BRIDGE TOWER (STEPPED REAR DECK)                    */}
        {/* ============================================================== */}
        <group position={[0, 0.85, -0.3]}>
          {/* Bridge Superstructure Base */}
          <mesh material={mats.primaryArmor}>
            <boxGeometry args={[0.8, 0.45, 1.1]} />
          </mesh>
          {/* Upper Command Deck */}
          <mesh position={[0, 0.28, -0.05]} material={mats.accentPlate}>
            <boxGeometry args={[0.6, 0.25, 0.8]} />
          </mesh>
          {/* Panoramic Glowing Command Viewports (Horizontal slit windows) */}
          <mesh position={[0, 0.28, 0.36]} material={mats.bridgeGlass}>
            <boxGeometry args={[0.55, 0.08, 0.02]} />
          </mesh>
          <mesh position={[-0.31, 0.28, 0]} rotation={[0, Math.PI / 2, 0]} material={mats.bridgeGlass}>
            <boxGeometry args={[0.7, 0.08, 0.02]} />
          </mesh>
          <mesh position={[0.31, 0.28, 0]} rotation={[0, Math.PI / 2, 0]} material={mats.bridgeGlass}>
            <boxGeometry args={[0.7, 0.08, 0.02]} />
          </mesh>

          {/* Communications Mast & Sensor Radar */}
          <mesh position={[0, 0.55, -0.2]} material={mats.darkHull}>
            <cylinderGeometry args={[0.03, 0.04, 0.4, 8]} />
          </mesh>
          {/* Strobe Warning Beacon Light */}
          <pointLight ref={beaconRef} position={[0, 0.8, -0.2]} color="#00ff9f" intensity={2} distance={4} />
          <mesh position={[0, 0.78, -0.2]} material={mats.bridgeGlass}>
            <sphereGeometry args={[0.04, 8, 8]} />
          </mesh>
        </group>

        {/* ============================================================== */}
        {/* 4. AFT SECTION: HEAVY REINFORCED ENGINE CASING                 */}
        {/* ============================================================== */}
        <mesh position={[0, 0, -0.8]} material={mats.darkHull}>
          <boxGeometry args={[1.5, 1.2, 1.2]} />
        </mesh>
        <mesh position={[0, 0.65, -0.8]} material={mats.accentPlate}>
          <boxGeometry args={[1.1, 0.15, 1.1]} />
        </mesh>

        {/* ============================================================== */}
        {/* 5. QUAD HEAVY FUSION / ION ROCKET ENGINES (THE ROARING CLUSTER)*/}
        {/* ============================================================== */}
        {/* 4 Major Engine Thrusters (Top-Left, Top-Right, Bottom-Left, Bottom-Right) */}
        {[
          { x: -0.42, y: 0.32, z: -1.7 },
          { x: 0.42, y: 0.32, z: -1.7 },
          { x: -0.42, y: -0.32, z: -1.7 },
          { x: 0.42, y: -0.32, z: -1.7 },
        ].map((pos, idx) => (
          <group key={`thruster-${idx}`} position={[pos.x, pos.y, pos.z]}>
            {/* Outer Engine Cowling Cylinder with Ribs */}
            <mesh rotation={[Math.PI / 2, 0, 0]} material={mats.engineMetal}>
              <cylinderGeometry args={[0.26, 0.3, 0.9, 20]} />
            </mesh>
            {/* Structural Reinforcing Girdle Ring */}
            <mesh position={[0, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]} material={mats.darkHull}>
              <torusGeometry args={[0.3, 0.04, 8, 20]} />
            </mesh>
            {/* Exhaust Nozzle Bell */}
            <mesh position={[0, 0, -0.5]} rotation={[Math.PI / 2, 0, 0]} material={mats.engineMetal}>
              <cylinderGeometry args={[0.28, 0.22, 0.3, 20, 1, true]} />
            </mesh>
            {/* Internal Glowing Reactor Induction Ring */}
            <mesh position={[0, 0, -0.45]} rotation={[Math.PI / 2, 0, 0]} material={mats.engineGlowCoil}>
              <torusGeometry args={[0.2, 0.05, 12, 24]} />
            </mesh>
            {/* Localized Engine Glow Light */}
            <pointLight position={[0, 0, -0.6]} color="#ff6600" intensity={2.5} distance={3} />
          </group>
        ))}

        {/* Central Twin Auxiliary Booster Rockets */}
        <group position={[0, 0, -1.75]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} material={mats.engineMetal}>
            <cylinderGeometry args={[0.18, 0.22, 0.8, 16]} />
          </mesh>
          <mesh position={[0, 0, -0.45]} rotation={[Math.PI / 2, 0, 0]} material={mats.engineGlowCoil}>
            <torusGeometry args={[0.14, 0.03, 10, 16]} />
          </mesh>
        </group>

        {/* ============================================================== */}
        {/* 6. HIGH-INTENSITY DUAL-STAGE VOLUMETRIC EXHAUST PLUMES          */}
        {/* ============================================================== */}
        <group ref={plumesRef}>
          {/* Main 4 Quad Plumes */}
          {[
            { x: -0.42, y: 0.32 },
            { x: 0.42, y: 0.32 },
            { x: -0.42, y: -0.32 },
            { x: 0.42, y: -0.32 },
          ].map((pos, idx) => (
            <group key={`plume-${idx}`} position={[pos.x, pos.y, -2.2]}>
              {/* White-Hot Intense Inner Plasma Core */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} material={mats.plumeCore}>
                <coneGeometry args={[0.15, 1.4, 16]} />
              </mesh>
              {/* Mid-Stage Blazing Cyan Flame */}
              <mesh position={[0, 0, -0.6]} rotation={[-Math.PI / 2, 0, 0]} material={mats.plumeFlameCyan}>
                <coneGeometry args={[0.25, 2.6, 16]} />
              </mesh>
              {/* Outer Tapered Orange Thermal Reheat Exhaust */}
              <mesh position={[0, 0, -1.2]} rotation={[-Math.PI / 2, 0, 0]} material={mats.plumeFlameOrange}>
                <coneGeometry args={[0.35, 3.8, 16]} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Massive Engine Plume Master Light illuminating space behind ship */}
        <pointLight position={[0, 0, -3.2]} color="#00f0ff" intensity={8} distance={12} />
        <pointLight position={[0, 0, -2.5]} color="#ff5500" intensity={6} distance={8} />

        {/* ============================================================== */}
        {/* 7. FORMATION ESCORT FIGHTERS (FROM INSPIRATION IMAGE!)         */}
        {/* ============================================================== */}
        {/* Escort Fighter 1: Upper Left Flank */}
        <group ref={escort1Ref} position={[-2.8, 1.4, -1.5]} rotation={[0.1, -0.5, 0.1]} scale={[0.24, 0.24, 0.24]}>
          <mesh material={mats.primaryArmor}>
            <coneGeometry args={[0.6, 2.5, 4]} />
          </mesh>
          <mesh position={[-0.8, -0.1, -0.3]} material={mats.darkHull}>
            <boxGeometry args={[1.2, 0.05, 0.8]} />
          </mesh>
          <mesh position={[0.8, -0.1, -0.3]} material={mats.darkHull}>
            <boxGeometry args={[1.2, 0.05, 0.8]} />
          </mesh>
          {/* Escort Engine Flame */}
          <mesh position={[0, 0, -1.8]} rotation={[-Math.PI / 2, 0, 0]} material={mats.plumeFlameCyan}>
            <coneGeometry args={[0.3, 1.8, 12]} />
          </mesh>
          <pointLight position={[0, 0, -1.8]} color="#00f0ff" intensity={1.5} distance={3} />
        </group>

        {/* Escort Fighter 2: Lower Right Flank */}
        <group ref={escort2Ref} position={[2.6, -1.5, 0.6]} rotation={[0.15, -0.6, 0.05]} scale={[0.2, 0.2, 0.2]}>
          <mesh material={mats.primaryArmor}>
            <coneGeometry args={[0.6, 2.5, 4]} />
          </mesh>
          <mesh position={[-0.7, -0.1, -0.3]} material={mats.darkHull}>
            <boxGeometry args={[1.0, 0.05, 0.7]} />
          </mesh>
          <mesh position={[0.7, -0.1, -0.3]} material={mats.darkHull}>
            <boxGeometry args={[1.0, 0.05, 0.7]} />
          </mesh>
          {/* Escort Engine Flame */}
          <mesh position={[0, 0, -1.8]} rotation={[-Math.PI / 2, 0, 0]} material={mats.plumeFlameCyan}>
            <coneGeometry args={[0.3, 1.6, 12]} />
          </mesh>
          <pointLight position={[0, 0, -1.8]} color="#00f0ff" intensity={1.5} distance={3} />
        </group>
      </group>
    </Float>
  );
}
