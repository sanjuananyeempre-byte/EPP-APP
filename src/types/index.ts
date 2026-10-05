export interface WorkerItem {
  id: string;
  name: string;
  category: 'principal' | 'contratista';
}

export interface EppVariant {
  id: string;
  name: string; // e.g. "Guante Gris R. Corte"
  excelColumn: string;
  colors?: string[]; // e.g. ["Negro", "Amarillo", "Verde"]
  sizes?: string[]; // e.g. ["T8", "T9", "T10"]
  requiresDescription?: boolean; // for "Otro ¿Cuál?"
  helperText?: string;
}

export interface EppCategory {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  variants: EppVariant[];
}

export interface CartItem {
  id: string; // unique item id in cart
  categoryId: string;
  categoryName: string;
  variantId: string;
  variantName: string;
  excelColumn: string;
  color?: string;
  size?: string;
  customDescription?: string;
  quantity: number;
}

export interface DeliveryRecord {
  id: string;
  deliveryBatchId: string;
  date: string; // DD/MM/YYYY
  time: string; // HH:mm
  isoTimestamp: string;
  workerName: string;
  workerId?: string;
  categoryName: string;
  eppName: string;
  tipoColor: string;
  talla: string;
  quantity: number;
  excelColumn: string;
  customDescription?: string;
}
