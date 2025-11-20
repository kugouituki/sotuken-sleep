import { Canvas } from '@react-three/fiber'
import ViewWithSound from './ViewWithSound'
import { Environment, Float, MapControls, MeshDistortMaterial, OrbitControls } from '@react-three/drei'
import { DepthOfField, EffectComposer, Vignette,  } from '@react-three/postprocessing'
import { useState } from 'react'
import Button from "react-bootstrap/Button"
import * as THREE from "three";


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
        
        {/*<Button onClick={delta}>パワーナップ開始{setting}</Button>*/}
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
      
      <Canvas>

      {/* 柔らかい赤の背景 */}
      <color attach="background" args={["#330000"]} />

      {/* 胎内の球 */}
      <mesh scale={6}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#ff7f6e"
          distort={0.35}
          speed={1.1}
          transparent
          opacity={0.55}
          side={THREE.BackSide}
        />
      </mesh>

      <ViewWithSound/>

      {/* 赤い拡散光 */}
      <ambientLight intensity={0.6} color="#ffb3a8" />
      <pointLight position={[0, 2, 2]} intensity={1.2} color="#ff9988" />

      {/* 胎内の霧 */}
      <fog attach="fog" args={["#ffddcc", 1, 10]} />

      <EffectComposer>
        <DepthOfField 
        focusDistance={0.01} //ピント位置の距離（0~1）
        focalLength={0.02}   //ボケの強さの基本量（0.01~0.1）
        bokehScale={5}       //ボケの大きさ
        />

        <Vignette 
        eskil={false}  //ビネットの種類
        offset={0.3}   //どれくらい内側から強くなるか
        darkness={0.8} //暗さの強さ
        />
      </EffectComposer>

      </Canvas>
      )}

    </>
  )
}

export default View