import React, { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'

export default function HyperComplexBackground({ isDarkMode }) {
  const groupRef = useRef()
  const innerGroupRef = useRef()

  const shapesArray = useMemo(() => {
    return [...Array(75)].map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 130,
        (Math.random() - 0.5) * 26 - 6
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      scale: Math.random() * 0.85 + 0.2,
      speed: Math.random() * 2.8 + 0.5,
      type: i % 22,
    }))
  }, [])

  const dotsCount = 1500
  const dotPositions = useMemo(() => {
    const pos = new Float32Array(dotsCount * 3)
    for (let i = 0; i < dotsCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40
      pos[i * 3 + 1] = (Math.random() - 0.5) * 130
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5
    }
    return pos
  }, [])

  useFrame((state) => {
    const scrollY = window.scrollY || window.pageYOffset
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 5 - (scrollY * 0.005), 0.1)
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 8 + (scrollY * 0.002), 0.1)

    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.025 + (state.pointer.x * 0.1)
      groupRef.current.rotation.x = state.pointer.y * 0.06
    }
    if (innerGroupRef.current) {
      innerGroupRef.current.rotation.z = state.clock.getElapsedTime() * -0.015
    }
  })

  return (
    <group ref={groupRef}>
      <group ref={innerGroupRef}>
        {shapesArray.map((item, i) => (
          <Float key={`shape-${i}`} speed={item.speed} rotationIntensity={3.0} floatIntensity={4.0}>
            <group position={item.position} rotation={item.rotation} scale={item.scale}>
              {item.type === 0 && <mesh><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color="#38bdf8" wireframe transparent opacity={isDarkMode ? 0.55 : 0.25} /></mesh>}
              {item.type === 1 && <mesh><icosahedronGeometry args={[0.8, 0]} /><meshStandardMaterial color="#ef4444" wireframe transparent opacity={isDarkMode ? 0.55 : 0.25} /></mesh>}
              {item.type === 2 && <mesh><torusKnotGeometry args={[0.5, 0.15, 64, 16]} /><meshStandardMaterial color="#818cf8" wireframe transparent opacity={isDarkMode ? 0.55 : 0.25} /></mesh>}
              {item.type === 3 && <mesh><octahedronGeometry args={[0.8, 0]} /><meshStandardMaterial color="#38bdf8" wireframe transparent opacity={isDarkMode ? 0.55 : 0.25} /></mesh>}
              {item.type === 4 && <mesh><dodecahedronGeometry args={[0.7, 0]} /><meshStandardMaterial color="#ef4444" wireframe transparent opacity={isDarkMode ? 0.55 : 0.25} /></mesh>}

              {/* Cyber Human */}
              {item.type === 5 && (
                <group scale={0.65}>
                  <mesh position={[0, 1.3, 0]}><icosahedronGeometry args={[0.28, 0]} /><meshStandardMaterial color="#38bdf8" wireframe transparent opacity={0.75} /></mesh>
                  <mesh position={[0, 0.4, 0]}><cylinderGeometry args={[0.22, 0.14, 0.9, 6]} /><meshStandardMaterial color="#ef4444" wireframe transparent opacity={0.75} /></mesh>
                  <mesh position={[-0.32, 0.5, 0]} rotation={[0, 0, 0.2]}><cylinderGeometry args={[0.07, 0.07, 0.75, 4]} /><meshStandardMaterial color="#38bdf8" wireframe transparent opacity={0.75} /></mesh>
                  <mesh position={[0.32, 0.5, 0]} rotation={[0, 0, -0.2]}><cylinderGeometry args={[0.07, 0.07, 0.75, 4]} /><meshStandardMaterial color="#38bdf8" wireframe transparent opacity={0.75} /></mesh>
                  <mesh position={[-0.15, -0.4, 0]}><cylinderGeometry args={[0.08, 0.07, 0.85, 4]} /><meshStandardMaterial color="#818cf8" wireframe transparent opacity={0.75} /></mesh>
                  <mesh position={[0.15, -0.4, 0]}><cylinderGeometry args={[0.08, 0.07, 0.85, 4]} /><meshStandardMaterial color="#818cf8" wireframe transparent opacity={0.75} /></mesh>
                </group>
              )}

              {/* Cyber Dog */}
              {item.type === 6 && (
                <group scale={0.55} rotation={[0, Math.PI / 4, 0]}>
                  <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.22, 0.22, 0.9, 6]} /><meshStandardMaterial color="#ef4444" wireframe transparent opacity={0.75} /></mesh>
                  <mesh position={[0, 0.35, 0.55]}><octahedronGeometry args={[0.22, 0]} /><meshStandardMaterial color="#38bdf8" wireframe transparent opacity={0.75} /></mesh>
                  <mesh position={[-0.15, 0.6, 0.45]}><coneGeometry args={[0.08, 0.2, 4]} /><meshStandardMaterial color="#38bdf8" wireframe transparent opacity={0.75} /></mesh>
                  <mesh position={[0.15, 0.6, 0.45]}><coneGeometry args={[0.08, 0.2, 4]} /><meshStandardMaterial color="#38bdf8" wireframe transparent opacity={0.75} /></mesh>
                  <mesh position={[0, 0.3, -0.5]} rotation={[-0.5, 0, 0]}><cylinderGeometry args={[0.04, 0.04, 0.5, 4]} /><meshStandardMaterial color="#ef4444" wireframe transparent opacity={0.75} /></mesh>
                  <mesh position={[-0.25, -0.45, 0.35]}><cylinderGeometry args={[0.05, 0.05, 0.65, 4]} /><meshStandardMaterial color="#818cf8" wireframe transparent opacity={0.75} /></mesh>
                  <mesh position={[0.25, -0.45, 0.35]}><cylinderGeometry args={[0.05, 0.05, 0.65, 4]} /><meshStandardMaterial color="#818cf8" wireframe transparent opacity={0.75} /></mesh>
                  <mesh position={[-0.25, -0.45, -0.35]}><cylinderGeometry args={[0.05, 0.05, 0.65, 4]} /><meshStandardMaterial color="#818cf8" wireframe transparent opacity={0.75} /></mesh>
                  <mesh position={[0.25, -0.45, -0.35]}><cylinderGeometry args={[0.05, 0.05, 0.65, 4]} /><meshStandardMaterial color="#818cf8" wireframe transparent opacity={0.75} /></mesh>
                </group>
              )}

              {/* Cyber Cat */}
              {item.type === 7 && (
                <group scale={0.5} rotation={[0, -Math.PI / 6, 0]}>
                  <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.18, 0.18, 0.8, 6]} /><meshStandardMaterial color="#38bdf8" wireframe transparent opacity={0.75} /></mesh>
                  <mesh position={[0, 0.3, 0.45]}><icosahedronGeometry args={[0.2, 0]} /><meshStandardMaterial color="#ef4444" wireframe transparent opacity={0.75} /></mesh>
                  <mesh position={[-0.12, 0.55, 0.4]} rotation={[0, 0, -0.2]}><coneGeometry args={[0.07, 0.22, 3]} /><meshStandardMaterial color="#ef4444" wireframe transparent opacity={0.75} /></mesh>
                  <mesh position={[0.12, 0.55, 0.4]} rotation={[0, 0, 0.2]}><coneGeometry args={[0.07, 0.22, 3]} /><meshStandardMaterial color="#ef4444" wireframe transparent opacity={0.75} /></mesh>
                  <mesh position={[0, 0.4, -0.5]} rotation={[0.8, 0, 0]}><cylinderGeometry args={[0.03, 0.03, 0.6, 4]} /><meshStandardMaterial color="#38bdf8" wireframe transparent opacity={0.75} /></mesh>
                </group>
              )}

              {/* Cyber Bird */}
              {item.type === 8 && (
                <group scale={0.55}>
                  <mesh rotation={[Math.PI / 2, 0, 0]}><coneGeometry args={[0.15, 0.6, 4]} /><meshStandardMaterial color="#ef4444" wireframe transparent opacity={0.75} /></mesh>
                  <mesh position={[-0.6, 0.1, 0]} rotation={[0, 0, -0.4]}><boxGeometry args={[1.0, 0.05, 0.3]} /><meshStandardMaterial color="#38bdf8" wireframe transparent opacity={0.75} /></mesh>
                  <mesh position={[0.6, 0.1, 0]} rotation={[0, 0, 0.4]}><boxGeometry args={[1.0, 0.05, 0.3]} /><meshStandardMaterial color="#38bdf8" wireframe transparent opacity={0.75} /></mesh>
                </group>
              )}

              {item.type === 9 && <mesh><tetrahedronGeometry args={[0.8, 0]} /><meshStandardMaterial color="#818cf8" wireframe transparent opacity={0.5} /></mesh>}
              {item.type === 10 && <mesh><coneGeometry args={[0.6, 1.2, 16]} /><meshStandardMaterial color="#38bdf8" wireframe transparent opacity={0.5} /></mesh>}
              {item.type === 11 && <mesh><cylinderGeometry args={[0.4, 0.4, 1.2, 16]} /><meshStandardMaterial color="#ef4444" wireframe transparent opacity={0.5} /></mesh>}
              {item.type === 12 && <mesh><ringGeometry args={[0.4, 0.7, 32]} /><meshStandardMaterial color="#818cf8" wireframe transparent opacity={0.5} /></mesh>}
              {item.type === 13 && <mesh><dodecahedronGeometry args={[0.5, 1]} /><meshStandardMaterial color="#38bdf8" wireframe transparent opacity={0.5} /></mesh>}
              {item.type === 14 && <mesh><torusKnotGeometry args={[0.4, 0.1, 48, 12, 3, 4]} /><meshStandardMaterial color="#ef4444" wireframe transparent opacity={0.5} /></mesh>}

              <mesh scale={0.2}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshBasicMaterial color={i % 2 === 0 ? '#38bdf8' : '#ef4444'} transparent opacity={isDarkMode ? 0.8 : 0.4} />
              </mesh>
            </group>
          </Float>
        ))}
      </group>

      {[...Array(4)].map((_, i) => (
        <points key={`stars-${i}`}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={dotsCount} array={dotPositions} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial size={0.055} color={isDarkMode ? '#38bdf8' : '#0284c7'} transparent opacity={isDarkMode ? 0.75 : 0.4} blending={THREE.AdditiveBlending} />
        </points>
      ))}
    </group>
  )
}