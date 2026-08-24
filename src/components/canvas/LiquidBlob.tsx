import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Custom GLSL Shaders for 3D Kinetic Motion Ribbon / Film Wave with chromatic amber/cyan refraction
const vertexShader = `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uScroll;
  uniform float uDistortion;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying float vWave;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;

    vec3 pos = position;
    
    // Wave motion equations simulating kinetic timeline soundwaves & film flow
    float wave1 = sin(pos.x * 2.5 + pos.y * 1.5 + uTime * 1.2) * 0.18;
    float wave2 = cos(pos.z * 3.0 + pos.x * 1.8 + uTime * 0.9) * 0.12;
    float wave3 = sin(pos.y * 4.0 + uTime * 1.5 + uScroll * 4.0) * 0.08;
    
    // Mouse proximity repulsion and wave ripple
    float mouseDist = length(pos.xy - vec3(uPointer * 2.5, 0.0).xy);
    float mouseInfluence = smoothstep(2.5, 0.0, mouseDist) * 0.25;

    float totalWave = (wave1 + wave2 + wave3) * (1.0 + uDistortion * 0.5) + mouseInfluence;
    vWave = totalWave;

    vec3 newPosition = pos + normal * totalWave;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uPointer;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying float vWave;

  void main() {
    vec3 viewDir = normalize(-vPosition);
    vec3 normal = normalize(vNormal);

    // Fresnel rim light computation
    float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 2.8);
    float innerRim = pow(1.0 - max(dot(viewDir, normal), 0.0), 1.2);

    // Deep Obsidian / Dark Metallic Base
    vec3 obsidianBase = vec3(0.04, 0.04, 0.06);

    // Amber Golden Glow (Harsh Editor Branding)
    vec3 amberColor = vec3(0.98, 0.75, 0.15);

    // Cyan Neon Accent
    vec3 cyanColor = vec3(0.15, 0.85, 0.95);

    // Kinetic wireframe / chromatic wave pulses
    float pulse = sin(vUv.x * 40.0 + uTime * 2.0) * 0.5 + 0.5;
    float scanline = step(0.92, sin(vUv.y * 80.0 + uTime * 1.5));

    // Dynamic color mixing
    vec3 color = obsidianBase;
    
    // Mix Amber and Cyan along waves
    vec3 waveColor = mix(amberColor, cyanColor, smoothstep(-0.2, 0.2, vWave));
    
    // Apply Fresnel and wave illumination
    color += waveColor * fresnel * 1.4;
    color += amberColor * innerRim * 0.25;
    color += vec3(1.0) * scanline * 0.15 * fresnel;

    // Specular highlight from camera direction
    vec3 lightDir = normalize(vec3(1.0, 1.5, 1.2));
    vec3 halfVector = normalize(lightDir + viewDir);
    float specular = pow(max(dot(normal, halfVector), 0.0), 32.0);
    color += amberColor * specular * 0.6;

    // Alpha transparency with glowing rims
    float alpha = smoothstep(0.0, 0.6, fresnel * 0.9 + 0.25);

    gl_FragColor = vec4(color, alpha);
  }
`;

