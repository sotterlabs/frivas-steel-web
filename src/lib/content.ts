// Central content config for Frivas Interior & Steel Framing Ltd.
// Edit here to update site-wide text without touching components.


export const carouselImages = [
  "/images/carrousel/01.jpeg",
  "/images/carrousel/02.jpeg",
  "/images/carrousel/03.jpeg",
  "/images/carrousel/04.jpeg",
  "/images/carrousel/05.jpeg",
  "/images/carrousel/06.jpeg",
  "/images/carrousel/07.jpeg",
  "/images/carrousel/08.jpeg",
  "/images/carrousel/09.jpeg",
  "/images/carrousel/10.jpeg",
  "/images/carrousel/11.jpeg",
  "/images/carrousel/12.jpeg",
] as const;

export const JOB_TYPES = [
  "Interior Steel Framing Walls",
  "Exterior Steel Framing Walls",
  "Interior Walls, Gypsum and Taping",
  "Ceiling / Tee Bar Ceiling",
] as const;

export const company = {
  name: "Frivas Interior & Steel Framing Ltd.",
  shortName: "FRIVAS",
  hours: "Mon – Fri, 8:00 AM – 6:00 PM MDT",
  contactEmail: "frivassteel@gmail.com",
};

export const services = [
  {
    slug: "steel-framing",
    title: "Steel Framing",
    short: "Precision-built light-gauge steel structures.",
    description:
      "Precision-built light-gauge steel structures for durable and perfectly aligned interiors. Engineered to spec and installed to tight tolerances on commercial and residential job sites.",
    image: "/images/proyectos/steel-framing.jpg",
  },
  {
    slug: "acoustical-ceilings",
    title: "Acoustical Ceilings",
    short: "Noise-control ceiling systems for professional spaces.",
    description:
      "Noise-control ceiling systems that enhance comfort and professional sound performance — suspended grids, T-bar systems, and acoustic tile installation for offices, retail, and institutional spaces.",
    image: "/images/proyectos/acoustical-ceilings.jpg",
  },
  {
    slug: "insulation",
    title: "Insulation",
    short: "Thermal and acoustic insulation, done right.",
    description:
      "Professional thermal and acoustic insulation for residential and commercial projects, focused on efficiency, comfort, and long-term durability through Alberta's climate.",
    image: "/images/proyectos/insulation.jpg",
  },
  {
    slug: "interior",
    title: "Interior Construction",
    short: "Functional, modern spaces, finished clean.",
    description:
      "Functional, modern interior spaces finished with accuracy, quality materials, and clean design — drywall, framing, and finishing carried through to a ready-to-occupy space.",
    image: "/images/proyectos/interior.jpg",
  },
] as const;

export const whyUs = [
  {
    title: "Precision & Quality",
    description:
      "Built with accuracy from start to finish — every frame, ceiling, and wall meets the highest standards of craftsmanship.",
  },
  {
    title: "On-Time Delivery",
    description:
      "We plan and execute efficiently to complete every project on schedule without compromising quality or safety.",
  },
  {
    title: "Safety Guaranteed",
    description:
      "Fully licensed and WCB-covered crews follow strict safety protocols, ensuring a secure and professional job site.",
  },
  {
    title: "Clear Communication",
    description:
      "From quote to completion, we keep you informed at every stage with transparency, consistency, and trust.",
  },
] as const;

// Placeholder project entries. Drop matching files into
// /public/images/proyectos using these exact filenames and the
// gallery will pick them up automatically — no code changes needed.
export const projects = [
  {
    id: "proj-01",
    title: "Commercial Office Build-Out",
    location: "Edmonton, AB",
    category: "Steel Framing",
    image: "/images/proyectos/proyecto-01.jpg",
  },
  {
    id: "proj-02",
    title: "Retail Interior Fit-Up",
    location: "Edmonton, AB",
    category: "Interior",
    image: "/images/proyectos/proyecto-02.jpg",
  },
  {
    id: "proj-03",
    title: "Suspended Acoustic Ceiling",
    location: "Sherwood Park, AB",
    category: "Acoustical Ceilings",
    image: "/images/proyectos/proyecto-03.jpg",
  },
  {
    id: "proj-04",
    title: "Multi-Family Residential Framing",
    location: "Edmonton, AB",
    category: "Steel Framing",
    image: "/images/proyectos/proyecto-04.jpg",
  },
  {
    id: "proj-05",
    title: "Warehouse Insulation Retrofit",
    location: "Leduc, AB",
    category: "Insulation",
    image: "/images/proyectos/proyecto-05.jpg",
  },
  {
    id: "proj-06",
    title: "Medical Clinic Interior",
    location: "Edmonton, AB",
    category: "Interior",
    image: "/images/proyectos/proyecto-06.jpg",
  },
] as const;

export const about = {
  heading: "About Us",
  body: [
    "At Frivas Interior & Steel Framing Ltd., we specialize in light-gauge steel framing, delivering precision-built interiors and exterior structures for both commercial and residential projects.",
    "With years of hands-on experience in Alberta, Canada, and New Zealand, our team brings international craftsmanship and technical expertise to every project we undertake.",
  ],
  badges: ["Licensed & Insured", "Safety First", "Local Experts"],
};
