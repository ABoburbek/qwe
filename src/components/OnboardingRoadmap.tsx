import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Calendar,
  CheckCircle2,
  Clock,
  UserCheck,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Check,
  FileCheck,
  AlertCircle,
  ExternalLink,
  PlusCircle,
  Edit,
  Trash2,
  X,
} from 'lucide-react';
import { OnboardingDayPlan, OnboardingTask } from '../types';

interface OnboardingRoadmapProps {
  onNavigateTab?: (tabName: string) => void;
}

export const OnboardingRoadmap: React.FC<OnboardingRoadmapProps> = ({ onNavigateTab }) => {
  const {
    currentUser,
    onboardingDays,
    toggleOnboardingTask,
    signOnboardingDay,
    addOnboardingDay,
    updateOnboardingDay,
    deleteOnboardingDay,
  } = useApp();

  const isManagerOrAdmin = ['admin', 'trainer', 'director', 'store_manager'].includes(currentUser.role);

  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(onboardingDays[0]?.dayNumber || 1);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingDay, setEditingDay] = useState<OnboardingDayPlan | null>(null);
  const [formDayNum, setFormDayNum] = useState(1);
  const [formTitle, setFormTitle] = useState('');
  const [formStage, setFormStage] = useState<'madaniyat' | 'texnika' | 'savdo_mijoz' | 'imtihon'>('madaniyat');
  const [formDesc, setFormDesc] = useState('');
  const [formTask1, setFormTask1] = useState('');
  const [formTask2, setFormTask2] = useState('');

  const openModal = (d?: OnboardingDayPlan) => {
    if (d) {
      setEditingDay(d);
      setFormDayNum(d.dayNumber);
      setFormTitle(d.title);
      setFormStage(d.stage);
      setFormDesc(d.description);
      setFormTask1(d.tasks[0]?.title || '');
      setFormTask2(d.tasks[1]?.title || '');
    } else {
      setEditingDay(null);
      const nextNum = onboardingDays.length > 0 ? Math.max(...onboardingDays.map((x) => x.dayNumber)) + 1 : 1;
      setFormDayNum(nextNum);
      setFormTitle(`${nextNum}-Kun: Stajirovka Standartlari`);
      setFormStage('madaniyat');
      setFormDesc("Do'kon ichki tartib-qoidalari va amaliyot.");
      setFormTask1("Xodim ichki qoidalari bilan tanishish");
      setFormTask2("Murabbiy bilan amaliy suhbat");
    }
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const tasks: OnboardingTask[] = [
      {
        id: `tsk_${Date.now()}_1`,
        title: formTask1 || "Amaliy topshiriqni bajarish",
        description: "Murabbiy nazorati ostida amaliy mashg'ulot.",
        durationMinutes: 30,
        isDone: false,
        requiredType: 'practice',
      },
    ];
    if (formTask2.trim()) {
      tasks.push({
        id: `tsk_${Date.now()}_2`,
        title: formTask2,
        description: "O'zlashtirilgan bilimlarni tekshirish.",
        durationMinutes: 20,
        isDone: false,
        requiredType: 'mentor_check',
      });
    }

    if (editingDay) {
      updateOnboardingDay(editingDay.dayNumber, {
        title: formTitle,
        stage: formStage,
        description: formDesc,
      });
    } else {
      addOnboardingDay({
        dayNumber: formDayNum,
        title: formTitle,
        stage: formStage,
        description: formDesc,
        tasks,
        mentorSigned: false,
      });
      setSelectedDayNumber(formDayNum);
    }
    setShowModal(false);
  };

  const selectedDay = onboardingDays.find((d) => d.dayNumber === selectedDayNumber) || onboardingDays[0];

  const totalTasks = onboardingDays.reduce((acc, d) => acc + d.tasks.length, 0);
  const completedTasks = onboardingDays.reduce(
    (acc, d) => acc + d.tasks.filter((t) => t.isDone).length,
    0
  );
  const progressPercent = Math.round((completedTasks / (totalTasks || 1)) * 100);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold mb-2">
            <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
            <span>Yangi Xodim va Stajyor Dasturi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            14-Kunlik Onboarding & Adaptatsiya Yo'l Xaritasi
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Do'konga yangi kelgan xodimlarning dastlabki 14 kunlik tizimli o'quv dasturi. Har bir kun amaliy vazifalar, murabbiy nazorati va rasmiy sertifikatlash bilan yakunlanadi.
          </p>
        </div>

        {/* Total Progress Badge */}
        <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 shrink-0 text-right min-w-[200px]">
          <div className="flex justify-between items-center text-xs text-slate-400 font-bold mb-1">
            <span>Stajirovka Jarayoni:</span>
            <span className="text-emerald-400">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-400 mt-1.5">
            {completedTasks} / {totalTasks} ta vazifa bajarildi
          </div>
        </div>
      </div>

      {/* Main Content: Days Selector & Active Day Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Days List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <span>O'quv Kunlari Rejasi</span>
              </h2>

              {isManagerOrAdmin && (
                <button
                  onClick={() => openModal()}
                  className="px-2 py-1 bg-teal-50 hover:bg-teal-100 text-teal-700 text-[11px] font-bold rounded-lg border border-teal-200 flex items-center gap-1 transition-colors"
                >
                  <PlusCircle className="w-3 h-3" />
                  <span>+ Kun</span>
                </button>
              )}
            </div>

            <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
              {onboardingDays.map((day) => {
                const isSelected = selectedDayNumber === day.dayNumber;
                const dayDoneCount = day.tasks.filter((t) => t.isDone).length;
                const isAllDone = dayDoneCount === day.tasks.length && day.tasks.length > 0;

                return (
                  <div
                    key={day.dayNumber}
                    className={`group relative w-full p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50/80 border-indigo-500 ring-2 ring-indigo-500/20 shadow-sm'
                        : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100/80'
                    }`}
                    onClick={() => setSelectedDayNumber(day.dayNumber)}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg font-black text-xs flex items-center justify-center shrink-0 ${
                        isAllDone
                          ? 'bg-emerald-500 text-white'
                          : isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {isAllDone ? '✓' : `${day.dayNumber}`}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-bold text-xs text-slate-900 truncate">
                          {day.title}
                        </h4>

                        {isManagerOrAdmin && (
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => openModal(day)}
                              className="p-1 text-slate-400 hover:text-teal-600 rounded"
                            >
                              <Edit className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`${day.dayNumber}-kunni o'chirishni tasdiqlaysizmi?`)) {
                                  deleteOnboardingDay(day.dayNumber);
                                }
                              }}
                              className="p-1 text-slate-400 hover:text-rose-600 rounded"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500">
                        <span>
                          {dayDoneCount}/{day.tasks.length} vazifa
                        </span>
                        <span>•</span>
                        <span className={day.mentorSigned ? 'text-emerald-600 font-bold' : 'text-amber-600 font-medium'}>
                          {day.mentorSigned ? "Murabbiy tasdiqlagan" : "Tasdiq kutilmoqda"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Selected Day Tasks */}
        <div className="lg:col-span-8 space-y-4">
          {selectedDay && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
              {/* Day Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-extrabold uppercase">
                      Bosqich: {selectedDay.stage}
                    </span>
                    {selectedDay.mentorSigned && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        Murabbiy Imzosi Mavjud
                      </span>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                    {selectedDay.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedDay.description}</p>
                </div>

                {!selectedDay.mentorSigned && (
                  <button
                    onClick={() => signOnboardingDay(selectedDay.dayNumber)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 shrink-0 transition-colors"
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>Murabbiy Tasdig'i (+50 tanga)</span>
                  </button>
                )}
              </div>

              {/* Tasks List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Kunlik Bajarilishi Shart Bo'lgan Vazifalar:
                </h4>

                <div className="space-y-3">
                  {selectedDay.tasks.map((task) => (
                    <div
                      key={task.id}
                      className={`p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                        task.isDone
                          ? 'bg-emerald-50/40 border-emerald-200'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <button
                        onClick={() => toggleOnboardingTask(selectedDay.dayNumber, task.id)}
                        className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          task.isDone
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-slate-300 bg-white hover:border-indigo-600'
                        }`}
                      >
                        {task.isDone && <Check className="w-4 h-4" />}
                      </button>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h5
                            className={`font-bold text-xs sm:text-sm ${
                              task.isDone ? 'line-through text-slate-400' : 'text-slate-900'
                            }`}
                          >
                            {task.title}
                          </h5>
                          <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {task.durationMinutes} daqiqa
                          </span>
                        </div>

                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          {task.description}
                        </p>

                        {task.linkedTab && onNavigateTab && (
                          <button
                            onClick={() => onNavigateTab(task.linkedTab!)}
                            className="mt-2.5 inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-white px-2.5 py-1 rounded-md border border-indigo-100 hover:border-indigo-300 transition-colors"
                          >
                            <span>Kerakli bo'limga o'tish</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* End of Day Summary info */}
              <div className="p-4 bg-indigo-50/60 rounded-xl border border-indigo-100 text-xs text-indigo-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-indigo-950">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>Stajyorga Eslatma:</span>
                </div>
                <p className="leading-relaxed">
                  Kun yakunida barcha topshiriqlarni bajargach, do'koningizga biriktirilgan murabbiy yoki katta sotuvchiga amaliy ko'nikmalarni topshiring.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Onboarding Day */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-teal-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {editingDay ? `${editingDay.dayNumber}-Kun Rejasini Tahrirlash` : "Yangi Onboarding Kuni"}
                </h3>
              </div>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kun Tartib Raqami</label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={30}
                    value={formDayNum}
                    disabled={editingDay !== null}
                    onChange={(e) => setFormDayNum(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-teal-500 disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Bosqich (Stage)</label>
                  <select
                    value={formStage}
                    onChange={(e) => setFormStage(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="madaniyat">Madaniyat & Qoidalar</option>
                    <option value="texnika">Texnika & Mahsulot</option>
                    <option value="savdo_mijoz">Savdo & Mijoz Psixologiyasi</option>
                    <option value="imtihon">Imtihon & Himoya</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kun Sarlavhasi</label>
                <input
                  type="text"
                  required
                  placeholder="1-Kun: Do'kon Tartib-Qoidalari"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kun Tavsifi</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Kunning asosiy maqsadi va vazifalari..."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <label className="block text-[11px] font-bold text-slate-700">Kunlik Birlamchi Vazifalar (Checklist):</label>
                <input
                  type="text"
                  placeholder="1-Vazifa: Ichki qoidalar bilan tanishish"
                  value={formTask1}
                  onChange={(e) => setFormTask1(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
                />
                <input
                  type="text"
                  placeholder="2-Vazifa: Murabbiy bilan suhbatdan o'tish"
                  value={formTask2}
                  onChange={(e) => setFormTask2(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
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
                  className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md"
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
