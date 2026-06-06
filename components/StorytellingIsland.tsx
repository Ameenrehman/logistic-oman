"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Truck, CheckCircle2, ChevronDown, Award, MapPin, Activity, Thermometer, Radio } from "lucide-react";
import { useMemo } from "react";
import Image from "next/image";

// 3D City Nodes coordinate positions representing the national network
const CITIES = [
  { name: "Muscat", pos: [0.0, 0.3, 0.0] as [number, number, number] },
  { name: "Sohar", pos: [-0.5, 0.55, -0.15] as [number, number, number] },
  { name: "Nizwa", pos: [-0.2, 0.05, 0.1] as [number, number, number] },
  { name: "Duqm", pos: [0.3, -0.45, 0.2] as [number, number, number] },
  { name: "Salalah", pos: [-0.2, -1.05, 0.35] as [number, number, number] }
];

// Connection lines between logistics nodes
function ConnectionLine({ start, end, active }: { start: [number, number, number]; end: [number, number, number]; active: boolean }) {
  const lineMesh = useMemo(() => {
    const points = [
      new THREE.Vector3(...start),
      new THREE.Vector3(...end)
    ];
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({
      color: active ? "#E31B23" : "#374151",
      transparent: true,
      opacity: active ? 0.85 : 0.2
    });
    return new THREE.Line(geom, mat);
  }, [start, end, active]);

  return <primitive object={lineMesh} />;
}

// Oman Logistics Grid component containing city nodes & connected pathways
function OmanLogisticsGrid({ activeStage }: { activeStage: number }) {
  // Show grid in Stages 1, 4 and 6
  const showGrid = activeStage === 0 || activeStage === 3 || activeStage === 5;
  if (!showGrid) return null;

  return (
    <group position={[0, 0, -0.4]}>
      {CITIES.map((city, idx) => {
        // Highlight active nodes sequentially in stage 4 (0-indexed 3)
        const isActive = activeStage === 0 || activeStage === 5 || (activeStage === 3 && idx <= 3);
        return (
          <group key={city.name} position={city.pos}>
            <mesh>
              <sphereGeometry args={[0.03, 16, 16]} />
              <meshBasicMaterial color={isActive ? "#E31B23" : "#4B5563"} />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshBasicMaterial color={isActive ? "#E31B23" : "#4B5563"} transparent opacity={0.15} />
            </mesh>
          </group>
        );
      })}

      {/* Routes connecting cities */}
      <ConnectionLine start={CITIES[0].pos} end={CITIES[1].pos} active={activeStage === 0 || activeStage === 5 || activeStage === 3} />
      <ConnectionLine start={CITIES[0].pos} end={CITIES[2].pos} active={activeStage === 0 || activeStage === 5 || activeStage === 3} />
      <ConnectionLine start={CITIES[2].pos} end={CITIES[3].pos} active={activeStage === 0 || activeStage === 5 || activeStage === 3} />
      <ConnectionLine start={CITIES[3].pos} end={CITIES[4].pos} active={activeStage === 0 || activeStage === 5} />
    </group>
  );
}

// Cooler airflow particle visualization inside the truck trailer
function CoolerAirflow() {
  const count = 15;
  const particlesRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      arr[i] = (Math.random() - 0.5) * 0.22; // x (trailer width)
      arr[i + 1] = (Math.random() - 0.5) * 0.25; // y (trailer height)
      arr[i + 2] = (Math.random() - 0.5) * 0.7; // z (trailer length)
    }
    return arr;
  }, []);

  useFrame(() => {
    if (!particlesRef.current) return;
    const pts = particlesRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 2; i < pts.length; i += 3) {
      // Flow backwards through the trailer
      pts[i] -= 0.005;
      if (pts[i] < -0.35) {
        pts[i] = 0.35; // Reset to front of trailer
      }
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#60A5FA" size={0.015} transparent opacity={0.65} />
    </points>
  );
}

// 3D Animated Scanning Laser Plane Component
function ScanningLaser() {
  const laserRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!laserRef.current) return;
    laserRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.5 - 0.1;
  });

  return (
    <mesh ref={laserRef} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[0.8, 1.4]} />
      <meshBasicMaterial color="#E31B23" transparent opacity={0.08} side={THREE.DoubleSide} />
    </mesh>
  );
}

