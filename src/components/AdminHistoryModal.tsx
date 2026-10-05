import React, { useState, useMemo } from 'react';
import { DeliveryRecord } from '../types';
import { FileSpreadsheet, X, Search, Calendar, Filter, Download, Trash2, ArrowUpDown } from 'lucide-react';
import { downloadExcelFile } from '../services/deliveryService';

interface AdminHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  deliveries: DeliveryRecord[];
  onClearAll?: () => void;
}

export const AdminHistoryModal: React.FC<AdminHistoryModalProps> = ({
  isOpen,
  onClose,
  deliveries,
  onClearAll
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  if (!isOpen) return null;

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    deliveries.forEach(d => {
      if (d.categoryName) set.add(d.categoryName);
    });
    return Array.from(set).sort();
  }, [deliveries]);

  // Extract unique dates
  const dates = useMemo(() => {
    const set = new Set<string>();
    deliveries.forEach(d => {
      if (d.date) set.add(d.date);
    });
    return Array.from(set);
  }, [deliveries]);

  // Filtered deliveries
  const filteredDeliveries = useMemo(() => {
    let list = [...deliveries];

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(d =>
        d.workerName.toLowerCase().includes(q) ||
        d.eppName.toLowerCase().includes(q) ||
        d.deliveryBatchId.toLowerCase().includes(q)
      );
    }

    if (categoryFilter !== 'all') {
      list = list.filter(d => d.categoryName === categoryFilter);
    }

    if (dateFilter) {
      list = list.filter(d => d.date === dateFilter);
    }

    list.sort((a, b) => {
      const timeA = new Date(a.isoTimestamp).getTime() || 0;
      const timeB = new Date(b.isoTimestamp).getTime() || 0;
      return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
    });

    return list;
  }, [deliveries, searchTerm, categoryFilter, dateFilter, sortOrder]);

  const totalDeliveredUnits = deliveries.reduce((acc, d) => acc + (d.quantity || 1), 0);
  const uniqueWorkersCount = new Set(deliveries.map(d => d.workerName)).size;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-fade-in">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-300">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center">
              <FileSpreadsheet className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Historial y Registro Acumulativo de Entregas
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Almacenamiento independiente sincronizado para Excel
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Stats Summary Bar */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 p-4 bg-slate-100 border-b border-slate-200 text-center">
          <div className="bg-white p-3 rounded-2xl border border-slate-200">
            <span className="text-xs uppercase font-extrabold text-slate-400 block">
              Registros Totales
            </span>
            <span className="text-2xl font-black text-slate-900">
              {deliveries.length}
            </span>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-slate-200">
            <span className="text-xs uppercase font-extrabold text-slate-400 block">
              Unidades Entregadas
            </span>
            <span className="text-2xl font-black text-emerald-600">
              {totalDeliveredUnits}
            </span>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-slate-200">
            <span className="text-xs uppercase font-extrabold text-slate-400 block">
              Trabajadores Atendidos
            </span>
            <span className="text-2xl font-black text-amber-600">
              {uniqueWorkersCount}
            </span>
          </div>
        </div>

        {/* Action Controls & Filters */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Buscar por trabajador, EPP o lote..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="py-2.5 px-3 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none"
            >
              <option value="all">Todas las categorías</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {/* Date Filter */}
            {dates.length > 1 && (
              <select
                value={dateFilter}
                onChange={e => setDateFilter(e.target.value)}
                className="py-2.5 px-3 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none"
              >
                <option value="">Todas las fechas</option>
                {dates.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            )}

            {/* Export Excel Button */}
            <button
              onClick={() => downloadExcelFile()}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer whitespace-nowrap min-h-[44px]"
            >
              <Download className="w-4 h-4" />
              <span>DESCARGAR EXCEL (.xlsx)</span>
            </button>
          </div>
        </div>

        {/* Deliveries Table */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredDeliveries.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <FileSpreadsheet className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <p className="text-lg font-bold">No hay registros que coincidan</p>
              <p className="text-sm mt-1">Los registros guardados por los trabajadores aparecerán aquí automáticamente.</p>
            </div>
          ) : (
            <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-extrabold border-b border-slate-200">
                    <th className="py-3 px-3">Fecha y Hora</th>
                    <th className="py-3 px-3">Lote</th>
                    <th className="py-3 px-3">Trabajador</th>
                    <th className="py-3 px-3">Elemento EPP</th>
                    <th className="py-3 px-3">Talla</th>
                    <th className="py-3 px-3 text-center">Cantidad</th>
                    <th className="py-3 px-3">Columna en Excel</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredDeliveries.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="py-3 px-3 whitespace-nowrap text-slate-600">
                        <span className="font-bold text-slate-900 block">{item.date}</span>
                        <span className="text-xs text-slate-400">{item.time}</span>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap font-mono text-xs text-slate-500">
                        {item.deliveryBatchId}
                      </td>
                      <td className="py-3 px-3 font-extrabold text-slate-900 whitespace-nowrap">
                        {item.workerName}
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-800">
                        <span>{item.eppName}</span>
                        {item.customDescription && (
                          <span className="block text-xs text-amber-700 italic">
                            "{item.customDescription}"
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-slate-700 font-medium">
                        {item.talla !== 'N/A' ? (
                          <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-bold">
                            {item.talla}
                          </span>
                        ) : (
                          <span className="text-slate-400 text-xs">N/A</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="inline-block bg-emerald-100 text-emerald-950 font-black px-2.5 py-0.5 rounded-lg text-sm">
                          {item.quantity}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-xs text-slate-500 font-mono">
                        {item.excelColumn}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>
            Archivo Excel generado incluye hoja <strong>HISTORIAL_ENTREGAS</strong> y matriz <strong>MATRIZ_EPP_CONSOLIDADA</strong>.
          </span>
          <div className="flex gap-2">
            {onClearAll && deliveries.length > 0 && (
              <button
                onClick={() => {
                  if (window.confirm('¿Está seguro de limpiar el historial de pruebas?')) {
                    onClearAll();
                  }
                }}
                className="px-3 py-1.5 text-rose-600 hover:text-rose-700 font-bold hover:bg-rose-50 rounded-lg cursor-pointer"
              >
                Limpiar datos de prueba
              </button>
            )}
            <button
              onClick={onClose}
              className="px-5 py-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 cursor-pointer min-h-[40px]"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
