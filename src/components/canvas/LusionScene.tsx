import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { LiquidBlob } from './LiquidBlob';
import { FloatingParticles } from './FloatingParticles';

export const LusionScene: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#060608']} />
        <fog attach="fog" args={['#060608', 3, 14]} />

        {/* Ambient & soft accent lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 6, 4]} intensity={0.8} color="#ffffff" />
        <directionalLight position={[-4, -3, -2]} intensity={0.5} color="#38bdf8" />
        <pointLight position={[2, 2, 2]} intensity={1.2} color="#f59e0b" distance={6} />

        <Suspense fallback={null}>
          <LiquidBlob />
          <FloatingParticles count={200} />
        </Suspense>
      </Canvas>
    </div>
  );
};
