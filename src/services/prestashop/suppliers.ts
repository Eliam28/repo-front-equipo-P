export type PrestashopSupplier = {
  id: number;
  name: string;
  active: string;
  date_add: string;
  date_upd: string;
};

type PrestashopSuppliersResponse = {
  status: string;
  data: {
    suppliers: PrestashopSupplier[];
  };
  errors: string[];
};

const SUPPLIERS_URL = "http://127.0.0.1:8000/api/prestashop/suppliers/";

export async function fetchPrestashopSuppliers( signal?: AbortSignal,): Promise<PrestashopSupplier[]> {
  
  const response = await fetch(SUPPLIERS_URL, {signal,});

  if (!response.ok) {
    throw new Error(`No se pudieron cargar los proveedores (${response.status})`,);
  }

  const data: unknown = await response.json();

  if (typeof data !== "object" ||data === null ||!("data" in data)) {
    throw new Error("La respuesta de Prestashop no tiene el formato esperado",);
  }

  const typedData = data as PrestashopSuppliersResponse;

  if (!typedData.data ||!Array.isArray(typedData.data.suppliers,)) {
    throw new Error("La respuesta de proveedores no tiene el formato esperado",);
  }

  return typedData.data.suppliers;
}