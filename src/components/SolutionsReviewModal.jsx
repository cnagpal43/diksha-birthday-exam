import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  BookOpen, 
  Stethoscope, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Eye, 
  EyeOff,
  Layers,
  Volume2
} from 'lucide-react';
import { sounds } from '../utils/audio';

export default function SolutionsReviewModal({
  isOpen,
  onClose,
  questions,
  questionStates,
  initialFilter = 'all'
}) {
  const [filter, setFilter] = useState(initialFilter); // 'all' | 'incorrect' | 'unattempted' | 'correct'
  const [revealedIds, setRevealedIds] = useState({}); // { [qId]: boolean }

  if (!isOpen) return null;

  // Toggle single explanation reveal
  const toggleReveal = (qId, isCorrect, isAnswered) => {
    const nextState = !revealedIds[qId];
    setRevealedIds((prev) => ({
      ...prev,
      [qId]: nextState
    }));

    if (nextState) {
      if (isCorrect) {
        sounds.speakYouAreTheBest();
      } else if (isAnswered && !isCorrect) {
        sounds.speakIAmWithYou();
      } else {
        sounds.playClick();
      }
    } else {
      sounds.playClick();
    }
  };

  // Reveal all or hide all
  const revealAll = () => {
    const all = {};
    questions.forEach((q) => {
      all[q.id] = true;
    });
    setRevealedIds(all);
    sounds.playClick();
  };

  const hideAll = () => {
    setRevealedIds({});
    sounds.playClick();
  };

  // Group questions by status
  let incorrectList = [];
  let correctList = [];
  let unattemptedList = [];

  questions.forEach((q) => {
    const userChoice = questionStates[q.id]?.answer;
    if (!userChoice) {
      unattemptedList.push(q);
    } else if (userChoice === q.correct) {
      correctList.push(q);
    } else {
      incorrectList.push(q);
    }
  });

  const getFilteredList = () => {
    if (filter === 'incorrect') return incorrectList;
    if (filter === 'unattempted') return unattemptedList;
    if (filter === 'correct') return correctList;
    return questions;
  };

  const displayedQuestions = getFilteredList();

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white max-w-4xl w-full rounded-2xl shadow-2xl border border-slate-300 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="bg-[#0f2744] text-white px-5 py-4 flex items-center justify-between border-b-4 border-blue-600">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-blue-400" />
            <div>
              <h3 className="font-bold text-base sm:text-lg">
                Official Clinical Solutions & Post-Exam Audit
              </h3>
              <p className="text-xs text-blue-200">
                Click on any question to inspect responses, correct keys & hear voice audio
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white font-bold text-xl px-2 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Filter Navigation & Bulk Actions Bar */}
        <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              type="button"
              onClick={() => setFilter('incorrect')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                filter === 'incorrect'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-white text-rose-700 border border-rose-200 hover:bg-rose-50'
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Wrong Questions ({incorrectList.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setFilter('unattempted')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                filter === 'unattempted'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Unattempted ({unattemptedList.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setFilter('correct')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                filter === 'correct'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Correct ({correctList.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              All (30)
            </button>
          </div>

          {/* Quick toggle controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={revealAll}
              className="px-2.5 py-1 rounded bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Eye className="w-3 h-3 text-blue-600" />
              <span>Reveal All</span>
            </button>
            <button
              type="button"
              onClick={hideAll}
              className="px-2.5 py-1 rounded bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
            >
              <EyeOff className="w-3 h-3 text-slate-500" />
              <span>Hide All</span>
            </button>
          </div>
        </div>

        {/* Questions List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {displayedQuestions.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-2">
              <Sparkles className="w-10 h-10 text-amber-500 mx-auto" />
              <h4 className="font-bold text-slate-800 text-base">
                {filter === 'incorrect' ? 'Flawless Record! No Wrong Questions Found 🎉' : 'No questions match this filter.'}
              </h4>
              <p className="text-xs text-slate-500">
                {filter === 'incorrect' ? 'You answered every attempted question with 100% precision!' : 'Try selecting another filter above.'}
              </p>
            </div>
          ) : (
            displayedQuestions.map((q) => {
              const userState = questionStates[q.id];
              const userChoice = userState?.answer;
              const isAnswered = Boolean(userChoice);
              const isCorrect = isAnswered && userChoice === q.correct;
              const isIncorrect = isAnswered && userChoice !== q.correct;
              const isUnattempted = !isAnswered;
              const isRevealed = revealedIds[q.id];

              const chosenOptionObj = q.options.find((opt) => opt.id === userChoice);
              const correctOptionObj = q.options.find((opt) => opt.id === q.correct);

              return (
                <div
                  key={q.id}
                  className={`rounded-xl border transition-all duration-200 shadow-sm overflow-hidden ${
                    isIncorrect
                      ? 'border-rose-300 bg-rose-50/20'
                      : isCorrect
                        ? 'border-emerald-200 bg-emerald-50/10'
                        : 'border-slate-200 bg-slate-50/30'
                  }`}
                >
                  {/* Card Header */}
                  <div className="px-4 py-3 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`font-mono font-bold text-xs px-2.5 py-0.5 rounded text-white ${
                        isIncorrect ? 'bg-rose-600' : isCorrect ? 'bg-emerald-600' : 'bg-slate-500'
                      }`}>
                        Q{q.id}
                      </span>
                      <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                        <Layers className="w-3 h-3 text-blue-600" />
                        {q.section?.split(':')[0]}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        • {q.subject}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isCorrect && (
                        <>
                          <button
                            type="button"
                            onClick={() => sounds.speakYouAreTheBest()}
                            className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200 flex items-center gap-1 font-bold text-[11px] cursor-pointer"
                            title="Hear voice feedback"
                          >
                            <Volume2 className="w-3 h-3 text-emerald-600" />
                            <span>"You are the best!"</span>
                          </button>
                          <span className="bg-emerald-100 text-emerald-800 font-bold text-xs px-2.5 py-0.5 rounded border border-emerald-300 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            +4.00 (Correct)
                          </span>
                        </>
                      )}
                      {isIncorrect && (
                        <>
                          <button
                            type="button"
                            onClick={() => sounds.speakIAmWithYou()}
                            className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-300 hover:bg-rose-200 flex items-center gap-1 font-bold text-[11px] cursor-pointer"
                            title="Hear voice feedback"
                          >
                            <Volume2 className="w-3 h-3 text-rose-600" />
                            <span>"I am with you"</span>
                          </button>
                          <span className="bg-rose-100 text-rose-800 font-bold text-xs px-2.5 py-0.5 rounded border border-rose-300 flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5 text-rose-600" />
                            -1.33 (-1/3 Penalty)
                          </span>
                        </>
                      )}
                      {isUnattempted && (
                        <span className="bg-slate-200 text-slate-700 font-medium text-xs px-2.5 py-0.5 rounded flex items-center gap-1">
                          0.00 (Unattempted)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Question Stem */}
                  <div className="p-4 space-y-3 bg-white">
                    <p className="font-semibold text-slate-900 text-sm sm:text-base leading-relaxed">
                      {q.question}
                    </p>

                    {/* Candidate's choice summary */}
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                          Your Response:
                        </span>
                        {isAnswered ? (
                          <span className={`font-semibold flex items-center gap-1 ${
                            isCorrect ? 'text-emerald-700' : 'text-rose-700'
                          }`}>
                            {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                            [{userChoice}] {chosenOptionObj?.text}
                          </span>
                        ) : (
                          <span className="text-slate-500 italic">
                            Unattempted (No option selected)
                          </span>
                        )}
                      </div>

                      {/* Click to Reveal Button */}
                      <button
                        type="button"
                        onClick={() => toggleReveal(q.id, isCorrect, isAnswered)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                          isRevealed
                            ? 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                            : isIncorrect
                              ? 'bg-rose-600 hover:bg-rose-700 text-white shadow'
                              : 'bg-blue-600 hover:bg-blue-700 text-white shadow'
                        }`}
                      >
                        {isRevealed ? (
                          <>
                            <ChevronUp className="w-3.5 h-3.5" />
                            <span>Hide Explanation</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5" />
                            <span>{isIncorrect ? '👉 Reveal Correct Answer & Explanation' : 'View Clinical Explanation'}</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Expandable Correct Answer & Clinical Explanation */}
                    {isRevealed && (
                      <div className="mt-3 p-4 rounded-xl border border-blue-200 bg-blue-50/70 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                        {/* Correct Answer Highlight */}
                        <div className="flex items-start gap-2 bg-emerald-100/90 border border-emerald-300 p-2.5 rounded-lg text-emerald-950 text-xs">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                          <div>
                            <span className="font-bold uppercase tracking-wider text-[10px] text-emerald-800 block">
                              Correct Key (Verified):
                            </span>
                            <span className="font-semibold text-emerald-900">
                              [{q.correct}] {correctOptionObj?.text}
                            </span>
                          </div>
                        </div>

                        {/* Clinical Case Explanation */}
                        <div className="space-y-1 text-xs text-slate-800">
                          <div className="font-bold flex items-center gap-1.5 text-blue-900 uppercase tracking-wide text-[11px]">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            <span>Official Clinical Case Explanation:</span>
                          </div>
                          <p className="leading-relaxed bg-white/90 p-3 rounded-lg border border-blue-200/80 font-medium text-slate-800">
                            {q.rationale}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500 hidden sm:inline">
            Showing {displayedQuestions.length} of 30 questions
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold cursor-pointer shadow ml-auto"
          >
            Close Review
          </button>
        </div>

      </div>
    </div>
  );
}
