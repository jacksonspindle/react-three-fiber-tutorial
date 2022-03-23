import React, {useState, useRef, useEffect } from 'react';
import * as THREE from 'three'
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
// import { useSpring, a } from '@react-spring/web';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import './style.css';

extend({ OrbitControls })


// const SpaceShip = () => {

//   const [model, setModel] = useState()
//   useEffect(() => {
//     new GLTFLoader().load('/scene.gltf', setModel)
//   })
//   console.log(model)
//   return null
// }

const Controls = () => {
  const controlAnimation = useRef()
  const { camera, gl } = useThree();

  useEffect(
    () => {
      const controls = new OrbitControls(camera, gl.domElement);

      controls.maxPolarAngle = Math.PI / 2
      controls.minPolarAngle = Math.PI / 3
      controls.enableDamping = true 
      controls.dampingFactor = .5
      // controls.enableDamping = true

      console.log(controls)      

      controls.minDistance = 3;
      controls.maxDistance = 10;
      return () => {
        controls.dispose();
      };
    },
    [camera, gl]
  );
  return null;
};



const Plane = () => {


  return(
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1, -1, 1]} receiveShadow>
    <planeBufferGeometry attach="geometry" args={[100,100]} />
    <meshPhysicalMaterial 
        attach='material' 
        color= "white"
          /> 
  </mesh>)

}


const Box = () => {
  

  const mesh = useRef()
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)
  const Scale = active ? [1.5, 1.5, 1.5] : [1, 1, 1]
  const Color = hovered ? 'hotpink' : "gray"
  const Wireframe = active ? true : false
  useFrame((state, delta) => (mesh.current.rotation.y  += 0.005))



  return (
    <mesh 
    ref={mesh}
    onPointerOver={() => setHovered(true)} 
    onPointerOut={() => setHovered(false)}
    onClick={() => setActive(!active)}
    scale={Scale}
    castShadow
    >
      <ambientLight intensity={.2} />
      <spotLight intensity={.7} position={[0, 5, 10]} penumbra={1} castShadow/>
      <boxBufferGeometry attach="geometry" args={[4.25 / 3, 6.87 / 3, 1/3]} />
      <meshPhysicalMaterial 
        attach='material' 
        color={Color}
        wireframe={Wireframe}  /> 
    </mesh>
  )
}


console.log()


export default function App() {
  return <Canvas camera={{ position: [0,0,5]}} onCreated={({gl }) => {
    gl.shadowMap.enabled = true
    gl.shadowMap.type = THREE.PCFSoftShadowMap
  }}>
    <fog attach='fog' args={["white", 5, 15]}/>
    
    <Controls />
    <Box />
    <Plane />
    {/* <SpaceShip />  */}
  </Canvas>
};
