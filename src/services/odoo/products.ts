export type OdooProduct = {
  id: number;
  name: string;
  list_price: number;
  default_code: string | null;
};

const PRODUCTS_URL = "http://127.0.0.1:8000/api/odoo/products/";

export async function fetchOdooProducts(
  signal?: AbortSignal,
): Promise<OdooProduct[]> {
  const response = await fetch(PRODUCTS_URL, { signal });

  if (!response.ok) {
    throw new Error(`No se pudieron cargar los productos (${response.status})`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("La respuesta de productos no tiene el formato esperado");
  }

  return data as OdooProduct[];
}
