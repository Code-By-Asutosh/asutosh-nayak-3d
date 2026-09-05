import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { PORTFOLIO_DATA, ProjectItem } from '../../data/portfolioData';
import { soundEngine } from '../../utils/audio';

interface ProjectGalaxyProps {
  onSelectProject: (project: ProjectItem) => void;
}

function CelestialPlanet({
  project,
  position,
  onSelect,
}: {
  project: ProjectItem;
  position: [number, number, number];
  onSelect: (project: ProjectItem) => void;
}) {
  const planetRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (planetRef.current) planetRef.current.rotation.y += delta * 0.25;
    if (ringRef.current) ringRef.current.rotation.z += delta * 0.15;
  });

  const handlePointerOver = () => {
    setHovered(true);
    soundEngine.playBlip(680, 'sine', 0.05, 0.05);
  };

  const handlePointerOut = () => {
    setHovered(false);
  };

  const handleClick = () => {
    soundEngine.playWarp();
    onSelect(project);
  };

  // Celestial styling based on project type
  const getPlanetMaterial = () => {
    switch (project.planetType) {
      case 'oceanic':
        return (
          <>
            <meshStandardMaterial
              color="#023e8a"
              emissive="#0077b6"
              emissiveIntensity={hovered ? 0.9 : 0.4}
              roughness={0.4}
            />
          </>
        );
      case 'metropolis':
        return (
          <>
            <meshStandardMaterial
              color="#7209b7"
              emissive="#f72585"
              emissiveIntensity={hovered ? 0.9 : 0.4}
              roughness={0.3}
            />
          </>
        );
      case 'grid':
      default:
        return (
          <>
            <meshStandardMaterial
              color="#007200"
              emissive="#00ff9f"
              emissiveIntensity={hovered ? 0.9 : 0.4}
              roughness={0.5}
            />
          </>
        );
    }
  };

  return (
    <group position={position}>
      {/* Interactive Planet Sphere */}
      <mesh
        ref={planetRef}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        scale={hovered ? 1.3 : 1}
      >
        <sphereGeometry args={[0.7, 32, 32]} />
        {getPlanetMaterial()}
      </mesh>

      {/* Wireframe Hologram Shell */}
      <mesh scale={hovered ? 1.35 : 1.05}>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshBasicMaterial
          color={project.glowColor}
          wireframe={true}
          transparent
          opacity={hovered ? 0.45 : 0.2}
        />
      </mesh>

      {/* Orbital Telemetry Ring */}
      <group ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <mesh>
          <ringGeometry args={[1.05, 1.1, 48]} />
          <meshBasicMaterial
            color={project.glowColor}
            side={THREE.DoubleSide}
            transparent
            opacity={hovered ? 0.7 : 0.3}
          />
        </mesh>
        {/* Orbital Satellite Node */}
        <mesh position={[1.08, 0, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Floating HUD Label */}
      <Html
        position={[0, -1.2, 0]}
        center
        distanceFactor={10}
        className="pointer-events-none select-none"
      >
        <div
          className={`flex flex-col items-center px-3 py-1.5 rounded-lg border transition-all duration-300 ${
            hovered
              ? 'bg-black/90 border-cosmic-cyan text-white shadow-glow-cyan scale-110'
              : 'bg-black/60 border-white/10 text-white/80'
          }`}
        >
          <span className="text-[11px] font-display font-bold tracking-wider">{project.title}</span>
          <span className="text-[9px] font-mono text-cosmic-cyan/80">{project.company}</span>
          {hovered && (
            <span className="text-[8px] font-mono text-cosmic-alien mt-0.5 tracking-tighter">
              [CLICK TO DOCK]
            </span>
          )}
        </div>
      </Html>
    </group>
  );
}

export default function ProjectGalaxy3D({ onSelectProject }: ProjectGalaxyProps) {
  const projects = PORTFOLIO_DATA.projects;

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group position={[0, 0, 0]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 5, 5]} intensity={2.5} color="#ffffff" />

        {/* Planet 1: Risk Monitor */}
        {projects[0] && (
          <CelestialPlanet
            project={projects[0]}
            position={[-2.8, 0.4, 0]}
            onSelect={onSelectProject}
          />
        )}

        {/* Planet 2: Ohhpro Junction */}
        {projects[1] && (
          <CelestialPlanet
            project={projects[1]}
            position={[0, -0.6, 0.8]}
            onSelect={onSelectProject}
          />
        )}

        {/* Planet 3: Geospatial Intelligence */}
        {projects[2] && (
          <CelestialPlanet
            project={projects[2]}
            position={[2.8, 0.5, -0.2]}
            onSelect={onSelectProject}
          />
        )}
      </group>
    </Float>
  );
}

