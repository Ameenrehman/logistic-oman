"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Truck, Warehouse, CheckCircle2, ChevronDown, Award } from "lucide-react";

// 3D Stylized Bottle Component
function StylizedBottle({ progress }: { progress: number }) {
  const bottleRef = useRef<THREE.Group>(null);
  const liquidRef = useRef<THREE.Mesh>(null);
  const bubblesRef = useRef<THREE.Points>(null);

  // Define position/rotation keyframes based on progress (0 to 1)
  useFrame((state) => {
    if (!bottleRef.current) return;

    // Linear interpolation helper
    const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end;

    // Phase checkpoints
    // 0.0 - Production Facility
    // 0.2 - Warehouse
    // 0.4 - Fleet Loading
    // 0.6 - Highway Transit
    // 0.8 - Retail Fridge
    // 1.0 - Consumer Table

    let targetX = 0;
    let targetY = -0.5;
    let targetZ = 0;
    let targetRotX = 0.1;
    let targetRotY = state.clock.getElapsedTime() * 0.2; // slow constant rotation
    let targetRotZ = 0;
    let targetScale = 1.0;

    if (progress < 0.2) {
      // Production Facility: Center, standing tall, close-up
      const t = progress / 0.2;
      targetX = lerp(0, -1.2, t);
      targetY = lerp(-0.5, -0.6, t);
      targetZ = lerp(1, 0, t);
      targetRotX = lerp(0.1, 0.2, t);
      targetRotY = lerp(0, Math.PI * 0.5, t);
      targetScale = lerp(1.2, 1.0, t);
    } else if (progress < 0.4) {
      // Warehouse: Left side, tilted, surrounded by racks
      const t = (progress - 0.2) / 0.2;
      targetX = lerp(-1.2, 1.2, t);
      targetY = lerp(-0.6, -0.2, t);
      targetZ = lerp(0, -0.5, t);
      targetRotX = lerp(0.2, -0.3, t);
      targetRotY = lerp(Math.PI * 0.5, Math.PI * 1.2, t);
      targetScale = lerp(1.0, 0.9, t);
    } else if (progress < 0.6) {
      // Fleet Loading: Right side, moving into container
      const t = (progress - 0.4) / 0.2;
      targetX = lerp(1.2, 0, t);
      targetY = lerp(-0.2, -0.8, t);
      targetZ = lerp(-0.5, 0, t);
      targetRotX = lerp(-0.3, 0.5, t);
      targetRotY = lerp(Math.PI * 1.2, Math.PI * 2.0, t);
      targetScale = lerp(0.9, 0.85, t);
    } else if (progress < 0.8) {
      // Highway Transit: Center, tilted back, moving fast
      const t = (progress - 0.6) / 0.2;
      targetX = lerp(0, -1.0, t);
      targetY = lerp(-0.8, -0.4, t);
      targetZ = lerp(0, 0.5, t);
      targetRotX = lerp(0.5, 0.1, t);
      targetRotY = lerp(Math.PI * 2.0, Math.PI * 2.8, t);
      targetScale = lerp(0.85, 1.1, t);
    } else {
      // Retail & Consumer Table: Standing straight, floating, glowing, cap pops off effect
      const t = (progress - 0.8) / 0.2;
      targetX = lerp(-1.0, 0, t);
      targetY = lerp(-0.4, -0.3, t);
      targetZ = lerp(0.5, 1.2, t);
      targetRotX = lerp(0.1, 0, t);
      targetRotY = lerp(Math.PI * 2.8, Math.PI * 4.0, t);
      targetScale = lerp(1.1, 1.3, t);
    }

    // Apply lerped values
    bottleRef.current.position.x = lerp(bottleRef.current.position.x, targetX, 0.1);
    bottleRef.current.position.y = lerp(bottleRef.current.position.y, targetY, 0.1);
    bottleRef.current.position.z = lerp(bottleRef.current.position.z, targetZ, 0.1);

    bottleRef.current.rotation.x = lerp(bottleRef.current.rotation.x, targetRotX, 0.1);
    bottleRef.current.rotation.y = lerp(bottleRef.current.rotation.y, targetRotY, 0.1);
    bottleRef.current.rotation.z = lerp(bottleRef.current.rotation.z, targetRotZ, 0.1);

    bottleRef.current.scale.setScalar(lerp(bottleRef.current.scale.x, targetScale, 0.1));

    // Animate liquid inside (slight wave movement)
    if (liquidRef.current) {
      liquidRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 3) * 0.02 - 0.3;
    }

    // Animate bubbles upwards
    if (bubblesRef.current) {
      const positions = bubblesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += 0.01; // Rise up
        if (positions[i] > 1.0) {
          positions[i] = -0.8; // reset to bottom
        }
      }
      bubblesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // Setup bubble coordinates
  const bubbleCount = 40;
  const bubblePositions = new Float32Array(bubbleCount * 3);
  for (let i = 0; i < bubbleCount * 3; i += 3) {
    bubblePositions[i] = (Math.random() - 0.5) * 0.4; // width
    bubblePositions[i + 1] = Math.random() * 1.8 - 0.9; // height
    bubblePositions[i + 2] = (Math.random() - 0.5) * 0.4; // depth
  }

  return (
    <group ref={bottleRef}>
      {/* 1. Bottle Glass Shell */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.25, 0.35, 1.8, 32]} />
        <meshPhysicalMaterial
          color="#E31B23"
          roughness={0.05}
          transmission={0.9}
          thickness={0.2}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          ior={1.5}
        />
      </mesh>

      {/* 2. Bottle Neck & Cap */}
      <mesh position={[0, 1.0, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.18, 0.4, 32]} />
        <meshPhysicalMaterial color="#E31B23" roughness={0.05} transmission={0.9} thickness={0.1} />
      </mesh>
      
      <mesh position={[0, 1.25, 0]} castShadow>
        <cylinderGeometry args={[0.17, 0.17, 0.1, 32]} />
        <meshStandardMaterial color="#E5A93C" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* 3. Liquid inside */}
      <mesh ref={liquidRef} position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.23, 0.32, 1.2, 32]} />
        <meshPhysicalMaterial
          color="#9A0F14"
          roughness={0.1}
          transmission={0.4}
          thickness={0.5}
          clearcoat={0.5}
        />
      </mesh>

      {/* 4. Interactive Condensation Drops / Bubbles inside */}
      <points ref={bubblesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[bubblePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#FFFFFF"
          size={0.03}
          transparent
          opacity={0.7}
        />
      </points>
    </group>
  );
}

