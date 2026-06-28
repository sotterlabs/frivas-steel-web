import { services } from "@/lib/content";

export default function Services() {
  return (
    <section id="servicios" className="bg-pastel-50 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="text-sm font-semibold text-sky-500 uppercase tracking-wide mb-4">
          Services
        </p>
        <h2 className="font-display font-extrabold text-3xl lg:text-4xl text-navy-900 max-w-xl">
          Built for the way job sites actually work.
        </h2>
        <p className="mt-5 text-navy-700 max-w-lg leading-relaxed">
          From structural framing to the last finished surface — one crew,
          four core capabilities.
        </p>

        <div className="mt-16 grid sm:grid-cols-2 gap-px bg-pastel-100 rounded-2xl overflow-hidden">
          {services.map((service, i) => (
            <div
              key={service.slug}
              className="bg-white p-8 lg:p-10 flex flex-col gap-4 hover:bg-pastel-50 transition-colors"
            >
              <span className="font-mono text-sm text-sky-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display font-bold text-xl text-navy-900">
                {service.title}
              </h3>
              <p className="text-sm text-navy-700 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
