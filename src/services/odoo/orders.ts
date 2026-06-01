export type OdooOrder = {
  id: number;
  name: string;
  date_order: string;
  company_id: number;
  company_name: string;
  partner_id: number;
  partner_name: string;
  amount_total: number;
  state: string;
};

const ORDERS_URL = "http://localhost:8000/api/odoo/orders/";

export async function fetchOdooOrders(
  signal?: AbortSignal,
): Promise<OdooOrder[]> {
  const response = await fetch(ORDERS_URL, { signal });

  if (!response.ok) {
    throw new Error(`No se pudieron cargar las órdenes (${response.status})`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("La respuesta de Odoo no tiene el formato esperado");
  }

  return data as OdooOrder[];
}
