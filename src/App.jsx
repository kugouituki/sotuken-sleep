import './App.css'
import { Canvas } from '@react-three/fiber'
import View from './component/View'
import { Environment, Float, OrbitControls,} from '@react-three/drei'
import {DepthOfField,EffectComposer, Vignette } from '@react-three/postprocessing'
import ViewWithSound from './component/ViewWithSound'
import { useState } from 'react'
import Button from "react-bootstrap/Button"

function App() {

  const [startFlag, setStartFlag] = useState(false)
  

  return (
    <>
    {startFlag ?
      <Canvas shadows>
        <OrbitControls />
        <Environment preset="night" background />
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[0, 5, 5]} />

        <ViewWithSound/>

        <Float 
        position={[1, 1.1, -0.5]} 
        rotation={[Math.PI / 3.5, 0, 0]} 
        rotationIntensity={4} floatIntensity={6} 
        speed={1.5}
        >
        
        <mesh position={[2,1,2]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange"/>
        </mesh>
        
        </Float>
        <EffectComposer>
          <DepthOfField
            focusDistance={0}
            focalLength={0.02}
            bokehScale={2}
          />
          <Vignette
            eskil={false}
            offset={0.3}    
            darkness={0.8}  
          />
        </EffectComposer>
      </Canvas>
      : <div
         className="d-flex flex-column align-items-center justify-content-center"
         style={{
          backgroundColor: "#cfcccc",
          width: "100%",
          height: "100%"
        }}>
        <Button
          onClick={() => {
            setStartFlag(true)
          }}
        >スタートボタン</Button>
      </div>
      }
    </>
  )
}

export default App
