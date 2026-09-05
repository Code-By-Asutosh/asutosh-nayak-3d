import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function InteractivePlanet() {
  const planetRef = useRef<THREE.Mesh>(null!);
  const cloudsRef = useRef<THREE.Mesh>(null!);
  const ringRef1 = useRef<THREE.Group>(null!);
  const ringRef2 = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (planetRef.current) planetRef.current.rotation.y += delta * 0.12;
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.16;
    if (ringRef1.current) ringRef1.current.rotation.z += delta * 0.08;
    if (ringRef2.current) ringRef2.current.rotation.x += delta * 0.06;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}>
      <group scale={[1.8, 1.8, 1.8]}>
        {/* Ambient & Rim Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 3, 5]} intensity={3} color="#00f0ff" distance={20} />
        <pointLight position={[-5, -3, -5]} intensity={1.5} color="#9d4edd" distance={20} />

        {/* Core Planet Sphere */}
        <mesh ref={planetRef}>
          <sphereGeometry args={[1.2, 48, 48]} />
          <meshStandardMaterial
            color="#0b1736"
            roughness={0.6}
            metalness={0.4}
            emissive="#002d5c"
            emissiveIntensity={0.2}
            wireframe={false}
          />
        </mesh>

        {/* Holographic Continents & Geospatial Grid */}
        <mesh>
          <sphereGeometry args={[1.205, 32, 32]} />
          <meshBasicMaterial
            color="#00f0ff"
            wireframe={true}
            transparent
            opacity={0.18}
          />
        </mesh>

        {/* Atmospheric Glow Shell */}
        <mesh ref={cloudsRef}>
          <sphereGeometry args={[1.25, 32, 32]} />
          <meshStandardMaterial
            color="#00ff9f"
            transparent
            opacity={0.12}
            blending={THREE.AdditiveBlending}
            wireframe={false}
          />
        </mesh>

        {/* Outer Orbital Ring 1 */}
        <group ref={ringRef1} rotation={[Math.PI / 4, 0, 0]}>
          <mesh>
            <ringGeometry args={[1.5, 1.54, 64]} />
            <meshBasicMaterial
              color="#00f0ff"
              side={THREE.DoubleSide}
              transparent
              opacity={0.4}
            />
          </mesh>
          {/* Satellite Beacon */}
          <mesh position={[1.52, 0, 0]}>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshBasicMaterial color="#00ff9f" />
          </mesh>
        </group>

        {/* Outer Orbital Ring 2 */}
        <group ref={ringRef2} rotation={[-Math.PI / 3.5, Math.PI / 4, 0]}>
          <mesh>
            <ringGeometry args={[1.75, 1.78, 64]} />
            <meshBasicMaterial
              color="#9d4edd"
              side={THREE.DoubleSide}
              transparent
              opacity={0.3}
            />
          </mesh>
          {/* Secondary Satellite Beacon */}
          <mesh position={[-1.76, 0, 0]}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshBasicMaterial color="#ff007f" />
          </mesh>
        </group>

        {/* Beacon point on Bhubaneswar coordinates */}
        <group position={[0.7, 0.45, 0.8]}>
          <mesh>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshBasicMaterial color="#00ff9f" />
          </mesh>
          <pointLight color="#00ff9f" intensity={1.5} distance={2} />
        </group>
      </group>
    </Float>
  );
}

