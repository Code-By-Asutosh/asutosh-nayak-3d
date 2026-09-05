import { motion } from 'framer-motion';
import { GraduationCap, Award, CheckCircle, Clock } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export default function EducationSection() {
  const education = PORTFOLIO_DATA.education;
  const certifications = PORTFOLIO_DATA.certifications;

  return (
    <section id="education" className="relative py-28 px-4 md:px-8 max-w-7xl mx-auto z-10 select-none">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-14 text-center md:text-left"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cosmic-purple/10 border border-cosmic-purple/30 text-cosmic-purple font-mono text-xs tracking-widest uppercase mb-3">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>05 // ACADEMIC ORBIT</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-wide">
          ACADEMIC <span className="text-glow-purple text-cosmic-purple">CREDENTIALS.</span>
        </h2>
        <p className="mt-2 text-sm md:text-base text-cyan-200/60 font-body max-w-2xl">
          Formal university education, specialized full-stack engineering training, and cloud engineering certifications.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Education Orbit Card */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cosmic-cyan mb-2">
            <GraduationCap className="w-4 h-4 text-cosmic-cyan" />
            <span>ACADEMIC FOUNDATION & TRAINING</span>
          </div>

          {education.map((item, idx) => (
            <motion.div
              key={`edu-${idx}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl hud-panel border border-white/10 hover:border-cosmic-cyan/30 transition-all"
            >
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="px-2 py-0.5 rounded bg-cosmic-cyan/10 border border-cosmic-cyan/30 text-cosmic-cyan text-[10px]">
                  {item.badge}
                </span>
                <span className="text-white/40">{item.year}</span>
              </div>

              <h3 className="font-display font-bold text-base sm:text-lg text-white break-words">
                {item.degree}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-cyan-200/80 mt-1 break-words">
                {item.institution}
              </p>
              <p className="text-xs font-body text-white/60 mt-3 leading-relaxed">
                {item.specialization}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Certifications Orbit Card */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cosmic-purple mb-2">
            <Award className="w-4 h-4 text-cosmic-purple" />
            <span>CLOUD & SYSTEM CERTIFICATIONS</span>
          </div>

          {certifications.map((cert, idx) => (
            <motion.div
              key={`cert-${idx}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl hud-panel-strong border border-cosmic-purple/30 hud-corner-accent shadow-glow-purple"
            >
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  {cert.status.toUpperCase()} ({cert.targetYear})
                </span>
                <span className="text-white/40 font-mono text-[10px]">
                  {cert.issuer}
                </span>
              </div>

              <h3 className="font-display font-bold text-base sm:text-lg text-white break-words">
                {cert.name}
              </h3>
              <p className="text-xs font-mono text-cosmic-cyan mt-1">
                Domain: {cert.credentialType}
              </p>

              <div className="mt-4 pt-4 border-t border-white/10 text-xs font-mono text-white/60 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-cosmic-alien shrink-0" />
                <span>Active production deployment and architecture experience on AWS</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

