import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { seo } from "~/lib/seo";
import { SiteLayout } from "~/components/SiteLayout";
import { Button } from "~/components/ui/Button";
import { StampLogo } from "~/components/StampLogo";
import { useAuth } from "~/hooks/useAuth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    ...seo({
      path: "/auth",
      title: "Sign in",
      description:
        "Sign in or create a free NAMCRAFT Graphic Studio account to sync your favorites and saved designs across devices.",
    }),
  }),
  component: AuthPage,
});

type Mode = "signin" | "signup";

function AuthPage() {
  const { user, cloudEnabled, signInWithPassword, signUpWithPassword, signInWithGoogle } =
    useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Redirect signed-in users to their favorites.
  useEffect(() => {
    if (user) void navigate({ to: "/favorites" });
  }, [user, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setLoading(true);
    const result =
      mode === "signin"
        ? await signInWithPassword(email, password)
        : await signUpWithPassword(email, password, name);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else if (mode === "signup") {
      setNotice("Account created! Check your email to confirm, then sign in.");
      setMode("signin");
    }
  }

  async function handleGoogle() {
    setError(null);
    const result = await signInWithGoogle();
    if (result.error) setError(result.error);
  }

  return (
    <SiteLayout>
      <div className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6">
        <div className="text-center">
          <div className="mb-5 flex justify-center">
            <StampLogo size={52} />
          </div>
          <h1 className="font-display text-3xl font-black">
            {mode === "signin" ? "Welcome back" : "Create your studio"}
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            {mode === "signin"
              ? "Sign in to sync your favorites and designs."
              : "Free forever. Sync your work across every device."}
          </p>
        </div>

        {!cloudEnabled && (
          <div className="border-accent bg-accent/20 mt-6 rounded-2xl border px-4 py-3 text-sm">
            <strong>Demo mode:</strong> cloud isn't connected yet. Add your Supabase keys to{" "}
            <code>.env</code> to enable real sign-in. You can still use the editor as a guest —
            work is saved to this device.
          </div>
        )}

        <div className="border-border bg-card shadow-soft mt-6 rounded-3xl border p-6 sm:p-8">
          <div className="bg-muted mb-6 grid grid-cols-2 gap-1 rounded-full p-1">
            {(["signin", "signup"] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  setError(null);
                  setNotice(null);
                }}
                className={`rounded-full py-2 text-sm font-semibold transition ${
                  mode === m ? "bg-card shadow-soft" : "text-muted-foreground"
                }`}
              >
                {m === "signin" ? "Sign in" : "Sign up"}
              </button>
            ))}
          </div>

          <Button variant="outline" className="w-full" onClick={handleGoogle}>
            <span aria-hidden="true">🔵</span> Continue with Google
          </Button>

          <div className="text-muted-foreground my-5 flex items-center gap-3 text-xs">
            <span className="bg-border h-px flex-1" />
            OR
            <span className="bg-border h-px flex-1" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <label className="block">
                <span className="text-muted-foreground mb-1.5 block text-sm font-medium">
                  Name
                </span>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="editor-input"
                  placeholder="Your name"
                />
              </label>
            )}
            <label className="block">
              <span className="text-muted-foreground mb-1.5 block text-sm font-medium">Email</span>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="editor-input"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </label>
            <label className="block">
              <span className="text-muted-foreground mb-1.5 block text-sm font-medium">
                Password
              </span>
              <input
                required
                type="password"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="editor-input"
                placeholder="••••••••"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
              />
            </label>

            {error && (
              <p className="text-destructive text-sm" role="alert">
                {error}
              </p>
            )}
            {notice && (
              <p className="text-primary text-sm" role="status">
                {notice}
              </p>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading
                ? "Please wait…"
                : mode === "signin"
                  ? "Sign in"
                  : "Create free account"}
            </Button>
          </form>
        </div>

        <p className="text-muted-foreground mt-6 text-center text-sm">
          By continuing you agree to our terms.{" "}
          <Link to="/" className="text-primary hover:underline">
            Back home
          </Link>
        </p>
      </div>
    </SiteLayout>
  );
}
