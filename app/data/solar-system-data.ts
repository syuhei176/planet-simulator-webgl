// 実際の太陽系データに基づいた設定（スケール調整済み）
export const planetData = [
  {
    name: "水星",
    size: 0.4,
    color: "#8C7853",
    orbitRadius: 8,
    orbitSpeed: 0.02,
    rotationSpeed: 0.1,
    tilt: 0.034,
    moons: [],
  },
  {
    name: "金星",
    size: 0.9,
    color: "#FFC649",
    orbitRadius: 12,
    orbitSpeed: 0.015,
    rotationSpeed: -0.05, // 逆回転
    tilt: 3.1,
    moons: [],
  },
  {
    name: "地球",
    size: 1,
    color: "#6B93D6",
    orbitRadius: 16,
    orbitSpeed: 0.01,
    rotationSpeed: 1,
    tilt: 0.41,
    moons: [
      {
        name: "月",
        size: 0.27,
        color: "#C0C0C0",
        orbitRadius: 2.5,
        orbitSpeed: 0.1,
      },
    ],
  },
  {
    name: "火星",
    size: 0.5,
    color: "#CD5C5C",
    orbitRadius: 22,
    orbitSpeed: 0.008,
    rotationSpeed: 0.95,
    tilt: 0.44,
    moons: [
      {
        name: "フォボス",
        size: 0.1,
        color: "#8C7853",
        orbitRadius: 1.2,
        orbitSpeed: 0.3,
      },
      {
        name: "ダイモス",
        size: 0.08,
        color: "#8C7853",
        orbitRadius: 1.8,
        orbitSpeed: 0.15,
      },
    ],
  },
  {
    name: "木星",
    size: 3,
    color: "#D8CA9D",
    orbitRadius: 35,
    orbitSpeed: 0.004,
    rotationSpeed: 2.4,
    tilt: 0.055,
    moons: [
      {
        name: "イオ",
        size: 0.3,
        color: "#FFFF99",
        orbitRadius: 4,
        orbitSpeed: 0.2,
      },
      {
        name: "エウロパ",
        size: 0.25,
        color: "#87CEEB",
        orbitRadius: 5,
        orbitSpeed: 0.15,
      },
      {
        name: "ガニメデ",
        size: 0.4,
        color: "#A0A0A0",
        orbitRadius: 6.5,
        orbitSpeed: 0.1,
      },
      {
        name: "カリスト",
        size: 0.35,
        color: "#696969",
        orbitRadius: 8,
        orbitSpeed: 0.08,
      },
    ],
  },
  {
    name: "土星",
    size: 2.5,
    color: "#FAD5A5",
    orbitRadius: 50,
    orbitSpeed: 0.003,
    rotationSpeed: 2.2,
    tilt: 0.47,
    moons: [
      {
        name: "タイタン",
        size: 0.4,
        color: "#FFA500",
        orbitRadius: 6,
        orbitSpeed: 0.08,
      },
      {
        name: "エンケラドス",
        size: 0.15,
        color: "#FFFFFF",
        orbitRadius: 4,
        orbitSpeed: 0.12,
      },
    ],
  },
  {
    name: "天王星",
    size: 1.8,
    color: "#4FD0E7",
    orbitRadius: 70,
    orbitSpeed: 0.002,
    rotationSpeed: 1.4,
    tilt: 1.71, // 横倒し
    moons: [
      {
        name: "ミランダ",
        size: 0.12,
        color: "#C0C0C0",
        orbitRadius: 3,
        orbitSpeed: 0.15,
      },
    ],
  },
  {
    name: "海王星",
    size: 1.7,
    color: "#4169E1",
    orbitRadius: 85,
    orbitSpeed: 0.0015,
    rotationSpeed: 1.5,
    tilt: 0.49,
    moons: [
      {
        name: "トリトン",
        size: 0.2,
        color: "#B0C4DE",
        orbitRadius: 4,
        orbitSpeed: -0.1, // 逆行軌道
      },
    ],
  },
]

export const cometData = [
  {
    name: "ハレー彗星",
    size: 0.1,
    orbitRadius: 60,
    orbitSpeed: 0.001,
    eccentricity: 0.97,
  },
  {
    name: "エンケ彗星",
    size: 0.08,
    orbitRadius: 25,
    orbitSpeed: 0.005,
    eccentricity: 0.85,
  },
]
