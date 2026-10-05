import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as XLSX from 'xlsx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json());

  const DATA_DIR = path.resolve(__dirname, 'data');
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const JSON_FILE = path.join(DATA_DIR, 'registro_entregas.json');

  function readDeliveries(): any[] {
    try {
      if (fs.existsSync(JSON_FILE)) {
        const raw = fs.readFileSync(JSON_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (e) {
      console.error('Error reading deliveries JSON:', e);
    }
    return [];
  }

  function writeDeliveries(records: any[]) {
    fs.writeFileSync(JSON_FILE, JSON.stringify(records, null, 2), 'utf-8');
  }

  // API endpoints
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  app.get('/api/deliveries', (_req, res) => {
    res.json(readDeliveries());
  });

  app.post('/api/deliveries', (req, res) => {
    const { records } = req.body;
    if (!Array.isArray(records)) {
      return res.status(400).json({ error: 'records array is required' });
    }
    const current = readDeliveries();
    const updated = [...current, ...records];
    writeDeliveries(updated);
    res.json({ success: true, count: updated.length, added: records.length });
  });

  app.post('/api/deliveries/clear', (_req, res) => {
    writeDeliveries([]);
    res.json({ success: true });
  });

  app.get('/api/deliveries/export-excel', (_req, res) => {
    const records = readDeliveries();
    const wb = XLSX.utils.book_new();

    const formatted = records.map((r, i) => ({
      'No.': i + 1,
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
      'Detalle / Observación': r.customDescription || ''
    }));

    const ws = XLSX.utils.json_to_sheet(formatted.length > 0 ? formatted : [{ 'No.': 1, 'Trabajador': 'Sin registros aún' }]);
    XLSX.utils.book_append_sheet(wb, ws, 'HISTORIAL_ENTREGAS');

    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
    res.setHeader('Content-Disposition', 'attachment; filename="REGISTRO_ENTREGA_EPP.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  });

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
