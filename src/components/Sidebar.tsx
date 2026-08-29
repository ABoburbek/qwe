import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Home,
  BookOpen,
  Briefcase,
  GraduationCap,
  Gamepad2,
  MessageSquare,
  BarChart3,
  Settings,
  User,
  Sparkles,
  Tv,
  ClipboardCheck,
  Coins,
  Compass,
  FileCheck,
  MessageSquareQuote,
  SlidersHorizontal,
  ChevronDown,
  ChevronRight,
  Layers,
  ShoppingBag,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { currentUser, mistakes, tasks } = useApp();

  // State to control collapse of group "O'quv & Rivojlanish"
  const [learningOpen, setLearningOpen] = useState(true);
  const [salesToolsOpen, setSalesToolsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const pendingMistakes = mistakes.filter(
    (m) => m.userId === currentUser.id && !m.isResolved
  ).length;

  const myPendingTasks = tasks.filter(
    (t) => t.assignedToUserId === currentUser.id && t.status !== 'Bajarildi'
  ).length;

  // Standalone top items
  const mainNavItems = [
    {
      id: 'home',
      label: 'Bosh Sahifa',
      icon: Home,
      badge: null,
      desc: 'Yangiliklar va Faxrli Xodimlar',
    },
  ];

  // Group 1: O'quv & Rivojlanish (Learning & Development)
  const learningGroupItems = [
    {
      id: 'courses',
      label: 'O\'quv Kurslari & Testlar',
      icon: BookOpen,
      badge: null,
      desc: 'Interaktiv modullar va imtihonlar',
    },
    {
      id: 'onboarding',
      label: '14-Kunlik Onboarding',
      icon: FileCheck,
      badge: 'Stajyor',
      badgeColor: 'bg-teal-600 text-white font-bold',
      desc: 'Yangi xodim yo\'l xaritasi',
    },
    {
      id: 'pdp',
      label: 'AI Smart PDP Xaritasi',
      icon: Compass,
      badge: 'Shaxsiy',
      badgeColor: 'bg-indigo-500 text-white font-bold',
      desc: 'Individual rivojlanish rejasi',
    },
    {
      id: 'rewards_store',
      label: 'Viktorina & Market (Coins)',
      icon: Coins,
      badge: '🔥 1-Minut',
      badgeColor: 'bg-amber-500 text-slate-950 font-extrabold',
      desc: 'Kunlik test va sovg\'alar',
    },
    {
      id: 'mistakes',
      label: 'Xatolar Ustida Ishlash',
      icon: Gamepad2,
      badge: pendingMistakes > 0 ? `${pendingMistakes}` : null,
      badgeColor: 'bg-amber-500 text-slate-950 font-bold',
      desc: 'O\'yin orqali xatolarni tuzatish',
    },
    {
      id: 'trainer',
      label: 'O\'quv Bo\'limi (L&D Hub)',
      icon: GraduationCap,
      badge: null,
      desc: 'Prezentatsiya va Test yaratish',
      visibleFor: ['trainer', 'admin'],
    },
  ];

  // Group 2: Savdo & Showroom Asboblari (Sales & Smart Tools)
  const salesGroupItems = [
    {
      id: 'sales_sim',
      label: 'AI Sotuv Trenajyori',
      icon: Sparkles,
      badge: '🎙️ AI Coach',
      badgeColor: 'bg-emerald-500 text-white font-bold',
      desc: 'Mijoz bilan interaktiv simulyatsiya',
    },
    {
      id: 'objections',
      label: 'E\'tirozlar Skript Bazasi',
      icon: MessageSquareQuote,
      badge: 'Baza',
      badgeColor: 'bg-rose-500 text-white font-bold',
      desc: 'Narx, kafolat va brend javoblari',
    },
    {
      id: 'matcher',
      label: 'Smart Texnika Tanlash',
      icon: SlidersHorizontal,
      badge: 'Tezkor',
      badgeColor: 'bg-indigo-500 text-white font-bold',
      desc: 'Ehtiyoj bo\'yicha model topish',
    },
    {
      id: 'cheat_sheet',
      label: 'Texnika & Smart QR Teglar',
      icon: Tv,
      badge: 'TOP',
      badgeColor: 'bg-indigo-500 text-white font-bold',
      desc: 'Model taqqoslash va QR shpargalka',
    },
  ];

  // Group 3: Boshqaruv & Aloqa (Management & Core)
  const bottomNavItems = [
    {
      id: 'manager',
      label: 'Do\'kon Rahbari Paneli',
      icon: Briefcase,
      badge: myPendingTasks > 0 ? `${myPendingTasks} vazifa` : null,
      badgeColor: 'bg-blue-500 text-white',
      desc: 'Xodimlar nazorati va vazifalar',
      visibleFor: ['manager', 'admin'],
    },
    {
      id: 'store_audit',
      label: 'Do\'kon Auditi & Standartlar',
      icon: ClipboardCheck,
      badge: null,
      desc: 'Rahbarlar uchun check-list',
      visibleFor: ['manager', 'admin', 'trainer'],
    },
    {
      id: 'chat',
      label: 'Muloqot va Chat',
      icon: MessageSquare,
      badge: '3',
      badgeColor: 'bg-emerald-500 text-white',
      desc: 'Do\'konlar va xodimlar muloqoti',
    },
    {
      id: 'analytics',
      label: 'Analitika va Hisobot',
      icon: BarChart3,
      badge: null,
      desc: 'Reytinglar va o\'zlashtirish',
    },
    {
      id: 'admin',
      label: 'Admin Panel',
      icon: Settings,
      badge: null,
      desc: 'Tizim va sayt ma\'lumotlari',
      visibleFor: ['admin'],
    },
    {
      id: 'profile',
      label: 'Shaxsiy Profil',
      icon: User,
      badge: null,
      desc: 'Mening sertifikatlarim va ballarim',
    },
  ];

  const renderNavButton = (item: any, isSubItem: boolean = false) => {
    if (item.visibleFor && !item.visibleFor.includes(currentUser.role)) {
      return null;
    }

    const Icon = item.icon;
    const isActive = activeTab === item.id;

    return (
      <button
        key={item.id}
        onClick={() => setActiveTab(item.id)}
        className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-all ${
          isActive
            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-md shadow-emerald-950/40'
            : isSubItem
            ? 'hover:bg-slate-800/90 text-slate-300 hover:text-white bg-slate-900/40 ml-1 border-l-2 border-slate-700/60 pl-3.5'
            : 'hover:bg-slate-800 text-slate-300 hover:text-white'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
          <div className="truncate">
            <div className="text-xs font-semibold truncate">{item.label}</div>
            <div className={`text-[10px] truncate ${isActive ? 'text-emerald-100' : 'text-slate-400'}`}>
              {item.desc}
            </div>
          </div>
        </div>

        {item.badge && (
          <span
            className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
              item.badgeColor || 'bg-slate-700 text-slate-200'
            }`}
          >
            {item.badge}
          </span>
        )}
      </button>
    );
  };

  const isLearningActive = learningGroupItems.some((i) => i.id === activeTab);
  const isSalesActive = salesGroupItems.some((i) => i.id === activeTab);

  return (
    <aside className="w-full lg:w-72 bg-slate-900 border-r border-slate-800 text-slate-300 p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-3">
        {/* User Mini Identity Card */}
        <div
          onClick={() => setActiveTab('profile')}
          className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500/50 cursor-pointer transition-all flex items-center gap-3 shadow-sm"
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-11 h-11 rounded-xl object-cover ring-2 ring-emerald-500/30 shrink-0"
          />
          <div className="overflow-hidden">
            <div className="text-sm font-bold text-white truncate">{currentUser.name}</div>
            <div className="text-xs text-emerald-400 font-medium truncate">{currentUser.position}</div>
            <div className="text-[10px] text-slate-400 truncate mt-0.5">{currentUser.storeName}</div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {/* Main Items */}
          {mainNavItems.map((item) => renderNavButton(item))}

          {/* GROUP 1: O'quv & Rivojlanish (Collapsible) */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setLearningOpen(!learningOpen)}
              className={`w-full px-3 py-2 rounded-xl flex items-center justify-between text-xs font-bold uppercase tracking-wider transition-colors ${
                isLearningActive
                  ? 'bg-slate-800/90 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>O'quv & Rivojlanish</span>
              </div>
              <div className="flex items-center gap-1.5">
                {pendingMistakes > 0 && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                )}
                {learningOpen ? (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                )}
              </div>
            </button>

            {learningOpen && (
              <div className="mt-1 space-y-1 pl-1 border-l border-slate-800 ml-2">
                {learningGroupItems.map((item) => renderNavButton(item, true))}
              </div>
            )}
          </div>

          {/* GROUP 2: Savdo & Showroom Asboblari (Collapsible) */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setSalesToolsOpen(!salesToolsOpen)}
              className={`w-full px-3 py-2 rounded-xl flex items-center justify-between text-xs font-bold uppercase tracking-wider transition-colors ${
                isSalesActive
                  ? 'bg-slate-800/90 text-indigo-400 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-indigo-400" />
                <span>Savdo & Showroom</span>
              </div>
              <div>
                {salesToolsOpen ? (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                )}
              </div>
            </button>

            {salesToolsOpen && (
              <div className="mt-1 space-y-1 pl-1 border-l border-slate-800 ml-2">
                {salesGroupItems.map((item) => renderNavButton(item, true))}
              </div>
            )}
          </div>

          {/* Bottom Items (Management, Chat, Analytics, etc.) */}
          <div className="pt-2 border-t border-slate-800/80 space-y-1">
            <div className="px-3 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Boshqaruv & Aloqa
            </div>
            {bottomNavItems.map((item) => renderNavButton(item))}
          </div>
        </nav>
      </div>

      {/* iSpring Quality Banner */}
      <div className="mt-4 p-3 rounded-xl bg-gradient-to-br from-slate-800 to-slate-800/60 border border-slate-700/80 text-center">
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-400 mb-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Hamkor Academy 2026</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-tight">
          iSpring prezentatsiyalar, AI trenajyor va yagona bilimlar ekotizimi.
        </p>
      </div>
    </aside>
  );
};
