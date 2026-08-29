import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BrainCircuit,
  Flame,
  Award,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Send,
  Building2,
  Users,
  Target,
  Trophy,
  BarChart3,
  Search,
  Filter,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export const SkillMatrixAnalyzer: React.FC = () => {
  const {
    currentUser,
    skillHeatmaps,
    autoAssignRemedialCourse,
    storeCompetitions,
    roiData,
    courses,
    stores,
    users,
    showToast,
  } = useApp();

  const [activeViewTab, setActiveViewTab] = useState<'matrix' | 'roi' | 'competitions' | 'individual'>('matrix');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBranchForIndividual, setSelectedBranchForIndividual] = useState<string>(
    skillHeatmaps[0]?.storeId || 'store_1'
  );

  // Filtered branches
  const filteredBranches = skillHeatmaps.filter((b) => {
    const matchCity = selectedCity === 'all' || b.city === selectedCity;
    const matchSearch =
      b.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.managerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCity && matchSearch;
  });

  // KPI Calculations
  const averageOverallScore = Math.round(
    skillHeatmaps.reduce((acc, curr) => acc + curr.skills.overallScore, 0) / (skillHeatmaps.length || 1)
  );

  const topBranch = [...skillHeatmaps].sort((a, b) => b.skills.overallScore - a.skills.overallScore)[0];
  const _lowestSkillCategory = 'creditAndNasiya'; // 74% average

  // Cell Color Helper based on international Heatmap standard
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'bg-emerald-100 text-emerald-900 border-emerald-300 font-extrabold';
    if (score >= 75) return 'bg-amber-100 text-amber-900 border-amber-300 font-bold';
    return 'bg-rose-100 text-rose-900 border-rose-300 font-bold animate-pulse';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 85) return <span className="text-[10px] text-emerald-700">A'lo</span>;
    if (score >= 75) return <span className="text-[10px] text-amber-700">Yaxshi</span>;
    return <span className="text-[10px] text-rose-700 font-extrabold">Zaif bo'g'in</span>;
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-extrabold">
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Cornerstone & iSpring Standarti</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Xodimlar Kompetensiyalar Matritsasi & Filiallar Heatmap Tahlili
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Barcha do'konlar va xodimlarning 5 asosiy ko'nikma darajasi (Texnika, Savdo, Servis, Kassa, Nasiya) issiqlik xaritasida. Zaif nuqtalarga 1-bosishda avtomatlashtirilgan o'quv yo'nalishlari biriktiriladi.
            </p>
          </div>

          {/* Quick Action Badges */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center sm:text-left">
              <div className="text-[11px] text-indigo-200 font-bold uppercase">Tarmoq Kompetensiya Indeksi</div>
              <div className="text-3xl font-black text-amber-400 mt-0.5">{averageOverallScore}%</div>
              <div className="text-[11px] text-emerald-300 flex items-center gap-1 justify-center sm:justify-start mt-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>O'tgan oyga nisbatan +6.4%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-8 pt-6 border-t border-slate-800/80 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveViewTab('matrix')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all shrink-0 ${
              activeViewTab === 'matrix'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Filiallar Heatmap Matritsasi</span>
          </button>

          <button
            onClick={() => setActiveViewTab('roi')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all shrink-0 ${
              activeViewTab === 'roi'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>LMS Ta'siri & ROI Korrelyatsiyasi</span>
          </button>

          <button
            onClick={() => setActiveViewTab('competitions')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all shrink-0 ${
              activeViewTab === 'competitions'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Filiallar Chempionati & Ligas ({storeCompetitions.length})</span>
          </button>

          <button
            onClick={() => setActiveViewTab('individual')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all shrink-0 ${
              activeViewTab === 'individual'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Xodimlar Kesimidagi Tahlil</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Yetakchi Filial</div>
            <div className="text-sm font-black text-slate-900 truncate">{topBranch?.storeName || 'Chilonzor'}</div>
            <div className="text-xs font-extrabold text-emerald-600 mt-0.5">{topBranch?.skills.overallScore || 90}% ball</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl border border-amber-100">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Asosiy Zaif Yo'nalish</div>
            <div className="text-sm font-black text-slate-900">Nasiya & To'lovlar</div>
            <div className="text-xs font-bold text-amber-600 mt-0.5">O'rtacha 74% (Qayta o'qish tavsiya)</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Avtomat Topshiriqlar</div>
            <div className="text-sm font-black text-slate-900">8 ta Mikro-kurs</div>
            <div className="text-xs font-bold text-indigo-600 mt-0.5">Zaif filiallarga yuborilgan</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-cyan-50 text-cyan-600 rounded-2xl border border-cyan-100">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Savdoga Ijobiy Ta'siri</div>
            <div className="text-sm font-black text-slate-900">+24.8% Savdo O'sishi</div>
            <div className="text-xs font-bold text-cyan-600 mt-0.5">O'qigan filiallarning natijasi</div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: FILIALLAR HEATMAP MATRITSASI */}
      {/* ========================================================================= */}
      {activeViewTab === 'matrix' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filial yoki menejer qidirish..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700"
              >
                <option value="all">Barcha Shaharlar</option>
                <option value="Toshkent">Toshkent</option>
                <option value="Samarqand">Samarqand</option>
                <option value="Farg'ona">Farg'ona</option>
                <option value="Buxoro">Buxoro</option>
              </select>
            </div>

            {/* Heatmap Legend */}
            <div className="flex items-center gap-4 text-xs font-bold shrink-0">
              <span className="text-slate-500">Shkala:</span>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-emerald-200 border border-emerald-400" />
                <span className="text-emerald-900 text-[11px]">85-100% (A'lo)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-amber-200 border border-amber-400" />
                <span className="text-amber-900 text-[11px]">70-84% (O'rta)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-rose-200 border border-rose-400" />
                <span className="text-rose-900 text-[11px]">&lt;70% (Zaif)</span>
              </div>
            </div>
          </div>

          {/* Interactive Heatmap Matrix Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-[11px] font-extrabold uppercase tracking-wider">
                    <th className="p-4 border-r border-slate-800">Filial & Mas'ul Menejer</th>
                    <th className="p-4 text-center border-r border-slate-800">
                      1. Maishiy Texnika Bilimi
                    </th>
                    <th className="p-4 text-center border-r border-slate-800">
                      2. Savdo Psixologiyasi & SPIN
                    </th>
                    <th className="p-4 text-center border-r border-slate-800">
                      3. Servis & Kafolat
                    </th>
                    <th className="p-4 text-center border-r border-slate-800">
                      4. Kassa Standarti
                    </th>
                    <th className="p-4 text-center border-r border-slate-800">
                      5. Nasiya & Muddatli To'lov
                    </th>
                    <th className="p-4 text-center border-r border-slate-800">Umumiy Indeks</th>
                    <th className="p-4 text-center">Avtomat Harakat (L&D)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredBranches.map((branch) => {
                    const hasCriticalGap =
                      branch.skills.techKnowledge < 75 ||
                      branch.skills.salesPsychology < 75 ||
                      branch.skills.serviceAndWarranty < 75 ||
                      branch.skills.cashAndStandards < 75 ||
                      branch.skills.creditAndNasiya < 75;

                    return (
                      <tr key={branch.storeId} className="hover:bg-slate-50/80 transition-all">
                        {/* Store Info */}
                        <td className="p-4 font-bold border-r border-slate-100">
                          <div className="flex items-center gap-2">
                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                              <Building2 className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="font-extrabold text-slate-900">{branch.storeName}</div>
                              <div className="text-[11px] text-slate-500 font-medium flex items-center gap-2">
                                <span>{branch.city}</span>
                                <span>•</span>
                                <span>{branch.employeeCount} xodim</span>
                                <span>•</span>
                                <span className="text-slate-600 font-bold">Menejer: {branch.managerName}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Skill 1: Tech */}
                        <td className="p-3 text-center border-r border-slate-100">
                          <div className={`py-2 px-2.5 rounded-xl border ${getScoreColor(branch.skills.techKnowledge)}`}>
                            <div className="text-sm">{branch.skills.techKnowledge}%</div>
                            {getScoreBadge(branch.skills.techKnowledge)}
                          </div>
                        </td>

                        {/* Skill 2: Sales */}
                        <td className="p-3 text-center border-r border-slate-100">
                          <div className={`py-2 px-2.5 rounded-xl border ${getScoreColor(branch.skills.salesPsychology)}`}>
                            <div className="text-sm">{branch.skills.salesPsychology}%</div>
                            {getScoreBadge(branch.skills.salesPsychology)}
                          </div>
                        </td>

                        {/* Skill 3: Service */}
                        <td className="p-3 text-center border-r border-slate-100">
                          <div className={`py-2 px-2.5 rounded-xl border ${getScoreColor(branch.skills.serviceAndWarranty)}`}>
                            <div className="text-sm">{branch.skills.serviceAndWarranty}%</div>
                            {getScoreBadge(branch.skills.serviceAndWarranty)}
                          </div>
                        </td>

                        {/* Skill 4: Cash */}
                        <td className="p-3 text-center border-r border-slate-100">
                          <div className={`py-2 px-2.5 rounded-xl border ${getScoreColor(branch.skills.cashAndStandards)}`}>
                            <div className="text-sm">{branch.skills.cashAndStandards}%</div>
                            {getScoreBadge(branch.skills.cashAndStandards)}
                          </div>
                        </td>

                        {/* Skill 5: Credit */}
                        <td className="p-3 text-center border-r border-slate-100">
                          <div className={`py-2 px-2.5 rounded-xl border ${getScoreColor(branch.skills.creditAndNasiya)}`}>
                            <div className="text-sm">{branch.skills.creditAndNasiya}%</div>
                            {getScoreBadge(branch.skills.creditAndNasiya)}
                          </div>
                        </td>

                        {/* Overall Score */}
                        <td className="p-3 text-center border-r border-slate-100 bg-slate-50/50">
                          <div className="text-base font-black text-slate-900">
                            {branch.skills.overallScore}%
                          </div>
                          <div className="text-[10px] text-slate-500">
                            Baholangan: {branch.lastAssessmentDate}
                          </div>
                        </td>

                        {/* Action Trigger */}
                        <td className="p-3 text-center">
                          {hasCriticalGap ? (
                            <button
                              onClick={() => {
                                const gap = branch.criticalGaps[0] || "Malaka oshirish kursi";
                                const courseId = branch.recommendedCourseId || 'c_retail_1';
                                autoAssignRemedialCourse(branch.storeId, gap, courseId);
                              }}
                              className="px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-[11px] rounded-xl shadow-md flex items-center gap-1.5 justify-center w-full transition-all"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>Avtomat Kurs Biriktirish</span>
                            </button>
                          ) : (
                            <div className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-[11px]">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Standartga Mos</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Critical Gaps Action Cards */}
          <div className="bg-amber-50/70 p-6 rounded-3xl border border-amber-200/80 space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>Avtomatlashtirilgan Tizim Aniqlagan Bo'shliqlar (Skill Gap Alert):</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              {skillHeatmaps
                .filter((b) => b.criticalGaps.length > 0)
                .map((b) => (
                  <div
                    key={b.storeId}
                    className="bg-white p-4 rounded-2xl border border-amber-200/60 shadow-sm space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-xs font-black text-slate-900">{b.storeName}</div>
                      <div className="text-[11px] text-rose-700 font-bold mt-1">
                        ⚠️ Zaiflik: {b.criticalGaps.join(', ')}
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        autoAssignRemedialCourse(
                          b.storeId,
                          b.criticalGaps[0] || 'Qayta tayyorlash',
                          b.recommendedCourseId || 'c_retail_1'
                        )
                      }
                      className="mt-2 w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-[11px] rounded-lg flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>Filialga Mikro-kurs Yuborish</span>
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: LMS TA'SIRI & ROI KORRELYATSIYASI */}
      {/* ========================================================================= */}
      {activeViewTab === 'roi' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <span>O'quv Ko'rsatkichining Savdo Tushumiga Ta'siri (Business ROI Correlation)</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Platforma o'quv modullarini 90%+ bajargan filiallar bilan sust o'qigan filiallarning kassa daromadi va xaridor qoniqishi taqqoslanishi.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {roiData.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border transition-all ${
                    item.status === 'high_performer'
                      ? 'bg-emerald-50/50 border-emerald-200'
                      : item.status === 'growing'
                      ? 'bg-indigo-50/40 border-indigo-200'
                      : 'bg-rose-50/40 border-rose-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-slate-400 uppercase">{item.city}</div>
                      <h4 className="font-extrabold text-sm text-slate-900">{item.storeName}</h4>
                    </div>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        item.status === 'high_performer'
                          ? 'bg-emerald-200 text-emerald-900'
                          : item.status === 'growing'
                          ? 'bg-indigo-200 text-indigo-900'
                          : 'bg-rose-200 text-rose-900'
                      }`}
                    >
                      {item.status === 'high_performer'
                        ? '🔥 Top Lider'
                        : item.status === 'growing'
                        ? 'O\'smoqda'
                        : 'Diqqat Talab'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                      <div className="text-[10px] text-slate-500 font-bold uppercase">O'quv O'zlashtirish</div>
                      <div className="text-xl font-black text-slate-900 mt-0.5">
                        {item.trainingCompletionRate}%
                      </div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                      <div className="text-[10px] text-slate-500 font-bold uppercase">Savdo O'sishi (Kassa)</div>
                      <div className="text-xl font-black text-emerald-600 mt-0.5">
                        +{item.salesRevenueGrowthPercent}%
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-200/60">
                    <span>Mijoz Bahosi (CSI): <strong>⭐ {item.customerSatisfactionScore}</strong></span>
                    <span className="text-emerald-700 font-bold">-{item.complaintsReducedPercent}% shikoyat</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: FILIALLAR CHEMPIONATI & LIGASI */}
      {/* ========================================================================= */}
      {activeViewTab === 'competitions' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {storeCompetitions.map((comp) => (
              <div
                key={comp.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 bg-slate-900 relative">
                    <img
                      src={comp.bannerImage}
                      alt={comp.title}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-amber-500 text-slate-950 text-xs font-black rounded-lg uppercase">
                        {comp.category}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="text-base font-black leading-snug">{comp.title}</h3>
                      <div className="text-xs text-amber-300 font-bold mt-1">
                        🏆 Mukofot jamg'armasi: {comp.prizePool} + {comp.bonusCoins} Tanga
                      </div>
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    <p className="text-xs text-slate-600 leading-relaxed">{comp.description}</p>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                      🎯 <strong>Baholash Mezoni:</strong> {comp.targetMetric}
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-black text-slate-900 flex items-center justify-between">
                        <span>Peshqadam Filiallar Standings:</span>
                        <span className="text-[11px] text-slate-500">Muddati: {comp.endDate} gacha</span>
                      </div>

                      <div className="space-y-2">
                        {comp.topBranches.map((tb) => (
                          <div
                            key={tb.storeId}
                            className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100"
                          >
                            <div className="flex items-center gap-3">
                              <span className="font-black text-sm">{tb.badge}</span>
                              <div>
                                <div className="text-xs font-extrabold text-slate-900">{tb.storeName}</div>
                                <div className="text-[10px] text-slate-500">
                                  Tushum: {(tb.salesVolumeUzs / 1000000).toFixed(0)} mln so'm
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-black text-emerald-600">{tb.score} Ball</div>
                              <div className="text-[10px] text-slate-400 font-medium">O'quv indeksi</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Holati: 🟢 Jonli Musobaqa</span>
                  <button
                    onClick={() => showToast("Musobaqa reglamenti va batafsil statistikasi yuklandi!")}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow transition-all"
                  >
                    Batafsil Jadval
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: XODIMLAR KESIMIDAGI TAHLIL */}
      {/* ========================================================================= */}
      {activeViewTab === 'individual' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  Filial Bo'yicha Xodimlar Kompetensiya Profili
                </h3>
                <p className="text-xs text-slate-500">
                  Do'konni tanlab, undagi barcha xodimlarning test ballari va rivojlanish darajasini ko'ring.
                </p>
              </div>

              <select
                value={selectedBranchForIndividual}
                onChange={(e) => setSelectedBranchForIndividual(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-extrabold text-slate-900"
              >
                {skillHeatmaps.map((b) => (
                  <option key={b.storeId} value={b.storeId}>
                    {b.storeName} ({b.city})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {users
                .filter((u) => u.storeId === selectedBranchForIndividual)
                .concat(
                  users.length < 3
                    ? [
                        {
                          id: 'mock_u2',
                          name: 'Bekzod Karimov',
                          position: 'Kichik Sotuvchi',
                          points: 1200,
                          streakDays: 4,
                          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
                          role: 'employee',
                          department: 'Savdo',
                          storeId: selectedBranchForIndividual,
                          storeName: 'Tanlangan Filial',
                          email: 'bekzod@hamkor.uz',
                          phone: '+998 90 987 65 43',
                          bio: 'Yangi boshlovchi',
                          completedCourseIds: ['c_retail_1'],
                          badges: [],
                          joinedDate: '2026-06-01',
                        },
                      ]
                    : []
                )
                .map((emp) => (
                  <div
                    key={emp.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={emp.avatar}
                        alt={emp.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-indigo-200"
                      />
                      <div>
                        <div className="font-extrabold text-sm text-slate-900">{emp.name}</div>
                        <div className="text-xs text-slate-500">{emp.position}</div>
                        <div className="text-[11px] text-amber-600 font-bold mt-0.5">
                          ⭐ {emp.points} Tanga | {emp.streakDays} kun streak
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs pt-2 border-t border-slate-200">
                      <div>
                        <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                          <span>Texnika Bilimi</span>
                          <span>88%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full w-[88%]" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                          <span>Savdo & Muzokara</span>
                          <span>76%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full rounded-full w-[76%]" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                          <span>Kassa Standarti</span>
                          <span>92%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full w-[92%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
