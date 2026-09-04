import React, { useState } from 'react';
import { Sparkles, Heart, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { MEMORIES } from '../data/memoriesData';
import { sounds } from '../utils/audio';

export default function FloatingMemoriesBackground({ isExamMode = false }) {
  const [activeModalPhoto, setActiveModalPhoto] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  // We assign 10 traveling tracks across different vertical heights and directions
  // Some moving left-to-right, some right-to-left, with staggered speeds, delays, and gentle rotation sways
  const travelingPolaroids = [
    // 1. Top row, Left to Right
    { photo: MEMORIES[5], top: '8%', anim: 'travelLeftToRight 38s linear infinite', delay: '-4s', rotate: '-rotate-3', size: 'w-26 sm:w-28' },
    // 2. Upper-Mid, Right to Left
    { photo: MEMORIES[2], top: '18%', anim: 'travelRightToLeft 44s linear infinite', delay: '-14s', rotate: 'rotate-4', size: 'w-26 sm:w-28' },
    // 3. Left to Right, Upper Center
    { photo: MEMORIES[0], top: '30%', anim: 'travelLeftToRight 42s linear infinite', delay: '-22s', rotate: 'rotate-2', size: 'w-24 sm:w-28' },
    // 4. Right to Left, Mid Level
    { photo: MEMORIES[11], top: '42%', anim: 'travelRightToLeft 36s linear infinite', delay: '-8s', rotate: '-rotate-4', size: 'w-26 sm:w-28' },
    // 5. Left to Right, Center Lower
    { photo: MEMORIES[9], top: '54%', anim: 'travelLeftToRight 40s linear infinite', delay: '-18s', rotate: 'rotate-3', size: 'w-24 sm:w-28' },
    // 6. Right to Left, Lower Level
    { photo: MEMORIES[14], top: '66%', anim: 'travelRightToLeft 46s linear infinite', delay: '-28s', rotate: '-rotate-2', size: 'w-26 sm:w-28' },
    // 7. Left to Right, Near Bottom
    { photo: MEMORIES[18], top: '78%', anim: 'travelLeftToRight 35s linear infinite', delay: '-12s', rotate: 'rotate-4', size: 'w-26 sm:w-28' },
    // 8. Right to Left, Bottom Row
    { photo: MEMORIES[6], top: '88%', anim: 'travelRightToLeft 41s linear infinite', delay: '-32s', rotate: '-rotate-3', size: 'w-24 sm:w-28' },
    // 9. Extra top drifting diagonal
    { photo: MEMORIES[3], top: '12%', anim: 'travelLeftToRight 48s linear infinite', delay: '-26s', rotate: 'rotate-1', size: 'w-24 sm:w-26' },
    // 10. Extra lower drifting
    { photo: MEMORIES[19], top: '72%', anim: 'travelRightToLeft 43s linear infinite', delay: '-3s', rotate: '-rotate-1', size: 'w-24 sm:w-26' },
  ];

  const openLightbox = (photo) => {
    sounds.playClick();
    const idx = MEMORIES.findIndex((m) => m.id === photo.id);
    setPhotoIndex(idx !== -1 ? idx : 0);
    setActiveModalPhoto(photo);
  };

  const nextPhoto = (e) => {
    e?.stopPropagation();
    sounds.playClick();
    const nextIdx = (photoIndex + 1) % MEMORIES.length;
    setPhotoIndex(nextIdx);
    setActiveModalPhoto(MEMORIES[nextIdx]);
  };

  const prevPhoto = (e) => {
    e?.stopPropagation();
    sounds.playClick();
    const prevIdx = (photoIndex - 1 + MEMORIES.length) % MEMORIES.length;
    setPhotoIndex(prevIdx);
    setActiveModalPhoto(MEMORIES[prevIdx]);
  };

  return (
    <>
      {/* Fullscreen background container */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        
        {/* Soft, clean romantic ambient canvas (no dark heavy collage) */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-50/40 to-pink-50/30" />

        {/* Traveling Polaroid Cards (Traveling Left-to-Right and Right-to-Left) */}
        {travelingPolaroids.map((item, index) => {
          const photo = item.photo;
          if (!photo) return null;

          return (
            <div
              key={`${photo.id}-${index}`}
              className={`absolute pointer-events-auto cursor-pointer transition-transform duration-200 group hover:scale-115 hover:z-30 hover:opacity-100`}
              style={{
                top: item.top,
                animation: item.anim,
                animationDelay: item.delay,
                willChange: 'transform',
              }}
              onClick={() => openLightbox(photo)}
              title={`${photo.title} • Click to view`}
            >
              {/* Polaroid Frame (NO CROPPING: natural fit, non-truncated text) */}
              <div className={`${item.size} p-2 pb-2.5 bg-white rounded-xl shadow-md group-hover:shadow-2xl border border-slate-200/90 transform ${item.rotate} group-hover:rotate-0 transition-all duration-300 opacity-80 group-hover:opacity-100 flex flex-col items-center`}>
                
                {/* Washi tape pin accent */}
                <div className="w-5 h-2 bg-rose-200/90 mx-auto -mt-3.5 mb-1.5 rounded-xs border border-rose-300/80 shadow-2xs rotate-1" />

                {/* Photo Frame (Uses object-contain so NO FACES ARE EVER CROPPED!) */}
                <div className="w-full h-24 sm:h-28 bg-slate-50 rounded-lg overflow-hidden flex items-center justify-center p-0.5 relative border border-slate-100">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-contain rounded-md group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-rose-500/0 group-hover:bg-rose-500/10 transition-colors flex items-center justify-center rounded-md">
                    <Heart className="w-4 h-4 text-rose-500 drop-shadow opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Clean, Full Caption (NO HARSH TRUNCATION) */}
                <p className="mt-1.5 text-[9px] sm:text-[10px] font-semibold text-slate-700 text-center leading-tight line-clamp-2 w-full px-0.5">
                  {photo.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Discrete Corner Button to view all 22 photos anytime */}
      <div className="fixed bottom-3 left-3 z-30 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-slate-300/80 text-xs text-slate-800 transition-all hover:scale-105">
        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
        <span className="font-semibold text-[11px] text-slate-700 hidden sm:inline">Our Memories:</span>
        <button
          type="button"
          onClick={() => openLightbox(MEMORIES[0])}
          className="px-2.5 py-0.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
        >
          <Camera className="w-3 h-3" />
          <span>22 Photos</span>
        </button>
      </div>

      {/* Fullscreen Romantic Lightbox Gallery Modal */}
      {activeModalPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveModalPhoto(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-700 flex flex-col relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#0f2744] text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                <span className="font-bold text-sm">
                  {MEMORIES[photoIndex].title} ({photoIndex + 1} of {MEMORIES.length})
                </span>
              </div>
              <button
                onClick={() => setActiveModalPhoto(null)}
                className="text-slate-400 hover:text-white font-bold text-lg px-2 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Main Photo Display */}
            <div className="relative bg-slate-950 flex items-center justify-center min-h-[320px] max-h-[62vh] overflow-hidden group">
              <img
                src={activeModalPhoto.src}
                alt={activeModalPhoto.title}
                className="w-full h-full max-h-[62vh] object-contain"
              />

              {/* Prev Button */}
              <button
                type="button"
                onClick={prevPhoto}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white cursor-pointer transition-all active:scale-95"
                title="Previous Memory"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={nextPhoto}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white cursor-pointer transition-all active:scale-95"
                title="Next Memory"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Footer with romantic caption and thumbnail strip */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col items-center text-center space-y-1">
              <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{activeModalPhoto.title}</span>
              </h4>
              <p className="text-xs text-slate-600 italic">
                "{activeModalPhoto.caption}"
              </p>
              
              {/* Thumbnails Row */}
              <div className="flex items-center gap-1.5 pt-2 overflow-x-auto max-w-full py-1">
                {MEMORIES.map((m, idx) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setPhotoIndex(idx);
                      setActiveModalPhoto(m);
                    }}
                    className={`w-7 h-7 rounded-md overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      photoIndex === idx ? 'border-rose-500 scale-110 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={m.src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Traveling CSS keyframes (Moving across the screen, gentle swaying left and right) */}
      <style>{`
        @keyframes travelLeftToRight {
          0% {
            transform: translateX(-160px) translateY(0px) rotate(-4deg);
          }
          25% {
            transform: translateX(25vw) translateY(-8px) rotate(3deg);
          }
          50% {
            transform: translateX(55vw) translateY(6px) rotate(-2deg);
          }
          75% {
            transform: translateX(85vw) translateY(-6px) rotate(4deg);
          }
          100% {
            transform: translateX(calc(100vw + 160px)) translateY(0px) rotate(-3deg);
          }
        }

        @keyframes travelRightToLeft {
          0% {
            transform: translateX(calc(100vw + 160px)) translateY(0px) rotate(4deg);
          }
          25% {
            transform: translateX(75vw) translateY(-6px) rotate(-3deg);
          }
          50% {
            transform: translateX(45vw) translateY(8px) rotate(2deg);
          }
          75% {
            transform: translateX(15vw) translateY(-8px) rotate(-4deg);
          }
          100% {
            transform: translateX(-160px) translateY(0px) rotate(3deg);
          }
        }
      `}</style>
    </>
  );
}
