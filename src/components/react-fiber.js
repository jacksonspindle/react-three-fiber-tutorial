import React, { Component } from 'react'
import { Canvas } from '@react-three/fiber'
import { BoxBufferGeometry } from 'three';

class ThreeJS extends Component {
    state = {  } 
    render() { 
        return (
            <Canvas>
                < mesh>
                    <BoxBufferGeometry 
                        attach="geometry" arcs={[1, 1, 1]}
                    />
                </mesh>
            </Canvas>
        );
    }
}
 
export default ThreeJS;