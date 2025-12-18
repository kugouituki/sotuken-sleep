import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import * as THREE from "three"

/**
 * @param {object} props
 * @param {number} props.duration フェード完了までの秒数
 * @param {object | null} props.audioRef 音源の ref
 * @param {object[]} props.lights ライトの ref 配列
 */
export default function Blackout({
  duration = 30,
  audioRef = null,
  lights = [],
}) {
  const startTime = useRef(null)
  

  useFrame(({ clock }) => {
    if (!startTime.current) startTime.current = clock.getElapsedTime()

    const elapsed = clock.getElapsedTime() - startTime.current
    const t = THREE.MathUtils.clamp(elapsed / duration, 0, 1)

    // ---- 光を暗くする ----
    lights.forEach((lightRef) => {
      if (lightRef?.current) {
        const init =
          lightRef.current.userData?.initialIntensity ?? 0

        lightRef.current.intensity =
          THREE.MathUtils.lerp(init, 0, t)
      }
    })

    // ---- 音を小さくする ----
    if (audioRef?.current) {
      audioRef.current.setVolume(
        THREE.MathUtils.lerp(1, 0, t)
      )
    }
  })

  // ---- 初期値保存（安全版）----
  useEffect(() => {
    lights.forEach((lightRef) => {
      if (lightRef?.current) {
        lightRef.current.userData ||= {}
        lightRef.current.userData.initialIntensity =
          lightRef.current.intensity
      }
    })
  }, [lights])

  return null
}