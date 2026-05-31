export type PrestashopOrder = {
  id: number;
  reference: string;
  id_customer: number;
  total_paid: string;
  date_add: string;
  [key: string]: unknown;
};

type PrestashopOrdersResponse = {
  status: string;
  data: {
    orders: PrestashopOrder[];
  };
  errors: string[];
};

const ORDERS_URL = "http://127.0.0.1:8000/api/prestashop/orders/";

function parseOrdersResponse(data: unknown): PrestashopOrder[] {
  if (typeof data !== "object" || data === null || !("data" in data)) {
    throw new Error("La respuesta de Prestashop no tiene el formato esperado");
  }

  const typedData = data as PrestashopOrdersResponse;

  if (!typedData.data || !Array.isArray(typedData.data.orders)) {
    throw new Error("La respuesta de órdenes no tiene el formato esperado");
  }

  return typedData.data.orders;
}

export async function fetchPrestashopOrders(
  signal?: AbortSignal,
): Promise<PrestashopOrder[]> {
  const response = await fetch(ORDERS_URL, { signal });

  if (!response.ok) {
    throw new Error(`No se pudieron cargar las órdenes (${response.status})`);
  }

  const data: unknown = await response.json();

  return parseOrdersResponse(data);
}

export async function fetchPrestashopOrderByReference(
  reference: string,
  signal?: AbortSignal,
): Promise<PrestashopOrder> {
  const response = await fetch(
    `${ORDERS_URL}ref/${encodeURIComponent(reference)}`,
    { signal },
  );

  if (!response.ok) {
    throw new Error(
      `No se pudo cargar la orden ${reference} (${response.status})`,
    );
  }

  const data: unknown = await response.json();

  const orders = parseOrdersResponse(data);

  const order = orders.find((o) => o.reference === reference);

  if (!order) {
    throw new Error(`No se encontró la orden con referencia ${reference}`);
  }

  return order;
}
