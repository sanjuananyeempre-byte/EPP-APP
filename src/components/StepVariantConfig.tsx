import React, { useState, useEffect } from 'react';
import { EppCategory, EppVariant, CartItem } from '../types';
import { Plus, Minus, Check, ArrowLeft, AlertCircle } from 'lucide-react';

interface StepVariantConfigProps {
  category: EppCategory;
  workerName: string;
  onAddItem: (item: CartItem) => void;
  onCancel: () => void;
}

export const StepVariantConfig: React.FC<StepVariantConfigProps> = ({
  category,
  onAddItem,
  onCancel
}) => {
  // If category has only 1 variant (like Otro), select it right away; otherwise let user pick
  const [selectedVariant, setSelectedVariant] = useState<EppVariant | null>(
    category.variants.length === 1 ? category.variants[0] : null
  );

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [customDescription, setCustomDescription] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [validationError, setValidationError] = useState<string>('');

  // When variant changes, reset or initialize size
  useEffect(() => {
    if (selectedVariant?.sizes && selectedVariant.sizes.length > 0) {
      if (selectedVariant.sizes.length === 1) {
        // If there's only 1 size (like T9 for Ansell Barrier), auto-select it
        setSelectedSize(selectedVariant.sizes[0]);
      } else {
        setSelectedSize('');
      }
    } else {
      setSelectedSize('');
    }
    setValidationError('');
  }, [selectedVariant]);

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleAdd = () => {
    // Validation:
    if (!selectedVariant) {
      setValidationError('Por favor seleccione qué tipo de ' + category.name.toLowerCase() + ' necesita.');
      return;
    }

    if (selectedVariant.sizes && selectedVariant.sizes.length > 0 && !selectedSize) {
      setValidationError('Por favor seleccione la talla (ejemplo: T8, T9 o T10).');
      return;
    }

    if (selectedVariant.requiresDescription && !customDescription.trim()) {
      setValidationError('Por favor escriba brevemente qué elemento especial está solicitando.');
      return;
    }

    if (quantity < 1) {
      setValidationError('La cantidad debe ser mínimo 1.');
      return;
    }

    const newItem: CartItem = {
      id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      categoryId: category.id,
      categoryName: category.name,
      variantId: selectedVariant.id,
      variantName: selectedVariant.name,
      excelColumn: selectedVariant.excelColumn,
      size: selectedSize || undefined,
      color: selectedVariant.name,
      customDescription: customDescription.trim() || undefined,
      quantity
    };

    onAddItem(newItem);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 pb-20">
      {/* Category banner */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-slate-200">
        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-800 font-bold transition-colors cursor-pointer min-h-[44px]"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver al menú</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-4xl">{category.icon}</span>
          <span className="text-2xl font-black text-slate-900 uppercase">
            {category.name}
          </span>
        </div>
      </div>

      {/* Validation banner */}
      {validationError && (
        <div className="mb-6 p-4 bg-rose-50 border-2 border-rose-400 rounded-2xl flex items-center gap-3 text-rose-900 font-bold text-base shadow-sm animate-shake">
          <AlertCircle className="w-6 h-6 text-rose-600 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Step 1: Select Type / Variant */}
      <div className="mb-6">
        <label className="block text-xl font-extrabold text-slate-900 mb-3">
          1. Selecciona el tipo de {category.name.toLowerCase()}:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {category.variants.map((v) => {
            const isSelected = selectedVariant?.id === v.id;
            return (
              <button
                key={v.id}
                onClick={() => {
                  setSelectedVariant(v);
                  setValidationError('');
                }}
                className={`flex items-start justify-between p-4 rounded-2xl border-3 text-left transition-all cursor-pointer min-h-[68px] ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md font-black'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 font-bold'
                }`}
              >
                <div>
                  <span className="text-base sm:text-lg block leading-snug">
                    {v.name}
                  </span>
                  {v.helperText && (
                    <span className={`text-xs mt-1 block ${isSelected ? 'text-slate-900' : 'text-slate-500 font-normal'}`}>
                      {v.helperText}
                    </span>
                  )}
                </div>
                {isSelected && (
                  <div className="w-7 h-7 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center shrink-0 ml-2 mt-0.5">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2 (Optional): Dynamic Size Selection */}
      {selectedVariant?.sizes && selectedVariant.sizes.length > 0 && (
        <div className="mb-6 p-5 bg-slate-100 rounded-2xl border border-slate-300">
          <label className="block text-xl font-extrabold text-slate-900 mb-3">
            2. Selecciona la talla:
          </label>
          <div className="flex flex-wrap gap-3">
            {selectedVariant.sizes.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setValidationError('');
                  }}
                  className={`flex-1 min-w-[90px] py-4 px-6 rounded-2xl font-black text-2xl transition-all cursor-pointer border-3 min-h-[64px] flex items-center justify-center ${
                    isSelected
                      ? 'bg-slate-900 text-amber-400 border-slate-900 shadow-lg scale-105'
                      : 'bg-white text-slate-800 border-slate-300 hover:border-slate-400'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-slate-500 mt-2 font-medium">
            * Tallas disponibles según ficha de dotación
          </p>
        </div>
      )}

      {/* Step 2.1 (Optional): Custom description if "Otro" */}
      {selectedVariant?.requiresDescription && (
        <div className="mb-6 p-5 bg-stone-100 rounded-2xl border border-stone-300">
          <label className="block text-xl font-extrabold text-slate-900 mb-2">
            2. Describe qué elemento es:
          </label>
          <input
            type="text"
            value={customDescription}
            onChange={(e) => {
              setCustomDescription(e.target.value);
              setValidationError('');
            }}
            placeholder="Ejemplo: Cinta de peligro, impermeable, etc."
            className="w-full p-4 bg-white border-2 border-slate-300 rounded-xl text-lg font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500"
            autoFocus
          />
        </div>
      )}

      {/* Step 3: Quantity Selector (− 1 +) */}
      <div className="mb-8 p-5 bg-white border-2 border-slate-200 rounded-3xl shadow-sm text-center">
        <label className="block text-xl font-extrabold text-slate-900 mb-4">
          3. Selecciona la cantidad:
        </label>

        <div className="flex items-center justify-center gap-6 sm:gap-8">
          {/* Minus Button */}
          <button
            onClick={handleDecrease}
            disabled={quantity <= 1}
            aria-label="Disminuir cantidad"
            className={`w-18 h-18 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-3xl font-black transition-all cursor-pointer border-2 ${
              quantity <= 1
                ? 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed'
                : 'bg-slate-200 hover:bg-slate-300 active:bg-slate-400 text-slate-900 border-slate-300 shadow-sm'
            }`}
          >
            <Minus className="w-8 h-8 stroke-[3]" />
          </button>

          {/* Number Display */}
          <div className="min-w-[90px] sm:min-w-[120px] text-center">
            <span className="text-5xl sm:text-6xl font-black text-slate-950 block tracking-tight">
              {quantity}
            </span>
            <span className="text-xs uppercase font-extrabold text-slate-500 mt-1 block">
              {quantity === 1 ? 'Unidad' : 'Unidades'}
            </span>
          </div>

          {/* Plus Button */}
          <button
            onClick={handleIncrease}
            aria-label="Aumentar cantidad"
            className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 flex items-center justify-center text-3xl font-black transition-all cursor-pointer border-2 border-amber-600 shadow-md active:scale-95"
          >
            <Plus className="w-8 h-8 stroke-[3]" />
          </button>
        </div>
      </div>

      {/* Action Button: AGREGAR EPP */}
      <div className="space-y-3">
        <button
          onClick={handleAdd}
          className="w-full py-5 px-6 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-extrabold text-xl sm:text-2xl rounded-2xl shadow-xl flex items-center justify-center gap-3 cursor-pointer transition-all border-2 border-slate-900 min-h-[64px]"
        >
          <Plus className="w-7 h-7 text-amber-400 stroke-[3]" />
          <span>AGREGAR EPP A MI REGISTRO</span>
        </button>

        <button
          onClick={onCancel}
          className="w-full py-3 px-4 text-slate-600 hover:text-slate-900 font-bold text-base rounded-xl transition-colors cursor-pointer"
        >
          Cancelar y volver
        </button>
      </div>
    </div>
  );
};
