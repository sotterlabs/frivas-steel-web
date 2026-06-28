import { about, whyUs } from "@/lib/content";

export default function About() {
  return (
    <section id="nosotros" className="bg-bone-50 py-8 lg:py-10">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="bg-pastel-50 rounded-3xl px-6 sm:px-10 lg:px-14 py-14 lg:py-20">
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
              <div key={item.title} className="border-t-2 border-sky-500 pt-6">
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
      </div>
    </section>
  );
}