"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars, Html } from "@react-three/drei"
import { Suspense, useState, useRef } from "react"
import { SolarSystem } from "./components/solar-system"
import { UI } from "./components/ui"
import { Vector3 } from "three"

export default function Component() {
  const [timeSpeed, setTimeSpeed] = useState(1)
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null)
  const [cameraTarget, setCameraTarget] = useState<Vector3>(new Vector3(0, 0, 0))
  const controlsRef = useRef<any>()

  const focusOnPlanet = (planetName: string, position: Vector3) => {
    setSelectedPlanet(planetName)
    setCameraTarget(position)
    if (controlsRef.current) {
      controlsRef.current.target.copy(position)
      controlsRef.current.update()
    }
  }

  return (
    <div className="w-full h-screen bg-black relative">
      <Canvas
        camera={{
          position: [0, 50, 100],
          fov: 60,
          near: 0.1,
          far: 10000,
        }}
        gl={{ antialias: true }}
      >
        <Suspense
          fallback={
            <Html center>
              <div className="text-white text-xl">Loading Solar System...</div>
            </Html>
          }
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[0, 0, 0]} intensity={2} />

          <Stars radius={1000} depth={50} count={5000} factor={4} saturation={0} fade />

          <SolarSystem timeSpeed={timeSpeed} onPlanetClick={focusOnPlanet} selectedPlanet={selectedPlanet} />

          <OrbitControls
            ref={controlsRef}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            zoomSpeed={0.6}
            panSpeed={0.8}
            rotateSpeed={0.4}
            target={cameraTarget}
            minDistance={1}
            maxDistance={1000}
          />
        </Suspense>
      </Canvas>

      <UI
        timeSpeed={timeSpeed}
        setTimeSpeed={setTimeSpeed}
        selectedPlanet={selectedPlanet}
        onPlanetSelect={setSelectedPlanet}
      />
    </div>
  )
}
