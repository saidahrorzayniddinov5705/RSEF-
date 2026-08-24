import React from 'react';
import { motion } from 'motion/react';
import {
  BarChart3,
  FlaskConical,
  HelpCircle,
  Image as ImageIcon,
  Info,
  Lightbulb,
  Mic,
  Trophy,
} from 'lucide-react';
import {
  judgingCopy,
  judgingCriteria,
  tr,
  type Criterion,
  type Locale,
} from '../../data/rsef2026';

const icons: Record<Criterion['icon'], React.ElementType> = {
  question: HelpCircle,
  flask: FlaskConical,
  chart: BarChart3,
  bulb: Lightbulb,
  poster: ImageIcon,
  mic: Mic,
};

type Props = { locale?: string };

export function JudgingCriteria({ locale }: Props) {
  const t = judgingCopy[(locale as Locale) ?? 'en'] ?? judgingCopy.en;
  const total = judgingCriteria.reduce((sum, c) => sum + c.score, 0);

  return (
    <section className="w-full bg-paper-50 border-t border-mist-100 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-900 mb-4">
            {t.title}
          </h2>
          <div className="w-20 h-1 bg-brand-500 rounded-full mx-auto mb-6" />
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-mist-100 shadow-[0_8px_30px_rgb(4,17,98,0.05)] bg-white">
          {/* Header row — desktop only */}
          <div className="hidden md:grid grid-cols-[minmax(0,3fr)_minmax(0,5fr)_100px_100px] bg-brand-900 text-white">
            <div className="px-6 py-4 text-xs font-bold uppercase tracking-widest">
              {t.colCategory}
            </div>
            <div className="px-6 py-4 text-xs font-bold uppercase tracking-widest">
              {t.colDescription}
            </div>
            <div className="px-4 py-4 text-xs font-bold uppercase tracking-widest text-center">
              {t.colScore}
            </div>
            <div className="px-4 py-4 text-xs font-bold uppercase tracking-widest text-center">
              {t.colWeight}
            </div>
          </div>

          {judgingCriteria.map((criterion, idx) => {
            const Icon = icons[criterion.icon];
            return (
              <motion.div
                key={criterion.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: idx * 0.04 }}
                className={`grid grid-cols-1 md:grid-cols-[minmax(0,3fr)_minmax(0,5fr)_100px_100px] border-t border-mist-100 ${
                  criterion.highlight ? 'bg-mist-100/50' : 'bg-white'
                }`}
              >
                <div className="px-6 py-5 flex items-start gap-4">
                  <span
                    className={`shrink-0 size-10 rounded-full flex items-center justify-center ${
                      criterion.highlight
                        ? 'bg-brand-900 text-white'
                        : 'bg-brand-500 text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="font-bold text-brand-900 leading-snug pt-2">
                    {tr(criterion.category, locale)}
                  </span>
                </div>

                <div className="px-6 pb-5 md:py-5 md:pl-0 text-slate-600 leading-relaxed text-sm md:border-l md:border-mist-100 md:pl-6">
                  {tr(criterion.description, locale)}
                </div>

                <div className="px-6 md:px-4 pb-5 md:py-5 flex md:justify-center items-center gap-2 md:border-l md:border-mist-100">
                  <span className="md:hidden text-xs font-bold uppercase tracking-widest text-slate-400">
                    {t.colScore}
                  </span>
                  <span
                    className={`text-2xl font-black ${
                      criterion.highlight ? 'text-brand-900' : 'text-brand-600'
                    }`}
                  >
                    {criterion.score}
                  </span>
                </div>

                <div className="px-6 md:px-4 pb-5 md:py-5 flex md:justify-center items-center gap-2 md:border-l md:border-mist-100">
                  <span className="md:hidden text-xs font-bold uppercase tracking-widest text-slate-400">
                    {t.colWeight}
                  </span>
                  <span className="text-lg font-bold text-slate-500">
                    {criterion.score}%
                  </span>
                </div>
              </motion.div>
            );
          })}

          {/* Total */}
          <div className="bg-brand-900 text-white flex items-center justify-between px-6 py-5">
            <span className="flex items-center gap-3 text-lg font-black uppercase tracking-widest">
              <Trophy className="w-6 h-6 text-mist-200" />
              {t.total}
            </span>
            <span className="text-2xl font-black">
              {total} <span className="text-mist-200 text-base font-bold uppercase tracking-widest">{t.totalUnit}</span>
            </span>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-xl bg-mist-100/60 border border-mist-100 px-5 py-4">
          <Info className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
          <p className="text-sm text-slate-600 leading-relaxed">{t.note}</p>
        </div>
      </div>
    </section>
  );
}

export default JudgingCriteria;
