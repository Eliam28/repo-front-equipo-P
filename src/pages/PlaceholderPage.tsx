import { Link } from "react-router-dom";
import { PageFrame } from "../components/PageFrame";

type PlaceholderPageProps = {
  title: string;
};

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <PageFrame
      title={title}
      subtitle="Sección en proceso de desarrollo."
      action={
        <Link
          to="/"
          className="inline-flex w-full items-center justify-center border border-black px-4 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white"
        >
          Volver
        </Link>
      }
    >
      <div className="border border-black bg-white p-5 text-sm text-black/60">
        Sin endpoints configurados todavía.
      </div>
    </PageFrame>
  );
}
