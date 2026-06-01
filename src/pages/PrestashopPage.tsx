import { useCallback, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { PageFrame } from "../components/PageFrame";
import { OdooEndpointSection } from "../components/OdooEndpointSection";
import { OdooResponseTable } from "../components/OdooResponseTable";

import {
  fetchPrestashopCustomers,
  type PrestashopCustomer,
} from "../services/prestashop/customers";

import {
  fetchPrestashopSuppliers,
  type PrestashopSupplier,
} from "../services/prestashop/suppliers";

import {
  fetchPrestashopProducts,
  type PrestashopProduct,
} from "../services/prestashop/products";

import {
  fetchPrestashopOrders,
  type PrestashopOrder,
} from "../services/prestashop/orders";

import {
  fetchPrestashopPayments,
  type PrestashopPayment,
} from "../services/prestashop/payments";

const prestashopEndpoints = [
  {
    id: "customers",
    label: "Obtener clientes",
    path: "http://127.0.0.1:8000/api/prestashop/customers",
    active: true,
  },
  {
    id: "suppliers",
    label: "Obtener proveedores",
    path: "http://127.0.0.1:8000/api/prestashop/suppliers",
    active: true,
  },
  {
    id: "products",
    label: "Obtener productos",
    path: "http://127.0.0.1:8000/api/prestashop/products",
    active: true,
  },
  {
    id: "orders",
    label: "Obtener órdenes",
    path: "http://127.0.0.1:8000/api/prestashop/orders",
    active: true,
  },
  {
    id: "payments",
    label: "Obtener pagos",
    path: "http://127.0.0.1:8000/api/prestashop/payments",
    active: true,
  },
] as const;

type PrestashopEndpointId = (typeof prestashopEndpoints)[number]["id"];

function getProductName(product: PrestashopProduct) {
  return product.name[0]?.value ?? "Sin nombre";
}

function OrdersTable({ orders }: { orders: PrestashopOrder[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-black text-left text-sm">
        <thead className="bg-white text-xs uppercase tracking-[0.16em] text-black/60">
          <tr>
            <th className="px-5 py-3 font-medium">ID</th>

            <th className="px-5 py-3 font-medium">Referencia</th>

            <th className="px-5 py-3 font-medium">Cliente ID</th>

            <th className="px-5 py-3 font-medium">Total</th>

            <th className="px-5 py-3 font-medium">Fecha</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-black/10 text-black">
          {orders.map((order) => (
            <tr key={order.id} className="transition hover:bg-black/5">
              <td className="px-5 py-4">{order.id}</td>

              <td className="px-5 py-4 font-medium">{order.reference}</td>

              <td className="px-5 py-4">{order.id_customer}</td>

              <td className="px-5 py-4">{order.total_paid}</td>

              <td className="px-5 py-4">{order.date_add}</td>

              <td className="px-5 py-4">
                <Link
                  to={`/prestashop/ordenes/${encodeURIComponent(order.reference)}`}
                  className="inline-flex items-center border border-black px-3 py-1.5 text-xs font-medium text-black transition hover:bg-black hover:text-white"
                >
                  Ver orden
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CustomersTable({ customers }: { customers: PrestashopCustomer[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-black text-left text-sm">
        <thead className="bg-white text-xs uppercase tracking-[0.16em] text-black/60">
          <tr>
            <th className="px-5 py-3 font-medium">ID</th>

            <th className="px-5 py-3 font-medium">Nombre</th>

            <th className="px-5 py-3 font-medium">Email</th>

            <th className="px-5 py-3 font-medium">Fecha</th>

            <th className="px-5 py-3 font-medium">Activo</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-black/10 text-black">
          {customers.map((customer) => (
            <tr key={customer.id} className="transition hover:bg-black/5">
              <td className="px-5 py-4">{customer.id}</td>

              <td className="px-5 py-4 font-medium">
                {customer.firstname} {customer.lastname}
              </td>

              <td className="px-5 py-4">{customer.email}</td>

              <td className="px-5 py-4">{customer.date_add}</td>

              <td className="px-5 py-4">
                {customer.active === "1" ? "Activo" : "Inactivo"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SuppliersTable({ suppliers }: { suppliers: PrestashopSupplier[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-black text-left text-sm">
        <thead className="bg-white text-xs uppercase tracking-[0.16em] text-black/60">
          <tr>
            <th className="px-5 py-3 font-medium">ID</th>

            <th className="px-5 py-3 font-medium">Nombre</th>

            <th className="px-5 py-3 font-medium">Estado</th>

            <th className="px-5 py-3 font-medium">Fecha creación</th>

            <th className="px-5 py-3 font-medium">Última actualización</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-black/10 text-black">
          {suppliers.map((supplier) => (
            <tr key={supplier.id} className="transition hover:bg-black/5">
              <td className="px-5 py-4">{supplier.id}</td>

              <td className="px-5 py-4 font-medium">{supplier.name}</td>

              <td className="px-5 py-4">
                {supplier.active === "1" ? "Activo" : "Inactivo"}
              </td>

              <td className="px-5 py-4">{supplier.date_add}</td>

              <td className="px-5 py-4">{supplier.date_upd}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProductsTable({ products }: { products: PrestashopProduct[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-black text-left text-sm">
        <thead className="bg-white text-xs uppercase tracking-[0.16em] text-black/60">
          <tr>
            <th className="px-5 py-3 font-medium">SKU / Clave</th>
            <th className="px-5 py-3 font-medium">Nombre</th>
            <th className="px-5 py-3 font-medium">Precio</th>
            <th className="px-5 py-3 font-medium">Activo</th>
            <th className="px-5 py-3 font-medium">Detalle</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-black/10 text-black">
          {products.map((product) => (
            <tr key={product.id} className="transition hover:bg-black/5">
              <td className="px-5 py-4 font-medium">{product.reference}</td>
              <td className="px-5 py-4">{getProductName(product)}</td>
              <td className="px-5 py-4">{product.price}</td>
              <td className="px-5 py-4">
                {product.active === "1" ? "Activo" : "Inactivo"}
              </td>
              <td className="px-5 py-4">
                <Link
                  to={`/prestashop/productos/${encodeURIComponent(product.reference)}`}
                  className="inline-flex items-center border border-black px-3 py-1.5 text-xs font-medium text-black transition hover:bg-black hover:text-white"
                >
                  Ver producto
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function PaymentsTable({ payments }: { payments: PrestashopPayment[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-black text-left text-sm">
        <thead className="bg-white text-xs uppercase tracking-[0.16em] text-black/60">
          <tr>
            <th className="px-5 py-3 font-medium">ID</th>
            <th className="px-5 py-3 font-medium">Referencia</th>
            <th className="px-5 py-3 font-medium">Método de pago</th>
            <th className="px-5 py-3 font-medium">Monto</th>
            <th className="px-5 py-3 font-medium">Fecha</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/10 text-black">
          {payments.map((payment) => (
            <tr key={payment.id} className="transition hover:bg-black/5">
              <td className="px-5 py-4">{payment.id}</td>
              <td className="px-5 py-4 font-medium">
                {payment.order_reference}
              </td>
              <td className="px-5 py-4">{payment.payment_method}</td>
              <td className="px-5 py-4">
                {new Intl.NumberFormat("es-MX", {
                  style: "currency",
                  currency: "MXN",
                }).format(Number(payment.amount))}
              </td>
              <td className="px-5 py-4">{payment.date_add}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderEndpointContent(
  selectedEndpoint: PrestashopEndpointId,
  orders: PrestashopOrder[],
  customers: PrestashopCustomer[],
  suppliers: PrestashopSupplier[],
  products: PrestashopProduct[],
  payments: PrestashopPayment[],
) {
  if (selectedEndpoint === "orders") {
    return orders.length === 0 ? (
      <div className="px-5 py-14 text-center text-sm text-black/60">
        El endpoint respondió con un arreglo vacío.
      </div>
    ) : (
      <OrdersTable orders={orders} />
    );
  }

  if (selectedEndpoint === "customers") {
    return customers.length === 0 ? (
      <div className="px-5 py-14 text-center text-sm text-black/60">
        El endpoint respondió con un arreglo vacío.
      </div>
    ) : (
      <CustomersTable customers={customers} />
    );
  }

  if (selectedEndpoint === "suppliers") {
    return suppliers.length === 0 ? (
      <div className="px-5 py-14 text-center text-sm text-black/60">
        El endpoint respondió con un arreglo vacío.
      </div>
    ) : (
      <SuppliersTable suppliers={suppliers} />
    );
  }

  if (selectedEndpoint === "payments") {
    return payments.length === 0 ? (
      <div className="px-5 py-14 text-center text-sm text-black/60">
        El endpoint respondió con un arreglo vacío.
      </div>
    ) : (
      <PaymentsTable payments={payments} />
    );
  }

  return products.length === 0 ? (
    <div className="px-5 py-14 text-center text-sm text-black/60">
      El endpoint respondió con un arreglo vacío.
    </div>
  ) : (
    <ProductsTable products={products} />
  );
}

export function PrestashopPage() {
  const [orders, setOrders] = useState<PrestashopOrder[]>([]);

  const [customers, setCustomers] = useState<PrestashopCustomer[]>([]);

  const [suppliers, setSuppliers] = useState<PrestashopSupplier[]>([]);

  const [products, setProducts] = useState<PrestashopProduct[]>([]);

  const [payments, setPayments] = useState<PrestashopPayment[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [selectedEndpoint, setSelectedEndpoint] =
    useState<PrestashopEndpointId>("customers");

  const loadData = useCallback(async () => {
    setLoading(true);

    setError(null);

    try {
      if (selectedEndpoint === "orders") {
        const ordersData = await fetchPrestashopOrders();

        const sortedOrders = [...ordersData].sort((a, b) => a.id - b.id);

        setOrders(sortedOrders);
      }

      if (selectedEndpoint === "customers") {
        const customersData = await fetchPrestashopCustomers();

        const sortedCustomers = [...customersData].sort((a, b) => a.id - b.id);

        setCustomers(sortedCustomers);
      }

      if (selectedEndpoint === "suppliers") {
        const suppliersData = await fetchPrestashopSuppliers();

        const sortedSuppliers = [...suppliersData].sort((a, b) => a.id - b.id);

        setSuppliers(sortedSuppliers);
      }

      if (selectedEndpoint === "products") {
        const productsData = await fetchPrestashopProducts();

        const sortedProducts = [...productsData].sort((a, b) =>
          a.reference.localeCompare(b.reference),
        );

        setProducts(sortedProducts);
      }

      if (selectedEndpoint === "payments") {
        const paymentsData = await fetchPrestashopPayments();
        const sortedPayments = [...paymentsData].sort((a, b) => a.id - b.id);
        setPayments(sortedPayments);
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

  const currentEndpoint = prestashopEndpoints.find(
    (endpoint) => endpoint.id === selectedEndpoint,
  );

  return (
    <PageFrame
      title="Prestashop"
      subtitle="Revisa y prueba los endpoints disponibles de Prestashop."
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
          selectedEndpoint={selectedEndpoint}
          onSelectEndpoint={(value) =>
            setSelectedEndpoint(value as PrestashopEndpointId)
          }
          options={prestashopEndpoints}
          title={
            selectedEndpoint === "orders"
              ? "Órdenes"
              : selectedEndpoint === "customers"
                ? "Clientes"
                : selectedEndpoint === "suppliers"
                  ? "Proveedores"
                  : selectedEndpoint === "products"
                    ? "Productos"
                    : "Pagos"
          }
          link={currentEndpoint?.path ?? ""}
        >
          <OdooResponseTable
            title={
              selectedEndpoint === "orders"
                ? "Órdenes"
                : selectedEndpoint === "customers"
                  ? "Clientes"
                  : selectedEndpoint === "suppliers"
                    ? "Proveedores"
                    : selectedEndpoint === "products"
                      ? "Productos"
                      : "Pagos"
            }
            loading={loading}
            error={error}
            emptyMessage="El endpoint respondió con un arreglo vacío."
          >
            {renderEndpointContent(
              selectedEndpoint,
              orders,
              customers,
              suppliers,
              products,
              payments,
            )}
          </OdooResponseTable>
        </OdooEndpointSection>
      </div>
    </PageFrame>
  );
}
