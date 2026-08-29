import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  Target,
  Sparkles,
  TrendingUp,
  Award,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  UserCheck,
  ShieldCheck,
  Zap,
  BookOpen,
  Briefcase,
  PlusCircle,
  Edit,
  Trash2,
  X,
} from 'lucide-react';
import { PDPMilestone } from '../types';

interface SmartPDPProps {
  onNavigateTab?: (tabName: string) => void;
}

export const SmartPDP: React.FC<SmartPDPProps> = ({ onNavigateTab }) => {
  const {
    currentUser,
    pdpCompetencies,
    pdpMilestones,
    togglePDPMilestone,
    addPDPMilestone,
    updatePDPMilestone,
    deletePDPMilestone,
  } = useApp();

  const isManagerOrAdmin = ['admin', 'trainer', 'director', 'store_manager'].includes(currentUser.role);

  const [showModal, setShowModal] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<PDPMilestone | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Texnika Bilimi');
  const [formDuration, setFormDuration] = useState('15 daqiqa');
  const [formTips, setFormTips] = useState('');
  const [formActionTab, setFormActionTab] = useState('sales_sim');

  const openModal = (ms?: PDPMilestone) => {
    if (ms) {
      setEditingMilestone(ms);
      setFormTitle(ms.title);
      setFormCategory(ms.category);
      setFormDuration(ms.duration);
      setFormTips(ms.tips);
      setFormActionTab(ms.actionTab || 'sales_sim');
    } else {
      setEditingMilestone(null);
      setFormTitle('');
      setFormCategory('Texnika Bilimi');
      setFormDuration('15 daqiqa');
      setFormTips("Xodim uchun amaliy tavsiya va ko'nikma...");
      setFormActionTab('sales_sim');
    }
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (editingMilestone) {
      updatePDPMilestone(editingMilestone.id, {
        title: formTitle,
        category: formCategory,
        duration: formDuration,
        tips: formTips,
        actionTab: formActionTab,
      });
    } else {
      addPDPMilestone({
        id: `pdp_m_${Date.now()}`,
        title: formTitle,
        category: formCategory,
        duration: formDuration,
        isCompleted: false,
        tips: formTips,
        actionTab: formActionTab,
      });
    }
    setShowModal(false);
  };

  const careerLevels = [
    { title: 'Stajyor', minPoints: 0, perks: 'Boshlang\'ich ta\'lim va bejdik', active: true },
    { title: 'Junior Sotuvchi', minPoints: 500, perks: 'Showroom savdolari va 1v1 duel', active: true },
    { title: 'Katta Konsultant', minPoints: 1200, perks: 'Oylik bonus + Murabbiylik huquqi', active: currentUser.points >= 1200 },
    { title: 'Smena Yetakchisi', minPoints: 2000, perks: 'Do\'kon auditi va kassa nazorati', active: currentUser.points >= 2000 },
    { title: 'Do\'kon Rahbari', minPoints: 3500, perks: 'Boshqaruv KPI va filial ulushi', active: currentUser.points >= 3500 },
  ];

  const overallMastery = Math.round(
    pdpCompetencies.reduce((acc, curr) => acc + curr.currentLevel, 0) / pdpCompetencies.length
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold mb-2">
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI Shaxsiy Rivojlanish Dasturi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            AI Smart PDP (Individual Rivojlanish Xaritasi)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Sizning test natijalaringiz, xatolar banki va simulyator mashqlariga asoslangan individual kasbiy o'sish xaritasi.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800 shrink-0">
          <div className="text-center">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Umumiy Malaka:</div>
            <div className="text-2xl font-black text-emerald-400">{overallMastery}%</div>
          </div>
          <div className="h-10 w-px bg-slate-800" />
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Joriy Daraja:</div>
            <div className="text-xs font-extrabold text-white">{currentUser.position}</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Competency Matrix & Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Competency Matrix */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Target className="w-4 h-4 text-indigo-600" />
                  <span>5 Asosiy Kasbiy Kompetensiya Matritsasi</span>
                </h2>
                <p className="text-xs text-slate-500">
                  AI tomonidan muntazam tahlil qilinib, zaif nuqtalar aniqlanadi.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {pdpCompetencies.map((comp) => {
                const isNeedsFocus = comp.status === 'needs_focus';
                const isMaster = comp.status === 'master';

                return (
                  <div
                    key={comp.key}
                    className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{comp.name}</span>
                        <span
                          className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                            isNeedsFocus
                              ? 'bg-rose-100 text-rose-800'
                              : isMaster
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {isNeedsFocus ? "E'tibor Talab" : isMaster ? 'A\'lo Darajada' : 'Yaxshi'}
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold text-indigo-900">
                        {comp.currentLevel}% / {comp.targetLevel}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isNeedsFocus
                            ? 'bg-amber-500'
                            : isMaster
                            ? 'bg-emerald-500'
                            : 'bg-indigo-600'
                        }`}
                        style={{ width: `${comp.currentLevel}%` }}
                      />
                    </div>

                    {/* AI Tip / Recommendation */}
                    <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-[11px] text-slate-700 flex items-start gap-2">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-slate-900 font-semibold">AI Tavsiyasi: </strong>
                        {comp.recommendedAction}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Career Path Stepper */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-600" />
              <span>Karyera Pog'onasi va Imtiyozlar</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
              {careerLevels.map((lvl, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-center space-y-1 transition-all ${
                    lvl.active
                      ? 'bg-indigo-50/80 border-indigo-300 text-indigo-950 font-bold'
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="text-[10px] text-slate-500 uppercase">{lvl.minPoints} Ball</div>
                  <div className="text-xs font-extrabold truncate">{lvl.title}</div>
                  <div className="text-[9px] text-slate-600 leading-tight">{lvl.perks}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Action Milestones */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Haftalik Maqsadli Vazifalar</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ushbu amallarni bajarib, PDP ko'rsatkichingizni 95% ga yetkazing.
                </p>
              </div>

              {isManagerOrAdmin && (
                <button
                  onClick={() => openModal()}
                  className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl border border-indigo-200 flex items-center gap-1 shrink-0 transition-colors"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>+ Maqsad</span>
                </button>
              )}
            </div>

            <div className="space-y-3">
              {pdpMilestones.map((ms) => (
                <div
                  key={ms.id}
                  className={`p-4 rounded-xl border transition-all space-y-2.5 ${
                    ms.isCompleted
                      ? 'bg-emerald-50/40 border-emerald-300'
                      : 'bg-slate-50/80 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <button
                      onClick={() => togglePDPMilestone(ms.id)}
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        ms.isCompleted
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-slate-300 bg-white hover:border-indigo-600'
                      }`}
                    >
                      {ms.isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                          {ms.category}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-400 font-medium">{ms.duration}</span>
                          {isManagerOrAdmin && (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => openModal(ms)}
                                className="p-0.5 text-slate-400 hover:text-indigo-600 rounded"
                              >
                                <Edit className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => deletePDPMilestone(ms.id)}
                                className="p-0.5 text-slate-400 hover:text-rose-600 rounded"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <h4
                        className={`font-bold text-xs mt-1 ${
                          ms.isCompleted ? 'line-through text-slate-400' : 'text-slate-900'
                        }`}
                      >
                        {ms.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{ms.tips}</p>
                    </div>
                  </div>

                  {ms.actionTab && onNavigateTab && !ms.isCompleted && (
                    <button
                      onClick={() => onNavigateTab(ms.actionTab!)}
                      className="w-full py-1.5 px-3 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-indigo-600 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>Vazifaga O'tish</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for PDP Milestone */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {editingMilestone ? "PDP Vazifani Tahrirlash" : "Yangi PDP Vazifa Qo'shish"}
                </h3>
              </div>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Vazifa Sarlavhasi</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: 3 ta Inverter konditsioner taqqoslashini topshirish"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kategoriya</label>
                  <input
                    type="text"
                    required
                    placeholder="Texnika Bilimi / E'tirozlar"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Muddati</label>
                  <input
                    type="text"
                    required
                    placeholder="15 daqiqa"
                    value={formDuration}
                    onChange={(e) => setFormDuration(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Bog'langan Bo'lim (Action Tab)</label>
                <select
                  value={formActionTab}
                  onChange={(e) => setFormActionTab(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="sales_sim">AI Sotuv Trenajyori (sales_sim)</option>
                  <option value="cheat_sheet">Texnika Taqqoslagich (cheat_sheet)</option>
                  <option value="academy">O'quv Akademiyasi (academy)</option>
                  <option value="daily_quiz">Kunlik Viktorina (daily_quiz)</option>
                  <option value="store_audit">Do'kon Auditi (store_audit)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tavsiya va Yo'riqnoma (Tips)</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Xodim uchun amaliy tavsiyalar..."
                  value={formTips}
                  onChange={(e) => setFormTips(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Bekor Qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
