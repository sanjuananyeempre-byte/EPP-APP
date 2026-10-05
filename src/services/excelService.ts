import * as XLSX from 'xlsx';
import { DeliveryRecord } from '../types';
import { WORKERS_LIST, EXCEL_COLUMNS_ORIGINAL } from '../data/initialData';

/**
 * Builds an Excel Workbook with two complete sheets:
 * 1. HISTORIAL_ENTREGAS: Transactional audit log of each delivery item.
 * 2. MATRIZ_ACUMULADA: Exactly matches the layout of "Listado epp y trabajadors.xlsx",
 *    with each worker as a row, all original EPP columns, and the cumulative quantities delivered.
 */
export function generateEppWorkbook(records: DeliveryRecord[]): XLSX.WorkBook {
  const wb = XLSX.utils.book_new();

  // 1. Hoja Transaccional de Entregas
  const transactionalData = records.map((r, index) => ({
    'No.': index + 1,
    'ID Registro': r.id,
    'Lote Entrega': r.deliveryBatchId,
    'Fecha': r.date,
    'Hora': r.time,
    'Trabajador': r.workerName,
    'Categoría': r.categoryName,
    'Elemento EPP': r.eppName,
    'Tipo / Color': r.tipoColor || 'N/A',
    'Talla': r.talla || 'N/A',
    'Cantidad': r.quantity,
    'Columna Excel': r.excelColumn,
    'Observaciones / Detalle': r.customDescription || ''
  }));

  const wsTrans = XLSX.utils.json_to_sheet(transactionalData.length > 0 ? transactionalData : [
    {
      'No.': '',
      'ID Registro': '',
      'Lote Entrega': '',
      'Fecha': '',
      'Hora': '',
      'Trabajador': 'Sin registros aún',
      'Categoría': '',
      'Elemento EPP': '',
      'Tipo / Color': '',
      'Talla': '',
      'Cantidad': 0,
      'Columna Excel': '',
      'Observaciones / Detalle': ''
    }
  ]);

  // Set column widths for readability
  wsTrans['!cols'] = [
    { wch: 6 },  // No.
    { wch: 22 }, // ID Registro
    { wch: 20 }, // Lote Entrega
    { wch: 12 }, // Fecha
    { wch: 10 }, // Hora
    { wch: 26 }, // Trabajador
    { wch: 20 }, // Categoría
    { wch: 28 }, // Elemento EPP
    { wch: 20 }, // Tipo / Color
    { wch: 10 }, // Talla
    { wch: 10 }, // Cantidad
    { wch: 30 }, // Columna Excel
    { wch: 35 }  // Observaciones
  ];

  XLSX.utils.book_append_sheet(wb, wsTrans, 'HISTORIAL_ENTREGAS');

  // 2. Hoja Matriz acumulada (Idéntica al formato original)
  // Build lookup of deliveries: workerName -> excelColumn -> total quantity
  const workerTotals: Record<string, Record<string, number>> = {};

  records.forEach(r => {
    const wName = r.workerName.trim().toUpperCase();
    if (!workerTotals[wName]) {
      workerTotals[wName] = {};
    }
    const col = r.excelColumn.trim();
    workerTotals[wName][col] = (workerTotals[wName][col] || 0) + Number(r.quantity || 1);
  });

  const matrixRows: any[] = [];
  const columnSums: Record<string, number> = {};
  EXCEL_COLUMNS_ORIGINAL.forEach(col => {
    columnSums[col] = 0;
  });

  WORKERS_LIST.forEach((w, idx) => {
    const wNameUpper = w.name.trim().toUpperCase();
    const row: any = {
      'No.': idx + 1,
      'Nombres y Apellidos': w.name,
      'Tipo Personal': w.category === 'principal' ? 'Nómina' : 'Contratista / Apoyo'
    };

    let workerTotalSum = 0;
    EXCEL_COLUMNS_ORIGINAL.forEach(col => {
      const deliveredCount = workerTotals[wNameUpper]?.[col] || 0;
      row[col] = deliveredCount;
      columnSums[col] += deliveredCount;
      workerTotalSum += deliveredCount;
    });

    row['TOTAL RECIBIDO'] = workerTotalSum;
    matrixRows.push(row);
  });

  // Add summary row at the bottom
  const totalRow: any = {
    'No.': '',
    'Nombres y Apellidos': 'TOTAL GENERAL ENTREGADO',
    'Tipo Personal': ''
  };
  let grandTotal = 0;
  EXCEL_COLUMNS_ORIGINAL.forEach(col => {
    totalRow[col] = columnSums[col];
    grandTotal += columnSums[col];
  });
  totalRow['TOTAL RECIBIDO'] = grandTotal;
  matrixRows.push(totalRow);

  const wsMatrix = XLSX.utils.json_to_sheet(matrixRows);

  // Set widths for matrix
  const matrixCols = [
    { wch: 6 },
    { wch: 28 },
    { wch: 18 }
  ];
  EXCEL_COLUMNS_ORIGINAL.forEach(() => {
    matrixCols.push({ wch: 16 });
  });
  matrixCols.push({ wch: 16 });
  wsMatrix['!cols'] = matrixCols;

  XLSX.utils.book_append_sheet(wb, wsMatrix, 'MATRIZ_EPP_CONSOLIDADA');

  return wb;
}

/**
 * Browser-side download trigger for the Excel file
 */
export function downloadWorkbookInBrowser(wb: XLSX.WorkBook, filename = 'REGISTRO_ENTREGA_EPP.xlsx') {
  XLSX.writeFile(wb, filename);
}
