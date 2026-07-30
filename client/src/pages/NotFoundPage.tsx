import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex items-center justify-center px-6 relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f1f3f6 1px, transparent 1px), linear-gradient(to bottom, #f1f3f6 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative w-full max-w-xl">
        <div className="mb-10 flex items-center gap-2 font-mono text-xs tracking-wide text-slate-400">
          <span className="hover:text-slate-600 transition-colors">home</span>
          <span className="text-slate-300">/</span>
          <span className="hover:text-slate-600 transition-colors">docs</span>
          <span className="text-slate-300">/</span>
          <span className="inline-flex items-center gap-1 rounded border border-dashed border-blue-300 px-1.5 py-0.5 text-blue-600">
            this-page
          </span>
        </div>

        <p className="text-sm font-semibold tracking-[0.2em] text-blue-600 uppercase">
          Error 404
        </p>

        <h1 className="mt-3 text-[clamp(3.5rem,5vw,6rem)] font-bold leading-none tracking-tight text-slate-900">
          Page not found
        </h1>

        <p className="mt-5 max-w-md text-base leading-relaxed text-slate-500">
          The page you're looking for doesn't exist, moved, or the link was
          typed wrong. Check the address, or head back to a page that does.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </button>
        </div>

        <div className="mt-14 flex items-center gap-2.5 border-t border-slate-100 pt-6 text-sm text-slate-400">
          <Search className="h-4 w-4 shrink-0" />
          <span>
            Try searching, or contact{" "}
            <a
              href="mailto:support@example.com"
              className="text-slate-600 underline decoration-slate-300 underline-offset-2 hover:text-blue-600 hover:decoration-blue-300"
            >
              healthixiacare@gmail.com
            </a>{" "}
            if you think this is a mistake.
          </span>
        </div>
      </div>
    </div>
  );
}