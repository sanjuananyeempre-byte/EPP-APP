import React from 'react';
import { ArrowLeft, Home, FileSpreadsheet, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  currentStep: 'worker' | 'category' | 'configure' | 'summary' | 'success';
  workerName: string | null;
  itemCount: number;
  onBack?: () => void;
  onHome?: () => void;
  onOpenHistory?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  workerName,
  itemCount,
  onBack,
  onHome,
  onOpenHistory
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900 text-white shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between min-h-[64px]">
        {/* Left: Back / Home or Logo */}
        <div className="flex items-center gap-2">
          {currentStep !== 'worker' && currentStep !== 'success' && onBack && (
            <button
              onClick={onBack}
              aria-label="Volver al paso anterior"
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 rounded-xl text-base font-semibold transition-colors cursor-pointer border border-slate-700 min-h-[44px]"
            >
              <ArrowLeft className="w-5 h-5 text-amber-400" />
              <span className="hidden sm:inline">Volver</span>
            </button>
          )}

          {currentStep !== 'worker' && currentStep !== 'success' && onHome && (
            <button
              onClick={onHome}
              aria-label="Ir al inicio"
              className="p-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 rounded-xl transition-colors cursor-pointer border border-slate-700 min-h-[44px] min-w-[44px] flex items-center justify-center"
              title="Inicio"
            >
              <Home className="w-5 h-5 text-slate-300" />
            </button>
          )}

          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center shadow-inner">
              <ShieldCheck className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight leading-tight text-white flex items-center gap-1.5">
                Entrega de EPP
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block">
                Registro digital oficial de dotación
              </p>
            </div>
          </div>
        </div>

        {/* Right: Worker info & Admin Excel history button */}
        <div className="flex items-center gap-3">
          {workerName && currentStep !== 'worker' && currentStep !== 'success' && (
            <div className="text-right hidden md:block">
              <span className="text-xs text-slate-400 block uppercase font-medium">Trabajador:</span>
              <span className="text-sm font-bold text-amber-400 truncate max-w-[180px] block">
                {workerName}
              </span>
            </div>
          )}

          {itemCount > 0 && currentStep === 'category' && (
            <span className="bg-amber-500 text-slate-950 px-2.5 py-1 rounded-full text-xs font-black shadow-sm">
              {itemCount} {itemCount === 1 ? 'EPP' : 'EPPs'}
            </span>
          )}

          {onOpenHistory && (
            <button
              onClick={onOpenHistory}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs sm:text-sm font-semibold border border-slate-700 transition-colors cursor-pointer min-h-[44px]"
              title="Ver historial de entregas y descargar Excel"
            >
              <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
              <span className="hidden sm:inline">Historial / Excel</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
