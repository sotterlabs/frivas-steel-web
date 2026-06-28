"use client";

import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { href: "#servicios", label: "Services" },
  { href: "#proyectos", label: "Projects" },
  { href: "#nosotros", label: "About" },
  { href: "#contacto", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-navy-900 shadow-sm shadow-navy-900/20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 flex items-center justify-between h-20">
        <a href="#inicio" className="flex items-center shrink-0">
          <Image
            src="/images/logo-white.png"
            alt="Frivas Interior & Steel Framing Ltd."
            width={220}
            height={56}
            priority
            className="h-14 lg:h-16 w-auto"
          />
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-sky-300 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          className="hidden md:inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-900 text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
        >
          Get a Quote
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="md:hidden text-white p-2 -mr-2"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            {open ? (
              <path
                d="M5 5L19 19M19 5L5 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 6H21M3 12H21M3 18H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-navy-900 border-t border-white/10 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-white"
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center gap-2 bg-gold-500 text-navy-900 text-sm font-semibold px-5 py-3 rounded-full mt-2"
          >
            Get a Quote
          </a>
        </nav>
      )}
    </header>
  );
}