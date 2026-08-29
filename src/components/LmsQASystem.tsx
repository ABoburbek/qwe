import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  HelpCircle,
  MessageSquare,
  ThumbsUp,
  Search,
  PlusCircle,
  CheckCircle2,
  Trash2,
  ShieldCheck,
  Send,
  BookOpen,
  X,
  Filter,
} from 'lucide-react';

export const LmsQASystem: React.FC = () => {
  const {
    qaQuestions,
    addQAQuestion,
    addQAAnswer,
    toggleQALike,
    markAnswerOfficial,
    deleteQAQuestion,
    deleteQAAnswer,
    courses,
    currentUser,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('all');
  const [showAskModal, setShowAskModal] = useState(false);

  // New Question Form
  const [qCourseId, setQCourseId] = useState(courses[0]?.id || 'crs_1');
  const [qTitle, setQTitle] = useState('');
  const [qContent, setQContent] = useState('');

  // Active answer text for each question ID
  const [answerInputs, setAnswerInputs] = useState<Record<string, string>>({});

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qTitle.trim() || !qContent.trim()) return;

    const selectedCourse = courses.find((c) => c.id === qCourseId);
    addQAQuestion({
      courseId: qCourseId,
      courseTitle: selectedCourse ? selectedCourse.title : 'Umumiy LMS',
      title: qTitle.trim(),
      content: qContent.trim(),
    });

    setQTitle('');
    setQContent('');
    setShowAskModal(false);
  };

  const handleSendAnswer = (questionId: string) => {
    const text = answerInputs[questionId];
    if (!text || !text.trim()) return;

    const isOfficial = currentUser.role === 'trainer' || currentUser.role === 'admin';
    addQAAnswer(questionId, text.trim(), isOfficial);

    setAnswerInputs((prev) => ({ ...prev, [questionId]: '' }));
  };

  const filteredQuestions = qaQuestions.filter((q) => {
    const matchesCourse = selectedCourseId === 'all' || q.courseId === selectedCourseId;
    const matchesSearch =
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.userName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCourse && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
            <HelpCircle className="w-4 h-4 text-indigo-400" />
            <span>LMS Savol-Javob va Muhokamalar</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Interaktiv Bilimlar Savol-Javob Bazasiga Xush Kelibsiz!
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            O'quv kurslari bo'yicha paydo bo'lgan tushunmovchiliklar, texnik savollar va amaliy vazifalar bo'yicha savol bering hamda malakali trenerlar va tajribali hamkasblardan rasmiy javoblar oling.
          </p>
        </div>

        <button
          onClick={() => setShowAskModal(true)}
          className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all shrink-0 hover:scale-105"
        >
          <PlusCircle className="w-5 h-5 text-indigo-200" />
          <span>Yangi Savol Berish</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Savollar yoki kurslardan izlash..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Course Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 max-w-xs"
          >
            <option value="all">Barcha Kurslar ({qaQuestions.length})</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 space-y-3">
            <HelpCircle className="w-12 h-12 text-indigo-300 mx-auto" />
            <h3 className="font-bold text-slate-800 text-base">Hozircha savollar topilmadi</h3>
            <p className="text-xs text-slate-500">
              Ushbu filtr bo'yicha savollar mavjud emas. Birinchi bo'lib o'z savolingizni yo'llashingiz mumkin!
            </p>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isLiked = q.likedBy.includes(currentUser.id);
            const canDeleteQuestion =
              currentUser.id === q.userId ||
              currentUser.role === 'admin' ||
              currentUser.role === 'trainer';

            return (
              <div
                key={q.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-5 hover:shadow-md transition-all"
              >
                {/* Question Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <img
                      src={q.userAvatar}
                      alt={q.userName}
                      className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-100 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xs text-slate-900">{q.userName}</span>
                        <span className="text-[10px] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md font-semibold border border-indigo-100">
                          {q.userRole}
                        </span>
                        <span className="text-[10px] text-slate-400">• {q.date}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Kurs: {q.courseTitle}</span>
                      </div>
                    </div>
                  </div>

                  {canDeleteQuestion && (
                    <button
                      onClick={() => {
                        if (confirm("Ushbu savolni va barcha javoblarni o'chirib tashlamoqchimisiz?")) {
                          deleteQAQuestion(q.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Savolni o'chirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Question Body */}
                <div className="space-y-2">
                  <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                    {q.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
                    {q.content}
                  </p>
                </div>

                {/* Action Bar (Like & Answer Count) */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <button
                    onClick={() => toggleQALike(q.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
                      isLiked
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-white' : ''}`} />
                    <span>{q.likes} ta foydali</span>
                  </button>

                  <div className="flex items-center gap-1 text-slate-500 font-bold">
                    <MessageSquare className="w-4 h-4 text-indigo-600" />
                    <span>{q.answers.length} ta javob</span>
                  </div>
                </div>

                {/* Answers Section */}
                <div className="space-y-3 pt-3 border-t border-slate-100 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                  <h4 className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Mavjud Javoblar:</span>
                  </h4>

                  {q.answers.length === 0 ? (
                    <p className="text-xs text-slate-400 italic py-2">
                      Hozircha javoblar yo'q. Birinchi bo'lib maslahat bering!
                    </p>
                  ) : (
                    q.answers.map((ans) => {
                      const canDeleteAnswer =
                        currentUser.id === ans.userId ||
                        currentUser.role === 'admin' ||
                        currentUser.role === 'trainer';

                      return (
                        <div
                          key={ans.id}
                          className={`p-3.5 rounded-2xl border text-xs space-y-2 ${
                            ans.isOfficialSolution
                              ? 'bg-emerald-50/80 border-emerald-300'
                              : 'bg-white border-slate-200'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <img
                                src={ans.userAvatar}
                                alt={ans.userName}
                                className="w-7 h-7 rounded-lg object-cover"
                              />
                              <div>
                                <span className="font-bold text-slate-900">{ans.userName}</span>
                                <span className="text-[10px] text-slate-500 ml-2">
                                  ({ans.userRole}) • {ans.date}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {ans.isOfficialSolution && (
                                <span className="flex items-center gap-1 text-[10px] font-extrabold bg-emerald-600 text-white px-2.5 py-0.5 rounded-full shadow-sm">
                                  <ShieldCheck className="w-3 h-3" />
                                  <span>Rasmiy Yechim</span>
                                </span>
                              )}

                              {!ans.isOfficialSolution &&
                                (currentUser.role === 'trainer' || currentUser.role === 'admin') && (
                                  <button
                                    onClick={() => markAnswerOfficial(q.id, ans.id)}
                                    className="text-[10px] font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-2 py-0.5 rounded-lg transition-colors"
                                  >
                                    Rasmiy deb belgilash
                                  </button>
                                )}

                              {canDeleteAnswer && (
                                <button
                                  onClick={() => deleteQAAnswer(q.id, ans.id)}
                                  className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>

                          <p className="text-slate-700 leading-relaxed pl-1">{ans.text}</p>
                        </div>
                      );
                    })
                  )}

                  {/* Post Answer Form */}
                  <div className="flex gap-2 pt-2">
                    <input
                      type="text"
                      placeholder="Javobingizni yoki maslahatingizni yozing..."
                      value={answerInputs[q.id] || ''}
                      onChange={(e) =>
                        setAnswerInputs((prev) => ({ ...prev, [q.id]: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSendAnswer(q.id);
                      }}
                      className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      onClick={() => handleSendAnswer(q.id)}
                      disabled={!answerInputs[q.id]?.trim()}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1 shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Javob Berish</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Ask Question Modal */}
      {showAskModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  LMS Trenerlariga Savol Yo'llash
                </h3>
              </div>
              <button
                onClick={() => setShowAskModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xs p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAskSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Qaysi Kurs Bo'yicha?
                </label>
                <select
                  value={qCourseId}
                  onChange={(e) => setQCourseId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-bold"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Savol Sarlavhasi (Qisqa xulosa)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Qaytarilgan mahsulotni tizimga qanday kiritish kerak?"
                  value={qTitle}
                  onChange={(e) => setQTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Batafsil Savol va Holat
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Savolingiz va duch kelgan holatni batafsil yoritib bering..."
                  value={qContent}
                  onChange={(e) => setQContent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAskModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200"
                >
                  Bekor Qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Savolni E'lon Qilish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
