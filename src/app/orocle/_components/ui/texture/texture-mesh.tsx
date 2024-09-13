import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { fragmentShader, vertexShader } from './shaders'; // Adjust this import according to your file structure

const TextureMesh: React.FC = () => {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const { clock, mouse, gl } = state;
    if (mesh.current) {
      const material = mesh.current.material as THREE.ShaderMaterial;
      if (material) {
        material.uniforms.u_mouse.value = [mouse.x / 2 + 0.5, mouse.y / 2 + 0.5];
        material.uniforms.u_time.value = clock.getElapsedTime();
        const c = gl.domElement.getBoundingClientRect();
        material.uniforms.u_resolution.value = [c.width, c.height];
      }
    }
  });

  const uniforms = useMemo(() => ({
    u_intensity: { value: 0.3 },
    u_colors: {
      value: [
        new THREE.Vector4(134, 193, 237, 0.70),
        new THREE.Vector4(134, 193, 237, 0.40),
      ],
    },
    u_speed: { value: 0.213 },
    u_scale: { value: 0.333 },
    u_noise: { value: true },
    u_noise_color: { value: [1, 0, 0] },
    u_time: { value: 0 },
    u_mouse: { value: [0, 0] },
    u_resolution: { value: [2048, 2048] },
  }), []);

  return (
    <mesh ref={mesh} position={[0, 0, 0]} scale={1.5} rotation={[-0.75, 0.25, -0.25]}>
      <planeGeometry args={[3, 1, 2048]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe={false}
        
      />
    </mesh>
  );
};

export default TextureMesh;
