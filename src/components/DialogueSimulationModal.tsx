import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  MessageSquare,
  Smile,
  Frown,
  Meh,
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ArrowRight,
  X,
  Volume2,
  ShieldAlert,
  User,
} from 'lucide-react';
import { DialogueSimulation, DialogueStep, DialogueOption } from '../types';

interface DialogueSimulationModalProps {
  dialogue: DialogueSimulation;
  onComplete?: (scorePercentage: number) => void;
  onClose: () => void;
}

export const DialogueSimulationModal: React.FC<DialogueSimulationModalProps> = ({
  dialogue,
  onComplete,
  onClose,
}) => {
  const [currentStepId, setCurrentStepId] = useState<string>(dialogue.steps[0]?.id || '');
  const [totalScore, setTotalScore] = useState<number>(0);
  const [maxPossibleScore, setMaxPossibleScore] = useState<number>(dialogue.steps.length * 15);
  const [selectedHistory, setSelectedHistory] = useState<
    { stepId: string; option: DialogueOption; step: DialogueStep }[]
  >([]);

  const [activeFeedbackOption, setActiveFeedbackOption] = useState<{
    option: DialogueOption;
    step: DialogueStep;
  } | null>(null);

  const [isFinished, setIsFinished] = useState(false);

  const currentStep = dialogue.steps.find((s) => s.id === currentStepId) || dialogue.steps[0];

  const handleSelectOption = (option: DialogueOption) => {
    setActiveFeedbackOption({ option, step: currentStep });
  };

  const handleProceedAfterFeedback = () => {
    if (!activeFeedbackOption) return;

    const { option, step } = activeFeedbackOption;
    const newScore = Math.max(0, totalScore + option.points);
    setTotalScore(newScore);

    setSelectedHistory((prev) => [...prev, { stepId: step.id, option, step }]);
    setActiveFeedbackOption(null);

    if (option.nextStepId === 'finish' || !option.nextStepId) {
      // Calculate final score percentage
      const finalPct = Math.min(100, Math.round((newScore / (dialogue.steps.length * 15)) * 100));
      setIsFinished(true);
      if (finalPct >= dialogue.passingScore) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
      if (onComplete) {
        onComplete(finalPct);
      }
    } else {
      setCurrentStepId(option.nextStepId);
    }
  };

  const handleRestart = () => {
    setCurrentStepId(dialogue.steps[0]?.id || '');
    setTotalScore(0);
    setSelectedHistory([]);
    setActiveFeedbackOption(null);
    setIsFinished(false);
  };

  const getMoodBadge = (mood: 'angry' | 'neutral' | 'happy' | 'delighted') => {
    switch (mood) {
      case 'angry':
        return (
          <span className="px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center gap-1.5 animate-pulse">
            <Frown className="w-4 h-4 text-rose-400" />
            <span>Mijoz kayfiyati: Jahli chiqqan</span>
          </span>
        );
      case 'neutral':
        return (
          <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1.5">
            <Meh className="w-4 h-4 text-amber-400" />
            <span>Mijoz kayfiyati: Ikkilanayotgan</span>
          </span>
        );
      case 'happy':
        return (
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
            <Smile className="w-4 h-4 text-emerald-400" />
            <span>Mijoz kayfiyati: Qanoatlandi</span>
          </span>
        );
      case 'delighted':
        return (
          <span className="px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 text-xs font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>Mijoz kayfiyati: Minnatdor va Mamnun</span>
          </span>
        );
    }
  };

  const finalScorePct = Math.min(100, Math.round((totalScore / (dialogue.steps.length * 15)) * 100));
  const isPassed = finalScorePct >= dialogue.passingScore;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden text-slate-100 cursor-default flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-900/30">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-wider">
                  iSpring Muloqot Simulyatsiyasi
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                {dialogue.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-emerald-400">
              <Award className="w-4 h-4 text-amber-400" />
              <span>To'plangan Ball: {totalScore}</span>
            </div>

            <button
              onClick={onClose}
              className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 flex-1 bg-gradient-to-b from-slate-900 to-slate-950">
          {!isFinished ? (
            <>
              {/* Scenario Bar */}
              <div className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-700/60 text-xs text-slate-300 leading-relaxed flex items-center gap-3">
                <ShieldAlert className="w-5 h-5 text-indigo-400 shrink-0" />
                <span>{dialogue.scenarioDescription}</span>
              </div>

              {/* Character View Area */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

                {/* Avatar & Info */}
                <div className="flex flex-col items-center shrink-0 text-center space-y-2">
                  <div className="relative">
                    <img
                      src={currentStep.characterAvatar}
                      alt={currentStep.characterName}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-slate-800 shadow-xl"
                    />
                    <div className="absolute -bottom-2 -right-2">
                      {getMoodBadge(currentStep.characterMood)}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">{currentStep.characterName}</h3>
                    <p className="text-xs text-indigo-400 font-medium">{currentStep.characterRole}</p>
                  </div>
                </div>

                {/* Speech Bubble */}
                <div className="flex-1 w-full bg-slate-900/90 border border-slate-700/80 p-5 rounded-2xl relative shadow-lg">
                  <div className="hidden md:block absolute -left-3 top-8 w-0 h-0 border-t-[8px] border-t-transparent border-r-[12px] border-r-slate-700/80 border-b-[8px] border-b-transparent" />
                  <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold mb-2">
                    <Volume2 className="w-4 h-4" />
                    <span>Suhbatdosh gapirmoqda:</span>
                  </div>
                  <p className="text-sm sm:text-base font-medium text-slate-100 leading-relaxed">
                    "{currentStep.speechBubble}"
                  </p>
                </div>
              </div>

              {/* Response Choices */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-400" />
                  <span>Sizning javobingizni tanlang (Sotuvchi/Xodim o'rnida):</span>
                </h4>

                <div className="grid gap-3">
                  {currentStep.options.map((opt, idx) => (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt)}
                      className="w-full text-left p-4 bg-slate-800/80 hover:bg-indigo-950/40 border border-slate-700/80 hover:border-indigo-500/60 rounded-xl transition-all duration-200 group flex items-start gap-3 shadow-sm hover:shadow-indigo-950/50"
                    >
                      <span className="w-7 h-7 rounded-lg bg-slate-700 group-hover:bg-indigo-600 text-slate-200 group-hover:text-white font-bold text-xs flex items-center justify-center shrink-0 transition-colors">
                        {idx + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed group-hover:text-white">
                          {opt.text}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 shrink-0 self-center transition-transform group-hover:translate-x-1" />
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Finished Result Screen */
            <div className="py-8 text-center space-y-6 max-w-xl mx-auto">
              <div className="flex justify-center">
                <div
                  className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-xl ring-4 ${
                    isPassed
                      ? 'bg-emerald-500/20 text-emerald-400 ring-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-400 ring-rose-500/30'
                  }`}
                >
                  {isPassed ? <CheckCircle2 className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
                </div>
              </div>

              <div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    isPassed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                  }`}
                >
                  {isPassed ? "Simulyatsiya Muvaffaqiyatli O'tildi!" : "Natija Yaratilmadi"}
                </span>

                <h3 className="text-2xl font-extrabold text-white mt-2">
                  {isPassed
                    ? "Ofarin! Muloqot standarti a'lo darajada bajarildi"
                    : "Muloqot simulyatsiyasida xatoliklarga yo'l qo'yildi"}
                </h3>

                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {isPassed
                    ? "Siz mijoz e'tirozlarini to'g'ri bartaraf etdingiz va muloqot madaniyatini namoyish etdingiz."
                    : "Mijoz e'tirozlarini hal etishda xushmuomalalik va amaliy takliflarga ko'proq e'tibor bering."}
                </p>
              </div>

              {/* Score Display */}
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-around">
                <div>
                  <div className="text-xs text-slate-400 font-medium">Toplangan Ball</div>
                  <div className="text-2xl font-extrabold text-amber-400 font-mono mt-1">
                    +{totalScore} ball
                  </div>
                </div>
                <div className="w-px h-10 bg-slate-800" />
                <div>
                  <div className="text-xs text-slate-400 font-medium">Foiz Ko'rsatkichi</div>
                  <div
                    className={`text-2xl font-extrabold font-mono mt-1 ${
                      isPassed ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {finalScorePct}%
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleRestart}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 border border-slate-700 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Qayta Urinib Ko'rish</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-900/30 transition-all"
                >
                  Darsga Qaytish / Tugatish
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Feedback Modal Popup */}
        {activeFeedbackOption && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 text-slate-100 space-y-5 shadow-2xl">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white ${
                    activeFeedbackOption.option.points >= 0
                      ? 'bg-emerald-600 shadow-lg shadow-emerald-900/30'
                      : 'bg-rose-600 shadow-lg shadow-rose-900/30'
                  }`}
                >
                  {activeFeedbackOption.option.points >= 0 ? '+' + activeFeedbackOption.option.points : activeFeedbackOption.option.points}
                </div>

                <div>
                  <h4 className="font-bold text-sm text-white">
                    {activeFeedbackOption.option.points >= 0
                      ? "To'g'ri Yondashuv!"
                      : 'Xato Muloqot Yondashuvi!'}
                  </h4>
                  <p className="text-xs text-slate-400">iSpring Metodist Mulohazasi</p>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed">
                "{activeFeedbackOption.option.feedbackMessage}"
              </div>

              <button
                onClick={handleProceedAfterFeedback}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                <span>Davom Etish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
