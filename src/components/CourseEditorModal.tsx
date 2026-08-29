import React, { useState } from 'react';
import { Course, CourseModule, PresentationSlide, QuizQuestion } from '../types';
import { uploadFile } from '../services/supabase';
import {
  BookOpen,
  X,
  FileText,
  Video,
  HelpCircle,
  PlusCircle,
  Trash2,
  Upload,
  CheckCircle,
  Image as ImageIcon,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Layers,
  Award,
  Clock,
  Check,
  AlertCircle,
} from 'lucide-react';

interface CourseEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCourse: Course | null;
  onSave: (course: Course) => void;
  authorName?: string;
}

export const CourseEditorModal: React.FC<CourseEditorModalProps> = ({
  isOpen,
  onClose,
  initialCourse,
  onSave,
  authorName = 'Metodist / Admin',
}) => {
  const [title, setTitle] = useState(initialCourse?.title || '');
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [category, setCategory] = useState(initialCourse?.category || 'Chakana Savdo');
  const [description, setDescription] = useState(initialCourse?.description || '');
  const [level, setLevel] = useState<"Boshlang'ich" | "O'rta" | "Yuqori">(
    initialCourse?.level || "Boshlang'ich"
  );
  const [passScore, setPassScore] = useState(initialCourse?.passScorePercentage || 80);
  const [durationHours, setDurationHours] = useState(initialCourse?.durationHours || 1.5);
  const [coverImage, setCoverImage] = useState(
    initialCourse?.coverImage ||
      'https://images.unsplash.com/photo-1556742049-0a67e83fe84a?w=800&auto=format&fit=crop&q=80'
  );

  // Modules list
  const [modules, setModules] = useState<CourseModule[]>(
    initialCourse?.modules || [
      {
        id: `mod_${Date.now()}_1`,
        title: "1-Modul: Asosiy Nazariy Ma'lumotlar",
        type: 'presentation',
        durationMinutes: 15,
        slides: [
          {
            id: `sld_${Date.now()}_1`,
            slideNumber: 1,
            title: 'Kirish va Standartlar',
            content: "Mijozlarga xizmat ko'rsatish va korporativ odob-axloq me'yorlari.",
            bulletPoints: ['Professional muloqot', "E'tiborli va samimiy yondashuv"],
            imageUrl:
              'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
          },
        ],
      },
    ]
  );

  // Currently expanded/editing module index
  const [activeModuleIdx, setActiveModuleIdx] = useState<number>(0);

  if (!isOpen) return null;

  // File Upload for Cover Image
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploadingCover(true);
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `course_${Date.now()}.${fileExt}`;
        const publicUrl = await uploadFile('course-covers', `public/${fileName}`, file);
        setCoverImage(publicUrl);
      } catch (error) {
        console.error('File upload failed:', error);
        alert("Fayl yuklashda xatolik yuz berdi.");
      } finally {
        setIsUploadingCover(false);
      }
    }
  };

  // Prezentatsiya / PDF / PPTX file upload for a specific module
  const handleDocumentModuleUpload = (
    moduleIdx: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          const fileDataUrl = reader.result;
          const fileName = file.name;
          const isPdf = fileName.toLowerCase().endsWith('.pdf');
          const isPptx =
            fileName.toLowerCase().endsWith('.pptx') || fileName.toLowerCase().endsWith('.ppt');

          setModules((prev) =>
            prev.map((mod, i) => {
              if (i !== moduleIdx) return mod;
              return {
                ...mod,
                type: isPdf ? 'pdf' : isPptx ? 'pptx' : 'presentation',
                documentName: fileName,
                documentUrl: fileDataUrl,
                title: mod.title.includes('Yangi') ? `Prezentatsiya: ${fileName}` : mod.title,
              };
            })
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Add a new module
  const handleAddModule = (type: 'presentation' | 'pdf' | 'video' | 'quiz') => {
    const newModId = `mod_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    let newMod: CourseModule;

    if (type === 'pdf') {
      newMod = {
        id: newModId,
        title: `${modules.length + 1}-Modul: Qurilmadan Yuklangan Prezentatsiya / Hujjat`,
        type: 'pdf',
        durationMinutes: 15,
        documentName: '',
        documentUrl: '',
      };
    } else if (type === 'video') {
      newMod = {
        id: newModId,
        title: `${modules.length + 1}-Modul: Video Darslik`,
        type: 'video',
        durationMinutes: 10,
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      };
    } else if (type === 'quiz') {
      newMod = {
        id: newModId,
        title: `${modules.length + 1}-Modul: Interaktiv Imtihon Testi`,
        type: 'quiz',
        durationMinutes: 15,
        questions: [
          {
            id: `q_${Date.now()}_1`,
            question: "Xaridor do'konga kirganida birinchi qilinadigan harakat nima?",
            options: [
              'Iliq tabassum bilan salomlashish',
              "Mijoz o'zi murojaat qilishini kutish",
              'Ish joyidan uzoqlashish',
              'Sotuv raqamlarini tekshirish',
            ],
            correctAnswerIndex: 0,
            explanation: "Birinchi 3 soniyadagi samimiy salomlashish xaridorga ijobiy taassurot beradi.",
            points: 25,
          },
        ],
      };
    } else {
      newMod = {
        id: newModId,
        title: `${modules.length + 1}-Modul: iSpring Prezentatsiya Slaydlari`,
        type: 'presentation',
        durationMinutes: 15,
        slides: [
          {
            id: `sld_${Date.now()}_1`,
            slideNumber: 1,
            title: '1-Slayd: Kirish',
            content: "Slayd bo'yicha nazariy tushuntirishlarni bu yerga kiriting...",
            bulletPoints: ['Asosiy standart 1', 'Asosiy standart 2'],
            imageUrl:
              'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
          },
        ],
      };
    }

    setModules((prev) => [...prev, newMod]);
    setActiveModuleIdx(modules.length);
  };

  // Remove Module
  const handleRemoveModule = (idx: number) => {
    if (modules.length <= 1) {
      alert("Kamida 1 ta modul bo'lishi shart.");
      return;
    }
    setModules((prev) => prev.filter((_, i) => i !== idx));
    setActiveModuleIdx((prev) => Math.max(0, prev - 1));
  };

  // Move Module Up/Down
  const handleMoveModule = (idx: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= modules.length) return;

    const updated = [...modules];
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;
    setModules(updated);
    setActiveModuleIdx(targetIdx);
  };

  // Add Question to Quiz Module
  const handleAddQuestionToModule = (moduleIdx: number) => {
    setModules((prev) =>
      prev.map((mod, i) => {
        if (i !== moduleIdx) return mod;
        const currentQuestions = mod.questions || [];
        const newQ: QuizQuestion = {
          id: `q_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
          question: 'Yangi imtihon savolini kiriting...',
          options: ['A Variant', 'B Variant', 'C Variant', 'D Variant'],
          correctAnswerIndex: 0,
          explanation: "To'g'ri me'yoriy tushuntirish va izoh",
          points: 20,
        };
        return { ...mod, questions: [...currentQuestions, newQ] };
      })
    );
  };

  // Delete Question
  const handleDeleteQuestion = (moduleIdx: number, qId: string) => {
    setModules((prev) =>
      prev.map((mod, i) => {
        if (i !== moduleIdx) return mod;
        const filtered = (mod.questions || []).filter((q) => q.id !== qId);
        return { ...mod, questions: filtered };
      })
    );
  };

  // Add Option to Question
  const handleAddOptionToQuestion = (moduleIdx: number, qId: string) => {
    setModules((prev) =>
      prev.map((mod, i) => {
        if (i !== moduleIdx) return mod;
        const updatedQuestions = (mod.questions || []).map((q) => {
          if (q.id !== qId) return q;
          return {
            ...q,
            options: [...q.options, `Variant ${q.options.length + 1}`],
          };
        });
        return { ...mod, questions: updatedQuestions };
      })
    );
  };

  // Delete Option from Question
  const handleDeleteOptionFromQuestion = (
    moduleIdx: number,
    qId: string,
    optIdx: number
  ) => {
    setModules((prev) =>
      prev.map((mod, i) => {
        if (i !== moduleIdx) return mod;
        const updatedQuestions = (mod.questions || []).map((q) => {
          if (q.id !== qId) return q;
          if (q.options.length <= 2) {
            alert("Kamida 2 ta variant bo'lishi kerak.");
            return q;
          }
          const newOpts = q.options.filter((_, idx) => idx !== optIdx);
          let newCorrect = q.correctAnswerIndex;
          if (newCorrect >= newOpts.length) {
            newCorrect = newOpts.length - 1;
          }
          return { ...q, options: newOpts, correctAnswerIndex: newCorrect };
        });
        return { ...mod, questions: updatedQuestions };
      })
    );
  };

  // Save Course Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Iltimos, kurs nomi va tavsifini kiriting.");
      return;
    }

    const newCourseObj: Course = {
      id: initialCourse?.id || `crs_${Date.now()}`,
      title: title.trim(),
      category: category.trim(),
      description: description.trim(),
      level,
      passScorePercentage: Number(passScore),
      durationHours: Number(durationHours),
      coverImage:
        coverImage ||
        'https://images.unsplash.com/photo-1556742049-0a67e83fe84a?w=800&auto=format&fit=crop&q=80',
      author: initialCourse?.author || authorName,
      createdDate: initialCourse?.createdDate || new Date().toISOString().split('T')[0],
      assignedStores: initialCourse?.assignedStores || ['all'],
      modules,
    };

    onSave(newCourseObj);
    onClose();
  };

  const currModule = modules[activeModuleIdx];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 px-6 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/20 rounded-2xl text-indigo-400 border border-indigo-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-white">
                {initialCourse ? "Kurs va Prezentatsiyalarni Tahrirlash" : "Yangi Ta'lim Kursi va Prezentatsiya Yaratish"}
              </h2>
              <p className="text-xs text-slate-400">
                Lokal qurilmadan prezentatsiya (PDF/PPTX) yuklang, slayd va imtihon testlarini sozlang.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body with Scroll */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Section 1: Basic Info */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>1. Kurs Asosiy Ma'lumotlari</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kurs Nomi *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Kassa Standartlari va Mijoz Bilan Muloqot"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kategoriya
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="Chakana Savdo">Chakana Savdo</option>
                  <option value="Mijozlarga Xizmat">Mijozlarga Xizmat</option>
                  <option value="Moliya va Kassa">Moliya va Kassa</option>
                  <option value="Mahsulot Bilimi">Mahsulot Bilimi</option>
                  <option value="Boshqaruv va Liderlik">Boshqaruv va Liderlik</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kurs Tavsifi va O'quv Maqsadi *
              </label>
              <textarea
                rows={2}
                required
                placeholder="Xodim ushbu kursni tamomlagach qanday ko'nikmalarga ega bo'ladi..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Murakkablik Darajasi
                </label>
                <select
                  value={level}
                  onChange={(e: any) => setLevel(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="Boshlang'ich">Boshlang'ich</option>
                  <option value="O'rta">O'rta</option>
                  <option value="Yuqori">Yuqori</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Sertifikat O'tish Bali (%)
                </label>
                <input
                  type="number"
                  min={50}
                  max={100}
                  value={passScore}
                  onChange={(e) => setPassScore(Number(e.target.value))}
                  className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Umumiy Soat (Soatda)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min={0.5}
                  value={durationHours}
                  onChange={(e) => setDurationHours(Number(e.target.value))}
                  className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Cover Image Upload */}
            <div className="space-y-2 border border-slate-200 bg-white p-3.5 rounded-xl">
              <label className="block text-xs font-bold text-slate-800">
                Kurs Muqova Rasmi (Qurilmangizdan yuklang yoki URL kiriting)
              </label>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <label className={`cursor-pointer px-4 py-2 ${isUploadingCover ? 'bg-slate-400' : 'bg-indigo-600 hover:bg-indigo-700'} text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all shrink-0`}>
                  <ImageIcon className={`w-4 h-4 ${isUploadingCover ? 'animate-pulse' : ''}`} />
                  <span>{isUploadingCover ? 'Yuklanmoqda...' : 'Qurilmadan Rasm Tanlash'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverUpload}
                    className="hidden"
                    disabled={isUploadingCover}
                  />
                </label>

                <input
                  type="text"
                  placeholder="yoki rasm havolasi (https://...)"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {coverImage && (
                <div className="relative mt-2 rounded-xl overflow-hidden border border-slate-200 h-28 bg-slate-900 flex items-center justify-center">
                  <img
                    src={coverImage}
                    alt="Course Banner"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Course Modules Manager */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-indigo-50/80 p-4 rounded-2xl border border-indigo-200">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  <span>2. Kurs Modullari Boshqaruvi ({modules.length} modul)</span>
                </h3>
                <p className="text-xs text-slate-600">
                  Qurilmangizdan prezentatsiya yuklang, slaydlar yoki imtihon testlarini qo'shing.
                </p>
              </div>

              {/* Add module buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleAddModule('pdf')}
                  className="px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>+ Qurilmadan Prezentatsiya (PDF/PPTX)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddModule('quiz')}
                  className="px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>+ Imtihon Testi</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddModule('presentation')}
                  className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>+ iSpring Slaydlar</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAddModule('video')}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>+ Video Dars</span>
                </button>
              </div>
            </div>

            {/* Modules Tabs List */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {modules.map((mod, idx) => {
                const isActive = idx === activeModuleIdx;
                return (
                  <button
                    type="button"
                    key={mod.id}
                    onClick={() => setActiveModuleIdx(idx)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-extrabold shrink-0 flex items-center gap-2 transition-all border ${
                      isActive
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span>#{idx + 1}</span>
                    <span className="truncate max-w-[140px]">{mod.title}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-extrabold ${
                        mod.type === 'pdf' || mod.type === 'pptx'
                          ? 'bg-rose-100 text-rose-800'
                          : mod.type === 'quiz'
                          ? 'bg-amber-100 text-amber-800'
                          : mod.type === 'video'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {mod.type}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Currently Active Module Editor Container */}
            {currModule && (
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-5 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-indigo-600 text-white text-xs font-extrabold px-2.5 py-1 rounded-lg">
                      Modul #{activeModuleIdx + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-500 uppercase">
                      Turi: {currModule.type.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      disabled={activeModuleIdx === 0}
                      onClick={() => handleMoveModule(activeModuleIdx, 'up')}
                      className="p-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 rounded-xl text-slate-700"
                      title="Yuqoriga surish"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={activeModuleIdx === modules.length - 1}
                      onClick={() => handleMoveModule(activeModuleIdx, 'down')}
                      className="p-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 rounded-xl text-slate-700"
                      title="Pastga surish"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveModule(activeModuleIdx)}
                      className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl border border-rose-200"
                      title="Modulni o'chirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Module Common Settings */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Modul Nomi *
                    </label>
                    <input
                      type="text"
                      required
                      value={currModule.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        setModules((prev) =>
                          prev.map((m, i) => (i === activeModuleIdx ? { ...m, title: val } : m))
                        );
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      O'rganish Vaqti (Daqiqada)
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={currModule.durationMinutes}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setModules((prev) =>
                          prev.map((m, i) =>
                            i === activeModuleIdx ? { ...m, durationMinutes: val } : m
                          )
                        );
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* SUB-EDITOR A: PRESENTATION / PDF / PPTX FILE UPLOADER */}
                {(currModule.type === 'pdf' ||
                  currModule.type === 'pptx' ||
                  currModule.documentUrl !== undefined) && (
                  <div className="p-5 bg-rose-50/60 rounded-2xl border border-rose-200 space-y-4">
                    <div className="flex items-center gap-2">
                      <Upload className="w-5 h-5 text-rose-600" />
                      <h4 className="font-extrabold text-sm text-slate-900">
                        Butun Prezentatsiyani Qurilmadan Yuklash (PDF yoki PPTX)
                      </h4>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      Kompyuteringiz yoki telefongizdan PowerPoint prezentatsiyasi yoki PDF formatidagi
                      tayyor o'quv qo'llanmasini yuklang.
                    </p>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <label className="cursor-pointer px-5 py-3 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all shrink-0">
                        <Upload className="w-4 h-4" />
                        <span>Qurilmadan Prezentatsiya Faylini Tanlash (.pdf, .pptx)</span>
                        <input
                          type="file"
                          accept=".pdf,.pptx,.ppt,.png,.jpg,.jpeg"
                          onChange={(e) => handleDocumentModuleUpload(activeModuleIdx, e)}
                          className="hidden"
                        />
                      </label>

                      {currModule.documentName ? (
                        <div className="flex-1 bg-white p-3 rounded-xl border border-rose-200 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 truncate">
                            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span className="text-xs font-extrabold text-slate-900 truncate">
                              {currModule.documentName}
                            </span>
                          </div>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded shrink-0">
                            Yuklandi
                          </span>
                        </div>
                      ) : (
                        <div className="flex-1 bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-400 italic">
                          Hali fayl tanlanmadi
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* SUB-EDITOR B: iSPRING SLIDES AUTHORING */}
                {currModule.type === 'presentation' && currModule.slides && (
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-emerald-600" />
                        <span>iSpring Slaydlar Ketma-ketligi ({currModule.slides.length} slayd)</span>
                      </h4>

                      <button
                        type="button"
                        onClick={() => {
                          const updatedSlides = [
                            ...currModule.slides!,
                            {
                              id: `sld_${Date.now()}`,
                              slideNumber: currModule.slides!.length + 1,
                              title: `${currModule.slides!.length + 1}-Slayd`,
                              content: "Slayd bo'yicha asosiy ma'lumotlar...",
                              bulletPoints: ["Bo'lim 1", "Bo'lim 2"],
                              imageUrl:
                                'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
                            },
                          ];
                          setModules((prev) =>
                            prev.map((m, i) =>
                              i === activeModuleIdx ? { ...m, slides: updatedSlides } : m
                            )
                          );
                        }}
                        className="px-3 py-1.5 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-lg border border-emerald-200 hover:bg-emerald-100 flex items-center gap-1"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>Slayd Qo'shish</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {currModule.slides.map((sld, sldIdx) => (
                        <div
                          key={sld.id}
                          className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-extrabold text-emerald-700">
                              Slayd #{sldIdx + 1}
                            </span>
                            {currModule.slides!.length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const filtered = currModule.slides!.filter(
                                    (s) => s.id !== sld.id
                                  );
                                  setModules((prev) =>
                                    prev.map((m, i) =>
                                      i === activeModuleIdx ? { ...m, slides: filtered } : m
                                    )
                                  );
                                }}
                                className="text-rose-600 hover:text-rose-800 p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
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
                                const updated = currModule.slides!.map((s) =>
                                  s.id === sld.id ? { ...s, title: val } : s
                                );
                                setModules((prev) =>
                                  prev.map((m, i) =>
                                    i === activeModuleIdx ? { ...m, slides: updated } : m
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
                                const updated = currModule.slides!.map((s) =>
                                  s.id === sld.id ? { ...s, imageUrl: val } : s
                                );
                                setModules((prev) =>
                                  prev.map((m, i) =>
                                    i === activeModuleIdx ? { ...m, slides: updated } : m
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
                              const updated = currModule.slides!.map((s) =>
                                s.id === sld.id ? { ...s, content: val } : s
                              );
                              setModules((prev) =>
                                prev.map((m, i) =>
                                  i === activeModuleIdx ? { ...m, slides: updated } : m
                                )
                              );
                            }}
                            className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SUB-EDITOR C: VIDEO MODULE */}
                {currModule.type === 'video' && (
                  <div className="space-y-3 pt-2">
                    <label className="block text-xs font-bold text-slate-700">
                      Video Darslik Havolasi (MP4 URL yoki YouTube embed)
                    </label>
                    <input
                      type="text"
                      value={currModule.videoUrl || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setModules((prev) =>
                          prev.map((m, i) =>
                            i === activeModuleIdx ? { ...m, videoUrl: val } : m
                          )
                        );
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900"
                    />
                  </div>
                )}

                {/* SUB-EDITOR D: RICH QUIZ / TEST BUILDER */}
                {currModule.type === 'quiz' && (
                  <div className="space-y-5 pt-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-amber-50/80 p-3.5 rounded-xl border border-amber-200">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-amber-600" />
                        <div>
                          <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                            Interaktiv Imtihon Testini Tuzish
                          </h4>
                          <p className="text-[11px] text-slate-600">
                            Savollar, javob variantlari, to'g me'yoriy tushuntirish hamda ballarni belgilang.
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAddQuestionToModule(activeModuleIdx)}
                        className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-all shrink-0"
                      >
                        <PlusCircle className="w-4 h-4" />
                        <span>+ Yangi Savol Qo'shish</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {(currModule.questions || []).map((q, qIdx) => (
                        <div
                          key={q.id}
                          className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 shadow-sm"
                        >
                          {/* Question Header */}
                          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                            <span className="text-xs font-extrabold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg">
                              Savol #{qIdx + 1}
                            </span>

                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                                <span>Ball:</span>
                                <input
                                  type="number"
                                  min={1}
                                  max={100}
                                  value={q.points || 20}
                                  onChange={(e) => {
                                    const val = Number(e.target.value);
                                    setModules((prev) =>
                                      prev.map((mod, i) => {
                                        if (i !== activeModuleIdx) return mod;
                                        const updatedQ = (mod.questions || []).map((item) =>
                                          item.id === q.id ? { ...item, points: val } : item
                                        );
                                        return { ...mod, questions: updatedQ };
                                      })
                                    );
                                  }}
                                  className="w-16 bg-white border border-slate-200 rounded-lg p-1 text-center font-bold text-amber-700 text-xs"
                                />
                              </div>

                              {(currModule.questions || []).length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleDeleteQuestion(activeModuleIdx, q.id)}
                                  className="text-rose-600 hover:bg-rose-100 p-1.5 rounded-lg transition-colors"
                                  title="Savolni o'chirish"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Question Text */}
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              Savol Matni *
                            </label>
                            <textarea
                              rows={2}
                              required
                              placeholder="Savol mazmunini batafsil yozing..."
                              value={q.question}
                              onChange={(e) => {
                                const val = e.target.value;
                                setModules((prev) =>
                                  prev.map((mod, i) => {
                                    if (i !== activeModuleIdx) return mod;
                                    const updatedQ = (mod.questions || []).map((item) =>
                                      item.id === q.id ? { ...item, question: val } : item
                                    );
                                    return { ...mod, questions: updatedQ };
                                  })
                                );
                              }}
                              className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-bold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                            />
                          </div>

                          {/* Answer Options */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-extrabold text-slate-700 uppercase">
                                Javob Variantlari (To'g'ri javobni tanlang):
                              </span>

                              <button
                                type="button"
                                onClick={() => handleAddOptionToQuestion(activeModuleIdx, q.id)}
                                className="text-[11px] font-bold text-amber-700 hover:underline flex items-center gap-1"
                              >
                                <PlusCircle className="w-3.5 h-3.5" />
                                <span>+ Variant Qo'shish</span>
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {q.options.map((opt, optIdx) => (
                                <div
                                  key={optIdx}
                                  className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all ${
                                    q.correctAnswerIndex === optIdx
                                      ? 'bg-emerald-50 border-emerald-400 ring-1 ring-emerald-400'
                                      : 'bg-white border-slate-200'
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name={`correct_radio_${q.id}`}
                                    checked={q.correctAnswerIndex === optIdx}
                                    onChange={() => {
                                      setModules((prev) =>
                                        prev.map((mod, i) => {
                                          if (i !== activeModuleIdx) return mod;
                                          const updatedQ = (mod.questions || []).map((item) =>
                                            item.id === q.id
                                              ? { ...item, correctAnswerIndex: optIdx }
                                              : item
                                          );
                                          return { ...mod, questions: updatedQ };
                                        })
                                      );
                                    }}
                                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 shrink-0 cursor-pointer"
                                  />

                                  <input
                                    type="text"
                                    value={opt}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setModules((prev) =>
                                        prev.map((mod, i) => {
                                          if (i !== activeModuleIdx) return mod;
                                          const updatedQ = (mod.questions || []).map((item) => {
                                            if (item.id !== q.id) return item;
                                            const newOpts = [...item.options];
                                            newOpts[optIdx] = val;
                                            return { ...item, options: newOpts };
                                          });
                                          return { ...mod, questions: updatedQ };
                                        })
                                      );
                                    }}
                                    className="flex-1 bg-transparent border-none text-xs text-slate-900 font-medium focus:outline-none"
                                  />

                                  {q.options.length > 2 && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleDeleteOptionFromQuestion(
                                          activeModuleIdx,
                                          q.id,
                                          optIdx
                                        )
                                      }
                                      className="text-slate-400 hover:text-rose-600 p-1 shrink-0"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Explanation field */}
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              To'g'ri Javob Me'yoriy Izohi / Tushuntirish
                            </label>
                            <input
                              type="text"
                              placeholder="Xodim noto'g'ri topsa, ushbu me'yoriy tushuntirish ko'rinadi..."
                              value={q.explanation || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                setModules((prev) =>
                                  prev.map((mod, i) => {
                                    if (i !== activeModuleIdx) return mod;
                                    const updatedQ = (mod.questions || []).map((item) =>
                                      item.id === q.id ? { ...item, explanation: val } : item
                                    );
                                    return { ...mod, questions: updatedQ };
                                  })
                                );
                              }}
                              className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
            >
              Bekor Qilish
            </button>
            <button
              type="submit"
              className="px-7 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-indigo-900/20 flex items-center gap-2 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>{initialCourse ? "O'zgarishlarni Saqlash" : "Kursni Saqlash va Nashr Qilish"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
