import {
  useCallback,
  useEffect,
  useState,
} from "react";

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
] as const;

type PrestashopEndpointId =
  (typeof prestashopEndpoints)[number]["id"];

function CustomersTable({
  customers,
}: {
  customers: PrestashopCustomer[];
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
              Email
            </th>

            <th className="px-5 py-3 font-medium">
              Fecha
            </th>

            <th className="px-5 py-3 font-medium">
              Activo
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-black/10 text-black">
          {customers.map((customer) => (
            <tr
              key={customer.id}
              className="transition hover:bg-black/5"
            >
              <td className="px-5 py-4">
                {customer.id}
              </td>

              <td className="px-5 py-4 font-medium">
                {customer.firstname}{" "}
                {customer.lastname}
              </td>

              <td className="px-5 py-4">
                {customer.email}
              </td>

              <td className="px-5 py-4">
                {customer.date_add}
              </td>

              <td className="px-5 py-4">
                {customer.active === "1"
                  ? "Activo"
                  : "Inactivo"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SuppliersTable({
  suppliers,
}: {
  suppliers: PrestashopSupplier[];
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
              Estado
            </th>

            <th className="px-5 py-3 font-medium">
              Fecha creación
            </th>

            <th className="px-5 py-3 font-medium">
              Última actualización
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-black/10 text-black">
          {suppliers.map((supplier) => (
            <tr
              key={supplier.id}
              className="transition hover:bg-black/5"
            >
              <td className="px-5 py-4">
                {supplier.id}
              </td>

              <td className="px-5 py-4 font-medium">
                {supplier.name}
              </td>

              <td className="px-5 py-4">
                {supplier.active === "1"
                  ? "Activo"
                  : "Inactivo"}
              </td>

              <td className="px-5 py-4">
                {supplier.date_add}
              </td>

              <td className="px-5 py-4">
                {supplier.date_upd}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PrestashopPage() {
  const [customers, setCustomers] =
    useState<PrestashopCustomer[]>([]);

  const [suppliers, setSuppliers] =
    useState<PrestashopSupplier[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState<
    string | null
  >(null);

  const [selectedEndpoint, setSelectedEndpoint] =
    useState<PrestashopEndpointId>(
      "customers",
    );

  const loadData = useCallback(async () => {
    setLoading(true);

    setError(null);

    try {
      if (selectedEndpoint === "customers") {
        const customersData =
          await fetchPrestashopCustomers();

        const sortedCustomers = [
          ...customersData,
        ].sort((a, b) => a.id - b.id);

        setCustomers(sortedCustomers);
      }

      if (selectedEndpoint === "suppliers") {
        const suppliersData =
          await fetchPrestashopSuppliers();

        const sortedSuppliers = [
          ...suppliersData,
        ].sort((a, b) => a.id - b.id);

        setSuppliers(sortedSuppliers);
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

  const currentEndpoint =
    prestashopEndpoints.find(
      (endpoint) =>
        endpoint.id === selectedEndpoint,
    );

  return (
    <PageFrame
      title="Prestashop"
      subtitle="Prueba endpoints de Prestashop y agrega más rutas en esta sección."
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
              value as PrestashopEndpointId,
            )
          }
          options={prestashopEndpoints}
          title={
            selectedEndpoint === "customers"
              ? "Clientes"
              : "Proveedores"
          }
          link={currentEndpoint?.path ?? ""}
        >
          <OdooResponseTable
            title={
              selectedEndpoint === "customers"
                ? "Clientes"
                : "Proveedores"
            }
            loading={loading}
            error={error}
            emptyMessage="El endpoint respondió con un arreglo vacío."
          >
            {selectedEndpoint ===
            "customers" ? (
              customers.length === 0 ? (
                <div className="px-5 py-14 text-center text-sm text-black/60">
                  El endpoint respondió con un arreglo vacío.
                </div>
              ) : (
                <CustomersTable
                  customers={customers}
                />
              )
            ) : suppliers.length === 0 ? (
              <div className="px-5 py-14 text-center text-sm text-black/60">
                El endpoint respondió con un arreglo vacío.
              </div>
            ) : (
              <SuppliersTable
                suppliers={suppliers}
              />
            )}
          </OdooResponseTable>
        </OdooEndpointSection>
      </div>
    </PageFrame>
  );
}