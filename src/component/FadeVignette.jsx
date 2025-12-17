import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Vignette } from "@react-three/postprocessing";

export function FadeVignette() {
  const ref = useRef();

  useFrame((_, delta) => {
    if (!ref.current) return;

    // 徐々に dark へ近づける
    ref.current.darkness = Math.min(
      1,
      ref.current.darkness + delta * 0.1 // ← 暗くなる速度
    );
  });

  return (
    <Vignette
      ref={ref}
      eskil={false}
      offset={0.3}
      darkness={0.0}  // 最初は明るい
    />
  );
}