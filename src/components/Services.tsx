import { services } from "@/lib/content";

export default function Services() {
  return (
    <section id="servicios" className="bg-bone-50 py-8 lg:py-10">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="bg-pastel-50 rounded-3xl px-6 sm:px-10 lg:px-14 py-14 lg:py-20">
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

          <div className="mt-16 grid sm:grid-cols-2 gap-px bg-white rounded-2xl overflow-hidden">
            {services.map((service, i) => (
              <div
                key={service.slug}
                className="bg-white p-8 lg:p-10 flex flex-col gap-4 hover:bg-sky-500/10 transition-colors"
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
      </div>
    </section>
  );
}