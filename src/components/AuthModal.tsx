import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import {
  UserCheck,
  UserPlus,
  LogIn,
  X,
  Shield,
  Briefcase,
  GraduationCap,
  Store,
  Phone,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'login',
}) => {
  const { users, currentUser, loginUser, registerUser, stores } = useApp();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);

  // Login Form State
  const [loginQuery, setLoginQuery] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regPosition, setRegPosition] = useState('Sotuvchi Mutaxassis');
  const [regStore, setRegStore] = useState(stores[0]?.name || 'Chilonzor Filiali');
  const [regPhone, setRegPhone] = useState('+998 90 123 45 67');
  const [regRole, setRegRole] = useState<UserRole>('employee');
  const [inviteCode, setInviteCode] = useState('');
  const [regError, setRegError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const query = loginQuery.trim().toLowerCase();
    if (!query) {
      setLoginError("Iltimos, ismingiz, email yoki telefon raqamingizni kiriting.");
      return;
    }

    // Find user matching name, email or phone
    const matchedUser = users.find(
      (u) =>
        u.name.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query) ||
        u.phone.replace(/\s+/g, '').includes(query.replace(/\s+/g, ''))
    );

    if (matchedUser) {
      loginUser(matchedUser.id);
      onClose();
    } else {
      setLoginError(
        "Kiritilgan ma'lumot bo'yicha xodim topilmadi. Qaytadan urinib ko'ring yoki 'Ro'yxatdan o'tish' bo'limiga o'ting."
      );
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);
    if (!regName.trim()) return;
    
    if (regRole !== 'employee' && inviteCode !== 'HAMKOR2026') {
      setRegError("Maxsus rol uchun to'g'ri ruxsatnoma (invite code) kiriting.");
      return;
    }

    registerUser({
      name: regName.trim(),
      position: regPosition,
      storeName: regStore,
      phone: regPhone,
      role: regRole,
    });

    onClose();
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <span className="text-[10px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-bold">Admin</span>;
      case 'manager':
        return <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">Menejer</span>;
      case 'trainer':
        return <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold">Trener</span>;
      default:
        return <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">Xodim</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden relative">
        {/* Modal Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-6 text-white text-center relative overflow-hidden">
          <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
            <UserCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">Hamkor LMS Portaliga Kirish</h2>
          <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
            Xodimlarning shaxsiy profili, testlar, sertifikatlar hamda lavozim ma'lumotlari.
          </p>

          {/* Tab buttons */}
          <div className="flex bg-slate-800/80 p-1 rounded-xl mt-5 border border-slate-700/80">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === 'login'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Tizimga Kirish</span>
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === 'register'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Ro'yxatdan O'tish</span>
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {activeTab === 'login' && (
            <div className="space-y-4">
              <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                {loginError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-semibold">
                    {loginError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ism, Email yoki Telefon Raqamingiz
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Anvar Rahimov yoki +998 90 123 45 67"
                    value={loginQuery}
                    onChange={(e) => setLoginQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Parol
                  </label>
                  <input
                    type="password"
                    placeholder="Parolingizni kiriting..."
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    * Standart xodim paroli yoki tizim kaliti kiritilishi mumkin.
                  </span>
                </div>

                <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setActiveTab('register')}
                    className="text-xs font-bold text-emerald-600 hover:underline"
                  >
                    Akkuntingiz yo'qmi? Ro'yxatdan o'tish
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Kirish</span>
                  </button>
                </div>
              </form>

              {/* Optional Demo Mode Toggle for Developers/Testers */}
              <div className="pt-3 border-t border-slate-100 text-center">
                <button
                  onClick={() => setShowDemoAccounts(!showDemoAccounts)}
                  className="text-[11px] text-slate-400 hover:text-slate-600 font-semibold underline"
                >
                  {showDemoAccounts
                    ? "Demo ro'yxatni yashirish"
                    : "Demo rejim (Sinov xodimlarini ko'rish)"}
                </button>

                {showDemoAccounts && (
                  <div className="mt-3 space-y-2 text-left max-h-48 overflow-y-auto bg-slate-50 p-2 rounded-xl border border-slate-200">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider px-1">
                      Mavjud Demo Xodimlar:
                    </p>
                    {users.map((u) => (
                      <button
                        key={u.id}
                        onClick={() => {
                          loginUser(u.id);
                          onClose();
                        }}
                        className="w-full text-left p-2 rounded-lg bg-white border border-slate-200 hover:border-emerald-400 transition-all flex items-center justify-between text-xs"
                      >
                        <span className="font-bold text-slate-800">{u.name}</span>
                        <span className="text-[10px] text-emerald-600 font-semibold">{u.position}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ism va Familiyangiz (F.I.Sh)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Jamshid Qodirov"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Lavozimingiz
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Sotuvchi Mutaxassis"
                    value={regPosition}
                    onChange={(e) => setRegPosition(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Do'kon Filiali
                  </label>
                  <select
                    value={regStore}
                    onChange={(e) => setRegStore(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    {stores.map((st) => (
                      <option key={st.id} value={st.name}>
                        {st.name} ({st.city})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Telefon Raqamingiz
                </label>
                <input
                  type="text"
                  required
                  placeholder="+998 90 123 45 67"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Akkunt Turi / Rol
                </label>
                <select
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value as UserRole)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="employee">Sotuvchi / Kassir (Oddiy Xodim - Admin dostupi yo'q)</option>
                  <option value="manager">Do'kon Boshlig'i (Menejer)</option>
                  <option value="trainer">O'quv Bo'limi Treneri</option>
                  <option value="admin">Tizim Admini</option>
                </select>
                <p className="text-[10px] text-slate-400 mt-1">
                  * Oddiy xodimlarda Admin Panel va boshqaruv bo'limlariga ruxsat berilmaydi.
                </p>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
                >
                  Bekor Qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ro'yxatdan O'tish va Kirish</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
