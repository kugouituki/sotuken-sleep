import { Canvas } from '@react-three/fiber'
import ViewWithSound from './ViewWithSound'
import { Environment, Float, OrbitControls } from '@react-three/drei'
import { DepthOfField, EffectComposer, Vignette, Bloom } from '@react-three/postprocessing'
import { useState } from 'react'
import Button from "react-bootstrap/Button"



function View() {
  // ページ番号（0 = スタート画面, 1 = 3D画面1, 2 = 3D画面2 ...）
  const [page, setPage] = useState(0)
  const [setting, setsPage] = useState(0);
  

function delta(){
  setsPage(count + 1);
}

  return (
    <>
      {page === 0 && (
        <div
         className="d-flex flex-column align-items-center justify-content-center"
         style={{
          backgroundColor: "#e6afe4ff",
          width: "100%",
          height: "100%"
        }}>
        
        <Button onClick={delta}>パワーナップ開始{setting}</Button>
        <Button onClick={() => setPage(1)}>パワーナップ開始１</Button>
        <Button onClick={() => setPage(2)}>パワーナップ開始２</Button>
        

      </div>


      )}

      {page === 1 && (
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
      )}
      {page === 2 && (
        
        <Canvas shadows>
          <OrbitControls/>
          <Environment preset={null} background>
            <color attach="background" args={["#fbe8d3"]}/>
          </Environment>
          <ambientLight intensity={0.4} color={"#ffbb88"}/>
          <directionalLight
            position={[-2, 2, -3]}
            intensity={0.4}
            color={"#ffcc99"}
          />
          <pointLight
            position={[-2, 2, -3]}
            intensity={0.4}
            color={"#ffcc99"}
          />
          <fog attach="fog" args={["#ffeedc", 2, 12]}/>
          
          <ViewWithSound/>
          <Float 
            position={[1, 1.1, -0.5]} 
            rotation={[Math.PI / 3.5, 0, 0]} 
            rotationIntensity={4} floatIntensity={6} 
            speed={1.5}
          />

          <EffectComposer>
            
            <DepthOfField
              focusDistance={0.02}
              focalLength={0.02}
              bokehScale={4}
            />
            <Vignette
              eskil={false}
              offset={0.4}
              darkness={0.6}
            />
          </EffectComposer>

        </Canvas>
      )}


      
    </>
  )
}

export default View