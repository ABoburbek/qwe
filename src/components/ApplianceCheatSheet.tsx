import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Tv,
  QrCode,
  Search,
  CheckCircle2,
  HelpCircle,
  Zap,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Flame,
  Layers,
  Info,
  Printer,
  Share2,
  Copy,
  Check,
  Tag,
  ExternalLink,
  Smartphone,
  Eye,
} from 'lucide-react';
import { ApplianceSpec } from '../types';

export const ApplianceCheatSheet: React.FC = () => {
  const { applianceSpecs, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'comparator' | 'qr_generator'>('comparator');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSpecForQR, setSelectedSpecForQR] = useState<ApplianceSpec | null>(applianceSpecs[0] || null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [qrModalOpen, setQrModalOpen] = useState<boolean>(false);

  const filteredData = (applianceSpecs || []).filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const modelAName = typeof item.modelA === 'object' && item.modelA ? item.modelA.name : String(item.modelA || '');
    const modelBName = typeof item.modelB === 'object' && item.modelB ? item.modelB.name : String(item.modelB || '');
    const catLabel = item.categoryLabel || item.category || '';
    const matchesQuery =
      modelAName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      modelBName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      catLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customerObjection.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handlePrintTag = () => {
    window.print();
    showToast("Narxnoma va QR-kod chop etish oynasiga yuborildi!");
  };

  const handleCopyTagData = (spec: ApplianceSpec) => {
    const modelA = typeof spec.modelA === 'object' ? spec.modelA.name : spec.modelA;
    const text = `🏷️ Hamkor Do'koni | ${modelA}\n⚡ Asosiy farq: ${spec.keyDifference}\n💡 Sotuvchi pitchi: ${spec.bestSalesPitch || spec.salesPitch || ''}`;
    navigator.clipboard?.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
    showToast("Ma'lumot nusxalandi!");
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold mb-2">
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>Sotuvchi va Konsultant Shpargalkasi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Texnika Taqqoslagich & Smart QR Ko'rgazma Rastasi
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Mijoz do'konda so'raganda 3 soniyada to'g'ri modelni tavsiya qiling, e'tirozlarni professional qaytaring hamda ko'rgazma stendlari uchun Smart QR-kodli rasmiy narxnoma teglari yarating.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 shrink-0">
          <button
            onClick={() => setActiveTab('comparator')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'comparator'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tv className="w-4 h-4" />
            <span>Taqqoslagich & E'tirozlar</span>
          </button>

          <button
            onClick={() => setActiveTab('qr_generator')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'qr_generator'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Smart QR Ko'rgazma Teglari</span>
          </button>
        </div>
      </div>

      {/* TAB 1: COMPARATOR & OBJECTIONS */}
      {activeTab === 'comparator' && (
        <div className="space-y-6">
          {/* Filter and Search Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {[
                { id: 'all', label: 'Barcha Toifalar' },
                { id: 'tv', label: 'Televizorlar' },
                { id: 'washers', label: 'Kir Yuvish' },
                { id: 'fridge', label: 'Muzlatgichlar' },
                { id: 'ac', label: 'Konditsionerlar' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Model, brend yoki e'tiroz qidiring..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium transition-all"
              />
            </div>
          </div>

          {/* Specs List */}
          <div className="grid grid-cols-1 gap-6">
            {filteredData.map((spec) => {
              const modelA = typeof spec.modelA === 'object' ? spec.modelA : { name: spec.modelA, brand: 'Brend A', specs: [], pros: [], priceUzs: 0, image: '' };
              const modelB = typeof spec.modelB === 'object' ? spec.modelB : { name: spec.modelB, brand: 'Brend B', specs: [], pros: [], priceUzs: 0, image: '' };

              return (
                <div
                  key={spec.id}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  {/* Category & Badge Header */}
                  <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs">
                        {spec.categoryLabel || spec.category}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">Model Taqqoslash & E'tirozlar</span>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedSpecForQR(spec);
                        setActiveTab('qr_generator');
                      }}
                      className="inline-flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-700 font-bold px-2.5 py-1 rounded-lg hover:bg-indigo-50 transition-colors"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Smart QR Narxnoma Tayyorlash</span>
                    </button>
                  </div>

                  {/* Comparison Body: Model A vs Model B */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                      {/* Model A Card */}
                      <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/30 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-100/80 px-2 py-0.5 rounded">
                              {modelA.brand || 'Variant 1'}
                            </span>
                            <h3 className="font-bold text-slate-900 text-sm mt-1">{modelA.name}</h3>
                          </div>
                          {modelA.priceUzs ? (
                            <span className="text-xs font-mono font-bold text-indigo-900 shrink-0 bg-white px-2 py-1 rounded-lg border border-indigo-200">
                              {modelA.priceUzs.toLocaleString('uz-UZ')} so'm
                            </span>
                          ) : null}
                        </div>

                        {modelA.specs && modelA.specs.length > 0 && (
                          <div className="space-y-1.5 pt-1">
                            <span className="text-[11px] font-bold text-slate-500 uppercase">Texnik Xususiyatlar:</span>
                            <ul className="space-y-1 text-xs text-slate-700">
                              {modelA.specs.map((s, idx) => (
                                <li key={idx} className="flex items-center gap-1.5">
                                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                  <span>{s}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {modelA.pros && modelA.pros.length > 0 && (
                          <div className="p-2.5 bg-emerald-50/70 border border-emerald-100 rounded-lg text-xs text-emerald-900 space-y-1">
                            <span className="font-bold text-[11px] flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-emerald-600" />
                              Asosiy Afzalliklari:
                            </span>
                            {modelA.pros.map((p, idx) => (
                              <p key={idx} className="text-[11px] leading-tight">• {p}</p>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Model B Card */}
                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600 bg-slate-200 px-2 py-0.5 rounded">
                              {modelB.brand || 'Variant 2'}
                            </span>
                            <h3 className="font-bold text-slate-900 text-sm mt-1">{modelB.name}</h3>
                          </div>
                          {modelB.priceUzs ? (
                            <span className="text-xs font-mono font-bold text-slate-900 shrink-0 bg-white px-2 py-1 rounded-lg border border-slate-200">
                              {modelB.priceUzs.toLocaleString('uz-UZ')} so'm
                            </span>
                          ) : null}
                        </div>

                        {modelB.specs && modelB.specs.length > 0 && (
                          <div className="space-y-1.5 pt-1">
                            <span className="text-[11px] font-bold text-slate-500 uppercase">Texnik Xususiyatlar:</span>
                            <ul className="space-y-1 text-xs text-slate-700">
                              {modelB.specs.map((s, idx) => (
                                <li key={idx} className="flex items-center gap-1.5">
                                  <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                  <span>{s}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {modelB.pros && modelB.pros.length > 0 && (
                          <div className="p-2.5 bg-blue-50/70 border border-blue-100 rounded-lg text-xs text-blue-900 space-y-1">
                            <span className="font-bold text-[11px] flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-blue-600" />
                              Asosiy Afzalliklari:
                            </span>
                            {modelB.pros.map((p, idx) => (
                              <p key={idx} className="text-[11px] leading-tight">• {p}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Key Technical Difference & Secret Sales Rebuttal */}
                    <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Key Difference */}
                      <div className="bg-amber-50/80 border border-amber-200/70 rounded-xl p-3.5 text-xs text-amber-950 space-y-1">
                        <div className="font-bold flex items-center gap-1.5 text-amber-800 text-xs uppercase tracking-wide">
                          <Layers className="w-3.5 h-3.5" />
                          <span>3 Soniyada Asosiy Farqni Tushuntirish:</span>
                        </div>
                        <p className="leading-relaxed font-medium">{spec.keyDifference}</p>
                      </div>

                      {/* Customer Objection Rebuttal */}
                      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-xl p-3.5 text-xs space-y-1.5 shadow-sm">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-amber-300 flex items-center gap-1 text-[11px] uppercase tracking-wide">
                            <HelpCircle className="w-3.5 h-3.5" />
                            Xaridor E'tirozi: {spec.customerObjection}
                          </span>
                        </div>
                        <p className="text-slate-200 leading-relaxed text-xs">
                          <strong className="text-emerald-400 font-bold">💡 Kuchli Sotuvchi Pitchi: </strong>
                          "{spec.bestSalesPitch || spec.salesPitch}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: SMART QR SHOWROOM TAGS */}
      {activeTab === 'qr_generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Model Selector */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-indigo-600" />
                  <span>Ko'rgazma Texnikasini Tanlang</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Do'kon vitrinasi va stendlari uchun Smart QR narxnoma stikerini generatsiya qiling.
                </p>
              </div>

              <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
                {applianceSpecs.map((spec) => {
                  const modelAName = typeof spec.modelA === 'object' ? spec.modelA.name : spec.modelA;
                  const isSelected = selectedSpecForQR?.id === spec.id;

                  return (
                    <button
                      key={spec.id}
                      onClick={() => setSelectedSpecForQR(spec)}
                      className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-indigo-50/80 border-indigo-500 ring-2 ring-indigo-500/20'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80'
                      }`}
                    >
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase text-indigo-600 bg-indigo-100/80 px-2 py-0.5 rounded">
                          {spec.categoryLabel || spec.category}
                        </span>
                        <h4 className="font-bold text-xs text-slate-900 truncate mt-1">{modelAName}</h4>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">{spec.keyDifference}</p>
                      </div>
                      <ArrowRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Printable Smart QR Tag Preview */}
          <div className="lg:col-span-7 space-y-4">
            {selectedSpecForQR ? (
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-lg space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Ko'rgazma Narxnomasi Preview
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                      Vitrina Smart QR Narxnoma Teg
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyTagData(selectedSpecForQR)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? 'Nusxalandi!' : 'Pitch Nusxalash'}</span>
                    </button>

                    <button
                      onClick={handlePrintTag}
                      className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white flex items-center gap-1.5 shadow-md transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Chop Etish (Print)</span>
                    </button>
                  </div>
                </div>

                {/* The Physical Tag Replica */}
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 bg-gradient-to-b from-white to-slate-50 shadow-inner max-w-md mx-auto space-y-4 text-center">
                  {/* Brand Tag Top */}
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-sm">
                        H
                      </div>
                      <span className="font-extrabold text-slate-900 tracking-tight text-sm">HAMKOR RETAIL</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                      Rasmiy Kafolat 100%
                    </span>
                  </div>

                  {/* QR Code SVG / Visual */}
                  <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-slate-200 shadow-sm mx-auto w-48 h-48 space-y-2">
                    <div className="w-36 h-36 bg-slate-900 p-2 rounded-lg flex items-center justify-center text-white relative">
                      <QrCode className="w-32 h-32 text-white" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 border-2 border-white flex items-center justify-center text-white text-[10px] font-black shadow-md">
                          H
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                    Smartfon kamerasi orqali skanerlang
                  </p>

                  {/* Product Details on the Tag */}
                  <div className="text-left bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold text-indigo-600 uppercase">
                          {selectedSpecForQR.categoryLabel || selectedSpecForQR.category}
                        </span>
                        <h4 className="font-extrabold text-xs text-slate-900">
                          {typeof selectedSpecForQR.modelA === 'object'
                            ? selectedSpecForQR.modelA.name
                            : selectedSpecForQR.modelA}
                        </h4>
                      </div>
                      {typeof selectedSpecForQR.modelA === 'object' && selectedSpecForQR.modelA.priceUzs ? (
                        <span className="text-xs font-mono font-extrabold text-indigo-900 shrink-0">
                          {selectedSpecForQR.modelA.priceUzs.toLocaleString('uz-UZ')} so'm
                        </span>
                      ) : null}
                    </div>

                    <div className="text-[11px] text-slate-600 border-t border-slate-100 pt-2 space-y-1">
                      <p className="font-semibold text-slate-800">⚡ {selectedSpecForQR.keyDifference}</p>
                      <p className="text-slate-500">🛡️ 3 Yil Rasmiy Servis & Bepul Yetkazib O'rnatish</p>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 font-medium">
                    Do'kon ichki standarti: Rasmiy narxnoma va texnik pasport kafolat taloni bilan birga topshiriladi.
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
                <QrCode className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="text-xs text-slate-500">Chap ustundan model tanlang.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
