import { Box } from 'lucide-react';
import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-zinc-950 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">


{/* Logo */}
        <div className="flex items-center gap-2">

          <div className="w-5 h-5 rounded bg-zinc-800 border border-white/10 flex items-center justify-center">
       <Box size={14} className="text-white" />
          </div>

          <span className="text-sm font-semibold tracking-tight text-zinc-300">
            ACADEMIA.AI
          </span>
        </div>

        <div className="flex gap-6">
          <a
            href="#"
            className="text-xs text-zinc-500 hover:text-white transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-xs text-zinc-500 hover:text-white transition-colors"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-xs text-zinc-500 hover:text-white transition-colors"
          >
            Twitter
          </a>
          <a
            href="#"
            className="text-xs text-zinc-500 hover:text-white transition-colors"
          >
            GitHub
          </a>
        </div>

        <p className="text-[10px] text-zinc-600">
          © 2023 Academia AI Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
