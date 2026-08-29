import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { AuthModal } from './AuthModal';
import {
  BookOpen,
  UserCheck,
  UserPlus,
  Bell,
  Search,
  Award,
  Zap,
  ChevronDown,
  Shield,
  Briefcase,
  GraduationCap,
  Sparkles,
  LogOut,
  KeyRound,
} from 'lucide-react';

import { NotificationPanel } from './NotificationPanel';

interface HeaderProps {
  onSearchChange?: (term: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSelectCourse?: (courseId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchChange, setActiveTab, onSelectCourse }) => {
  const { currentUser, switchUserRole, switchUserById, users, toastMessage, unreadNotificationsCount } = useApp();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');

  const openAuth = (tab: 'login' | 'register') => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
    setRoleDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-md">
      {/* Toast Alert Banner if present */}
      {toastMessage && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 text-sm text-center font-medium flex items-center justify-center gap-2 animate-fadeIn shadow-inner">
          <Sparkles className="w-4 h-4 animate-spin" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-900/30 font-bold text-xl tracking-wider border border-emerald-400/20">
            H
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                HAMKOR
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30 uppercase tracking-widest">
                LMS Portal
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">iSpring Korporativ Ta'lim Tizimi</p>
          </div>
        </div>

        {/* Global Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Kurslar, prezentatsiya va e'lonlarni qidirish..."
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700/80 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Right Action Icons & Role Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Register Button for Visitors */}
          <button
            onClick={() => openAuth('register')}
            className="hidden sm:flex items-center gap-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
          >
            <UserPlus className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ro'yxatdan O'tish</span>
          </button>

          {/* User Gamification Points */}
          <div
            onClick={() => setActiveTab('profile')}
            className="hidden lg:flex items-center gap-2 bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
            title="Hamkor Ballari"
          >
            <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Award className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-amber-400">{currentUser.points} ball</div>
              <div className="text-[10px] text-slate-400 flex items-center gap-0.5">
                <Zap className="w-2.5 h-2.5 text-emerald-400 fill-emerald-400" />
                <span>{currentUser.streakDays} kun zanjir</span>
              </div>
            </div>
          </div>

          {/* Notifications Dropdown Toggle */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(true)}
              className="relative p-2 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 transition-all border border-slate-700/50 shadow-sm"
              title="Xabarnomalar"
            >
              <Bell className="w-5 h-5 text-slate-200" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1 bg-rose-500 text-white text-[11px] font-black rounded-full flex items-center justify-center shadow-lg shadow-rose-900/50 animate-bounce">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Notification Panel Slide-over */}
            <NotificationPanel
              isOpen={notificationsOpen}
              onClose={() => setNotificationsOpen(false)}
              setActiveTab={setActiveTab}
              onSelectCourse={onSelectCourse}
            />
          </div>

          {/* User Account & Role Switcher Menu */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-200 transition-colors shadow-sm"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full object-cover border border-emerald-500/50"
              />
              <div className="text-left hidden sm:block">
                <div className="font-semibold text-white leading-none">{currentUser.name}</div>
                <div className="text-[10px] text-emerald-400 mt-0.5 leading-none">
                  {currentUser.position}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-2 z-50 text-slate-100">
                {/* Active User Header */}
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-700/80 mb-2 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Hozirgi Profil:
                    </p>
                    <p className="text-xs font-extrabold text-white">{currentUser.name}</p>
                    <p className="text-[10px] text-emerald-400 font-semibold">{currentUser.position}</p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('profile');
                      setRoleDropdownOpen(false);
                    }}
                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-lg"
                  >
                    Profil
                  </button>
                </div>

                <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Xodimlarni Almashtirish (Akkuntlar):
                </div>

                <div className="py-1 space-y-1 max-h-56 overflow-y-auto">
                  {users.map((u) => {
                    const isCurrent = u.id === currentUser.id;
                    return (
                      <button
                        key={u.id}
                        onClick={() => {
                          switchUserById(u.id);
                          setRoleDropdownOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-2 rounded-xl flex items-center justify-between transition-colors ${
                          isCurrent
                            ? 'bg-emerald-500/20 border border-emerald-500/40 text-white'
                            : 'hover:bg-slate-700/60 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={u.avatar}
                            alt={u.name}
                            className="w-7 h-7 rounded-lg object-cover shrink-0"
                          />
                          <div className="truncate">
                            <div className="text-xs font-bold truncate">{u.name}</div>
                            <div className="text-[10px] text-slate-400 truncate">{u.position}</div>
                          </div>
                        </div>

                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-900 text-slate-400 shrink-0">
                          {u.role === 'admin' ? 'Admin' : u.role === 'manager' ? 'Menejer' : u.role === 'trainer' ? 'Trener' : 'Xodim'}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-2 pt-2 border-t border-slate-700 flex items-center justify-between gap-2">
                  <button
                    onClick={() => openAuth('login')}
                    className="flex-1 py-1.5 bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                  >
                    <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                    <span>Akkuntlar</span>
                  </button>
                  <button
                    onClick={() => openAuth('register')}
                    className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Ro'yxatdan O'tish</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab={authModalTab}
      />
    </header>
  );
};

