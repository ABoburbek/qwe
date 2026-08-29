import React, { useState } from 'react';
import { ShieldAlert, Lock, UserCheck, ArrowLeft, KeyRound } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AuthModal } from './AuthModal';

interface AccessDeniedViewProps {
  requiredRole: string;
  setActiveTab: (tab: string) => void;
}

export const AccessDeniedView: React.FC<AccessDeniedViewProps> = ({
  requiredRole,
  setActiveTab,
}) => {
  const { currentUser } = useApp();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 max-w-md w-full text-center shadow-xl space-y-5">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shadow-inner">
          <ShieldAlert className="w-8 h-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-rose-100 text-rose-700">
            <Lock className="w-3 h-3" />
            <span>Ruxsat Cheklangan</span>
          </span>

          <h2 className="text-xl font-extrabold text-slate-900">
            Kirish Huquqi Yo'q!
          </h2>

          <p className="text-xs text-slate-600 leading-relaxed">
            Sizning hozirgi profilingiz (<strong>{currentUser.name}</strong> -{' '}
            <span className="text-emerald-700 font-semibold">{currentUser.position}</span>) oddiy xodim profili hisoblanadi.
          </p>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-700 text-left space-y-1">
            <p className="font-bold text-slate-900 flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-amber-500" />
              <span>Talab qilinadigan lavozim:</span>
            </p>
            <p className="text-rose-600 font-bold">{requiredRole}</p>
            <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
              Oddiy xodimlarga va mehmonlarga Admin / Boshqaruv ma'lumotlarini ko'rish taqiqlangan.
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-col gap-2">
          <button
            onClick={() => setShowAuthModal(true)}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>Admin Yoki Boshqa Akkuntga Kirish</span>
          </button>

          <button
            onClick={() => setActiveTab('home')}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Bosh Sahifaga Qaytish</span>
          </button>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialTab="login"
      />
    </div>
  );
};
