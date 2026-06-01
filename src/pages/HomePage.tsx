import { Link } from "react-router-dom";
import { apiSections, totalEndpoints } from "../data/apis";

export function HomePage() {
  return (
    <div className="min-h-screen bg-white px-4 py-0 sm:px-6 lg:px-8">
      <div className="min-h-screen w-full border-x border-black bg-white px-0 py-6 sm:py-8">
        <div className="border-b border-black px-4 pb-5 sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-black/50">
            API dashboard
          </p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-black sm:text-3xl">
                Elige un servicio para probar
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-black/60 sm:text-base">
                Accede rápidamente a los endpoints de Odoo, Prestashop y WordPress.
              </p>
            </div>
            <div className="border border-black px-4 py-3 text-right">
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-black/50">
                Total endpoints
              </p>
              <p className="mt-2 text-2xl font-semibold text-black">
                {totalEndpoints}
              </p>
            </div>
          </div>
        </div>

        <section className="mt-6 grid gap-4 px-4 md:grid-cols-3 sm:px-6 lg:px-8">
          {apiSections.map((section) => (
            <Link
              key={section.id}
              to={`/${section.id}`}
              className="group border border-black bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#000]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-black">
                    {section.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-black/60">
                    {section.description}
                  </p>
                </div>
                <span className="border border-black px-2.5 py-1 text-xs font-medium text-black transition group-hover:bg-black group-hover:text-white">
                  {section.count}
                </span>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
