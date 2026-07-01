import { JOURNAL } from "~/lib/homeData";
import { formatDate } from "~/lib/utils";

export function JournalSection() {
  return (
    <section
      id="journal"
      className="scroll-mt-20 bg-muted/40 border-border border-y"
      aria-labelledby="journal-heading"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <span className="text-secondary text-sm font-bold tracking-wide uppercase">Journal</span>
          <h2 id="journal-heading" className="font-display mt-2 text-3xl font-black sm:text-4xl">
            From the studio desk
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {JOURNAL.map((post) => (
            <article
              key={post.id}
              className="group border-border bg-card shadow-soft flex flex-col overflow-hidden rounded-2xl border transition hover:-translate-y-1 hover:shadow-stamp"
            >
              <div className="bg-gradient-sunrise flex h-40 items-center justify-center text-5xl">
                <span aria-hidden="true">{post.emoji}</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="text-muted-foreground flex items-center gap-2 text-xs font-semibold uppercase">
                  <span className="text-secondary">{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readMinutes} min read</span>
                </div>
                <h3 className="mt-2 text-lg font-bold leading-snug group-hover:underline">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                <time className="text-muted-foreground mt-4 text-xs" dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
