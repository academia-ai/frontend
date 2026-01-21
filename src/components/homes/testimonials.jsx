import React from "react";

const testimonials = [
  {
    initials: "JD",
    name: "James Doe",
    username: "@james_cs_student",
    bgColor: "bg-indigo-500",
    content:
      "Academia AI saved my thesis. The citation tool alone is worth the subscription. It perfectly formatted 50+ sources in seconds.",
  },
  {
    initials: "AS",
    name: "Alice Smith",
    username: "@alicesmith_phd",
    bgColor: "bg-teal-500",
    content:
      "The code refactoring feature is insane. It took my messy Python script and made it PEP-8 compliant and faster.",
  },
  {
    initials: "MR",
    name: "Michael Ross",
    username: "@mike_history",
    bgColor: "bg-rose-500",
    content:
      "Finally, a tool that understands humanities. The essay structuring helper gave me a perfect outline to start writing.",
  },
  {
    initials: "SL",
    name: "Sarah Lee",
    username: "@sarah_biotech",
    bgColor: "bg-purple-500",
    content:
      "Organizing lab reports used to take forever. Now I just upload my raw data and notes, and it's 90% done.",
  },
];

// Single testimonial card component
const TestimonialCard = ({ t }) => (
  <div className="w-80 bg-zinc-900/30 border border-white/10 rounded-xl p-5 hover:bg-zinc-900/50 transition-colors shrink-0">
    <div className="flex items-center gap-3 mb-3">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs text-white font-bold ${t.bgColor}`}
      >
        {t.initials}
      </div>
      <div>
        <div className="text-sm font-medium text-white">{t.name}</div>
        <div className="text-[10px] text-zinc-500">{t.username}</div>
      </div>
    </div>
    <p className="text-xs text-zinc-400 leading-relaxed">{t.content}</p>
  </div>
);

const Testimonial = () => {
  return (
    <section className="py-24 border-b border-white/5 relative overflow-hidden">
      {/* Header */}
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-2xl font-semibold tracking-tight text-white mb-2">
          Loved by researchers
        </h2>
        <p className="text-zinc-500 text-sm">
          Join thousands of students saving hours every week.
        </p>
      </div>

      {/* Row 1: Left to Right */}
      <div className="overflow-hidden">
        <div className="flex animate-marquee gap-4 w-max">
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={`row1-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Row 2: Right to Left */}
      <div className="overflow-hidden mt-8">
        <div className="flex animate-marquee-reverse gap-4 w-max">
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={`row2-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        .animate-marquee {
          display: flex;
          gap: 1rem;
          animation: marquee 20s linear infinite;
        }
        .animate-marquee-reverse {
          display: flex;
          gap: 1rem;
          animation: marquee-reverse 20s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonial;
