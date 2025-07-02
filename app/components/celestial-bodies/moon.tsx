"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group, Mesh } from "three"

interface MoonProps {
  name: string
  size: number
  color: string
  orbitRadius: number
  orbitSpeed: number
  timeSpeed: number
}

export function Moon({ size, color, orbitRadius, orbitSpeed, timeSpeed }: MoonProps) {
  const moonGroupRef = useRef<Group>(null)
  const moonRef = useRef<Mesh>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * timeSpeed

    if (moonGroupRef.current) {
      // 公転
      const angle = time * orbitSpeed
      moonGroupRef.current.position.x = Math.cos(angle) * orbitRadius
      moonGroupRef.current.position.z = Math.sin(angle) * orbitRadius
    }

    if (moonRef.current) {
      // 自転（潮汐固定を考慮）
      moonRef.current.rotation.y = time * orbitSpeed
    }
  })

  return (
    <group ref={moonGroupRef}>
      <mesh ref={moonRef}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial color={color} emissiveIntensity={0.05} roughness={0.8} metalness={0.1} />
      </mesh>
    </group>
  )
}
