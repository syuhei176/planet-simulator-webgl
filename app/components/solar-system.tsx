"use client"

import { useFrame } from "@react-three/fiber"
import { useRef, useEffect } from "react"
import type { Group } from "three"
import { Sun } from "./celestial-bodies/sun"
import { Planet } from "./celestial-bodies/planet"
import { Comet } from "./celestial-bodies/comet"
import { planetData, cometData } from "../data/solar-system-data"
import { Vector3 } from "three"

interface SolarSystemProps {
  timeSpeed: number
  onPlanetClick: (name: string, position: Vector3) => void
  selectedPlanet: string | null
}

export function SolarSystem({ timeSpeed, onPlanetClick, selectedPlanet }: SolarSystemProps) {
  const systemRef = useRef<Group>(null)

  useEffect(() => {
    if (selectedPlanet && systemRef.current) {
      // 選択された惑星の位置を計算してカメラターゲットを更新
      const planet = planetData.find((p) => p.name === selectedPlanet)
      if (planet) {
        const time = Date.now() * 0.001 * timeSpeed
        const angle = time * planet.orbitSpeed
        const position = new Vector3(Math.cos(angle) * planet.orbitRadius, 0, Math.sin(angle) * planet.orbitRadius)
        onPlanetClick(selectedPlanet, position)
      }
    }
  }, [selectedPlanet, timeSpeed, onPlanetClick])

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * timeSpeed

    // Update system rotation for better visualization
    if (systemRef.current) {
      systemRef.current.rotation.y = time * 0.001
    }
  })

  return (
    <group ref={systemRef}>
      <Sun />

      {planetData.map((planet) => (
        <Planet
          key={planet.name}
          {...planet}
          timeSpeed={timeSpeed}
          onPlanetClick={onPlanetClick}
          isSelected={selectedPlanet === planet.name}
        />
      ))}

      {cometData.map((comet, index) => (
        <Comet key={`comet-${index}`} {...comet} timeSpeed={timeSpeed} />
      ))}
    </group>
  )
}
