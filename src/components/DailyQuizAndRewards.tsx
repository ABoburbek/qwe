import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RewardStoreItem } from '../types';
import {
  Coins,
  ShoppingBag,
  Sparkles,
  Flame,
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  Gift,
  ArrowRight,
  Check,
  Zap,
  HelpCircle,
  Trophy,
} from 'lucide-react';

export const DailyQuizAndRewards: React.FC = () => {
  const { currentUser, dailyQuizQuestions, rewardStoreItems } = useApp();
  const [activeTab, setActiveTab] = useState<'daily_quiz' | 'market'>('daily_quiz');

  // Quiz state
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userScoreCoins, setUserScoreCoins] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  // Coins balance
  const [coinsBalance, setCoinsBalance] = useState(currentUser.points + 180);
  const [purchasedRewardId, setPurchasedRewardId] = useState<string | null>(null);

  const currentQ = dailyQuizQuestions[currentQIndex] || dailyQuizQuestions[0];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOpt(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOpt === null || !currentQ) return;
    setIsAnswerSubmitted(true);
    if (selectedOpt === currentQ.correctIndex) {
      setUserScoreCoins((prev) => prev + 20);
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex < dailyQuizQuestions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOpt(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
      setCoinsBalance((prev) => prev + userScoreCoins + 30); // Quiz bonus
    }
  };

  const handleRedeem = (item: RewardStoreItem) => {
    if (coinsBalance < item.costCoins) {
      alert("Tangalaringiz yetarli emas! Kunlik viktorinada qatnashib ko'proq Coin to'plang.");
      return;
    }
    setCoinsBalance((prev) => prev - item.costCoins);
    setPurchasedRewardId(item.id);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold mb-2">
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span>Gamification va Rag'batlantirish</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Kunlik Viktorina & Xodimlar Sovg'alari Do'koni
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Har kuni 1 daqiqalik maishiy texnika viktorinasida qatnashib Coin to'plang hamda brend futbolkalari, termos va sovg'a vaucherlarini yutib oling!
          </p>
        </div>

        {/* Coin Balance Display */}
        <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 text-center shrink-0 min-w-[200px] shadow-lg">
          <div className="text-[11px] text-slate-400 font-bold uppercase">Sizning Tangalaringiz (Coins)</div>
          <div className="text-3xl font-extrabold text-amber-400 font-mono mt-0.5 flex items-center justify-center gap-1.5">
            <Coins className="w-7 h-7 text-amber-400" />
            <span>{coinsBalance}</span>
          </div>
          <div className="mt-1 text-[10px] text-amber-300/80 font-bold">
            🔥 {currentUser.streakDays || 5} kunlik ketma-ketlik bonusi active
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('daily_quiz')}
          className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center gap-2 ${
            activeTab === 'daily_quiz'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Zap className="w-4 h-4 fill-slate-950" />
          <span>Bugungi Kunlik Viktorina (1 Minut Challenge)</span>
        </button>

        <button
          onClick={() => setActiveTab('market')}
          className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center gap-2 ${
            activeTab === 'market'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Coins Sovg'a Do'koni (Marketplace)</span>
        </button>
      </div>

      {/* DAILY QUIZ TAB */}
      {activeTab === 'daily_quiz' && (
        <div className="max-w-3xl mx-auto">
          {!currentQ ? (
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-lg p-8 text-center text-slate-500 space-y-2">
              <Zap className="w-10 h-10 text-amber-500 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">Hozircha viktorina savollari mavjud emas</h3>
              <p className="text-xs">Ma'muriyat paneli orqali yangi savollar qo'shishingiz mumkin.</p>
            </div>
          ) : !isQuizCompleted ? (
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-lg p-6 sm:p-8 space-y-6">
              {/* Quiz Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold uppercase">
                    11-Avgust Viktorinasi
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 mt-1">
                    {currentQIndex + 1}-Savol / {dailyQuizQuestions.length}
                  </h2>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 rounded-xl text-amber-800 text-xs font-bold border border-amber-200">
                  <Coins className="w-4 h-4 text-amber-500" />
                  <span>+20 Coin Mukofot</span>
                </div>
              </div>

              {/* Question Text */}
              <div className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {currentQ.question}
              </div>

              {/* Options List */}
              <div className="space-y-3">
                {currentQ.options.map((optionText, idx) => {
                  let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';
                  if (selectedOpt === idx) {
                    btnStyle = 'bg-indigo-50 border-indigo-500 text-indigo-900 ring-2 ring-indigo-500/20';
                  }

                  if (isAnswerSubmitted) {
                    if (idx === currentQ.correctIndex) {
                      btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                    } else if (selectedOpt === idx) {
                      btnStyle = 'bg-rose-50 border-rose-500 text-rose-900 font-bold';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswerSubmitted}
                      className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                    >
                      <span>{optionText}</span>
                      {isAnswerSubmitted && idx === currentQ.correctIndex && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {isAnswerSubmitted && selectedOpt === idx && idx !== currentQ.correctIndex && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box */}
              {isAnswerSubmitted && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 space-y-1">
                  <div className="font-bold flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>iSpring Metodist Izohi:</span>
                  </div>
                  <p>{currentQ.explanation}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end pt-2">
                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOpt === null}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all"
                  >
                    Javobni Tasdiqlash
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
                  >
                    <span>{currentQIndex < dailyQuizQuestions.length - 1 ? "Keyingi Savol" : "Natijani Ko'rish"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Quiz Completed View */
            <div className="bg-slate-900 rounded-2xl border border-slate-800 text-white p-8 text-center space-y-6 shadow-xl">
              <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto border border-amber-500/30">
                <Trophy className="w-10 h-10 text-amber-400" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-extrabold">Ofarin! Bugungi Viktorina Yakunlandi!</h2>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Siz maishiy texnika standartlari bo'yicha bilimlaringizni sinadingiz va umumiy <strong className="text-amber-400">+{userScoreCoins + 30} Coin</strong> ishladlingiz.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 max-w-sm mx-auto flex items-center justify-around">
                <div>
                  <div className="text-[10px] text-slate-400">To'plangan Ball:</div>
                  <div className="text-xl font-bold text-amber-400">+{userScoreCoins + 30} Coins</div>
                </div>
                <div className="h-8 w-px bg-slate-800" />
                <div>
                  <div className="text-[10px] text-slate-400">Umumiy Balans:</div>
                  <div className="text-xl font-bold text-emerald-400">{coinsBalance} Coins</div>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('market')}
                className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition-all inline-flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Sovg'alar Do'koniga O'tish</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* REWARDS STORE TAB */}
      {activeTab === 'market' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(rewardStoreItems || []).map((item) => {
              const canAfford = coinsBalance >= item.costCoins;
              const isPurchased = purchasedRewardId === item.id;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all"
                >
                  <div>
                    <div className="relative h-44 overflow-hidden bg-slate-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-900/90 text-amber-400 text-xs font-mono font-extrabold backdrop-blur-md border border-slate-700 flex items-center gap-1.5 shadow-md">
                        <Coins className="w-3.5 h-3.5 text-amber-400" />
                        <span>{item.costCoins} Coins</span>
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <h3 className="font-bold text-sm text-slate-900 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      onClick={() => handleRedeem(item)}
                      disabled={!canAfford && !isPurchased}
                      className={`w-full py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 ${
                        isPurchased
                          ? 'bg-emerald-600 text-white'
                          : canAfford
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {isPurchased ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Sovg'a Xarid Qilindi!</span>
                        </>
                      ) : canAfford ? (
                        <>
                          <Gift className="w-4 h-4" />
                          <span>Coins evaziga xarid qilish</span>
                        </>
                      ) : (
                        <span>Coin Yetarli Emas</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
