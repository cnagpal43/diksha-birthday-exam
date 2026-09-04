import React from 'react';
import { Clock, Send, Volume2, VolumeX, Stethoscope, CheckCircle2 } from 'lucide-react';

export default function ExamHeader({ 
  candidateInfo, 
  elapsedTime, 
  onSubmitClick,
  isMuted,
  onToggleMute,
  capturedPhoto
}) {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <header className="bg-[#0f2744] text-white border-b-4 border-blue-600 shadow-md sticky top-0 z-40">
      {/* Top utility row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 border-b border-slate-700/60 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Stethoscope className="w-4 h-4 text-blue-400" />
          <span className="font-semibold tracking-wide text-slate-200">
            NEET PG 2026: <span className="text-blue-300">DIKSHA SPECIAL EDITION</span>
          </span>
          <span className="hidden sm:inline-block bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded text-[10px] font-mono border border-blue-400/30">
            UNTIMED CBT MODE
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleMute}
            className="p-1 sm:px-2 sm:py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 flex items-center gap-1 transition-colors cursor-pointer"
            title="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-green-400" />}
            <span className="hidden sm:inline text-[11px]">{isMuted ? 'Muted' : 'Sound'}</span>
          </button>
          <span className="text-[11px] text-slate-400 hidden md:inline">
            Candidate Roll No: <strong className="text-white font-mono">{candidateInfo.rollNumber}</strong>
          </span>
        </div>
      </div>

      {/* Main header row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2">
        {/* Candidate profile snapshot */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="relative">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 border border-blue-300/40 flex items-center justify-center text-lg sm:text-xl shadow overflow-hidden">
              {capturedPhoto ? (
                <img
                  src={capturedPhoto}
                  alt="Candidate"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>👩‍⚕️</span>
              )}
            </div>
            {capturedPhoto && (
              <span className="absolute -bottom-1 -right-1 bg-pink-500 text-white p-0.5 rounded-full text-[8px]" title="Pout Verified">
                💋
              </span>
            )}
          </div>

          <div>
            <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 leading-tight">
              {candidateInfo.name}
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] px-1.5 py-0.2 rounded font-mono hidden sm:inline">
                ACTIVE SESSION
              </span>
            </div>
            <div className="text-[10px] sm:text-xs text-slate-300 flex items-center gap-2">
              <span>Roll: {candidateInfo.rollNumber}</span>
              <span className="hidden sm:inline text-slate-300">• Marking: <strong className="text-emerald-300">+4</strong> / <strong className="text-rose-300">-1.33</strong> (-1/3)</span>
            </div>
          </div>
        </div>

        {/* Elapsed Timer & Submit Action */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Elapsed Session Clock */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono bg-slate-800/90 border-slate-600 text-emerald-300">
            <Clock className="w-4 h-4 text-emerald-400" />
            <div className="flex flex-col text-left">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-sans font-semibold">
                Time Elapsed
              </span>
              <span className="text-sm sm:text-base font-bold tracking-wider leading-none">
                {formatTime(elapsedTime)}
              </span>
            </div>
          </div>

          {/* Submit Test Button */}
          <button
            type="button"
            onClick={onSubmitClick}
            className="px-3.5 py-2 sm:px-4 sm:py-2 rounded-lg font-bold text-xs sm:text-sm bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-md hover:shadow-lg flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer active:scale-95"
          >
            <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Submit Exam</span>
          </button>
        </div>
      </div>
    </header>
  );
}
