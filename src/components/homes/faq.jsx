import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const faqs = [
  {
    question: "How does the AI analysis work?",
    answer: "We use Google's advanced Gemini 2.5 Flash model to process your resume text. It compares your content against thousands of successful resumes and standard hiring heuristics to provide scoring and actionable feedback."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We do not store your resume content after analysis in our Free tier. For Pro users, data is encrypted and only stored if you choose to save your history."
  },
  {
    question: "Can it read PDF files?",
    answer: "Our visual upload supports simulated processing for the demo. In the full product, we use advanced OCR to parse PDFs, Word docs, and images."
  },
  {
    question: "Does it work for all industries?",
    answer: "Yes! While specialized for Tech and Corporate roles, the underlying AI understands context for Creative, Medical, and Academic CVs as well."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq"
     className="py-24 bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center text-white mb-12"
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border border-slate-800 rounded-lg bg-slate-900/50 overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-slate-200">{faq.question}</span>
                {openIndex === index ? <Minus className="w-5 h-5 text-brand-400" /> : <Plus className="w-5 h-5 text-slate-500" />}
              </button>
              <div className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-4 text-slate-400">{faq.answer}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
