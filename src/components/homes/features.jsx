import React from 'react';
import { Target, Zap, Layout, FileSearch, ShieldCheck, TrendingUp } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const featureList = [
  {
    icon: <Target className="w-6 h-6 text-brand-400" />,
    title: "ATS Optimization",
    description: "Ensure your resume passes Applicant Tracking Systems with optimized keyword matching."
  },
  {
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
    title: "Instant Feedback",
    description: "Get detailed scoring and actionable advice in seconds, not days."
  },
  {
    icon: <Layout className="w-6 h-6 text-purple-400" />,
    title: "Smart Formatting",
    description: "Auto-suggestions for structure, bullet points, and readability improvements."
  },
  {
    icon: <FileSearch className="w-6 h-6 text-green-400" />,
    title: "Keyword Analysis",
    description: "Compare your resume against job descriptions to find missing skills."
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-blue-400" />,
    title: "Privacy First",
    description: "Your data is processed securely and never shared with third parties."
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-pink-400" />,
    title: "Success Metrics",
    description: "Focus on impact. We help you rewrite duties into quantifiable achievements."
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Everything you need to stand out</h2>
          <p className="mt-4 text-lg text-slate-400">
            Our AI-powered platform provides a comprehensive suite of tools to help you craft the perfect narrative for your career.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureList.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-brand-500/30 transition-all hover:bg-slate-900 group"
            >
              <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const HowItWorks = () => {
  const steps = [
    {
      num: "01",
      title: "Upload Resume",
      desc: "Upload your existing PDF or paste text directly into our secure analyzer."
    },
    {
      num: "02",
      title: "AI Analysis",
      desc: "Our Gemini-powered engine scans for 50+ data points including keywords and impact."
    },
    {
      num: "03",
      title: "Optimize & Export",
      desc: "Apply suggested changes and download your polished, interview-ready resume."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-900/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold text-white">How ResuMate Works</h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-slate-950 border-4 border-brand-900 flex items-center justify-center z-10 mb-6 shadow-xl shadow-brand-900/20">
                <span className="text-3xl font-bold text-brand-500">{step.num}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-slate-400 max-w-xs">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
