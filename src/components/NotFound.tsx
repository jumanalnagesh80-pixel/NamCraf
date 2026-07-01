import { Link } from "@tanstack/react-router";

export function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <div className="animate-stamp-spin bg-gradient-stamp shadow-stamp mb-6 flex h-20 w-20 items-center justify-center rounded-2xl text-3xl font-black text-primary-foreground">
        404
      </div>
      <h1 className="font-display text-4xl font-black">This page took a coffee break</h1>
      <p className="text-muted-foreground mt-3 max-w-md">
        We couldn't find the page you were looking for. It may have moved, or perhaps it never
        got stamped in the first place.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="bg-primary text-primary-foreground shadow-stamp rounded-full px-6 py-3 text-sm font-semibold transition hover:opacity-90"
        >
          Back home
        </Link>
        <Link
          to="/templates"
          className="border-border rounded-full border px-6 py-3 text-sm font-semibold transition hover:bg-muted"
        >
          Browse templates
        </Link>
      </div>
    </div>
  );
}
