"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { type Group, type Mesh, Vector3 } from "three"
import { Moon } from "./moon"

interface PlanetProps {
  name: string
  size: number
  color: string
  orbitRadius: number
  orbitSpeed: number
  rotationSpeed: number
  tilt: number
  moons?: Array<{
    name: string
    size: number
    color: string
    orbitRadius: number
    orbitSpeed: number
  }>
  timeSpeed: number
  onPlanetClick: (name: string, position: Vector3) => void
  isSelected: boolean
}

export function Planet({
  name,
  size,
  color,
  orbitRadius,
  orbitSpeed,
  rotationSpeed,
  tilt,
  moons = [],
  timeSpeed,
  onPlanetClick,
  isSelected,
}: PlanetProps) {
  const planetGroupRef = useRef<Group>(null)
  const planetRef = useRef<Mesh>(null)
  const orbitRef = useRef<Group>(null)

  const orbitPoints = useMemo(() => {
    const points = []
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2
      points.push(Math.cos(angle) * orbitRadius, 0, Math.sin(angle) * orbitRadius)
    }
    return new Float32Array(points)
  }, [orbitRadius])

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * timeSpeed

    if (orbitRef.current) {
      // 公転
      const angle = time * orbitSpeed
      const newX = Math.cos(angle) * orbitRadius
      const newZ = Math.sin(angle) * orbitRadius
      orbitRef.current.position.x = newX
      orbitRef.current.position.z = newZ

      // 選択された惑星の場合、カメラターゲットを更新
      if (isSelected) {
        const position = new Vector3(newX, 0, newZ)
        onPlanetClick(name, position)
      }
    }

    if (planetRef.current) {
      // 自転
      planetRef.current.rotation.y += rotationSpeed * timeSpeed * 0.01
      // 軸の傾き
      planetRef.current.rotation.z = tilt
    }
  })

  const handleClick = () => {
    if (orbitRef.current) {
      const position = new Vector3()
      orbitRef.current.getWorldPosition(position)
      onPlanetClick(name, position)
    }
  }

  return (
    <group ref={planetGroupRef}>
      {/* 軌道線 */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={orbitPoints}
            count={orbitPoints.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#444444" opacity={0.3} transparent />
      </line>

      {/* 惑星 */}
      <group ref={orbitRef}>
        <mesh ref={planetRef} onClick={handleClick} scale={isSelected ? 1.2 : 1}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={isSelected ? color : "#000000"}
            emissiveIntensity={isSelected ? 0.3 : 0.1}
            roughness={0.6}
            metalness={0.1}
          />
        </mesh>

        {/* 衛星 */}
        {moons.map((moon, index) => (
          <Moon key={`${name}-${moon.name}-${index}`} {...moon} timeSpeed={timeSpeed} />
        ))}
      </group>
    </group>
  )
}
