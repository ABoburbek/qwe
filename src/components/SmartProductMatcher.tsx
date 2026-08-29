import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  SlidersHorizontal,
  Search,
  CheckCircle2,
  Tv,
  HelpCircle,
  Zap,
  Tag,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  PlusCircle,
  Edit,
  Trash2,
  X,
  Share2,
  Check,
} from 'lucide-react';
import { ProductMatcherItem } from '../types';

export const SmartProductMatcher: React.FC = () => {
  const { productMatchers, addProductMatcher, updateProductMatcher, deleteProductMatcher, currentUser, showToast } = useApp();

  const isManagerOrAdmin = ['admin', 'trainer', 'director', 'store_manager'].includes(currentUser.role);

  // Wizard State
  const [selectedCategory, setSelectedCategory] = useState<string>('tv');
  const [roomSize, setRoomSize] = useState<string>('all');
  const [budgetTier, setBudgetTier] = useState<string>('all');
  const [priorityFeature, setPriorityFeature] = useState<string>('all');
  const [familySize, setFamilySize] = useState<string>('all');

  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<ProductMatcherItem | null>(null);
  const [formCategory, setFormCategory] = useState<'tv' | 'fridge' | 'washer' | 'ac' | 'kitchen'>('tv');
  const [formName, setFormName] = useState('');
  const [formBrand, setFormBrand] = useState('');
  const [formPrice, setFormPrice] = useState(0);
  const [formRoomSize, setFormRoomSize] = useState('');
  const [formFamilySize, setFormFamilySize] = useState('');
  const [formKeyFeature, setFormKeyFeature] = useState('');
  const [formPitch, setFormPitch] = useState('');
  const [formImg, setFormImg] = useState('');

  const categoryOptions = [
    { id: 'tv', label: 'Televizorlar', icon: '📺' },
    { id: 'fridge', label: 'Muzlatgichlar', icon: '❄️' },
    { id: 'washer', label: 'Kir yuvish mashinalari', icon: '🧺' },
    { id: 'ac', label: 'Konditsionerlar', icon: '💨' },
    { id: 'kitchen', label: 'Oshxona texnikasi', icon: '🍳' },
  ];

  const filteredMatches = productMatchers.filter((item) => {
    if (item.category !== selectedCategory) return false;
    if (roomSize !== 'all' && item.roomSize && item.roomSize !== roomSize) return false;
    if (familySize !== 'all' && item.familySize && item.familySize !== familySize) return false;
    if (budgetTier !== 'all' && item.budgetTier !== budgetTier) return false;
    if (priorityFeature !== 'all' && item.keyFeature !== priorityFeature) return false;
    return true;
  });

  const handleCopyPitch = (item: ProductMatcherItem) => {
    const text = `🛍️ Hamkor Tavsiyasi: ${item.productName}\n💰 Narxi: ${item.price.toLocaleString('uz-UZ')} so'm\n⚡ Tavsiya sababi: ${item.whyRecommended}\n💡 Sotuvchi taklifi: "${item.salesPitch}"`;
    navigator.clipboard?.writeText(text);
    setCopiedId(item.id);
    showToast("Tavsiya matni va narx nusxalandi!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetFilters = () => {
    setRoomSize('all');
    setBudgetTier('all');
    setPriorityFeature('all');
    setFamilySize('all');
  };

  const openModal = (item?: ProductMatcherItem) => {
    if (item) {
      setEditingItem(item);
      setFormCategory(item.category);
      setFormName(item.productName);
      setFormBrand(item.brand);
      setFormPrice(item.price);
      setFormRoomSize(item.roomSize || '');
      setFormFamilySize(item.familySize || '');
      setFormKeyFeature(item.keyFeature);
      setFormPitch(item.salesPitch);
      setFormImg(item.imageUrl || '');
    } else {
      setEditingItem(null);
      setFormCategory('tv');
      setFormName('');
      setFormBrand('Samsung');
      setFormPrice(5500000);
      setFormRoomSize('20-30');
      setFormFamilySize('4-6');
      setFormKeyFeature('Smart 4K');
      setFormPitch("Ushbu model oilaviy tomosha va sifat uchun eng optimal variant.");
      setFormImg('https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&auto=format&fit=crop&q=80');
    }
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (editingItem) {
      updateProductMatcher(editingItem.id, {
        category: formCategory,
        productName: formName,
        brand: formBrand,
        price: Number(formPrice),
        roomSize: formRoomSize,
        familySize: formFamilySize,
        keyFeature: formKeyFeature,
        salesPitch: formPitch,
        imageUrl: formImg,
      });
    } else {
      addProductMatcher({
        id: `pm_${Date.now()}`,
        category: formCategory,
        productName: formName,
        brand: formBrand,
        price: Number(formPrice),
        budgetTier: Number(formPrice) > 8000000 ? 'premium' : Number(formPrice) > 4000000 ? 'mid' : 'budget',
        roomSize: formRoomSize,
        familySize: formFamilySize,
        keyFeature: formKeyFeature,
        whyRecommended: `${formBrand} brendining ommabop va ishonchli modeli`,
        salesPitch: formPitch,
        imageUrl: formImg || 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&auto=format&fit=crop&q=80',
      });
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Tezkor Texnika Tanlash Yordamchisi (Smart Matcher)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Mijoz Ehtiyojiga Qarab 3 Soniyada Aniq Modelni Tanlang
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Mijozning xona maydoni, byudjeti va talablarini belgilang. Tizim eng mos keladigan texnikani va uning do'kondagi asosiy sotuv argumentini chiqarib beradi.
          </p>
        </div>

        {isManagerOrAdmin && (
          <button
            onClick={() => openModal()}
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-2xl shadow-lg flex items-center gap-2 shrink-0 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Yangi Model Qo'shish</span>
          </button>
        )}
      </div>

      {/* Main Categories Switcher */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {categoryOptions.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                handleResetFilters();
              }}
              className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-950/30 font-bold scale-[1.02]'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs font-extrabold">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Matcher Filter Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
            <span>Mijozning Talab Mezonlari</span>
          </h3>
          <button
            onClick={handleResetFilters}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Filtrni Tozalash</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Byudjet */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1.5">Mijoz Byudjeti:</label>
            <select
              value={budgetTier}
              onChange={(e) => setBudgetTier(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 font-medium"
            >
              <option value="all">Barcha narx toifalari</option>
              <option value="budget">Hamyonbop (4 mln gacha)</option>
              <option value="mid">O'rta segment (4 - 8 mln)</option>
              <option value="premium">Premium (8 mln dan yuqori)</option>
            </select>
          </div>

          {/* Xona Maydoni (TV / AC) */}
          {(selectedCategory === 'tv' || selectedCategory === 'ac') && (
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1.5">Xona / Masofa Maydoni:</label>
              <select
                value={roomSize}
                onChange={(e) => setRoomSize(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 font-medium"
              >
                <option value="all">Barchasi</option>
                <option value="15-20">Kichik (15-20 kv.m / 2 metr)</option>
                <option value="20-30">O'rtacha (20-30 kv.m / 3 metr)</option>
                <option value="35+">Katta zal (35+ kv.m / 4+ metr)</option>
              </select>
            </div>
          )}

          {/* Oila a'zolari soni (Kir yuvish / Muzlatgich) */}
          {(selectedCategory === 'washer' || selectedCategory === 'fridge') && (
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1.5">Oila a'zolari soni:</label>
              <select
                value={familySize}
                onChange={(e) => setFamilySize(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 font-medium"
              >
                <option value="all">Barchasi</option>
                <option value="2-3">Kichik oila (2-3 kishi)</option>
                <option value="4-6">Katta oila (4-6 kishi)</option>
                <option value="7+">Ko'p kishilik xonadon (7+ kishi)</option>
              </select>
            </div>
          )}

          {/* Asosiy Afzallik */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1.5">Kutilayotgan Asosiy Funksiya:</label>
            <select
              value={priorityFeature}
              onChange={(e) => setPriorityFeature(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 font-medium"
            >
              <option value="all">Barcha parametrlar</option>
              <option value="Inverter / Kam Energiya">Inverter (Tejamkor)</option>
              <option value="Smart 4K / QLED">Smart 4K / Yuqori Tasvir</option>
              <option value="NoFrost / FreshZone">NoFrost / Oziq-ovqat yangiligi</option>
              <option value="Bug'da yuvish (Steam)">Bug'da tozalash (Steam)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Matched Products Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600 px-1">
          <span>Topilgan tavsiyalar: {filteredMatches.length} ta model</span>
          <span>⚡ Do'konda mavjud</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMatches.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between space-y-4 relative group"
            >
              <div className="space-y-3">
                {/* Image & Badges */}
                <div className="relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 aspect-video flex items-center justify-center">
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 flex items-center gap-1">
                    <span className="px-2 py-0.5 rounded-full bg-slate-900/80 text-white text-[10px] font-black uppercase">
                      {item.brand}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold">
                      {item.keyFeature}
                    </span>
                  </div>

                  {isManagerOrAdmin && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-1 rounded-xl shadow-sm">
                      <button
                        onClick={() => openModal(item)}
                        className="p-1 text-slate-500 hover:text-indigo-600 rounded"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("Ushbu modelni o'chirishni tasdiqlaysizmi?")) {
                            deleteProductMatcher(item.id);
                          }
                        }}
                        className="p-1 text-slate-500 hover:text-rose-600 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Name & Price */}
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 leading-snug line-clamp-2">
                    {item.productName}
                  </h4>
                  <div className="text-indigo-600 font-extrabold text-base mt-1">
                    {item.price.toLocaleString('uz-UZ')} so'm
                  </div>
                </div>

                {/* Match Criteria Badges */}
                <div className="flex items-center gap-2 text-[11px] text-slate-500 flex-wrap">
                  {item.roomSize && (
                    <span className="bg-slate-100 px-2 py-0.5 rounded-md font-medium">
                      📐 {item.roomSize} kv.m
                    </span>
                  )}
                  {item.familySize && (
                    <span className="bg-slate-100 px-2 py-0.5 rounded-md font-medium">
                      👨‍👩‍👧 {item.familySize} kishi
                    </span>
                  )}
                </div>

                {/* Pitch box */}
                <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-800 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-indigo-600" />
                    <span>Mijozga sotuv argumenti:</span>
                  </div>
                  <p className="text-xs text-indigo-950 font-medium leading-relaxed italic">
                    "{item.salesPitch}"
                  </p>
                </div>
              </div>

              {/* Copy Pitch Button */}
              <button
                onClick={() => handleCopyPitch(item)}
                className="w-full py-2.5 bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                {copiedId === item.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Nusxalandi!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Mijozga Taklifni Nusxalash</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Admin / Manager */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {editingItem ? "Modelni Tahrirlash" : "Yangi Model Qo'shish"}
                </h3>
              </div>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Toifa</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="tv">Televizorlar</option>
                  <option value="fridge">Muzlatgichlar</option>
                  <option value="washer">Kir yuvish mashinalari</option>
                  <option value="ac">Konditsionerlar</option>
                  <option value="kitchen">Oshxona texnikasi</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Model Nomi</label>
                  <input
                    type="text"
                    required
                    placeholder="Samsung 55' Crystal UHD"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Brend</label>
                  <input
                    type="text"
                    required
                    placeholder="Samsung / Artel / LG"
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Narxi (so'mda)</label>
                <input
                  type="number"
                  required
                  value={formPrice}
                  onChange={(e) => setFormPrice(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Xona hajmi (kv.m)</label>
                  <input
                    type="text"
                    placeholder="15-20 / 20-30 / 35+"
                    value={formRoomSize}
                    onChange={(e) => setFormRoomSize(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Oila a'zolari</label>
                  <input
                    type="text"
                    placeholder="2-3 / 4-6 / 7+"
                    value={formFamilySize}
                    onChange={(e) => setFormFamilySize(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Asosiy Ustunligi (Key Feature)</label>
                <input
                  type="text"
                  required
                  placeholder="Smart 4K / Inverter / NoFrost"
                  value={formKeyFeature}
                  onChange={(e) => setFormKeyFeature(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mijozga Aytiladigan Sotuv Pitchi</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Sotuvchi mijozga qanday tushuntirishi kerak..."
                  value={formPitch}
                  onChange={(e) => setFormPitch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Rasm URL</label>
                <input
                  type="text"
                  value={formImg}
                  onChange={(e) => setFormImg(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500"
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
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md"
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
