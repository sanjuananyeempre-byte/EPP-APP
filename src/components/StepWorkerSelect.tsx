import React, { useState, useMemo } from 'react';
import { Search, X, User, ChevronRight, Users } from 'lucide-react';
import { WORKERS_LIST } from '../data/initialData';
import { WorkerItem } from '../types';

interface StepWorkerSelectProps {
  onSelectWorker: (worker: WorkerItem) => void;
}

export const StepWorkerSelect: React.FC<StepWorkerSelectProps> = ({ onSelectWorker }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'principal' | 'contratista'>('all');
  const [selectedInitial, setSelectedInitial] = useState<string>('');

  // Extract unique initials for quick letter filter
  const availableInitials = useMemo(() => {
    const set = new Set<string>();
    WORKERS_LIST.forEach(w => {
      const firstLetter = w.name.trim().charAt(0).toUpperCase();
      if (firstLetter) set.add(firstLetter);
    });
    return Array.from(set).sort();
  }, []);

  const filteredWorkers = useMemo(() => {
    const cleanSearch = searchTerm.trim().toLowerCase();

    return WORKERS_LIST.filter(worker => {
      // Category filter
      if (categoryFilter !== 'all' && worker.category !== categoryFilter) {
        return false;
      }

      // Initial filter if selected and not searching
      if (selectedInitial && !cleanSearch) {
        if (!worker.name.toUpperCase().startsWith(selectedInitial)) {
          return false;
        }
      }

      // Text search
      if (!cleanSearch) return true;
      return worker.name.toLowerCase().includes(cleanSearch);
    });
  }, [searchTerm, categoryFilter, selectedInitial]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6">
      {/* Title & Instructions for 40-50 yr old workers */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-100 text-amber-900 mb-3 shadow-sm border border-amber-200">
          <User className="w-9 h-9" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          ¿QUIÉN ERES?
        </h2>
        <p className="mt-2 text-lg sm:text-xl text-slate-600 font-medium">
          Busca tu nombre en la lista para registrar tu dotación
        </p>
      </div>

      {/* Big Search Bar */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="w-7 h-7 text-slate-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (e.target.value) setSelectedInitial('');
          }}
          placeholder="🔎 Escribe tu nombre o apellido..."
          className="w-full pl-14 pr-12 py-4 bg-white border-2 border-slate-300 rounded-2xl text-xl sm:text-2xl font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-200 shadow-sm transition-all"
          autoFocus
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            aria-label="Borrar búsqueda"
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-700 min-w-[44px] justify-center"
          >
            <div className="p-1 rounded-full bg-slate-200 text-slate-700">
              <X className="w-6 h-6" />
            </div>
          </button>
        )}
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
        <button
          onClick={() => { setCategoryFilter('all'); setSelectedInitial(''); }}
          className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-sm sm:text-base border transition-all min-h-[44px] cursor-pointer whitespace-nowrap ${
            categoryFilter === 'all'
              ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
        >
          Todos ({WORKERS_LIST.length})
        </button>
        <button
          onClick={() => { setCategoryFilter('principal'); setSelectedInitial(''); }}
          className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-sm sm:text-base border transition-all min-h-[44px] cursor-pointer whitespace-nowrap ${
            categoryFilter === 'principal'
              ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
        >
          Nómina Planta (56)
        </button>
        <button
          onClick={() => { setCategoryFilter('contratista'); setSelectedInitial(''); }}
          className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-sm sm:text-base border transition-all min-h-[44px] cursor-pointer whitespace-nowrap ${
            categoryFilter === 'contratista'
              ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
        >
          Contratistas / Otros (42)
        </button>
      </div>

      {/* Quick letter scroller for fast touch picking without keyboard */}
      {!searchTerm && (
        <div className="flex flex-wrap gap-1 mb-4 justify-center">
          {availableInitials.map(letter => (
            <button
              key={letter}
              onClick={() => setSelectedInitial(selectedInitial === letter ? '' : letter)}
              className={`w-9 h-9 rounded-lg font-bold text-sm transition-all min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer ${
                selectedInitial === letter
                  ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300 font-extrabold shadow'
                  : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
              }`}
            >
              {letter}
            </button>
          ))}
          {selectedInitial && (
            <button
              onClick={() => setSelectedInitial('')}
              className="px-2.5 py-1 text-xs font-semibold bg-rose-100 text-rose-800 rounded-lg hover:bg-rose-200 ml-1"
            >
              Quitar filtro ({selectedInitial})
            </button>
          )}
        </div>
      )}

      {/* Workers List Container */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-2 sm:p-3 max-h-[55vh] overflow-y-auto shadow-inner space-y-2">
        {filteredWorkers.length === 0 ? (
          <div className="text-center py-12 px-4">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-xl font-bold text-slate-700">No se encontró ningún trabajador</p>
            <p className="text-slate-500 text-sm mt-1">
              Verifica cómo está escrito tu nombre o apellido, o limpia el buscador para ver la lista completa.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedInitial(''); setCategoryFilter('all'); }}
              className="mt-4 px-6 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-base hover:bg-amber-400 min-h-[44px]"
            >
              Ver todos los trabajadores
            </button>
          </div>
        ) : (
          filteredWorkers.map((worker) => (
            <button
              key={worker.id}
              onClick={() => onSelectWorker(worker)}
              className="w-full flex items-center justify-between p-4 sm:p-5 bg-white hover:bg-amber-50 active:bg-amber-100 border-2 border-slate-200 hover:border-amber-400 rounded-2xl transition-all text-left shadow-sm min-h-[64px] cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-800 group-hover:bg-amber-200 group-hover:text-amber-950 flex items-center justify-center font-black text-lg transition-colors shrink-0">
                  {worker.name.charAt(0)}
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-extrabold text-slate-900 block leading-tight group-hover:text-slate-950">
                    {worker.name}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {worker.category === 'principal' ? 'Nómina Oficial' : 'Contratista / Apoyo'} · No. {worker.id}
                  </span>
                </div>
              </div>

              <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-amber-400 group-hover:text-slate-950 flex items-center justify-center text-slate-400 transition-colors shrink-0">
                <ChevronRight className="w-6 h-6" />
              </div>
            </button>
          ))
        )}
      </div>

      <div className="mt-3 text-center text-xs text-slate-500">
        Mostrando {filteredWorkers.length} de {WORKERS_LIST.length} trabajadores registrados en el listado oficial
      </div>
    </div>
  );
};
