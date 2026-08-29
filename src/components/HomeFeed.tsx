import React, { useState } from 'react';
import {
useApp } from '../context/AppContext';
import { NewsArticle } from '../types';
import {
  Newspaper,
  Award,
  ThumbsUp,
  MessageCircle,
  TrendingUp,
  Sparkles,
  Calendar,
  Building2,
  BookOpen,
  ChevronRight,
  Flame,
  CheckCircle2,
  Eye,
  Tv,
  Coins,
  ClipboardCheck,
  ArrowRight,
  Gamepad2,
} from 'lucide-react';
import { NewsDetailModal } from './NewsDetailModal';

interface HomeFeedProps {
  onSelectCourse: (courseId: string) => void;
  setActiveTab: (tab: string) => void;
}

export const HomeFeed: React.FC<HomeFeedProps> = ({ onSelectCourse, setActiveTab }) => {
  const { newsList, newsCategories, spotlights, courses, currentUser, progressMap, likeNews } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalArticleId, setActiveModalArticleId] = useState<string | null>(null);

  const activeModalArticle = activeModalArticleId
    ? newsList.find((n) => n.id === activeModalArticleId) || null
    : null;

  const filteredNews =
    selectedCategory === 'all'
      ? newsList
      : newsList.filter((n) => n.category === selectedCategory);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-6 sm:p-8 border border-slate-800 text-white shadow-xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hamkor Korporativ O'quv Portali</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Assalomu alaykum, <span className="text-emerald-400">{currentUser.name}</span>!
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
            Bugungi yangiliklar bilan tanishing, bilimlaringizni oshiring va do'koningiz bilan birga eng yuqori marralarga erishing!
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-2 bg-slate-800/90 px-3.5 py-2 rounded-xl border border-slate-700">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>{currentUser.storeName}</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/90 px-3.5 py-2 rounded-xl border border-slate-700">
              <Award className="w-4 h-4 text-amber-400" />
              <span>{currentUser.points} Hamkor Ball</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/90 px-3.5 py-2 rounded-xl border border-slate-700">
              <Flame className="w-4 h-4 text-rose-400" />
              <span>{currentUser.streakDays} kun uzluksiz</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Quick Actions based on Role */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
        <button
          onClick={() => setActiveTab('sales_sim')}
          className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all hover:-translate-y-1 group"
        >
          <div className="p-3 bg-white/20 rounded-xl mb-3 group-hover:scale-110 transition-transform">
            <Sparkles className="w-6 h-6 text-indigo-50" />
          </div>
          <span className="font-bold text-sm">AI Sotuv Mashg'uloti</span>
          <span className="text-[10px] text-indigo-200 mt-1">Simulyatorni boshlash</span>
        </button>

        <button
          onClick={() => setActiveTab('matcher')}
          className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transition-all hover:-translate-y-1 group"
        >
          <div className="p-3 bg-white/20 rounded-xl mb-3 group-hover:scale-110 transition-transform">
            <Tv className="w-6 h-6 text-emerald-50" />
          </div>
          <span className="font-bold text-sm">Texnika Tanlash</span>
          <span className="text-[10px] text-emerald-200 mt-1">Mijozga mos mahsulot</span>
        </button>

        <button
          onClick={() => setActiveTab('objections')}
          className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-700 text-white shadow-lg shadow-rose-200 hover:shadow-rose-300 transition-all hover:-translate-y-1 group"
        >
          <div className="p-3 bg-white/20 rounded-xl mb-3 group-hover:scale-110 transition-transform">
            <MessageCircle className="w-6 h-6 text-rose-50" />
          </div>
          <span className="font-bold text-sm">Qimmat!</span>
          <span className="text-[10px] text-rose-200 mt-1">E'tirozlarga javoblar</span>
        </button>
        
        {currentUser.role === 'employee' ? (
          <button
            onClick={() => setActiveTab('mistakes')}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-200 hover:shadow-amber-300 transition-all hover:-translate-y-1 group relative"
          >
            <div className="absolute top-3 right-3 w-3 h-3 bg-rose-500 rounded-full animate-ping" />
            <div className="p-3 bg-white/20 rounded-xl mb-3 group-hover:scale-110 transition-transform">
              <Gamepad2 className="w-6 h-6 text-amber-50" />
            </div>
            <span className="font-bold text-sm">Xatolar O'yini</span>
            <span className="text-[10px] text-amber-200 mt-1">Xatolarni to'g'rilash</span>
          </button>
        ) : (
          <button
            onClick={() => setActiveTab('manager')}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 text-white shadow-lg shadow-slate-200 hover:shadow-slate-300 transition-all hover:-translate-y-1 group"
          >
            <div className="p-3 bg-white/20 rounded-xl mb-3 group-hover:scale-110 transition-transform">
              <ClipboardCheck className="w-6 h-6 text-slate-50" />
            </div>
            <span className="font-bold text-sm">Boshqaruv Paneli</span>
            <span className="text-[10px] text-slate-300 mt-1">Audit va KPI</span>
          </button>
        )}
      </div>


      

      {/* Main Grid: Left News Feed, Right Hall of Fame & Quick Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: News Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 gap-3">
            <div className="flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-bold text-slate-900">
                Hamkor Yangiliklari va E'lonlari
              </h2>
            </div>

            {/* Dynamic News Categories Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all shrink-0 ${
                  selectedCategory === 'all'
                    ? 'bg-emerald-600 text-white shadow-sm font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Barchasi
              </button>
              {newsCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white shadow-sm font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* News List */}
          <div className="space-y-6">
            {filteredNews.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
                Ushbu kategoriyada hali yangiliklar joylanmagan.
              </div>
            ) : (
              filteredNews.map((article) => {
                const isLiked = article.likedBy.includes(currentUser.id);
                const commentsCount = article.comments ? article.comments.length : article.commentsCount;

                return (
                  <article
                    key={article.id}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
                  >
                    {article.imageUrl && (
                      <div
                        onClick={() => setActiveModalArticleId(article.id)}
                        className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100 cursor-pointer"
                      >
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {article.isImportant && (
                          <div className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md">
                            Muhim E'lon
                          </div>
                        )}
                        <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-lg flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-emerald-400" />
                          <span>{article.date}</span>
                        </div>
                      </div>
                    )}

                    <div className="p-5 sm:p-6 space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                          {article.category}
                        </span>
                        <span>Muallif: {article.author}</span>
                      </div>

                      <h3
                        onClick={() => setActiveModalArticleId(article.id)}
                        className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug cursor-pointer flex items-center gap-1.5"
                      >
                        <span>{article.title}</span>
                      </h3>

                      <p
                        onClick={() => setActiveModalArticleId(article.id)}
                        className="text-sm text-slate-600 leading-relaxed line-clamp-3 cursor-pointer"
                      >
                        {article.content}
                      </p>

                      {/* Like, Comment & Batafsil Bar */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => likeNews(article.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
                              isLiked
                                ? 'bg-emerald-50 text-emerald-600 font-bold'
                                : 'hover:bg-slate-100 text-slate-600'
                            }`}
                          >
                            <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-emerald-600' : ''}`} />
                            <span>{article.likes} ta muvaffaqiyat</span>
                          </button>

                          <button
                            onClick={() => setActiveModalArticleId(article.id)}
                            className="flex items-center gap-1.5 text-slate-600 hover:text-emerald-600 transition-colors"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>{commentsCount} ta fikr</span>
                          </button>
                        </div>

                        <button
                          onClick={() => setActiveModalArticleId(article.id)}
                          className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-xl flex items-center gap-1 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Batafsil</span>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>

        {/* Right Col: Hall of Fame & Quick Active Courses */}
        <div className="space-y-6">
          {/* Hall of Fame / Employee Spotlights */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 text-white border border-slate-800 shadow-lg">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-700/80">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base">Faxrli Xodimlar va Yutuqlar</h3>
              </div>
              <span className="text-[10px] bg-amber-400/20 text-amber-300 font-semibold px-2 py-0.5 rounded-full">
                Oy Natijalari
              </span>
            </div>

            <div className="space-y-4">
              {spotlights.map((spt) => (
                <div
                  key={spt.id}
                  className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/80 flex items-start gap-3 hover:border-amber-500/50 transition-colors"
                >
                  <img
                    src={spt.employeeAvatar}
                    alt={spt.employeeName}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-amber-400/50 shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-bold text-white">{spt.employeeName}</h4>
                      <span className="text-[10px] font-bold text-amber-400">+{spt.pointsEarned} pt</span>
                    </div>
                    <div className="text-[11px] text-emerald-400 font-medium">{spt.title}</div>
                    <p className="text-[11px] text-slate-300 line-clamp-2">{spt.description}</p>
                    <div className="text-[10px] text-slate-400 pt-0.5">{spt.storeName}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Recommended Courses */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-sm">Siz Uchun Kurslar</h3>
              </div>
              <button
                onClick={() => setActiveTab('courses')}
                className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-0.5"
              >
                Barchasi <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {courses.slice(0, 3).map((course) => {
                const progress = progressMap[course.id];
                const isCompleted = progress?.status === 'completed';

                return (
                  <div
                    key={course.id}
                    onClick={() => {
                      onSelectCourse(course.id);
                      setActiveTab('courses');
                    }}
                    className="p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 cursor-pointer transition-all flex items-center gap-3 group"
                  >
                    <img
                      src={course.coverImage}
                      alt={course.title}
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-bold text-emerald-600 uppercase">
                          {course.category}
                        </span>
                        {isCompleted && (
                          <span className="flex items-center gap-0.5 text-[10px] text-emerald-600 font-bold">
                            <CheckCircle2 className="w-3 h-3" /> O'tilgan
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-emerald-700 transition-colors">
                        {course.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {course.modules.length} ta modul • {course.durationHours} soat
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* News Detail Modal */}
      {activeModalArticle && (
        <NewsDetailModal
          article={activeModalArticle}
          onClose={() => setActiveModalArticleId(null)}
        />
      )}
    </div>
  );
};

