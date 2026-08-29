import React, { useState } from 'react';
import {
  FileCode2,
  FileText,
  UploadCloud,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  X,
  Plus,
  Play,
  HelpCircle,
  FileSpreadsheet,
  Zap,
} from 'lucide-react';
import { CourseModule, PresentationSlide, QuizQuestion } from '../types';
import { useApp } from '../context/AppContext';

interface ISpringPackageImporterModalProps {
  onClose: () => void;
  onImportComplete?: (newModule: CourseModule) => void;
}

export const ISpringPackageImporterModal: React.FC<ISpringPackageImporterModalProps> = ({
  onClose,
  onImportComplete,
}) => {
  const { courses, updateCourse } = useApp();

  const [selectedFileType, setSelectedFileType] = useState<'scorm' | 'pptx' | 'pdf' | 'mp4'>('scorm');
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || '');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [importedModule, setImportedModule] = useState<CourseModule | null>(null);

  const handleSimulateUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadProgress(10);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);

          // Generate Parsed SCORM/PPTX Module
          let generatedMod: CourseModule;

          if (selectedFileType === 'scorm') {
            generatedMod = {
              id: 'scorm_' + Date.now(),
              title: "iSpring SCORM: Mijozlar Bilan Muloqot va Servis Standartlari",
              type: 'scorm_package',
              scormZipName: 'iSpring_Course_Servis_Standartlari_v2.1.zip',
              durationMinutes: 25,
              slides: [
                {
                  id: 's1',
                  slideNumber: 1,
                  title: "1. Kirish va Hamkor Servis Standarti",
                  content: "Mijozlar do'konga kirib kelganda samimiy qarshilash va xushmuomalalik bilan muloqotni boshlash qoidalari.",
                  bulletPoints: [
                    "3 soniya ichida mijozga tabassum bilan qarash",
                    "Assalomu alaykum! Xush kelibsiz! deb kutib olish",
                    "Ehtiyojni aniqlash uchun ochiq savollar berish",
                  ],
                  speakerNotes: "Har bir xodim ushbu standartni amalda qo'llashi shart.",
                },
                {
                  id: 's2',
                  slideNumber: 2,
                  title: "2. E'tirozlar Bilan Ishlash (Objections)",
                  content: "Mijoz mahsulot narxi yoki sifati bo'yicha e'tiroz bildirganda qanday javob berish kerak?",
                  bulletPoints: [
                    "Mijoz so'zini bo'lmasdan oxirigacha eshitish",
                    "E'tirozni tushunganlikni bildirish (Ha, tushundim)",
                    "Muqobil variant yoki afzallikni tushuntirish",
                  ],
                },
              ],
              questions: [
                {
                  id: 'sq1',
                  question: "Mijoz do'konga kirganda necha soniya ichida salomlashish kerak?",
                  options: ["3 soniya ichida", "1 daqiqa ichida", "Mijoz o'zi kelmaguncha kuptiladi", "Farqi yo'q"],
                  correctAnswerIndex: 0,
                  explanation: "iSpring xushmuomalalik standarti bo'yicha 3 soniya oltin qoida hisoblanadi.",
                  points: 10,
                },
              ],
            };
          } else if (selectedFileType === 'pptx') {
            generatedMod = {
              id: 'pptx_' + Date.now(),
              title: "PowerPoint Darslik: Kassa Texnikasi va Operatsiyalar",
              type: 'pptx',
              durationMinutes: 20,
              slides: [
                {
                  id: 'p1',
                  slideNumber: 1,
                  title: "Kassada QR to'lov va Naqd Pul Qoidalari",
                  content: "Kassirning kunlik balans topshirish va mijozlarga chek berish intizomi.",
                  bulletPoints: [
                    "Har bir operatsiyadan so'ng chekni mijozga uzatish",
                    "Qaytimni aniq hisoblash va ikkala qo'l bilan berish",
                  ],
                },
              ],
            };
          } else {
            generatedMod = {
              id: 'pdf_' + Date.now(),
              title: "Nizom va Yo'riqnoma: Ichki Tartib Qoidalari",
              type: 'pdf',
              documentName: 'Korporativ_Nizom_2026.pdf',
              durationMinutes: 15,
            };
          }

          setImportedModule(generatedMod);
          return 100;
        }
        return prev + 20;
      });
    }, 300);
  };

  const handleSaveToCourse = () => {
    if (!importedModule || !selectedCourseId) return;

    const targetCourse = courses.find((c) => c.id === selectedCourseId);
    if (!targetCourse) return;

    const updatedModules = [...targetCourse.modules, importedModule];
    updateCourse(selectedCourseId, { modules: updatedModules });

    if (onImportComplete) {
      onImportComplete(importedModule);
    }
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden cursor-default"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
              <FileCode2 className="w-5 h-5" />
            </div>
            <div>
              <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-wider">
                iSpring Suite & SCORM Importer
              </span>
              <h3 className="text-base font-bold text-white">Kurs Kontentini Import Qilish</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {!importedModule ? (
            <form onSubmit={handleSimulateUpload} className="space-y-5">
              {/* Target Course Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Modul qaysi kursga qo'shilsin?
                </label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Package Format Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Fayl Formatini Tanlang
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedFileType('scorm')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      selectedFileType === 'scorm'
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-900 ring-2 ring-indigo-500/20'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <FileCode2 className="w-5 h-5 text-indigo-600" />
                    <span className="text-xs font-bold">iSpring SCORM (.zip)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedFileType('pptx')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      selectedFileType === 'pptx'
                        ? 'bg-orange-50 border-orange-500 text-orange-900 ring-2 ring-orange-500/20'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <FileText className="w-5 h-5 text-orange-600" />
                    <span className="text-xs font-bold">PowerPoint (.pptx)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedFileType('pdf')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      selectedFileType === 'pdf'
                        ? 'bg-rose-50 border-rose-500 text-rose-900 ring-2 ring-rose-500/20'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <FileSpreadsheet className="w-5 h-5 text-rose-600" />
                    <span className="text-xs font-bold">Hujjat (.pdf)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedFileType('mp4')}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      selectedFileType === 'mp4'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Play className="w-5 h-5 text-emerald-600" />
                    <span className="text-xs font-bold">Video (.mp4)</span>
                  </button>
                </div>
              </div>

              {/* Upload Drop Zone */}
              <div className="border-2 border-dashed border-slate-300 hover:border-indigo-500 bg-slate-50 hover:bg-indigo-50/20 rounded-2xl p-8 text-center transition-all cursor-pointer">
                <UploadCloud className="w-12 h-12 text-indigo-500 mx-auto mb-2 animate-bounce" />
                <h4 className="font-bold text-sm text-slate-800">
                  {selectedFileType === 'scorm'
                    ? 'iSpring Suite-dan eksport qilingan ZIP paketini shu yerga tashlang'
                    : 'Faylni tanlang yoki shu yerga sudrab keling'}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Maksimal hajm: 250 MB (SCORM 1.2 / 2004 formatida avtomatik o'qiladi)
                </p>
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-indigo-700">
                    <span>iSpring Paket Parslash va Integratsiya Qilish...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isUploading}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-2 transition-all"
              >
                <Zap className="w-4 h-4 text-amber-300" />
                <span>Paketni O'qish va Kursga Import Qilish</span>
              </button>
            </form>
          ) : (
            /* Import Summary & Confirmation */
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-emerald-900">
                    Paket Muvaffaqiyatli Parslandi!
                  </h4>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    iSpring darslik strukturasidan avtomatik slaydlar va test savollari ajratib olindi.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-xs font-bold text-slate-500">Yaratilgan Modul Nomi:</span>
                  <span className="text-xs font-bold text-slate-900">{importedModule.title}</span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-xs font-bold text-slate-500">Turi va Davomiyligi:</span>
                  <span className="text-xs font-bold text-indigo-600 uppercase">
                    {importedModule.type} • {importedModule.durationMinutes} daqiqa
                  </span>
                </div>

                {importedModule.slides && (
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-xs font-bold text-slate-500">Topilgan Slaydlar Soni:</span>
                    <span className="text-xs font-bold text-emerald-700">
                      {importedModule.slides.length} ta Slayd
                    </span>
                  </div>
                )}

                {importedModule.questions && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Avto-Test Savollari:</span>
                    <span className="text-xs font-bold text-amber-600">
                      {importedModule.questions.length} ta Test Savoli
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setImportedModule(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Qayta Yuklash
                </button>

                <button
                  onClick={handleSaveToCourse}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-900/20 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Kursga Qo'shish va Saqlash</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
