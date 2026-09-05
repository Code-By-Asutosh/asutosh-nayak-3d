import { ArrowUp, Satellite } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { soundEngine } from '../../utils/audio';

export default function Footer() {
  const profile = PORTFOLIO_DATA.profile;

  const scrollToTop = () => {
    soundEngine.playWarp();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#030014]/80 backdrop-blur-xl py-10 px-4 md:px-8 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Telemetry */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cosmic-cyan/10 border border-cosmic-cyan/30 flex items-center justify-center text-cosmic-cyan">
            <Satellite className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm text-white">
                {profile.callsign}
              </span>
              <span className="text-[10px] font-mono text-cosmic-alien">
                // {profile.status}
              </span>
            </div>
            <div className="text-[10px] font-mono text-white/40">
              ORBIT: {profile.coordinates} • {profile.location}
            </div>
          </div>
        </div>

        {/* Middle Note */}
        <div className="text-center text-xs font-mono text-white/40">
          DESIGNED FOR COSMIC EXPLORATION & SCALABLE ENGINEERING
        </div>

        {/* Warp to Top */}
        <button
          onClick={scrollToTop}
          className="px-4 py-2 rounded-xl hud-panel border border-cosmic-cyan/30 text-xs font-mono text-cosmic-cyan hover:text-white flex items-center gap-2 transition-all cursor-pointer group"
          title="Return to Command Bridge"
        >
          <span>WARP TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
}

