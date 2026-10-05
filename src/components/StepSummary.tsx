import React from 'react';
import { CartItem } from '../types';
import { EPP_CATEGORIES } from '../data/initialData';
import { Plus, CheckCircle, Trash2, ArrowLeft, Loader2, ShieldAlert } from 'lucide-react';

interface StepSummaryProps {
  workerName: string;
  items: CartItem[];
  isSubmitting: boolean;
  onAddAnother: () => void;
  onRemoveItem: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export const StepSummary: React.FC<StepSummaryProps> = ({
  workerName,
  items,
  isSubmitting,
  onAddAnother,
  onRemoveItem,
  onUpdateQuantity,
  onConfirm,
  onCancel
}) => {
  const totalUnits = items.reduce((acc, curr) => acc + curr.quantity, 0);

  // Helper to find category icon
  const getCategoryIcon = (categoryId: string) => {
    const cat = EPP_CATEGORIES.find(c => c.id === categoryId);
    return cat?.icon || '🛡️';
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 pb-20">
      {/* Title */}
      <div className="text-center mb-6">
        <span className="text-sm font-extrabold uppercase tracking-widest text-amber-700 bg-amber-100 px-3 py-1 rounded-full inline-block mb-2">
          Paso Final
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          RESUMEN DE ENTREGA
        </h2>
        <p className="text-slate-600 text-base sm:text-lg mt-1 font-medium">
          Verifica tus elementos antes de confirmar el registro
        </p>
      </div>

      {/* Worker Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 mb-6 shadow-md border-2 border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase font-extrabold text-amber-400 block tracking-wider">
            Trabajador que recibe:
          </span>
          <span className="text-2xl sm:text-3xl font-black text-white block mt-0.5">
            {workerName}
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 block font-medium">Fecha de registro:</span>
          <span className="text-sm font-bold text-slate-200">
            {new Date().toLocaleDateString('es-CO')}
          </span>
        </div>
      </div>

      {/* Empty items guard */}
      {items.length === 0 ? (
        <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-8 text-center mb-6">
          <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto mb-3" />
          <p className="text-xl font-bold text-rose-900">
            No tienes ningún elemento en tu lista
          </p>
          <p className="text-rose-700 text-sm mt-1 mb-5">
            Debes agregar al menos un EPP para poder confirmar la entrega.
          </p>
          <button
            onClick={onAddAnother}
            className="py-3 px-6 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-lg min-h-[48px] cursor-pointer"
          >
            + Seleccionar EPP
          </button>
        </div>
      ) : (
        /* Items List */
        <div className="space-y-3 mb-6">
          {items.map((item, index) => {
            const icon = getCategoryIcon(item.categoryId);
            return (
              <div
                key={item.id}
                className="bg-white border-2 border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm flex items-center justify-between gap-3"
              >
                {/* Left: Icon & Details */}
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <div className="text-3xl sm:text-4xl shrink-0 p-2 bg-slate-100 rounded-xl">
                    {icon}
                  </div>
                  <div className="min-w-0">
                    <span className="text-lg sm:text-xl font-black text-slate-900 block leading-tight">
                      {item.variantName}
                    </span>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-slate-600 font-bold">
                      {item.size && (
                        <span className="bg-slate-100 border border-slate-300 px-2 py-0.5 rounded-md text-slate-800">
                          Talla: {item.size}
                        </span>
                      )}
                      {item.customDescription && (
                        <span className="bg-amber-50 border border-amber-200 text-amber-900 px-2 py-0.5 rounded-md italic">
                          "{item.customDescription}"
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Quantity controls & Delete */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center bg-slate-100 rounded-xl border border-slate-300 p-1">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className={`w-9 h-9 rounded-lg font-bold flex items-center justify-center text-lg ${
                        item.quantity <= 1
                          ? 'text-slate-300 cursor-not-allowed'
                          : 'text-slate-800 hover:bg-white cursor-pointer active:scale-95'
                      }`}
                    >
                      −
                    </button>
                    <span className="w-9 text-center font-black text-lg text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-9 h-9 rounded-lg font-bold flex items-center justify-center text-lg text-slate-800 hover:bg-white cursor-pointer active:scale-95"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    aria-label={`Eliminar ${item.variantName}`}
                    className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                    title="Eliminar de la lista"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Total units counter */}
      {items.length > 0 && (
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 mb-6 flex items-center justify-between">
          <span className="font-extrabold text-amber-950 text-base sm:text-lg">
            Total de elementos a entregar:
          </span>
          <span className="text-2xl font-black text-amber-950">
            {totalUnits} {totalUnits === 1 ? 'unidad' : 'unidades'}
          </span>
        </div>
      )}

      {/* Buttons */}
      <div className="space-y-3">
        {/* + AGREGAR OTRO EPP */}
        <button
          onClick={onAddAnother}
          disabled={isSubmitting}
          className="w-full py-4 px-6 bg-white hover:bg-slate-50 text-slate-900 font-extrabold text-lg sm:text-xl rounded-2xl border-3 border-slate-300 hover:border-slate-400 flex items-center justify-center gap-2 cursor-pointer transition-all min-h-[60px]"
        >
          <Plus className="w-6 h-6 text-amber-600 stroke-[3]" />
          <span>+ AGREGAR OTRO EPP</span>
        </button>

        {/* ✓ CONFIRMAR ENTREGA */}
        <button
          onClick={onConfirm}
          disabled={isSubmitting || items.length === 0}
          className={`w-full py-5 px-6 rounded-2xl font-black text-xl sm:text-2xl shadow-xl flex items-center justify-center gap-3 transition-all min-h-[68px] ${
            isSubmitting || items.length === 0
              ? 'bg-slate-400 text-slate-100 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white cursor-pointer active:scale-[0.99] border-2 border-emerald-700'
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-7 h-7 animate-spin" />
              <span>GUARDANDO ENTREGA EN EXCEL...</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-7 h-7 stroke-[3]" />
              <span>✓ CONFIRMAR ENTREGA</span>
            </>
          )}
        </button>

        <button
          onClick={onCancel}
          disabled={isSubmitting}
          className="w-full py-2.5 text-center text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
        >
          Cancelar y salir
        </button>
      </div>
    </div>
  );
};
