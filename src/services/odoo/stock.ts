export type OdooStock = {
  id: number;
  product_id?: number;
  name?: string;
  default_code?: string | null;
  qty_available: number;
  [key: string]: unknown;
};

const STOCK_URL = "http://127.0.0.1:8000/api/odoo/stock/";

export async function fetchOdooStock(
  signal?: AbortSignal,
): Promise<OdooStock[]> {
  const response = await fetch(STOCK_URL, { signal });

  if (!response.ok) {
    throw new Error(`No se pudo cargar el stock (${response.status})`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("La respuesta de stock no tiene el formato esperado");
  }

  return data as OdooStock[];
}
