import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Course } from '../types';
import {
  BookOpen,
  Clock,
  Award,
  CheckCircle2,
  PlayCircle,
  Search,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';

interface CourseCatalogProps {
  onSelectCourse: (courseId: string) => void;
  searchTerm?: string;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  onSelectCourse,
  searchTerm = '',
}) => {
  const { courses, progressMap } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [localSearch, setLocalSearch] = useState<string>(searchTerm);

  const categories = [
    { id: 'all', label: 'Barcha Kategoriyalar' },
    { id: 'Mijozlarga Xizmat', label: 'Mijozlarga Xizmat' },
    { id: 'Moliya va Kassa', label: 'Moliya va Kassa' },
    { id: 'Mahsulot Bilimi', label: 'Mahsulot Bilimi' },
  ];

  const filteredCourses = courses.filter((c) => {
    const matchesCategory =
      selectedCategory === 'all' || c.category === selectedCategory;
    const matchesLevel =
      selectedLevel === 'all' || c.level === selectedLevel;
    const query = localSearch.toLowerCase();
    const matchesQuery =
      c.title.toLowerCase().includes(query) ||
      c.description.toLowerCase().includes(query) ||
      c.author.toLowerCase().includes(query);

    return matchesCategory && matchesLevel && matchesQuery;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-teal-950 rounded-2xl p-6 text-white border border-slate-800 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>iSpring Interaktiv Kurslar Katalogi</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              Hamkor O'quv Kurslari va Imtihonlar
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Taqdimotlar (Prezentatsiya), amaliy video darslar va interaktiv testlardan o'tib, rasmiy sertifikatlarga ega bo'ling.
            </p>
          </div>

          <div className="bg-slate-800/80 px-4 py-3 rounded-xl border border-slate-700/80 flex items-center gap-3">
            <Award className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <div className="text-xs text-slate-300 font-medium">Sertifikat O'tish Bali</div>
              <div className="text-sm font-bold text-white">Minimum 80% To'g'ri Javob</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Kurs nomi yoki kalit so'z bilan qidirish..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Saralash:</span>
          </div>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const progress = progressMap[course.id];
          const isCompleted = progress?.status === 'completed';
          const completedCount = progress?.completedModuleIds?.length || 0;
          const totalModules = course.modules.length;
          const completionPercentage = Math.round(
            (completedCount / totalModules) * 100
          );

          return (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden hover:shadow-md transition-all flex flex-col group"
            >
              {/* Cover Image */}
              <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                <img
                  src={course.coverImage}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {course.category}
                </div>

                <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-slate-200 text-[10px] font-medium px-2 py-1 rounded-lg">
                  {course.level} daraja
                </div>

                {isCompleted && (
                  <div className="absolute bottom-3 left-3 bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                    <CheckCircle2 className="w-3.5 h-3.5" /> O'tildi & Sertifikatlangan
                  </div>
                )}
              </div>

              {/* Content Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-emerald-700 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Modules & Duration */}
                <div className="space-y-3 pt-2 border-t border-slate-100 text-xs text-slate-500">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{course.durationHours} soat ta'lim</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                      <span>{totalModules} ta modul</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {completedCount > 0 && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600">
                        <span>O'zlashtirish</span>
                        <span className="text-emerald-600">{completionPercentage}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 transition-all duration-300"
                          style={{ width: `${completionPercentage}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="text-[11px] text-slate-400">
                    Muallif: <span className="text-slate-600 font-medium">{course.author}</span>
                  </div>
                </div>

                {/* Launch Button */}
                <button
                  onClick={() => onSelectCourse(course.id)}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm ${
                    isCompleted
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-900/20'
                  }`}
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>{isCompleted ? "Qayta Ko'rish" : "Kursni Boshlash"}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
