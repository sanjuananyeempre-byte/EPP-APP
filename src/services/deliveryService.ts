import { CartItem, DeliveryRecord } from '../types';
import { generateEppWorkbook, downloadWorkbookInBrowser } from './excelService';

const LOCAL_STORAGE_KEY = 'registro_epp_entregas_central_v1';

// Seed sample records if completely empty so supervisor can see structure immediately
function getInitialLocalRecords(): DeliveryRecord[] {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

export async function fetchDeliveries(): Promise<DeliveryRecord[]> {
  try {
    const res = await fetch('/api/deliveries', {
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        // Sync local storage mirror
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        return data;
      }
    }
  } catch (err) {
    console.warn('API /api/deliveries unreachable, using local storage cache:', err);
  }
  return getInitialLocalRecords();
}

export async function saveDeliveriesBatch(
  workerName: string,
  items: CartItem[]
): Promise<{ success: boolean; records: DeliveryRecord[]; batchId: string }> {
  const now = new Date();
  const dateStr = now.toLocaleDateString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  const timeStr = now.toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  const batchId = `ENT-${Date.now().toString().slice(-6)}`;

  const newRecords: DeliveryRecord[] = items.map((item, idx) => {
    let finalExcelCol = item.excelColumn;
    // Map specific glove with size to exact Excel column name if needed
    if (item.size && !item.excelColumn.includes(item.size)) {
      if (item.excelColumn === 'Guante Grises R. corte') {
        finalExcelCol = `Guante Grises R. corte ${item.size}`;
      } else if (item.excelColumn === 'Guante Negro') {
        finalExcelCol = `Guante Negro ${item.size}`;
      } else if (item.excelColumn === 'Guante Verde') {
        finalExcelCol = item.size === 'T9' ? 'Guante Verde T=9' : 'Guandes verde T10';
      } else if (item.excelColumn === 'Guante palma azul') {
        finalExcelCol = `Guante palma azul ${item.size}`;
      }
    }

    return {
      id: `REG-${Date.now()}-${idx + 1}`,
      deliveryBatchId: batchId,
      date: dateStr,
      time: timeStr,
      isoTimestamp: now.toISOString(),
      workerName: workerName.trim().toUpperCase(),
      categoryName: item.categoryName,
      eppName: item.variantName,
      tipoColor: item.color || 'Estándar',
      talla: item.size || 'N/A',
      quantity: Number(item.quantity) || 1,
      excelColumn: finalExcelCol,
      customDescription: item.customDescription || ''
    };
  });

  // 1. Try sending to backend server API
  let serverSaved = false;
  try {
    const res = await fetch('/api/deliveries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ records: newRecords })
    });
    if (res.ok) {
      serverSaved = true;
    }
  } catch (err) {
    console.warn('Could not post to /api/deliveries, saving to local persistent storage:', err);
  }

  // 2. Always persist to localStorage mirror as well
  const currentLocal = getInitialLocalRecords();
  const updated = [...currentLocal, ...newRecords];
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));

  return {
    success: true,
    records: newRecords,
    batchId
  };
}

export async function downloadExcelFile(): Promise<void> {
  // Prefer fetching latest from backend or fallback to local
  const records = await fetchDeliveries();
  const wb = generateEppWorkbook(records);
  downloadWorkbookInBrowser(wb, `REGISTRO_ENTREGA_EPP_${new Date().toISOString().slice(0, 10)}.xlsx`);
}

export async function clearLocalRecords(): Promise<void> {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  try {
    await fetch('/api/deliveries/clear', { method: 'POST' });
  } catch (e) {
    console.error(e);
  }
}
