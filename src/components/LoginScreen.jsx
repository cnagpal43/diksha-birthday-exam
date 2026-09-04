import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  Volume2, 
  VolumeX,
  Stethoscope,
  Info,
  Camera,
  AlertTriangle,
  Heart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { CANDIDATE_PROFILES, DEFAULT_ROLL_NUMBER, INSTRUCTIONS } from '../data/examData';
import { MEMORIES } from '../data/memoriesData';
import { sounds } from '../utils/audio';
import CameraCaptureModal from './CameraCaptureModal';

export default function LoginScreen({ 
  onStartExam, 
  candidateInfo, 
  setCandidateInfo,
  capturedPhoto,
  setCapturedPhoto
}) {
  const [showInstructions, setShowInstructions] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [photoError, setPhotoError] = useState(null);

  // Lightbox for clicking homepage memory photos
  const [activeHomepagePhoto, setActiveHomepagePhoto] = useState(null);
  const [homepagePhotoIdx, setHomepagePhotoIdx] = useState(0);

  const toggleSound = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  // Secret recognition of Chirag's testing code without displaying it anywhere in UI
  const handleRollChange = (val) => {
    const trimmed = val.trim();
    if (CANDIDATE_PROFILES[trimmed]) {
      setCandidateInfo(CANDIDATE_PROFILES[trimmed]);
    } else {
      setCandidateInfo((prev) => ({
        ...prev,
        rollNumber: trimmed
      }));
    }
  };

  const handleStart = (e) => {
    e.preventDefault();

    // Mandatory photo verification check!
    if (!capturedPhoto) {
      sounds.playClick();
      setPhotoError("Click a picture first to actually get a ticket for the examination hall!");
      setShowCameraModal(true);
      return;
    }

    if (!agreed) {
      alert("Please agree to the Code of Conduct to proceed!");
      return;
    }

    sounds.playClick();
    onStartExam();
  };

  const openMemory = (photo, idx) => {
    sounds.playClick();
    setHomepagePhotoIdx(idx);
    setActiveHomepagePhoto(photo);
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col justify-between">
      {/* Official NBE Portal Header */}
      <header className="bg-[#0f2744]/95 backdrop-blur-md text-white border-b-4 border-blue-600 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20 shadow-inner">
              <Stethoscope className="w-7 h-7 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-blue-300 font-semibold">
                  National Board of Love & Medical Sciences
                </span>
                <span className="bg-red-500/80 text-[10px] font-bold px-2 py-0.5 rounded text-white animate-pulse">
                  OFFICIAL CBT
                </span>
              </div>
              <h1 className="text-lg md:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                NEET PG 2026: Diksha Edition
                <span className="hidden sm:inline-block text-xs font-normal text-slate-300">
                  (Untimed Computer Based Test)
                </span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleSound}
              className="px-3 py-1.5 rounded bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-200 border border-slate-600 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Toggle Audio Feedback"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-green-400" />}
              <span>{isMuted ? 'Muted' : 'Sound ON'}</span>
            </button>
            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs text-slate-300 font-mono">SERVER STATUS: <strong className="text-emerald-400">ONLINE</strong></span>
              <span className="text-[11px] text-slate-400">SECURE CBT PORTAL</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Candidate Verification Portal */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-6 flex flex-col justify-center my-auto">
        

        {/* Photo Missing Error Notification Banner */}
        {photoError && !capturedPhoto && (
          <div className="mb-4 bg-rose-50 border-2 border-rose-500 text-rose-950 p-4 rounded-xl shadow-md flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-600 text-white rounded-lg">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-xs sm:text-sm font-bold block text-rose-900">
                  Hall Ticket Verification Incomplete
                </strong>
                <p className="text-xs text-rose-800 font-medium">
                  {photoError}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowCameraModal(true)}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-lg shadow cursor-pointer whitespace-nowrap active:scale-95"
            >
              Click Picture Now 📸
            </button>
          </div>
        )}

        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-300 overflow-hidden">
          
          {/* Banner */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800 text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <div>
                <h2 className="font-bold text-base md:text-lg">Candidate Hall Ticket & Biometric Verification</h2>
                <p className="text-xs text-blue-200">Official NEET PG 2026 Portal • National Eligibility cum True Partner Exam</p>
              </div>
            </div>
            <div className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs px-3 py-1 rounded-full flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Birthday Edition</span>
            </div>
          </div>

          <div className="p-5 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              
              {/* Candidate Photo / Webcam Capture Box */}
              <div className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center">
                <div className={`relative mb-3 group ${!capturedPhoto && photoError ? 'ring-4 ring-rose-400 rounded-lg animate-pulse' : ''}`}>
                  <div className="w-32 h-36 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl border-2 border-blue-400 flex flex-col items-center justify-center text-blue-700 shadow-inner p-1 overflow-hidden">
                    {capturedPhoto ? (
                      <img
                        src={capturedPhoto}
                        alt="Candidate Biometric"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      /* Real couple photo preview instead of plain emoji */
                      <div className="relative w-full h-full rounded-lg overflow-hidden group">
                        <img
                          src="/pics/pic_06.jpg"
                          alt="Diksha & Chirag"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-slate-900/80 p-1 text-[8px] text-white font-bold uppercase tracking-wider">
                          Dr. Diksha Gurnani
                        </div>
                      </div>
                    )}
                  </div>

                  {capturedPhoto && (
                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-full shadow-md" title="Photo Verified">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* Camera Click Trigger */}
                <button
                  type="button"
                  onClick={() => {
                    setPhotoError(null);
                    setShowCameraModal(true);
                  }}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer mb-3 shadow ${
                    capturedPhoto 
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                      : 'bg-pink-600 hover:bg-pink-700 text-white shadow-pink-200'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{capturedPhoto ? 'Retake Pout Photo 💋' : 'Click Pout Photo 📸'}</span>
                </button>

                <div className="w-full space-y-1 text-left text-xs bg-white p-2.5 rounded-xl border border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Hall Ticket Photo:</span>
                    <span className={`font-semibold ${capturedPhoto ? 'text-emerald-600' : 'text-rose-600 font-bold'}`}>
                      {capturedPhoto ? 'Approved 💋' : 'Required to Enter'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Seat Category:</span>
                    <span className="font-semibold text-purple-700">Chirag's Quota</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Exam Mode:</span>
                    <span className="font-semibold text-blue-700">Untimed Session</span>
                  </div>
                </div>
              </div>

              {/* Login / Verification Fields */}
              <form onSubmit={handleStart} className="md:col-span-2 space-y-4">
                
                {/* Roll Number Field (Clean, no test code mentioned) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Candidate Roll Number
                  </label>
                  <input
                    type="text"
                    value={candidateInfo.rollNumber}
                    onChange={(e) => handleRollChange(e.target.value)}
                    placeholder="Enter roll number"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold text-slate-800 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                    required
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Candidate Verification: <strong className="text-slate-700">{candidateInfo.name}</strong>
                  </p>
                </div>

                {/* Candidate Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Candidate Full Name
                  </label>
                  <input
                    type="text"
                    value={candidateInfo.name}
                    onChange={(e) => setCandidateInfo({ ...candidateInfo, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg font-medium text-slate-800 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                    required
                  />
                </div>

                {/* Exam Center & Official Marking Info (-1/3 Penalty) */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-1.5 text-slate-600">
                  <div className="flex items-center gap-1.5 text-blue-800 font-semibold">
                    <Info className="w-4 h-4 text-blue-600" />
                    <span>Official Examination Parameters & Negative Marking</span>
                  </div>
                  <p className="text-slate-800 font-medium">
                    Center: {candidateInfo.centerName}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px]">
                    <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded border border-emerald-300 font-semibold">
                      Correct: +4.00 Marks
                    </span>
                    <span className="bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded border border-rose-300 font-semibold">
                      Incorrect: -1.33 Marks (-1/3 Penalty)
                    </span>
                    <span className="bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded font-medium">
                      Unattempted: 0.00 Marks
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded border border-purple-300 font-sans font-semibold">
                      Total: 30 Questions (120 Marks)
                    </span>
                  </div>
                </div>

                {/* Instructions Modal Button & Agreement */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setShowInstructions(true)}
                    className="text-xs font-semibold text-blue-700 hover:text-blue-900 underline flex items-center gap-1 mb-3"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    View Detailed Code of Conduct & Marking Scheme
                  </button>

                  <label className="flex items-start gap-2.5 cursor-pointer bg-blue-50/60 p-3 rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs text-slate-700 leading-relaxed">
                      I confirm that I am <strong>{candidateInfo.name}</strong>. I understand the -1/3 negative marking scheme (+4 / -1.33), certify that I will not get mad at Chirag today, and understand that AIR 1 is pre-destined.
                    </span>
                  </label>
                </div>

                {/* Start Exam Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!agreed}
                    className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm md:text-base flex items-center justify-center gap-2 shadow-md transition-all duration-200 ${
                      agreed 
                        ? 'bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 hover:from-blue-800 hover:to-indigo-700 text-white hover:shadow-lg active:scale-[0.99] cursor-pointer' 
                        : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <Clock className="w-5 h-5" />
                    <span>Proceed to Examination Hall</span>
                  </button>
                  <p className="text-center text-[11px] text-slate-400 mt-2">
                    Untimed Examination Mode • Picture required for admit card validation.
                  </p>
                </div>

              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Official Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl border border-slate-300 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="bg-[#0f2744] text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-base">Candidate Instructions & Code of Conduct</h3>
              </div>
              <button 
                onClick={() => setShowInstructions(false)}
                className="text-slate-400 hover:text-white text-lg font-bold px-2 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs md:text-sm text-slate-700 leading-relaxed">
              <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded text-amber-900 text-xs">
                <strong>IMPORTANT NOTICE:</strong> Please read all instructions carefully. The test is untimed, your answers are automatically preserved across browser sessions, and -1/3 negative marking applies.
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Examination Rules:</h4>
                <ul className="space-y-2 list-disc pl-5">
                  {INSTRUCTIONS.map((inst, index) => (
                    <li key={index} className="text-slate-700">{inst}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-slate-100 px-5 py-3 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setShowInstructions(false)}
                className="px-5 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold cursor-pointer"
              >
                I Understand & Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox for Homepage Memory Photos */}
      {activeHomepagePhoto && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setActiveHomepagePhoto(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-700 flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#0f2744] text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                <span className="font-bold text-sm">
                  {MEMORIES[homepagePhotoIdx].title} ({homepagePhotoIdx + 1} / {MEMORIES.length})
                </span>
              </div>
              <button
                onClick={() => setActiveHomepagePhoto(null)}
                className="text-slate-400 hover:text-white font-bold text-lg px-2 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="relative bg-slate-950 flex items-center justify-center min-h-[300px] max-h-[60vh] overflow-hidden">
              <img
                src={MEMORIES[homepagePhotoIdx].src}
                alt={MEMORIES[homepagePhotoIdx].title}
                className="w-full h-full max-h-[60vh] object-contain"
              />

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  sounds.playClick();
                  setHomepagePhotoIdx((prev) => (prev - 1 + MEMORIES.length) % MEMORIES.length);
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  sounds.playClick();
                  setHomepagePhotoIdx((prev) => (prev + 1) % MEMORIES.length);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 text-center space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">
                {MEMORIES[homepagePhotoIdx].title}
              </h4>
              <p className="text-xs text-slate-600 italic">
                "{MEMORIES[homepagePhotoIdx].caption}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Camera Capture Modal with Pout Requirement */}
      <CameraCaptureModal
        isOpen={showCameraModal}
        onClose={() => setShowCameraModal(false)}
        onPhotoApproved={(photo) => {
          setCapturedPhoto(photo);
          setPhotoError(null);
        }}
        currentPhoto={capturedPhoto}
      />

      {/* Official Footer */}
      <footer className="bg-slate-900/90 backdrop-blur-md text-slate-400 text-[11px] py-3 text-center border-t border-slate-800">
        <p>© 2026 National Board of Love & Medical Sciences (NBLMS). All Rights Reserved for Dr. Diksha Gurnani.</p>
        <p className="text-slate-500 mt-0.5">Designed with maximum love & clinical precision by Chirag.</p>
      </footer>
    </div>
  );
}
