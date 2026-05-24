import type { ReactNode } from "react";

type OdooResponseTableProps = {
  title: string;
  loading: boolean;
  error: string | null;
  emptyMessage: string;
  children: ReactNode;
};

export function OdooResponseTable({
  title,
  loading,
  error,
  emptyMessage,
  children,
}: OdooResponseTableProps) {
  return (
    <section className="overflow-hidden border border-black bg-white">
      <div className="border-b border-black px-5 py-4">
        <p className="text-sm font-medium text-black">{title}</p>
      </div>

      {loading ? (
        <div className="px-5 py-14 text-center text-sm text-black/60">
          Cargando...
        </div>
      ) : error ? (
        <div className="px-5 py-14 text-center text-sm text-black/60">
          {error}
        </div>
      ) : (
        (children ?? (
          <div className="px-5 py-14 text-center text-sm text-black/60">
            {emptyMessage}
          </div>
        ))
      )}
    </section>
  );
}
