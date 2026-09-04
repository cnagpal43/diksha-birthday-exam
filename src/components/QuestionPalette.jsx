import React, { useState } from 'react';
import { LayoutGrid, ChevronUp, ChevronDown, Filter } from 'lucide-react';
import { sounds } from '../utils/audio';
import { SECTIONS } from '../data/examData';

export default function QuestionPalette({
  questions,
  currentIndex,
  onJumpToQuestion,
  questionStates,
  isOpenMobile,
  setIsOpenMobile
}) {
  const [selectedSectionFilter, setSelectedSectionFilter] = useState('ALL');

  const getStatus = (qId) => {
    return questionStates[qId]?.status || 'notVisited';
  };

  // Count summaries
  let answeredCount = 0;
  let notAnsweredCount = 0;
  let reviewCount = 0;
  let reviewAnsweredCount = 0;
  let notVisitedCount = 0;

  questions.forEach((q) => {
    const st = getStatus(q.id);
    if (st === 'answered') answeredCount++;
    else if (st === 'notAnswered') notAnsweredCount++;
    else if (st === 'review') reviewCount++;
    else if (st === 'reviewAnswered') reviewAnsweredCount++;
    else notVisitedCount++;
  });

  const handlePaletteClick = (index) => {
    sounds.playClick();
    onJumpToQuestion(index);
    if (isOpenMobile) setIsOpenMobile(false);
  };

  const renderBadge = (q, index) => {
    const st = getStatus(q.id);
    const isCurrent = currentIndex === index;

    let bgClass = 'bg-slate-200 text-slate-700 border-slate-300 hover:bg-slate-300';
    let indicator = null;

    if (st === 'answered') {
      bgClass = 'bg-emerald-600 text-white border-emerald-700 hover:bg-emerald-700 shadow-sm';
    } else if (st === 'notAnswered') {
      bgClass = 'bg-rose-600 text-white border-rose-700 hover:bg-rose-700 shadow-sm';
    } else if (st === 'review') {
      bgClass = 'bg-purple-600 text-white border-purple-700 hover:bg-purple-700 shadow-sm';
    } else if (st === 'reviewAnswered') {
      bgClass = 'bg-purple-600 text-white border-purple-700 hover:bg-purple-700 shadow-sm';
      indicator = (
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full shadow-sm" />
      );
    }

    return (
      <button
        key={q.id}
        type="button"
        onClick={() => handlePaletteClick(index)}
        className={`relative w-9 h-9 sm:w-9 sm:h-9 rounded-lg font-mono font-bold text-xs border flex items-center justify-center transition-all cursor-pointer ${bgClass} ${
          isCurrent ? 'ring-4 ring-blue-400 ring-offset-1 scale-110 font-extrabold z-10' : ''
        }`}
        title={`Q${q.id} - ${st}`}
      >
        {q.id}
        {indicator}
      </button>
    );
  };

  const filteredQuestions = questions.filter((q) => {
    if (selectedSectionFilter === 'ALL') return true;
    const sec = SECTIONS.find((s) => s.id === Number(selectedSectionFilter));
    if (!sec) return true;
    return q.id >= sec.range[0] && q.id <= sec.range[1];
  });

  return (
    <>
      {/* Mobile Floating Drawer Trigger */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0f2744] text-white px-4 py-2.5 shadow-2xl border-t border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-semibold">Question Palette</span>
          <span className="bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[10px] px-1.5 py-0.5 rounded font-mono">
            {answeredCount + reviewAnsweredCount}/{questions.length} Attempted
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded flex items-center gap-1 cursor-pointer"
        >
          <span>{isOpenMobile ? 'Hide Palette' : 'View Palette'}</span>
          {isOpenMobile ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>

      {/* Palette Container (Sidebar on desktop, Slide-up sheet on mobile) */}
      <div
        className={`fixed md:static inset-x-0 bottom-12 md:bottom-auto z-30 md:z-0 transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-y-0' : 'translate-y-full md:translate-y-0'
        } w-full md:w-80 flex flex-col`}
      >
        <div className="bg-white rounded-t-2xl md:rounded-xl shadow-xl md:shadow-sm border border-slate-300 overflow-hidden flex flex-col max-h-[82vh] md:max-h-[calc(100vh-140px)]">
          
          {/* Palette Header */}
          <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LayoutGrid className="w-4 h-4 text-blue-700" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                Question Palette (1 - {questions.length})
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsOpenMobile(false)}
              className="md:hidden text-slate-400 hover:text-slate-700 text-xs font-bold"
            >
              ✕
            </button>
          </div>

          {/* Section Filter Pills */}
          <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 flex items-center gap-1 overflow-x-auto text-[10px]">
            <button
              type="button"
              onClick={() => setSelectedSectionFilter('ALL')}
              className={`px-2 py-0.5 rounded font-semibold whitespace-nowrap ${
                selectedSectionFilter === 'ALL'
                  ? 'bg-blue-700 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              All (30)
            </button>
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedSectionFilter(s.id.toString())}
                className={`px-2 py-0.5 rounded font-semibold whitespace-nowrap ${
                  selectedSectionFilter === s.id.toString()
                    ? 'bg-blue-700 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
                title={s.name}
              >
                Sec {s.id} ({s.range[0]}-{s.range[1]})
              </button>
            ))}
          </div>

          {/* Question Grid Buttons */}
          <div className="p-3 bg-slate-50 border-b border-slate-200 overflow-y-auto flex-1">
            <div className="grid grid-cols-5 sm:grid-cols-5 gap-2 justify-items-center">
              {filteredQuestions.map((q) => {
                const globalIndex = questions.findIndex((item) => item.id === q.id);
                return renderBadge(q, globalIndex);
              })}
            </div>
          </div>

          {/* Legend Details */}
          <div className="p-3 space-y-1.5 text-xs bg-white border-t border-slate-100">
            <div className="grid grid-cols-2 gap-1.5 text-[10px]">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-emerald-600 text-white font-mono font-bold flex items-center justify-center text-[9px]">
                  {answeredCount}
                </span>
                <span className="text-slate-700">Answered</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-rose-600 text-white font-mono font-bold flex items-center justify-center text-[9px]">
                  {notAnsweredCount}
                </span>
                <span className="text-slate-700">Not Answered</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-purple-600 text-white font-mono font-bold flex items-center justify-center text-[9px]">
                  {reviewCount}
                </span>
                <span className="text-slate-700">Marked Review</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="relative w-4 h-4 rounded bg-purple-600 text-white font-mono font-bold flex items-center justify-center text-[9px]">
                  {reviewAnsweredCount}
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-400 rounded-full border border-white" />
                </span>
                <span className="text-slate-700">Ans & Marked</span>
              </div>

              <div className="flex items-center gap-1.5 col-span-2">
                <span className="w-4 h-4 rounded bg-slate-300 text-slate-700 font-mono font-bold flex items-center justify-center text-[9px]">
                  {notVisitedCount}
                </span>
                <span className="text-slate-700">Not Visited</span>
              </div>
            </div>
          </div>

          {/* Prompt note */}
          <div className="p-2.5 bg-blue-50/80 border-t border-blue-100 text-[10px] text-blue-900 leading-tight">
            🩺 <strong>NEET PG 2026:</strong> Total 30 Questions across 6 Clinical Sections.
          </div>
        </div>
      </div>
    </>
  );
}
