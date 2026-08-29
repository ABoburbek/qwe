import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Mic,
  MicOff,
  Sparkles,
  Award,
  RotateCcw,
  UserCheck,
  MessageSquare,
  Lightbulb,
  Send
} from 'lucide-react';
import { CustomerPersona, SimulationEvaluation } from '../types';

export const SalesSimulator: React.FC = () => {
  const { customerPersonas, completeSalesSimulation, showToast } = useApp();

  const [selectedPersona, setSelectedPersona] = useState<CustomerPersona>(customerPersonas[0]);
  const [conversationHistory, setConversationHistory] = useState<{
    role: 'customer' | 'seller';
    text: string;
    score?: number;
    feedback?: string;
  }[]>([]);
  
  const [sellerInput, setSellerInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isRecordingVoice, setIsRecordingVoice] = useState<boolean>(false);
  const [simulationFinished, setSimulationFinished] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<SimulationEvaluation | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationHistory, isAiTyping]);

  const handleStartSimulation = (persona: CustomerPersona) => {
    setSelectedPersona(persona);
    setConversationHistory([
      {
        role: 'customer',
        text: persona.initialObjection
      },
    ]);
    setShowHint(false);
    setSimulationFinished(false);
    setEvaluation(null);
    setSellerInput('');
  };

  useEffect(() => {
    if (conversationHistory.length === 0) {
      handleStartSimulation(customerPersonas[0]);
    }
  }, []);

  const handleSendMessage = async () => {
    if (!sellerInput.trim() || isAiTyping) return;
    
    const newHistory = [
      ...conversationHistory,
      { role: 'seller' as const, text: sellerInput }
    ];
    setConversationHistory(newHistory);
    setSellerInput('');
    setIsAiTyping(true);
    setShowHint(false);

    try {
      const response = await fetch('/api/ai/simulate-sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          persona: selectedPersona,
          history: newHistory
        })
      });
      
      const data = await response.json();
      
      const updatedHistory = [...newHistory];
      // Update the seller's message with score and feedback
      updatedHistory[updatedHistory.length - 1].score = data.score;
      updatedHistory[updatedHistory.length - 1].feedback = data.feedback;
      
      if (!data.isFinished) {
        updatedHistory.push({
          role: 'customer',
          text: data.reaction
        });
        setConversationHistory(updatedHistory);
      } else {
        setConversationHistory(updatedHistory);
        finishSimulation(updatedHistory);
      }
    } catch (error) {
      showToast('AI bilan bog\'lanishda xatolik yuz berdi');
    } finally {
      setIsAiTyping(false);
    }
  };

  const finishSimulation = (history: any[]) => {
    const scores = history.filter(h => h.role === 'seller' && h.score).map(h => h.score);
    const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

    const empathy = Math.min(100, Math.round(avgScore * 0.95 + 5));
    const productKnowledge = Math.min(100, Math.round(avgScore * 1.02));
    const objectionHandling = Math.min(100, avgScore);
    const closing = Math.min(100, Math.round(avgScore * 0.9 + 10));

    const earnedCoins = avgScore >= 80 ? 100 : avgScore >= 60 ? 50 : 20;
    const passed = avgScore >= 70;

    const evalData: SimulationEvaluation = {
      empathyScore: empathy,
      productKnowledgeScore: productKnowledge,
      objectionHandlingScore: objectionHandling,
      closingScore: closing,
      totalScore: avgScore,
      feedbackSummary: avgScore >= 70 ? "Yaxshi natija! Mijoz bilan ishlashda asosiy faktlar to'g'ri berildi." : "E'tirozlarni qaytarishda agressiv bo'lmaslik tavsiya etiladi.",
      earnedCoins,
      passed,
    };

    setEvaluation(evalData);
    setSimulationFinished(true);
    completeSalesSimulation(selectedPersona.id, evalData);
  };

  const toggleVoiceMode = () => {
    setIsRecordingVoice(!isRecordingVoice);
    if (!isRecordingVoice) {
      showToast("🎙️ Ovozli rejim faollashdi. (Faqat demo uchun vizual)");
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Sotuv Murabbiyi (Real-time)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            AI Sotuv Trenajyori & E'tirozlar Simulyatori
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Real hayotdagi qiyin xaridorlar bilan jonli yozishib mashq qiling. E'tirozlarni foydaga aylantirish ko'nikmangizni oshiring.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleVoiceMode}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-md ${
              isRecordingVoice
                ? 'bg-rose-600 text-white animate-pulse'
                : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
            }`}
          >
            {isRecordingVoice ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            <span>{isRecordingVoice ? "Ovozli Rejim (Yoniq)" : "Ovozli Mashq"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Customer Personas */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-indigo-600" />
              <span>Mijoz Personalari</span>
            </h2>
            <div className="space-y-3 pt-1">
              {customerPersonas.map((persona) => {
                const isSelected = selectedPersona?.id === persona.id;
                return (
                  <button
                    key={persona.id}
                    onClick={() => handleStartSimulation(persona)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-indigo-50/80 border-indigo-500 ring-2 ring-indigo-500/20 shadow-sm'
                        : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100/80'
                    }`}
                  >
                    <img
                      src={persona.avatar}
                      alt={persona.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-bold text-xs text-slate-900 truncate">{persona.name}</h4>
                        <span
                          className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                            persona.difficulty === 'Oson'
                              ? 'bg-emerald-100 text-emerald-800'
                              : persona.difficulty === "O'rta"
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {persona.difficulty}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5 line-clamp-1">
                        🎯 Mahsulot: {persona.targetProduct}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Live Chat Area */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col h-[600px]">
            {/* Header */}
            {selectedPersona && (
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedPersona.avatar}
                    alt={selectedPersona.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-indigo-200"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{selectedPersona.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="text-indigo-600 font-bold">{selectedPersona.targetProduct}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleStartSimulation(selectedPersona)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Qayta Boshlash</span>
                </button>
              </div>
            )}

            {/* Conversation Messages */}
            <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-slate-50/30">
              {conversationHistory.map((item, idx) => (
                <div key={idx} className={`flex items-start gap-3 max-w-[85%] ${item.role === 'seller' ? 'ml-auto flex-row-reverse' : ''}`}>
                  {item.role === 'customer' ? (
                    <img src={selectedPersona?.avatar} alt="Customer" className="w-8 h-8 rounded-full object-cover mt-1" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center mt-1">Siz</div>
                  )}
                  <div className={`p-4 rounded-2xl shadow-sm space-y-1.5 ${item.role === 'seller' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white border border-slate-200 rounded-tl-none'}`}>
                    <p className={`text-xs sm:text-sm font-medium ${item.role === 'seller' ? 'text-white' : 'text-slate-800'}`}>
                      {item.text}
                    </p>
                    {item.feedback && (
                      <div className="pt-2 border-t border-indigo-500/50 text-[11px] text-indigo-100 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                        <span>Baho: {item.score}/100 - {item.feedback}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isAiTyping && (
                <div className="flex items-start gap-3 max-w-[85%]">
                  <img src={selectedPersona?.avatar} alt="Customer" className="w-8 h-8 rounded-full object-cover mt-1" />
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 rounded-tl-none shadow-sm flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Bottom Actions */}
            {!simulationFinished ? (
              <div className="p-4 border-t border-slate-200 bg-white space-y-3">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="text-xs text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                    <span>AI Maslahati</span>
                  </button>
                </div>
                {showHint && selectedPersona && (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                    <div className="font-bold flex items-center gap-1.5 mb-1"><Sparkles className="w-3.5 h-3.5 text-amber-600" /> Yo'riqnoma:</div>
                    <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                      <li>Mijozning e'tiroziga qo'shilib empatiya bildiring.</li>
                      <li>Maxsus foydani tushuntiring.</li>
                    </ul>
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={sellerInput}
                    onChange={(e) => setSellerInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Sotuvchi sifatida javobingizni yozing..."
                    disabled={isAiTyping}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!sellerInput.trim() || isAiTyping}
                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl shadow-md flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : evaluation ? (
              <div className="p-6 border-t border-slate-200 bg-gradient-to-b from-indigo-50/50 to-white">
                <div className="text-center space-y-2 mb-6">
                  <div className="inline-flex p-3 rounded-full bg-emerald-100 text-emerald-700 shadow-sm">
                    <Award className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">
                    {evaluation.passed ? "Mashg'ulot Muvaffaqiyatli!" : "Mashg'ulotni Yana Takrorlang"}
                  </h3>
                  <p className="text-sm text-slate-600 max-w-lg mx-auto">{evaluation.feedbackSummary}</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {/* Scores... */}
                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-center"><div className="text-[10px] font-bold text-slate-400 uppercase">Empatiya</div><div className="text-lg font-black text-indigo-600">{evaluation.empathyScore}%</div></div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-center"><div className="text-[10px] font-bold text-slate-400 uppercase">Mahsulot Bilimi</div><div className="text-lg font-black text-blue-600">{evaluation.productKnowledgeScore}%</div></div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-center"><div className="text-[10px] font-bold text-slate-400 uppercase">E'tiroz Yengish</div><div className="text-lg font-black text-emerald-600">{evaluation.objectionHandlingScore}%</div></div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-center"><div className="text-[10px] font-bold text-slate-400 uppercase">Sotuvni Yopish</div><div className="text-lg font-black text-purple-600">{evaluation.closingScore}%</div></div>
                </div>
                <div className="flex items-center justify-between bg-slate-900 text-white p-4 rounded-xl">
                  <div className="font-bold text-sm">+{evaluation.earnedCoins} Hamkor Tangasi Berildi!</div>
                  <button onClick={() => handleStartSimulation(selectedPersona!)} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white rounded-lg">Yana Mashq Qilish</button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
