import React from "react";
import { ArrowRight, PlayCircle } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-700/50 mb-8 backdrop-blur-sm"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-medium text-slate-300">
            New: Gemini 2.5 Analysis Engine
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8"
        >
          Your Resume, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-purple-400 to-pink-400">
            Reimagined by AI
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-4 text-xl text-slate-400 max-w-2xl mx-auto mb-10"
        >
          Stop guessing what recruiters want. Get instant, AI-powered feedback
          to optimize your resume, beat the ATS, and land 3x more interviews.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#demo"
            className="group bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-2"
          >
            Analyze My Resume
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          <button className="px-8 py-4 rounded-full font-semibold text-white border border-slate-700 hover:bg-slate-800 transition-all flex items-center gap-2">
            <PlayCircle className="w-5 h-5" />
            Watch Demo
          </button>
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-20 relative mx-auto max-w-5xl"
        >
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-2 shadow-2xl shadow-brand-900/50">
            <div className="rounded-lg overflow-hidden bg-slate-950 aspect-[16/9] relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 opacity-50" />

              {/* Abstract Dashboard */}
              <div className="relative z-10 grid grid-cols-12 gap-4 w-3/4 h-3/4 opacity-80">
                <div className="col-span-4 bg-slate-800/50 rounded-lg animate-pulse" />
                <div className="col-span-8 grid grid-rows-3 gap-4">
                  <div className="row-span-1 bg-slate-800/50 rounded-lg" />
                  <div className="row-span-2 bg-slate-800/30 rounded-lg border border-slate-700/50" />
                </div>
              </div>

              {/* Label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-slate-500 font-mono text-sm">
                  Dashboard UI Preview
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
