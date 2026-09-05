import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { soundEngine } from '../../utils/audio';

interface TechNodeData {
  name: string;
  category: string;
  color: string;
  radius: number;
  speed: number;
  initialAngle: number;
  description: string;
}

const NODES_DATA: TechNodeData[] = [
  {
    name: 'Java 8+ / Concurrency',
    category: 'Core Language',
    color: '#00f0ff',
    radius: 2.2,
    speed: 0.45,
    initialAngle: 0,
    description: 'Collections, Streams & Lambdas, ExecutorService Thread Pools, OOP refactoring',
  },
  {
    name: 'Spring Boot & JWT',
    category: 'Backend Framework',
    color: '#00ff9f',
    radius: 3.2,
    speed: 0.35,
    initialAngle: 1.2,
    description: 'Spring Security, Data JPA, Hibernate ORM, Bean Lifecycle, Transaction Tuning',
  },
  {
    name: 'Microservices & Kafka',
    category: 'Architecture & Streaming',
    color: '#9d4edd',
    radius: 4.1,
    speed: 0.28,
    initialAngle: 2.5,
    description: 'RESTful API contracts, Inter-service messaging, RabbitMQ, WebSocket duplex',
  },
  {
    name: 'AWS Cloud Architecture',
    category: 'Cloud Infrastructure',
    color: '#ffb703',
    radius: 4.9,
    speed: 0.22,
    initialAngle: 4.0,
    description: 'EC2, ALB, RDS MySQL, S3, CloudFront, Route 53, Secrets Manager, CloudWatch',
  },
  {
    name: 'MySQL Database',
    category: 'Data Storage',
    color: '#3a86ff',
    radius: 5.6,
    speed: 0.18,
    initialAngle: 5.2,
    description: 'Schema normalization, complex queries, indexing & slow-query bottleneck tuning',
  },
  {
    name: 'Angular & Mapbox GL',
    category: 'Frontend & Geospatial',
    color: '#ff007f',
    radius: 6.2,
    speed: 0.15,
    initialAngle: 3.1,
    description: 'TypeScript, PrimeNG, real-time shipment plotting, country risk heatmaps',
  },
];

function OrbitRing({ radius, color }: { radius: number; color: string }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.015, radius + 0.015, 64]} />
      <meshBasicMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.2} />
    </mesh>
  );
}

function OrbitingNode({
  node,
  isSelected,
  onSelect,
}: {
  node: TechNodeData;
  isSelected: boolean;
  onSelect: (node: TechNodeData) => void;
}) {
  const meshRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);
  const angleRef = useRef(node.initialAngle);

  useFrame((_, delta) => {
    angleRef.current += delta * node.speed * 0.4;
    const x = Math.cos(angleRef.current) * node.radius;
    const z = Math.sin(angleRef.current) * node.radius;
    if (meshRef.current) {
      meshRef.current.position.set(x, 0, z);
    }
  });

  const handlePointerOver = () => {
    setHovered(true);
    soundEngine.playBlip(750, 'sine', 0.04, 0.04);
  };

  const handlePointerOut = () => {
    setHovered(false);
  };

  const handleClick = () => {
    soundEngine.playBlip(900, 'triangle', 0.08, 0.08);
    onSelect(node);
  };

  return (
    <group ref={meshRef}>
      {/* Visual Node Sphere */}
      <mesh
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        scale={hovered || isSelected ? 1.6 : 1}
      >
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={hovered || isSelected ? 1.2 : 0.6}
          roughness={0.2}
        />
      </mesh>

      {/* Orbit Halo */}
      {(hovered || isSelected) && (
        <mesh scale={1.8}>
          <ringGeometry args={[0.28, 0.32, 24]} />
          <meshBasicMaterial color={node.color} side={THREE.DoubleSide} transparent opacity={0.8} />
        </mesh>
      )}

      {/* Floating HTML Label */}
      <Html
        position={[0, 0.35, 0]}
        center
        distanceFactor={12}
        className="pointer-events-none select-none"
      >
        <div
          className={`px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider whitespace-nowrap transition-all duration-200 ${
            hovered || isSelected
              ? 'bg-black/90 text-white border border-cosmic-cyan shadow-glow-cyan'
              : 'bg-black/60 text-white/70 border border-white/10'
          }`}
        >
          {node.name.split(' ')[0]}
        </div>
      </Html>
    </group>
  );
}

export default function TechGalaxy3D({
  onSelectNode,
}: {
  onSelectNode: (node: TechNodeData) => void;
}) {
  const [selectedNode, setSelectedNode] = useState<TechNodeData | null>(null);
  const coreRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.01;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.08;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  const handleSelect = (node: TechNodeData) => {
    setSelectedNode(node);
    onSelectNode(node);
  };

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
      <group rotation={[Math.PI / 6, 0, 0]}>
        {/* Central Pulsing Reactor Core */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#00f0ff"
            emissiveIntensity={1.8}
            roughness={0.1}
          />
        </mesh>
        <pointLight color="#00f0ff" intensity={3} distance={14} />

        {/* Core Wireframe Corona */}
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <octahedronGeometry args={[1.0, 2]} />
          <meshBasicMaterial color="#9d4edd" wireframe transparent opacity={0.35} />
        </mesh>

        {/* Orbit Rings & Orbiting Nodes */}
        {NODES_DATA.map((node, i) => (
          <group key={`orbit-${node.name}-${i}`}>
            <OrbitRing radius={node.radius} color={node.color} />
            <OrbitingNode
              node={node}
              isSelected={selectedNode?.name === node.name}
              onSelect={handleSelect}
            />
          </group>
        ))}
      </group>
    </Float>
  );
}

