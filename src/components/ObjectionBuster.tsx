import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageSquareQuote,
  Search,
  Copy,
  Check,
  Tag,
  Sparkles,
  ShieldCheck,
  Lightbulb,
  Zap,
  TrendingUp,
  Filter,
  DollarSign,
  Award,
  BookOpen,
  ChevronDown,
  ChevronUp,
  PlusCircle,
  Edit,
  Trash2,
  X,
  Volume2,
} from 'lucide-react';
import { ObjectionScript } from '../types';

export const ObjectionBuster: React.FC = () => {
  const { objectionScripts, addObjectionScript, updateObjectionScript, deleteObjectionScript, currentUser, showToast } = useApp();

  const isManagerOrAdmin = ['admin', 'trainer', 'director', 'store_manager'].includes(currentUser.role);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(objectionScripts[0]?.id || null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modal State for Admin / Trainer
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<ObjectionScript | null>(null);
  const [formCustomerObjection, setFormCustomerObjection] = useState('');
  const [formCategory, setFormCategory] = useState<'price' | 'warranty' | 'brand' | 'credit' | 'hesitation'>('price');
  const [formDifficulty, setFormDifficulty] = useState<'Oson' | "O'rta" | 'Qiyin'>("O'rta");
  const [formShortAnswer, setFormShortAnswer] = useState('');
  const [formDetailedScript, setFormDetailedScript] = useState('');
  const [formPsychologyTip, setFormPsychologyTip] = useState('');

  const categories = [
    { id: 'all', label: 'Barcha E\'tirozlar', icon: Sparkles },
    { id: 'price', label: 'Narx va Chegirma', icon: DollarSign },
    { id: 'warranty', label: 'Kafolat va Servis', icon: ShieldCheck },
    { id: 'brand', label: 'Brend va Sifat', icon: Award },
    { id: 'credit', label: 'Nasiya / To\'lov', icon: Tag },
    { id: 'hesitation', label: 'Ikkilanish va O\'ylash', icon: Lightbulb },
  ];

  const filteredScripts = objectionScripts.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery =
      item.customerObjection.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortQuickAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.detailedScript.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    showToast("Skript nusxalandi! Savdoda qo'llang.");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openModal = (script?: ObjectionScript) => {
    if (script) {
      setEditingItem(script);
      setFormCustomerObjection(script.customerObjection);
      setFormCategory(script.category);
      setFormDifficulty(script.difficulty);
      setFormShortAnswer(script.shortQuickAnswer);
      setFormDetailedScript(script.detailedScript);
      setFormPsychologyTip(script.psychologyTip);
    } else {
      setEditingItem(null);
      setFormCustomerObjection('');
      setFormCategory('price');
      setFormDifficulty("O'rta");
      setFormShortAnswer('');
      setFormDetailedScript('');
      setFormPsychologyTip('');
    }
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCustomerObjection.trim() || !formDetailedScript.trim()) return;

    if (editingItem) {
      updateObjectionScript(editingItem.id, {
        customerObjection: formCustomerObjection,
        category: formCategory,
        difficulty: formDifficulty,
        shortQuickAnswer: formShortAnswer,
        detailedScript: formDetailedScript,
        psychologyTip: formPsychologyTip,
      });
    } else {
      addObjectionScript({
        id: `obj_${Date.now()}`,
        customerObjection: formCustomerObjection,
        category: formCategory,
        difficulty: formDifficulty,
        shortQuickAnswer: formShortAnswer,
        detailedScript: formDetailedScript,
        psychologyTip: formPsychologyTip,
        tags: [formCategory, 'savdo_skript'],
      });
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold">
            <MessageSquareQuote className="w-4 h-4" />
            <span>Mijoz E'tirozlari & Skriptlar Kutubxonasi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Sotuvdagi 100% Sinovdan O'tgan Javob Skriptlari
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            "Qimmat", "O'ylab ko'ray", "Bozorda arzonroq" kabi eng og'ir vaziyatlarda mijozni yo'qotmasdan, e'tirozni ishonchga aylantiruvchi professional yechimlar.
          </p>
        </div>

        {isManagerOrAdmin && (
          <button
            onClick={() => openModal()}
            className="px-5 py-3 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs rounded-2xl shadow-lg flex items-center gap-2 shrink-0 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Yangi Skript Qo'shish</span>
          </button>
        )}
      </div>

      {/* Search & Categories Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Mijoz e'tirozi yoki skript matni bo'yicha tezkor qidiruv..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-950/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Scripts List */}
      <div className="space-y-4">
        {filteredScripts.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
            <MessageSquareQuote className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">Hech qanday skript topilmadi</h3>
            <p className="text-xs text-slate-500">Qidiruv so'zini o'zgartirib ko'ring yoki boshqa toifani tanlang.</p>
          </div>
        ) : (
          filteredScripts.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm ${
                  isExpanded ? 'border-rose-300 ring-2 ring-rose-500/10' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Header / Clickable summary */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-black uppercase tracking-wider">
                        {item.category.toUpperCase()}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.difficulty === 'Oson'
                            ? 'bg-emerald-50 text-emerald-700'
                            : item.difficulty === 'Qiyin'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-blue-50 text-blue-700'
                        }`}
                      >
                        {item.difficulty}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                      🗣️ "{item.customerObjection}"
                    </h3>

                    {!isExpanded && (
                      <p className="text-xs text-slate-500 line-clamp-1 italic">
                        ⚡ Tezkor javob: {item.shortQuickAnswer}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isManagerOrAdmin && (
                      <div className="flex items-center gap-1 mr-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => openModal(item)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm("Ushbu skriptni o'chirishni tasdiqlaysizmi?")) {
                              deleteObjectionScript(item.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Detailed Script & Psychological Tips */}
                {isExpanded && (
                  <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-slate-100 space-y-4 bg-slate-50/50">
                    {/* Quick Formula Badge */}
                    <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
                      <div className="text-[11px] font-bold text-emerald-800 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-emerald-600" />
                        <span>10-Soniyalik Tezkor Javob (Ekspress):</span>
                      </div>
                      <p className="text-xs font-semibold text-emerald-950 leading-relaxed">
                        "{item.shortQuickAnswer}"
                      </p>
                    </div>

                    {/* Full Professional Script */}
                    <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 shadow-sm relative">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-rose-600" />
                          <span>To'liq Ishonarli Skript (Ketma-ketlik):</span>
                        </span>
                        <button
                          onClick={() => handleCopy(item.id, item.detailedScript)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                        >
                          {copiedId === item.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-600">Nusxalandi!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Nusxalash</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line font-medium">
                        {item.detailedScript}
                      </p>
                    </div>

                    {/* Psychology Tips */}
                    <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl space-y-1">
                      <div className="text-[11px] font-bold text-amber-800 flex items-center gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                        <span>Mijoz Psixologiyasi & Muhim Qoida:</span>
                      </div>
                      <p className="text-xs text-amber-950 leading-relaxed font-medium">
                        {item.psychologyTip}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Modal for Admin / Trainer */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MessageSquareQuote className="w-5 h-5 text-rose-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {editingItem ? "Skriptni Tahrirlash" : "Yangi E'tiroz Skripti Qo'shish"}
                </h3>
              </div>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mijoz E'tirozi (Savoli)</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: 'Bozorda bundan ancha arzon ekan...'"
                  value={formCustomerObjection}
                  onChange={(e) => setFormCustomerObjection(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Toifa (Category)</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="price">Narx va Chegirma</option>
                    <option value="warranty">Kafolat va Servis</option>
                    <option value="brand">Brend va Sifat</option>
                    <option value="credit">Nasiya va To'lov</option>
                    <option value="hesitation">Ikkilanish</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Murakkabligi</label>
                  <select
                    value={formDifficulty}
                    onChange={(e) => setFormDifficulty(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="Oson">Oson</option>
                    <option value="O'rta">O'rta</option>
                    <option value="Qiyin">Qiyin</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tezkor Qisqa Javob (10 soniya)</label>
                <input
                  type="text"
                  required
                  placeholder="Qisqa va ta'sirchan birinchi jumla..."
                  value={formShortAnswer}
                  onChange={(e) => setFormShortAnswer(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">To'liq Professional Skript</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Mijoz bilan bosqichma-bosqich suhbat skripti..."
                  value={formDetailedScript}
                  onChange={(e) => setFormDetailedScript(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mijoz Psixologiyasi & Maslahat</label>
                <input
                  type="text"
                  required
                  placeholder="Sotuvchi ushbu holatda qanday pozitsiyada turishi kerak..."
                  value={formPsychologyTip}
                  onChange={(e) => setFormPsychologyTip(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Bekor Qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
