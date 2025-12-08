import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["3 Resume Scans / month", "Basic Score Analysis", "Grammar Check", "Email Support"],
    cta: "Start Free"
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    popular: true,
    features: ["Unlimited Scans", "Deep AI Content Analysis", "Keyword Optimization", "LinkedIn Profile Review", "Priority Support"],
    cta: "Get Pro"
  },
  {
    name: "Lifetime",
    price: "$149",
    period: "one-time",
    features: ["All Pro Features", "Lifetime Updates", "1-on-1 Career Coaching Call", "Cover Letter Generator", "API Access"],
    cta: "Buy Lifetime"
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-slate-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
          <p className="text-slate-400">Invest in your career for less than the cost of a lunch.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 ${plan.popular ? 'bg-slate-800 border-2 border-brand-500 shadow-2xl shadow-brand-900/30 transform scale-105 z-10' : 'bg-slate-900 border border-slate-800'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-slate-500 ml-2">{plan.period}</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                    <Check className="w-5 h-5 text-brand-400 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${plan.popular ? 'bg-brand-500 hover:bg-brand-400 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
