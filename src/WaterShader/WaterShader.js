import { useRef } from "react";
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';


function MyCustomPlane() {
  const mesh = useRef();
  
  var uniforms = {
    u_time: { type: "f", value: 1.0 },
  };

  useFrame(({ clock }) => {
    mesh.current.material.uniforms.u_time.value =  clock.getElapsedTime();
  });

  return (
    <mesh ref={mesh}>
      <cylinderGeometry args={[2, 2, 5]} />
      <shaderMaterial 
        
        uniforms={uniforms}

        vertexShader={vertexShader}
        fragmentShader={fragmentShader}

        side={THREE.DoubleSide} 
      />
    </mesh>
  );
}

export default function WaterShader() {

  return (
    <Canvas 
        dpr={window.devicePixelRatio} 
        camera={{ position: [0.0, 0.0, 10.0] }}
    >
      <MyCustomPlane />
      <OrbitControls />
    </Canvas>
  );
}