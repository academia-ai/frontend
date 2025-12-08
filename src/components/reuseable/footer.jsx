import React from 'react';
import { Cpu, Twitter, Linkedin, Github } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
               <div className="bg-brand-500 p-1 rounded">
                   <Cpu className="h-5 w-5 text-white" />
               </div>
               <span className="font-bold text-xl text-white">ResuMate<span className="text-brand-400">.ai</span></span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Empowering job seekers with AI-driven insights to land their dream jobs faster and with confidence.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-brand-400">Features</a></li>
              <li><a href="#" className="hover:text-brand-400">Pricing</a></li>
              <li><a href="#" className="hover:text-brand-400">Chrome Extension</a></li>
              <li><a href="#" className="hover:text-brand-400">Roadmap</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-brand-400">About Us</a></li>
              <li><a href="#" className="hover:text-brand-400">Blog</a></li>
              <li><a href="#" className="hover:text-brand-400">Careers</a></li>
              <li><a href="#" className="hover:text-brand-400">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-brand-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-400">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-600 text-sm">© {new Date().getFullYear()} ResuMate AI. All rights reserved.</p>
            <div className="flex space-x-6">
                <a href="#" className="text-slate-500 hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a>
                <a href="#" className="text-slate-500 hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></a>
                <a href="#" className="text-slate-500 hover:text-white transition-colors"><Github className="h-5 w-5" /></a>
            </div>
        </div>
      </div>
    </footer>
  );
};