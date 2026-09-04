import React, { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw, CheckCircle2, AlertTriangle, Sparkles, X, Heart, ShieldCheck, FastForward } from 'lucide-react';
import { sounds } from '../utils/audio';

// Default cute doctor avatar with pout badge for skip fallback
const DEFAULT_POUT_AVATAR = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200"><rect width="200" height="200" rx="24" fill="%23e0f2fe"/><circle cx="100" cy="85" r="45" fill="%23fbcfe8"/><circle cx="85" cy="80" r="5" fill="%231e293b"/><circle cx="115" cy="80" r="5" fill="%231e293b"/><ellipse cx="100" cy="98" rx="8" ry="6" fill="%23f43f5e"/><path d="M70,55 Q100,20 130,55 Q135,90 135,110 Q65,110 65,90 Z" fill="%23831843" opacity="0.85"/><path d="M50,170 Q100,120 150,170 L150,200 L50,200 Z" fill="%232563eb"/><rect x="85" y="145" width="30" height="40" fill="%23ffffff" rx="4"/><path d="M75,145 Q100,165 125,145" stroke="%23cbd5e1" stroke-width="4" fill="none"/><circle cx="100" cy="165" r="7" fill="%2394a3b8"/><text x="100" y="192" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle" fill="%23ffffff">POUT APPROVED 💋</text></svg>`;

export default function CameraCaptureModal({ isOpen, onClose, onPhotoApproved, currentPhoto }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [streamActive, setStreamActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Start webcam
  const startCamera = async () => {
    try {
      setErrorMsg(null);
      setCapturedImage(null);
      setIsApproved(false);

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setErrorMsg('Camera access requires HTTPS or localhost on mobile browsers.');
        setStreamActive(false);
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 720 },
          height: { ideal: 720 }
        },
        audio: false
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setStreamActive(true);
    } catch (err) {
      console.warn('Camera access error:', err);
      setErrorMsg('Camera permission not granted or camera unavailable on this device.');
      setStreamActive(false);
    }
  };

  // Stop webcam
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setStreamActive(false);
  };

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const handleCapture = () => {
    sounds.playClick();
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 640;

    const ctx = canvas.getContext('2d');
    // Mirror horizontally for selfie feel
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    setCapturedImage(dataUrl);
    stopCamera();

    // Trigger funny "AI Pout Verification"
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsApproved(true);
      sounds.playCheerfulTone();
    }, 1500);
  };

  const handleSkipAndUseDefault = () => {
    sounds.playCheerfulTone();
    stopCamera();
    onPhotoApproved(DEFAULT_POUT_AVATAR);
    onClose();
  };

  const handleRetake = () => {
    sounds.playClick();
    setCapturedImage(null);
    setIsApproved(false);
    startCamera();
  };

  const handleConfirmPhoto = () => {
    if (!capturedImage) return;
    sounds.playClick();
    onPhotoApproved(capturedImage);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl border border-slate-300 overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="bg-[#0f2744] text-white px-5 py-3.5 flex items-center justify-between border-b-2 border-blue-500">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="font-bold text-sm sm:text-base">Candidate Biometric Photo Verification</h3>
              <p className="text-[11px] text-blue-200">National Board of Love & Medical Sciences</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white font-bold text-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 space-y-4 flex flex-col items-center text-center">
          
          {/* Pout Instruction Banner */}
          <div className="w-full bg-gradient-to-r from-pink-50 via-rose-50 to-amber-50 border border-pink-200 p-3 rounded-xl text-xs text-rose-900 flex items-center gap-2.5 text-left shadow-sm">
            <span className="text-2xl shrink-0">💋</span>
            <div>
              <strong className="block font-bold text-rose-950">MANDATORY POUT REQUIREMENT:</strong>
              <span>Per NBE Security Protocol Section 143, candidate <strong>MUST</strong> make a cute pout for facial approval!</span>
            </div>
          </div>

          {/* Camera Viewport / Preview */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-2xl overflow-hidden bg-slate-900 border-4 border-slate-300 shadow-inner flex items-center justify-center">
            
            {/* Live Video */}
            {!capturedImage && (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover transform -scale-x-100"
                />

                {/* Facial Oval Guide */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className="w-48 h-56 border-2 border-dashed border-pink-400 rounded-full opacity-70 flex flex-col items-center justify-end pb-3">
                    <span className="bg-pink-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                      Align Face & POUT Here 💋
                    </span>
                  </div>
                </div>
              </>
            )}

            {/* Captured Still Preview */}
            {capturedImage && (
              <img
                src={capturedImage}
                alt="Captured Candidate"
                className="w-full h-full object-cover"
              />
            )}

            {/* Verifying Animation */}
            {isVerifying && (
              <div className="absolute inset-0 bg-slate-950/70 flex flex-col items-center justify-center p-4 text-white space-y-3 backdrop-blur-xs">
                <RefreshCw className="w-10 h-10 text-pink-400 animate-spin" />
                <div className="space-y-1">
                  <span className="font-bold text-xs uppercase tracking-wider text-pink-300 block">
                    AI Pout Analyzer Active...
                  </span>
                  <span className="text-[11px] text-slate-300 block">
                    Scanning Lip Protrusion & Cutest Expressions
                  </span>
                </div>
              </div>
            )}

            {/* Approved Badge Overlay */}
            {isApproved && (
              <div className="absolute top-3 right-3 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 animate-bounce">
                <CheckCircle2 className="w-4 h-4" />
                <span>POUT APPROVED! 100%</span>
              </div>
            )}
          </div>

          {/* Hidden Canvas for capture */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Camera Notice & Skip Option if Camera is blocked/denied */}
          {errorMsg && (
            <div className="w-full bg-amber-50 border border-amber-300 p-3.5 rounded-xl text-xs text-amber-900 space-y-2.5 text-left animate-in fade-in">
              <div className="flex items-center gap-1.5 font-bold">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Camera Access Notice:</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {errorMsg} (Mobile browsers require HTTPS or permission). No worries, you can retry or skip to proceed immediately!
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={startCamera}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg cursor-pointer text-xs shadow flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retry Camera Permission</span>
                </button>

                <button
                  type="button"
                  onClick={handleSkipAndUseDefault}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg cursor-pointer text-xs shadow flex items-center gap-1.5"
                >
                  <FastForward className="w-3.5 h-3.5" />
                  <span>Skip & Use Official Avatar 🎟️</span>
                </button>
              </div>
            </div>
          )}

          {/* Status message post-approval */}
          {isApproved && (
            <div className="w-full bg-emerald-50 border border-emerald-300 p-3 rounded-xl text-xs text-emerald-950 text-left space-y-0.5">
              <div className="font-bold flex items-center gap-1 text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Biometric Pout Verified Successfully!</span>
              </div>
              <p className="text-[11px] text-emerald-700">
                Pout Curvature Quotient: <strong>99.98%</strong> • Diagnosed as the Cutest Doctor in the Universe.
              </p>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="bg-slate-50 px-5 py-3.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          {!capturedImage ? (
            <>
              {/* Skip capture button as a handy backup */}
              <button
                type="button"
                onClick={handleSkipAndUseDefault}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer underline"
              >
                <FastForward className="w-3.5 h-3.5 text-slate-500" />
                <span>Skip Photo & Proceed</span>
              </button>

              <button
                type="button"
                onClick={handleCapture}
                disabled={!streamActive}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                  streamActive
                    ? 'bg-rose-600 hover:bg-rose-700 text-white cursor-pointer active:scale-95 shadow-rose-200'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>Capture Pout 📸</span>
              </button>
            </>
          ) : (
            <div className="w-full flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleRetake}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retake (Pout More!)</span>
              </button>

              <button
                type="button"
                onClick={handleConfirmPhoto}
                disabled={isVerifying || !isApproved}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all ${
                  isApproved
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer active:scale-95 shadow-emerald-200'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve & Use Photo</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
