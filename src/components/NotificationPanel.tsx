import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AppNotification } from '../types';
import {
  Bell,
  BookOpen,
  Clock,
  AlertTriangle,
  CheckCircle2,
  CheckCheck,
  Zap,
  Sparkles,
  X,
  ExternalLink,
  Filter,
  Calendar,
  AlertCircle,
} from 'lucide-react';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: string) => void;
  onSelectCourse?: (courseId: string) => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  isOpen,
  onClose,
  setActiveTab,
  onSelectCourse,
}) => {
  const {
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markNotificationAsUnread,
    markAllNotificationsAsRead,
  } = useApp();

  const [filterType, setFilterType] = useState<'all' | 'course' | 'task' | 'other'>('all');
  const [onlyUnread, setOnlyUnread] = useState<boolean>(false);

  if (!isOpen) return null;

  // Filter logic
  const filteredNotifications = notifications.filter((item) => {
    if (onlyUnread && item.isRead) return false;

    if (filterType === 'course') {
      return item.type === 'course_assigned';
    }
    if (filterType === 'task') {
      return item.type === 'task_deadline' || item.type === 'task_assigned';
    }
    if (filterType === 'other') {
      return item.type === 'mistake_review' || item.type === 'announcement';
    }
    return true;
  });

  const handleActionClick = (notif: AppNotification) => {
    markNotificationAsRead(notif.id);

    if (notif.courseId && onSelectCourse) {
      onSelectCourse(notif.courseId);
    } else if (notif.actionTab) {
      setActiveTab(notif.actionTab);
    }
    onClose();
  };

  const getUrgencyBadge = (notif: AppNotification) => {
    if (notif.daysRemaining !== undefined) {
      if (notif.daysRemaining < 0) {
        return (
          <span className="inline-flex items-center gap-1 bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
            <AlertTriangle className="w-3 h-3 text-rose-400" />
            <span>Muddati {Math.abs(notif.daysRemaining)} kun o'tgan!</span>
          </span>
        );
      }
      if (notif.daysRemaining === 0) {
        return (
          <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full animate-bounce">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>Bugun Oxirgi Kun!</span>
          </span>
        );
      }
      if (notif.daysRemaining === 1) {
        return (
          <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>Ertaga Tugaydi</span>
          </span>
        );
      }
      if (notif.daysRemaining <= 3) {
        return (
          <span className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
            <Clock className="w-3 h-3 text-blue-400" />
            <span>{notif.daysRemaining} kun qoldi</span>
          </span>
        );
      }
    }

    if (notif.type === 'course_assigned') {
      return (
        <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
          <BookOpen className="w-3 h-3 text-emerald-400" />
          <span>Yangi Kurs</span>
        </span>
      );
    }

    if (notif.type === 'mistake_review') {
      return (
        <span className="inline-flex items-center gap-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
          <Zap className="w-3 h-3 text-purple-400" />
          <span>Xatolar Banki</span>
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 bg-slate-700 text-slate-300 border border-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
        <Sparkles className="w-3 h-3 text-slate-400" />
        <span>E'lon</span>
      </span>
    );
  };

  const getIconAndStyle = (notif: AppNotification) => {
    if (notif.urgency === 'high') {
      return {
        bg: 'bg-rose-500/10 border-rose-500/30',
        iconBg: 'bg-rose-500/20 text-rose-400 border border-rose-500/40',
        icon: <AlertCircle className="w-4 h-4" />,
      };
    }
    if (notif.type === 'course_assigned') {
      return {
        bg: 'bg-emerald-500/10 border-emerald-500/30',
        iconBg: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40',
        icon: <BookOpen className="w-4 h-4" />,
      };
    }
    if (notif.type === 'task_deadline') {
      return {
        bg: 'bg-amber-500/10 border-amber-500/30',
        iconBg: 'bg-amber-500/20 text-amber-400 border border-amber-500/40',
        icon: <Clock className="w-4 h-4" />,
      };
    }
    return {
      bg: 'bg-blue-500/10 border-blue-500/30',
      iconBg: 'bg-blue-500/20 text-blue-400 border border-blue-500/40',
      icon: <Sparkles className="w-4 h-4" />,
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop click listener */}
      <div className="flex-1" onClick={onClose} />

      {/* Main Panel Content Container */}
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 text-slate-100 flex flex-col h-full shadow-2xl animate-slideLeft">
        {/* Panel Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/95 backdrop-blur flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-900/40">
              <Bell className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base tracking-tight text-white">Bildirishnomalar</h3>
                {unreadNotificationsCount > 0 && (
                  <span className="bg-rose-500 text-white text-xs font-black px-2 py-0.5 rounded-full shadow-sm">
                    {unreadNotificationsCount} yangi
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 font-medium">Tayinlangan kurslar va topshiriq muddatlari</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Tabs & Quick Actions */}
        <div className="p-3 bg-slate-950/60 border-b border-slate-800 space-y-2.5">
          {/* Category Tabs */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs font-bold">
            <button
              onClick={() => setFilterType('all')}
              className={`py-1.5 rounded-lg transition-all ${
                filterType === 'all'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              📌 Barchasi
            </button>
            <button
              onClick={() => setFilterType('course')}
              className={`py-1.5 rounded-lg transition-all ${
                filterType === 'course'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              📚 Kurslar
            </button>
            <button
              onClick={() => setFilterType('task')}
              className={`py-1.5 rounded-lg transition-all ${
                filterType === 'task'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ⏰ Topshiriq
            </button>
            <button
              onClick={() => setFilterType('other')}
              className={`py-1.5 rounded-lg transition-all ${
                filterType === 'other'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              💡 Boshqa
            </button>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between text-xs px-1 pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-300 font-medium hover:text-white select-none">
              <input
                type="checkbox"
                checked={onlyUnread}
                onChange={(e) => setOnlyUnread(e.target.checked)}
                className="w-3.5 h-3.5 rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-emerald-500"
              />
              <span>Faqat o'qilmaganlar ({unreadNotificationsCount})</span>
            </label>

            {unreadNotificationsCount > 0 && (
              <button
                onClick={markAllNotificationsAsRead}
                className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Barchasini o'qildi qilish</span>
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12 px-4 space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-base text-white">Xabarlar mavjud emas</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                {onlyUnread
                  ? "Barcha bildirishnomalar o'qilgan. Yangi o'quv modullari yoki topshiriqlar yuklatilganda shu yerda ko'rinadi."
                  : "Ushbu bo'limda bildirishnomalar topilmadi."}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notif) => {
              const { bg, iconBg, icon } = getIconAndStyle(notif);

              return (
                <div
                  key={notif.id}
                  className={`p-3.5 rounded-2xl border transition-all relative group ${
                    notif.isRead
                      ? 'bg-slate-800/40 border-slate-800/80 text-slate-300 opacity-80'
                      : `${bg} shadow-lg ring-1 ring-white/5 text-white`
                  }`}
                >
                  {/* Unread indicator dot */}
                  {!notif.isRead && (
                    <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-sm shadow-emerald-400/50 animate-pulse" />
                  )}

                  <div className="flex items-start gap-3">
                    {/* Icon Container */}
                    <div className={`p-2 rounded-xl shrink-0 ${iconBg}`}>
                      {icon}
                    </div>

                    <div className="flex-1 min-w-0 pr-4">
                      {/* Badge and Metadata */}
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        {getUrgencyBadge(notif)}
                        {notif.deadlineDate && (
                          <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-500" />
                            <span>{notif.deadlineDate}</span>
                          </span>
                        )}
                      </div>

                      {/* Title & Message */}
                      <h4 className="font-bold text-xs sm:text-sm text-white leading-snug">
                        {notif.title}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {notif.message}
                      </p>

                      {/* Card Action Buttons */}
                      <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-slate-700/50">
                        <button
                          onClick={() => handleActionClick(notif)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-emerald-950/40"
                        >
                          <span>
                            {notif.type === 'course_assigned'
                              ? 'Kursni Boshlash'
                              : notif.type === 'task_deadline'
                              ? 'Topshiriqni Ko\'rish'
                              : notif.type === 'mistake_review'
                              ? 'Xatolarni Yechish'
                              : 'Batafsil Ko\'rish'}
                          </span>
                          <ExternalLink className="w-3 h-3" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (notif.isRead) {
                              markNotificationAsUnread(notif.id);
                            } else {
                              markNotificationAsRead(notif.id);
                            }
                          }}
                          className="px-2 py-1 rounded-lg text-[11px] font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-colors"
                          title={notif.isRead ? "O'qilmagan deb belgilash" : "O'qilgan deb belgilash"}
                        >
                          {notif.isRead ? "O'qilmagan qilish" : "✓ O'qildi"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-950/80 border-t border-slate-800 text-center text-[11px] text-slate-400 font-medium">
          Hamkor LMS Bildirishnomalar Tizimi • iSpring Integratsiyasi
        </div>
      </div>
    </div>
  );
};
