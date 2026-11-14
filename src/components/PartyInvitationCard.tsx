import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { PARTY_DETAILS } from '../data/partyDetails';

const TITLE_LINE_1 = [
  { ch: 'C', color: '#7B4B94' },
  { ch: 'H', color: '#F47C20' },
  { ch: 'I', color: '#1AA6B7' },
  { ch: 'L', color: '#7AC143' },
  { ch: 'D', color: '#E95D7A' },
  { ch: 'R', color: '#2D9CDB' },
  { ch: 'E', color: '#F47C20' },
  { ch: 'N', color: '#7AC143' },
  { ch: "'", color: '#7B4B94' },
  { ch: 'S', color: '#7B4B94' },
  { ch: ' ', color: 'transparent' },
  { ch: 'D', color: '#1AA6B7' },
  { ch: 'A', color: '#F8C630' },
  { ch: 'Y', color: '#2D9CDB' },
];

const TITLE_LINE_2 = [
  { ch: 'P', color: '#E95D7A' },
  { ch: 'A', color: '#7AC143' },
  { ch: 'R', color: '#7B4B94' },
  { ch: 'T', color: '#F47C20' },
  { ch: 'Y', color: '#1AA6B7' },
];

export const PartyInvitationCard: React.FC = () => {
  return (
    <article
      className="relative w-full bg-[#FAF3E3] border-4 border-[#1E2A4A] rounded-3xl toy-card overflow-hidden"
      aria-label="Children's Day Party Invitation"
    >
      {/* Top Left & Right Bunting Flags */}
      <svg
        viewBox="0 0 220 85"
        className="absolute top-0 left-0 w-28 pointer-events-none"
        aria-hidden="true"
      >
        <path d="M -5 14 Q 100 48 215 6" fill="none" stroke="#475569" strokeWidth="2.5" />
        <polygon points="8,18 42,27 20,58" fill="#E95D7A" />
        <polygon points="50,28 84,33 64,64" fill="#7AC143" />
        <polygon points="92,34 126,33 108,65" fill="#F47C20" />
        <polygon points="134,31 168,24 156,56" fill="#2D9CDB" />
        <polygon points="176,22 206,12 198,44" fill="#7B4B94" />
      </svg>

      <svg
        viewBox="0 0 220 85"
        className="absolute top-0 right-0 w-28 pointer-events-none"
        aria-hidden="true"
      >
        <path d="M 5 6 Q 120 48 225 14" fill="none" stroke="#475569" strokeWidth="2.5" />
        <polygon points="14,12 44,22 22,44" fill="#7B4B94" />
        <polygon points="52,24 86,31 64,56" fill="#F8C630" />
        <polygon points="94,33 128,34 112,65" fill="#F47C20" />
        <polygon points="136,33 170,28 156,64" fill="#2D9CDB" />
        <polygon points="178,27 212,18 200,58" fill="#E95D7A" />
      </svg>

      {/* Main Invitation Body */}
      <div className="relative z-10 px-4 pt-11 pb-5 flex flex-col items-center text-center">
        <h2
          className="font-display font-bold text-[26px] leading-tight tracking-tight sticker-text select-text"
          aria-label={PARTY_DETAILS.heading}
        >
          <span className="block">
            {TITLE_LINE_1.map((item, idx) => (
              <span key={idx} style={{ color: item.color }}>
                {item.ch}
              </span>
            ))}
          </span>
          <span className="block mt-0.5">
            {TITLE_LINE_2.map((item, idx) => (
              <span key={idx} style={{ color: item.color }}>
                {item.ch}
              </span>
            ))}
          </span>
        </h2>

        <p className="mt-2 font-display font-semibold text-base text-[#7B4B94]">
          &ldquo;{PARTY_DETAILS.tagline}&rdquo;
        </p>

        <div className="my-3 flex items-center justify-center gap-2.5" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-[#F8C630] border-2 border-[#1E2A4A]" />
          <span className="w-3 h-3 rounded-full bg-[#77C4EA] border-2 border-[#1E2A4A]" />
          <span className="w-3 h-3 rounded-full bg-[#EE6A84] border-2 border-[#1E2A4A]" />
          <span className="w-3 h-3 rounded-full bg-[#7AC143] border-2 border-[#1E2A4A]" />
        </div>

        {/* Single-column Portrait Details Box with Sunny Yellow Side Borders */}
        <div className="w-full bg-white rounded-2xl border-y-2 border-x-[5px] border-y-[#E2E8F0] border-x-[#F8C630] shadow-sm px-4 py-4 flex flex-col gap-3.5 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EE6A84] border-2 border-[#1E2A4A] flex items-center justify-center shrink-0 text-white">
              <Calendar className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-display font-bold text-xs tracking-wide text-[#E95D7A]">
                {PARTY_DETAILS.dateLabel}
              </p>
              <p className="font-extrabold text-base text-[#1E2A4A]">
                {PARTY_DETAILS.dateValue}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2.5 border-t border-dashed border-[#E2E8F0]">
            <div className="w-10 h-10 rounded-full bg-[#2D9CDB] border-2 border-[#1E2A4A] flex items-center justify-center shrink-0 text-white">
              <Clock className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-display font-bold text-xs tracking-wide text-[#2D9CDB]">
                {PARTY_DETAILS.timeLabel}
              </p>
              <p className="font-extrabold text-base text-[#1E2A4A] tabular-nums">
                {PARTY_DETAILS.timeValue}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2.5 border-t border-dashed border-[#E2E8F0]">
            <div className="w-10 h-10 rounded-full bg-[#7AC143] border-2 border-[#1E2A4A] flex items-center justify-center shrink-0 text-white">
              <MapPin className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-display font-bold text-xs tracking-wide text-[#7AC143]">
                {PARTY_DETAILS.venueLabel}
              </p>
              <p className="font-extrabold text-base text-[#1E2A4A]">
                {PARTY_DETAILS.venueValue}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Footer with Reminder Text */}
      <div className="relative bg-[#F9DE78] border-t-3 border-[#1E2A4A]/15 px-4 pt-4 pb-5 text-center">
        <div
          className="absolute bottom-0 inset-x-0 h-4 bg-[#80C8E8]"
          aria-hidden="true"
        />
        <div className="relative z-10 bg-white/95 border-2 border-[#1E2A4A] rounded-2xl px-3.5 py-2.5 shadow-sm">
          <p className="font-display font-bold text-[11px] tracking-wider text-[#7B4B94] mb-0.5">
            {PARTY_DETAILS.reminderLabel}
          </p>
          <p className="font-extrabold text-sm text-[#1E2A4A] leading-snug">
            &ldquo;{PARTY_DETAILS.reminderText}&rdquo;
          </p>
        </div>
      </div>
    </article>
  );
};
