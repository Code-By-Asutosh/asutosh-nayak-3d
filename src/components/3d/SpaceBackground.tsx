import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function CosmicNebula() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color('#030014') },
      uColorB: { value: new THREE.Color('#38006b') },
      uColorC: { value: new THREE.Color('#002b49') },
      uColorD: { value: new THREE.Color('#00ff9f') },
    }),
    []
  );

  useFrame((_, delta) => {
    if (meshRef.current) {
      uniforms.uTime.value += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.02;
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      vUv = uv;
      vNormal = normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec3 uColorC;
    uniform vec3 uColorD;
    varying vec2 vUv;
    varying vec3 vNormal;

    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    void main() {
      vec3 coord = vec3(vUv * 3.0, uTime * 0.1);
      float n1 = snoise(coord);
      float n2 = snoise(coord * 2.0 + vec3(4.2, 1.2, 0.5));
      float nebula = (n1 * 0.6 + n2 * 0.4);

      vec3 col = mix(uColorA, uColorB, smoothstep(-0.5, 0.6, nebula));
      col = mix(col, uColorC, smoothstep(0.2, 0.8, n2));
      col = mix(col, uColorD, smoothstep(0.7, 0.95, n1) * 0.25);

      float alpha = clamp(length(col) * 0.85, 0.15, 0.65);
      gl_FragColor = vec4(col, alpha);
    }
  `;

  return (
    <mesh ref={meshRef} scale={[-1, 1, 1]}>
      <sphereGeometry args={[95, 64, 64]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.BackSide}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

function Starfield({ count = 3500 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    const palette = [
      new THREE.Color('#00f0ff'),
      new THREE.Color('#ffffff'),
      new THREE.Color('#9d4edd'),
      new THREE.Color('#00ff9f'),
      new THREE.Color('#ff007f'),
    ];

    for (let i = 0; i < count; i++) {
      const radius = THREE.MathUtils.randFloat(25, 90);
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloat(-85, 85);
      const phiRad = THREE.MathUtils.degToRad(phi);
      const thetaRad = THREE.MathUtils.degToRad(theta);

      pos[i * 3 + 0] = radius * Math.cos(phiRad) * Math.cos(thetaRad);
      pos[i * 3 + 1] = radius * Math.sin(phiRad);
      pos[i * 3 + 2] = radius * Math.cos(phiRad) * Math.sin(thetaRad);

      const color = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3 + 0] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;

      sz[i] = THREE.MathUtils.randFloat(0.6, 2.4);
    }
    return { positions: pos, colors: col, sizes: sz };
  }, [count]);

  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      uniforms.uTime.value += delta;
      pointsRef.current.rotation.y += delta * 0.012;
      pointsRef.current.rotation.x += delta * 0.005;
    }
  });

  const vertexShader = `
    attribute float size;
    attribute vec3 color;
    varying vec3 vColor;
    uniform float uTime;
    void main() {
      vColor = color;
      vec3 pos = position;
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      float twinkle = sin(uTime * 3.0 + pos.x * 10.0 + pos.y * 5.0) * 0.5 + 0.5;
      gl_PointSize = size * (0.8 + 0.4 * twinkle) * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    varying vec3 vColor;
    void main() {
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;
      float alpha = smoothstep(0.5, 0.05, dist);
      gl_FragColor = vec4(vColor, alpha);
    }
  `;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function SpaceBackground() {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#030014] via-[#090224] to-[#030014]" />
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 65, near: 0.1, far: 300 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <CosmicNebula />
        <Starfield count={3200} />
      </Canvas>
    </div>
  );
}

