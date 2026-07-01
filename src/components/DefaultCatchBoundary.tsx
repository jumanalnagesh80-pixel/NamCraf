import {
  ErrorComponent,
  Link,
  rootRouteId,
  useMatch,
  useRouter,
  type ErrorComponentProps,
} from "@tanstack/react-router";

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter();
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId,
  });

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="bg-gradient-stamp shadow-stamp flex h-16 w-16 items-center justify-center rounded-2xl text-2xl">
        ⚠️
      </div>
      <div>
        <h1 className="font-display text-3xl font-black">Something came unstuck</h1>
        <p className="text-muted-foreground mt-2 max-w-md">
          An unexpected error occurred. You can try again, or head back to safety.
        </p>
      </div>
      <ErrorComponent error={error} />
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => router.invalidate()}
          className="bg-primary text-primary-foreground shadow-stamp rounded-full px-6 py-3 text-sm font-semibold transition hover:opacity-90"
        >
          Try again
        </button>
        {isRoot ? (
          <Link
            to="/"
            className="border-border rounded-full border px-6 py-3 text-sm font-semibold transition hover:bg-muted"
          >
            Home
          </Link>
        ) : (
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              window.history.back();
            }}
            className="border-border rounded-full border px-6 py-3 text-sm font-semibold transition hover:bg-muted"
          >
            Go back
          </Link>
        )}
      </div>
    </div>
  );
}
