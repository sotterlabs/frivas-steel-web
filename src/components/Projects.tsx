import Image from "next/image";
import { projects } from "@/lib/content";

export default function Projects() {
  return (
    <section id="proyectos" className="bg-pastel-50 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="text-sm font-semibold text-sky-500 uppercase tracking-wide mb-4">
          Projects
        </p>
        <h2 className="font-display font-extrabold text-3xl lg:text-4xl text-navy-900 max-w-xl">
          Recent work across the Edmonton area.
        </h2>
        <p className="mt-5 text-navy-700 max-w-lg leading-relaxed">
          A look at steel framing, ceiling, and interior builds delivered
          for commercial and residential clients.
        </p>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl overflow-hidden bg-white border border-pastel-100 hover:shadow-lg hover:shadow-navy-900/5 transition-shadow"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.title} — ${project.category}, ${project.location}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold text-sky-500 uppercase tracking-wide">
                  {project.category}
                </span>
                <p className="mt-2 font-display font-bold text-navy-900 leading-snug">
                  {project.title}
                </p>
                <p className="mt-1 text-sm text-navy-500">
                  {project.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
