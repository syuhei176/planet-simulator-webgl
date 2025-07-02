"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Mesh } from "three"

export function Sun() {
  const sunRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (sunRef.current) {
      // 太陽の自転（約25日周期）
      sunRef.current.rotation.y += 0.001
    }
  })

  return (
    <mesh ref={sunRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial color="#FDB813" emissive="#FDB813" emissiveIntensity={1} roughness={0.4} />
    </mesh>
  )
}
