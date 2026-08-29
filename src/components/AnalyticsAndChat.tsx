import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, StoreBranch, ChatChannel } from '../types';
import {
  BarChart3,
  MessageSquare,
  Send,
  Users,
  TrendingUp,
  Award,
  CheckCircle2,
  Building2,
  FileSpreadsheet,
  Download,
  Filter,
  Search,
  X,
  Eye,
  ChevronRight,
  Sparkles,
  BookOpen,
  Flame,
  RotateCcw,
  SlidersHorizontal,
  PieChart,
  ShieldCheck,
  Check,
  Info,
  Trash2,
  Edit3,
  Megaphone,
  HelpCircle,
  Globe,
  Store,
  Lock,
} from 'lucide-react';
import { LmsQASystem } from './LmsQASystem';

interface AnalyticsAndChatProps {
  initialTab?: 'analytics' | 'chat';
}

export const AnalyticsAndChat: React.FC<AnalyticsAndChatProps> = ({ initialTab = 'analytics' }) => {
  const {
    stores,
    users,
    courses,
    progressMap,
    certificates,
    channels,
    messages,
    activeChannelId,
    setActiveChannelId,
    sendChatMessage,
    deleteChatMessage,
    updateChatChannel,
    currentUser,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'analytics' | 'chat'>(initialTab);

  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);
  const [chatSubTab, setChatSubTab] = useState<'channels' | 'lms_qa'>('channels');
  const [inputText, setInputText] = useState('');
  const [channelSearchQuery, setChannelSearchQuery] = useState('');
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);
  const [msgReactions, setMsgReactions] = useState<{ [msgId: string]: { [emoji: string]: number } }>({
    'msg_1': { '👍': 4, '🔥': 2 },
    'msg_2': { '👏': 5, '❤️': 3 },
  });

  const handleAddReaction = (msgId: string, emoji: string) => {
    setMsgReactions((prev) => {
      const currentMsgReacts = prev[msgId] || {};
      const count = (currentMsgReacts[emoji] || 0) + 1;
      return {
        ...prev,
        [msgId]: {
          ...currentMsgReacts,
          [emoji]: count,
        },
      };
    });
  };

  // Store Chat Notice Edit State
  const [editingNotice, setEditingNotice] = useState(false);
  const [noticeInput, setNoticeInput] = useState('');

  // ---------------- ANALYTICS FILTERS STATE ----------------
  const [analyticsSubTab, setAnalyticsSubTab] = useState<'overview' | 'stores' | 'employees'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStoreFilter, setSelectedStoreFilter] = useState('all');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('all');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('all');
  const [selectedScoreFilter, setSelectedScoreFilter] = useState('all');

  // ---------------- MODALS STATE ----------------
  const [selectedStoreModal, setSelectedStoreModal] = useState<StoreBranch | null>(null);
  const [selectedUserModal, setSelectedUserModal] = useState<User | null>(null);

  // Available Chat Channels for current user
  const visibleChannels = channels.filter((chn) => {
    if (currentUser.role === 'admin') return true; // Admin sees all channels
    if (chn.type === 'public' || !chn.type) return true;
    if (chn.type === 'store') {
      return chn.storeId === currentUser.storeId; // Employees see their store chat
    }
    return true;
  });

  const currentChannel =
    visibleChannels.find((c) => c.id === activeChannelId) || visibleChannels[0] || channels[0];

  const channelMessages = messages.filter((m) => m.channelId === currentChannel?.id);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && !attachedFileName) return;
    const finalMsg = attachedFileName
      ? `📎 [Biriktirilgan Fayl: ${attachedFileName}]\n${inputText.trim()}`
      : inputText.trim();
    sendChatMessage(finalMsg);
    setInputText('');
    setAttachedFileName(null);
  };

  const handleSaveNotice = () => {
    if (currentChannel) {
      updateChatChannel(currentChannel.id, { rulesOrNotice: noticeInput.trim() });
      setEditingNotice(false);
    }
  };

  // Extract unique departments for filter
  const departments = Array.from(new Set(users.map((u) => u.department))).filter(Boolean);

  // Filtered Users Logic
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStore =
      selectedStoreFilter === 'all' || u.storeId === selectedStoreFilter;

    const matchesDept =
      selectedDeptFilter === 'all' || u.department === selectedDeptFilter;

    const matchesRole =
      selectedRoleFilter === 'all' || u.role === selectedRoleFilter;

    let matchesScore = true;
    if (selectedScoreFilter === 'high') matchesScore = u.points >= 1000;
    else if (selectedScoreFilter === 'mid') matchesScore = u.points >= 500 && u.points < 1000;
    else if (selectedScoreFilter === 'low') matchesScore = u.points < 500;

    return matchesSearch && matchesStore && matchesDept && matchesRole && matchesScore;
  });

  // Filtered Stores Logic
  const filteredStores = stores.filter((st) => {
    const matchesSearch =
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.managerName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStore =
      selectedStoreFilter === 'all' || st.id === selectedStoreFilter;

    return matchesSearch && matchesStore;
  });

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedStoreFilter('all');
    setSelectedDeptFilter('all');
    setSelectedRoleFilter('all');
    setSelectedScoreFilter('all');
  };

  // ---------------- EXCEL / CSV EXPORT FUNCTION ----------------
  const handleExportExcel = () => {
    if (currentUser.role !== 'admin') {
      showToast("Kechirasiz! Tizim tahliliy ma'lumotlarini yuklab olish faqat Tizim Ma'muri (Admin) uchun ruxsat etilgan.");
      return;
    }
    const today = new Date().toISOString().split('T')[0];
    
    // Build CSV string with UTF-8 BOM
    let csvContent = '\uFEFF';

    // Header 1: Overall Summary
    csvContent += "=== HAMKOR KORPORATIV TA'LIM WA ANALITIKA HISOBOTI ===\n";
    csvContent += `Sana: ${today}\n`;
    csvContent += `Jami Xodimlar: ${users.length}\n`;
    csvContent += `Jami Filiallar: ${stores.length}\n`;
    csvContent += `O'rtacha KPI Balli: 90.2%\n\n`;

    // Section 1: Store Branches
    csvContent += "=== DO'KON FILIALLARI TAHLILI ===\n";
    csvContent += "ID,Filial Nomi,Shahar,Manzil,Menejer,Xodimlar Soni,O'rtacha KPI Bali (%)\n";
    stores.forEach((st) => {
      const cleanName = st.name.replace(/,/g, ' ');
      const cleanCity = st.city.replace(/,/g, ' ');
      const cleanAddress = st.address.replace(/,/g, ' ');
      const cleanManager = st.managerName.replace(/,/g, ' ');
      csvContent += `${st.id},"${cleanName}","${cleanCity}","${cleanAddress}","${cleanManager}",${st.employeeCount},${st.averageScore}%\n`;
    });

    csvContent += "\n";

    // Section 2: Employee Individual Detailed Stats
    csvContent += "=== XODIMLAR SHAXSIY TA'LIM STATISTIKASI ===\n";
    csvContent += "ID,F.I.Sh,Email,Telefon,Rol,Lavozim,Bo'lim,Filial Nomi,To'plangan Ball,Zanjir (Kun),Tamomlangan Kurslar Soni,Nishonlar Soni,Tizimga Kirgan Sana\n";
    filteredUsers.forEach((u) => {
      const cleanName = u.name.replace(/,/g, ' ');
      const cleanEmail = u.email.replace(/,/g, ' ');
      const cleanPos = u.position.replace(/,/g, ' ');
      const cleanDept = u.department.replace(/,/g, ' ');
      const cleanStore = u.storeName.replace(/,/g, ' ');
      const completedCount = u.completedCourseIds?.length || 0;
      const badgeCount = u.badges?.length || 0;

      csvContent += `${u.id},"${cleanName}","${cleanEmail}","${u.phone || '-'}",${u.role},"${cleanPos}","${cleanDept}","${cleanStore}",${u.points},${u.streakDays},${completedCount},${badgeCount},${u.joinedDate}\n`;
    });

    // Create Download Blob
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Hamkor_Analitika_Statistika_${today}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Banner Navigation */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {activeTab === 'chat'
                  ? 'Muloqot va Ishchi Chat Markazi'
                  : 'Chuqur Statistika va Hisob-kitob Markazi'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {activeTab === 'chat'
                ? 'Korporativ Chat va LMS Muloqot'
                : 'Hamkor Analitika va Tizim Ko\'rsatkichlari'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {activeTab === 'chat'
                ? "Do'konlar, filiallar va xodimlar o'rtasida tezkor muloqot, rasmiy e'lonlar doskasi hamda LMS savol-javob forumi."
                : "Xar bir filial, xodim va bo'limlar kesimida chuqur statistik ma'lumotlarni kuzatib boring hamda ma'lumotlarni Excel formatida yuklab oling."}
            </p>
          </div>

          {activeTab === 'chat' ? (
            <div className="px-4 py-2.5 bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-2xl flex items-center gap-2.5 shadow-inner text-xs font-bold">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>{channels.length} ta aktiv kanal va muloqot guruhi</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 flex-wrap">
              {currentUser.role === 'admin' ? (
                <>
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 border border-slate-700 shadow-md transition-all shrink-0"
                  >
                    <Download className="w-4 h-4 text-indigo-400" />
                    <span>PDF Hisobot / Print</span>
                  </button>

                  <button
                    onClick={handleExportExcel}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-2 shadow-lg transition-all shrink-0"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Excel (.csv) Yuklab Olish</span>
                  </button>
                </>
              ) : (
                <div className="px-3.5 py-2 bg-slate-800/80 border border-slate-700/70 rounded-xl text-slate-400 text-xs font-semibold flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Hisobot yuklab olish faqat Admin uchun ruxsat etilgan</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* TAB 1: ANALYTICS & STATISTICAL INSIGHTS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                <span>Jami Xodimlar</span>
                <Users className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900">{users.length} kishi</div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% faol ta'limda</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                <span>Do'kon Filiallari</span>
                <Building2 className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-extrabold text-blue-600">{stores.length} ta filial</div>
              <p className="text-[11px] text-slate-400 font-medium">Barcha hududlarda mavjud</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                <span>O'rtacha KPI Bali</span>
                <TrendingUp className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl font-extrabold text-amber-600">90.2%</div>
              <p className="text-[11px] text-emerald-600 font-bold">+3.5% oylik o'sish</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                <span>Berilgan Sertifikatlar</span>
                <Award className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl font-extrabold text-purple-600">
                {certificates.length || 45} ta
              </div>
              <p className="text-[11px] text-purple-700 font-semibold">Muvaffaqiyatli topshirilgan</p>
            </div>
          </div>

          {/* FILTERS AND EXCEL EXPORT BAR */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-slate-900 text-base">
                  Filtrlar va Excel Boshqaruvi
                </h3>
              </div>

              {/* Excel Export Button */}
              <button
                onClick={handleExportExcel}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Umumiy Ma'lumotlarni Excel (.csv) Variantida Yuklab Olish</span>
                <Download className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Controls Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Search Bar */}
              <div className="lg:col-span-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Ism, filial, lavozim..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Store Filter */}
              <div>
                <select
                  value={selectedStoreFilter}
                  onChange={(e) => setSelectedStoreFilter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="all">Barcha Filiallar ({stores.length})</option>
                  {stores.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.name} ({st.city})
                    </option>
                  ))}
                </select>
              </div>

              {/* Department Filter */}
              <div>
                <select
                  value={selectedDeptFilter}
                  onChange={(e) => setSelectedDeptFilter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="all">Barcha Bo'limlar</option>
                  {departments.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Role Filter */}
              <div>
                <select
                  value={selectedRoleFilter}
                  onChange={(e) => setSelectedRoleFilter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="all">Barcha Rollar</option>
                  <option value="employee">Xodim (Sotuvchi)</option>
                  <option value="manager">Do'kon Menejeri</option>
                  <option value="trainer">O'quv Treneri</option>
                  <option value="admin">Tizim Ma'muri</option>
                </select>
              </div>

              {/* Score Level Filter */}
              <div>
                <select
                  value={selectedScoreFilter}
                  onChange={(e) => setSelectedScoreFilter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="all">Barcha Ball Darajalari</option>
                  <option value="high">Yuqori (1000+ ball)</option>
                  <option value="mid">O'rta (500-999 ball)</option>
                  <option value="low">Boshlang'ich (&lt;500 ball)</option>
                </select>
              </div>
            </div>

            {/* Active filters status & reset */}
            {(searchQuery ||
              selectedStoreFilter !== 'all' ||
              selectedDeptFilter !== 'all' ||
              selectedRoleFilter !== 'all' ||
              selectedScoreFilter !== 'all') && (
              <div className="flex items-center justify-between pt-2 text-xs text-slate-600 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                <span className="font-semibold text-emerald-800">
                  Filtr bo'yicha natijalar: {filteredUsers.length} ta xodim, {filteredStores.length} ta filial topildi
                </span>
                <button
                  onClick={resetFilters}
                  className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-lg border border-slate-200 flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-rose-500" />
                  <span>Filtrlarni Tozalash</span>
                </button>
              </div>
            )}
          </div>

          {/* Sub-Tabs for Detailed Analytics Views */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <button
              onClick={() => setAnalyticsSubTab('overview')}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                analyticsSubTab === 'overview'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span>Umumiy Filiallar va Reyting</span>
            </button>

            <button
              onClick={() => setAnalyticsSubTab('stores')}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                analyticsSubTab === 'stores'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Building2 className="w-4 h-4 text-blue-500" />
              <span>Har Bir Do'kon Statistikasi ({filteredStores.length})</span>
            </button>

            <button
              onClick={() => setAnalyticsSubTab('employees')}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                analyticsSubTab === 'employees'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Users className="w-4 h-4 text-purple-500" />
              <span>Har Bir Xodim Statistikasi ({filteredUsers.length})</span>
            </button>
          </div>

          {/* SUBTAB 1: OVERVIEW & GENERAL LEADERBOARD */}
          {analyticsSubTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Store Performance Bars */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span>Do'kon Filiallari O'zlashtirish Ko'rsatkichi (%)</span>
                  </h3>
                  <span className="text-xs font-bold text-slate-500">
                    O'rtacha: 90.2%
                  </span>
                </div>

                <div className="space-y-4">
                  {filteredStores.map((st) => (
                    <div
                      key={st.id}
                      className="p-3 bg-slate-50/70 rounded-2xl border border-slate-200/70 space-y-2 hover:bg-slate-100/80 transition-all cursor-pointer"
                      onClick={() => setSelectedStoreModal(st)}
                    >
                      <div className="flex items-center justify-between text-xs font-extrabold text-slate-900">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-blue-600" />
                          <span>{st.name} ({st.city})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-600 font-extrabold">{st.averageScore}%</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedStoreModal(st);
                            }}
                            className="px-2.5 py-1 bg-white hover:bg-slate-200 text-slate-700 font-bold rounded-lg border border-slate-200 text-[10px] flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3 text-blue-600" />
                            <span>Batafsil</span>
                          </button>
                        </div>
                      </div>

                      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-700"
                          style={{ width: `${st.averageScore}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>Menejer: <strong className="text-slate-800">{st.managerName}</strong></span>
                        <span>Xodimlar: <strong className="text-slate-800">{st.employeeCount} kishi</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leaderboard Top Performers */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Eng Yuqori Ball To'plaganlar</span>
                  </h3>
                </div>

                <div className="space-y-3">
                  {filteredUsers
                    .sort((a, b) => b.points - a.points)
                    .slice(0, 7)
                    .map((u, rank) => (
                      <div
                        key={u.id}
                        onClick={() => setSelectedUserModal(u)}
                        className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3 hover:border-emerald-300 transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center font-extrabold text-xs shrink-0 ${
                              rank === 0
                                ? 'bg-amber-400 text-slate-950 shadow-sm'
                                : rank === 1
                                ? 'bg-slate-300 text-slate-900'
                                : rank === 2
                                ? 'bg-amber-700 text-white'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {rank + 1}
                          </div>

                          <img
                            src={u.avatar}
                            alt={u.name}
                            className="w-10 h-10 rounded-xl object-cover ring-2 ring-slate-100 shrink-0"
                          />

                          <div className="min-w-0">
                            <h4 className="font-bold text-slate-900 text-xs truncate">{u.name}</h4>
                            <p className="text-[10px] text-emerald-600 font-medium truncate">{u.position}</p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-xs font-extrabold text-amber-600">{u.points} pt</div>
                          <div className="text-[10px] text-slate-400">{u.storeName}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* SUBTAB 2: PER-STORE DETAILED STATS GRID */}
          {analyticsSubTab === 'stores' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStores.map((st) => {
                const storeEmps = users.filter((u) => u.storeId === st.id);
                const avgPoints =
                  storeEmps.length > 0
                    ? Math.round(
                        storeEmps.reduce((acc, curr) => acc + curr.points, 0) / storeEmps.length
                      )
                    : 0;

                return (
                  <div
                    key={st.id}
                    className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between space-y-4 hover:shadow-md transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div>
                          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                            {st.city}
                          </span>
                          <h3 className="font-extrabold text-slate-900 text-base mt-1">{st.name}</h3>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-extrabold text-emerald-600">{st.averageScore}%</div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase">KPI Bali</div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-500">{st.address}</p>

                      <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                        <div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase">Menejer</div>
                          <div className="text-xs font-bold text-slate-900 truncate">{st.managerName}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase">Xodimlari</div>
                          <div className="text-xs font-bold text-blue-600">{storeEmps.length} kishi</div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-extrabold uppercase text-slate-400">
                          Filial Xodimlari Ro'yxati:
                        </span>
                        <div className="flex -space-x-2 overflow-hidden pt-1">
                          {storeEmps.slice(0, 5).map((e) => (
                            <img
                              key={e.id}
                              src={e.avatar}
                              alt={e.name}
                              title={`${e.name} (${e.position})`}
                              className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                            />
                          ))}
                          {storeEmps.length > 5 && (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-white text-[10px] font-extrabold ring-2 ring-white">
                              +{storeEmps.length - 5}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedStoreModal(st)}
                      className="w-full py-2.5 bg-slate-900 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
                    >
                      <Eye className="w-4 h-4 text-emerald-400" />
                      <span>Ushbu Do'kon Statistikasini To'liq Ko'rish</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* SUBTAB 3: PER-EMPLOYEE DETAILED STATS GRID */}
          {analyticsSubTab === 'employees' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((emp) => {
                const completedCount = emp.completedCourseIds?.length || 0;

                return (
                  <div
                    key={emp.id}
                    className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <img
                          src={emp.avatar}
                          alt={emp.name}
                          className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <h3 className="font-extrabold text-slate-900 text-sm truncate">{emp.name}</h3>
                          <p className="text-xs text-emerald-600 font-bold truncate">{emp.position}</p>
                          <p className="text-[11px] text-slate-400 truncate mt-0.5">{emp.storeName}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-2xl text-center border border-slate-100">
                        <div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase">Ball</div>
                          <div className="text-xs font-extrabold text-amber-600">{emp.points}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase">Kurslar</div>
                          <div className="text-xs font-extrabold text-emerald-600">{completedCount} ta</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase">Zanjir</div>
                          <div className="text-xs font-extrabold text-slate-800">{emp.streakDays} kun</div>
                        </div>
                      </div>

                      {emp.badges && emp.badges.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {emp.badges.map((b) => (
                            <span
                              key={b.id}
                              className="text-[10px] bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded-md border border-amber-200"
                            >
                              🏅 {b.title}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedUserModal(emp)}
                      className="w-full py-2.5 bg-slate-900 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
                    >
                      <Eye className="w-4 h-4 text-emerald-400" />
                      <span>Shaxsiy Statistikasini Ko'rish</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CORPORATE CHAT & LMS QA */}
      {activeTab === 'chat' && (
        <div className="space-y-6">
          {/* Subtabs for Chat vs LMS Q&A */}
          <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200/90 shadow-sm">
            <button
              onClick={() => setChatSubTab('channels')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 ${
                chatSubTab === 'channels'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Umumiy va Do'kon Chatlari</span>
            </button>

            <button
              onClick={() => setChatSubTab('lms_qa')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 ${
                chatSubTab === 'lms_qa'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-indigo-400" />
              <span>LMS Savol-Javob Baza</span>
            </button>
          </div>

          {chatSubTab === 'lms_qa' ? (
            <LmsQASystem />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 bg-white rounded-3xl border border-slate-200/90 shadow-lg overflow-hidden min-h-[600px]">
              {/* Channels Sidebar */}
              <div className="lg:col-span-1 border-r border-slate-200 p-4 space-y-4 bg-slate-50/80">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-500">
                    Mavjud Chat Kanallari
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {visibleChannels.length} ta
                  </span>
                </div>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Kanal qidirish..."
                    value={channelSearchQuery}
                    onChange={(e) => setChannelSearchQuery(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-2.5 py-1.5 text-[11px] text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1.5 max-h-[480px] overflow-y-auto">
                  {visibleChannels
                    .filter((chn) =>
                      chn.name.toLowerCase().includes(channelSearchQuery.toLowerCase()) ||
                      (chn.storeName && chn.storeName.toLowerCase().includes(channelSearchQuery.toLowerCase()))
                    )
                    .map((chn) => {
                    const isSelected = chn.id === currentChannel?.id;
                    const isPublic = chn.type === 'public' || !chn.type;

                    return (
                      <button
                        key={chn.id}
                        onClick={() => setActiveChannelId(chn.id)}
                        className={`w-full text-left p-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                          isSelected
                            ? 'bg-slate-900 text-white shadow-md'
                            : 'hover:bg-slate-200/60 text-slate-700'
                        }`}
                      >
                        {isPublic ? (
                          <Globe className={`w-4 h-4 shrink-0 ${isSelected ? 'text-emerald-400' : 'text-emerald-600'}`} />
                        ) : (
                          <Store className={`w-4 h-4 shrink-0 ${isSelected ? 'text-amber-400' : 'text-amber-600'}`} />
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="truncate">{chn.name}</div>
                          <div className={`text-[10px] font-normal truncate ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                            {isPublic ? 'Barcha Xodimlar' : `${chn.storeName || 'Filial'} Xodimlari`}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Messages Area */}
              <div className="lg:col-span-3 flex flex-col justify-between p-4 sm:p-6 space-y-4">
                {/* Active Channel Header */}
                <div className="pb-3 border-b border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-extrabold text-slate-900 text-base sm:text-lg">
                          {currentChannel?.name}
                        </h2>
                        {currentChannel?.type === 'store' && (
                          <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-md border border-amber-200">
                            Do'kon Chati
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{currentChannel?.description}</p>
                    </div>

                    {/* Notice Edit button for Store Director or Admin */}
                    {(currentUser.role === 'admin' ||
                      (currentUser.role === 'manager' && currentChannel?.storeId === currentUser.storeId)) && (
                      <button
                        onClick={() => {
                          setEditingNotice(!editingNotice);
                          setNoticeInput(currentChannel?.rulesOrNotice || '');
                        }}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                      >
                        <Megaphone className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{editingNotice ? 'Yopish' : "E'lon Tahrirlash"}</span>
                      </button>
                    )}
                  </div>

                  {/* Channel Notice Banner */}
                  {currentChannel?.rulesOrNotice && !editingNotice && (
                    <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-3 text-xs text-amber-900 flex items-start gap-2">
                      <Megaphone className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">E'lon / Bildirishnoma: </span>
                        <span>{currentChannel.rulesOrNotice}</span>
                      </div>
                    </div>
                  )}

                  {/* Notice Edit Form */}
                  {editingNotice && (
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                      <label className="block text-xs font-bold text-slate-700">
                        Do'kon Chatiga Muhim E'lon va Qoidalarni Kiriting:
                      </label>
                      <textarea
                        value={noticeInput}
                        onChange={(e) => setNoticeInput(e.target.value)}
                        placeholder="Masalan: Ertaga soat 09:00 da filial yig'ilishi bo'lib o'tadi..."
                        rows={2}
                        className="w-full bg-white p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingNotice(false)}
                          className="px-3 py-1 text-xs text-slate-500 font-semibold"
                        >
                          Bekor qilish
                        </button>
                        <button
                          onClick={handleSaveNotice}
                          className="px-4 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-sm"
                        >
                          Saqlash
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat Messages Log */}
                <div className="flex-1 space-y-4 overflow-y-auto max-h-[420px] p-2">
                  {channelMessages.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 text-xs">
                      Ushbu chat kanalida hali xabarlar yo'q. Birinchi xabarni yuboring!
                    </div>
                  ) : (
                    channelMessages.map((msg) => {
                      const isMe = msg.senderId === currentUser.id;
                      const canDeleteMsg =
                        isMe ||
                        currentUser.role === 'admin' ||
                        (currentUser.role === 'manager' && currentChannel?.storeId === currentUser.storeId);

                      return (
                        <div
                          key={msg.id}
                          className={`flex items-start gap-3 group ${
                            isMe ? 'flex-row-reverse' : ''
                          }`}
                        >
                          <img
                            src={msg.senderAvatar}
                            alt={msg.senderName}
                            className="w-9 h-9 rounded-xl object-cover ring-2 ring-slate-100 shrink-0"
                          />

                          <div className="flex items-center gap-1">
                            <div
                              className={`max-w-md space-y-1 p-3.5 rounded-2xl text-xs relative ${
                                isMe
                                  ? 'bg-emerald-600 text-white rounded-tr-none shadow-sm'
                                  : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/60'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-3 text-[10px] opacity-80 pb-0.5">
                                <span className="font-bold">{msg.senderName} ({msg.senderRole})</span>
                                <span>{msg.timestamp}</span>
                              </div>
                              <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>

                              {/* Message Reactions Bar */}
                              <div className="pt-1.5 flex flex-wrap items-center gap-1">
                                {['👍', '❤️', '🔥', '👏', '🎯'].map((emoji) => {
                                  const count = msgReactions[msg.id]?.[emoji] || 0;
                                  return (
                                    <button
                                      key={emoji}
                                      type="button"
                                      onClick={() => handleAddReaction(msg.id, emoji)}
                                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold border transition-transform active:scale-95 flex items-center gap-0.5 ${
                                        count > 0
                                          ? isMe
                                            ? 'bg-emerald-700/80 border-emerald-400 text-white'
                                            : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                                          : isMe
                                          ? 'bg-emerald-700/30 border-transparent text-emerald-100 hover:bg-emerald-700/60'
                                          : 'bg-slate-200/60 border-transparent text-slate-600 hover:bg-slate-200'
                                      }`}
                                    >
                                      <span>{emoji}</span>
                                      {count > 0 && <span>{count}</span>}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Delete Message button */}
                            {canDeleteMsg && (
                              <button
                                onClick={() => {
                                  if (confirm("Ushbu xabarni o'chirishni tasdiqlaysizmi?")) {
                                    deleteChatMessage(msg.id);
                                  }
                                }}
                                className="p-1 text-slate-300 hover:text-rose-600 transition-colors opacity-0 group-hover:opacity-100"
                                title="Xabarni o'chirish"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Attached file preview tag if present */}
                {attachedFileName && (
                  <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-between">
                    <span className="font-bold">📎 Biriktirildi: {attachedFileName}</span>
                    <button
                      type="button"
                      onClick={() => setAttachedFileName(null)}
                      className="text-rose-600 font-bold hover:underline text-[11px]"
                    >
                      Bekor qilish
                    </button>
                  </div>
                )}

                {/* Message Composer */}
                <form
                  onSubmit={handleSendMessage}
                  className="pt-3 border-t border-slate-100 flex items-center gap-2"
                >
                  <button
                    type="button"
                    onClick={() => {
                      const sampleFiles = ['Nizom_va_Standartlar.pdf', 'Sotuv_Hisoboti.png', 'Yangi_Aksiya.docx'];
                      const picked = sampleFiles[Math.floor(Math.random() * sampleFiles.length)];
                      setAttachedFileName(picked);
                    }}
                    className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors border border-slate-200"
                    title="Fayl yoki Rasm Biriktirish"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  </button>

                  <input
                    type="text"
                    placeholder={`${currentChannel?.name || 'Chat'} kanalida xabar yozing...`}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />

                  <button
                    type="submit"
                    disabled={!inputText.trim() && !attachedFileName}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 shrink-0 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">Yuborish</span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==================== MODAL 1: STORE DETAILED STATS ==================== */}
      {selectedStoreModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    {selectedStoreModal.name} — Filial Tahlili
                  </h3>
                  <p className="text-xs text-slate-500">{selectedStoreModal.city}, {selectedStoreModal.address}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedStoreModal(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Store KPI Dashboard */}
            <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
              <div>
                <div className="text-[10px] text-slate-400 font-extrabold uppercase">O'rtacha KPI Score</div>
                <div className="text-xl font-extrabold text-emerald-600">{selectedStoreModal.averageScore}%</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-extrabold uppercase">Do'kon Menejeri</div>
                <div className="text-xs font-bold text-slate-900 mt-1">{selectedStoreModal.managerName}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-extrabold uppercase">Xodimlar Soni</div>
                <div className="text-xl font-extrabold text-blue-600">
                  {users.filter((u) => u.storeId === selectedStoreModal.id).length} kishi
                </div>
              </div>
            </div>

            {/* Store Employees Table */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-xs text-slate-500 uppercase tracking-wider">
                Ushbu Filial Xodimlari va Ularning Ko'rsatkichlari
              </h4>

              <div className="space-y-2">
                {users
                  .filter((u) => u.storeId === selectedStoreModal.id)
                  .map((emp) => (
                    <div
                      key={emp.id}
                      className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={emp.avatar}
                          alt={emp.name}
                          className="w-10 h-10 rounded-xl object-cover ring-2 ring-white"
                        />
                        <div>
                          <h5 className="font-extrabold text-slate-900 text-xs">{emp.name}</h5>
                          <p className="text-[11px] text-emerald-600 font-semibold">{emp.position}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-right">
                        <div>
                          <div className="text-xs font-extrabold text-amber-600">{emp.points} pt</div>
                          <div className="text-[10px] text-slate-400">{emp.streakDays} kun zanjir</div>
                        </div>

                        <button
                          onClick={() => {
                            setSelectedStoreModal(null);
                            setSelectedUserModal(emp);
                          }}
                          className="p-1.5 bg-white hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200"
                          title="Xodim statistikasini ko'rish"
                        >
                          <Eye className="w-4 h-4 text-emerald-600" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedStoreModal(null)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL 2: EMPLOYEE INDIVIDUAL DETAILED STATS ==================== */}
      {selectedUserModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={selectedUserModal.avatar}
                  alt={selectedUserModal.name}
                  className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-500"
                />
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    {selectedUserModal.name}
                  </h3>
                  <p className="text-xs text-emerald-600 font-bold">{selectedUserModal.position}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedUserModal(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Info Details */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Filial</span>
                  <span className="font-extrabold text-slate-800">{selectedUserModal.storeName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Bo'lim</span>
                  <span className="font-extrabold text-slate-800">{selectedUserModal.department}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Email</span>
                  <span className="font-semibold text-slate-700 truncate block">{selectedUserModal.email}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Telefon</span>
                  <span className="font-semibold text-slate-700">{selectedUserModal.phone || '+998 90 123 45 67'}</span>
                </div>
              </div>

              {/* Learning stats */}
              <div className="grid grid-cols-3 gap-2 bg-gradient-to-r from-slate-900 to-slate-800 p-4 rounded-2xl text-white text-center">
                <div>
                  <div className="text-[10px] text-amber-300 font-bold uppercase">To'plangan Ball</div>
                  <div className="text-xl font-extrabold text-amber-400">{selectedUserModal.points}</div>
                </div>
                <div>
                  <div className="text-[10px] text-emerald-300 font-bold uppercase">Zanjir Kunlar</div>
                  <div className="text-xl font-extrabold text-emerald-400">{selectedUserModal.streakDays} kun</div>
                </div>
                <div>
                  <div className="text-[10px] text-purple-300 font-bold uppercase">Kurslar</div>
                  <div className="text-xl font-extrabold text-purple-300">
                    {selectedUserModal.completedCourseIds?.length || 0} ta
                  </div>
                </div>
              </div>

              {/* Earned Badges */}
              {selectedUserModal.badges && selectedUserModal.badges.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-extrabold text-slate-700 uppercase">
                    Egasiga Berilgan Nishonlar:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedUserModal.badges.map((badge) => (
                      <div
                        key={badge.id}
                        className="p-2 bg-amber-50 rounded-xl border border-amber-200 text-xs flex items-center gap-2"
                      >
                        <span className="text-base">🏅</span>
                        <div>
                          <div className="font-extrabold text-amber-900">{badge.title}</div>
                          <div className="text-[10px] text-amber-700">{badge.earnedDate}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedUserModal(null)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
