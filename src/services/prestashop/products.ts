export type PrestashopLocalizedValue = {
  id: number;
  value: string;
};

export type PrestashopProduct = {
  id: number;
  id_category_default: number;
  quantity: number;
  reference: string;
  price: string;
  wholesale_price?: string;
  active: string;
  date_add: string;
  date_upd: string;
  name: PrestashopLocalizedValue[];
  [key: string]: unknown;
};

type PrestashopProductsResponse = {
  status: string;
  data: {
    products: PrestashopProduct[];
  };
  errors: string[];
};

const PRODUCTS_URL = "http://127.0.0.1:8000/api/prestashop/products/";

function parseProductsResponse(data: unknown): PrestashopProduct[] {
  if (typeof data !== "object" || data === null || !("data" in data)) {
    throw new Error("La respuesta de Prestashop no tiene el formato esperado");
  }

  const typedData = data as PrestashopProductsResponse;

  if (!typedData.data || !Array.isArray(typedData.data.products)) {
    throw new Error("La respuesta de productos no tiene el formato esperado");
  }

  return typedData.data.products;
}

export async function fetchPrestashopProducts(
  signal?: AbortSignal,
): Promise<PrestashopProduct[]> {
  const response = await fetch(PRODUCTS_URL, { signal });

  if (!response.ok) {
    throw new Error(`No se pudieron cargar los productos (${response.status})`);
  }

  const data: unknown = await response.json();

  return parseProductsResponse(data);
}

export async function fetchPrestashopProductByReference(
  reference: string,
  signal?: AbortSignal,
): Promise<PrestashopProduct> {
  const response = await fetch(
    `${PRODUCTS_URL}${encodeURIComponent(reference)}`,
    { signal },
  );

  if (!response.ok) {
    throw new Error(
      `No se pudo cargar el producto ${reference} (${response.status})`,
    );
  }

  const data: unknown = await response.json();
  const products = parseProductsResponse(data);
  const product = products[0];

  if (!product) {
    throw new Error("No se encontró el producto solicitado");
  }

  return product;
}
