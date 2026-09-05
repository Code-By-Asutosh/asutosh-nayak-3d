import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../../utils/audio';

interface LoadingScreenProps {
  onComplete: () => void;
}

const SYSTEM_CHECKS = [
  'INITIALIZING QUANTUM TELEMETRY CORE...',
  'CALIBRATING CORE JAVA (8+) & CONCURRENCY ENGINE...',
  'LINKING SPRING BOOT & MICROSERVICES REPOSITORY...',
  'VERIFYING AWS CLOUD INFRASTRUCTURE (EC2/RDS/S3)...',
  'SYNCHRONIZING GEOSPATIAL MAPBOX & LOGISTICS STREAMS...',
  'ORBITAL RECON CRUISER ONLINE. ALL SYSTEMS NOMINAL.',
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentCheckIdx, setCurrentCheckIdx] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDone(true);
          setTimeout(() => {
            onComplete();
          }, 400);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 4;
        const target = Math.min(next, 100);

        // Update system checks based on progress
        const checkIdx = Math.min(
          Math.floor((target / 100) * SYSTEM_CHECKS.length),
          SYSTEM_CHECKS.length - 1
        );
        setCurrentCheckIdx(checkIdx);

        return target;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleManualEnter = () => {
    soundEngine.playWarp();
    onComplete();
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#030014] text-cosmic-cyan px-6 select-none"
        >
          {/* Background grid */}
          <div className="absolute inset-0 cyber-grid opacity-30" />
          <div className="absolute inset-0 scanlines-overlay opacity-20" />

          {/* Central Reactor HUD Box */}
          <div className="relative z-10 w-full max-w-md p-8 rounded-2xl hud-panel-strong border border-cosmic-cyan/40 hud-corner-accent shadow-glow-cyan">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-cosmic-cyan/20 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-cosmic-alien animate-pulse" />
                <span className="font-display font-bold text-xs tracking-widest text-white">
                  ASUTOSH // SYS.BOOT
                </span>
              </div>
              <span className="font-mono text-xs text-cosmic-cyan/70">V2.4.0</span>
            </div>

            {/* Diagnostic Message */}
            <div className="h-14 flex items-center">
              <p className="font-mono text-xs text-cyan-200/80 tracking-wide leading-relaxed">
                &gt; {SYSTEM_CHECKS[currentCheckIdx]}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between font-mono text-xs text-cosmic-cyan mb-2">
                <span>WARP DRIVE CHARGE</span>
                <span className="font-bold">{progress}%</span>
              </div>
              <div className="h-2 w-full bg-black/60 rounded-full overflow-hidden border border-cosmic-cyan/30 p-[1px]">
                <div
                  className="h-full bg-gradient-to-r from-cosmic-cyan via-cosmic-purple to-cosmic-alien rounded-full transition-all duration-75 shadow-glow-cyan"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Telemetry Status Dots */}
            <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-[10px] font-mono text-white/40">
              <span>SEC: AWS-PROD</span>
              <span>NODE: BHUBANESWAR</span>
              <button
                onClick={handleManualEnter}
                className="text-cosmic-alien hover:underline cursor-pointer transition-colors"
              >
                [SKIP INTRO]
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

