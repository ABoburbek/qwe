import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { Course, CourseModule, QuizQuestion, PresentationSlide } from '../types';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  FileText,
  Video,
  HelpCircle,
  CheckCircle,
  XCircle,
  Award,
  Maximize2,
  RotateCcw,
  Sparkles,
  BookOpen,
  Clock,
  Download,
  AlertCircle,
  MessageSquare,
  FileCode2,
} from 'lucide-react';
import { CertificateModal } from './CertificateModal';
import { DialogueSimulationModal } from './DialogueSimulationModal';

interface CoursePlayerProps {
  courseId: string;
  onBack: () => void;
}

export const CoursePlayer: React.FC<CoursePlayerProps> = ({ courseId, onBack }) => {
  const {
    courses,
    progressMap,
    recordModuleCompletion,
    recordQuizScore,
    currentUser,
    certificates,
  } = useApp();

  const course = courses.find((c) => c.id === courseId);

  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Audio simulation state for slides
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);

  // Quiz state
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Certificate & Dialogue Modals
  const [showCertModal, setShowCertModal] = useState(false);
  const [showDialogueModal, setShowDialogueModal] = useState(false);

  if (!course) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-slate-600">Kurs topilmadi.</p>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl"
        >
          Katalogga Qaytish
        </button>
      </div>
    );
  }

  const currentModule = course.modules[activeModuleIndex];
  const userProgress = progressMap[course.id];

  // Audio simulation timer for slides
  useEffect(() => {
    let timer: any;
    if (isPlayingAudio) {
      timer = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 5;
        });
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isPlayingAudio]);

  // Reset slide audio on slide change
  useEffect(() => {
    setIsPlayingAudio(false);
    setAudioProgress(0);
  }, [activeSlideIndex, activeModuleIndex]);

  // Mark current module as completed on presentation / video end
  const handleCompleteCurrentModule = () => {
    recordModuleCompletion(course.id, currentModule.id);
  };

  // Quiz Submit handler
  const handleQuizSubmit = () => {
    if (!currentModule.questions) return;

    let correctCount = 0;
    const wrongQuestions: { question: QuizQuestion; wrongOptionIndex: number }[] = [];

    currentModule.questions.forEach((q) => {
      const selectedIndex = userAnswers[q.id];
      if (selectedIndex === q.correctAnswerIndex) {
        correctCount++;
      } else if (selectedIndex !== undefined) {
        wrongQuestions.push({
          question: q,
          wrongOptionIndex: selectedIndex,
        });
      }
    });

    const totalQuestions = currentModule.questions.length;
    const scorePct = Math.round((correctCount / totalQuestions) * 100);

    setQuizScore(scorePct);
    setQuizSubmitted(true);

    recordQuizScore(course.id, currentModule.id, scorePct, wrongQuestions);

    if (scorePct >= course.passScorePercentage) {
      // Trigger Confetti Celebration!
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRetakeQuiz = () => {
    setUserAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
  };

  const userCert = certificates.find(
    (cert) => cert.userId === currentUser.id && cert.courseId === course.id
  );

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Katalogga Qaytish"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
              {course.category}
            </span>
            <h1 className="text-base sm:text-lg font-bold text-white truncate max-w-md sm:max-w-xl">
              {course.title}
            </h1>
          </div>
        </div>

        {/* Certificate Button if earned */}
        {userCert && (
          <button
            onClick={() => setShowCertModal(true)}
            className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow-md hover:brightness-110 transition-all"
          >
            <Award className="w-4 h-4" />
            <span className="hidden sm:inline">Sertifikatni Yuklash</span>
          </button>
        )}
      </div>

      {/* Main iSpring Workspace Layout: Left Sidebar Modules, Right Player Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Modules Navigation Sidebar */}
        <div className="lg:col-span-1 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm space-y-4 h-fit">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900">Kurs Modullari</h3>
            <span className="text-xs text-slate-500 font-medium">
              {course.modules.length} modul
            </span>
          </div>

          <div className="space-y-2">
            {course.modules.map((mod, idx) => {
              const isCurrent = idx === activeModuleIndex;
              const isDone = userProgress?.completedModuleIds?.includes(mod.id);

              return (
                <button
                  key={mod.id}
                  onClick={() => {
                    setActiveModuleIndex(idx);
                    setActiveSlideIndex(0);
                  }}
                  className={`w-full text-left p-3 rounded-xl flex items-start gap-3 transition-all ${
                    isCurrent
                      ? 'bg-slate-900 text-white font-semibold shadow-md'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {mod.type === 'presentation' && (
                      <FileText
                        className={`w-4 h-4 ${isCurrent ? 'text-emerald-400' : 'text-slate-500'}`}
                      />
                    )}
                    {mod.type === 'video' && (
                      <Video
                        className={`w-4 h-4 ${isCurrent ? 'text-blue-400' : 'text-slate-500'}`}
                      />
                    )}
                    {(mod.type === 'pdf' || mod.type === 'pptx') && (
                      <FileText
                        className={`w-4 h-4 ${isCurrent ? 'text-rose-400' : 'text-slate-500'}`}
                      />
                    )}
                    {mod.type === 'quiz' && (
                      <HelpCircle
                        className={`w-4 h-4 ${isCurrent ? 'text-amber-400' : 'text-slate-500'}`}
                      />
                    )}
                    {mod.type === 'dialogue_simulation' && (
                      <MessageSquare
                        className={`w-4 h-4 ${isCurrent ? 'text-indigo-400' : 'text-slate-500'}`}
                      />
                    )}
                    {mod.type === 'scorm_package' && (
                      <FileCode2
                        className={`w-4 h-4 ${isCurrent ? 'text-purple-400' : 'text-slate-500'}`}
                      />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <div className="text-[10px] uppercase font-bold text-slate-400">
                        {mod.type === 'presentation' && 'iSpring Slide'}
                        {mod.type === 'video' && 'Video Dars'}
                        {mod.type === 'pdf' && 'PDF Hujjat'}
                        {mod.type === 'pptx' && 'PPTX Taqdimot'}
                        {mod.type === 'quiz' && 'Interaktiv Test'}
                        {mod.type === 'dialogue_simulation' && 'Muloqot Simulyatsiyasi'}
                        {mod.type === 'scorm_package' && 'SCORM Paket'}
                      </div>
                      {isDone && (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      )}
                    </div>
                    <div className="text-xs font-bold truncate mt-0.5">{mod.title}</div>
                    <div className="text-[10px] text-slate-400 mt-1">
                      {mod.durationMinutes} daqiqa
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Player Workspace */}
        <div className="lg:col-span-3 space-y-4">
          {/* -------------------- 1. PRESENTATION SLIDE PLAYER -------------------- */}
          {currentModule.type === 'presentation' && currentModule.slides && (
            <div className="bg-slate-900 rounded-2xl border border-slate-800 text-white overflow-hidden shadow-xl flex flex-col min-h-[500px]">
              {/* Slide Canvas */}
              <div className="flex-1 p-6 sm:p-10 flex flex-col justify-between relative bg-gradient-to-b from-slate-900 to-slate-950">
                {/* Current Slide Number Badge */}
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-1 rounded-md text-[11px] border border-emerald-500/30">
                      Slayd {activeSlideIndex + 1} / {currentModule.slides.length}
                    </span>
                    <span className="font-semibold text-slate-300">
                      {currentModule.slides[activeSlideIndex]?.title}
                    </span>
                  </div>

                  <button
                    onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
                    className="text-xs text-slate-300 hover:text-white underline flex items-center gap-1"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Metodist Izohi</span>
                  </button>
                </div>

                {/* Speaker Notes Overlay */}
                {showSpeakerNotes && currentModule.slides[activeSlideIndex]?.speakerNotes && (
                  <div className="my-3 p-3.5 bg-slate-800/90 border border-emerald-500/30 rounded-xl text-xs text-emerald-200 leading-relaxed animate-fadeIn">
                    <strong className="text-emerald-400 block mb-1">🎤 O'quv Metodisti Yo'riqnomasi:</strong>
                    {currentModule.slides[activeSlideIndex]?.speakerNotes}
                  </div>
                )}

                {/* Slide Body */}
                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                      {currentModule.slides[activeSlideIndex]?.title}
                    </h2>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {currentModule.slides[activeSlideIndex]?.content}
                    </p>

                    {/* Bullet Points */}
                    {currentModule.slides[activeSlideIndex]?.bulletPoints && (
                      <ul className="space-y-2 pt-2">
                        {currentModule.slides[activeSlideIndex]?.bulletPoints?.map(
                          (point, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2.5 text-xs text-slate-200 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60"
                            >
                              <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shrink-0" />
                              <span>{point}</span>
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </div>

                  {/* Slide Image */}
                  {currentModule.slides[activeSlideIndex]?.imageUrl && (
                    <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-lg bg-slate-800 h-60 sm:h-72">
                      <img
                        src={currentModule.slides[activeSlideIndex]?.imageUrl}
                        alt="Slide Visual"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Audio Voiceover Bar (Simulated iSpring Audio Player) */}
                <div className="bg-slate-800/90 p-3 rounded-xl border border-slate-700/80 flex items-center gap-3 mt-4">
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                  >
                    {isPlayingAudio ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </button>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-300">
                      <span>Ovozli Darslik (Metodist)</span>
                      <span>
                        {currentModule.slides[activeSlideIndex]?.audioDurationSec || 45} sek
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-400 transition-all duration-300"
                        style={{ width: `${audioProgress}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1.5 text-slate-400 hover:text-white"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-rose-400" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Bottom Navigation Toolbar */}
              <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  disabled={activeSlideIndex === 0}
                  onClick={() => setActiveSlideIndex((prev) => prev - 1)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-xl text-xs font-bold text-slate-200 flex items-center gap-2 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Oldingi Slayd</span>
                </button>

                <div className="text-xs text-slate-400 font-medium">
                  {activeSlideIndex + 1} / {currentModule.slides.length}
                </div>

                {activeSlideIndex < currentModule.slides.length - 1 ? (
                  <button
                    onClick={() => setActiveSlideIndex((prev) => prev + 1)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-bold text-white flex items-center gap-2 transition-colors"
                  >
                    <span>Keyingi Slayd</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleCompleteCurrentModule}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md hover:brightness-110 transition-all"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Modulni Yakunlash</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* -------------------- 2. VIDEO PLAYER -------------------- */}
          {currentModule.type === 'video' && (
            <div className="bg-slate-900 rounded-2xl border border-slate-800 text-white overflow-hidden shadow-xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h2 className="font-bold text-lg">{currentModule.title}</h2>
                <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  {currentModule.durationMinutes} daqiqa video darslik
                </span>
              </div>

              <div className="aspect-video bg-black rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center relative">
                <video
                  controls
                  className="w-full h-full object-contain"
                  src={currentModule.videoUrl}
                  onEnded={handleCompleteCurrentModule}
                >
                  Sizning brauzeringiz videoni qo'llab-quvvatlamaydi.
                </video>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleCompleteCurrentModule}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Videoni Tamomladim</span>
                </button>
              </div>
            </div>
          )}

          {/* -------------------- 2.5. PDF / PPTX DOCUMENT PLAYER -------------------- */}
          {(currentModule.type === 'pdf' || currentModule.type === 'pptx') && (
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-200 font-bold text-sm">
                    {currentModule.type === 'pdf' ? 'PDF' : 'PPTX'}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-extrabold text-rose-600">
                      {currentModule.type === 'pdf' ? "PDF O'quv Hujjati" : 'PowerPoint Taqdimoti'}
                    </span>
                    <h2 className="text-lg font-bold text-slate-900">{currentModule.title}</h2>
                  </div>
                </div>

                {currentModule.documentUrl && (
                  <a
                    href={currentModule.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={currentModule.documentName || 'o_quv_materiali'}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm shrink-0"
                  >
                    <Download className="w-4 h-4 text-emerald-400" />
                    <span>Hujjatni Yuklab Olish</span>
                  </a>
                )}
              </div>

              {/* Document Preview Canvas */}
              <div className="bg-slate-900 rounded-2xl p-4 sm:p-8 text-white min-h-[400px] flex flex-col justify-between border border-slate-800 relative shadow-inner">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Rasmiy O'quv Qo'llanmasi</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white">{currentModule.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                    Ushbu hujjat xodimlar uchun muhim yo'riqnoma va standartlarni o'z ichiga oladi.
                    Tanishib chiqqaningizdan so'ng, "Materialni O'qib Chiqdim" tugmasini bosing.
                  </p>
                </div>

                {currentModule.documentUrl ? (
                  <div className="my-6 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 h-96 flex items-center justify-center">
                    <iframe
                      src={currentModule.documentUrl}
                      title={currentModule.title}
                      className="w-full h-full border-none"
                    />
                  </div>
                ) : (
                  <div className="my-6 p-8 bg-slate-800/80 rounded-xl border border-slate-700 text-center space-y-3">
                    <FileText className="w-12 h-12 text-rose-400 mx-auto" />
                    <h4 className="font-bold text-sm text-slate-200">
                      {currentModule.documentName || 'Taqdimot Fayli'}
                    </h4>
                    <p className="text-xs text-slate-400 max-w-md mx-auto">
                      Hujjat elektron formatda yuklangan va o'rganish uchun tayyorlangan.
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-slate-400">
                    O'qish vaqti: ~{currentModule.durationMinutes} daqiqa
                  </div>
                  <button
                    onClick={handleCompleteCurrentModule}
                    className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-md hover:brightness-110 transition-all"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Materialni O'qib Chiqdim</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* -------------------- 2.8. DIALOGUE SIMULATION PLAYER -------------------- */}
          {currentModule.type === 'dialogue_simulation' && (
            <div className="bg-slate-900 rounded-2xl border border-slate-800 text-white overflow-hidden shadow-xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30 mb-2">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>iSpring Muloqot Simulyatsiyasi</span>
                  </div>
                  <h2 className="text-xl font-extrabold text-white">{currentModule.title}</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Mijoz bilan muloqot va e'tirozlar bilan ishlash bo'yicha interaktiv stsenariyli amaliyot.
                  </p>
                </div>

                <button
                  onClick={() => setShowDialogueModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-indigo-900/30 flex items-center gap-2 transition-all shrink-0"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Simulyatsiyani Boshlash</span>
                </button>
              </div>

              <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-2xl border border-indigo-500/30">
                  🎭
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">
                    {currentModule.dialogueData?.title || currentModule.title}
                  </h3>
                  <p className="text-xs text-slate-400 max-w-md mt-1 leading-relaxed">
                    {currentModule.dialogueData?.scenarioDescription ||
                      "Ushbu simulyatsiya davomida siz do'konga kelgan mijoz e'tirozlarini to'g'ri hal qilish va sotuv madaniyatini amalda qo'llashni mashq qilasiz."}
                  </p>
                </div>

                <button
                  onClick={() => setShowDialogueModal(true)}
                  className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Interaktiv Rollar O'yinini Oynash</span>
                </button>
              </div>
            </div>
          )}

          {/* -------------------- 2.9. SCORM PACKAGE PLAYER -------------------- */}
          {currentModule.type === 'scorm_package' && (
            <div className="bg-slate-900 rounded-2xl border border-slate-800 text-white overflow-hidden shadow-xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30 mb-2">
                    <FileCode2 className="w-3.5 h-3.5" />
                    <span>iSpring SCORM 1.2 / 2004 Paket</span>
                  </div>
                  <h2 className="text-xl font-extrabold text-white">{currentModule.title}</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Fayl nomi: {currentModule.scormZipName || 'iSpring_Course_Package.zip'}
                  </p>
                </div>

                <button
                  onClick={handleCompleteCurrentModule}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-md shrink-0"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>SCORM Modulni Yakunlash</span>
                </button>
              </div>

              {/* SCORM Embedded Interactive Canvas */}
              {currentModule.slides && currentModule.slides.length > 0 ? (
                <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between text-xs text-indigo-300 font-semibold border-b border-slate-800 pb-3">
                    <span>SCORM Slaydlari O'qilmoqda</span>
                    <span>{activeSlideIndex + 1} / {currentModule.slides.length}</span>
                  </div>

                  <div className="space-y-3 py-2">
                    <h3 className="text-lg font-bold text-white">
                      {currentModule.slides[activeSlideIndex]?.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {currentModule.slides[activeSlideIndex]?.content}
                    </p>

                    {currentModule.slides[activeSlideIndex]?.bulletPoints && (
                      <ul className="space-y-1.5 pt-2">
                        {currentModule.slides[activeSlideIndex]?.bulletPoints?.map((bp, i) => (
                          <li key={i} className="text-xs text-emerald-300 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>{bp}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                    <button
                      disabled={activeSlideIndex === 0}
                      onClick={() => setActiveSlideIndex((prev) => prev - 1)}
                      className="px-4 py-2 bg-slate-800 disabled:opacity-40 text-xs font-bold rounded-xl"
                    >
                      Oldingi
                    </button>
                    <button
                      onClick={() => {
                        if (activeSlideIndex < (currentModule.slides?.length || 1) - 1) {
                          setActiveSlideIndex((prev) => prev + 1);
                        } else {
                          handleCompleteCurrentModule();
                        }
                      }}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-500 font-bold text-xs rounded-xl"
                    >
                      {activeSlideIndex < (currentModule.slides?.length || 1) - 1 ? 'Keyingi Slayd' : 'SCORMni Yakunlash'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-8 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-3">
                  <FileCode2 className="w-12 h-12 text-purple-400 mx-auto" />
                  <h4 className="font-bold text-sm text-slate-200">
                    SCORM Avtonom O'yin Pleyeri Faol
                  </h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Interaktiv darslik muvaffaqiyatli yuklandi va foydalanuvchi progressi avtomatik saqlanmoqda.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* -------------------- 3. INTERACTIVE QUIZ EXAM -------------------- */}
          {currentModule.type === 'quiz' && currentModule.questions && (
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-lg p-6 sm:p-8 space-y-6">
              {/* Quiz Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200 mb-1">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Rasmiy Bilim Imtihoni</span>
                  </div>
                  <h2 className="text-lg font-extrabold text-slate-900">
                    {currentModule.title}
                  </h2>
                </div>

                <div className="text-xs text-slate-600 font-medium bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                  O'tish bali: <strong className="text-slate-900">{course.passScorePercentage}%</strong>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-8">
                {currentModule.questions.map((q, qIdx) => {
                  const selectedOption = userAnswers[q.id];
                  const isCorrect = selectedOption === q.correctAnswerIndex;

                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        quizSubmitted
                          ? isCorrect
                            ? 'bg-emerald-50/60 border-emerald-200'
                            : 'bg-rose-50/60 border-rose-200'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="font-bold text-sm text-slate-900 leading-snug">
                          {qIdx + 1}. {q.question}
                        </h3>
                        <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0">
                          {q.points} ball
                        </span>
                      </div>

                      {/* Options */}
                      <div className="space-y-2 mt-4">
                        {q.options.map((option, optIdx) => {
                          const isSelected = selectedOption === optIdx;
                          const isOptionCorrect = optIdx === q.correctAnswerIndex;

                          let optionStyle = 'bg-white border-slate-200 hover:border-slate-300 text-slate-800';

                          if (quizSubmitted) {
                            if (isOptionCorrect) {
                              optionStyle =
                                'bg-emerald-600 text-white border-emerald-600 font-bold shadow-sm';
                            } else if (isSelected && !isOptionCorrect) {
                              optionStyle =
                                'bg-rose-600 text-white border-rose-600 font-bold shadow-sm';
                            } else {
                              optionStyle = 'bg-white border-slate-200 opacity-60 text-slate-500';
                            }
                          } else if (isSelected) {
                            optionStyle =
                              'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/20';
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={quizSubmitted}
                              onClick={() =>
                                setUserAnswers((prev) => ({
                                  ...prev,
                                  [q.id]: optIdx,
                                }))
                              }
                              className={`w-full text-left p-3.5 rounded-xl border text-xs flex items-center justify-between transition-all ${optionStyle}`}
                            >
                              <span>{option}</span>
                              {quizSubmitted && isOptionCorrect && (
                                <CheckCircle className="w-4 h-4 shrink-0" />
                              )}
                              {quizSubmitted && isSelected && !isOptionCorrect && (
                                <XCircle className="w-4 h-4 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation display after quiz submission */}
                      {quizSubmitted && (
                        <div className="mt-4 p-3 bg-white/80 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                          <strong className="text-slate-900 block">💡 Tushuntirish:</strong>
                          <p>{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Submit / Results Actions */}
              {!quizSubmitted ? (
                <div className="pt-4 border-t border-slate-200 flex justify-end">
                  <button
                    disabled={
                      Object.keys(userAnswers).length <
                      currentModule.questions.length
                    }
                    onClick={handleQuizSubmit}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Test Natijasini Tekshirish</span>
                  </button>
                </div>
              ) : (
                <div className="pt-6 border-t border-slate-200 space-y-4 text-center">
                  <div
                    className={`p-6 rounded-2xl border ${
                      quizScore! >= course.passScorePercentage
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                        : 'bg-rose-50 border-rose-200 text-rose-950'
                    }`}
                  >
                    <div className="text-3xl font-extrabold mb-1">
                      {quizScore}% Ball
                    </div>
                    <p className="text-sm font-semibold">
                      {quizScore! >= course.passScorePercentage
                        ? "Muvaffaqiyatli topshirdingiz! Sertifikat imtiyozi berildi!"
                        : `O'tish bali: ${course.passScorePercentage}%. Afsuski bu safar yetarli bo'lmadi.`}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={handleRetakeQuiz}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Testni Qayta Topshirish</span>
                    </button>

                    {quizScore! >= course.passScorePercentage && (
                      <button
                        onClick={() => setShowCertModal(true)}
                        className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow-md hover:brightness-110"
                      >
                        <Award className="w-4 h-4" />
                        <span>Sertifikatni Ko'rish va Yuklash</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Official Certificate Modal */}
      {showCertModal && (
        <CertificateModal
          courseTitle={course.title}
          userName={currentUser.name}
          userPosition={currentUser.position}
          scorePercentage={quizScore || 100}
          certificateNumber={`HMK-${new Date().getFullYear()}-${Math.floor(
            1000 + Math.random() * 9000
          )}`}
          issuedDate={new Date().toISOString().split('T')[0]}
          onClose={() => setShowCertModal(false)}
        />
      )}

      {/* Interactive iSpring Dialogue Simulation Modal */}
      {showDialogueModal && (
        <DialogueSimulationModal
          dialogue={
            currentModule.dialogueData || {
              id: 'sim_default',
              title: currentModule.title || "Mijoz Bilan Muloqot va E'tirozlar",
              scenarioDescription:
                "Xaridor mahsulot narxi yuqoriligi va sifatiga shubha qilmoqda. Sotuvchi sifatida mijozni samimiy tinglang va muqobil yechim taklif qiling.",
              passingScore: 70,
              steps: [
                {
                  id: 'step_1',
                  characterName: 'Nodira Karimova',
                  characterRole: "Xaridor (Do'konga kirgan mijoz)",
                  characterAvatar:
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
                  characterMood: 'angry',
                  speechBubble:
                    "Assalomu alaykum. Ushbu mahsulot narxi boshqa joyga qaraganda qimmatroq ekan-ku! Nega narxlar buncha baland?",
                  options: [
                    {
                      id: 'opt_1',
                      text: "Xushmuomalalik bilan rasmiy kafolat, bepul yetkazib berish va do'konimiz taqdim etadigan servis afzalliklarini tushuntirish.",
                      nextStepId: 'step_2',
                      points: 15,
                      moodChange: 'happy',
                      feedbackMessage:
                        "Barakalla! Narx e'tiroziga qiymat va xizmat afzalliklari orqali javob berish to'g'ri strategiya.",
                    },
                    {
                      id: 'opt_2',
                      text: "Bizda sifatli, xohlasangiz arzonroq joydan xarid qilishingiz mumkin deyish.",
                      nextStepId: 'step_2',
                      points: -10,
                      moodChange: 'angry',
                      feedbackMessage:
                        "Xato yondashuv! Mijozga bu kabi muomala qilish korporativ xizmat ko'rsatish standartlariga zid.",
                    },
                  ],
                },
                {
                  id: 'step_2',
                  characterName: 'Nodira Karimova',
                  characterRole: "Xaridor (Mamnun mijoz)",
                  characterAvatar:
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
                  characterMood: 'delighted',
                  speechBubble:
                    "Rahmat, tushundim! Rasmiy kafolat va servis juda muhim. Ushbu mahsulotni rasmiylashtirib bering!",
                  options: [
                    {
                      id: 'opt_21',
                      text: "Kassada rasmiylashtirib, do'konda mavjud foydali aksessuarni tavsiya qilish va xaridingiz uchun rahmat deyish.",
                      nextStepId: 'finish',
                      points: 20,
                      moodChange: 'delighted',
                      feedbackMessage:
                        "Mukammal sotuv yakuni! Mijoz qanoatlandi va qo'shimcha sotuv amalga oshirildi.",
                    },
                  ],
                },
              ],
            }
          }
          onComplete={(scorePct) => {
            handleCompleteCurrentModule();
          }}
          onClose={() => setShowDialogueModal(false)}
        />
      )}
    </div>
  );
};
