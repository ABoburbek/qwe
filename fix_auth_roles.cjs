const fs = require('fs');

let content = fs.readFileSync('src/components/AuthModal.tsx', 'utf-8');

if (!content.includes('const [inviteCode, setInviteCode] = useState')) {
    content = content.replace(
        `const [regRole, setRegRole] = useState<UserRole>('employee');`,
        `const [regRole, setRegRole] = useState<UserRole>('employee');\n  const [inviteCode, setInviteCode] = useState('');\n  const [regError, setRegError] = useState<string | null>(null);`
    );

    const handleRegisterOld = `const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim()) return;`;
    
    const handleRegisterNew = `const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);
    if (!regName.trim()) return;
    
    if (regRole !== 'employee' && inviteCode !== 'HAMKOR2026') {
      setRegError("Maxsus rol uchun to'g'ri ruxsatnoma (invite code) kiriting.");
      return;
    }`;

    content = content.replace(handleRegisterOld, handleRegisterNew);

    const regRoleHtmlOld = `<div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 ml-1">Tizimdagi Rol</label>
                  <select
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value as UserRole)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  >
                    <option value="employee">Xodim (Sotuvchi)</option>
                    <option value="manager">Do'kon Menejeri</option>
                    <option value="trainer">O'quv Treneri</option>
                    <option value="admin">Tizim Administratori</option>
                  </select>
                </div>`;

    const regRoleHtmlNew = `<div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 ml-1">Tizimdagi Rol</label>
                  <select
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value as UserRole)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  >
                    <option value="employee">Xodim (Sotuvchi)</option>
                    <option value="manager">Do'kon Menejeri</option>
                    <option value="trainer">O'quv Treneri</option>
                    <option value="admin">Tizim Administratori</option>
                  </select>
                </div>
                
                {regRole !== 'employee' && (
                  <div className="space-y-1.5 animate-fadeIn">
                    <label className="text-xs font-bold text-slate-700 ml-1 flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-rose-500" />
                      Ruxsatnoma kodi (Invite Code)
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Masalan: HAMKOR2026"
                      value={inviteCode}
                      onChange={(e) => setInviteCode(e.target.value)}
                      className="w-full bg-rose-50 border border-rose-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                )}
                
                {regError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-600 font-bold flex items-center gap-2">
                    <X className="w-4 h-4 shrink-0" />
                    <p>{regError}</p>
                  </div>
                )}`;

    content = content.replace(regRoleHtmlOld, regRoleHtmlNew);
}

fs.writeFileSync('src/components/AuthModal.tsx', content);