// Programmatic 3D Smart Refrigerator Truck Model
function SmartTruck({ progress, activeStage }: { progress: number; activeStage: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Group>(null);
  const doorLeftRef = useRef<THREE.Mesh>(null);
  const doorRightRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!groupRef.current) return;

    const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end;

    // Target positions & rotations based on active stage
    let targetX = 0;
    let targetY = -0.1;
    let targetZ = 0.2;
    let targetRotX = 0.1;
    let targetRotY = Math.PI * 0.25;
    let targetRotZ = 0;
    let targetScale = 1.0;

    // Animate rear cargo doors (slide open during Stage 5)
    if (doorLeftRef.current && doorRightRef.current) {
      if (activeStage === 4) {
        doorLeftRef.current.position.x = lerp(doorLeftRef.current.position.x, -0.22, 0.1);
        doorRightRef.current.position.x = lerp(doorRightRef.current.position.x, 0.22, 0.1);
      } else {
        doorLeftRef.current.position.x = lerp(doorLeftRef.current.position.x, -0.09, 0.1);
        doorRightRef.current.position.x = lerp(doorRightRef.current.position.x, 0.09, 0.1);
      }
    }

    // Storytelling camera path mapping
    switch (activeStage) {
      case 0: // Stage 1: Descent
        targetX = 0;
        targetY = -0.55;
        targetZ = -0.3;
        targetRotY = Math.PI * 0.2;
        targetRotX = 0.25;
        targetScale = 0.35;
        break;
      case 1: // Stage 2: Cold Chain Close-Up
        targetX = -0.25;
        targetY = 0.05;
        targetZ = 0.65;
        targetRotY = Math.PI * 0.6;
        targetRotX = 0.05;
        targetScale = 1.15;
        break;
      case 2: // Stage 3: Dispatch Approval
        targetX = 0.0;
        targetY = -0.05;
        targetZ = 0.45;
        targetRotY = Math.PI * 0.5;
        targetRotX = 0.0;
        targetScale = 1.1;
        break;
      case 3: // Stage 4: Network Overview
        targetX = 0.05;
        targetY = 0.28;
        targetZ = -0.35;
        targetRotY = Math.PI * 0.35;
        targetRotX = 0.15;
        targetScale = 0.42;
        break;
      case 4: // Stage 5: Door Opens
        targetX = 0.0;
        targetY = -0.15;
        targetZ = 0.75;
        targetRotY = Math.PI * 1.0; // Show the back cargo door
        targetRotX = 0.05;
        targetScale = 1.25;
        break;
      case 5: // Stage 6: Fade/Dissolve
        targetX = 0;
        targetY = -0.65;
        targetZ = -1.1;
        targetRotY = Math.PI * 1.25;
        targetRotX = 0.35;
        targetScale = 0.05;
        break;
    }

    // Apply lerped values for buttery smooth transition kinetics
    groupRef.current.position.x = lerp(groupRef.current.position.x, targetX, 0.08);
    groupRef.current.position.y = lerp(groupRef.current.position.y, targetY, 0.08);
    groupRef.current.position.z = lerp(groupRef.current.position.z, targetZ, 0.08);

    groupRef.current.rotation.x = lerp(groupRef.current.rotation.x, targetRotX, 0.08);
    groupRef.current.rotation.y = lerp(groupRef.current.rotation.y, targetRotY, 0.08);
    groupRef.current.rotation.z = lerp(groupRef.current.rotation.z, targetRotZ, 0.08);

    groupRef.current.scale.setScalar(lerp(groupRef.current.scale.x, targetScale, 0.08));

    // Spin wheels on stages where en-route dispatch is active
    if (wheelsRef.current && (activeStage === 2 || activeStage === 3)) {
      wheelsRef.current.rotation.x += 0.18;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Main Truck Chassis */}
      <mesh position={[0, -0.2, 0]} castShadow>
        <boxGeometry args={[0.3, 0.05, 1.4]} />
        <meshStandardMaterial color="#334155" roughness={0.35} metalness={0.4} />
      </mesh>

      {/* 2. Cab Cabin (Translucent obsidian & red wireframe highlights) */}
      <mesh position={[0, -0.05, 0.52]} castShadow>
        <boxGeometry args={[0.32, 0.3, 0.35]} />
        <meshStandardMaterial color="#1E293B" roughness={0.2} metalness={0.2} />
      </mesh>
      <mesh position={[0, -0.05, 0.52]}>
        <boxGeometry args={[0.325, 0.305, 0.355]} />
        <meshBasicMaterial color="#E31B23" wireframe transparent opacity={0.15} />
      </mesh>

      {/* Windshield */}
      <mesh position={[0, 0.03, 0.701]}>
        <planeGeometry args={[0.26, 0.12]} />
        <meshStandardMaterial color="#475569" roughness={0.05} metalness={0.1} />
      </mesh>

      {/* Headlights */}
      <mesh position={[-0.12, -0.1, 0.7]}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshBasicMaterial color="#FBBF24" />
      </mesh>
      <mesh position={[0.12, -0.1, 0.7]}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshBasicMaterial color="#FBBF24" />
      </mesh>

      {/* Simulated volumetric headlight cones */}
      {activeStage >= 2 && (
        <group position={[0, -0.1, 1.15]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.25, 0.9, 16]} />
          <meshBasicMaterial color="#FBBF24" transparent opacity={0.16} />
        </group>
      )}

      {/* GPS Dome Receiver */}
      <mesh position={[0, 0.12, 0.52]}>
        <cylinderGeometry args={[0.035, 0.02, 0.02, 16]} />
        <meshStandardMaterial color="#D97706" roughness={0.1} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.13, 0.52]}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshBasicMaterial color={activeStage === 0 || activeStage === 3 ? "#FBBF24" : "#475569"} />
      </mesh>

      {/* 3. Translucent Polycarbonate Cold Chain Trailer & Wireframe CAD Overlay */}
      <group position={[0, 0.1, -0.22]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.34, 0.42, 1.0]} />
          <meshPhysicalMaterial
            color="#334155"
            roughness={0.15}
            metalness={0.2}
            transmission={0.82}
            thickness={1.2}
            transparent
            opacity={0.88}
          />
        </mesh>
        
        {/* Futuristic CAD overlay framework */}
        <mesh>
          <boxGeometry args={[0.345, 0.425, 1.005]} />
          <meshBasicMaterial color="#E31B23" wireframe transparent opacity={0.18} />
        </mesh>

        {/* Back Cargo Door Panels */}
        <mesh ref={doorLeftRef} position={[-0.085, 0, -0.505]} castShadow>
          <boxGeometry args={[0.17, 0.4, 0.01]} />
          <meshStandardMaterial color="#E31B23" roughness={0.25} metalness={0.6} />
        </mesh>
        <mesh ref={doorRightRef} position={[0.085, 0, -0.505]} castShadow>
          <boxGeometry args={[0.17, 0.4, 0.01]} />
          <meshStandardMaterial color="#E31B23" roughness={0.25} metalness={0.6} />
        </mesh>

        {/* Dynamic Airflow particles inside */}
        {activeStage === 1 && <CoolerAirflow />}

        {/* Thermal Sensor Pings inside */}
        <mesh position={[-0.1, 0.1, 0.25]}>
          <sphereGeometry args={[0.018, 8, 8]} />
          <meshBasicMaterial color="#E31B23" />
        </mesh>
        <mesh position={[0.1, -0.1, -0.15]}>
          <sphereGeometry args={[0.018, 8, 8]} />
          <meshBasicMaterial color="#10B981" />
        </mesh>
      </group>

      {/* 4. Wheels Cylinder Group */}
      <group ref={wheelsRef}>
        <mesh position={[-0.17, -0.22, 0.42]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.06, 24]} />
          <meshStandardMaterial color="#030712" roughness={0.8} />
        </mesh>
        <mesh position={[0.17, -0.22, 0.42]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.06, 24]} />
          <meshStandardMaterial color="#030712" roughness={0.8} />
        </mesh>
        <mesh position={[-0.17, -0.22, -0.32]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.06, 24]} />
          <meshStandardMaterial color="#030712" roughness={0.8} />
        </mesh>
        <mesh position={[0.17, -0.22, -0.32]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.06, 24]} />
          <meshStandardMaterial color="#030712" roughness={0.8} />
        </mesh>
        <mesh position={[-0.17, -0.22, -0.52]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.06, 24]} />
          <meshStandardMaterial color="#030712" roughness={0.8} />
        </mesh>
        <mesh position={[0.17, -0.22, -0.52]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.06, 24]} />
          <meshStandardMaterial color="#030712" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
}

