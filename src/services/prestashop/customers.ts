export type PrestashopCustomer = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  active: string;
  date_add: string;
};

type PrestashopCustomersResponse = {
  status: string;
  data: {
    customers: PrestashopCustomer[];
  };
  errors: string[];
};

const CUSTOMERS_URL = "http://127.0.0.1:8000/api/prestashop/customers/";

export async function fetchPrestashopCustomers(signal?: AbortSignal,): Promise<PrestashopCustomer[]> {
  
  const response = await fetch(CUSTOMERS_URL, { signal,});

  if (!response.ok) {
    throw new Error(`No se pudieron cargar los clientes (${response.status})`,);
  }

  const data: unknown = await response.json();

  if (typeof data !== "object" || data === null ||!("data" in data)) {
    throw new Error( "La respuesta de Prestashop no tiene el formato esperado",);
  }

  const typedData = data as PrestashopCustomersResponse;

  if ( !typedData.data || !Array.isArray( typedData.data.customers,)) {
    throw new Error("La respuesta de clientes no tiene el formato esperado",);
  }

  return typedData.data.customers;
}