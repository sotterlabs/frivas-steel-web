import { about, whyUs } from "@/lib/content";

export default function About() {
  return (
    <section id="nosotros" className="bg-pastel-50 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="text-sm font-semibold text-sky-500 uppercase tracking-wide mb-4">
          About Frivas
        </p>
        <h2 className="font-display font-extrabold text-3xl lg:text-4xl text-navy-900 max-w-2xl">
          A steel framing crew focused on precision, safety and clear
          communication.
        </h2>

        <div className="mt-8 max-w-2xl space-y-5">
          {about.body.map((paragraph, i) => (
            <p key={i} className="text-navy-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {whyUs.map((item, i) => (
            <div key={item.title}>
              <span className="font-mono text-sm text-sky-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display font-bold text-navy-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-navy-700 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
