// HowItWorks.tsx
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const processSteps = [
  {
    id: 1,
    title: 'Upload & Organize',
    description:
      'Drag and drop your raw lecture notes, PDF references, and messy drafts. Our system parses and tags every concept automatically.',
    iconBg: 'bg-zinc-800',
    iconColor: 'text-blue-400',
    visualIcon: 'lucide:file-stack',
    visualColor: 'text-zinc-600',
  },
  {
    id: 2,
    title: 'Intelligent Synthesis',
    description:
      'The engine connects disparate ideas, suggests arguments, and drafts coherent paragraphs with proper flow.',
    iconBg: 'bg-zinc-800',
    iconColor: 'text-indigo-400',
    visualIcon: 'lucide:wand-2',
    visualColor: 'text-indigo-500',
  },
  {
    id: 3,
    title: 'Format & Export',
    description:
      'Download your finished project in perfectly formatted LaTeX, Word, or PDF, ready for submission.',
    iconBg: 'bg-zinc-800',
    iconColor: 'text-green-400',
    visualIcon: 'lucide:file-check',
    visualColor: 'text-zinc-400',
    formatIcons: ['lucide:file-text', 'lucide:file-json'],
  },
];

const HowItWorks = () => {
  return (
    <section id="process" className="max-w-6xl mx-auto px-6 mt-32">
      <div className="mb-12">
        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-zinc-400 font-medium mb-6">
          <span className="iconify" data-icon="lucide:workflow" data-width="12"></span>
          How it Works
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-3">
          From concept to submission.
        </h2>
        <p className="text-zinc-400 text-sm md:text-base max-w-2xl">
          A seamless workflow designed to take your fragmented ideas and turn them into a polished academic paper.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Column 1: Full-length card */}
        <motion.div
          className="bg-zinc-900/40 border border-white/10 rounded-xl p-8 hover:border-white/20 transition-all group relative overflow-hidden flex flex-col justify-between h-full min-h-[400px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative z-10">
            <div
              className="w-10 h-10 flex items-center justify-center mb-4 border border-white/5 rounded-lg group-hover:scale-110 transition-transform duration-300 bg-zinc-800"
            >
              <span
                className="iconify text-blue-400"
                data-icon="lucide:upload-cloud"
                data-width="20"
              ></span>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">{processSteps[0].title}</h3>
            <p className="text-sm text-zinc-400 max-w-sm">{processSteps[0].description}</p>
          </div>

          {/* Visual */}
          <div className="mt-8 relative z-10 w-full h-48 border-2 border-dashed border-zinc-800 rounded-lg flex flex-col items-center justify-center bg-zinc-950/30 group-hover:border-zinc-700 transition-colors">
            <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center mb-3">
              <span
                className="iconify text-zinc-600 group-hover:text-blue-400 transition-colors"
                data-icon={processSteps[0].visualIcon}
                data-width="20"
              ></span>
            </div>
            <span className="text-xs text-zinc-500 font-medium">Drop sources here</span>
          </div>

          <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-transparent pointer-events-none"></div>
        </motion.div>

        {/* Column 2: Stacked Cards */}
        <div className="flex flex-col gap-4 h-full">
          {processSteps.slice(1).map((step, idx) => (
            <motion.div
              key={step.id}
              className="bg-zinc-900/40 border border-white/10 rounded-xl p-8 hover:border-white/20 transition-all group relative overflow-hidden flex-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                <span
                  className="iconify"
                  data-icon={step.visualIcon}
                  data-width="64"
                ></span>
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-10 h-10 flex items-center justify-center border border-white/5 rounded-lg group-hover:scale-110 transition-transform duration-300 ${step.iconBg}`}
                  >
                    <span className={`iconify ${step.iconColor}`} data-icon={step.visualIcon} data-width="20"></span>
                  </div>
                  {step.formatIcons && (
                    <div className="flex gap-2 opacity-50">
                      {step.formatIcons.map((icon) => (
                        <span key={icon} className="iconify text-zinc-400" data-icon={icon} data-width="16"></span>
                      ))}
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{step.title}</h3>
                <p className="text-sm text-zinc-400">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
