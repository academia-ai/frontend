/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Wand2, Loader2, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { geminiService } from '../../lib/service';


export const ResumeAnalyzer = () => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('paste');

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    try {
      const data = await geminiService.analyzeResume(text);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setResult(null);
    setText('');
  };

  const sampleResume = `John Doe
Senior Software Engineer
Summary: Experienced developer with 5 years in React and Node.js.
Experience:
- Built web apps at TechCorp.
- Managed a team of 3 juniors.
Skills: JavaScript, React, CSS, HTML.`;

  const loadSample = () => {
    setText(sampleResume);
    setActiveTab('paste');
  };

  return (
    <section id="demo" className="py-24 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/20 rounded-full blur-[100px] -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-brand-400 font-semibold tracking-wider uppercase text-sm">Live Demo</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-white">Try ResuMate AI Instantly</h2>
          <p className="mt-4 text-lg text-slate-400">See how our AI parses and evaluates resumes in real-time using Gemini 2.5 Flash.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card rounded-2xl overflow-hidden shadow-2xl shadow-brand-900/20 border border-slate-700/50"
        >
          {!result ? (
            <div className="p-6 md:p-8">
              {/* Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex space-x-4 mb-6 border-b border-slate-700"
              >
                <button
                  onClick={() => setActiveTab('paste')}
                  className={`pb-3 px-1 text-sm font-medium transition-colors relative ${activeTab === 'paste' ? 'text-brand-400' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  Paste Text
                  {activeTab === 'paste' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-400 rounded-t-full" />}
                </button>
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`pb-3 px-1 text-sm font-medium transition-colors relative ${activeTab === 'upload' ? 'text-brand-400' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  Upload File
                  {activeTab === 'upload' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-400 rounded-t-full" />}
                </button>
              </motion.div>

              {/* Tab Content */}
              {activeTab === 'paste' ? (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="space-y-4"
                >
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste your resume content here..."
                    className="w-full h-64 bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-slate-300 placeholder-slate-600 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none resize-none font-mono text-sm"
                  />
                  <div className="flex justify-between items-center">
                    <button onClick={loadSample} className="text-xs text-slate-500 hover:text-brand-400 underline">
                      Load Sample Resume
                    </button>
                    <motion.button
                      onClick={handleAnalyze}
                      disabled={!text.trim() || isAnalyzing}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="bg-brand-600 hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2"
                    >
                      {isAnalyzing ? <Loader2 className="animate-spin h-5 w-5" /> : <Wand2 className="h-5 w-5" />}
                      {isAnalyzing ? 'Analyzing...' : 'Scan Resume'}
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="h-64 border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center bg-slate-900/30 group hover:border-brand-500/50 transition-colors cursor-pointer relative"
                >
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setText(sampleResume);
                        setActiveTab('paste');
                      }
                    }}
                  />
                  <Upload className="h-10 w-10 text-slate-500 group-hover:text-brand-400 mb-4 transition-colors" />
                  <p className="text-slate-300 font-medium">Click or drag file to upload</p>
                  <p className="text-slate-500 text-sm mt-2">Supports PDF, DOCX, TXT (Simulated)</p>
                </motion.div>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col md:flex-row min-h-[400px]"
            >
              {/* Result Sidebar */}
              <div className="bg-slate-900/60 p-6 md:w-1/3 border-r border-slate-700/50 flex flex-col items-center justify-center text-center">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={351.86}
                      strokeDashoffset={351.86 - (351.86 * result.score) / 100}
                      className={`${result.score > 70 ? 'text-green-500' : result.score > 40 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000 ease-out`}
                    />
                  </svg>
                  <span className="absolute text-3xl font-bold text-white">{result.score}</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-4">Resume Score</h3>
                <p className="text-sm text-slate-400 mt-2">{result.roleMatch}</p>
                <motion.button
                  onClick={reset}
                  whileHover={{ scale: 1.05 }}
                  className="mt-8 text-white flex items-center gap-2 text-sm text-brand-400 hover:text-brand-300 transition-colors"
                >
                  <RefreshCw className="h-4 w-4 text-white" /> Scan Another
                </motion.button>
              </div>

              {/* Result Content */}
              <div className="p-6 md:w-2/3 bg-gradient-to-br from-slate-900/40 to-slate-800/40">
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Executive Summary</h4>
                  <p className="text-slate-200 leading-relaxed">{result.summary}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="flex items-center gap-2 text-green-400 font-semibold mb-3">
                      <CheckCircle className="h-5 w-5" /> Strengths
                    </h4>
                    <ul className="space-y-2">
                      {result.strengths.map((s, i) => (
                        <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="flex items-center gap-2 text-amber-400 font-semibold mb-3">
                      <AlertCircle className="h-5 w-5" /> Improvements
                    </h4>
                    <ul className="space-y-2">
                      {result.weaknesses.map((w, i) => (
                        <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 shrink-0" />
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
