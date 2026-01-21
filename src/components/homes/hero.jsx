import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FolderGit2,
  BookOpen,
  GraduationCap,
  Bell,
  FileText,
  Award,
  Quote,
  FileCode,
  Table,
  ArrowRight,
  PlayCircle,
  TrendingUp
} from 'lucide-react';
import { dashboardVariants, glowVariants, itemVariants } from '../../lib';

const Hero = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };




 
  return (
    <section className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center md:mt-20 mt-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-8 hover:bg-white/10 transition-colors cursor-default"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="flex h-2 w-2 relative">
          <motion.span
            className="absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"
            animate={{ scale: [1, 2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
        </span>
        <span className="text-xs text-zinc-300 font-medium tracking-tight">V2.0: Thesis Architect engine live</span>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-semibold tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white via-white to-zinc-500 mb-6 pb-2"
        >
          Engineer your degree. <br />
          <span className="text-zinc-500">Without the burnout.</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg text-zinc-400 max-w-xl mx-auto mb-10 leading-relaxed font-light"
        >
          The intelligent workspace for university students. Generate project structures, synthesize research citations, and refactor code instantly.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#f4f4f5" }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto h-10 px-6 rounded-md bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
          >
            Start Building <ArrowRight size={16} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#27272a" }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto h-10 px-6 rounded-md border
             border-zinc-700 bg-zinc-900/50 text-zinc-300 text-sm font-medium
              hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
          >
            <PlayCircle size={16} /> Watch Demo
          </motion.button>

        </motion.div>

      </motion.div>

      {/* UI Mockup: Dashboard */}
   <motion.div
  variants={dashboardVariants}
  initial="hidden"
  animate="visible"
  whileHover="hover"
  className="mt-20 w-full max-w-4xl relative group"
>
  {/* Glow Shadow */}
  <motion.div
    variants={glowVariants}
    initial="hidden"
    animate="visible"
    className="absolute -inset-1 rounded-xl
      shadow-[0_0_40px_10px_rgba(99,102,241,0.35),
              0_0_60px_20px_rgba(168,85,247,0.25),
              0_0_80px_30px_rgba(236,72,153,0.2)]
      opacity-25 group-hover:opacity-50
      transition duration-700"
  />

  <img
    src="/academia.ai.png"
    alt=""
    className="w-full h-full relative rounded-xl"
  />
</motion.div>

      
      {/* Brands */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="mt-20 pt-10 border-t border-white/5 w-full"
      >
        <p className="text-xs text-zinc-500 mb-6 font-medium">TRUSTED BY STUDENTS FROM</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale">
          {["MIT", "STANFORD", "OXFORD", "CAMBRIDGE"].map((uni, index) => (
            <motion.div
              key={uni}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.4, y: 0 }}
              transition={{ delay: 2.2 + index * 0.1, duration: 0.5 }}
              whileHover={{ opacity: 0.8, scale: 1.1 }}
              className="flex items-center gap-2 text-lg font-semibold tracking-tighter text-white"
            >
              <GraduationCap size={20} />
              {uni}
            </motion.div>
          ))}
        </div>
      </motion.div>

    </section>
  );
};

export default Hero;
