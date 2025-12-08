import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="bg-brand-500 p-1.5 rounded-lg">
                <Cpu className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">ResuMate<span className="text-brand-400">.ai</span></span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#features" className="hover:text-brand-400 text-slate-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-brand-400 text-slate-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">How it Works</a>
              <a href="#testimonials" className="hover:text-brand-400 text-slate-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">Testimonials</a>
              <a href="#pricing" className="hover:text-brand-400 text-slate-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">Pricing</a>
            </div>
          </div>

          <div className="hidden md:block">
            <button className="bg-white text-slate-900 px-5 py-2 rounded-full font-semibold text-sm hover:bg-slate-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              Get Started
            </button>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#features" className="hover:bg-slate-800 text-white block px-3 py-2 rounded-md text-base font-medium">Features</a>
            <a href="#how-it-works" className="hover:bg-slate-800 text-white block px-3 py-2 rounded-md text-base font-medium">How it Works</a>
            <a href="#testimonials" className="hover:bg-slate-800 text-white block px-3 py-2 rounded-md text-base font-medium">Testimonials</a>
            <a href="#pricing" className="hover:bg-slate-800 text-white block px-3 py-2 rounded-md text-base font-medium">Pricing</a>
            <button className="w-full text-left bg-brand-600 text-white block px-3 py-2 rounded-md text-base font-medium mt-4">
                Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};