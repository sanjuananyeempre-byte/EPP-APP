import React from 'react';
import { DeliveryRecord } from '../types';
import { CheckCircle2, RotateCcw, FileSpreadsheet, ShieldCheck } from 'lucide-react';
import { downloadExcelFile } from '../services/deliveryService';

interface StepSuccessProps {
  records: DeliveryRecord[];
  batchId: string;
  workerName: string;
  onNewRegistration: () => void;
}

export const StepSuccess: React.FC<StepSuccessProps> = ({
  records,
  batchId,
  workerName,
  onNewRegistration
}) => {
  const totalUnits = records.reduce((acc, r) => acc + r.quantity, 0);

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8 pb-20 text-center animate-fade-in">
      {/* Big Green Success Badge */}
      <div className="w-24 h-24 mx-auto mb-4 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center border-4 border-emerald-300 shadow-md">
        <CheckCircle2 className="w-16 h-16 stroke-[2.5]" />
      </div>

      <span className="inline-block bg-emerald-100 text-emerald-900 border border-emerald-300 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
        Operación Exitosa
      </span>

      <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
        ✓ REGISTRO GUARDADO CORRECTAMENTE
      </h2>

      <p className="mt-2 text-lg sm:text-xl text-slate-700 font-semibold">
        La entrega fue registrada correctamente.
      </p>

      <p className="text-sm text-slate-500 mt-1">
        Los datos se acumularon de manera independiente y están disponibles para exportación a Excel.
      </p>

      {/* Delivery Receipt Card */}
      <div className="mt-6 p-5 sm:p-6 bg-white border-2 border-emerald-200 rounded-3xl shadow-sm text-left">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
          <div>
            <span className="text-xs uppercase font-extrabold text-slate-400 block">
              Trabajador
            </span>
            <span className="text-xl font-black text-slate-900 block">
              {workerName}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs uppercase font-extrabold text-slate-400 block">
              Comprobante
            </span>
            <span className="text-sm font-mono font-bold text-slate-700 block">
              {batchId}
            </span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <span className="text-xs font-bold uppercase text-slate-500 block mb-1">
            Elementos entregados ({records.length} items · {totalUnits} unidades):
          </span>
          {records.map((r) => (
            <div
              key={r.id}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-sm font-bold border border-slate-200"
            >
              <div>
                <span className="text-slate-900 block font-extrabold">
                  {r.eppName}
                </span>
                <span className="text-xs text-slate-500 font-normal">
                  {r.talla && r.talla !== 'N/A' ? `Talla: ${r.talla} · ` : ''}
                  {r.tipoColor && r.tipoColor !== 'Estándar' ? `${r.tipoColor} · ` : ''}
                  {r.customDescription ? `"${r.customDescription}"` : ''}
                </span>
              </div>
              <span className="bg-emerald-100 text-emerald-900 font-black px-3 py-1 rounded-lg text-base">
                {r.quantity} {r.quantity === 1 ? 'ud' : 'uds'}
              </span>
            </div>
          ))}
        </div>

        <div className="text-xs text-slate-400 flex items-center justify-between pt-2 border-t border-slate-100">
          <span>Fecha: {records[0]?.date}</span>
          <span>Hora: {records[0]?.time}</span>
        </div>
      </div>

      {/* Big Action Button: NUEVO REGISTRO */}
      <div className="mt-8 space-y-3">
        <button
          onClick={onNewRegistration}
          className="w-full py-5 px-6 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-black text-2xl rounded-2xl shadow-xl flex items-center justify-center gap-3 cursor-pointer transition-all border-2 border-slate-900 min-h-[68px] active:scale-[0.99]"
        >
          <RotateCcw className="w-7 h-7 text-amber-400 stroke-[3]" />
          <span>NUEVO REGISTRO</span>
        </button>

        <button
          onClick={() => downloadExcelFile()}
          className="w-full py-3.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-2 border-emerald-300 font-bold text-base rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors min-h-[48px]"
        >
          <FileSpreadsheet className="w-5 h-5 text-emerald-700" />
          <span>Descargar Excel Oficial (REGISTRO_ENTREGA_EPP.xlsx)</span>
        </button>
      </div>
    </div>
  );
};
