"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#servicios", label: "Services" },
  { href: "#proyectos", label: "Projects" },
  { href: "#nosotros", label: "About" },
  { href: "#contacto", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-pastel-100"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8 flex items-center justify-between h-20">
        <a
          href="#inicio"
          className="font-display font-extrabold text-navy-900 text-lg tracking-tight"
        >
          <Image
            src="/images/logo.png"
            alt="Frivas Interior & Steel Framing Ltd."
            width={220}
            height={56}
            priority
            className="h-20 lg:h-20 w-auto"
          />
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-navy-700 hover:text-navy-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          className="hidden md:inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
        >
          Get a Quote
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="md:hidden text-navy-900 p-2 -mr-2"
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
        <nav className="md:hidden bg-white border-t border-pastel-100 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-navy-900"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center gap-2 bg-navy-900 text-white text-sm font-semibold px-5 py-3 rounded-full mt-2"
          >
            Start a project
          </a>
        </nav>
      )}
    </header>
  );
}
