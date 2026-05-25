export type OdooCategorie = {
  id: number;
  name: string;
  complete_name: string;
  parent_id: number;
  parent_name: string;
};

const CATEGORIES_URL = "http://127.0.0.1:8000/api/odoo/categories";

export async function ObtenerCategorias(): Promise<OdooCategorie[]> {
  const response = await fetch(CATEGORIES_URL);

  if (!response.ok) {
    throw new Error(`No se pueden cargar las categorias (${response.status})`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("La respuesta no tiene el formato esperado");
  }

  return data as OdooCategorie[];
}
