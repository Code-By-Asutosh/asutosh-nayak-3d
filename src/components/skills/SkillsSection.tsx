import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Cpu, Layers, Sparkles } from 'lucide-react';
import TechGalaxy3D from '../3d/TechGalaxy3D';
import { PORTFOLIO_DATA, SkillCategory } from '../../data/portfolioData';
import { soundEngine } from '../../utils/audio';

export default function SkillsSection() {
  const categories = PORTFOLIO_DATA.skillsCategories;
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [inspectNode, setInspectNode] = useState<{
    name: string;
    category: string;
    description: string;
    color: string;
  }>({
    name: 'Java 8+ / Concurrency',
    category: 'Core Language',
    color: '#00f0ff',
    description: 'Collections Framework, Streams & Lambdas, Concurrency & Multithreading (ExecutorService), OOP design, legacy refactoring.',
  });

  const handleSelectNode = (node: {
    name: string;
    category: string;
    description: string;
    color: string;
  }) => {
    setInspectNode(node);
  };

  const filteredCategories =
    activeCategory === 'all'
      ? categories
      : categories.filter((c: SkillCategory) => c.id === activeCategory);

  return (
    <section id="skills" className="relative py-28 px-4 md:px-8 max-w-7xl mx-auto z-10 select-none">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center md:text-left"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cosmic-purple/10 border border-cosmic-purple/30 text-cosmic-purple font-mono text-xs tracking-widest uppercase mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>02 // ORBITAL MATRIX</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-wide">
          TECHNOLOGY <span className="text-glow-purple text-cosmic-purple">GALAXY.</span>
        </h2>
        <p className="mt-2 text-sm md:text-base text-cyan-200/60 font-body max-w-2xl">
          Concentric orbital clusters representing verified technical proficiencies. Explore the 3D solar system below or inspect individual module specifications.
        </p>
      </motion.div>

      {/* 3D Orbiting Galaxy Canvas Container + Inspector HUD Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-12">
        {/* 3D Interactive Solar System Canvas (7 cols) */}
        <div className="lg:col-span-7 h-[380px] md:h-[480px] rounded-3xl hud-panel border border-cosmic-purple/30 overflow-hidden relative flex items-center justify-center">
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-[10px] font-mono text-cosmic-purple">
            <span className="w-2 h-2 rounded-full bg-cosmic-purple animate-ping" />
            <span>REACTOR CORE // 5 CONCENTRIC ORBITS</span>
          </div>

          <Canvas camera={{ position: [0, 5, 10], fov: 45 }} dpr={[1, 2]}>
            <ambientLight intensity={0.5} />
            <TechGalaxy3D onSelectNode={handleSelectNode} />
          </Canvas>

          <div className="absolute bottom-4 text-center text-[10px] font-mono text-white/30 tracking-widest uppercase pointer-events-none">
            [ INTERACTIVE 3D GALAXY — CLICK ORBITING NODES TO INSPECT ]
          </div>
        </div>

        {/* Real-time Telemetry Inspector Card (5 cols) */}
        <div className="lg:col-span-5 p-6 md:p-8 rounded-3xl hud-panel-strong border border-cosmic-cyan/30 hud-corner-accent shadow-glow-purple">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono">
            <span className="text-cosmic-cyan flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cosmic-alien" />
              NODE TELEMETRY INSPECTOR
            </span>
            <span className="text-white/40">SYSTEM: ACTIVE</span>
          </div>

          <div className="mt-6">
            <span className="text-[10px] font-mono text-white/50 tracking-wider uppercase">
              SELECTED COMPONENT
            </span>
            <h3
              className="text-xl sm:text-2xl font-display font-bold mt-1 break-words"
              style={{ color: inspectNode.color }}
            >
              {inspectNode.name}
            </h3>
            <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-cyan-200">
              {inspectNode.category}
            </span>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10">
            <span className="text-[10px] font-mono text-white/50 tracking-wider uppercase block mb-2">
              TECHNICAL CAPABILITIES & SCOPE
            </span>
            <p className="text-sm font-body text-white/80 leading-relaxed">
              {inspectNode.description}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-cosmic-alien">
            <span>RESUME SOURCE VERIFIED</span>
            <span>PRODUCTION DEPLOYED</span>
          </div>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => {
            soundEngine.playBlip(650, 'sine', 0.03);
            setActiveCategory('all');
          }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-mono tracking-wider transition-all cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-cosmic-purple text-white shadow-glow-purple'
              : 'hud-panel text-white/60 hover:text-white'
          }`}
        >
          ALL CATEGORIES
        </button>
        {categories.map((cat: SkillCategory) => (
          <button
            key={cat.id}
            onClick={() => {
              soundEngine.playBlip(720, 'sine', 0.03);
              setActiveCategory(cat.id);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono tracking-wider transition-all cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-cosmic-purple text-white shadow-glow-purple'
                : 'hud-panel text-white/60 hover:text-white'
            }`}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* Categorized Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCategories.map((cat: SkillCategory, idx: number) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="p-5 rounded-2xl hud-panel border border-white/10 hover:border-cosmic-cyan/30 transition-all group"
          >
            <div className="flex items-center justify-between gap-2 mb-3 min-w-0">
              <span className="font-display font-bold text-xs sm:text-sm text-white flex items-center gap-2 min-w-0 truncate">
                <Layers className="w-3.5 h-3.5 text-cosmic-cyan shrink-0" />
                <span className="truncate">{cat.category}</span>
              </span>
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: cat.color }}
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map((s, sIdx: number) => (
                <span
                  key={`${cat.id}-${sIdx}`}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                    s.highlight
                      ? 'bg-cosmic-cyan/15 text-cosmic-cyan border border-cosmic-cyan/30'
                      : 'bg-white/5 text-white/70 border border-white/5'
                  }`}
                >
                  {s.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

