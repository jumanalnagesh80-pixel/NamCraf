import { Link } from "@tanstack/react-router";
import { TEMPLATES } from "~/lib/templates";
import { TemplateCard } from "~/components/TemplateCard";
import { Button } from "~/components/ui/Button";

/** "Template Spark" — a curated preview grid of the most popular templates. */
export function SparkGrid() {
  const spark = [...TEMPLATES].sort((a, b) => b.popularity - a.popularity).slice(0, 8);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6" aria-labelledby="spark-heading">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <span className="text-secondary text-sm font-bold tracking-wide uppercase">
            Template Spark
          </span>
          <h2 id="spark-heading" className="font-display mt-1 text-3xl font-black sm:text-4xl">
            Fresh from the studio
          </h2>
        </div>
        <Link to="/templates" className="hidden sm:block">
          <Button variant="outline">See all 40+</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {spark.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>

      <div className="mt-8 flex justify-center sm:hidden">
        <Link to="/templates">
          <Button variant="outline">See all 40+</Button>
        </Link>
      </div>
    </section>
  );
}
