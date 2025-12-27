import { Canvas } from '@react-three/fiber'
import ViewWithSound from './ViewWithSound'
import Blackout from './Blackout'
import { Environment, Float, MeshDistortMaterial, OrbitControls } from '@react-three/drei'
import { DepthOfField, EffectComposer, Vignette,  } from '@react-three/postprocessing'
import { useState, useRef } from 'react'
import Button from "react-bootstrap/Button"
import * as THREE from "three";


function View() {
  // ページ番号（0 = スタート画面, 1 = 3D画面1, 2 = 3D画面2 ...）
  const [page, setPage] = useState(0)
  const soundRef = useRef()
  const ambientRef = useRef()
  const dirRef = useRef()


  
  /*const [setting, setsPage] = useState(0);
  

function delta(){
  setsPage(count + 1);
}*/

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
          
          <b className='title'>睡眠導入Webサイト</b>
          
        {/*<Button onClick={delta}>パワーナップ開始{setting}</Button>*/}
        <Button onClick={() => setPage(1)}>パワーナップ開始１</Button>
        <Button onClick={() => setPage(2)}>パワーナップ開始２</Button>
        <Button onClick={() => setPage(3)}>パワーナップ開始３</Button>
        </div>

      )}

      {page === 1 && (
        
          <Canvas shadows>
          <OrbitControls enableZoom={false} />

          {/* 背景（暗い暖色） */}
          <color attach="background" args={["#2a1a12"]} />

          {/* ベース照明（全体をほんのり） */}
          <ambientLight
            ref={ambientRef}
            intensity={0.6}
            color="#ffb199"   // 暖色
          />

          {/* 主光源（ろうそく的） */}
          <pointLight
            ref={dirRef}
            position={[0, 2, 1]}
            intensity={10}
            //distance={6}
            //decay={2}
            color="#ff8c5a"
          />

  {/* 浮遊オブジェクトなど */}
  <Float
    position={[0, 0.6, 0]}
    speed={0.6}
    floatIntensity={0.8}
    rotationIntensity={0.3}
  >
    {/* ここに表示物 */}
  </Float>

  <ViewWithSound audioRef={soundRef} />

  <Blackout
    duration={60}
    audioRef={soundRef}
    lights={[ambientRef, dirRef]}
  />

  <EffectComposer>
    <Vignette
      eskil={false}
      offset={0.35}
      darkness={0.3}
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

      <ViewWithSound audioRef={soundRef}/>

      {/* 赤い拡散光 */}
      <ambientLight ref={ambientRef} intensity={0.6} color="#ffb3a8" />
      <pointLight ref={dirRef} position={[0, 2, 2]} intensity={1.2} color="#ff9988" />

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

      <Blackout
        duration={60}                 // 60秒で暗転
        audioRef={soundRef}
        lights={[ambientRef, dirRef]} // refそのものを渡す
      />

      </Canvas>
      )}

      {page === 3 && (
      

        <Canvas shadows camera={{ position: [0, 2, 6], fov: 50 }}>
    
          {/* 背景色（白寄り暖色） */}
          <color attach="background" args={["#fff6ec"]} />

          {/* 光源 */}
          <ambientLight intensity={1.2} />
          <directionalLight
            position={[5, 10, 5]}
            intensity={2.5}
            color={"#fff2e0"}
            castShadow
          />
          
          <pointLight
            position={[-3, 5, 3]}
            intensity={1.8}
            color={"#fff0dd"}
          />
          
        </Canvas>


      )}  


    </>
  )
}

export default View