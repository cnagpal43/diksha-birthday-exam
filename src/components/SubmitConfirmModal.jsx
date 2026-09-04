import React from 'react';
import { AlertCircle, CheckCircle, HelpCircle, ArrowLeft, Send } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function SubmitConfirmModal({
  isOpen,
  onClose,
  onConfirmSubmit,
  questions,
  questionStates
}) {
  if (!isOpen) return null;

  let answeredCount = 0;
  let notAnsweredCount = 0;
  let reviewCount = 0;
  let reviewAnsweredCount = 0;
  let notVisitedCount = 0;

  questions.forEach((q) => {
    const st = questionStates[q.id]?.status || 'notVisited';
    if (st === 'answered') answeredCount++;
    else if (st === 'notAnswered') notAnsweredCount++;
    else if (st === 'review') reviewCount++;
    else if (st === 'reviewAnswered') reviewAnsweredCount++;
    else notVisitedCount++;
  });

  const totalAttempted = answeredCount + reviewAnsweredCount;

  const handleConfirm = () => {
    sounds.playClick();
    onConfirmSubmit();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl border border-slate-300 overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-[#0f2744] text-white px-6 py-4 flex items-center justify-between border-b-2 border-blue-500">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base md:text-lg">Examination Submission Summary</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white font-bold text-lg"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <p className="text-xs md:text-sm text-slate-600">
            Please review your final response status before completing the <strong>NEET PG 2026: Diksha Edition</strong> test:
          </p>

          {/* Official Summary Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-4 py-2.5">Response Category</th>
                  <th className="px-4 py-2.5 text-right">Count</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-2.5 flex items-center gap-2 text-slate-700">
                    <span className="w-3 h-3 rounded-full bg-slate-400"></span>
                    Total Questions
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono font-bold text-slate-800">{questions.length}</td>
                </tr>
                <tr className="hover:bg-slate-50 bg-emerald-50/40">
                  <td className="px-4 py-2.5 flex items-center gap-2 text-emerald-800 font-semibold">
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                    Answered
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono font-bold text-emerald-700">{answeredCount}</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-2.5 flex items-center gap-2 text-rose-700">
                    <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                    Not Answered
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono font-bold text-rose-600">{notAnsweredCount}</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-2.5 flex items-center gap-2 text-purple-700">
                    <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                    Marked for Review
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono font-bold text-purple-600">{reviewCount}</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-2.5 flex items-center gap-2 text-purple-800">
                    <span className="relative w-3 h-3 rounded-full bg-purple-600 flex items-center justify-center">
                      <span className="w-1 h-1 bg-emerald-300 rounded-full"></span>
                    </span>
                    Answered & Marked for Review
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono font-bold text-purple-700">{reviewAnsweredCount}</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-4 py-2.5 flex items-center gap-2 text-slate-500">
                    <span className="w-3 h-3 rounded-full bg-slate-300"></span>
                    Not Visited
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono font-bold text-slate-600">{notVisitedCount}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-xl text-xs text-blue-900 leading-relaxed">
            <strong>Notice:</strong> Once submitted, responses cannot be altered. Your scorecard, percentile, and All India Rank #1 allotment will be released immediately!
          </div>
        </div>

        {/* Footer actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Test</span>
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>Yes, Submit Final Exam</span>
          </button>
        </div>

      </div>
    </div>
  );
}
