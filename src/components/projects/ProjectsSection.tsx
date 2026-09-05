import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Orbit, ArrowRight, ShieldCheck, Database, Server } from 'lucide-react';
import ProjectGalaxy3D from '../3d/ProjectGalaxy3D';
import { PORTFOLIO_DATA, ProjectItem } from '../../data/portfolioData';
import { soundEngine } from '../../utils/audio';

export default function ProjectsSection() {
  const projects = PORTFOLIO_DATA.projects;
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const handleOpenDossier = (project: ProjectItem) => {
    soundEngine.playWarp();
    setSelectedProject(project);
  };

  const handleCloseDossier = () => {
    soundEngine.playBlip(500, 'sine', 0.05);
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="relative py-28 px-4 md:px-8 max-w-7xl mx-auto z-10 select-none">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center md:text-left"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cosmic-cyan/10 border border-cosmic-cyan/30 text-cosmic-cyan font-mono text-xs tracking-widest uppercase mb-3">
          <Orbit className="w-3.5 h-3.5" />
          <span>03 // CELESTIAL ARCHIVE</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-wide">
          PROJECT <span className="text-glow-cyan text-cosmic-cyan">GALAXY.</span>
        </h2>
        <p className="mt-2 text-sm md:text-base text-cyan-200/60 font-body max-w-2xl">
          Major production missions and systems. Each celestial world represents an architected platform operating in real-world environments.
        </p>
      </motion.div>

      {/* 3D Project Celestial Universe Canvas */}
      <div className="h-[380px] md:h-[460px] rounded-3xl hud-panel border border-cosmic-cyan/20 overflow-hidden relative flex items-center justify-center mb-12">
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-[10px] font-mono text-cosmic-cyan">
          <span className="w-2 h-2 rounded-full bg-cosmic-alien animate-ping" />
          <span>PROJECT SYSTEM // 3 CELESTIAL WORLDS</span>
        </div>

        <Canvas camera={{ position: [0, 1.5, 7], fov: 45 }} dpr={[1, 2]}>
          <ProjectGalaxy3D onSelectProject={handleOpenDossier} />
        </Canvas>

        <div className="absolute bottom-4 text-center text-[10px] font-mono text-white/30 tracking-widest uppercase pointer-events-none">
          [ 3D PROJECT CLUSTER — CLICK ANY PLANET TO DOCK & EXPAND MISSION DOSSIER ]
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((proj: ProjectItem, i: number) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-2xl hud-panel border border-white/10 hover:border-cosmic-cyan/40 p-6 flex flex-col justify-between transition-all group"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-3">
                <span className="text-cosmic-cyan font-bold tracking-wider">{proj.company}</span>
                <span className="px-2 py-0.5 rounded-full bg-cosmic-alien/10 text-cosmic-alien border border-cosmic-alien/30 text-[10px]">
                  {proj.status}
                </span>
              </div>

              <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-cosmic-cyan transition-colors break-words">
                {proj.title}
              </h3>
              <p className="text-xs font-mono text-cyan-200/60 mt-1 mb-3 break-words">
                {proj.subtitle}
              </p>
              <p className="text-sm font-body text-white/70 line-clamp-3 leading-relaxed mb-4">
                {proj.problem}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {proj.technologies.slice(0, 4).map((tech, tIdx) => (
                  <span
                    key={`${proj.id}-t-${tIdx}`}
                    className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-white/70"
                  >
                    {tech}
                  </span>
                ))}
                {proj.technologies.length > 4 && (
                  <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-white/40">
                    +{proj.technologies.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* Dock Button */}
            <button
              onClick={() => handleOpenDossier(proj)}
              className="w-full py-2.5 rounded-xl hud-panel text-xs font-mono text-cosmic-cyan hover:text-white hover:bg-cosmic-cyan/20 border border-cosmic-cyan/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <span>DOCK & VIEW DOSSIER</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Cinematic Holographic Mission Dossier Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-10 rounded-3xl hud-panel-strong border border-cosmic-cyan/40 hud-corner-accent shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseDossier}
                className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                aria-label="Close dossier"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-2 text-xs font-mono text-cosmic-cyan mb-2">
                <span className="w-2 h-2 rounded-full bg-cosmic-alien animate-ping" />
                <span>MISSION DOSSIER // {selectedProject.status}</span>
              </div>
              <h3 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-white break-words">
                {selectedProject.title}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-cosmic-purple mt-1 mb-6 break-words">
                {selectedProject.subtitle} • {selectedProject.company}
              </p>

              {/* Problem & Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-2xl bg-black/40 border border-white/10 mb-6">
                <div>
                  <span className="text-xs font-mono text-rose-400 tracking-wider uppercase block mb-1.5">
                    CHALLENGE / PROBLEM STATEMENT
                  </span>
                  <p className="text-sm font-body text-white/80 leading-relaxed">
                    {selectedProject.problem}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-mono text-cosmic-alien tracking-wider uppercase block mb-1.5">
                    ENGINEERING SOLUTION
                  </span>
                  <p className="text-sm font-body text-white/80 leading-relaxed">
                    {selectedProject.solution}
                  </p>
                </div>
              </div>

              {/* SYSTEM ARCHITECTURE VISUALIZATION */}
              <div className="p-6 rounded-2xl bg-black/50 border border-cosmic-cyan/20 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-cosmic-cyan flex items-center gap-2">
                    <Server className="w-4 h-4 text-cosmic-cyan" />
                    SYSTEM ARCHITECTURE PIPELINE
                  </span>
                  <span className="text-[10px] font-mono text-white/40">
                    RESUME SPECIFIED FLOW
                  </span>
                </div>

                {/* Pipeline Steps Flow */}
                <div className="flex flex-col sm:flex-row items-center gap-2 overflow-x-auto py-2">
                  {selectedProject.architecture.flow.map((step, sIdx) => (
                    <div
                      key={`arch-${sIdx}`}
                      className="flex items-center gap-2 w-full sm:w-auto shrink-0"
                    >
                      <div className="px-3.5 py-2 rounded-xl hud-panel border border-cosmic-cyan/30 text-xs font-mono text-white/90 text-center flex-1 sm:flex-initial whitespace-normal break-words max-w-full">
                        {step}
                      </div>
                      {sIdx < selectedProject.architecture.flow.length - 1 && (
                        <ArrowRight className="w-4 h-4 text-cosmic-cyan hidden sm:block shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Highlights */}
              <div className="mb-6">
                <span className="text-xs font-mono text-white/50 tracking-wider uppercase block mb-3">
                  CORE DELIVERABLES & IMPACT
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedProject.keyHighlights.map((hl, hIdx) => (
                    <div
                      key={`hl-${hIdx}`}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 text-xs font-mono text-white/80"
                    >
                      <ShieldCheck className="w-4 h-4 text-cosmic-alien shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Complete Technologies */}
              <div className="mb-8">
                <span className="text-xs font-mono text-white/50 tracking-wider uppercase block mb-2">
                  MISSION TECHNOLOGIES
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((t, idx) => (
                    <span
                      key={`tech-${idx}`}
                      className="px-3 py-1 rounded-lg bg-cosmic-cyan/10 border border-cosmic-cyan/30 text-xs font-mono text-cosmic-cyan"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
                <button
                  onClick={handleCloseDossier}
                  className="px-5 py-2 rounded-xl hud-panel text-xs font-mono text-white/70 hover:text-white cursor-pointer"
                >
                  UNDOCK // RETURN TO GALAXY
                </button>

                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-xl bg-cosmic-cyan hover:bg-cyan-300 text-[#030014] font-display font-bold text-xs tracking-wider flex items-center gap-2 shadow-glow-cyan transition-all"
                  >
                    <span>LAUNCH LIVE SYSTEM</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

