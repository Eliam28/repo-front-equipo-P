export type PrestashopPayment = {
  id: number;
  order_reference: string;
  amount: string;
  payment_method: string;
  transaction_id: string;
  date_add: string;
};

const PAYMENTS_URL = "http://127.0.0.1:8000/api/prestashop/payments/";

export async function fetchPrestashopPayments(
  signal?: AbortSignal,
): Promise<PrestashopPayment[]> {
  const response = await fetch(PAYMENTS_URL, { signal });

  if (!response.ok) {
    throw new Error(`No se pudieron cargar los pagos (${response.status})`);
  }

  const responseData = await response.json();

  if (
    responseData.status !== "success" ||
    !responseData.data ||
    !Array.isArray(responseData.data.order_payments)
  ) {
    throw new Error("La respuesta de pagos no tiene el formato esperado");
  }

  return responseData.data.order_payments as PrestashopPayment[];
}
