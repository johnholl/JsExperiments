import React from 'react';
import { Canvas } from '@react-three/fiber';
import Box from './Box.js';

export default function ThreePage(props) {
  return (
  <Canvas style={{width:1000, height:1000}}>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <Box position={[-1.2, 0, 0]} />
    <Box position={[1.2, 0, 0]} />
  </Canvas>
  )
}