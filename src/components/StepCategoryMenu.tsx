import React from 'react';
import { EPP_CATEGORIES } from '../data/initialData';
import { EppCategory, CartItem } from '../types';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface StepCategoryMenuProps {
  workerName: string;
  cartItems: CartItem[];
  onSelectCategory: (category: EppCategory) => void;
  onGoToSummary: () => void;
}

export const StepCategoryMenu: React.FC<StepCategoryMenuProps> = ({
  workerName,
  cartItems,
  onSelectCategory,
  onGoToSummary
}) => {
  // Extract first name for friendly greeting: "Hola, Luis 👋"
  const firstName = workerName.split(' ')[0] || workerName;

  const totalUnits = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 pb-28">
      {/* Friendly worker greeting */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Hola, <span className="text-amber-600 underline decoration-amber-400 decoration-4 underline-offset-4">{firstName}</span> 👋
        </h2>
        <p className="mt-3 text-xl sm:text-2xl text-slate-700 font-bold">
          ¿Qué elemento deseas registrar hoy?
        </p>
        <p className="text-sm sm:text-base text-slate-500 mt-1">
          Toca la tarjeta del elemento que vas a recibir
        </p>
      </div>

      {/* Grid of Large EPP Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {EPP_CATEGORIES.map((category) => {
          // Check how many items of this category are currently in cart
          const itemsInCategory = cartItems.filter(item => item.categoryId === category.id);
          const count = itemsInCategory.reduce((acc, item) => acc + item.quantity, 0);

          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category)}
              className={`relative flex flex-col items-center justify-center p-5 sm:p-6 bg-white hover:bg-slate-50 active:scale-[0.98] border-3 ${category.borderColor} rounded-3xl shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[160px] sm:min-h-[190px] text-center group`}
            >
              {/* Badge if already added */}
              {count > 0 && (
                <div className="absolute top-2.5 right-2.5 bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-1 rounded-full shadow">
                  {count} en lista
                </div>
              )}

              {/* Large EPP Icon */}
              <div className="text-5xl sm:text-6xl mb-3 transform group-hover:scale-110 transition-transform">
                {category.icon}
              </div>

              {/* Category Name */}
              <span className="text-lg sm:text-xl font-black text-slate-900 leading-tight uppercase tracking-wide">
                {category.name}
              </span>

              {/* Number of available variants/options */}
              <span className="text-xs text-slate-500 mt-1.5 font-medium">
                {category.variants.length} {category.variants.length === 1 ? 'opción' : 'opciones'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Persistent floating banner if cart has items */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 max-w-xl mx-auto z-40">
          <button
            onClick={onGoToSummary}
            className="w-full flex items-center justify-between p-4 sm:p-5 bg-slate-900 text-white hover:bg-slate-800 rounded-2xl shadow-2xl border-2 border-amber-400 cursor-pointer min-h-[64px] active:scale-[0.99] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="text-lg sm:text-xl font-extrabold block text-white">
                  Ver Resumen ({cartItems.length} {cartItems.length === 1 ? 'elemento' : 'elementos'})
                </span>
                <span className="text-xs sm:text-sm text-amber-300">
                  Total de {totalUnits} {totalUnits === 1 ? 'unidad' : 'unidades'} listas para confirmar
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-amber-500 text-slate-950 font-black px-4 py-2 rounded-xl text-base">
              <span>Continuar</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>
        </div>
      )}
    </div>
  );
};
