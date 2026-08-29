import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Camera,
  Store,
  Sparkles,
  Award,
  Calendar,
  Save,
  Check,
  Building,
  CheckSquare,
  BarChart2,
  FileSpreadsheet,
} from 'lucide-react';

export const StoreAuditChecklist: React.FC = () => {
  const { auditCriteria, stores } = useApp();
  const [selectedStore, setSelectedStore] = useState<string>((stores && stores[0]?.name) || "Toshkent Chilonzor Filiali (#01)");
  const [scores, setScores] = useState<{ [id: string]: number }>(() => {
    const initial: { [id: string]: number } = {};
    (auditCriteria || []).forEach((c) => {
      initial[c.id] = c.weight;
    });
    return initial;
  });
  const [notes, setNotes] = useState<{ [id: string]: string }>({
    audit_4: "Muzlatgichlar bo'limidagi 2 ta stend oynasida biroz barmoq izlari bor, tozalash topshirildi.",
  });
  const [uploadedPhotos, setUploadedPhotos] = useState<{ [id: string]: string }>({
    audit_3: "Vitrina_TV_Demo.png",
  });

  const [isSaved, setIsSaved] = useState(false);

  const totalPossible = (auditCriteria || []).reduce((acc, curr) => acc + curr.weight, 0);
  const currentTotal = (auditCriteria || []).reduce((acc, curr) => acc + (scores[curr.id] || 0), 0);
  const compliancePercentage = totalPossible > 0 ? Math.round((currentTotal / totalPossible) * 100) : 100;

  const handleScoreChange = (id: string, newScore: number) => {
    setScores((prev) => ({ ...prev, [id]: newScore }));
  };

  const handleNoteChange = (id: string, text: string) => {
    setNotes((prev) => ({ ...prev, [id]: text }));
  };

  const handleSaveAudit = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const getComplianceGrade = (pct: number) => {
    if (pct >= 90) return { label: "A+ Oliy Standart (Mukammal)", color: "text-emerald-400 bg-emerald-500/20 border-emerald-500/30" };
    if (pct >= 75) return { label: "B Yaxshi (Kichik kamchiliklar bor)", color: "text-amber-300 bg-amber-500/20 border-amber-500/30" };
    return { label: "C Qoniqarsiz (Tuzatish Talab Etiladi)", color: "text-rose-400 bg-rose-500/20 border-rose-500/30" };
  };

  const grade = getComplianceGrade(compliancePercentage);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold mb-2">
            <ClipboardCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Do'kon Raxbari va Inspector Paneli</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Do'kon Standartlari & Visual Merchandising Auditi
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Filialning tozaligi, tsenniklar to'g'riligi, demo TVlar ishchi holati va xodimlar intizomini haftalik auditdan o'tkazing va rasm bilan tasdiqlang.
          </p>
        </div>

        {/* Score Badge */}
        <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 text-center shrink-0 min-w-[200px]">
          <div className="text-[11px] text-slate-400 font-bold uppercase">Audit Muvofiqlik Ko'rsatkichi</div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono mt-0.5">
            {compliancePercentage}%
          </div>
          <div className={`mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${grade.color}`}>
            {grade.label}
          </div>
        </div>
      </div>

      {/* Select Store & Date Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Store className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="w-full sm:w-80">
            <label className="text-[10px] font-bold text-slate-400 uppercase">Filialni Tanlang:</label>
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 mt-0.5"
            >
              <option>Toshkent Chilonzor Filiali (#01)</option>
              <option>Toshkent Yunusobod Filiali (#02)</option>
              <option>Samarqand Markaziy Filial (#03)</option>
              <option>Farg'ona Vodiy Filiali (#04)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span>Audit Sanasi: {new Date().toLocaleDateString('uz-UZ')}</span>
        </div>
      </div>

      {/* Audit Checklist Items */}
      <div className="space-y-4">
        {(auditCriteria || []).map((item, idx) => {
          const currentScore = scores[item.id] || 0;
          const _isPassed = currentScore === item.weight;

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-4 hover:border-emerald-300 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider">
                    {idx + 1}-Mezon • {item.category}
                  </span>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 mt-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                </div>

                {/* Score Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-slate-500">Baho:</span>
                  <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                    <button
                      onClick={() => handleScoreChange(item.id, 0)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        currentScore === 0
                          ? 'bg-rose-600 text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      0 (Bajarilmadi)
                    </button>
                    <button
                      onClick={() => handleScoreChange(item.id, Math.round(item.weight / 2))}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        currentScore > 0 && currentScore < item.weight
                          ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {Math.round(item.weight / 2)} (Qisman)
                    </button>
                    <button
                      onClick={() => handleScoreChange(item.id, item.weight)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        currentScore === item.weight
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {item.weight} (A'lo)
                    </button>
                  </div>
                </div>
              </div>

              {/* Photo & Notes section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 mb-1 block">
                    Izoh va Qaydlar (Kamchilik yoki tavsiya):
                  </label>
                  <input
                    type="text"
                    placeholder="Izoh qoldiring..."
                    value={notes[item.id] || ''}
                    onChange={(e) => handleNoteChange(item.id, e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 mb-1 block">
                    Rasm / Isbot Biriktirish:
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const samplePhotos = ['Vitrina_Rasmi_01.png', 'Tsenniklar_Foto.jpg', 'Kassa_Holati.png'];
                        const picked = samplePhotos[Math.floor(Math.random() * samplePhotos.length)];
                        setUploadedPhotos((prev) => ({ ...prev, [item.id]: picked }));
                      }}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 border border-slate-200"
                    >
                      <Camera className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{uploadedPhotos[item.id] ? uploadedPhotos[item.id] : "Rasm biriktirish"}</span>
                    </button>

                    {uploadedPhotos[item.id] && (
                      <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        Yuklandi
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Save Button Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-md flex items-center justify-between">
        <div className="text-xs text-slate-600">
          Jami To'plangan Ball: <strong className="text-slate-900 font-extrabold">{currentTotal} / {totalPossible}</strong> ({compliancePercentage}%)
        </div>

        <button
          onClick={handleSaveAudit}
          className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-900/20 flex items-center gap-2 transition-all"
        >
          {isSaved ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Save className="w-4 h-4" />}
          <span>{isSaved ? "Audit Hisoboti Saqlandi!" : "Audit Hisobotini Saqlash va Yuborish"}</span>
        </button>
      </div>
    </div>
  );
};
