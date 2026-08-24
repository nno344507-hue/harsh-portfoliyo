import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CrystalData {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  rotSpeed: [number, number, number];
  color: string;
  floatOffset: number;
}

export const FloatingCrystals: React.FC<{ count?: number }> = ({ count = 12 }) => {
  const groupRef = useRef<THREE.Group>(null);

  const crystals = useMemo<CrystalData[]>(() => {
    const list: CrystalData[] = [];
    const colors = ['#f59e0b', '#38bdf8', '#fbbf24', '#ec4899', '#ffffff'];

    for (let i = 0; i < count; i++) {
      list.push({
        position: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 6 - 1,
        ],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ],
        scale: Math.random() * 0.18 + 0.08,
        rotSpeed: [
          (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 0.8,
        ],
        color: colors[i % colors.length],
        floatOffset: Math.random() * Math.PI * 2,
      });
    }
    return list;
  }, [count]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    const pointer = state.pointer;

    // Subtle parallax response to pointer
    groupRef.current.position.x = pointer.x * 0.3;
    groupRef.current.position.y = pointer.y * 0.3;

    groupRef.current.children.forEach((child, idx) => {
      const data = crystals[idx];
      if (data) {
        child.rotation.x += data.rotSpeed[0] * 0.02;
        child.rotation.y += data.rotSpeed[1] * 0.02;
        child.rotation.z += data.rotSpeed[2] * 0.02;

        // Gentle floating bob
        child.position.y = data.position[1] + Math.sin(time * 0.8 + data.floatOffset) * 0.2;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {crystals.map((c, i) => (
        <mesh
          key={i}
          position={c.position}
          rotation={c.rotation}
          scale={[c.scale, c.scale, c.scale]}
        >
          {i % 2 === 0 ? (
            <octahedronGeometry args={[1, 0]} />
          ) : (
            <icosahedronGeometry args={[1, 0]} />
          )}
          <meshPhysicalMaterial
            color={c.color}
            emissive={c.color}
            emissiveIntensity={0.35}
            roughness={0.1}
            metalness={0.9}
            transparent={true}
            opacity={0.7}
            wireframe={i % 3 === 0}
          />
        </mesh>
      ))}
    </group>
  );
};