// Narrative checkpoints following Apple & Stripe enterprise style
const CHECKPOINTS = [
  {
    title: "National Logistics Grid Online",
    subtitle: "Visibility & Control",
    desc: "Every delivery begins with visibility. The nationwide distribution network lights up, establishing secure routing pathways across Oman's primary transit corridors.",
    stat: "National Grid Active",
    icon: Award,
  },
  {
    title: "Cold Chain Intelligence",
    subtitle: "Continuous Thermal Monitoring",
    desc: "Temperature integrity is continuously monitored. High-precision IoT sensors stream thermal, humidity, and location logs from our insulated trailer modules.",
    stat: "±0.2°C Temperature Precision",
    icon: ShieldCheck,
  },
  {
    title: "Dispatch Authorization",
    subtitle: "Pre-Flight Verification",
    desc: "Every shipment is cryptographically verified before deployment. Route parameters, driver credentials, cargo security, and cooling stability are fully audited.",
    stat: "Secure Gate Locked",
    icon: CheckCircle2,
  },
  {
    title: "Nationwide Distribution",
    subtitle: "Transit Corridors",
    desc: "One truck. One network. Nationwide reach. Connecting Muscat, Sohar, Nizwa, Duqm, and Salalah through a unified digital routing and scheduling platform.",
    stat: "1,100 km Seamless Link",
    icon: Truck,
  },
  {
    title: "Verified Delivery",
    subtitle: "SLA Integrity Met",
    desc: "Deliveries arrive at hypermarkets and wholesale chains with verified cold-chain integrity. Cargo doors slide open to release chilled stock under full compliance.",
    stat: "100% SLA Maintained",
    icon: CheckCircle2,
  },
  {
    title: "Operational Excellence Ledger",
    subtitle: "Measurable Intelligence",
    desc: "Every movement becomes measurable intelligence. Historical temperature logs and transit statistics are committed directly to our enterprise customer dashboard.",
    stat: "99.8% Success Rate",
    icon: Award,
  },
];

