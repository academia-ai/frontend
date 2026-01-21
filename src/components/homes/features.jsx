import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
  Layers,
  BookOpen,
  Code2,
  Quote,
  Presentation,
  FileCode
} from 'lucide-react';

const Features = () => {
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // const cardHoverVariants = {
  //   rest: { scale: 1 },
  //   hover: { scale: 1.02, transition: { duration: 0.2 } }
  // };

  const iconHoverVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1, rotate: 5, transition: { duration: 0.3 } }
  };

  const glowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.1,
      transition: { duration: 1 }
    },
    hover: {
      opacity: 0.15,
      transition: { duration: 0.5 }
    }
  };

  const progressBarVariants = {
    hidden: { width: 0 },
    visible: {
      width: "75%",
      transition: {
        delay: 0.8,
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const slideVariants = {
    hidden: { opacity: 0.5, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="features" className="max-w-6xl mx-auto px-6 mt-32">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        {/* Section Badge */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full
           border border-white/10 bg-white/5 text-xs text-zinc-400 font-medium mb-6 cursor-default"
        >
          <Layers size={12} />
          Capabilities
        </motion.div>
        
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-3">
          Everything for your A+
        </h2>
        <p className="text-zinc-400 text-sm md:text-base max-w-2xl">
          From initial brainstorming to the final bibliography, we handle the tedious parts of academic work.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {/* Card 1: Large */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-2 bg-zinc-900/40 border border-white/10 rounded-xl p-8 hover:border-white/20 transition-all group overflow-hidden relative"
          whileHover="hover"
          initial="rest"
          animate="rest"
        >
          <motion.div
            variants={glowVariants}
            className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"
          />
          <div className="flex flex-col h-full justify-between relative z-10">
            <div className="mb-6">
              <motion.div
                variants={iconHoverVariants}
                className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center mb-4 border border-white/5"
              >
                <BookOpen size={20} className="text-indigo-400" />
              </motion.div>
              <h3 className="text-lg font-medium text-white mb-2">Thesis Architect</h3>
              <p className="text-sm text-zinc-400 max-w-sm">
                Upload your raw notes and let our AI structure a comprehensive thesis outline, complete with literature review suggestions and methodology planning.
              </p>
            </div>
            <motion.div
              initial={{ y: 8 }}
              whileHover={{ y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-zinc-950/50 border border-white/5 rounded-lg p-4 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-1.5 w-1.5 rounded-full bg-green-500"
                />
                <span className="text-[10px] text-zinc-500 uppercase tracking-wide">Outline Generated</span>
              </div>
              <div className="space-y-2">
                <motion.div
                  variants={progressBarVariants}
                  initial="hidden"
                  animate="visible"
                  className="h-2 bg-white rounded"
                />
                <div className="h-2 bg-zinc-800 rounded w-1/2"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          variants={itemVariants}
          className="bg-zinc-900/40 border border-white/10 rounded-xl p-8 hover:border-white/20 transition-all group relative overflow-hidden"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-zinc-900 via-transparent to-transparent z-10" />
          <motion.div
            whileHover={{ scale: 1.1, rotate: -5 }}
            transition={{ duration: 0.3 }}
            className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center mb-4 border border-white/5 relative z-20"
          >
            <Code2 size={20} className="text-teal-400" />
          </motion.div>
          <h3 className="text-lg font-medium text-white mb-2 relative z-20">Code Refactoring</h3>
          <p className="text-sm text-zinc-400 relative z-20 mb-8">
            Optimize your Python or Java code for performance and readability before submission.
          </p>
          
          {/* Abstract Code Visual */}
          <motion.div
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -right-4 bottom-4 opacity-30 group-hover:opacity-50 transition-opacity z-0"
          >
            <FileCode size={120} className="text-zinc-600" />
          </motion.div>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          variants={itemVariants}
          className="bg-zinc-900/40 border border-white/10 rounded-xl p-8 hover:border-white/20 transition-all group"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center mb-4 border border-white/5"
          >
            <Quote size={20} className="text-rose-400" />
          </motion.div>
          <h3 className="text-lg font-medium text-white mb-2">Smart Citations</h3>
          <p className="text-sm text-zinc-400">
            Auto-format bibliographies in APA, MLA, or Harvard style instantly from URL sources.
          </p>
        </motion.div>

        {/* Card 4 */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-2 bg-zinc-900/40 border border-white/10 rounded-xl p-8 hover:border-white/20 transition-all group flex flex-col md:flex-row gap-6 items-center"
          whileHover="hover"
          initial="rest"
          animate="rest"
        >
          <div className="flex-1">
            <motion.div
              variants={iconHoverVariants}
              className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center mb-4 border border-white/5"
            >
              <Presentation size={20} className="text-orange-400" />
            </motion.div>
            <h3 className="text-lg font-medium text-white mb-2">Presentation Deck Builder</h3>
            <p className="text-sm text-zinc-400">
              Turn your written project into a slide deck with speaker notes and data visualizations in seconds.
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex-1 w-full bg-zinc-950/50 rounded border border-white/5 p-4 aspect-video flex items-center justify-center relative overflow-hidden"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-orange-500/10 to-transparent"
            />
            <div className="grid grid-cols-2 gap-2 w-full max-w-[180px] z-10">
              {[0, 1, 2, 3].map((index) => (
                <motion.div
                  key={index}
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 1 + index * 0.1 }}
                  className="bg-zinc-800 h-16 rounded border border-white/5 hover:bg-zinc-700 transition-colors"
                  whileHover={{ scale: 1.1, zIndex: 10 }}
                  style={{ opacity: index === 3 ? 0.5 : 1 }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Additional animated elements for visual interest */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-12 text-center"
      >
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-sm text-zinc-500"
        >
          And many more features to streamline your academic journey...
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Features;