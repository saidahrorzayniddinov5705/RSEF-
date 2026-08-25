import React from 'react';
import StackingCards, { StackingCardItem } from '../ui/stacking-cards';
import { resultsCopy, tr, winners, type Locale, type Winner } from '../../data/rsef2026';

/* Royal blue cards, gold highlights, pastel dark-blue backdrop. */
const placeTheme: Record<Winner['place'], { card: string; medal: string }> = {
  1: { card: 'bg-brand-500', medal: '🥇' },
  2: { card: 'bg-brand-600', medal: '🥈' },
  3: { card: 'bg-brand-900', medal: '🥉' },
};

const GOLD = '#e0b84c';

type Props = { locale?: string };

export function WinnersStack({ locale }: Props) {
  const c = resultsCopy[(locale as Locale) ?? 'en'] ?? resultsCopy.en;

  return (
    <section className="w-full bg-[#0f1f47]">
      <StackingCards totalCards={winners.length} scaleMultiplier={0.04}>
        {/* Heading */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-3 px-4 py-16 text-center">
          <h2
            className="font-heading text-3xl md:text-5xl font-black uppercase tracking-tight"
            style={{ color: GOLD }}
          >
            {c.featured}
          </h2>
          <span className="text-mist-300 text-sm font-bold uppercase tracking-[0.25em] animate-pulse">
            ↓
          </span>
        </div>

        {winners.map((w, index) => {
          const theme = placeTheme[w.place];
          return (
            <StackingCardItem
              key={w.id}
              index={index}
              className="h-[86vh] min-h-[600px] max-h-[820px]"
            >
              <div
                className={`${theme.card} h-[88%] w-11/12 mx-auto rounded-3xl overflow-hidden text-white shadow-[0_24px_60px_rgba(4,17,98,0.45)] flex flex-col sm:flex-row`}
              >
                {/* Media */}
                <div
                  className={`shrink-0 h-40 sm:h-full sm:w-[38%] grid gap-1 bg-black/20 ${
                    w.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
                  }`}
                >
                  {w.images.map((img) => (
                    <img
                      key={img.src}
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="w-full h-full object-cover object-top"
                    />
                  ))}
                </div>

                {/* Copy */}
                <div className="flex-1 min-h-0 flex flex-col gap-4 px-6 py-6 sm:px-10 sm:py-9">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-black uppercase tracking-widest text-[#0f1f47]"
                      style={{ backgroundColor: GOLD }}
                    >
                      <span aria-hidden="true">{theme.medal}</span>
                      {tr(w.placeLabel, locale)}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-white/50">
                      RSEF {w.year}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
                      {w.projectName}
                    </h3>
                    <p className="mt-2 font-semibold" style={{ color: GOLD }}>
                      {w.winnerName}
                    </p>
                    {w.school && w.school !== w.winnerName && (
                      <p className="text-sm text-white/60">{w.school}</p>
                    )}
                  </div>

                  <span
                    className="block h-px w-16 shrink-0"
                    style={{ backgroundColor: GOLD }}
                  />

                  <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">
                      {c.studentReview}
                    </p>
                    <p className="text-sm sm:text-[15px] leading-relaxed text-white/85 whitespace-pre-line">
                      {w.review}
                    </p>
                  </div>
                </div>
              </div>
            </StackingCardItem>
          );
        })}
      </StackingCards>
    </section>
  );
}

export default WinnersStack;