const BACKGROUND_IMAGES = [
  "/images/control_center_tech.png",
  "/images/warehouse_automated.png",
  "/images/fleet_truck_close.png",
  "/images/hero_oman_transit.png",
  "/images/warehouse_automated.png",
  "/images/control_center_tech.png",
];

const STAGE_LOGS = [
  [
    { time: "12:04:11", tag: "GRID", type: "info", text: "SULTANATE LOGISTICS GRID OVERVIEW ACTIVE" },
    { time: "12:04:15", tag: "NODE", type: "success", text: "MUSCAT OPERATIONS HUB SYNCED - 23.5350N" },
    { time: "12:04:18", tag: "GPS", type: "info", text: "GPS CONSTELLATION SECURE CONNECTION ESTABLISHED" }
  ],
  [
    { time: "12:09:22", tag: "THERM", type: "success", text: "INSULATED TRAILER SENSOR COMMS STATUS: NOMINAL" },
    { time: "12:09:25", tag: "TEMP", type: "success", text: "INTERNAL CHILL TEMPERATURE LOCK IN: +2.0C" },
    { time: "12:09:28", tag: "HUMID", type: "success", text: "HUMIDITY INDEX STABILIZED AT 48% TOLERANCE" }
  ],
  [
    { time: "12:14:02", tag: "GATE", type: "info", text: "DISPATCH SEQUENCE INITIATED - CLEARANCE PORTAL" },
    { time: "12:14:05", tag: "RFID", type: "success", text: "RFID PALLET LEDGER SIGNED & LOCKED" },
    { time: "12:14:08", tag: "AUTH", type: "success", text: "OPERATOR AUTHENTICATION VERIFIED BY WMS" }
  ],
  [
    { time: "12:21:40", tag: "ROUTE", type: "info", text: "SAMAIL HIGHWAY GAP TRANSIT CORRIDOR ACTIVE" },
    { time: "12:21:44", tag: "TELE", type: "warning", text: "DESERT EN-ROUTE AMBIENT TEMP DETECTED: +44.5C" },
    { time: "12:21:47", tag: "SLA", type: "success", text: "THERMAL ENVELOPE STABLE AT CRYO-THRESHOLD" }
  ],
  [
    { time: "12:28:15", tag: "NODE", type: "info", text: "SOLEDAD REGIONAL RETAIL GATE DEPOT INTAKE" },
    { time: "12:28:18", tag: "LOCK", type: "success", text: "GEOFENCE DE-SEALING PROTOCOL APPROVED" },
    { time: "12:28:20", tag: "DELV", type: "success", text: "CARGO UNLOAD INITIATED - SLA MET: 100%" }
  ],
  [
    { time: "12:35:01", tag: "LEDG", type: "success", text: "DELIVERY TRANSACTION COMMITTED TO PLATFORM" },
    { time: "12:35:04", tag: "KPI", type: "success", text: "99.8% COMPLIANCE REGISTERED FOR SHIPMENT" },
    { time: "12:35:08", tag: "SYS", type: "success", text: "NATIONAL DASHBOARD METRICS COMPILED" }
  ]
];

