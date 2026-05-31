import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import { PageFrame } from "../components/PageFrame";

import {
  fetchPrestashopOrderByReference,
  type PrestashopOrder,
} from "../services/prestashop/orders";

export function PrestashopOrderPage() {
  const { reference } = useParams();

  const [order, setOrder] = useState<PrestashopOrder | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadOrder() {
      if (!reference) {
        setError("Falta la referencia de la orden");

        setLoading(false);

        return;
      }

      setLoading(true);

      setError(null);

      try {
        const orderData = await fetchPrestashopOrderByReference(
          reference,
          abortController.signal,
        );

        setOrder(orderData);
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

    void loadOrder();

    return () => {
      abortController.abort();
    };
  }, [reference]);

  return (
    <PageFrame
      title="Detalle de orden"
      subtitle="Consulta la orden usando la referencia específica."
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
          <p className="text-sm font-medium text-black">Orden</p>
        </div>

        {loading ? (
          <div className="px-5 py-14 text-center text-sm text-black/60">
            Cargando...
          </div>
        ) : error ? (
          <div className="px-5 py-14 text-center text-sm text-black/60">
            {error}
          </div>
        ) : order ? (
          <div className="space-y-6 p-5">
            <div className="overflow-hidden border border-black bg-white">
              <div className="grid gap-5 p-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="border border-black bg-stone-50 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                      Referencia
                    </p>

                    <p className="mt-2 text-base font-semibold text-black">
                      {order.reference}
                    </p>
                  </div>

                  <div className="border border-black bg-stone-50 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                      Total pagado
                    </p>

                    <p className="mt-2 text-base font-semibold text-black">
                      {order.total_paid}
                    </p>
                  </div>

                  <div className="border border-black bg-stone-50 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                      Cliente ID
                    </p>

                    <p className="mt-2 text-base font-semibold text-black">
                      {order.id_customer}
                    </p>
                  </div>

                  <div className="border border-black bg-stone-50 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                      Fecha creación
                    </p>

                    <p className="mt-2 text-base font-semibold text-black">
                      {order.date_add}
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-1">
                  <div className="border border-black bg-white p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                      ID Orden
                    </p>

                    <p className="mt-2 text-sm text-black">{order.id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </PageFrame>
  );
}
