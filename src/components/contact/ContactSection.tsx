import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, Send, Copy, Check, Radio, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { soundEngine } from '../../utils/audio';

export default function ContactSection() {
  const profile = PORTFOLIO_DATA.profile;
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [dispatchStatus, setDispatchStatus] = useState<'idle' | 'transmitting' | 'dispatched'>('idle');

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    soundEngine.playBlip(950, 'sine', 0.05);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playWarp();
    setDispatchStatus('transmitting');
    setTimeout(() => {
      setDispatchStatus('dispatched');
      setFormData({ name: '', email: '', message: '' });
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-28 px-4 md:px-8 max-w-7xl mx-auto z-10 select-none">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-14 text-center md:text-left"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cosmic-alien/10 border border-cosmic-alien/30 text-cosmic-alien font-mono text-xs tracking-widest uppercase mb-3">
          <Radio className="w-3.5 h-3.5" />
          <span>06 // SUBSPACE LINK</span>
        </div>
        <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-wide">
          START A <span className="text-glow-alien text-cosmic-alien">NEW MISSION.</span>
        </h2>
        <p className="mt-2 text-sm md:text-base text-cyan-200/60 font-body max-w-2xl">
          Ready to architect high-throughput backend services or scale distributed systems? Initiate subspace communications below.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Badges & Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 md:p-8 rounded-3xl hud-panel-strong border border-cosmic-alien/30 hud-corner-accent shadow-2xl">
            <span className="text-xs font-mono text-cosmic-alien tracking-wider uppercase block mb-4">
              VERIFIED COMMUNICATION CHANNELS
            </span>

            {/* Email Card */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-cosmic-cyan/40 transition-all flex items-center justify-between gap-2 mb-3 min-w-0">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 rounded-xl bg-cosmic-cyan/10 border border-cosmic-cyan/30 flex items-center justify-center text-cosmic-cyan shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-mono text-white/40 block">SUBSPACE EMAIL</span>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-xs sm:text-sm font-mono text-white hover:text-cosmic-cyan transition-colors truncate block"
                    title={profile.email}
                  >
                    {profile.email}
                  </a>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(profile.email, 'email')}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all cursor-pointer shrink-0"
                title="Copy email to clipboard"
                aria-label="Copy email"
              >
                {copiedField === 'email' ? (
                  <Check className="w-4 h-4 text-cosmic-alien" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Phone Card */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-cosmic-purple/40 transition-all flex items-center justify-between gap-2 mb-3 min-w-0">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 rounded-xl bg-cosmic-purple/10 border border-cosmic-purple/30 flex items-center justify-center text-cosmic-purple shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-mono text-white/40 block">DIRECT COMMS</span>
                  <a
                    href={`tel:${profile.phone.replace(/\s/g, '')}`}
                    className="text-xs sm:text-sm font-mono text-white hover:text-cosmic-purple transition-colors truncate block"
                    title={profile.phone}
                  >
                    {profile.phone}
                  </a>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(profile.phone, 'phone')}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all cursor-pointer shrink-0"
                title="Copy phone number"
                aria-label="Copy phone"
              >
                {copiedField === 'phone' ? (
                  <Check className="w-4 h-4 text-cosmic-alien" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Social Links Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl hud-panel border border-white/10 hover:border-cosmic-cyan/50 text-xs font-mono text-white flex items-center gap-2.5 transition-all group"
              >
                <Linkedin className="w-4 h-4 text-cosmic-cyan group-hover:scale-110 transition-transform" />
                <span>LINKEDIN</span>
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl hud-panel border border-white/10 hover:border-cosmic-alien/50 text-xs font-mono text-white flex items-center gap-2.5 transition-all group"
              >
                <Github className="w-4 h-4 text-cosmic-alien group-hover:scale-110 transition-transform" />
                <span>GITHUB</span>
              </a>
            </div>

            {/* Audio Wave Frequency Graphic */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
              <span>FREQUENCY: 2450.88 MHz</span>
              <div className="flex items-end gap-1 h-3">
                {[4, 10, 6, 12, 8, 3, 9].map((h, i) => (
                  <span
                    key={`bar-${i}`}
                    className="w-1 bg-cosmic-alien rounded-full animate-pulse"
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Subspace Transmission Dispatch Form (7 cols) */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleFormSubmit}
            className="p-6 md:p-8 rounded-3xl hud-panel border border-white/15 shadow-2xl space-y-5"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="font-display font-bold text-sm text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cosmic-alien" />
                SUBSPACE TRANSMISSION DISPATCH CONSOLE
              </span>
              <span className="text-[10px] font-mono text-cosmic-cyan">ENCRYPTED // TLS</span>
            </div>

            {dispatchStatus === 'dispatched' ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-cosmic-alien/20 border border-cosmic-alien text-cosmic-alien flex items-center justify-center mx-auto shadow-glow-alien">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-lg text-white">
                  TRANSMISSION DISPATCHED
                </h4>
                <p className="text-xs font-mono text-white/60 max-w-sm mx-auto">
                  Your signal has been encoded and dispatched to Asutosh's terminal. Expect acknowledgment shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setDispatchStatus('idle')}
                  className="mt-4 px-4 py-2 rounded-xl hud-panel text-xs font-mono text-cosmic-cyan hover:text-white cursor-pointer"
                >
                  DISPATCH ANOTHER PACKET
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-white/60 block mb-1.5">
                      OPERATOR NAME / CALLSIGN
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Commander Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 focus:border-cosmic-cyan focus:outline-none text-xs font-mono text-white placeholder-white/20 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-white/60 block mb-1.5">
                      SUBSPACE RETURN FREQUENCY (EMAIL)
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="operator@enterprise.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 focus:border-cosmic-cyan focus:outline-none text-xs font-mono text-white placeholder-white/20 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-white/60 block mb-1.5">
                    TRANSMISSION PAYLOAD (MESSAGE)
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your system requirements, backend scaling challenges, or mission opportunity..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 focus:border-cosmic-cyan focus:outline-none text-xs font-mono text-white placeholder-white/20 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={dispatchStatus === 'transmitting'}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cosmic-cyan via-cosmic-purple to-cosmic-alien text-[#030014] font-display font-black text-xs tracking-widest flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-glow-cyan cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {dispatchStatus === 'transmitting'
                      ? 'UPLINK IN PROGRESS...'
                      : 'SEND TRANSMISSION'}
                  </span>
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

