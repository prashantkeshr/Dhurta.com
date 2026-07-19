import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Trail } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

const GOLD = "#c9a84c";
const TEAL = "#00d4aa";
const SAFFRON = "#ff4500";

/** Slowly rotating wireframe "chakra" — nested rings + icosahedron core. */
function Chakra() {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }) => {
    const t = clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.12;
      group.current.rotation.x =
        Math.sin(t * 0.2) * 0.15 + pointer.y * 0.18;
      group.current.rotation.z = pointer.x * 0.12;
    }
    if (core.current) {
      core.current.rotation.x = t * 0.35;
      core.current.rotation.y = -t * 0.28;
      const s = 1 + Math.sin(t * 1.4) * 0.045;
      core.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group}>
      {/* golden outer rings at three inclinations */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[(Math.PI / 3) * i, (Math.PI / 5) * i, 0]}>
          <torusGeometry args={[2.6 + i * 0.18, 0.012, 8, 128]} />
          <meshBasicMaterial
            color={i === 1 ? TEAL : GOLD}
            transparent
            opacity={0.55 - i * 0.1}
          />
        </mesh>
      ))}
      {/* wire core */}
      <mesh ref={core}>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshBasicMaterial color={GOLD} wireframe transparent opacity={0.5} />
      </mesh>
      {/* inner glow sphere */}
      <mesh>
        <sphereGeometry args={[0.85, 32, 32]} />
        <meshBasicMaterial color={SAFFRON} transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

/** Ring of orbiting particles, like a data halo. */
function Halo({ radius = 3.4, count = 900 }: { radius?: number; count?: number }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = radius + (Math.random() - 0.5) * 0.9;
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.35;
      arr[i * 3 + 2] = Math.sin(a) * r;
    }
    return arr;
  }, [radius, count]);

  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.y = clock.elapsedTime * 0.05;
      points.current.rotation.x = -0.35;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={TEAL}
        size={0.02}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </points>
  );
}

/** A comet with a golden trail orbiting the chakra — the "clever" spark. */
function Comet() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 0.55;
    if (mesh.current) {
      mesh.current.position.set(
        Math.cos(t) * 3.3,
        Math.sin(t * 1.7) * 0.7,
        Math.sin(t) * 3.3
      );
    }
  });
  return (
    <Trail width={1.4} length={7} color={GOLD} attenuation={(w) => w * w}>
      <mesh ref={mesh}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color="#ffe9b0" />
      </mesh>
    </Trail>
  );
}

/** Drifting angular shards — vector-glass debris in brand colors. */
function Shards() {
  const shards = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        pos: [
          (Math.random() - 0.5) * 11,
          (Math.random() - 0.5) * 6,
          -2 - Math.random() * 4,
        ] as [number, number, number],
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [
          number,
          number,
          number
        ],
        scale: 0.16 + Math.random() * 0.3,
        color: [GOLD, TEAL, SAFFRON][i % 3],
        speed: 0.6 + Math.random() * 1.6,
      })),
    []
  );

  return (
    <>
      {shards.map((s, i) => (
        <Float key={i} speed={s.speed} rotationIntensity={1.4} floatIntensity={1.8}>
          <mesh position={s.pos} rotation={s.rot} scale={s.scale}>
            <octahedronGeometry args={[1, 0]} />
            <meshBasicMaterial color={s.color} wireframe transparent opacity={0.35} />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function Rig() {
  useFrame(({ camera, pointer }) => {
    camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.04;
    camera.position.y += (pointer.y * 0.35 + 0.2 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene({ active = true }: { active?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0.2, 7.5], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Suspense fallback={null}>
        <Stars radius={60} depth={40} count={1800} factor={3} saturation={0} fade speed={0.6} />
        <Chakra />
        <Halo />
        <Comet />
        <Shards />
        <Rig />
      </Suspense>
    </Canvas>
  );
}
