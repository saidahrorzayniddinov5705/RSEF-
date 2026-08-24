import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Card } from '../ui/card';
import {
  impactCopy,
  participatingCountries,
  type Locale,
} from '../../data/rsef2026';

type Props = { locale?: string };

const rise = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

export function ImpactBento({ locale }: Props) {
  const t = impactCopy[(locale as Locale) ?? 'en'] ?? impactCopy.en;

  return (
    <section className="w-full bg-paper-200 border-t border-mist-100 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {/* ---- Headline card ---------------------------------- */}
          <Card className="md:col-span-2 md:row-span-2 bg-paper-50 rounded-2xl p-8 sm:p-12 flex flex-col justify-between border border-mist-100 relative overflow-hidden group">
            {/* Decorative orbit mark */}
            <svg
              viewBox="0 0 200 200"
              aria-hidden="true"
              className="w-[22rem] h-[22rem] absolute -bottom-24 -right-24 text-mist-100/70 group-hover:rotate-180 duration-[2000ms] ease-in-out"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="100" cy="100" r="18" fill="currentColor" stroke="none" />
              <ellipse cx="100" cy="100" rx="80" ry="32" />
              <ellipse cx="100" cy="100" rx="80" ry="32" transform="rotate(60 100 100)" />
              <ellipse cx="100" cy="100" rx="80" ry="32" transform="rotate(120 100 100)" />
            </svg>

            <motion.div {...rise} className="space-y-6 relative z-10">
              <div className="inline-flex px-4 py-2 rounded-full bg-brand-900 text-white text-[10px] font-black uppercase tracking-[0.18em]">
                {t.eyebrow}
              </div>
              <h2 className="text-4xl sm:text-5xl font-heading font-black text-brand-900 tracking-tighter leading-[1.05]">
                RSEF 2026
                <br />
                <span className="text-brand-500">by the Numbers</span>
              </h2>
              <p className="text-lg text-slate-600 italic">{t.subtitle}</p>
            </motion.div>

            <motion.div {...rise} className="mt-10 relative z-10 flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-mist-100 text-brand-600 text-xs font-bold uppercase tracking-wide">
                {t.categoriesSplit}
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-mist-100 text-brand-600 text-xs font-bold uppercase tracking-wide">
                {t.tagline}
              </span>
            </motion.div>
          </Card>

          {/* ---- Countries -------------------------------------- */}
          <motion.div {...rise} className="md:col-span-1">
            <Card className="h-full bg-brand-500 rounded-2xl p-8 text-white border-none flex flex-col justify-between gap-6">
              <div>
                <span className="text-6xl font-black tracking-tighter leading-none">5</span>
                <p className="mt-2 text-sm font-bold uppercase tracking-widest text-white/80">
                  {t.countries}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {participatingCountries.map((c) => (
                  <img
                    key={c.code}
                    src={`https://flagcdn.com/${c.code}.svg`}
                    alt={c.name}
                    title={c.name}
                    className="w-8 h-5 object-cover rounded-[3px] ring-1 ring-white/30"
                    loading="lazy"
                  />
                ))}
              </div>
            </Card>
          </motion.div>

          {/* ---- Applications ----------------------------------- */}
          <motion.div {...rise} transition={{ delay: 0.05 }} className="md:col-span-1">
            <StatCard value="47" label={t.applications} sub={t.applicationsSub} />
          </motion.div>

          {/* ---- Finalists -------------------------------------- */}
          <motion.div {...rise} transition={{ delay: 0.1 }} className="md:col-span-1">
            <StatCard value="18" label={t.finalists} sub={t.finalistsSub} />
          </motion.div>

          {/* ---- Research categories ---------------------------- */}
          <motion.div {...rise} transition={{ delay: 0.15 }} className="md:col-span-1">
            <Card className="h-full bg-brand-900 rounded-2xl p-8 text-white border-none flex flex-col justify-between">
              <span className="text-6xl font-black tracking-tighter leading-none">12</span>
              <p className="mt-2 text-sm font-bold uppercase tracking-widest text-mist-200">
                {t.researchCategories}
              </p>
            </Card>
          </motion.div>

          {/* ---- Judges ----------------------------------------- */}
          <motion.div {...rise} className="md:col-span-1">
            <StatCard value="4" label={t.judges} />
          </motion.div>

          {/* ---- Cash awards ------------------------------------ */}
          <motion.div {...rise} transition={{ delay: 0.05 }} className="md:col-span-1">
            <StatCard value="3" label={t.cashAwards} sub={t.cashAwardsSub} />
          </motion.div>

          {/* ---- Motto / CTA ------------------------------------ */}
          <motion.div {...rise} transition={{ delay: 0.1 }} className="md:col-span-2">
            <Link to={`/${locale ?? 'en'}/apply`} className="block h-full group/cta">
              <Card className="h-full rounded-2xl p-6 sm:p-8 border-none flex flex-row items-center justify-between gap-6 bg-brand-600 text-white transition-colors duration-500 group-hover/cta:bg-brand-900">
                <div className="space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-heading font-black tracking-tight leading-tight">
                    {t.motto}
                  </h3>
                  <p className="text-mist-200">{t.mottoSub}</p>
                </div>
                <span className="shrink-0 size-16 rounded-full flex items-center justify-center text-2xl bg-white text-brand-600 transition-transform duration-500 group-hover/cta:translate-x-1">
                  →
                </span>
              </Card>
            </Link>
          </motion.div>
        </div>

        <p className="mt-8 text-center text-sm font-semibold text-slate-500">
          {t.thanks}
        </p>
      </div>
    </section>
  );
}

function StatCard({
  value,
  label,
  sub,
}: {
  value: string;
  label: string;
  sub?: string;
}) {
  return (
    <Card className="h-full bg-paper-50 rounded-2xl p-8 border border-mist-100 flex flex-col justify-between">
      <span className="text-6xl font-black tracking-tighter text-brand-900 leading-none">
        {value}
      </span>
      <div className="mt-2">
        <p className="text-sm font-bold uppercase tracking-widest text-slate-600">
          {label}
        </p>
        {sub && (
          <p className="text-sm font-bold uppercase tracking-widest text-brand-500">
            {sub}
          </p>
        )}
      </div>
    </Card>
  );
}

export default ImpactBento;
