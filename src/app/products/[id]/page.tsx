import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

// Hardcoded data based on the prototype for each dynamic product
const productsData: Record<string, any> = {
  bracelet: {
    title: "Bracelet",
    eyebrow: "Jewelry · 01",
    bgColor: "#f8f5f0",
    details: ["Metal build, clean finish", "Stacking fit", "Silver and gold options", "Ready to ship"],
    editorialTitle: <>Clean metal,<br /><em>stacked profile.</em></>,
    editorialDesc: "Metal build with a clean, stacked look. Designed to sit right on the wrist without bulk.",
    svgHero: (
      <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeLinecap="round" style={{ width: 200, height: 200, color: "#111" }}>
        <circle cx="60" cy="60" r="44" strokeWidth="5" />
        <circle cx="60" cy="60" r="30" strokeWidth="1.5" strokeDasharray="4 3" />
        <circle cx="60" cy="16" r="6" fill="currentColor" stroke="none" />
        <circle cx="60" cy="16" r="3.5" fill="#ff0033" stroke="none" />
        <circle cx="93" cy="75" r="3" fill="currentColor" stroke="none" opacity="0.3" />
        <circle cx="27" cy="75" r="3" fill="currentColor" stroke="none" opacity="0.3" />
      </svg>
    ),
  },
  watches: {
    title: "Watches",
    eyebrow: "02 — Timepieces",
    bgColor: "#ebe8e2",
    details: ["Curated selection", "Multiple styles available", "Ready to ship", "Get It to find out more"],
    editorialTitle: <>Clean timepieces,<br /><em>curated picks.</em></>,
    editorialDesc: "A selection of watches — different styles, clean profiles. Hit Get It to find out what's available.",
    svgHero: (
      <svg viewBox="0 0 90 130" fill="none" stroke="currentColor" strokeLinecap="round" style={{ width: 180, height: 230, color: "#111" }}>
        <rect x="18" y="28" width="54" height="74" rx="12" strokeWidth="2.5" />
        <circle cx="45" cy="65" r="20" strokeWidth="1.5" />
        <line x1="45" y1="65" x2="45" y2="51" strokeWidth="2" />
        <line x1="45" y1="65" x2="56" y2="65" strokeWidth="1.5" />
        <circle cx="45" cy="65" r="2.5" fill="currentColor" stroke="none" />
        <rect x="28" y="6" width="34" height="22" rx="5" strokeWidth="1.5" />
        <rect x="28" y="102" width="34" height="22" rx="5" strokeWidth="1.5" />
        <line x1="28" y1="17" x2="62" y2="17" strokeWidth="0.8" strokeDasharray="3 3"/>
      </svg>
    ),
  },
  goggles: {
    title: "Goggles",
    eyebrow: "03 — Eyewear",
    bgColor: "#ebebeb",
    details: ["Bold geometric frame", "UV protection lens", "Strong build, clean look", "Wear it every day"],
    editorialTitle: <>Bold frames.<br /><em>Strong geometry.</em></>,
    editorialDesc: "Angular eyewear with a strong silhouette. Built for everyday wear with UV protection.",
    svgHero: (
      <svg viewBox="0 0 140 80" fill="none" stroke="currentColor" strokeLinecap="round" style={{ width: 240, height: 140, color: "#111" }}>
        <rect x="4" y="18" width="58" height="44" rx="14" strokeWidth="3" />
        <rect x="78" y="18" width="58" height="44" rx="14" strokeWidth="3" />
        <path d="M62 40 L78 40" strokeWidth="3" />
        <path d="M4 40 Q0 40 0 32" strokeWidth="2" />
        <path d="M4 40 Q0 40 0 32" strokeWidth="2" />
        <path d="M136 40 Q140 40 140 32" strokeWidth="2" />
        <circle cx="33" cy="40" r="10" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="107" cy="40" r="10" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    ),
  },
  bags: {
    title: "Bags",
    eyebrow: "04 — Accessories",
    bgColor: "#fff2f4",
    details: ["Compact and clean build", "Good hardware throughout", "Multiple options available", "Clean finish"],
    editorialTitle: <>Daily carry,<br /><em>done right.</em></>,
    editorialDesc: "Compact bags built for everyday use. Clean finish, solid hardware.",
    svgHero: (
      <svg viewBox="0 0 110 120" fill="none" stroke="currentColor" strokeLinecap="round" style={{ width: 200, height: 200, color: "#ff0033" }}>
        <path d="M18 42 L8 108 L102 108 L92 42 Z" strokeWidth="2.5" />
        <path d="M38 42 C38 22 72 22 72 42" strokeWidth="2.5" />
        <line x1="25" y1="72" x2="85" y2="72" strokeWidth="1.5" />
        <rect x="44" y="64" width="22" height="14" rx="3" strokeWidth="1.5" />
        <circle cx="55" cy="71" r="2.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
};

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = productsData[resolvedParams.id];

  if (!product) {
    notFound();
  }

  return (
    <main>
      <div className="product-page">
        <div className="product-visual" style={{ position: "relative", background: product.bgColor }}>
          <Image src="/Image/Logo.png" alt="" width={24} height={24} style={{ position: "absolute", top: 16, right: 16, objectFit: "contain", opacity: 0.15 }} />
          {product.svgHero}
        </div>
        <div className="product-info">
          <span className="logo-stamp">
            <Image src="/Image/Logo.png" alt="S" width={18} height={18} /> Secretly®
          </span>
          <p className="product-eyebrow" style={{ marginTop: 16 }}>{product.eyebrow}</p>
          <h1 className="product-title">{product.title}</h1>
          <ul className="product-details">
            {product.details.map((detail: string, i: number) => (
              <li key={i}>{detail}</li>
            ))}
          </ul>
          <div className="product-actions">
            <a
              className="btn btn-black"
              href={`https://ig.me/m/skhh?text=${encodeURIComponent(`Hey, I would like to buy the Secretly ${product.title}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get It
            </a>
            <Link className="btn btn-outline" href="/products">
              ← All Pieces
            </Link>
          </div>
        </div>
      </div>

      <div className="product-editorial">
        <div className="product-editorial-col">
          <h2 className="product-editorial-heading">{product.editorialTitle}</h2>
          <p className="product-editorial-body">{product.editorialDesc}</p>
        </div>
        <div className="product-editorial-col">
          <h2 className="product-editorial-heading">
            Tap Get It.<br />
            <em>That&apos;s the process.</em>
          </h2>
          <p className="product-editorial-body">
            Hit Get It above and your DM opens directly with the piece name. No forms, no checkout.
          </p>
        </div>
      </div>
    </main>
  );
}