const COORDINATES = [
  "23.5350° N, 58.2140° E",
  "24.3461° N, 56.7122° E",
  "22.9333° N, 57.5333° E",
  "19.6617° N, 57.7011° E",
  "17.0175° N, 54.0924° E",
  "23.5859° N, 58.3829° E"
];

export default function StorytellingIsland() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeStage, setActiveStage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isUnloaded, setIsUnloaded] = useState(false);

  // Detect window resizing & prefers-reduced-motion fallback
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Compute scroll bounds
  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollableHeight = rect.height - viewportHeight;
      const scrolledPast = -rect.top;
      
      let currentProgress = scrolledPast / totalScrollableHeight;
      currentProgress = Math.max(0, Math.min(1, currentProgress));
      
      setProgress(currentProgress);

      // Map progress to stages
      const stage = Math.min(5, Math.floor(currentProgress * 6));
      setActiveStage(stage);

      // Unload Three.js canvas once past the timeline to preserve rendering memory
      if (currentProgress >= 0.98) {
        setIsUnloaded(true);
      } else {
        setIsUnloaded(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // Premium Mobile Fallback: Interactive Infographic
  if (isMobile) {
    return (
      <section className="py-20 bg-obsidian border-y border-border-glass relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="relative z-10 px-4 max-w-lg mx-auto">
          <div className="mb-12 text-center">
            <span className="font-sans text-xs font-semibold tracking-widest text-crimson uppercase">
              Oman Cold Chain Intelligence
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold text-white">
              National Logistics Ledger
            </h2>
            <p className="mt-2 font-sans text-xs text-silver">
              Browse the technology powering Coca-Cola and FMCG distribution en-route across Oman.
            </p>
          </div>

          <div className="space-y-6">
            {CHECKPOINTS.map((cp, idx) => {
              const IconComponent = cp.icon;
              return (
                <div
                  key={cp.title}
                  className="glass-panel rounded-lg p-5 bg-chamber/90 border border-border-glass/40 shadow-xl"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-sans text-[10px] text-amber font-semibold uppercase tracking-wider">
                      {cp.subtitle}
                    </span>
                    <span className="font-mono text-xs text-silver/40">0{idx + 1} / 06</span>
                  </div>
                  <h3 className="font-display text-base font-bold text-white mb-2">{cp.title}</h3>
                  <p className="font-sans text-xs text-silver leading-relaxed mb-4">{cp.desc}</p>
                  <div className="pt-3 border-t border-border-glass/30 flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded bg-obsidian border border-border-glass/40 text-amber">
                      <IconComponent className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-mono text-[10px] font-bold text-white">{cp.stat}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  const activeCheckpoint = CHECKPOINTS[activeStage];
  const Icon = activeCheckpoint.icon;

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-obsidian">
      {/* Sticky layout container */}
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center justify-between overflow-hidden">
        
        {/* Left Hand WebGL Telemetry Canvas */}
        <div 
          className="w-full md:w-1/2 h-[50vh] md:h-screen relative z-10 bg-chamber/5 overflow-hidden border-r border-border-glass/20 transition-opacity duration-500"
          style={{ opacity: progress > 0.83 ? (1.0 - (progress - 0.83) / 0.15) : 1.0 }}
        >
          {/* Panoramic background visual shifts */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none transition-all duration-1000 ease-out">
            <Image
              src={BACKGROUND_IMAGES[activeStage] || "/images/hero_oman_transit.png"}
              alt="YAC logistics center view"
              fill
              className="object-cover transition-all duration-1000 ease-out scale-105 brightness-[0.25] saturate-[0.7]"
              priority={activeStage === 0}
            />
          </div>

          {/* HUD Tech Elements */}
          <div className="absolute inset-0 z-1 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian z-2 pointer-events-none" />

          {/* Telemetry HUD Panel: Left */}
          <div className="absolute top-24 left-6 z-10 font-mono text-[9px] text-silver/80 space-y-1 bg-obsidian/80 backdrop-blur-md p-3 rounded border border-border-glass/40 shadow-xl">
            <div className="flex items-center gap-1.5 text-amber">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse" />
              <span>COLD CHAIN NETWORK LIVE</span>
            </div>
            <div>GATE PORTAL: <span className="text-white font-bold">YAC-908-MCT</span></div>
            <div>TELEMETRY COMPLIANCE: <span className="text-white font-bold">{(progress * 100).toFixed(1)}%</span></div>
          </div>

          {/* Telemetry HUD Panel: Right */}
          <div className="absolute top-24 right-6 z-10 font-mono text-[9px] text-silver/80 text-right space-y-1 bg-obsidian/80 backdrop-blur-md p-3 rounded border border-border-glass/40 shadow-xl">
            <div className="text-emerald font-bold font-sans">COORDINATES SYNCED</div>
            <div className="text-silver/70">{COORDINATES[activeStage] || "23.5350° N, 58.2140° E"}</div>
            <div>STATUS: NOMINAL</div>
          </div>

          {/* System Console Logs Feed */}
          <div className="absolute bottom-6 left-6 z-10 font-mono text-[8px] text-silver/70 w-[calc(100%-48px)] bg-obsidian/95 backdrop-blur-md p-3 rounded border border-border-glass/40 shadow-2xl flex flex-col gap-1.5">
            <div className="flex items-center justify-between border-b border-border-glass/30 pb-1.5 mb-1 text-silver/40 text-[9px]">
              <span>SYSTEM EVENT DIALOG</span>
              <span className="text-amber">SECURE SSL LINK ACTIVE</span>
            </div>
            <AnimatePresence mode="popLayout">
              {STAGE_LOGS[activeStage]?.map((log, idx) => (
                <motion.div
                  key={`${activeStage}-${idx}`}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 5 }}
                  transition={{ duration: 0.2, delay: idx * 0.04 }}
                  className="flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="text-silver/40">[{log.time}]</span>
                    <span className={log.type === "success" ? "text-emerald" : log.type === "warning" ? "text-amber" : "text-sky-400"}>
                      {log.tag}
                    </span>
                  </span>
                  <span className="text-white/80 text-right truncate max-w-[70%]">{log.text}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Canvas Render Element (conditionally unloaded to free GPU resources) */}
          {!isUnloaded && (
            <Canvas camera={{ position: [0, 0, 3.2], fov: 45 }} shadows className="relative z-3">
              <ambientLight intensity={0.75} />
              
              <spotLight
                position={[5, 12, 5]}
                angle={0.25}
                penumbra={1}
                intensity={3.5}
                castShadow
              />
              
              <directionalLight
                position={[5, 8, 5]}
                color="#FFFFFF"
                intensity={2.8}
                castShadow
              />
              
              <directionalLight
                position={[-5, 4, -2]}
                color="#E5A93C"
                intensity={1.5}
              />

              <pointLight
                position={[0, 2, 3]}
                color="#FFFFFF"
                intensity={2.0}
              />

              <pointLight
                position={[-3, -1.5, 3]}
                color="#E31B23"
                intensity={1.2}
              />
              
              <ScanningLaser />

              {/* Bounding box locator */}
              <mesh position={[0, -0.05, 0]}>
                <boxGeometry args={[0.9, 1.4, 1.6]} />
                <meshBasicMaterial color="#E31B23" wireframe transparent opacity={0.05} />
              </mesh>

              <OmanLogisticsGrid activeStage={activeStage} />

              <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.15}>
                <SmartTruck progress={progress} activeStage={activeStage} />
              </Float>
            </Canvas>
          )}
        </div>

        {/* Right Hand Content panel / 2D Dashboard Overlay */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen flex items-center justify-center p-6 md:p-16 z-20 bg-gradient-to-t md:bg-gradient-to-r from-obsidian via-obsidian/95 to-obsidian">
          <div className="max-w-md w-full relative">
            
            {/* Scroll Progress tracker */}
            <div className="absolute -top-12 left-0 flex items-center gap-2 text-xs font-sans text-amber">
              <span className="h-2 w-2 rounded-full bg-crimson animate-ping" />
              Network Compliance Node: {Math.round(progress * 100)}%
            </div>

            <AnimatePresence mode="wait">
              {progress >= 0.83 ? (
                /* Premium 2D Enterprise KPI Dashboard emergence */
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div>
                    <span className="font-sans text-xs font-semibold tracking-widest text-crimson uppercase">
                      Operational Ledger Summary
                    </span>
                    <h3 className="mt-2 font-display text-3xl font-bold text-white">
                      Nationwide Excellence Dashboard
                    </h3>
                    <p className="mt-3 font-sans text-xs text-silver leading-relaxed">
                      Real-time cold-chain statistics compiled continuously from Muscat to Salalah depots.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-chamber p-4 rounded border border-border-glass/40 shadow-md">
                      <span className="font-sans text-[9px] text-silver uppercase block mb-1">Delivery Success</span>
                      <span className="font-display text-xl font-bold text-emerald">99.8%</span>
                    </div>
                    <div className="bg-chamber p-4 rounded border border-border-glass/40 shadow-md">
                      <span className="font-sans text-[9px] text-silver uppercase block mb-1">Cases Delivered</span>
                      <span className="font-display text-xl font-bold text-white">24M+</span>
                    </div>
                    <div className="bg-chamber p-4 rounded border border-border-glass/40 shadow-md">
                      <span className="font-sans text-[9px] text-silver uppercase block mb-1">Smart Fleet</span>
                      <span className="font-display text-xl font-bold text-amber">500+ Vehicles</span>
                    </div>
                    <div className="bg-chamber p-4 rounded border border-border-glass/40 shadow-md">
                      <span className="font-sans text-[9px] text-silver uppercase block mb-1">Monitoring Status</span>
                      <span className="font-display text-xl font-bold text-sky-400">24/7 Active</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="font-sans text-[10px] text-silver/50 block italic">
                      ✓ Network verified and compliant with FDA and local cold-chain standard procedures.
                    </span>
                  </div>
                </motion.div>
              ) : (
                /* Regular narrative scroll checkpoints */
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
                    <h3 className="mt-2 font-display text-2xl md:text-3xl font-bold text-white leading-snug">
                      {activeCheckpoint.title}
                    </h3>
                  </div>

                  <p className="font-sans text-xs md:text-sm text-silver leading-relaxed">
                    {activeCheckpoint.desc}
                  </p>

                  <div className="flex items-center gap-3 bg-chamber p-4 rounded border border-border-glass">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-obsidian text-amber shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-sans text-[10px] text-silver uppercase">SLA METRIC</span>
                      <span className="font-display text-xs md:text-sm font-bold text-white">{activeCheckpoint.stat}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {progress < 0.95 && (
              <div className="mt-12 flex items-center gap-2 text-xs font-sans text-silver/60">
                <ChevronDown className="h-4 w-4 text-amber animate-bounce" />
                Scroll down to traverse the cold-chain timeline
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
