import './App.css'
import { Canvas } from '@react-three/fiber'
import View from './component/View'
import { Environment, Float, OrbitControls,} from '@react-three/drei'


function App() {

  return (
    <>
      <Canvas shadows>
        <OrbitControls />
         
        <Environment preset="night" background />
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[0, 5, 5]} />

        <View /> 
        <Float position={[1, 1.1, -0.5]} rotation={[Math.PI / 3.5, 0, 0]} rotationIntensity={4} floatIntensity={6} speed={1.5}>
        <mesh position={[2,1,2]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial />
        </mesh>
        </Float>
      </Canvas>
    </>
  )
}

export default App
