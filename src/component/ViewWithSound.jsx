import { useRef } from "react";
import { PositionalAudio } from '@react-three/drei'

export default function ViewWithSound() {
  const soundRef = [useRef(), useRef(), useRef()];
  
  const positions = [
    [100, 1, 0],
    [0, 1, 0],
    [-100, 1, 0],
  ];

  const sounds = [
    "public/sounds/soundo1.mp3",
    "public/sounds/soundo1.mp3",
    "public/sounds/soundo1.mp3",
  ];

  return (
    <>
    {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial color="blue" />

          <PositionalAudio
            ref={soundRef[i]}
            url={sounds[i]}
            distance={5}
            loop
            autoplay
          />
        </mesh>
      ))}
    </>
  );
}