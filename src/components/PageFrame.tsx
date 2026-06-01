import type { ReactNode } from "react";

type PageFrameProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
};

export function PageFrame({
  title,
  subtitle,
  action,
  children,
}: PageFrameProps) {
  return (
    <div className="min-h-screen bg-white px-4 py-0 text-black sm:px-6 lg:px-8">
      <div className="flex min-h-screen w-full flex-col gap-6 border-x border-black bg-white px-0 py-6 sm:py-8">
        <header className="flex flex-col gap-4 border-b border-black px-4 pb-5 lg:flex-row lg:items-end lg:justify-between sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-black/50">
              API dashboard
            </p>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-black sm:text-3xl">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-2 max-w-2xl text-sm leading-6 text-black/60 sm:text-base">
                {subtitle}
              </p>
            ) : null}
          </div>
          {action ? <div className="w-full max-w-sm">{action}</div> : null}
        </header>

        <main className="px-4 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
