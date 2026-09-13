import React, { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'

// Curated premium shapes — fewer, larger, more elegant
const SHAPE_TYPES = [
  'icosahedron',
  'dodecahedron',
  'torusKnot',
  'octahedron',
]

// Subtle cool palette for the ambient background (no gold)
const AURORA_COLORS = [
  '#2dd4bf', // teal
  '#8b5cf6', // violet
  '#38bdf8', // sky
  '#2dd4bf', // teal (repeat)
]

export default function HyperComplexBackground({ isDarkMode }) {
  const groupRef = useRef()
  const innerGroupRef = useRef()

  // Expanded to 36 small curated shapes
  const shapesArray = useMemo(() => {
    return [...Array(36)].map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 20 - 5
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      scale: Math.random() * 0.3 + 0.1,
      speed: Math.random() * 0.12 + 0.03,
      type: i % SHAPE_TYPES.length,
      color: AURORA_COLORS[i % AURORA_COLORS.length],
    }))
  }, [])

  const dotsCount = 1800
  const dotPositions = useMemo(() => {
    const pos = new Float32Array(dotsCount * 3)
    for (let i = 0; i < dotsCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5
    }
    return pos
  }, [])

  useFrame((state) => {
    const scrollY = window.scrollY || window.pageYOffset
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 5 - (scrollY * 0.002), 0.03)
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 10 + (scrollY * 0.001), 0.03)

    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.004 + (state.pointer.x * 0.012)
      groupRef.current.rotation.x = state.pointer.y * 0.006
    }
  })

  return (
    <group ref={groupRef}>
      {/* Small ambient depth plane */}
      <mesh position={[0, 0, -14]}>
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial
          color={isDarkMode ? '#0b1224' : '#f0f4f8'}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* 36 small curated shapes */}
      <group ref={innerGroupRef}>
        {shapesArray.map((item, i) => (
          <Float key={`shape-${i}`} speed={item.speed} rotationIntensity={0.2} floatIntensity={0.8}>
            <group position={item.position} rotation={item.rotation} scale={item.scale}>
              {/* Wireframe geometric shape */}
              {item.type === 0 && (
                <mesh>
                  <icosahedronGeometry args={[0.9, 0]} />
                  <meshStandardMaterial
                    color={item.color}
                    wireframe
                    transparent
                    opacity={isDarkMode ? 0.5 : 0.25}
                  />
                </mesh>
              )}
              {item.type === 1 && (
                <mesh>
                  <dodecahedronGeometry args={[0.8, 0]} />
                  <meshStandardMaterial
                    color={item.color}
                    wireframe
                    transparent
                    opacity={isDarkMode ? 0.5 : 0.25}
                  />
                </mesh>
              )}
              {item.type === 2 && (
                <mesh>
                  <torusKnotGeometry args={[0.5, 0.12, 64, 16]} />
                  <meshStandardMaterial
                    color={item.color}
                    wireframe
                    transparent
                    opacity={isDarkMode ? 0.45 : 0.2}
                  />
                </mesh>
              )}
              {item.type === 3 && (
                <mesh>
                  <octahedronGeometry args={[0.85, 0]} />
                  <meshStandardMaterial
                    color={item.color}
                    wireframe
                    transparent
                    opacity={isDarkMode ? 0.5 : 0.25}
                  />
                </mesh>
              )}

              {/* Subtle glow sphere at center */}
              <mesh scale={0.15}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshBasicMaterial
                  color={item.color}
                  transparent
                  opacity={isDarkMode ? 0.7 : 0.35}
                />
              </mesh>
            </group>
          </Float>
        ))}
      </group>

      {/* Particle star field */}
      {[...Array(3)].map((_, i) => (
        <points key={`stars-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={dotsCount}
              array={dotPositions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.04 + i * 0.01}
            color={AURORA_COLORS[i % AURORA_COLORS.length]}
            transparent
            opacity={isDarkMode ? 0.5 - i * 0.1 : 0.25 - i * 0.05}
            blending={THREE.AdditiveBlending}
          />
        </points>
      ))}
    </group>
  )
}
