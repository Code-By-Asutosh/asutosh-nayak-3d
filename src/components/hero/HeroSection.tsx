import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { ChevronDown, Rocket, Sparkles, Terminal, Radio } from 'lucide-react';
import HeroSpacecraft from '../3d/HeroSpacecraft';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { soundEngine } from '../../utils/audio';

export default function HeroSection() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const profile = PORTFOLIO_DATA.profile;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setPointer({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleExplore = () => {
    soundEngine.playWarp();
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContact = () => {
    soundEngine.playBlip(800, 'triangle', 0.06);
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col items-center justify-between pt-24 pb-12 px-4 md:px-8 overflow-hidden select-none"
    >
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      {/* Top HUD Telemetry Banner */}
      <div className="w-full max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="px-3.5 py-1.5 rounded-xl hud-panel text-[11px] font-mono text-cosmic-cyan flex items-center gap-2"
        >
          <Radio className="w-3.5 h-3.5 text-cosmic-alien animate-pulse" />
          <span>VESSEL: RECON CRUISER // ORBIT: NOMINAL</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="px-3.5 py-1.5 rounded-xl hud-panel text-[11px] font-mono text-cosmic-purple flex items-center gap-2"
        >
          <Terminal className="w-3.5 h-3.5 text-cosmic-purple" />
          <span>STACK: JAVA 8+ • SPRING BOOT • AWS</span>
        </motion.div>
      </div>

      {/* Main 3D Spacecraft Canvas Container */}
      <div className="relative w-full h-[46vh] md:h-[54vh] max-w-5xl mx-auto z-10 flex items-center justify-center">
        <Canvas
          camera={{ position: [3.4, 1.8, 6.2], fov: 42 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          className="cursor-grab active:cursor-grabbing"
        >
          {/* Ambient light for balanced overall visibility of gray hull */}
          <ambientLight intensity={1.1} />
          {/* Direct Key Sunlight highlighting upper deck panels */}
          <directionalLight position={[8, 12, 6]} intensity={5.0} color="#ffffff" />
          {/* Front fill light so the bow and hull are clearly visible */}
          <directionalLight position={[0, 2, 8]} intensity={2.8} color="#dbe8f5" />
          {/* Cyan Rim & Engine Glow Bounce */}
          <directionalLight position={[-6, -3, -4]} intensity={2.2} color="#00f0ff" />
          {/* Nebula Backlight */}
          <pointLight position={[-4, 4, -4]} intensity={2.5} color="#ffb703" />
          <HeroSpacecraft pointer={pointer} />
        </Canvas>

        {/* Orbit indicator text */}
        <div className="absolute bottom-0 text-[10px] font-mono text-white/40 tracking-widest uppercase pointer-events-none">
          [ INTERACTIVE 3D HEAVY BATTLECRUISER — MOVE CURSOR TO BANK SHIP ]
        </div>
      </div>

      {/* Center Hero Information & Typography */}
      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
        {/* Name Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cosmic-cyan text-glow-cyan">
            {profile.callsign}
          </span>
        </motion.h1>

        {/* Professional Designation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-3 flex items-center justify-center gap-2 flex-wrap"
        >
          <span className="px-3 py-1 rounded-md bg-cosmic-cyan/10 border border-cosmic-cyan/30 text-cosmic-cyan font-mono text-xs md:text-sm font-semibold tracking-wider">
            SOFTWARE ENGINEER
          </span>
          <span className="text-white/40 font-mono text-xs">•</span>
          <span className="text-cosmic-alien font-mono text-xs md:text-sm font-medium tracking-wider">
            SENIOR JAVA BACKEND & CLOUD ARCHITECT
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 max-w-2xl text-sm md:text-base text-cyan-100/70 font-body font-medium leading-relaxed tracking-wide px-4"
        >
          Building scalable, resilient backend services and high-throughput cloud architectures across the digital universe.
        </motion.p>

        {/* Interactive Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={handleExplore}
            className="group relative px-6 py-3.5 rounded-xl bg-gradient-to-r from-cosmic-cyan via-cosmic-purple to-cosmic-alien p-[1px] shadow-glow-cyan cursor-pointer transition-transform hover:scale-105"
          >
            <div className="px-6 py-3 rounded-[11px] bg-[#030014]/90 backdrop-blur-md flex items-center gap-2.5 group-hover:bg-transparent transition-all">
              <Sparkles className="w-4 h-4 text-cosmic-cyan group-hover:text-white" />
              <span className="font-display font-bold text-xs md:text-sm tracking-widest text-white">
                EXPLORE MY UNIVERSE
              </span>
            </div>
          </button>

          <button
            onClick={handleContact}
            className="px-6 py-3.5 rounded-xl hud-panel text-white/80 hover:text-white hover:border-cosmic-alien/50 text-xs md:text-sm font-mono tracking-wider flex items-center gap-2 cursor-pointer transition-all hover:bg-white/5"
          >
            <Rocket className="w-4 h-4 text-cosmic-alien" />
            <span>START A MISSION</span>
          </button>
        </motion.div>
      </div>

      {/* Bottom Scroll Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 1 }}
        onClick={handleExplore}
        className="mt-8 z-10 flex flex-col items-center gap-2 cursor-pointer group text-white/40 hover:text-cosmic-cyan transition-colors"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">
          INITIATE DESCENT // SCROLL
        </span>
        <div className="w-6 h-9 rounded-full border border-white/20 group-hover:border-cosmic-cyan/60 flex items-start justify-center p-1.5 transition-colors">
          <ChevronDown className="w-3.5 h-3.5 animate-bounce text-cosmic-cyan" />
        </div>
      </motion.div>
    </section>
  );
}

