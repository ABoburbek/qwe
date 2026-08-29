const fs = require('fs');

let content = fs.readFileSync('src/components/HomeFeed.tsx', 'utf-8');

if (!content.includes("AI Sotuv Mashg'uloti")) {
  const welcomeBannerEnd = '</div>\n      </div>';
  
  const quickActionsHtml = `
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
`;
  
  content = content.replace(welcomeBannerEnd, welcomeBannerEnd + '\n' + quickActionsHtml);
  
  if(!content.includes('Gamepad2,')) {
      content = content.replace('import {', 'import {\n  Gamepad2,');
  }

  fs.writeFileSync('src/components/HomeFeed.tsx', content);
}
