export type OdooProvider = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
};

const PROVIDERS_URL = "http://127.0.0.1:8000/api/odoo/providers/";

export async function fetchOdooProviders(
  signal?: AbortSignal,
): Promise<OdooProvider[]> {
  const response = await fetch(PROVIDERS_URL, { signal });

  if (!response.ok) {
    throw new Error(
      `No se pudieron cargar los proveedores (${response.status})`,
    );
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("La respuesta de proveedores no tiene el formato esperado");
  }

  return data as OdooProvider[];
}
