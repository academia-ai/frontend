import React from 'react';
import { Star } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Product Manager",
    company: "TechFlow",
    image: "https://picsum.photos/100/100?random=1",
    content: "I was getting rejected by ATS left and right. ResuMate pointed out I was missing key industry keywords. I got 3 interviews the next week."
  },
  {
    id: 2,
    name: "David Chen",
    role: "Frontend Engineer",
    company: "StartUp Inc",
    image: "https://picsum.photos/100/100?random=2",
    content: "The AI feedback on my bullet points was a game changer. It helped me quantify my achievements which impressed the hiring managers."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "Creative Agency",
    image: "https://picsum.photos/100/100?random=3",
    content: "Simple, fast, and incredibly accurate. It felt like having a professional career coach review my resume for a fraction of the cost."
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-900 border border-slate-800 p-8 rounded-2xl relative"
            >
              <div className="flex gap-1 mb-4 text-yellow-500">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-slate-300 mb-6 italic">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-900" />
                <div>
                  <h4 className="text-white font-semibold">{t.name}</h4>
                  <p className="text-slate-500 text-sm">{t.role} at {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