export const LiquidBlob: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { pointer } = useThree();

  // Scroll tracking state
  const scrollRef = useRef(0);
  const targetScrollRef = useRef(0);
  const distortionRef = useRef(0);

  // Smooth mouse inertia
  const smoothPointer = useRef(new THREE.Vector2(0, 0));

  React.useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const currentScroll = window.scrollY;
      const progress = Math.min(Math.max(currentScroll / maxScroll, 0), 1);
      targetScrollRef.current = progress;

      // Scroll speed distortion impulse
      const delta = Math.abs(currentScroll - lastScrollY);
      distortionRef.current = Math.min(distortionRef.current + delta * 0.003, 1.2);
      lastScrollY = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
      uDistortion: { value: 0 },
    }),
    []
  );

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Smooth scroll interpolation
    scrollRef.current += (targetScrollRef.current - scrollRef.current) * 0.06;

    // Decay distortion
    distortionRef.current = Math.max(0, distortionRef.current - delta * 1.8);

    // Smooth pointer inertia
    smoothPointer.current.x += (pointer.x - smoothPointer.current.x) * 0.05;
    smoothPointer.current.y += (pointer.y - smoothPointer.current.y) * 0.05;

    // Update uniform values
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time;
      materialRef.current.uniforms.uPointer.value.copy(smoothPointer.current);
      materialRef.current.uniforms.uScroll.value = scrollRef.current;
      materialRef.current.uniforms.uDistortion.value = distortionRef.current;
    }

    if (meshRef.current) {
      const scroll = scrollRef.current;

      // Elegant 3D Rotation along time and scroll trajectory
      meshRef.current.rotation.x = time * 0.25 + scroll * Math.PI * 1.8;
      meshRef.current.rotation.y = time * 0.35 + scroll * Math.PI * 2.2;
      meshRef.current.rotation.z = Math.sin(time * 0.2) * 0.2 + scroll * Math.PI;

      // Smooth Piecewise 3D Camera/Object Path across sections
      let targetX = 0;
      let targetY = 0;
      let targetZ = -0.4;
      let targetScale = 1.0;

      if (scroll < 0.2) {
        // Hero section: Majestic floating right-center accent
        targetX = 1.2 + smoothPointer.current.x * 0.4;
        targetY = 0.1 + smoothPointer.current.y * 0.4;
        targetZ = -0.3;
        targetScale = 1.05;
      } else if (scroll < 0.45) {
        // Showreel section: Glides left
        targetX = -1.6 + smoothPointer.current.x * 0.3;
        targetY = -0.2 + smoothPointer.current.y * 0.3;
        targetZ = -0.6;
        targetScale = 0.9;
      } else if (scroll < 0.7) {
        // Portfolio / Projects: Centered ambient backdrop
        targetX = 1.4 + smoothPointer.current.x * 0.3;
        targetY = 0.3 + smoothPointer.current.y * 0.3;
        targetZ = -0.8;
        targetScale = 1.1;
      } else if (scroll < 0.85) {
        // About / Reviews section: Left side glow
        targetX = -1.4 + smoothPointer.current.x * 0.2;
        targetY = 0.0 + smoothPointer.current.y * 0.2;
        targetZ = -0.5;
        targetScale = 0.95;
      } else {
        // Footer: Center glow behind 'Let's talk'
        targetX = 0.0 + smoothPointer.current.x * 0.3;
        targetY = -0.3 + smoothPointer.current.y * 0.3;
        targetZ = -0.2;
        targetScale = 1.35;
      }

      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.06;
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.06;
      meshRef.current.position.z += (targetZ - meshRef.current.position.z) * 0.06;

      const currentScale = meshRef.current.scale.x;
      const newScale = currentScale + (targetScale - currentScale) * 0.06;
      meshRef.current.scale.set(newScale, newScale, newScale);
    }

    // Secondary Outer Orbiting Kinetic Ring
    if (ringRef.current && meshRef.current) {
      ringRef.current.position.copy(meshRef.current.position);
      ringRef.current.rotation.x = -time * 0.15;
      ringRef.current.rotation.y = time * 0.45;
      ringRef.current.rotation.z = time * 0.2;
      ringRef.current.scale.copy(meshRef.current.scale).multiplyScalar(1.4);
    }

    // Outer Wireframe Accent
    if (wireframeRef.current && meshRef.current) {
      wireframeRef.current.position.copy(meshRef.current.position);
      wireframeRef.current.rotation.copy(meshRef.current.rotation);
      wireframeRef.current.scale.copy(meshRef.current.scale).multiplyScalar(1.04);
    }
  });

  return (
    <group>
      {/* Primary 3D Kinetic Torus Knot Ribbon */}
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[0.95, 0.32, 160, 32, 2, 3]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent={true}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Cyber Wireframe Accent Layer */}
      <mesh ref={wireframeRef}>
        <torusKnotGeometry args={[0.95, 0.32, 80, 16, 2, 3]} />
        <meshBasicMaterial
          color="#f59e0b"
          wireframe={true}
          transparent={true}
          opacity={0.12}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer Orbiting Anamorphic Light Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.2, 0.015, 16, 100]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent={true}
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};
