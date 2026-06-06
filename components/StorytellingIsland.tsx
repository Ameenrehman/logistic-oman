"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Truck, Warehouse, CheckCircle2, ChevronDown, Award } from "lucide-react";

import { useMemo } from "react";

// 3D Stylized Bottle Component using smooth Lathe Geometry
function StylizedBottle({ progress }: { progress: number }) {
  const bottleRef = useRef<THREE.Group>(null);
  const liquidRef = useRef<THREE.Mesh>(null);
  const bubblesRef = useRef<THREE.Points>(null);

  // Define lathe points for realistic glass bottle contour
  const bottlePoints = useMemo(() => {
    const pts = [];
    pts.push(new THREE.Vector2(0, -0.9));       // bottom center
    pts.push(new THREE.Vector2(0.35, -0.9));    // bottom outer
    pts.push(new THREE.Vector2(0.35, -0.2));    // body height
    pts.push(new THREE.Vector2(0.33, 0.1));     // body upper
    pts.push(new THREE.Vector2(0.24, 0.35));    // shoulder curve
    pts.push(new THREE.Vector2(0.14, 0.5));     // neck lower
    pts.push(new THREE.Vector2(0.14, 0.9));     // neck upper
    pts.push(new THREE.Vector2(0.16, 0.92));    // glass lip
    pts.push(new THREE.Vector2(0, 0.92));       // top center close
    return pts;
  }, []);

  // Define lathe points for liquid inside
  const liquidPoints = useMemo(() => {
    const pts = [];
    pts.push(new THREE.Vector2(0, -0.86));      // bottom center
    pts.push(new THREE.Vector2(0.33, -0.86));   // bottom outer
    pts.push(new THREE.Vector2(0.33, -0.2));    // body height
    pts.push(new THREE.Vector2(0.31, 0.08));    // body upper
    pts.push(new THREE.Vector2(0.22, 0.33));    // shoulder curve
    pts.push(new THREE.Vector2(0.12, 0.45));    // liquid line
    pts.push(new THREE.Vector2(0, 0.45));       // liquid top center
    return pts;
  }, []);

  // Define position/rotation keyframes based on progress (0 to 1)
  useFrame((state) => {
    if (!bottleRef.current) return;

    // Linear interpolation helper
    const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end;

    let targetX = 0;
    let targetY = -0.3;
    let targetZ = 0;
    let targetRotX = 0.1;
    let targetRotY = state.clock.getElapsedTime() * 0.35; // slow constant rotation
    let targetRotZ = 0;
    let targetScale = 1.05;

    if (progress < 0.2) {
      // Production Facility: Center, standing tall, close-up
      const t = progress / 0.2;
      targetX = lerp(0, -1.0, t);
      targetY = lerp(-0.3, -0.4, t);
      targetZ = lerp(1, 0, t);
      targetRotX = lerp(0.1, 0.2, t);
      targetRotY = lerp(0, Math.PI * 0.5, t);
      targetScale = lerp(1.2, 1.0, t);
    } else if (progress < 0.4) {
      // Warehouse: Left side, tilted, surrounded by racks
      const t = (progress - 0.2) / 0.2;
      targetX = lerp(-1.0, 1.0, t);
      targetY = lerp(-0.4, -0.1, t);
      targetZ = lerp(0, -0.4, t);
      targetRotX = lerp(0.2, -0.25, t);
      targetRotY = lerp(Math.PI * 0.5, Math.PI * 1.2, t);
      targetScale = lerp(1.0, 0.95, t);
    } else if (progress < 0.6) {
      // Fleet Loading: Right side, moving into container
      const t = (progress - 0.4) / 0.2;
      targetX = lerp(1.0, 0, t);
      targetY = lerp(-0.1, -0.5, t);
      targetZ = lerp(-0.4, 0, t);
      targetRotX = lerp(-0.25, 0.4, t);
      targetRotY = lerp(Math.PI * 1.2, Math.PI * 2.0, t);
      targetScale = lerp(0.95, 0.9, t);
    } else if (progress < 0.8) {
      // Highway Transit: Center, tilted back, moving fast
      const t = (progress - 0.6) / 0.2;
      targetX = lerp(0, -0.8, t);
      targetY = lerp(-0.5, -0.2, t);
      targetZ = lerp(0, 0.4, t);
      targetRotX = lerp(0.4, 0.15, t);
      targetRotY = lerp(Math.PI * 2.0, Math.PI * 2.8, t);
      targetScale = lerp(0.9, 1.1, t);
    } else {
      // Retail & Consumer Table: Standing straight, floating, glowing, cap pops off effect
      const t = (progress - 0.8) / 0.2;
      targetX = lerp(-0.8, 0, t);
      targetY = lerp(-0.2, -0.1, t);
      targetZ = lerp(0.4, 1.1, t);
      targetRotX = lerp(0.15, 0, t);
      targetRotY = lerp(Math.PI * 2.8, Math.PI * 4.0, t);
      targetScale = lerp(1.1, 1.25, t);
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
      liquidRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 2.5) * 0.015;
    }

    // Animate bubbles upwards
    if (bubblesRef.current) {
      const positions = bubblesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += 0.008; // Rise up
        if (positions[i] > 0.4) {
          positions[i] = -0.85; // reset to bottom of bottle profile
        }
      }
      bubblesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // Setup bubble coordinates
  const bubbleCount = 45;
  const bubblePositions = useMemo(() => {
    const pos = new Float32Array(bubbleCount * 3);
    for (let i = 0; i < bubbleCount * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 0.38; // width
      pos[i + 1] = Math.random() * 1.25 - 0.8; // height
      pos[i + 2] = (Math.random() - 0.5) * 0.38; // depth
    }
    return pos;
  }, []);

  return (
    <group ref={bottleRef}>
      {/* 1. Bottle Glass Shell */}
      <mesh castShadow receiveShadow>
        <latheGeometry args={[bottlePoints, 36]} />
        <meshPhysicalMaterial
          color="#E31B23"
          roughness={0.08}
          transmission={0.65}
          thickness={1.1}
          clearcoat={1.0}
          clearcoatRoughness={0.08}
          ior={1.45}
          transparent
        />
      </mesh>

      {/* 2. Bottle Cap */}
      <mesh position={[0, 0.95, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.16, 0.08, 32]} />
        <meshStandardMaterial color="#E5A93C" roughness={0.15} metalness={0.95} />
      </mesh>

      {/* 3. Liquid inside */}
      <mesh ref={liquidRef} castShadow>
        <latheGeometry args={[liquidPoints, 36]} />
        <meshPhysicalMaterial
          color="#730408"
          roughness={0.12}
          transmission={0.3}
          thickness={0.6}
          clearcoat={0.4}
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
          size={0.02}
          transparent
          opacity={0.8}
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
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen sizing
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Monitor the scroll progress of this container section
  useEffect(() => {
    if (isMobile) return; // Disable scroll calculations on mobile fallback

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
  }, [isMobile]);

  if (isMobile) {
    // 2D Mobile Fallback Sequence
    return (
      <section className="py-20 bg-obsidian border-y border-border-glass relative overflow-hidden">
        {/* Radial grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#30363d10_1px,transparent_1px),linear-gradient(to_bottom,#30363d10_1px,transparent_1px)] bg-[size:25px_25px]" />
        
        <div className="relative z-10 px-4 max-w-lg mx-auto">
          <div className="mb-10 text-center">
            <span className="font-sans text-xs font-semibold tracking-widest text-crimson uppercase">
              Distribution Timeline
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold text-white">
              The Journey of Refreshment
            </h2>
            <p className="mt-2 font-sans text-xs text-silver">
              Swipe or scroll to preview our nationwide cold-chain distribution checkpoints.
            </p>
          </div>

          {/* Horizontal scroll timeline deck */}
          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
            {CHECKPOINTS.map((cp, idx) => {
              const CPIcon = cp.icon;
              return (
                <div
                  key={cp.title}
                  className="w-[85vw] shrink-0 snap-center glass-panel rounded-lg p-6 bg-chamber/80 border border-border-glass flex flex-col justify-between min-h-[380px]"
                >
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <span className="font-sans text-[10px] text-amber font-semibold uppercase tracking-wider block">
                        {cp.subtitle}
                      </span>
                      <span className="font-display text-xs text-silver/40">0{idx + 1} / 06</span>
                    </div>

                    {/* Stylized 2D Graphic preview */}
                    <div className="h-32 w-full bg-obsidian/40 border border-border-glass/40 rounded flex items-center justify-center mb-6 relative overflow-hidden">
                      {/* Abstract moving road or bubbles representing the state */}
                      <svg className="w-16 h-28" viewBox="0 0 100 200">
                        <rect x="30" y="50" width="40" height="120" rx="10" fill="#E31B23" fillOpacity="0.4" stroke="#E31B23" strokeWidth="2" />
                        <rect x="42" y="15" width="16" height="35" rx="3" fill="#E31B23" fillOpacity="0.4" stroke="#E31B23" strokeWidth="2" />
                        <rect x="40" y="5" width="20" height="10" rx="2" fill="#E5A93C" />
                        <rect x="34" y="65" width="32" height="100" rx="8" fill="#9A0F14" />
                        {/* Bubbles */}
                        <circle cx="45" cy="120" r="2" fill="#FFF" opacity="0.6" />
                        <circle cx="55" cy="95" r="3" fill="#FFF" opacity="0.8" />
                        <circle cx="50" cy="140" r="1.5" fill="#FFF" opacity="0.4" />
                      </svg>
                      {/* Pulse indicators */}
                      <div className="absolute top-2 right-2 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-crimson" />
                      </div>
                    </div>

                    <h3 className="font-display text-lg font-bold text-white mb-2">
                      {cp.title}
                    </h3>
                    <p className="font-sans text-xs text-silver leading-relaxed">
                      {cp.desc}
                    </p>
                  </div>

                  {/* Footer metric */}
                  <div className="mt-6 pt-4 border-t border-border-glass/60 flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-obsidian border border-border-glass text-amber">
                      <CPIcon className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-sans text-[8px] text-silver uppercase">SLA Standard</span>
                      <span className="font-display text-xs font-bold text-white">{cp.stat}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Swipe indicator helper */}
          <div className="flex justify-center gap-1.5 mt-4">
            {CHECKPOINTS.map((_, idx) => (
              <span
                key={idx}
                className="h-1.5 w-1.5 rounded-full bg-border-glass"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const activeCheckpoint = CHECKPOINTS[activeStage];
  const Icon = activeCheckpoint.icon;

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-obsidian">
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center justify-between overflow-hidden">
        
        {/* WebGL Canvas viewport */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative z-10 bg-chamber/10">
          <Canvas camera={{ position: [0, 0, 3], fov: 45 }} shadows>
            <ambientLight intensity={0.55} />
            
            {/* Main high-key spotlight */}
            <spotLight
              position={[5, 10, 5]}
              angle={0.3}
              penumbra={1}
              intensity={2.8}
              castShadow
            />
            
            {/* Gold highlights from side */}
            <directionalLight
              position={[-5, 3, -2]}
              color="#E5A93C"
              intensity={2.2}
            />

            {/* Crimson highlights from front-left */}
            <pointLight
              position={[-3, -1, 3]}
              color="#E31B23"
              intensity={1.8}
            />
            
            {/* Soft ground lighting for warehouse/highway theme */}
            <gridHelper args={[10, 20, "#30363D", "#161B22"]} position={[0, -1.1, 0]} />
            
            <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.2}>
              <StylizedBottle progress={progress} />
            </Float>
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
