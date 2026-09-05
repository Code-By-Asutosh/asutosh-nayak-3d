import { useState, useEffect } from 'react';
import LoadingScreen from './components/ui/LoadingScreen';
import CustomCursor from './components/ui/CustomCursor';
import SpaceBackground from './components/3d/SpaceBackground';
import HudNavbar from './components/navigation/HudNavbar';
import HeroSection from './components/hero/HeroSection';
import AboutSection from './components/about/AboutSection';
import SkillsSection from './components/skills/SkillsSection';
import ProjectsSection from './components/projects/ProjectsSection';
import ExperienceSection from './components/experience/ExperienceSection';
import EducationSection from './components/education/EducationSection';
import ContactSection from './components/contact/ContactSection';
import Footer from './components/footer/Footer';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25, rootMargin: '-60px 0px -40% 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isLoaded]);

  return (
    <div className="relative min-h-screen bg-[#030014] text-white overflow-x-hidden font-body selection:bg-cosmic-cyan/30 selection:text-cyan-200">
      {/* Sci-Fi Targeting Reticle Cursor */}
      <CustomCursor />

      {/* Cinematic Loading Boot Screen */}
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}

      {/* Fixed 3D Cosmic Space Canvas (Nebula + Starfield) */}
      <SpaceBackground />

      {/* Floating HUD Navigation */}
      <HudNavbar activeSection={activeSection} />

      {/* Main Cosmic Exploration Journey */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

