import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { seo } from "~/lib/seo";
import { SiteLayout } from "~/components/SiteLayout";
import { Button } from "~/components/ui/Button";
import { StampLogo } from "~/components/StampLogo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    ...seo({
      path: "/contact",
      title: "Contact",
      description:
        "Get in touch with NAMCRAFT Graphic Studio. Questions about templates, plans or custom design work — we'd love to hear from you.",
    }),
  }),
  component: ContactPage,
});

const SUBJECTS = ["General question", "Billing & plans", "Custom design work", "Feedback", "Other"];

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: SUBJECTS[0],
    message: "",
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // In a real deployment this would POST to a server route / edge function.
    setSent(true);
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <div className="mb-5 flex justify-center">
            <StampLogo size={52} />
          </div>
          <h1 className="font-display text-4xl font-black sm:text-5xl">Say hello 👋</h1>
          <p className="text-muted-foreground mx-auto mt-3 max-w-md">
            Whether it's a question, a bug, or a big idea — drop us a line and we'll get back to
            you within one business day.
          </p>
        </div>

        {sent ? (
          <div className="border-border bg-card shadow-soft mt-10 flex flex-col items-center rounded-3xl border p-10 text-center">
            <span className="text-5xl" aria-hidden="true">
              ✅
            </span>
            <h2 className="font-display mt-4 text-2xl font-black">Message sent!</h2>
            <p className="text-muted-foreground mt-2 max-w-sm">
              Thanks, {form.name || "friend"}. We've received your note about “{form.subject}” and
              will reply to {form.email || "your inbox"} soon.
            </p>
            <Button
              className="mt-6"
              variant="outline"
              onClick={() => {
                setSent(false);
                setForm({ name: "", email: "", subject: SUBJECTS[0], message: "" });
              }}
            >
              Send another message
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="border-border bg-card shadow-soft mt-10 space-y-5 rounded-3xl border p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-muted-foreground mb-1.5 block text-sm font-medium">
                  Name
                </span>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="editor-input"
                  placeholder="Ada Lovelace"
                />
              </label>
              <label className="block">
                <span className="text-muted-foreground mb-1.5 block text-sm font-medium">
                  Email
                </span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="editor-input"
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-muted-foreground mb-1.5 block text-sm font-medium">
                Subject
              </span>
              <select
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="editor-input"
              >
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-muted-foreground mb-1.5 block text-sm font-medium">
                Message
              </span>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="editor-input resize-none"
                placeholder="Tell us what's on your mind…"
              />
            </label>

            <Button type="submit" size="lg" className="w-full">
              Send message
            </Button>
            <p className="text-muted-foreground text-center text-xs">
              We'll never share your email. Read our privacy promise in the footer.
            </p>
          </form>
        )}
      </div>
    </SiteLayout>
  );
}
