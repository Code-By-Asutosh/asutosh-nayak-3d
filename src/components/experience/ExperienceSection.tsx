import { motion } from 'framer-motion';
import { Rocket, Calendar, MapPin, CheckCircle2, ChevronRight, Activity } from 'lucide-react';
import { PORTFOLIO_DATA, ExperienceItem } from '../../data/portfolioData';

export default function ExperienceSection() {
  const experiences = PORTFOLIO_DATA.experiences;

  return (
    <section id="experience" className="relative py-28 px-4 md:px-8 max-w-7xl mx-auto z-10 select-none">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center md:text-left"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cosmic-cyan/10 border border-cosmic-cyan/30 text-cosmic-cyan font-mono text-xs tracking-widest uppercase mb-3">
          <Rocket className="w-3.5 h-3.5" />
          <span>04 // FLIGHT LOGS</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-wide">
          SPACE FLIGHT <span className="text-glow-cyan text-cosmic-cyan">TRAJECTORY.</span>
        </h2>
        <p className="mt-2 text-sm md:text-base text-cyan-200/60 font-body max-w-2xl">
          Chronological flight log of production deployments, platform scaling, and engineering leadership across organizations.
        </p>
      </motion.div>

      {/* Orbital Timeline Container */}
      <div className="relative pl-6 md:pl-10 border-l-2 border-cosmic-cyan/30 space-y-16">
        {experiences.map((exp: ExperienceItem, idx: number) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="relative"
          >
            {/* Orbital Waypoint Node on Line */}
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-[#030014] border-2 border-cosmic-cyan flex items-center justify-center shadow-glow-cyan">
              <span className="w-2 h-2 rounded-full bg-cosmic-alien animate-pulse" />
            </div>

            {/* Mission Log Card */}
            <div className="p-6 md:p-8 rounded-3xl hud-panel-strong border border-cosmic-cyan/30 hud-corner-accent shadow-2xl">
              {/* Top Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="font-display font-black text-2xl text-white tracking-wide">
                    {exp.company}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-cosmic-alien/15 border border-cosmic-alien/30 text-cosmic-alien font-mono text-[10px] tracking-wider font-bold">
                    {exp.missionStatus}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/50">
                  <span className="flex items-center gap-1.5 text-cyan-200/80">
                    <Calendar className="w-3.5 h-3.5 text-cosmic-cyan" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cosmic-purple" />
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Role & Project Title */}
              <div className="mt-4">
                <h3 className="font-display font-bold text-lg md:text-xl text-cosmic-cyan">
                  {exp.role}
                </h3>
                <p className="text-xs font-mono text-white/60 mt-1 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cosmic-alien" />
                  <span>PROJECT: {exp.project}</span>
                </p>
              </div>

              {/* Telemetry Chips */}
              <div className="mt-4 flex flex-wrap gap-2">
                {exp.telemetryMetrics.map((met, mIdx) => (
                  <div
                    key={`metric-${mIdx}`}
                    className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-xs font-mono"
                  >
                    <span className="text-white/40">{met.label}: </span>
                    <span className="text-cosmic-cyan font-semibold">{met.value}</span>
                  </div>
                ))}
              </div>

              {/* Responsibilities & Achievements */}
              <div className="mt-6 space-y-2.5">
                <span className="text-xs font-mono text-white/40 tracking-wider uppercase block">
                  FLIGHT DELIVERABLES & ACCOMPLISHMENTS
                </span>
                {exp.responsibilities.map((resp, rIdx) => (
                  <div key={`resp-${rIdx}`} className="flex items-start gap-2.5 text-sm font-body text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-cosmic-alien shrink-0 mt-1" />
                    <span className="leading-relaxed">{resp}</span>
                  </div>
                ))}
              </div>

              {/* Technology Stack Tags */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <span className="text-[10px] font-mono text-white/40 tracking-wider uppercase block mb-2">
                  TELEMETRY TECH STACK
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {exp.technologies.map((t, tIdx) => (
                    <span
                      key={`exp-t-${tIdx}`}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-cyan-200/90"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

