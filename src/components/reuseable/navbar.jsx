import React, { useState, useEffect } from 'react';
import { Box, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';

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
    <nav
      className={`fixed top-0 w-full z-50 border-b border-white/5 backdrop-blur-md transition-colors ${
        isScrolled ? 'bg-zinc-950/90' : 'bg-zinc-950/70'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Logo */}
     <div className="flex items-center gap-2">
  
            <div className="w-5 h-5 rounded bg-zinc-800 border border-white/10 flex items-center justify-center">
         <Box size={14} className="text-white" />
            </div>
            
            <span className="text-sm font-semibold tracking-tight text-zinc-300">
              ACADEMIA.AI
            </span>
          </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-xs text-zinc-400 hover:text-white transition-colors">
            Features
          </a>
          <a href="#process" className="text-xs text-zinc-400 hover:text-white transition-colors">
            Process
          </a>
          <a href="#pricing" className="text-xs text-zinc-400 hover:text-white transition-colors">
            Pricing
          </a>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-4">
          <Link
            to='/auth'
            className="text-xs text-zinc-400 hover:text-white transition-colors hidden sm:block"
          >
            Log in
          </Link>
          <a
            href="#"
            className="bg-white text-black text-xs font-medium px-3 py-1.5 rounded hover:bg-zinc-200 transition-colors"
          >
            Get Started
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-1 text-zinc-400 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-zinc-950/95 border-t border-white/5">
          <div className="flex flex-col px-6 py-4 gap-4">
            <a
              href="#features"
              className="text-xs text-zinc-400 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Features
            </a>
            <a
              href="#process"
              className="text-xs text-zinc-400 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Process
            </a>
            <a
              href="#pricing"
              className="text-xs text-zinc-400 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </a>

            <SignedIn
>            <a
              href="/auth"
              className="text-xs text-zinc-400 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Log in
            </a>

            </SignedIn>

<SignedOut>
            <a
              href="/auth"
              className="bg-white text-black text-xs font-medium px-3 py-1.5 rounded hover:bg-zinc-200 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </a>

            </SignedOut>

          </div>
        </div>
      )}
    </nav>
  );
};
