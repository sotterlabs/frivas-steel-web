import Image from "next/image";
import { about } from "@/lib/content";

export default function Hero() {
  return (
    <section id="inicio" className="bg-bone-50 pt-28 pb-8 lg:pt-32 lg:pb-10">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="bg-pastel-50 rounded-3xl px-6 sm:px-10 lg:px-14 py-14 lg:py-20">
          <div className="grid lg:grid-cols-12 lg:items-center gap-10 lg:gap-8">
            <div className="lg:col-span-7">
              <p className="text-sm font-medium text-navy-700 mb-6">
                Steel framing &amp; ceiling specialists in Edmonton
              </p>

              <h1 className="font-display font-extrabold leading-[1.05] text-4xl sm:text-5xl lg:text-6xl text-navy-900 max-w-3xl">
                Choose <span className="text-sky-500">FRIVAS</span> for your
                next project
              </h1>

              <p className="mt-7 text-lg text-navy-700 max-w-xl leading-relaxed">
                Frivas designs and builds steel framing, ceilings, insulation
                and interiors for commercial and residential projects across
                Alberta.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-900 font-semibold px-7 py-3.5 rounded-full transition-colors"
                >
                  Start a project
                </a>

                <a
                  href="#servicios"
                  className="inline-flex items-center gap-2 text-navy-900 font-semibold px-2 py-3.5 hover:text-sky-500 transition-colors"
                >
                  View services →
                </a>
              </div>

              <div className="mt-16 flex flex-wrap gap-x-10 gap-y-3 border-t border-white/60 pt-8">
                {about.badges.map((badge) => (
                  <span
                    key={badge}
                    className="text-sm font-medium text-navy-500"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <Image
                src="/images/logo.png"
                alt="Frivas Interior & Steel Framing Ltd."
                width={420}
                height={420}
                priority
                className="w-48 sm:w-64 lg:w-full max-w-sm h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}