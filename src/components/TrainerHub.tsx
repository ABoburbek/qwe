import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Course,
  CourseModule,
  PresentationSlide,
  QuizQuestion,
} from '../types';
import { CourseEditorModal } from './CourseEditorModal';
import { ISpringPackageImporterModal } from './ISpringPackageImporterModal';
import {
  GraduationCap,
  PlusCircle,
  FileText,
  Video,
  HelpCircle,
  Upload,
  CheckCircle2,
  Trash2,
  Edit,
  Sparkles,
  BookOpen,
  FileCode2,
} from 'lucide-react';

export const TrainerHub: React.FC = () => {
  const { addCourse, updateCourse, deleteCourse, courses, currentUser } = useApp();
  const [showEditorModal, setShowEditorModal] = useState(false);
  const [showImporterModal, setShowImporterModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Mijozlarga Xizmat');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState(
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80'
  );
  const [durationHours, setDurationHours] = useState(1.5);
  const [level,_setLevel] = useState<"Boshlang'ich" | "O'rta" | "Yuqori">(
    "Boshlang'ich"
  );
  const [passScore, setPassScore] = useState(80);

  // Dynamic Modules being authored
  const [slides, setSlides] = useState<PresentationSlide[]>([
    {
      id: 'sld_new_1',
      slideNumber: 1,
      title: '1-Slayd: Kirish va Maqsad',
      content: 'Mijozlarimizga oliy darajadagi xizmat standartini taqdim etish.',
      bulletPoints: ['Professional salomlashish', 'Xushmuomalalik va tabassum'],
      imageUrl:
        'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&auto=format&fit=crop&q=80',
      speakerNotes: "Ushbu slaydni o'tayotganda xodimlarga e'tiborli bo'lishni eslatib o'ting.",
    },
  ]);

  const [videoUrl, setVideoUrl] = useState('https://www.w3schools.com/html/mov_bbb.mp4');

  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([
    {
      id: 'q_new_1',
      question: "Xaridor do'konga kirganida birinchi qilinadigan harakat nima?",
      options: [
        'Iliq tabassum bilan salomlashish',
        "Mijoz o'zi kelishini kutish",
        'Ish joyidan uzoqlashish',
        'Narxlarni tekshirish',
      ],
      correctAnswerIndex: 0,
      explanation: 'Birinchi 3 soniya mijozda samimiy taassurot qoldiradi.',
      points: 25,
    },
  ]);

  const handleAddSlide = () => {
    const nextSlideNum = slides.length + 1;
    setSlides([
      ...slides,
      {
        id: `sld_new_${Date.now()}`,
        slideNumber: nextSlideNum,
        title: `${nextSlideNum}-Slayd: Sarlavha`,
        content: "Slayd bo'yicha asosiy nazariy ma'lumotlarni yozing...",
        bulletPoints: ['Asosiy qoida 1', 'Asosiy qoida 2'],
        imageUrl:
          'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
        speakerNotes: "O'quv bo'limi metodist izohi",
      },
    ]);
  };

  const handleAddQuestion = () => {
    setQuizQuestions([
      ...quizQuestions,
      {
        id: `q_new_${Date.now()}`,
        question: 'Yangi savolni kiriting...',
        options: ['Variant A', 'Variant B', 'Variant C', 'Variant D'],
        correctAnswerIndex: 0,
        explanation: "To'g'ri me'yoriy tushuntirish",
        points: 25,
      },
    ]);
  };

  const handlePublishCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    const modules: CourseModule[] = [];

    // Module 1: Presentation
    if (slides.length > 0) {
      modules.push({
        id: `mod_${Date.now()}_1`,
        title: '1-Qism: iSpring Prezentatsiya va Slaydlar',
        type: 'presentation',
        durationMinutes: 20,
        slides,
      });
    }

    // Module 2: Video
    if (videoUrl) {
      modules.push({
        id: `mod_${Date.now()}_2`,
        title: '2-Qism: Amaliy Video Darslik',
        type: 'video',
        durationMinutes: 15,
        videoUrl,
      });
    }

    // Module 3: Quiz
    if (quizQuestions.length > 0) {
      modules.push({
        id: `mod_${Date.now()}_3`,
        title: '3-Qism: Interaktiv Imtihon Testi',
        type: 'quiz',
        durationMinutes: 15,
        questions: quizQuestions,
      });
    }

    const newCourse: Course = {
      id: `crs_${Date.now()}`,
      title,
      category,
      description,
      coverImage,
      author: `${currentUser.name} (L&D Metodist)`,
      durationHours,
      level,
      passScorePercentage: passScore,
      assignedStores: ['all'],
      createdDate: new Date().toISOString().split('T')[0],
      modules,
    };

    addCourse(newCourse);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
              L&D O'quv Bo'limi Boshqaruvi
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            iSpring Interaktiv Prezentatsiya, Video va SCORM Mualliflik Paneli
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Prezentatsiyalarni PowerPoint slayd formatida yuklang, iSpring SCORM ZIP paketlarini import qiling va interaktiv rollar o'yinlarini yarating.
          </p>
        </div>

        <button
          onClick={() => setShowImporterModal(true)}
          className="px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-indigo-900/30 flex items-center gap-2 transition-all shrink-0 border border-indigo-500/30"
        >
          <FileCode2 className="w-4 h-4 text-amber-300" />
          <span>iSpring / SCORM Import Qilish</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course Authoring Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Yangi O'quv Kursini Yaratish va Nashr Qilish</span>
          </h2>

          <form onSubmit={handlePublishCourse} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kurs Nomi
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Kassa va POS Terminal Standartlari"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kategoriya
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900"
                >
                  <option value="Mijozlarga Xizmat">Mijozlarga Xizmat</option>
                  <option value="Moliya va Kassa">Moliya va Kassa</option>
                  <option value="Mahsulot Bilimi">Mahsulot Bilimi</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kurs Tavsifi
              </label>
              <textarea
                rows={2}
                required
                placeholder="Xodim ushbu kursdan keyin qanday ko'nikmalarga ega bo'ladi..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Muqova Rasmi URL
                </label>
                <input
                  type="text"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  O'quv Soati
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={durationHours}
                  onChange={(e) => setDurationHours(parseFloat(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Sertifikat Bali (%)
                </label>
                <input
                  type="number"
                  value={passScore}
                  onChange={(e) => setPassScore(parseInt(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900"
                />
              </div>
            </div>

            {/* SECTION 1: SLIDES BUILDER */}
            <div className="pt-4 border-t border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <h3 className="font-bold text-sm text-slate-900">
                    1. iSpring Prezentatsiya Slaydlari ({slides.length} slayd)
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={handleAddSlide}
                  className="px-3 py-1.5 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-lg border border-emerald-200 hover:bg-emerald-100 flex items-center gap-1"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Slayd Qo'shish</span>
                </button>
              </div>

              <div className="space-y-4">
                {slides.map((sld, idx) => (
                  <div
                    key={sld.id}
                    className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-700">
                        Slayd #{idx + 1}
                      </span>
                      {slides.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            setSlides(slides.filter((s) => s.id !== sld.id))
                          }
                          className="text-rose-600 hover:text-rose-800 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Slayd sarlavhasi"
                        value={sld.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSlides(
                            slides.map((s) =>
                              s.id === sld.id ? { ...s, title: val } : s
                            )
                          );
                        }}
                        className="bg-white border border-slate-200 rounded-lg p-2 text-xs font-bold"
                      />

                      <input
                        type="text"
                        placeholder="Rasm URL"
                        value={sld.imageUrl || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSlides(
                            slides.map((s) =>
                              s.id === sld.id ? { ...s, imageUrl: val } : s
                            )
                          );
                        }}
                        className="bg-white border border-slate-200 rounded-lg p-2 text-xs"
                      />
                    </div>

                    <textarea
                      rows={2}
                      placeholder="Slayd matni va asosiy tushunchalar..."
                      value={sld.content}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSlides(
                          slides.map((s) =>
                            s.id === sld.id ? { ...s, content: val } : s
                          )
                        );
                      }}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 2: VIDEO URL */}
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-sm text-slate-900">
                  2. Amaliy Video Darslik Havolasi
                </h3>
              </div>
              <input
                type="text"
                placeholder="Video MP4 yoki YouTube URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900"
              />
            </div>

            {/* SECTION 3: QUIZ AUTHORING */}
            <div className="pt-4 border-t border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  <h3 className="font-bold text-sm text-slate-900">
                    3. Interaktiv Imtihon Savollari ({quizQuestions.length} savol)
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className="px-3 py-1.5 bg-amber-50 text-amber-800 font-bold text-xs rounded-lg border border-amber-200 hover:bg-amber-100 flex items-center gap-1"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Savol Qo'shish</span>
                </button>
              </div>

              <div className="space-y-4">
                {quizQuestions.map((q, qIdx) => (
                  <div
                    key={q.id}
                    className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-800">
                        Savol #{qIdx + 1}
                      </span>
                      {quizQuestions.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            setQuizQuestions(
                              quizQuestions.filter((item) => item.id !== q.id)
                            )
                          }
                          className="text-rose-600 hover:text-rose-800 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      placeholder="Savol matnini kiriting..."
                      value={q.question}
                      onChange={(e) => {
                        const val = e.target.value;
                        setQuizQuestions(
                          quizQuestions.map((item) =>
                            item.id === q.id ? { ...item, question: val } : item
                          )
                        );
                      }}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-bold"
                    />

                    {/* Options list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => (
                        <div
                          key={optIdx}
                          className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200"
                        >
                          <input
                            type="radio"
                            name={`correct_${q.id}`}
                            checked={q.correctAnswerIndex === optIdx}
                            onChange={() => {
                              setQuizQuestions(
                                quizQuestions.map((item) =>
                                  item.id === q.id
                                    ? { ...item, correctAnswerIndex: optIdx }
                                    : item
                                )
                              );
                            }}
                          />
                          <input
                            type="text"
                            value={opt}
                            onChange={(e) => {
                              const val = e.target.value;
                              const newOpts = [...q.options];
                              newOpts[optIdx] = val;
                              setQuizQuestions(
                                quizQuestions.map((item) =>
                                  item.id === q.id
                                    ? { ...item, options: newOpts }
                                    : item
                                )
                              );
                            }}
                            className="w-full text-xs border-none focus:outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PUBLISH SUBMIT */}
            <div className="pt-6 border-t border-slate-200 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-900/20 flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>Kursni Barcha Do'konlar Uchun Nashr Qilish</span>
              </button>
            </div>
          </form>
        </div>

        {/* Existing Courses List */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-600" />
                <span>Mavjud Kurslar Ro'yxati ({courses.length})</span>
              </h3>

              <button
                type="button"
                onClick={() => {
                  setEditingCourse(null);
                  setShowEditorModal(true);
                }}
                className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-1 shadow-sm"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>+ Yangi Kurs</span>
              </button>
            </div>

            <div className="space-y-3">
              {courses.map((crs) => (
                <div
                  key={crs.id}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 hover:border-purple-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-purple-600 uppercase">
                      {crs.category}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {crs.createdDate}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{crs.title}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    {crs.description}
                  </p>

                  <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-200/60">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCourse(crs);
                        setShowEditorModal(true);
                      }}
                      className="px-2.5 py-1 bg-white hover:bg-purple-50 text-purple-700 font-bold text-[11px] rounded-lg border border-purple-200 flex items-center gap-1 shadow-2xs"
                    >
                      <Edit className="w-3 h-3" />
                      <span>Tahrirlash</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`"${crs.title}" kursini o'chirishni tasdiqlaysizmi?`)) {
                          deleteCourse(crs.id);
                        }
                      }}
                      className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[11px] rounded-lg border border-rose-200 flex items-center gap-1 shadow-2xs"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>O'chirish</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showEditorModal && (
        <CourseEditorModal
          isOpen={showEditorModal}
          onClose={() => setShowEditorModal(false)}
          initialCourse={editingCourse}
          onSave={(savedCourse) => {
            if (editingCourse) {
              updateCourse(editingCourse.id, savedCourse);
            } else {
              addCourse(savedCourse);
            }
            setShowEditorModal(false);
          }}
          authorName={currentUser.name}
        />
      )}

      {showImporterModal && (
        <ISpringPackageImporterModal onClose={() => setShowImporterModal(false)} />
      )}
    </div>
  );
};
