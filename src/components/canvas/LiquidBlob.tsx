import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Custom GLSL Shaders for 3D liquid organic mesh with chromatic amber/cyan refraction
const vertexShader = `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uScroll;
  uniform float uDistortion;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying float vDisplacement;

  // Simplex 3D noise functions
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0);
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
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;

    vec3 pos = position;
    float noiseFreq = 1.1;
    float noiseAmp = 0.32 + uDistortion * 0.2;
    
    // Dynamic mouse proximity deformation
    float mouseDist = length(pos.xy - vec3(uPointer * 2.2, 0.0).xy);
    float mouseInfluence = smoothstep(2.2, 0.0, mouseDist) * 0.35;

    float displacement = snoise(pos * noiseFreq + vec3(uTime * 0.3, uTime * 0.2 + uScroll * 0.3, uTime * 0.25)) * noiseAmp;
    displacement += mouseInfluence;
    
    vDisplacement = displacement;
    vec3 newPosition = pos + normal * displacement;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uPointer;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying float vDisplacement;

  void main() {
    vec3 viewDir = normalize(-vPosition);
    vec3 normal = normalize(vNormal);

    // Fresnel rim refraction
    float fresnel = pow(1.0 - max(0.0, dot(viewDir, normal)), 3.0);

    // Vibrant Lusion palette: deep charcoal, warm amber, and electric cyan/blue
    vec3 darkObsidian = vec3(0.04, 0.045, 0.06);
    vec3 darkMetallic = vec3(0.12, 0.14, 0.18);
    vec3 amberCore   = vec3(0.95, 0.55, 0.15);
    vec3 electricCyan = vec3(0.2, 0.65, 0.95);
    vec3 glassHighlight = vec3(0.9, 0.95, 1.0);

    float colorMix = sin(vDisplacement * 4.0 + uTime * 0.7) * 0.5 + 0.5;
    vec3 baseColor = mix(darkObsidian, darkMetallic, colorMix);

    // Specular lighting
    vec3 lightDir = normalize(vec3(1.0, 1.5, 2.0));
    float diff = max(dot(normal, lightDir), 0.0);
    vec3 diffuse = diff * vec3(0.2, 0.25, 0.32);

    // Iridescent rim effect
    vec3 rimColor = mix(amberCore, electricCyan, colorMix);
    vec3 finalColor = baseColor + diffuse + fresnel * rimColor * 0.95 + pow(fresnel, 5.0) * glassHighlight * 0.5;

    gl_FragColor = vec4(finalColor, 0.88);
  }
`;

export const LiquidBlob: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
      uDistortion: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    uniforms.uTime.value = time;

    // Smooth pointer lerp
    uniforms.uPointer.value.lerp(new THREE.Vector2(state.pointer.x, state.pointer.y), 0.07);

    // Normalized scroll progression (0.0 at top to 1.0 at footer bottom)
    const scrollY = window.scrollY || 0;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const scrollProgress = scrollY / maxScroll;
    uniforms.uScroll.value = THREE.MathUtils.lerp(uniforms.uScroll.value, scrollProgress * 3.0, 0.05);

    // Mesh continuous fluid rotation
    meshRef.current.rotation.y = time * 0.08 + state.pointer.x * 0.25;
    meshRef.current.rotation.x = Math.sin(time * 0.05) * 0.18 - state.pointer.y * 0.2;
    meshRef.current.rotation.z = time * 0.04;

    // Smart Continuous Path across all sections, including the Footer at scrollProgress = 1.0!
    // Hero (0.0): X ~ 1.2, Y ~ 0.0
    // Featured (0.4): X ~ -1.0, Y ~ 0.2
    // About/Labs (0.75): X ~ 0.8, Y ~ -0.2
    // Footer (0.9 - 1.0): X ~ 0.3, Y ~ 0.15 (DIRECTLY behind "Let's talk" card!)
    let targetX = 1.2;
    let targetY = 0.0;
    let targetZ = -0.5;

    if (scrollProgress < 0.25) {
      // Hero to Showreel
      const t = scrollProgress / 0.25;
      targetX = THREE.MathUtils.lerp(1.2, 1.4, t);
      targetY = THREE.MathUtils.lerp(0.0, -0.2, t);
    } else if (scrollProgress < 0.6) {
      // Projects section
      const t = (scrollProgress - 0.25) / 0.35;
      targetX = THREE.MathUtils.lerp(1.4, -1.0, t);
      targetY = THREE.MathUtils.lerp(-0.2, 0.2, t);
    } else if (scrollProgress < 0.85) {
      // About & Labs section
      const t = (scrollProgress - 0.6) / 0.25;
      targetX = THREE.MathUtils.lerp(-1.0, 0.9, t);
      targetY = THREE.MathUtils.lerp(0.2, -0.1, t);
    } else {
      // Footer section (Let's talk) - Placed directly behind the Let's talk card!
      const t = (scrollProgress - 0.85) / 0.15;
      targetX = THREE.MathUtils.lerp(0.9, 0.2, t);
      targetY = THREE.MathUtils.lerp(-0.1, 0.25, t);
      targetZ = THREE.MathUtils.lerp(-0.5, -0.2, t);
    }

    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.06);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.06);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.06);

    // Responsive scaling
    const isFooter = scrollProgress > 0.85;
    const baseScale = Math.min(viewport.width * (isFooter ? 0.26 : 0.22), isFooter ? 2.2 : 1.8);
    meshRef.current.scale.set(baseScale, baseScale, baseScale);
  });

  return (
    <mesh ref={meshRef} position={[1.2, 0, -0.5]}>
      <icosahedronGeometry args={[1, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={false}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
};
