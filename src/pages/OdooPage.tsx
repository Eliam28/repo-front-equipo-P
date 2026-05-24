import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import { OdooEndpointSection } from "../components/OdooEndpointSection";
import { OdooResponseTable } from "../components/OdooResponseTable";
import { PageFrame } from "../components/PageFrame";

import {
  fetchOdooOrders,
  type OdooOrder,
} from "../services/odoo/orders";

import {
  fetchOdooProducts,
  type OdooProduct,
} from "../services/odoo/products";

const odooEndpoints = [
  {
    id: "orders",
    label: "Obtener órdenes",
    path: "http://localhost:8000/api/odoo/orders/",
    active: true,
  },
  {
    id: "products",
    label: "Obtener productos",
    path: "http://127.0.0.1:8000/api/odoo/products",
    active: true,
  },
] as const;

type OdooEndpointId =
  (typeof odooEndpoints)[number]["id"];

function OrdersTable({
  orders,
}: {
  orders: OdooOrder[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-black text-left text-sm">
        <thead className="bg-white text-xs uppercase tracking-[0.16em] text-black/60">
          <tr>
            <th className="px-5 py-3 font-medium">
              Orden
            </th>

            <th className="px-5 py-3 font-medium">
              Cliente
            </th>

            <th className="px-5 py-3 font-medium">
              Fecha
            </th>

            <th className="px-5 py-3 font-medium">
              Total
            </th>

            <th className="px-5 py-3 font-medium">
              Estado
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-black/10 text-black">
          {orders.map((order) => (
            <tr
              key={order.id}
              className="transition hover:bg-black/5"
            >
              <td className="px-5 py-4 font-medium text-black">
                {order.name}
              </td>

              <td className="px-5 py-4">
                {order.partner_name}
              </td>

              <td className="px-5 py-4">
                {order.date_order}
              </td>

              <td className="px-5 py-4">
                {new Intl.NumberFormat(
                  "es-MX",
                  {
                    style: "currency",
                    currency: "MXN",
                    maximumFractionDigits: 2,
                  },
                ).format(order.amount_total)}
              </td>

              <td className="px-5 py-4">
                {order.state}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProductsTable({
  products,
}: {
  products: OdooProduct[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-black text-left text-sm">
        <thead className="bg-white text-xs uppercase tracking-[0.16em] text-black/60">
          <tr>
            <th className="px-5 py-3 font-medium">
              ID
            </th>

            <th className="px-5 py-3 font-medium">
              Nombre
            </th>

            <th className="px-5 py-3 font-medium">
              Código
            </th>

            <th className="px-5 py-3 font-medium">
              Precio
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-black/10 text-black">
          {products.map((product) => (
            <tr
              key={product.id}
              className="transition hover:bg-black/5"
            >
              <td className="px-5 py-4">
                {product.id}
              </td>

              <td className="px-5 py-4 font-medium">
                {product.name}
              </td>

              <td className="px-5 py-4">
                {product.default_code ?? "-"}
              </td>

              <td className="px-5 py-4">
                {new Intl.NumberFormat(
                  "es-MX",
                  {
                    style: "currency",
                    currency: "MXN",
                    maximumFractionDigits: 2,
                  },
                ).format(product.list_price)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function OdooPage() {
  const [orders, setOrders] = useState<
    OdooOrder[]
  >([]);

  const [products, setProducts] = useState<
    OdooProduct[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState<
    string | null
  >(null);

  const [selectedEndpoint, setSelectedEndpoint] =
    useState<OdooEndpointId>("orders");

  const loadData = useCallback(async () => {
    setLoading(true);

    setError(null);

    try {
      if (selectedEndpoint === "orders") {
        const ordersData =
          await fetchOdooOrders();

        setOrders(ordersData);
      }

      if (selectedEndpoint === "products") {
        const productsData =
          await fetchOdooProducts();

        setProducts(productsData);
      }
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Error inesperado",
      );
    } finally {
      setLoading(false);
    }
  }, [selectedEndpoint]);

  useEffect(() => {
    void Promise.resolve().then(() => {
      void loadData();
    });
  }, [loadData]);

  const currentEndpoint = odooEndpoints.find(
    (endpoint) =>
      endpoint.id === selectedEndpoint,
  );

  return (
    <PageFrame
      title="Odoo"
      subtitle="Prueba endpoints de Odoo y agrega más rutas en esta sección."
      action={
        <div className="flex gap-2">
          <Link
            to="/"
            className="inline-flex flex-1 items-center justify-center border border-black px-4 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white"
          >
            Inicio
          </Link>

          <button
            type="button"
            onClick={() => {
              void loadData();
            }}
            className="inline-flex flex-1 items-center justify-center border border-black px-4 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white"
          >
            Refrescar
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        <OdooEndpointSection
          selectedEndpoint={
            selectedEndpoint
          }
          onSelectEndpoint={(value) =>
            setSelectedEndpoint(
              value as OdooEndpointId,
            )
          }
          options={odooEndpoints}
          title={
            selectedEndpoint === "orders"
              ? "Órdenes"
              : "Productos"
          }
          link={currentEndpoint?.path ?? ""}
        >
          <OdooResponseTable
            title={
              selectedEndpoint === "orders"
                ? "Órdenes"
                : "Productos"
            }
            loading={loading}
            error={error}
            emptyMessage="El endpoint respondió con un arreglo vacío."
          >
            {selectedEndpoint ===
            "orders" ? (
              orders.length === 0 ? (
                <div className="px-5 py-14 text-center text-sm text-black/60">
                  El endpoint respondió con un arreglo vacío.
                </div>
              ) : (
                <OrdersTable
                  orders={orders}
                />
              )
            ) : products.length === 0 ? (
              <div className="px-5 py-14 text-center text-sm text-black/60">
                El endpoint respondió con un arreglo vacío.
              </div>
            ) : (
              <ProductsTable
                products={products}
              />
            )}
          </OdooResponseTable>
        </OdooEndpointSection>
      </div>
    </PageFrame>
  );
}