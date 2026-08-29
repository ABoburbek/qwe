import React, { useRef } from 'react';
import { Award, Download, Printer, X, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface CertificateModalProps {
  courseTitle: string;
  userName: string;
  userPosition: string;
  scorePercentage: number;
  certificateNumber: string;
  issuedDate: string;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  courseTitle,
  userName,
  userPosition,
  scorePercentage,
  certificateNumber,
  issuedDate,
  onClose,
}) => {
  const certRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden border border-slate-200 cursor-default"
      >
        {/* Header Action Bar */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm">Rasmiy Hamkor Sertifikati</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Chop Etish / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors border border-slate-700"
              title="Sertifikatni yopish"
            >
              <X className="w-4 h-4" />
              <span>Yashirish</span>
            </button>
          </div>
        </div>

        {/* Printable Certificate Frame */}
        <div className="p-8 sm:p-12 bg-gradient-to-br from-amber-50/40 via-white to-emerald-50/30">
          <div
            ref={certRef}
            className="border-8 border-double border-emerald-900/20 p-8 sm:p-12 rounded-2xl bg-white shadow-xl relative text-center space-y-6 overflow-hidden"
          >
            {/* Background Seal Watermark */}
            <div className="absolute right-6 top-6 opacity-5 pointer-events-none">
              <Award className="w-64 h-64 text-emerald-900" />
            </div>

            {/* Top Brand Seal */}
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-extrabold text-2xl shadow-lg shadow-emerald-900/20 ring-4 ring-emerald-100">
                H
              </div>
            </div>

            <div>
              <p className="text-xs font-extrabold text-emerald-700 tracking-widest uppercase">
                HAMKOR KORPORATIV AKADEMIYASI
              </p>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1">
                SERTIFIKAT
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Ushbu sertifikat munosib egalik qiluvchiga berildi:
              </p>
            </div>

            {/* Recipient Name */}
            <div className="py-2 border-b-2 border-emerald-600 max-w-md mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-wide">
                {userName}
              </h2>
              <p className="text-xs text-emerald-700 font-semibold mt-0.5">{userPosition}</p>
            </div>

            {/* Description */}
            <div className="max-w-xl mx-auto space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                iSpring ta'lim dasturi doirasida taqdim etilgan{' '}
                <strong className="text-slate-900">"{courseTitle}"</strong> o'quv va amaliyot modulini{' '}
                <strong className="text-emerald-700">{scorePercentage}%</strong> natija bilan muvaffaqiyatli topshirganligi va imtihondan o'tganligi tasdiqlanadi.
              </p>
            </div>

            {/* Signatures & Seal */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-slate-200 text-xs text-slate-600">
              <div className="text-left space-y-1">
                <div className="font-bold text-slate-900">Malika Ikromova</div>
                <div className="text-[11px] text-slate-500">O'quv Bo'limi Bosh Metodisti</div>
                <div className="text-[10px] text-emerald-600 font-mono">Imzo: M.Ikromova (Raqamli)</div>
              </div>

              <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 text-emerald-900">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold text-emerald-700">Tasdiqlangan Nomer</div>
                  <div className="font-mono text-xs font-bold">{certificateNumber}</div>
                </div>
              </div>

              <div className="text-right space-y-1">
                <div className="font-bold text-slate-900">Berilgan Sana</div>
                <div className="text-xs text-slate-600 font-medium">{issuedDate}</div>
                <div className="text-[10px] text-slate-400">Toshkent sh., Hamkor HQ</div>
              </div>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
            <span className="text-xs text-slate-500">
              * Sertifikat raqamli imzo va maxsus ID bilan tasdiqlangan.
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Chop etish / PDF</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-md transition-all"
              >
                <X className="w-4 h-4 text-rose-400" />
                <span>Sertifikatni Yashirish (Yopish)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