// Checkpoint descriptive content data
const CHECKPOINTS = [
  {
    title: "1. Automated Production line",
    subtitle: "Al Rusayl Bottling Facility",
    desc: "Every beverage bottle is filled, vacuum-sealed, and cataloged under sterile pharmaceutical safety standards inside our primary Muscat complex.",
    stat: "4,500 Bottles / Min",
    icon: Award,
  },
  {
    title: "2. Temperature-Controlled Vault",
    subtitle: "Cold Storage Warehousing",
    desc: "Bottles are sorted onto heavy steel racks where double cooling compressors stabilize ambient temperatures at a constant +2.0°C.",
    stat: "15,000+ Pallet Slots",
    icon: Warehouse,
  },
  {
    title: "3. Fleet Loading Clearance",
    subtitle: "Sanitization & Weight Audit",
    desc: "Pallets are inspected and loaded into refrigerated trucks with geofenced cargo locks. Technicians check the thermal seal before transit starts.",
    stat: "500+ Active Vehicles",
    icon: Truck,
  },
  {
    title: "4. Expressway Long-Haul Transit",
    subtitle: "Oman Highway Route Network",
    desc: "Traversing the Samail Gap and coastal roads, our trucks cross 45°C ambient deserts while cargo remains locked at stable cold-chain thresholds.",
    stat: "1,100 km Max Route",
    icon: Truck,
  },
  {
    title: "5. Retail Refrigerator Intake",
    subtitle: "Last-Mile Hub Delivery",
    desc: "Intake bays scan WMS tags at hypermarkets and wholesale chains. Products are cross-docked and stored directly in refrigerated sales racks.",
    stat: "350+ Scheduled Stops",
    icon: Warehouse,
  },
  {
    title: "6. Cold Refreshment Destination",
    subtitle: "The Consumer Experience",
    desc: "The logistics journey finishes. A perfectly chilled beverage is opened by the consumer, guaranteeing the exact brand flavor and carbonation.",
    stat: "100% Quality Guaranteed",
    icon: ShieldCheck,
  },
];

export default function StorytellingIsland() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeStage, setActiveStage] = useState(0);

  // Monitor the scroll progress of this container section
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how far the section has scrolled relative to the screen
      const totalScrollableHeight = rect.height - viewportHeight;
      const scrolledPast = -rect.top;
      
      let currentProgress = scrolledPast / totalScrollableHeight;
      currentProgress = Math.max(0, Math.min(1, currentProgress));
      
      setProgress(currentProgress);

      // Determine active checkpoint stage
      const stage = Math.min(5, Math.floor(currentProgress * 6));
      setActiveStage(stage);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeCheckpoint = CHECKPOINTS[activeStage];
  const Icon = activeCheckpoint.icon;

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-obsidian">
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center justify-between overflow-hidden">
        
        {/* WebGL Canvas viewport */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative z-10 bg-chamber/10">
          <Canvas camera={{ position: [0, 0, 3], fov: 45 }} shadows>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
            <spotLight
              position={[-5, 5, 5]}
              angle={0.25}
              penumbra={1}
              intensity={2}
              castShadow
            />
            {/* Soft ground lighting for warehouse/highway theme */}
            <gridHelper args={[10, 20, "#30363D", "#161B22"]} position={[0, -1, 0]} />
            
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
              <StylizedBottle progress={progress} />
            </Float>
            <Environment preset="city" />
          </Canvas>
        </div>

        {/* Narrative Description Overlay Panel (Right Side) */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen flex items-center justify-center p-6 md:p-16 z-20 bg-gradient-to-t md:bg-gradient-to-r from-obsidian via-obsidian/95 to-obsidian">
          <div className="max-w-md w-full relative">
            
            {/* Scroll Indicator */}
            <div className="absolute -top-12 left-0 flex items-center gap-2 text-xs font-sans text-amber">
              <span className="h-2 w-2 rounded-full bg-crimson animate-ping" />
              Progress Timeline: {Math.round(progress * 100)}%
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <span className="font-sans text-xs font-semibold tracking-widest text-crimson uppercase">
                    {activeCheckpoint.subtitle}
                  </span>
                  <h3 className="mt-2 font-display text-3xl font-bold text-white">
                    {activeCheckpoint.title}
                  </h3>
                </div>

                <p className="font-sans text-sm md:text-base text-silver leading-relaxed">
                  {activeCheckpoint.desc}
                </p>

                {/* KPI highlights */}
                <div className="flex items-center gap-3 bg-chamber p-4 rounded border border-border-glass">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-obsidian text-amber shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans text-[10px] text-silver uppercase">SLA Metric</span>
                    <span className="font-display text-sm font-bold text-white">{activeCheckpoint.stat}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom guide instructions */}
            {progress < 0.95 && (
              <div className="mt-12 flex items-center gap-2 text-xs font-sans text-silver/60">
                <ChevronDown className="h-4 w-4 text-amber animate-bounce" />
                Scroll down to track the bottle's distribution
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
