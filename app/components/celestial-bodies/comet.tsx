"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group, Mesh } from "three"

interface CometProps {
  name: string
  size: number
  orbitRadius: number
  orbitSpeed: number
  eccentricity: number
  timeSpeed: number
}

export function Comet({ size, orbitRadius, orbitSpeed, eccentricity, timeSpeed }: CometProps) {
  const cometRef = useRef<Group>(null)
  const coreRef = useRef<Mesh>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * timeSpeed

    if (cometRef.current) {
      // 楕円軌道
      const angle = time * orbitSpeed
      const r = (orbitRadius * (1 - eccentricity * eccentricity)) / (1 + eccentricity * Math.cos(angle))
      cometRef.current.position.x = Math.cos(angle) * r
      cometRef.current.position.z = Math.sin(angle) * r
    }

    if (coreRef.current) {
      coreRef.current.rotation.y += 0.02 * timeSpeed
    }
  })

  return (
    <group ref={cometRef}>
      <mesh ref={coreRef}>
        <sphereGeometry args={[size, 8, 8]} />
        <meshStandardMaterial color="#CCCCCC" emissiveIntensity={0.1} roughness={0.9} metalness={0.2} />
      </mesh>
      {/* 彗星の尾（簡略化） */}
      <mesh position={[-size * 2, 0, 0]}>
        <coneGeometry args={[size * 0.5, size * 4, 8]} />
        <meshStandardMaterial color="#FFFFFF" transparent opacity={0.4} emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}
