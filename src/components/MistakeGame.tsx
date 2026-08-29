import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import {
  Gamepad2,
  Sparkles,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Zap,
  Check,
  Flame,
} from 'lucide-react';

export const MistakeGame: React.FC = () => {
  const { mistakes, resolveMistake, currentUser } = useApp();

  const userMistakes = mistakes.filter(
    (m) => m.userId === currentUser.id && !m.isResolved
  );

  const [activeGameIndex,_setActiveGameIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<'idle' | 'correct' | 'wrong'>(
    'idle'
  );

  const currentMistake = userMistakes[activeGameIndex];

  const handleSelectOption = (idx: number) => {
    if (!currentMistake || answerState !== 'idle') return;
    setSelectedOption(idx);

    if (idx === currentMistake.question.correctAnswerIndex) {
      setAnswerState('correct');
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
      });
      // Resolve mistake after 1.5s
      setTimeout(() => {
        resolveMistake(currentMistake.id);
        setAnswerState('idle');
        setSelectedOption(null);
      }, 1500);
    } else {
      setAnswerState('wrong');
    }
  };

  const handleTryAgainOption = () => {
    setAnswerState('idle');
    setSelectedOption(null);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold mb-2">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Interaktiv Xatolar Ustida Ishlash va O'yin</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              "Xatolar Banki" va Bilim Boshqotirmasi
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Test jarayonida yo'l qo'yilgan xato savollarga o'yin shaklida to'g'ri javob bering, xatolaringizni bartaraf eting va qo'shimcha +50 ball jamg'aring!
            </p>
          </div>

          <div className="bg-slate-800/80 px-4 py-3 rounded-xl border border-slate-700/80 flex items-center gap-3">
            <Award className="w-7 h-7 text-amber-400 shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400 font-medium">Xatoliklar Saqlagichi</div>
              <div className="text-sm font-bold text-amber-400">
                {userMistakes.length} ta qayta ishlash kerak
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Game Interface */}
      {userMistakes.length > 0 && currentMistake ? (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200/90 shadow-xl p-6 sm:p-8 space-y-6">
          {/* Game Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-extrabold border border-amber-200">
                Savol {activeGameIndex + 1} / {userMistakes.length}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {currentMistake.courseTitle}
              </span>
            </div>

            <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">
              <Sparkles className="w-4 h-4 fill-amber-500" />
              <span>+50 Hamkor Ball</span>
            </div>
          </div>

          {/* Question Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white space-y-3 shadow-md">
            <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
              Xatolikni Qayta Ishlash:
            </div>
            <h3 className="text-base sm:text-lg font-bold leading-relaxed">
              {currentMistake.question.question}
            </h3>
          </div>

          {/* Interactive Options */}
          <div className="space-y-3">
            {currentMistake.question.options.map((option, optIdx) => {
              const isSelected = selectedOption === optIdx;
              const isCorrect = optIdx === currentMistake.question.correctAnswerIndex;

              let btnStyle = 'bg-slate-50 border-slate-200 hover:border-amber-400 text-slate-800';

              if (answerState === 'correct' && isCorrect) {
                btnStyle =
                  'bg-emerald-600 text-white border-emerald-600 font-bold shadow-md animate-bounce';
              } else if (answerState === 'wrong' && isSelected && !isCorrect) {
                btnStyle = 'bg-rose-600 text-white border-rose-600 font-bold shadow-md';
              }

              return (
                <button
                  key={optIdx}
                  disabled={answerState !== 'idle'}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-between transition-all ${btnStyle}`}
                >
                  <span>{option}</span>
                  {answerState === 'correct' && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                  )}
                  {answerState === 'wrong' && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Next */}
          {answerState === 'wrong' && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-2 text-xs text-rose-900 animate-fadeIn">
              <strong className="block font-bold">❌ Noto'g'ri javob:</strong>
              <p>{currentMistake.question.explanation}</p>
              <button
                onClick={handleTryAgainOption}
                className="mt-2 px-4 py-1.5 bg-rose-600 text-white font-bold text-xs rounded-lg flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Qayta Urinib Ko'rish
              </button>
            </div>
          )}

          {answerState === 'correct' && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-bold text-center animate-fadeIn">
              🎉 A'lo! Ballingiz oshirildi va xatolik bartaraf etildi!
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-12 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
            <Check className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900">
            Ajoyib natija! "Xatolar Banki" bo'sh!
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Siz barcha testlardagi yo'l qo'ygan xatollaringizni muvaffaqiyatli bartaraf etdingiz. Bilimingiz va reytingingiz yuqori darajada!
          </p>
        </div>
      )}
    </div>
  );
};
