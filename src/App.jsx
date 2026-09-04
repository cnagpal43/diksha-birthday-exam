import React, { useState, useEffect } from 'react';
import { 
  CANDIDATE_PROFILES, 
  DEFAULT_ROLL_NUMBER, 
  TEST_ROLL_NUMBER, 
  QUESTIONS 
} from './data/examData';
import LoginScreen from './components/LoginScreen';
import ExamHeader from './components/ExamHeader';
import QuestionArea from './components/QuestionArea';
import QuestionPalette from './components/QuestionPalette';
import SubmitConfirmModal from './components/SubmitConfirmModal';
import CelebrationFinale from './components/CelebrationFinale';
import FloatingMemoriesBackground from './components/FloatingMemoriesBackground';
import { sounds } from './utils/audio';

const STORAGE_KEY_PREFIX = 'neet_pg_diksha_cbt_v1_';
const ACTIVE_ROLL_KEY = 'neet_pg_active_roll';

// Safe helper to read session from localStorage
const loadSavedSession = (roll) => {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}${roll || DEFAULT_ROLL_NUMBER}`);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("Could not load session from localStorage", e);
  }
  return null;
};

export default function App() {
  // Determine active roll number on boot
  const activeRoll = typeof window !== 'undefined' 
    ? (localStorage.getItem(ACTIVE_ROLL_KEY) || DEFAULT_ROLL_NUMBER)
    : DEFAULT_ROLL_NUMBER;

  const initialSession = loadSavedSession(activeRoll);

  // 1. Candidate Info State
  const [candidateInfo, setCandidateInfo] = useState(() => {
    if (initialSession && initialSession.candidateName) {
      return {
        ...(CANDIDATE_PROFILES[activeRoll] || CANDIDATE_PROFILES[DEFAULT_ROLL_NUMBER]),
        name: initialSession.candidateName,
        rollNumber: initialSession.rollNumber || activeRoll
      };
    }
    return CANDIDATE_PROFILES[activeRoll] || CANDIDATE_PROFILES[DEFAULT_ROLL_NUMBER];
  });

  const [questions] = useState(QUESTIONS);

  // 2. Exam Stage State (STAYS ON CURRENT PAGE ON REFRESH!)
  const [examStage, setExamStage] = useState(() => {
    return initialSession?.examStage || 'login';
  });

  // 3. Current Question Index (RESUMES ON EXACT QUESTION ON REFRESH!)
  const [currentIndex, setCurrentIndex] = useState(() => {
    if (typeof initialSession?.currentIndex === 'number' && initialSession.currentIndex >= 0 && initialSession.currentIndex < QUESTIONS.length) {
      return initialSession.currentIndex;
    }
    return 0;
  });

  // 4. Captured Photo State
  const [capturedPhoto, setCapturedPhoto] = useState(() => {
    return initialSession?.capturedPhoto || null;
  });

  // 5. Question States (PRESERVES ALL PREVIOUSLY ANSWERED QUESTIONS IN GREEN!)
  const [questionStates, setQuestionStates] = useState(() => {
    if (initialSession?.questionStates) {
      return initialSession.questionStates;
    }
    const initial = {};
    QUESTIONS.forEach((q, idx) => {
      initial[q.id] = {
        status: idx === 0 ? 'notAnswered' : 'notVisited',
        answer: null
      };
    });
    return initial;
  });

  // Current radio selection draft for the active question
  const [selectedOption, setSelectedOption] = useState(null);

  // 6. Elapsed Session Timer (untimed mode)
  const [elapsedTime, setElapsedTime] = useState(() => {
    return typeof initialSession?.elapsedTime === 'number' ? initialSession.elapsedTime : 0;
  });

  const [isTimerRunning, setIsTimerRunning] = useState(() => {
    return initialSession?.examStage === 'exam';
  });

  // Modals & Drawers
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isOpenMobilePalette, setIsOpenMobilePalette] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Helper to get storage key
  const getStorageKey = (roll) => `${STORAGE_KEY_PREFIX}${roll || DEFAULT_ROLL_NUMBER}`;

  // Persist active roll number
  useEffect(() => {
    try {
      localStorage.setItem(ACTIVE_ROLL_KEY, candidateInfo.rollNumber);
    } catch (e) {}
  }, [candidateInfo.rollNumber]);

  // Persist session to localStorage on ANY state modification
  useEffect(() => {
    try {
      const key = getStorageKey(candidateInfo.rollNumber);
      const dataToSave = {
        rollNumber: candidateInfo.rollNumber,
        candidateName: candidateInfo.name,
        currentIndex,
        questionStates,
        capturedPhoto,
        elapsedTime,
        examStage,
        lastUpdated: Date.now()
      };
      localStorage.setItem(key, JSON.stringify(dataToSave));
    } catch (e) {
      console.warn("Error saving session to localStorage", e);
    }
  }, [candidateInfo.rollNumber, candidateInfo.name, currentIndex, questionStates, capturedPhoto, elapsedTime, examStage]);

  // Sync selectedOption whenever currentIndex changes
  useEffect(() => {
    const currentQ = questions[currentIndex];
    if (currentQ) {
      const savedAnswer = questionStates[currentQ.id]?.answer || null;
      setSelectedOption(savedAnswer);
    }
  }, [currentIndex, questionStates, questions]);

  // Elapsed Session Timer Hook
  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const handleStartExam = () => {
    setIsTimerRunning(true);
    
    // Ensure the current question is marked as notAnswered (if not already answered)
    const currentQ = questions[currentIndex] || questions[0];
    setQuestionStates((prev) => ({
      ...prev,
      [currentQ.id]: {
        ...prev[currentQ.id],
        status: prev[currentQ.id]?.answer ? 'answered' : (prev[currentQ.id]?.status || 'notAnswered')
      }
    }));

    setExamStage('exam');
  };

  const handleToggleMute = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  // Action: Save & Next
  const handleSaveAndNext = () => {
    const currentQ = questions[currentIndex];

    setQuestionStates((prev) => {
      const newStates = { ...prev };
      if (selectedOption) {
        newStates[currentQ.id] = {
          status: 'answered',
          answer: selectedOption
        };
      } else {
        newStates[currentQ.id] = {
          status: 'notAnswered',
          answer: null
        };
      }

      // If next question exists and is not visited, mark as not answered
      const nextIndex = currentIndex < questions.length - 1 ? currentIndex + 1 : currentIndex;
      const nextQ = questions[nextIndex];
      if (nextQ && newStates[nextQ.id]?.status === 'notVisited') {
        newStates[nextQ.id] = {
          ...newStates[nextQ.id],
          status: 'notAnswered'
        };
      }

      return newStates;
    });

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowSubmitModal(true);
    }
  };

  // Action: Mark for Review & Next
  const handleMarkForReview = () => {
    const currentQ = questions[currentIndex];

    setQuestionStates((prev) => {
      const newStates = { ...prev };
      if (selectedOption) {
        newStates[currentQ.id] = {
          status: 'reviewAnswered',
          answer: selectedOption
        };
      } else {
        newStates[currentQ.id] = {
          status: 'review',
          answer: null
        };
      }

      const nextIndex = currentIndex < questions.length - 1 ? currentIndex + 1 : currentIndex;
      const nextQ = questions[nextIndex];
      if (nextQ && newStates[nextQ.id]?.status === 'notVisited') {
        newStates[nextQ.id] = {
          ...newStates[nextQ.id],
          status: 'notAnswered'
        };
      }

      return newStates;
    });

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowSubmitModal(true);
    }
  };

  // Action: Clear Response
  const handleClearResponse = () => {
    sounds.playClick();
    const currentQ = questions[currentIndex];
    setSelectedOption(null);
    setQuestionStates((prev) => ({
      ...prev,
      [currentQ.id]: {
        status: 'notAnswered',
        answer: null
      }
    }));
  };

  // Action: Previous Question
  const handlePrevious = () => {
    sounds.playClick();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Action: Direct Jump from Palette or Top Strip
  const handleJumpToQuestion = (targetIndex) => {
    const targetQ = questions[targetIndex];
    setQuestionStates((prev) => {
      const newStates = { ...prev };
      if (newStates[targetQ.id]?.status === 'notVisited') {
        newStates[targetQ.id] = {
          ...newStates[targetQ.id],
          status: 'notAnswered'
        };
      }
      return newStates;
    });
    setCurrentIndex(targetIndex);
  };

  // Action: Confirm Final Submission
  const handleConfirmSubmit = () => {
    setIsTimerRunning(false);
    setShowSubmitModal(false);
    setExamStage('submitted');
  };

  // Action: Retake Exam (resets saved session for current roll number)
  const handleRetakeExam = () => {
    try {
      const key = getStorageKey(candidateInfo.rollNumber);
      localStorage.removeItem(key);
      localStorage.removeItem(ACTIVE_ROLL_KEY);
    } catch (e) {}

    const initial = {};
    questions.forEach((q, idx) => {
      initial[q.id] = {
        status: idx === 0 ? 'notAnswered' : 'notVisited',
        answer: null
      };
    });
    setQuestionStates(initial);
    setSelectedOption(null);
    setElapsedTime(0);
    setIsTimerRunning(false);
    setCurrentIndex(0);
    setCapturedPhoto(null);
    setExamStage('login');
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 relative overflow-x-hidden">
      {/* 0. Ambient Floating Photos & Romance Theme Wallpaper Layer */}
      <FloatingMemoriesBackground isExamMode={examStage === 'exam'} />

      {/* Main Content Layer */}
      <div className="relative z-10">
        {/* 1. Login & Hall Ticket Screen */}
        {examStage === 'login' && (
          <LoginScreen
            candidateInfo={candidateInfo}
            setCandidateInfo={setCandidateInfo}
            onStartExam={handleStartExam}
            capturedPhoto={capturedPhoto}
            setCapturedPhoto={setCapturedPhoto}
          />
        )}

        {/* 2. CBT Examination Interface (STAYS HERE ON PAGE REFRESH!) */}
        {examStage === 'exam' && (
          <div className="min-h-screen flex flex-col pb-16 md:pb-6">
            <ExamHeader
              candidateInfo={candidateInfo}
              elapsedTime={elapsedTime}
              onSubmitClick={() => setShowSubmitModal(true)}
              isMuted={isMuted}
              onToggleMute={handleToggleMute}
              capturedPhoto={capturedPhoto}
            />

            <main className="flex-1 max-w-5xl w-full mx-auto p-3 sm:p-4 md:p-6 flex flex-col justify-center">
              {/* Question stem, top status strip, live legend, and options */}
              <QuestionArea
                currentQuestion={questions[currentIndex]}
                currentIndex={currentIndex}
                totalQuestions={questions.length}
                questions={questions}
                questionStates={questionStates}
                onJumpToQuestion={handleJumpToQuestion}
                selectedOption={selectedOption}
                onSelectOption={setSelectedOption}
                onSaveAndNext={handleSaveAndNext}
                onMarkForReview={handleMarkForReview}
                onClearResponse={handleClearResponse}
                onPrevious={handlePrevious}
              />
            </main>

            {/* Submission Modal */}
            <SubmitConfirmModal
              isOpen={showSubmitModal}
              onClose={() => setShowSubmitModal(false)}
              onConfirmSubmit={handleConfirmSubmit}
              questions={questions}
              questionStates={questionStates}
            />
          </div>
        )}

        {/* 3. Celebration & Scorecard Finale (STAYS HERE ON PAGE REFRESH!) */}
        {examStage === 'submitted' && (
          <CelebrationFinale
            questions={questions}
            questionStates={questionStates}
            candidateInfo={candidateInfo}
            onRetakeExam={handleRetakeExam}
            capturedPhoto={capturedPhoto}
          />
        )}
      </div>
    </div>
  );
}
