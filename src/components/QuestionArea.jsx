import React, { useRef, useEffect } from 'react';
import { 
  RotateCcw, 
  BookmarkCheck, 
  ArrowRight, 
  ArrowLeft, 
  Stethoscope, 
  Sparkles, 
  Layers
} from 'lucide-react';
import { sounds } from '../utils/audio';

export default function QuestionArea({
  currentQuestion,
  currentIndex,
  totalQuestions,
  questions,
  questionStates,
  onJumpToQuestion,
  selectedOption,
  onSelectOption,
  onSaveAndNext,
  onMarkForReview,
  onClearResponse,
  onPrevious
}) {
  const stripRef = useRef(null);

  const handleOptionClick = (optionId) => {
    sounds.playClick();
    onSelectOption(optionId);
  };

  // Scroll active question into view in the top strip
  useEffect(() => {
    if (stripRef.current) {
      const activeEl = stripRef.current.querySelector(`[data-qidx="${currentIndex}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentIndex]);

  // Compute live counts for the summary legend
  let answeredCount = 0;
  let notAnsweredCount = 0;
  let reviewCount = 0;
  let reviewAnsweredCount = 0;
  let notVisitedCount = 0;

  if (questions && questionStates) {
    questions.forEach((q) => {
      const st = questionStates[q.id]?.status || 'notVisited';
      if (st === 'answered') answeredCount++;
      else if (st === 'notAnswered') notAnsweredCount++;
      else if (st === 'review') reviewCount++;
      else if (st === 'reviewAnswered') reviewAnsweredCount++;
      else notVisitedCount++;
    });
  }

  const getStatusBadge = (q, index) => {
    const st = questionStates?.[q.id]?.status || 'notVisited';
    const isCurrent = currentIndex === index;

    let bgClass = 'bg-slate-200 text-slate-700 hover:bg-slate-300';
    let indicator = null;

    if (st === 'answered') {
      bgClass = 'bg-emerald-600 text-white shadow-xs';
    } else if (st === 'notAnswered') {
      bgClass = 'bg-rose-600 text-white shadow-xs';
    } else if (st === 'review') {
      bgClass = 'bg-purple-600 text-white shadow-xs';
    } else if (st === 'reviewAnswered') {
      bgClass = 'bg-purple-600 text-white shadow-xs';
      indicator = (
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 border border-white rounded-full" />
      );
    }

    return (
      <button
        key={q.id}
        data-qidx={index}
        type="button"
        onClick={() => onJumpToQuestion(index)}
        className={`relative shrink-0 w-8 h-8 rounded-md font-mono text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${bgClass} ${
          isCurrent ? 'ring-2 ring-blue-600 ring-offset-1 scale-110 font-black z-10' : 'opacity-90'
        }`}
        title={`Jump to Q${q.id}`}
      >
        {q.id}
        {indicator}
      </button>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-md border border-slate-300 flex flex-col justify-between overflow-hidden">
      
      {/* Top Question Meta Bar */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2.5">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white font-bold text-xs px-2.5 py-1 rounded">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span className="bg-slate-200 text-slate-700 font-semibold text-xs px-2 py-0.5 rounded flex items-center gap-1">
              <Layers className="w-3 h-3 text-blue-600" />
              {currentQuestion.section?.split(':')[0] || 'Section'}
            </span>
          </div>
          <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
            <Stethoscope className="w-3.5 h-3.5 text-blue-600" />
            {currentQuestion.subject}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="bg-emerald-100 text-emerald-800 font-medium px-2 py-0.5 rounded border border-emerald-300 font-mono">
            +4.00 Marks
          </span>
          <span className="bg-rose-100 text-rose-800 font-medium px-2 py-0.5 rounded border border-rose-300 font-mono">
            -1.33 Negative (-1/3)
          </span>
        </div>
      </div>

      {/* Quick Navigation Strip (All 30 Questions) */}
      {questions && questions.length > 0 && (
        <div className="bg-slate-100/95 border-b border-slate-200 px-3 py-2 flex items-center gap-2">
          <span className="text-[10px] uppercase font-bold text-slate-500 shrink-0 hidden sm:inline">
            Status:
          </span>
          <div
            ref={stripRef}
            className="flex-1 flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-thin"
          >
            {questions.map((q, idx) => getStatusBadge(q, idx))}
          </div>
          <span className="text-[10px] text-slate-400 shrink-0 hidden md:inline">
            Tap to jump
          </span>
        </div>
      )}

      {/* Live Status Counters Row (Moved from palette into the main section!) */}
      <div className="bg-slate-50/80 border-b border-slate-200 px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          <span className="flex items-center gap-1.5 font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span><strong>{answeredCount}</strong> Answered</span>
          </span>

          <span className="flex items-center gap-1.5 font-semibold text-rose-800 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span><strong>{notAnsweredCount}</strong> Not Answered</span>
          </span>

          <span className="flex items-center gap-1.5 font-semibold text-purple-800 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200 shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
            <span><strong>{reviewCount}</strong> Marked Review</span>
          </span>

          <span className="flex items-center gap-1.5 font-semibold text-purple-900 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200 shadow-2xs">
            <span className="relative w-2.5 h-2.5 rounded-full bg-purple-600 flex items-center justify-center">
              <span className="w-1 h-1 bg-emerald-300 rounded-full"></span>
            </span>
            <span><strong>{reviewAnsweredCount}</strong> Ans & Review</span>
          </span>

          <span className="flex items-center gap-1.5 font-medium text-slate-600 bg-slate-200/70 px-2.5 py-1 rounded-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
            <span><strong>{notVisitedCount}</strong> Not Visited</span>
          </span>
        </div>

        <span className="text-[11px] text-slate-400 font-mono hidden lg:inline">
          {currentIndex + 1} / {totalQuestions} Active
        </span>
      </div>

      {/* Main Question Stem & Options (STRICTLY NO EXPLANATIONS DURING TEST) */}
      <div className="p-4 sm:p-6 md:p-8 flex-1 overflow-y-auto space-y-6">
        {/* Question Text */}
        <div className="text-slate-900 font-medium text-base md:text-lg leading-relaxed space-y-2">
          <p className="font-semibold text-slate-800">
            Q{currentIndex + 1}. {currentQuestion.question}
          </p>
          <div className="text-xs text-slate-500 italic flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Single Best Answer (Select one option)</span>
          </div>
        </div>

        {/* Options List */}
        <div className="space-y-3 pt-2">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedOption === option.id;
            return (
              <label
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                className={`flex items-start gap-3 p-3.5 md:p-4 rounded-xl border-2 transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/80 shadow-sm text-blue-950 font-medium'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70 text-slate-800'
                }`}
              >
                <div className="mt-0.5 flex items-center justify-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-slate-400 bg-white'
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>

                <div className="flex-1 flex items-start gap-2">
                  <span
                    className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    [{option.id}]
                  </span>
                  <span className="text-sm md:text-base leading-snug">
                    {option.text}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Bottom CBT Action Bar */}
      <div className="bg-slate-50 border-t border-slate-200 px-4 py-3.5 flex flex-wrap items-center justify-between gap-2.5">
        {/* Left side actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClearResponse}
            disabled={!selectedOption}
            className={`px-3 py-2 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
              selectedOption
                ? 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100 cursor-pointer shadow-sm'
                : 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
            title="Clear current answer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Response</span>
          </button>

          <button
            type="button"
            onClick={onMarkForReview}
            className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-300 hover:bg-purple-200 flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm active:scale-95"
            title="Mark for review and advance"
          >
            <BookmarkCheck className="w-3.5 h-3.5 text-purple-700" />
            <span>Mark for Review & Next</span>
          </button>
        </div>

        {/* Right side navigation */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrevious}
            disabled={currentIndex === 0}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
              currentIndex > 0
                ? 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100 cursor-pointer shadow-sm'
                : 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={onSaveAndNext}
            className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-blue-700 hover:bg-blue-800 text-white flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <span>{currentIndex === totalQuestions - 1 ? 'Save & Review Test' : 'Save & Next'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
