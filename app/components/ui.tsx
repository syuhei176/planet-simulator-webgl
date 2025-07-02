"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import { planetData } from "../data/solar-system-data"
import { X, Menu } from "lucide-react"

interface UIProps {
  timeSpeed: number
  setTimeSpeed: (speed: number) => void
  selectedPlanet: string | null
  onPlanetSelect: (planet: string | null) => void
}

export function UI({ timeSpeed, setTimeSpeed, selectedPlanet, onPlanetSelect }: UIProps) {
  const [isUIOpen, setIsUIOpen] = useState(true)
  const selectedPlanetData = planetData.find((p) => p.name === selectedPlanet)

  return (
    <div className="absolute top-4 left-4 z-10 space-y-4">
      {/* トグルボタン */}
      <Button
        onClick={() => setIsUIOpen(!isUIOpen)}
        className="bg-black/80 border-gray-600 text-white hover:bg-gray-800"
        size="sm"
      >
        {isUIOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* UI パネル */}
      {isUIOpen && (
        <>
          <Card className="w-80 bg-black/80 border-gray-600">
            <CardHeader>
              <CardTitle className="text-lg text-white">太陽系シミュレーター</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">時間速度: {timeSpeed}x</label>
                <Slider
                  value={[timeSpeed]}
                  onValueChange={(value) => setTimeSpeed(value[0])}
                  max={100}
                  min={0.1}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-2 block">惑星選択</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={selectedPlanet === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => onPlanetSelect(null)}
                    className="text-xs"
                  >
                    全体表示
                  </Button>
                  {planetData.slice(0, 7).map((planet) => (
                    <Button
                      key={planet.name}
                      variant={selectedPlanet === planet.name ? "default" : "outline"}
                      size="sm"
                      onClick={() => onPlanetSelect(planet.name)}
                      className="text-xs"
                    >
                      {planet.name}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {selectedPlanetData && (
            <Card className="w-80 bg-black/80 text-white border-gray-600">
              <CardHeader>
                <CardTitle className="text-lg">{selectedPlanetData.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>直径: {selectedPlanetData.size * 2} (相対値)</div>
                <div>軌道半径: {selectedPlanetData.orbitRadius} AU</div>
                <div>公転周期: {((2 * Math.PI) / selectedPlanetData.orbitSpeed / 365).toFixed(1)} 年</div>
                <div>衛星数: {selectedPlanetData.moons?.length || 0}</div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
