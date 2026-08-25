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
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-900 leading-tight mb-5">
            {t.title}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Grid of criteria — hairline rules between cells */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-mist-100 bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(4,17,98,0.04)]">
          {judgingCriteria.map((criterion, idx) => {
            const Icon = icons[criterion.icon];
            return (
              <motion.div
                key={criterion.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: idx * 0.05 }}
                className={`border-b border-r border-mist-100 p-7 flex flex-col gap-3 ${
                  criterion.highlight ? 'bg-mist-100/40' : ''
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-[18px] h-[18px] shrink-0 ${
                      criterion.highlight ? 'text-[#b8912a]' : 'text-brand-500'
                    }`}
                    strokeWidth={1.75}
                  />
                  <h3 className="font-bold text-brand-900 leading-snug">
                    {tr(criterion.category, locale)}
                  </h3>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed flex-1">
                  {tr(criterion.description, locale)}
                </p>

                <div className="pt-3 mt-1 border-t border-mist-100/80">
                  <div className="flex items-baseline justify-between mb-2">
                    <span
                      className={`text-2xl font-black tracking-tight ${
                        criterion.highlight ? 'text-[#b8912a]' : 'text-brand-600'
                      }`}
                    >
                      {criterion.score}
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1.5">
                        {t.colScore}
                      </span>
                    </span>
                    <span className="text-sm font-bold text-slate-500">
                      {criterion.score}%
                    </span>
                  </div>
                  <div className="h-1 w-full rounded-full bg-mist-100 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${criterion.score}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.15 + idx * 0.05 }}
                      className={`h-full rounded-full ${
                        criterion.highlight ? 'bg-[#c9a227]' : 'bg-brand-500'
                      }`}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Total + note */}
        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <div className="md:w-1/3 rounded-2xl bg-brand-900 text-white px-6 py-5 flex items-center justify-between">
            <span className="text-sm font-bold uppercase tracking-widest text-mist-200">
              {t.total}
            </span>
            <span className="text-3xl font-black tracking-tight">
              {total}
              <span className="text-xs font-bold uppercase tracking-widest text-mist-200 ml-1.5">
                {t.totalUnit}
              </span>
            </span>
          </div>
          <div className="md:w-2/3 flex items-start gap-3 rounded-2xl bg-mist-100/50 border border-mist-100 px-6 py-5">
            <Info className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" strokeWidth={1.75} />
            <p className="text-sm text-slate-600 leading-relaxed">{t.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JudgingCriteria;
