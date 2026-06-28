import { whyUs } from "@/lib/content";

export default function WhyUs() {
  return (
    <section className="bg-navy-900 text-bone-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="font-mono text-xs tracking-[0.25em] text-gold-500 uppercase mb-4">
          Why Frivas
        </p>
        <h2 className="font-display font-black uppercase text-4xl lg:text-5xl leading-[0.95] mb-16 max-w-xl">
          Why Choose Us
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {whyUs.map((item) => (
            <div key={item.title} className="border-t-2 border-sky-500 pt-6">
              <h3 className="font-display font-bold uppercase text-lg leading-tight mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-sky-300/80 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
