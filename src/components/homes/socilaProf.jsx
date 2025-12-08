import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const companies = ['Google', 'Microsoft', 'Spotify', 'Airbnb', 'Netflix'];

const SocialProof = () => (
  <motion.div
    className="py-10 border-b border-white/5 bg-slate-950"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <div className="max-w-7xl mx-auto px-6 text-center">
      <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-6">
        Trusted by candidates hired at
      </p>
      <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
        {companies.map((company) => (
          <span key={company} className="text-xl md:text-2xl font-bold text-slate-300 font-sans">{company}</span>
        ))}
      </div>
    </div>
  </motion.div>
);

export default SocialProof;
