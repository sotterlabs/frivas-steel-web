export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-pastel-50 border-t border-pastel-100">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="font-display font-extrabold text-navy-900">
              FRIVAS
            </p>
            <p className="text-sm text-navy-500 mt-1">
              Steel framing &amp; interior construction in Edmonton, AB.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            <a href="#servicios" className="text-sm text-navy-700 hover:text-navy-900">
              Services
            </a>
            <a href="#proyectos" className="text-sm text-navy-700 hover:text-navy-900">
              Projects
            </a>
            <a href="#nosotros" className="text-sm text-navy-700 hover:text-navy-900">
              About
            </a>
            <a href="#contacto" className="text-sm text-navy-700 hover:text-navy-900">
              Contact
            </a>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-pastel-100 text-sm text-navy-500">
          © {year} Frivas Interior &amp; Steel Framing Ltd. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
