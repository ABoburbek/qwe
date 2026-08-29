import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Award,
  BookOpen,
  Zap,
  Edit2,
  CheckCircle2,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Camera,
  Printer,
  Sparkles,
} from 'lucide-react';
import { CertificateModal } from './CertificateModal';
import { uploadFile } from '../services/supabase';

export const UserProfile: React.FC = () => {
  const { currentUser, updateUserProfile, certificates } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [showCoverModal, setShowCoverModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio || '');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [email,_setEmail] = useState(currentUser.email || '');
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [coverImage, setCoverImage] = useState(
    currentUser.coverImage ||
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80'
  );

  // Certificate Modal State
  const [selectedCert, setSelectedCert] = useState<any>(null);

  const presetAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  ];

  const presetCovers = [
    {
      title: "Zamonaviy Ofis",
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80',
    },
    {
      title: "Texnologik Studio",
      url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
    },
    {
      title: "Hamkor Zümrad Gradient",
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    },
    {
      title: "Do'kon & Retail Ambient",
      url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80',
    },
  ];

  const myCertificates = certificates.filter(
    (c) => c.userId === currentUser.id
  );

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(currentUser.id, {
      name,
      bio,
      phone,
      email,
      avatar,
      coverImage,
    });
    setIsEditing(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'avatar' | 'cover') => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${currentUser.id}_${Date.now()}.${fileExt}`;
        const bucket = target === 'avatar' ? 'avatars' : 'course-covers';
        
        const publicUrl = await uploadFile(bucket, `public/${fileName}`, file);
        
        if (target === 'avatar') {
          setAvatar(publicUrl);
          updateUserProfile(currentUser.id, { avatar: publicUrl });
        } else {
          setCoverImage(publicUrl);
          updateUserProfile(currentUser.id, { coverImage: publicUrl });
        }
      } catch (error) {
        console.error('File upload failed:', error);
        alert("Fayl yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden relative">
        {/* Banner Image / Cover Photo */}
        <div className="h-48 sm:h-56 relative overflow-hidden group">
          <img
            src={currentUser.coverImage || coverImage}
            alt="Profile Cover"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-black/20" />

          {/* Banner Edit Buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => setShowCoverModal(true)}
              className="bg-slate-900/80 hover:bg-slate-900 backdrop-blur-md text-white border border-white/20 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg transition-all"
            >
              <Camera className="w-3.5 h-3.5 text-emerald-400" />
              <span>Orqa Fonni O'zgartirish</span>
            </button>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Tahrirni Yopish' : 'Profilni Tahrirlash'}</span>
            </button>
          </div>
        </div>

        {/* Elevated User Identity Info Section */}
        <div className="px-6 sm:px-8 pb-8 relative">
          {/* Avatar and Info Header Container */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
            {/* Avatar (overlaps banner border) & Name/Details */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
              {/* Avatar with negative margin so top half is on cover, bottom half is on white card */}
              <div className="relative group shrink-0 -mt-16 sm:-mt-20 z-10">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover ring-4 ring-white shadow-2xl bg-slate-100"
                />
                <label className="absolute bottom-1 right-1 bg-slate-900 hover:bg-emerald-600 text-white p-2 rounded-2xl cursor-pointer shadow-lg border border-white transition-all">
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, 'avatar')}
                  />
                </label>
              </div>

              {/* Name, Surname & Position Info (positioned on clean white card background for 100% legibility) */}
              <div className="space-y-1.5 pt-2">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {currentUser.name}
                  </h1>
                  <span className="text-xs font-extrabold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200 shadow-sm">
                    {currentUser.role === 'admin'
                      ? 'Admin'
                      : currentUser.role === 'manager'
                      ? 'Menejer'
                      : currentUser.role === 'trainer'
                      ? 'Trener'
                      : 'Xodim'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs font-bold">
                  <span className="text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200/80 shadow-xs">
                    {currentUser.position}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-700 bg-slate-100 px-2.5 py-1 rounded-xl border border-slate-200/60">
                    {currentUser.department || 'Chakana Savdo'}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-700 bg-slate-100 px-2.5 py-1 rounded-xl border border-slate-200/60">
                    {currentUser.storeName}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="flex items-center justify-center sm:justify-end gap-3 shrink-0 pt-2 lg:pt-0">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 px-4 py-2.5 rounded-2xl text-center shadow-sm">
                <div className="text-[10px] font-extrabold text-amber-700 uppercase tracking-wider">
                  Hamkor Ball
                </div>
                <div className="text-lg font-extrabold text-amber-900 flex items-center justify-center gap-1">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>{currentUser.points}</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/80 px-4 py-2.5 rounded-2xl text-center shadow-sm">
                <div className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider">
                  Faollik Zanjiri
                </div>
                <div className="text-lg font-extrabold text-emerald-900 flex items-center justify-center gap-1">
                  <Zap className="w-4 h-4 text-emerald-500" />
                  <span>{currentUser.streakDays} kun</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/80 px-4 py-2.5 rounded-2xl text-center shadow-sm">
                <div className="text-[10px] font-extrabold text-blue-700 uppercase tracking-wider">
                  Sertifikatlar
                </div>
                <div className="text-lg font-extrabold text-blue-900 flex items-center justify-center gap-1">
                  <Award className="w-4 h-4 text-blue-500" />
                  <span>{myCertificates.length} ta</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Description */}
          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 mb-5">
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {currentUser.bio || "Xodim bio haqida ma'lumot kiritilmagan. Profilni tahrirlash orqali o'zingiz haqida yozing."}
            </p>
          </div>

          {/* Contact Details Bar */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold">{currentUser.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <span className="font-semibold">{currentUser.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-600" />
                <span>A'zolik sanasi: <strong className="text-slate-800">{currentUser.joinedDate}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Cover Photo Selection Modal */}
      {showCoverModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-slate-900 text-sm">
                  Profil Orqa Fonini (Banner) O'zgartirish
                </h3>
              </div>
              <button
                onClick={() => setShowCoverModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xs"
              >
                ✕
              </button>
            </div>

            {/* Custom Image Upload */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Kompyuter/Telefondan yangi surat yuklash:
              </label>
              <label className={`w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed ${isUploading ? 'border-slate-300 bg-slate-50' : 'border-emerald-300 hover:border-emerald-500 bg-emerald-50/50'} rounded-2xl cursor-pointer transition-colors text-xs font-bold ${isUploading ? 'text-slate-500' : 'text-emerald-700'}`}>
                <Camera className={`w-4 h-4 ${isUploading ? 'animate-pulse' : ''}`} />
                <span>{isUploading ? 'Yuklanmoqda...' : 'Fayl tanlash (JPG, PNG)'}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    handleFileUpload(e, 'cover');
                    setShowCoverModal(false);
                  }}
                  disabled={isUploading}
                />
              </label>
            </div>

            {/* Custom Image URL */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Yoki Internetdan Surat URL havolasini kiriting:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://..."
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <button
                  onClick={() => {
                    updateUserProfile(currentUser.id, { coverImage });
                    setShowCoverModal(false);
                  }}
                  className="px-4 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Saqlash
                </button>
              </div>
            </div>

            {/* Presets */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700">
                Tayyor professional fon rasmlaridan tanlang:
              </label>
              <div className="grid grid-cols-2 gap-3">
                {presetCovers.map((pr, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCoverImage(pr.url);
                      updateUserProfile(currentUser.id, { coverImage: pr.url });
                      setShowCoverModal(false);
                    }}
                    className="group relative rounded-xl overflow-hidden h-20 border border-slate-200 hover:border-emerald-500 transition-all text-left"
                  >
                    <img src={pr.url} alt={pr.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors" />
                    <span className="absolute bottom-1.5 left-2 right-2 text-[10px] font-bold text-white drop-shadow">
                      {pr.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Edit Form */}
      {isEditing && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-lg p-6 space-y-4 animate-fadeIn">
          <h2 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
            Profil Ma'lumotlarini Yangilash
          </h2>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ism va Familiya
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Telefon
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                O'zim haqimda (Bio)
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Profil Surati (Avatar)
              </label>

              {/* Upload from Device Section */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl mb-3 space-y-2">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <img
                    src={avatar}
                    alt="Current Avatar"
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-500 shrink-0 shadow-sm"
                  />

                  <div className="flex-1 w-full text-center sm:text-left space-y-1">
                    <p className="text-xs font-bold text-slate-800">
                      O'z qurilmangizdan (telefon/kompyuter) surat yuklash
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Format: JPG, PNG, WEBP. Istalgan sifatli rasmingizni tanlang.
                    </p>

                    <label className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 ${isUploading ? 'bg-slate-400' : 'bg-emerald-600 hover:bg-emerald-700'} text-white font-bold text-xs rounded-xl cursor-pointer shadow-sm transition-all mt-1`}>
                      <Camera className={`w-3.5 h-3.5 ${isUploading ? 'animate-pulse' : ''}`} />
                      <span>{isUploading ? 'Yuklanmoqda...' : 'Qurilmadan Surat Tanlash'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'avatar')}
                        disabled={isUploading}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* URL input and Presets */}
              <div className="space-y-2">
                <label className="block text-[11px] font-semibold text-slate-600">
                  Yoki Internet URL havolasi hamda tayyor avatarlar:
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />

                <div className="flex items-center gap-3 pt-1">
                  {presetAvatars.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt="Preset"
                      onClick={() => setAvatar(url)}
                      className={`w-10 h-10 rounded-xl object-cover cursor-pointer ring-2 transition-all ${
                        avatar === url ? 'ring-emerald-500 scale-105 shadow-sm' : 'ring-transparent hover:ring-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
              >
                Bekor Qilish
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Saqlash
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Badges & Certificates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Badges */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-slate-900 text-sm">
                Yutuq Nishonlari va Medallar ({currentUser.badges?.length || 0})
              </h3>
            </div>
          </div>

          <div className="space-y-3">
            {currentUser.badges?.map((bdg) => (
              <div
                key={bdg.id}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3"
              >
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 border border-amber-200 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-900">{bdg.title}</h4>
                  <p className="text-xs text-slate-600">{bdg.description}</p>
                  <p className="text-[10px] text-slate-400">Berilgan sana: {bdg.earnedDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-sm">
                Mening Sertifikatlarim ({myCertificates.length})
              </h3>
            </div>
          </div>

          <div className="space-y-3">
            {myCertificates.map((cert) => (
              <div
                key={cert.id}
                className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 flex items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase">
                    {cert.certificateNumber}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900">{cert.courseTitle}</h4>
                  <p className="text-[10px] text-slate-500">
                    Natija: {cert.scorePercentage}% • Sana: {cert.issuedDate}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedCert(cert)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-sm shrink-0 flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Ko'rish</span>
                </button>
              </div>
            ))}

            {myCertificates.length === 0 && (
              <p className="text-xs text-slate-500 text-center py-6">
                Hozircha sertifikatlar mavjud emas. Kurslarni tamomlab testdan o'ting!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <CertificateModal
          courseTitle={selectedCert.courseTitle}
          userName={currentUser.name}
          userPosition={currentUser.position}
          scorePercentage={selectedCert.scorePercentage}
          certificateNumber={selectedCert.certificateNumber}
          issuedDate={selectedCert.issuedDate}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </div>
  );
};
