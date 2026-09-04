import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import { 
  Award, 
  Trophy, 
  Heart, 
  Download, 
  Printer, 
  RotateCcw, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  XCircle,
  HelpCircle,
  Star, 
  Stethoscope, 
  Calendar, 
  ShieldCheck,
  QrCode,
  Share2,
  ChevronDown,
  ChevronUp,
  Eye,
  Layers,
  AlertCircle,
  Volume2,
  Camera,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { CANDIDATE_PROFILES, BIRTHDAY_LETTER } from '../data/examData';
import { MEMORIES } from '../data/memoriesData';
import { sounds } from '../utils/audio';
import SolutionsReviewModal from './SolutionsReviewModal';

export default function CelebrationFinale({
  questions,
  questionStates,
  candidateInfo,
  onRetakeExam,
  capturedPhoto
}) {
  const scorecardRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showSolutionsModal, setShowSolutionsModal] = useState(false);
  const [initialModalFilter, setInitialModalFilter] = useState('incorrect');

  // Inline Review state on the page
  const [inlineFilter, setInlineFilter] = useState('incorrect'); // 'incorrect' | 'unattempted' | 'correct' | 'all'
  const [revealedInlineIds, setRevealedInlineIds] = useState({});

  // Wall of Love memory lightbox state
  const [activePhotoIdx, setActivePhotoIdx] = useState(null);

  // Compute exam metrics using official NEET PG rules (+4 for correct, -1 for incorrect)
  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;

  const incorrectQuestions = [];
  const correctQuestions = [];
  const unattemptedQuestions = [];

  questions.forEach((q) => {
    const userChoice = questionStates[q.id]?.answer;
    if (!userChoice) {
      unattemptedCount++;
      unattemptedQuestions.push(q);
    } else if (userChoice === q.correct) {
      correctCount++;
      correctQuestions.push(q);
    } else {
      incorrectCount++;
      incorrectQuestions.push(q);
    }
  });

  // Official Examination formula: +4 for correct, -1.33 for incorrect (-1/3 negative marking)
  const rawScore = (correctCount * 4) - (incorrectCount * (4 / 3));
  const totalMaxScore = questions.length * 4; // 120 marks
  const formattedScore = rawScore.toFixed(2);
  const accuracy = (correctCount + incorrectCount) > 0 
    ? Math.round((correctCount / (correctCount + incorrectCount)) * 100) 
    : 100;

  // Fire celebratory fireworks / confetti on mount
  useEffect(() => {
    sounds.playCelebration();

    const duration = 4.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 70, zIndex: 9999 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 45 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ff6b8b', '#60a5fa', '#f59e0b', '#10b981', '#a855f7']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ff6b8b', '#60a5fa', '#f59e0b', '#10b981', '#a855f7']
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const triggerConfettiAgain = () => {
    sounds.playCelebration();
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6']
    });
  };

  const handleDownloadImage = async () => {
    if (!scorecardRef.current) return;
    try {
      setIsDownloading(true);
      sounds.playClick();
      
      const canvas = await html2canvas(scorecardRef.current, {
        scale: 2, // High resolution
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `NEET_PG_2026_AIR1_${candidateInfo.name.replace(/[^a-zA-Z0-9]/g, '_')}_Scorecard.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to download image', err);
      alert('Unable to auto-save image. You can use the Print / Save as PDF option!');
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  const toggleInlineReveal = (qId, isCorrect, isAnswered) => {
    const nextState = !revealedInlineIds[qId];
    setRevealedInlineIds((prev) => ({
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

  // Inline filter selection
  const getInlineList = () => {
    if (inlineFilter === 'incorrect') return incorrectQuestions;
    if (inlineFilter === 'unattempted') return unattemptedQuestions;
    if (inlineFilter === 'correct') return correctQuestions;
    return questions;
  };

  const displayedInlineList = getInlineList();

  return (
    <div className="min-h-screen bg-slate-100 py-6 px-3 sm:px-6 flex flex-col items-center justify-center">
      
      {/* Top Banner & Quick Actions */}
      <div className="max-w-4xl w-full flex flex-wrap items-center justify-between gap-3 mb-6 no-print">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
            <Trophy className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              Result Declared: AIR #1 🏆
            </h1>
            <p className="text-xs text-slate-600">
              National Eligibility cum True Partner Examination (NEET PG 2026: Official Scoring)
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={triggerConfettiAgain}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>More Confetti! 🎉</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setInitialModalFilter(incorrectCount > 0 ? 'incorrect' : 'all');
              setShowSolutionsModal(true);
            }}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-100 hover:bg-blue-200 text-blue-900 border border-blue-300 flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer shadow-sm"
          >
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Full Solutions Modal</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadImage}
            disabled={isDownloading}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md hover:shadow-lg flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{isDownloading ? 'Generating PNG...' : 'Save Rank Card (PNG)'}</span>
          </button>
        </div>
      </div>

      {/* The Official NBE AIR #1 Scorecard (Downloadable / Printable Container) */}
      <div
        ref={scorecardRef}
        className="max-w-4xl w-full bg-white rounded-2xl shadow-xl border-2 border-slate-300 overflow-hidden relative"
      >
        {/* Decorative Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
          <span className="text-9xl font-black rotate-[-30deg] tracking-widest text-slate-900">
            AIR 1 • CHIRAG'S HEART
          </span>
        </div>

        {/* Official Scorecard Header */}
        <div className="bg-[#0f2744] text-white p-5 md:p-6 border-b-4 border-amber-500 relative">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white/10 rounded-xl border border-white/20 flex items-center justify-center text-blue-300 shadow-inner">
                <Stethoscope className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest text-amber-400 font-bold uppercase block">
                  NATIONAL BOARD OF MEDICAL & ROMANTIC EXAMINATIONS
                </span>
                <h2 className="text-lg md:text-2xl font-black tracking-tight text-white">
                  NEET PG 2026: OFFICIAL SCORECARD & ALLOTMENT LETTER
                </h2>
                <p className="text-xs text-slate-300">
                  Autonomous Body under Directorate General of True Love & Affection
                </p>
              </div>
            </div>

            <div className="bg-amber-500/20 border-2 border-amber-400/60 px-4 py-2 rounded-xl flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">ALL INDIA RANK</span>
              <span className="text-2xl md:text-3xl font-black text-amber-300 tracking-tight flex items-center gap-1 font-mono">
                <Trophy className="w-6 h-6 text-amber-400 inline" /> #1
              </span>
            </div>
          </div>
        </div>

        {/* Main Scorecard Body */}
        <div className="p-5 md:p-8 space-y-6">
          
          {/* Candidate Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            {/* Photo Box with Pout Verified badge */}
            <div className="flex flex-col items-center justify-center p-2 bg-white rounded-lg border border-slate-200 relative">
              <div className="w-24 h-28 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded border border-blue-300 flex flex-col items-center justify-center mb-1 overflow-hidden shadow-sm">
                {capturedPhoto ? (
                  <img
                    src={capturedPhoto}
                    alt="Candidate Biometric Pout"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <span className="text-3xl">👩‍⚕️</span>
                    <span className="text-[9px] font-bold text-blue-800 uppercase mt-1">CANDIDATE</span>
                  </>
                )}
              </div>
              <span className="font-bold text-slate-800 text-center">{candidateInfo.name}</span>
              {capturedPhoto && (
                <span className="bg-pink-100 text-pink-800 border border-pink-300 text-[9px] px-1.5 py-0.2 rounded-full font-semibold mt-0.5">
                  Pout Approved 💋
                </span>
              )}
            </div>

            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-3 self-center">
              <div>
                <span className="text-slate-500 block text-[11px]">Candidate Full Name:</span>
                <strong className="text-slate-900 text-sm">{candidateInfo.name}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Roll Number:</span>
                <strong className="font-mono text-slate-900 text-sm">{candidateInfo.rollNumber}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Category / Quota:</span>
                <strong className="text-purple-700 text-xs font-semibold">{candidateInfo.category}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Scoring Scheme:</span>
                <strong className="text-slate-800 text-xs font-mono">+4.00 Correct / -1.33 Penalty (-1/3 Marking)</strong>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-500 block text-[11px]">Allotted Examination Center:</span>
                <strong className="text-slate-800 text-xs">{candidateInfo.centerName}</strong>
              </div>
            </div>
          </div>

          {/* Score & Performance Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5">
              <span className="text-[11px] font-bold uppercase text-blue-700 tracking-wider block mb-1">
                Marks Obtained
              </span>
              <span className="text-2xl md:text-3xl font-mono font-black text-blue-900">
                {formattedScore} <span className="text-xs font-medium text-slate-500">/ {totalMaxScore}</span>
              </span>
              <span className="text-[10px] text-blue-600 block mt-0.5">+4.00 / -1.33 Scheme (-1/3)</span>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5">
              <span className="text-[11px] font-bold uppercase text-emerald-700 tracking-wider block mb-1">
                Percentile Score
              </span>
              <span className="text-2xl md:text-3xl font-mono font-black text-emerald-900">
                {candidateInfo.percentile}
              </span>
              <span className="text-[10px] text-emerald-600 block mt-0.5">Top 0.001% in Chirag's Heart</span>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5">
              <span className="text-[11px] font-bold uppercase text-amber-700 tracking-wider block mb-1">
                All India Rank
              </span>
              <span className="text-2xl md:text-3xl font-mono font-black text-amber-900 flex items-center justify-center gap-1">
                AIR 1
              </span>
              <span className="text-[10px] text-amber-600 block mt-0.5">Category: Love & Life</span>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-3.5">
              <span className="text-[11px] font-bold uppercase text-purple-700 tracking-wider block mb-1">
                Accuracy Rate
              </span>
              <span className="text-2xl md:text-3xl font-mono font-black text-purple-900">
                {accuracy}%
              </span>
              <span className="text-[10px] text-purple-600 block mt-0.5">{correctCount} of {questions.length} Correct</span>
            </div>
          </div>

          {/* Quick Breakdown Badges with -1.00 penalty */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs">
            <span className="bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full border border-emerald-300 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Correct: {correctCount} (+{(correctCount * 4).toFixed(1)})
            </span>
            <span className="bg-rose-100 text-rose-800 font-bold px-3 py-1 rounded-full border border-rose-300 flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5 text-rose-600" />
              Incorrect: {incorrectCount} (-{(incorrectCount * (4 / 3)).toFixed(2)})
            </span>
            <span className="bg-slate-100 text-slate-700 font-medium px-3 py-1 rounded-full border border-slate-300 flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
              Unattempted: {unattemptedCount} (0.00)
            </span>
          </div>

          {/* Official Allotment Letter Box */}
          <div className="border-2 border-emerald-500 bg-emerald-50/60 rounded-xl p-4 md:p-5 relative overflow-hidden">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-emerald-600 text-white rounded-lg shadow mt-0.5">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-700 text-white font-bold text-[10px] px-2 py-0.5 rounded tracking-wide uppercase">
                    PROVISIONAL SEAT ALLOTMENT LETTER
                  </span>
                  <span className="text-xs font-semibold text-emerald-800">Round 1 (Merit AIR 1)</span>
                </div>
                <h3 className="text-base md:text-lg font-black text-slate-900 leading-snug">
                  Allotted Speciality & Seat:
                </h3>
                <p className="text-sm md:text-base font-bold text-emerald-900">
                  {candidateInfo.seatAllotment}
                </p>
                <p className="text-xs text-slate-700 pt-1 leading-relaxed">
                  <strong>Evaluation Remarks:</strong> {candidateInfo.remarks}
                </p>
              </div>
            </div>
          </div>

          {/* Official Verification Footnote with Barcode & Chirag's Signature */}
          <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 items-center gap-4 text-xs">
            <div className="flex items-center gap-2.5">
              <QrCode className="w-12 h-12 text-slate-800 p-1 border border-slate-300 rounded" />
              <div>
                <span className="font-mono text-[10px] text-slate-500 block">DIGITAL VERIFICATION HASH</span>
                <span className="font-mono text-[11px] text-slate-800 font-bold">NBTA-DIKSHA-AIR-001</span>
                <span className="text-[10px] text-emerald-600 block flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3 h-3 inline" /> 100% Tamper Proof
                </span>
              </div>
            </div>

            <div className="text-center sm:text-left text-slate-500 text-[11px]">
              <p>Certified by the National Board of True Affection.</p>
              <p className="text-slate-400">Valid for a lifetime of unconditional love, laughter, and support.</p>
            </div>

            <div className="flex flex-col items-center sm:items-end text-right">
              <div className="font-serif italic font-bold text-lg text-blue-900 tracking-wide">
                Chirag Nagpal
              </div>
              <div className="w-32 border-b border-slate-400 my-0.5"></div>
              <span className="font-bold text-[10px] uppercase text-slate-700 tracking-wider">
                Exam Controller & Lifetime Partner
              </span>
              <span className="text-[10px] text-slate-500">National Board of True Affection</span>
            </div>
          </div>

        </div>

      </div>

      {/* DEDICATED POST-EXAM AUDIT & MISTAKES EXPLORER WITH VOICE AUDIO FEEDBACK */}
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg border border-slate-300 overflow-hidden mt-6 no-print">
        {/* Section Header */}
        <div className="bg-[#0f2744] text-white px-5 py-4 flex flex-wrap items-center justify-between gap-3 border-b-2 border-blue-500">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="font-bold text-base sm:text-lg">
                Post-Exam Question Audit & Voice Explanations
              </h3>
              <p className="text-xs text-blue-200">
                Click on any question: hear <strong>"You are the best"</strong> for correct & <strong>"I am with you"</strong> for mistakes!
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setInitialModalFilter(inlineFilter);
              setShowSolutionsModal(true);
            }}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow"
          >
            <span>Open Large Modal View</span>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex flex-wrap items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setInlineFilter('incorrect')}
            className={`px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              inlineFilter === 'incorrect'
                ? 'bg-rose-600 text-white shadow-sm scale-105'
                : 'bg-white text-rose-700 border border-rose-200 hover:bg-rose-50'
            }`}
          >
            <XCircle className="w-4 h-4" />
            <span>Mistakes / Wrong ({incorrectCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setInlineFilter('unattempted')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              inlineFilter === 'unattempted'
                ? 'bg-slate-700 text-white shadow-sm scale-105'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Unattempted ({unattemptedCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setInlineFilter('correct')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              inlineFilter === 'correct'
                ? 'bg-emerald-600 text-white shadow-sm scale-105'
                : 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Correct ({correctCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setInlineFilter('all')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              inlineFilter === 'all'
                ? 'bg-blue-700 text-white shadow-sm scale-105'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>All 30 Questions</span>
          </button>
        </div>

        {/* Questions Display */}
        <div className="p-4 sm:p-6 space-y-4 max-h-[600px] overflow-y-auto">
          {displayedInlineList.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300 space-y-2">
              <Sparkles className="w-10 h-10 text-amber-500 mx-auto" />
              <h4 className="font-bold text-slate-800 text-base">
                {inlineFilter === 'incorrect' ? 'No Wrong Questions! Flawless Diagnostic Score 🎉' : 'No questions in this category.'}
              </h4>
              <p className="text-xs text-slate-500">
                {inlineFilter === 'incorrect' ? 'Dr. Diksha got every single attempted question correct!' : 'Select another category tab above to review.'}
              </p>
            </div>
          ) : (
            displayedInlineList.map((q) => {
              const userState = questionStates[q.id];
              const userChoice = userState?.answer;
              const isAnswered = Boolean(userChoice);
              const isCorrect = isAnswered && userChoice === q.correct;
              const isIncorrect = isAnswered && userChoice !== q.correct;
              const isUnattempted = !isAnswered;
              const isRevealed = Boolean(revealedInlineIds[q.id]);

              const chosenOptionObj = q.options.find((opt) => opt.id === userChoice);
              const correctOptionObj = q.options.find((opt) => opt.id === q.correct);

              return (
                <div
                  key={q.id}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                    isIncorrect
                      ? 'border-rose-300 bg-rose-50/20'
                      : isCorrect
                        ? 'border-emerald-200 bg-emerald-50/10'
                        : 'border-slate-200 bg-slate-50/30'
                  }`}
                >
                  {/* Item Header */}
                  <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`font-mono font-bold px-2 py-0.5 rounded text-white ${
                        isIncorrect ? 'bg-rose-600' : isCorrect ? 'bg-emerald-600' : 'bg-slate-500'
                      }`}>
                        Q{q.id}
                      </span>
                      <span className="font-semibold text-slate-700 flex items-center gap-1">
                        <Layers className="w-3 h-3 text-blue-600" />
                        {q.section?.split(':')[0]}
                      </span>
                      <span className="text-slate-500 font-medium">
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
                          <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-300 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            +4.00 Marks
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
                          <span className="bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded border border-rose-300 flex items-center gap-1">
                            <XCircle className="w-3 h-3 text-rose-600" />
                            -1.33 Penalty (-1/3)
                          </span>
                        </>
                      )}
                      {isUnattempted && (
                        <span className="bg-slate-200 text-slate-700 font-medium px-2 py-0.5 rounded">
                          0.00 Unattempted
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Item Body */}
                  <div className="p-4 space-y-3 bg-white">
                    <p className="font-semibold text-slate-900 text-sm leading-relaxed">
                      {q.question}
                    </p>

                    {/* Candidate's choice bar */}
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
                            Unattempted (Did not select)
                          </span>
                        )}
                      </div>

                      {/* Click-to-reveal Button */}
                      <button
                        type="button"
                        onClick={() => toggleInlineReveal(q.id, isCorrect, isAnswered)}
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

                    {/* Revealed Answer & Clinical Explanation */}
                    {isRevealed && (
                      <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/70 space-y-2.5 animate-in fade-in duration-150">
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

                        <div className="space-y-1 text-xs">
                          <div className="font-bold flex items-center gap-1.5 text-blue-900 uppercase tracking-wide text-[10px]">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            <span>Clinical Case Explanation & Memory:</span>
                          </div>
                          <p className="leading-relaxed bg-white/95 p-3 rounded-lg border border-blue-200 font-medium text-slate-800">
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
      </div>

      {/* Heartfelt Birthday Greeting Card from Chirag */}
      <div className="max-w-4xl w-full bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 rounded-2xl shadow-lg border border-pink-200 p-6 md:p-8 mt-6 relative overflow-hidden no-print">
        <div className="absolute -right-6 -bottom-6 text-pink-200/50 pointer-events-none">
          <Heart className="w-48 h-48 fill-current" />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2.5 text-rose-600 font-bold">
            <Heart className="w-6 h-6 fill-current" />
            <span className="text-xs uppercase tracking-widest">Confidential Birthday Note</span>
          </div>

          <h3 className="text-xl md:text-2xl font-black text-slate-900">
            {BIRTHDAY_LETTER.title}
          </h3>
          <p className="text-xs font-semibold text-rose-700 italic">
            {BIRTHDAY_LETTER.subtitle}
          </p>

          <div className="space-y-3 text-slate-700 text-sm md:text-base leading-relaxed pt-2">
            {BIRTHDAY_LETTER.paragraphs.map((p, i) => (
              <p key={i} className="font-medium text-slate-800">
                {p}
              </p>
            ))}
          </div>

          {/* Quick interactive buttons inside greeting */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={triggerConfettiAgain}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Celebrate Again 🎂</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Certificate</span>
            </button>

            <button
              type="button"
              onClick={onRetakeExam}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow flex items-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Exam</span>
            </button>
          </div>
        </div>
      </div>

      {/* WALL OF LOVE: 22 SPECIAL MOMENTS OF US */}
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg border border-slate-300 overflow-hidden mt-6 no-print">
        {/* Gallery Header */}
        <div className="bg-gradient-to-r from-pink-900 via-rose-900 to-indigo-950 text-white px-5 py-4 flex flex-wrap items-center justify-between gap-3 border-b-2 border-rose-400">
          <div className="flex items-center gap-2.5">
            <Heart className="w-6 h-6 text-rose-400 fill-rose-400 animate-pulse" />
            <div>
              <h3 className="font-bold text-base sm:text-lg">
                Wall of Love: 22 Moments of Us ❤️
              </h3>
              <p className="text-xs text-rose-200">
                A lifetime of laughter, adventures, late nights, and the cutest memories
              </p>
            </div>
          </div>
          <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-bold">
            22 Precious Photos 📸
          </span>
        </div>

        {/* Gallery Grid */}
        <div className="p-4 sm:p-6 bg-slate-50">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {MEMORIES.map((m, idx) => (
              <div
                key={m.id}
                onClick={() => {
                  sounds.playClick();
                  setActivePhotoIdx(idx);
                }}
                className="bg-white p-2 pb-3 rounded-xl shadow-sm hover:shadow-xl border border-slate-200 transition-all duration-300 hover:-translate-y-1 cursor-pointer group flex flex-col"
              >
                <div className="aspect-square w-full rounded-lg overflow-hidden bg-slate-100 relative">
                  <img
                    src={m.src}
                    alt={m.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-rose-900/0 group-hover:bg-rose-900/20 transition-colors flex items-center justify-center">
                    <span className="bg-white/90 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity">
                      View ❤️
                    </span>
                  </div>
                </div>
                <div className="pt-2 text-center">
                  <p className="font-bold text-slate-800 text-xs truncate">
                    {m.title}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate italic">
                    {m.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Photo Lightbox for Gallery */}
      {activePhotoIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setActivePhotoIdx(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-700 flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#0f2744] text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                <span className="font-bold text-sm">
                  {MEMORIES[activePhotoIdx].title} ({activePhotoIdx + 1} / {MEMORIES.length})
                </span>
              </div>
              <button
                onClick={() => setActivePhotoIdx(null)}
                className="text-slate-400 hover:text-white font-bold text-lg px-2 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="relative bg-slate-950 flex items-center justify-center min-h-[320px] max-h-[65vh] overflow-hidden">
              <img
                src={MEMORIES[activePhotoIdx].src}
                alt={MEMORIES[activePhotoIdx].title}
                className="w-full h-full max-h-[65vh] object-contain"
              />

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  sounds.playClick();
                  setActivePhotoIdx((prev) => (prev - 1 + MEMORIES.length) % MEMORIES.length);
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  sounds.playClick();
                  setActivePhotoIdx((prev) => (prev + 1) % MEMORIES.length);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 text-center space-y-1">
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                {MEMORIES[activePhotoIdx].title}
              </h4>
              <p className="text-xs text-slate-600 italic">
                "{MEMORIES[activePhotoIdx].caption}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Solutions Review Modal */}
      <SolutionsReviewModal
        isOpen={showSolutionsModal}
        onClose={() => setShowSolutionsModal(false)}
        questions={questions}
        questionStates={questionStates}
        initialFilter={initialModalFilter}
      />
    </div>
  );
}
