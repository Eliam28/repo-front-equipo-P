import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { PageFrame } from "../components/PageFrame";
import {
  fetchPrestashopProductByReference,
  type PrestashopProduct,
} from "../services/prestashop/products";

function getProductName(product: PrestashopProduct) {
  return product.name[0]?.value ?? "Sin nombre";
}

export function PrestashopProductPage() {
  const { reference } = useParams();

  const [product, setProduct] = useState<PrestashopProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadProduct() {
      if (!reference) {
        setError("Falta la referencia del producto");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const productData = await fetchPrestashopProductByReference(
          reference,
          abortController.signal,
        );

        setProduct(productData);
      } catch (requestError) {
        if (!abortController.signal.aborted) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Error inesperado",
          );
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadProduct();

    return () => {
      abortController.abort();
    };
  }, [reference]);

  return (
    <PageFrame
      title="Detalle de producto"
      subtitle="Consulta el producto por SKU/clave usando el endpoint específico."
      action={
        <Link
          to="/prestashop"
          className="inline-flex w-full items-center justify-center border border-black px-4 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white"
        >
          Volver a Prestashop
        </Link>
      }
    >
      <section className="border border-black bg-white">
        <div className="border-b border-black px-5 py-4">
          <p className="text-sm font-medium text-black">Producto</p>
        </div>

        {loading ? (
          <div className="px-5 py-14 text-center text-sm text-black/60">
            Cargando...
          </div>
        ) : error ? (
          <div className="px-5 py-14 text-center text-sm text-black/60">
            {error}
          </div>
        ) : product ? (
          <div className="space-y-6 p-5">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <div className="border border-black bg-white p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                  SKU / Clave
                </p>
                <p className="mt-2 text-lg font-medium text-black">
                  {product.reference}
                </p>
              </div>

              <div className="border border-black bg-white p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                  Nombre
                </p>
                <p className="mt-2 text-lg font-medium text-black">
                  {getProductName(product)}
                </p>
              </div>

              <div className="border border-black bg-white p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                  Precio
                </p>
                <p className="mt-2 text-lg font-medium text-black">
                  {product.price}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="border border-black bg-white p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                  ID
                </p>
                <p className="mt-2 text-sm text-black">{product.id}</p>
              </div>

              <div className="border border-black bg-white p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                  Categoría por defecto
                </p>
                <p className="mt-2 text-sm text-black">
                  {product.id_category_default}
                </p>
              </div>

              <div className="border border-black bg-white p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                  Cantidad
                </p>
                <p className="mt-2 text-sm text-black">{product.quantity}</p>
              </div>

              <div className="border border-black bg-white p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                  Estado
                </p>
                <p className="mt-2 text-sm text-black">
                  {product.active === "1" ? "Activo" : "Inactivo"}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </PageFrame>
  );
}
