import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Satellite, Compass } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface HudNavbarProps {
  activeSection: string;
}

const NAV_LINKS = [
  { id: 'hero', label: '00 COMMAND', short: 'CMD' },
  { id: 'about', label: '01 PROFILE', short: 'PROFILE' },
  { id: 'skills', label: '02 TECH-GALAXY', short: 'SKILLS' },
  { id: 'projects', label: '03 CELESTIAL-PROJECTS', short: 'PROJECTS' },
  { id: 'experience', label: '04 FLIGHT-LOGS', short: 'LOGS' },
  { id: 'education', label: '05 ACADEMIC-ORBIT', short: 'ORBIT' },
  { id: 'contact', label: '06 TRANSMIT', short: 'CONTACT' },
];

export default function HudNavbar({ activeSection }: HudNavbarProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMuted(soundEngine.getMuted());
  }, []);

  const handleAudioToggle = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const scrollTo = (id: string) => {
    soundEngine.playBlip(700, 'sine', 0.04);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Global Scroll Progress Bar (Accessible & CSS driven with fallback) */}
      <div
        id="hud-global-progress"
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cosmic-cyan via-cosmic-purple to-cosmic-alien z-[100] shadow-glow-cyan"
      />

      {/* Floating HUD Navbar */}
      <header className="fixed top-3 left-3 right-3 md:top-4 md:left-6 md:right-6 z-50 transition-all duration-300">
        <nav className="mx-auto max-w-7xl px-4 py-2.5 rounded-2xl hud-panel-strong border border-cosmic-cyan/20 hud-corner-accent flex items-center justify-between shadow-2xl">
          {/* Brand / Callsign */}
          <div
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cosmic-cyan/20 to-cosmic-purple/30 border border-cosmic-cyan/40 flex items-center justify-center text-cosmic-cyan group-hover:scale-105 group-hover:border-cosmic-alien transition-all">
              <Satellite className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-xs md:text-sm tracking-wider text-white group-hover:text-cosmic-cyan transition-colors">
                  ASUTOSH
                </span>
                <span className="text-[10px] font-mono text-cosmic-cyan/70">// SYS</span>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-[9px] font-mono text-white/40">
                <span className="w-1.5 h-1.5 rounded-full bg-cosmic-alien animate-ping" />
                <span>ONLINE: 20.29°N 85.82°E</span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`px-2 xl:px-3 py-1.5 rounded-lg text-[11px] xl:text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-cosmic-cyan/15 text-cosmic-cyan border border-cosmic-cyan/40 shadow-glow-cyan'
                      : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className="hidden xl:inline">{link.label}</span>
                  <span className="xl:hidden">{link.short}</span>
                </button>
              );
            })}
          </div>

          {/* Action Controls: Audio Toggle & Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Audio Synth Toggle Button */}
            <button
              onClick={handleAudioToggle}
              className={`p-2 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                !isMuted
                  ? 'bg-cosmic-cyan/20 border-cosmic-cyan text-cosmic-cyan shadow-glow-cyan'
                  : 'bg-white/5 border-white/10 text-white/50 hover:text-white'
              }`}
              title={isMuted ? 'Engage Subspace Audio Synthesizer' : 'Mute Subspace Audio'}
              aria-label="Toggle procedural audio"
            >
              {!isMuted ? <Volume2 className="w-4 h-4 text-cosmic-alien" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline text-[10px] tracking-wider">
                {!isMuted ? 'AUDIO: ON' : 'AUDIO: OFF'}
              </span>
            </button>

            {/* Direct Quick Transmission CTA */}
            <button
              onClick={() => scrollTo('contact')}
              className="hidden sm:flex px-3 py-1.5 rounded-xl bg-gradient-to-r from-cosmic-cyan/20 to-cosmic-alien/20 hover:from-cosmic-cyan/30 hover:to-cosmic-alien/30 border border-cosmic-alien/40 text-cosmic-alien text-xs font-mono tracking-wider items-center gap-1.5 cursor-pointer shadow-glow-alien transition-all"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>TRANSMIT</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 p-4 rounded-2xl hud-panel-strong border border-cosmic-cyan/30 shadow-2xl flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={`mobile-${link.id}`}
                  onClick={() => scrollTo(link.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider transition-all ${
                    isActive
                      ? 'bg-cosmic-cyan/20 text-cosmic-cyan border border-cosmic-cyan/50 font-bold'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        )}
      </header>
    </>
  );
}

