import type { ReactNode } from "react";

type EndpointOption = {
  id: string;
  label: string;
  path: string;
  active: boolean;
};

type OdooEndpointSectionProps = {
  selectedEndpoint: string;
  onSelectEndpoint: (value: string) => void;
  options: ReadonlyArray<EndpointOption>;
  title: string;
  link: string;
  children: ReactNode;
};

export function OdooEndpointSection({
  selectedEndpoint,
  onSelectEndpoint,
  options,
  title,
  link,
  children,
}: OdooEndpointSectionProps) {
  return (
    <section className="border border-black bg-white p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-black/50">
            Endpoint
          </p>
          <select
            value={selectedEndpoint}
            onChange={(event) => onSelectEndpoint(event.target.value)}
            className="mt-3 w-full border border-black bg-white px-3 py-2 text-sm text-black outline-none"
          >
            {options.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
                {item.active ? "" : " (próximamente)"}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:min-w-56">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-black/50">
            Link
          </p>
          <p className="mt-3 break-all text-sm text-black">{link}</p>
        </div>
      </div>

      <div className="mt-4 border-t border-black pt-4">
        <p className="text-sm font-medium text-black">{title}</p>
        <div className="mt-4">{children}</div>
      </div>
    </section>
  );
}
