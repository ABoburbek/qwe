import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Swords,
  Trophy,
  Zap,
  Timer,
  Award,
  Flame,
  Shield,
  TrendingUp,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Users,
  Building2,
  Sparkles,
  Bot,
  Crown,
} from 'lucide-react';
import { DuelQuestion } from '../types';

export const KnowledgeDuel: React.FC = () => {
  const { currentUser, duelQuestions, storeLeague, recordDuelResult, showToast } = useApp();

  const [activeView, setActiveView] = useState<'lobby' | 'battle' | 'result'>('lobby');
  const [selectedWager, setSelectedWager] = useState<number>(25);
  const [opponent, setOpponent] = useState<{
    id: string;
    name: string;
    storeName: string;
    avatar: string;
    isBot: boolean;
  }>({
    id: 'bot_ai',
    name: 'AI Savdo Bot (Ekspert)',
    storeName: 'Hamkor AI Arena',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
    isBot: true,
  });

  // Battle State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userScore, setUserScore] = useState<number>(0);
  const [opponentScore, setOpponentScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [battleQuestions, setBattleQuestions] = useState<DuelQuestion[]>([]);

  // Timer effect during active battle
  useEffect(() => {
    if (activeView !== 'battle' || isAnswered) return;

    if (timeLeft <= 0) {
      handleAnswerSelection(-1); // Timeout
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [activeView, timeLeft, isAnswered]);

  const startDuel = (customOpponent?: typeof opponent) => {
    const opp = customOpponent || opponent;
    setOpponent(opp);

    // Shuffle 5 questions
    const shuffled = [...duelQuestions].sort(() => 0.5 - Math.random()).slice(0, 5);
    setBattleQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setUserScore(0);
    setOpponentScore(0);
    setTimeLeft(15);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setActiveView('battle');
  };

  const handleAnswerSelection = (index: number) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedAnswer(index);

    const currQ = battleQuestions[currentQuestionIndex];
    const isCorrect = index === currQ?.correctIndex;

    // Calculate score based on time left
    const pointsGained = isCorrect ? Math.round(100 + timeLeft * 5) : 0;
    const newUserScore = userScore + pointsGained;
    setUserScore(newUserScore);

    // Simulated Opponent response (75% probability of getting it right)
    const opponentCorrect = Math.random() < 0.75;
    const oppPoints = opponentCorrect ? Math.round(100 + Math.random() * 50) : 0;
    const newOppScore = opponentScore + oppPoints;
    setOpponentScore(newOppScore);

    // Wait 2 seconds and move to next question or result
    setTimeout(() => {
      if (currentQuestionIndex + 1 < battleQuestions.length) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setTimeLeft(15);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        // Battle finished
        const userWon = newUserScore >= newOppScore;
        recordDuelResult(userWon, selectedWager, opponent.name);
        setActiveView('result');
      }
    }, 2000);
  };

  const currentQ = battleQuestions[currentQuestionIndex];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold mb-2">
            <Swords className="w-3.5 h-3.5 text-amber-400" />
            <span>Real-Vaqt Bilim Bellashuvi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            1v1 Bilim Dueli & Filiallar Ligasi
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Hamkasblar yoki AI bot bilan maishiy texnika, kassa va savdo bo'yicha 60 soniyalik tezkor duellarda bellashing. Filialingizni Respublika reytingida 1-o'ringa olib chiqing!
          </p>
        </div>

        {/* Current User Balances & Streak */}
        <div className="flex items-center gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800 shrink-0">
          <div className="text-right">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Sizning Balansingiz:</div>
            <div className="text-base font-extrabold text-amber-400 flex items-center justify-end gap-1">
              <span>🪙 {currentUser.points}</span>
            </div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-right">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Filialingiz:</div>
            <div className="text-xs font-bold text-white truncate max-w-[130px]">{currentUser.storeName}</div>
          </div>
        </div>
      </div>

      {/* LOBBY VIEW */}
      {activeView === 'lobby' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Matchmaking & Bet Selector */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Swords className="w-5 h-5 text-indigo-600" />
                  <span>Yangi Duel Boshlash</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Garov miqdorini tanlang va raqibingizga qarshi 5 ta savolda kuch sinashing.
                </p>
              </div>

              {/* Wager Select */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Garov Tikish (Hamkor Tangasi):
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {[10, 25, 50, 100].map((wager) => (
                    <button
                      key={wager}
                      onClick={() => setSelectedWager(wager)}
                      className={`p-3 rounded-xl border text-center font-bold text-xs transition-all ${
                        selectedWager === wager
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-500/20'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div>🪙 {wager}</div>
                      <div className="text-[10px] opacity-80 mt-0.5">Yutuq: +{wager * 2}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Opponent Selection */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Raqibni Tanlang:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* AI Challenger */}
                  <button
                    onClick={() =>
                      startDuel({
                        id: 'bot_ai',
                        name: 'AI Savdo Bot (Ekspert)',
                        storeName: 'Hamkor AI Arena',
                        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
                        isBot: true,
                      })
                    }
                    className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 text-left transition-all space-y-2 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 group-hover:text-indigo-600 transition-colors">
                          AI Savdo Bot
                        </h4>
                        <span className="text-[10px] text-indigo-700 font-bold bg-indigo-100 px-2 py-0.5 rounded">
                          Tezkor O'yin (Instant)
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Kutmasdan darhol boshlash uchun sun'iy intellekt botiga qarshi bellashuv.
                    </p>
                  </button>

                  {/* Top Store Colleague */}
                  <button
                    onClick={() =>
                      startDuel({
                        id: 'usr_2',
                        name: 'Malika Karimova',
                        storeName: 'Yunusobod Filiali',
                        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
                        isBot: false,
                      })
                    }
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-left transition-all space-y-2 group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
                        alt="Colleague"
                        className="w-10 h-10 rounded-full object-cover border border-slate-300"
                      />
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 group-hover:text-indigo-600 transition-colors">
                          Malika Karimova
                        </h4>
                        <span className="text-[10px] text-slate-500 font-medium">Yunusobod Mega Filiali</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Yunusobod filiali bosh kassiri bilan bilim sinovi.
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Store League Table */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    <span>Filiallar Ligasi (Top Reyting)</span>
                  </h3>
                  <p className="text-xs text-slate-500">Oylik g'olib filial kubok va mukofot oladi.</p>
                </div>
              </div>

              <div className="space-y-2.5">
                {storeLeague.map((branch) => {
                  const isMyStore = branch.storeId === currentUser.storeId;
                  return (
                    <div
                      key={branch.storeId}
                      className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                        isMyStore
                          ? 'bg-indigo-50/70 border-indigo-400 ring-2 ring-indigo-400/20'
                          : 'bg-slate-50/60 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-7 h-7 rounded-lg font-black text-xs flex items-center justify-center shrink-0 ${
                            branch.rank === 1
                              ? 'bg-amber-400 text-slate-900'
                              : branch.rank === 2
                              ? 'bg-slate-300 text-slate-800'
                              : branch.rank === 3
                              ? 'bg-amber-700 text-white'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          #{branch.rank}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-xs text-slate-900 truncate flex items-center gap-1.5">
                            <span>{branch.storeName}</span>
                            {isMyStore && (
                              <span className="px-1.5 py-0.2 text-[9px] bg-indigo-600 text-white font-bold rounded">
                                Siz
                              </span>
                            )}
                          </h4>
                          <span className="text-[11px] text-slate-500">
                            {branch.city} • {branch.duelsWon} g'alaba ({branch.winRatePercent}%)
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="font-black text-xs text-indigo-700">{branch.totalPoints} ball</div>
                        <div className="text-[10px] text-slate-400">{branch.badge}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ACTIVE BATTLE VIEW */}
      {activeView === 'battle' && currentQ && (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Top Score Comparison Bar */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-xl flex items-center justify-between gap-4">
            {/* Player Side */}
            <div className="flex items-center gap-3">
              <img
                src={currentUser.avatar}
                alt="You"
                className="w-12 h-12 rounded-full object-cover border-2 border-indigo-400 shadow-md"
              />
              <div>
                <div className="text-[10px] text-indigo-300 font-bold uppercase">Siz</div>
                <div className="font-black text-lg text-white">{userScore} Ball</div>
              </div>
            </div>

            {/* Middle Timer & VS */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-amber-400 flex items-center justify-center font-mono font-black text-base text-amber-300 shadow-inner">
                {timeLeft}s
              </div>
              <span className="text-[10px] text-slate-400 font-bold uppercase mt-1">
                Savol {currentQuestionIndex + 1} / {battleQuestions.length}
              </span>
            </div>

            {/* Opponent Side */}
            <div className="flex items-center gap-3 text-right">
              <div>
                <div className="text-[10px] text-rose-300 font-bold uppercase">{opponent.name}</div>
                <div className="font-black text-lg text-white">{opponentScore} Ball</div>
              </div>
              <img
                src={opponent.avatar}
                alt="Opponent"
                className="w-12 h-12 rounded-full object-cover border-2 border-rose-400 shadow-md"
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs">
                Toifa: {currentQ.category}
              </span>
              <span className="text-xs text-slate-400 font-semibold">Tezroq javob berib, ko'proq ball oling!</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let btnStyle = 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800';
                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-500/30';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-600 text-white border-rose-600 shadow-md';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleAnswerSelection(idx)}
                    className={`p-4 rounded-xl border text-left font-medium text-xs sm:text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-full bg-white/20 font-bold flex items-center justify-center shrink-0 text-xs">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-snug">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* RESULT VIEW */}
      {activeView === 'result' && (
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-xl text-center space-y-6 animate-fadeIn">
          <div className="inline-flex p-4 rounded-full bg-amber-100 text-amber-600 shadow-sm">
            {userScore >= opponentScore ? <Crown className="w-12 h-12" /> : <Shield className="w-12 h-12" />}
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900">
              {userScore >= opponentScore ? "G'alaba Qozondingiz! 🏆" : "Mag'lubiyat! Keyingi Safar Omad"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {userScore >= opponentScore
                ? `Tabriklaymiz! Siz ${opponent.name} ustidan ${userScore} vs ${opponentScore} hisobida g'olib bo'ldingiz.`
                : `${opponent.name} bu safar ustun keldi (${opponentScore} vs ${userScore}). Bilimingizni oshirib qayta urinib ko'ring!`}
            </p>
          </div>

          <div className="p-4 bg-slate-900 text-white rounded-xl flex items-center justify-between">
            <div className="text-left">
              <div className="text-xs text-slate-400 font-bold">Garov Natijasi:</div>
              <div className="text-lg font-black text-amber-400">
                {userScore >= opponentScore ? `+${selectedWager * 2} Hamkor Tangasi` : `-${selectedWager} Tanga`}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400 font-bold">Filial Balli:</div>
              <div className="text-sm font-bold text-emerald-400">
                {userScore >= opponentScore ? `+${selectedWager * 2} Ochko` : `+0`}
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveView('lobby')}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white rounded-xl shadow-md transition-colors"
          >
            Lobbiyga Qaytish
          </button>
        </div>
      )}
    </div>
  );
};
