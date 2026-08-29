import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { NewsArticle } from '../types';
import {
  X,
  ThumbsUp,
  MessageCircle,
  Calendar,
  Send,
  Trash2,
  Edit2,
  Check,
  Building2,
  ShieldAlert,
} from 'lucide-react';

interface NewsDetailModalProps {
  article: NewsArticle;
  onClose: () => void;
  onEditArticle?: (article: NewsArticle) => void;
}

export const NewsDetailModal: React.FC<NewsDetailModalProps> = ({
  article: initialArticle,
  onClose,
  onEditArticle,
}) => {
  const {
    currentUser,
    newsList,
    likeNews,
    addNewsComment,
    deleteNewsComment,
    editNewsComment,
    deleteNews,
  } = useApp();

  // Retrieve live reactive article from AppContext newsList
  const article = newsList.find((n) => n.id === initialArticle.id) || initialArticle;

  const [commentText, setCommentText] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  const isLiked = article.likedBy ? article.likedBy.includes(currentUser.id) : false;
  const comments = article.comments || [];

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addNewsComment(article.id, commentText);
    setCommentText('');
  };

  const handleSaveEditedComment = (commentId: string) => {
    if (!editingText.trim()) return;
    editNewsComment(article.id, commentId, editingText);
    setEditingCommentId(null);
    setEditingText('');
  };

  const handleDeleteArticle = () => {
    if (window.confirm("Rostdan ham ushbu yangilikni o'chirib tashlamoqchimisiz?")) {
      deleteNews(article.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-900 text-white shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-500/30">
              {article.category}
            </span>
            {article.isImportant && (
              <span className="text-xs font-bold uppercase text-white bg-rose-600 px-2 py-0.5 rounded-full">
                Muhim
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {currentUser.role === 'admin' && (
              <>
                {onEditArticle && (
                  <button
                    onClick={() => {
                      onEditArticle(article);
                      onClose();
                    }}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors text-xs font-bold flex items-center gap-1.5"
                    title="Yangilikni tahrirlash"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline">Tahrirlash</span>
                  </button>
                )}
                <button
                  onClick={handleDeleteArticle}
                  className="p-2 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white transition-colors text-xs font-bold flex items-center gap-1.5 border border-rose-500/30"
                  title="Yangilikni o'chirish"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">O'chirish</span>
                </button>
              </>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Cover Image */}
          {article.imageUrl && (
            <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-slate-100 shadow-sm border border-slate-200">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Title & Metadata */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
              {article.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>E'lon qilingan: {article.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span>Muallif: {article.author}</span>
              </div>
            </div>
          </div>

          {/* Article Text Content */}
          <div className="text-slate-700 leading-relaxed text-sm sm:text-base space-y-4 whitespace-pre-line">
            {article.content}
          </div>

          {/* Likes & Interaction Bar */}
          <div className="py-4 border-y border-slate-100 flex items-center justify-between">
            <button
              onClick={() => likeNews(article.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all ${
                isLiked
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
              <span>{article.likes} ta muvaffaqiyat</span>
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>{comments.length} ta fikr va mulohazalar</span>
            </div>
          </div>

          {/* Comments Section */}
          <div className="space-y-6 pt-2">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-emerald-600" />
              <span>Fikr va Izohlar</span>
            </h3>

            {/* Write a comment */}
            <form onSubmit={handleSendComment} className="flex gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-xl object-cover shrink-0 ring-2 ring-emerald-500/30"
              />
              <div className="flex-1 space-y-2">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Ushbu yangilik bo'yicha fikringizni bildiring..."
                  rows={2}
                  className="w-full p-3 rounded-2xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!commentText.trim()}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Yuborish</span>
                  </button>
                </div>
              </div>
            </form>

            {/* Comment List */}
            <div className="space-y-4 pt-2">
              {comments.length === 0 ? (
                <p className="text-xs text-slate-400 italic text-center py-4 bg-slate-50 rounded-2xl border border-slate-100">
                  Hozircha izohlar mavjud emas. Birinchi bo'lib fikr qoldiring!
                </p>
              ) : (
                comments.map((cmt) => {
                  const isAuthorOrAdmin =
                    currentUser.id === cmt.userId || currentUser.role === 'admin';

                  return (
                    <div
                      key={cmt.id}
                      className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={cmt.userAvatar}
                            alt={cmt.userName}
                            className="w-8 h-8 rounded-lg object-cover"
                          />
                          <div>
                            <div className="text-xs font-bold text-slate-900">
                              {cmt.userName}
                            </div>
                            <div className="text-[10px] text-slate-500">
                              {cmt.userRole} • {cmt.date}
                            </div>
                          </div>
                        </div>

                        {/* Admin or Author Edit/Delete buttons */}
                        {isAuthorOrAdmin && (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setEditingCommentId(cmt.id);
                                setEditingText(cmt.text);
                              }}
                              className="p-1.5 text-slate-400 hover:text-amber-600 transition-colors"
                              title="Tahrirlash"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteNewsComment(article.id, cmt.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                              title="O'chirish"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>

                      {editingCommentId === cmt.id ? (
                        <div className="space-y-2 pt-1">
                          <textarea
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            className="w-full p-2.5 bg-white rounded-xl border border-amber-300 text-xs focus:outline-none"
                            rows={2}
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setEditingCommentId(null)}
                              className="px-2.5 py-1 text-xs text-slate-500 font-medium"
                            >
                              Bekor qilish
                            </button>
                            <button
                              onClick={() => handleSaveEditedComment(cmt.id)}
                              className="px-3 py-1 bg-amber-500 text-white font-bold text-xs rounded-lg flex items-center gap-1"
                            >
                              <Check className="w-3.5 h-3.5" />
                              Saqlash
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-slate-700 leading-relaxed pl-1">
                          {cmt.text}
                        </p>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
