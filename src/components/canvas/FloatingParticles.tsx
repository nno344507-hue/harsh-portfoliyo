import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const FloatingParticles: React.FC<{ count?: number }> = ({ count = 350 }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sca = new Float32Array(count);

    const amberColor = new THREE.Color('#f59e0b');
    const cyanColor = new THREE.Color('#38bdf8');
    const whiteColor = new THREE.Color('#ffffff');
    const pinkColor = new THREE.Color('#ec4899');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;

      // Randomly assign amber, cyan, pink, or white sparkles
      let chosenColor = whiteColor;
      const rand = Math.random();
      if (rand < 0.45) chosenColor = amberColor;
      else if (rand < 0.75) chosenColor = cyanColor;
      else if (rand < 0.88) chosenColor = pinkColor;

      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;

      sca[i] = Math.random() * 0.9 + 0.3;
    }

    return [pos, col, sca];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();

    pointsRef.current.rotation.y = time * 0.03 + state.pointer.x * 0.06;
    pointsRef.current.rotation.x = Math.sin(time * 0.02) * 0.06 - state.pointer.y * 0.06;
  });

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
          attach="attributes-scale"
          count={scales.length}
          array={scales}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        vertexColors={true}
        transparent={true}
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
