import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Shield, Server, Cpu, Globe, CheckCircle2, Terminal } from 'lucide-react';
import InteractivePlanet from '../3d/InteractivePlanet';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export default function AboutSection() {
  const profile = PORTFOLIO_DATA.profile;

  const stats = [
    { label: 'PRODUCTION EXPERIENCE', value: '4+ YEARS', icon: Cpu },
    { label: 'SOCIETIES SCALED', value: '100+ LIVE', icon: Server },
    { label: 'ARCHITECTURE', value: 'MICROSERVICES', icon: Shield },
    { label: 'LOCATION', value: 'BHUBANESWAR', icon: Globe },
  ];

  return (
    <section id="about" className="relative py-28 px-4 md:px-8 max-w-7xl mx-auto z-10 select-none">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-14 text-center md:text-left"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cosmic-cyan/10 border border-cosmic-cyan/30 text-cosmic-cyan font-mono text-xs tracking-widest uppercase mb-3">
          <Terminal className="w-3.5 h-3.5" />
          <span>01 // MISSION DOSSIER</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-wide">
          MISSION <span className="text-glow-cyan text-cosmic-cyan">PROFILE.</span>
        </h2>
        <p className="mt-2 text-sm md:text-base text-cyan-200/60 font-body max-w-xl">
          Core biometric data, engineering specialization, and flight credentials derived directly from production experience.
        </p>
      </motion.div>

      {/* Main Grid: 3D Holographic Planet + Profile HUD Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: 3D Interactive Planet Canvas (5 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 h-[360px] md:h-[450px] relative rounded-3xl hud-panel border border-cosmic-cyan/20 overflow-hidden flex flex-col items-center justify-center p-4"
        >
          {/* Top HUD badge inside planet box */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-[10px] font-mono text-cosmic-cyan">
            <span className="w-2 h-2 rounded-full bg-cosmic-alien animate-ping" />
            <span>GEO-RADAR // BHUBANESWAR (20.29°N 85.82°E)</span>
          </div>

          <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
            <InteractivePlanet />
          </Canvas>

          <div className="absolute bottom-4 text-center text-[10px] font-mono text-white/30 tracking-widest uppercase pointer-events-none">
            [ HOLOGRAPHIC TERRESTRIAL RADAR — ROTATING GEOSPHERE ]
          </div>
        </motion.div>

        {/* Right Column: Holographic Mission Card (7 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="p-6 md:p-8 rounded-3xl hud-panel-strong border border-cosmic-cyan/30 hud-corner-accent shadow-2xl">
            {/* Identity & Role Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-white/10 text-xs font-mono">
              <div>
                <span className="text-white/40 block mb-1">CALLSIGN / IDENTITY</span>
                <span className="font-display font-bold text-base text-white tracking-wider">
                  {profile.callsign}
                </span>
              </div>
              <div>
                <span className="text-white/40 block mb-1">PRIMARY DESIGNATION</span>
                <span className="font-display font-semibold text-sm text-cosmic-cyan">
                  {profile.title}
                </span>
              </div>
              <div>
                <span className="text-white/40 block mb-1">DEPLOYMENT BASE</span>
                <span className="text-white/90">{profile.location}</span>
              </div>
              <div>
                <span className="text-white/40 block mb-1">STATUS</span>
                <span className="text-cosmic-alien font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cosmic-alien" />
                  AVAILABLE FOR ENGINEERING MISSIONS
                </span>
              </div>
            </div>

            {/* Mission Summary Statement */}
            <div className="pt-6">
              <span className="text-xs font-mono text-cosmic-cyan tracking-widest uppercase block mb-2">
                MISSION DIRECTIVE & SUMMARY
              </span>
              <p className="text-sm md:text-base text-white/80 font-body leading-relaxed">
                {profile.summary}
              </p>
            </div>

            {/* Key Competency Checkmarks */}
            <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-white/70">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cosmic-alien shrink-0" />
                <span>Full SDLC: Design, Test, Deploy, Operate</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cosmic-alien shrink-0" />
                <span>Microservices & High Concurrency</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cosmic-alien shrink-0" />
                <span>AWS Cloud Infrastructure (EC2, RDS, S3)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cosmic-alien shrink-0" />
                <span>Geospatial Intelligence & Angular Frontends</span>
              </div>
            </div>
          </div>

          {/* Telemetry Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              const isLong = stat.value.length > 9;
              return (
                <div
                  key={`stat-${i}`}
                  className="px-2 py-3.5 sm:px-2.5 sm:py-4 rounded-2xl hud-panel border border-white/10 text-center hover:border-cosmic-cyan/40 transition-all flex flex-col items-center justify-center min-w-0 overflow-hidden"
                >
                  <Icon className="w-4 h-4 text-cosmic-cyan mx-auto mb-1.5 shrink-0" />
                  <div
                    className={`font-display font-bold text-white w-full truncate ${
                      isLong
                        ? 'text-[11px] sm:text-[10px] md:text-[11px] xl:text-xs tracking-tighter'
                        : 'text-xs sm:text-xs md:text-sm tracking-tight'
                    }`}
                    title={stat.value}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[8px] sm:text-[9px] font-mono text-white/40 tracking-wider mt-1 w-full truncate uppercase">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

