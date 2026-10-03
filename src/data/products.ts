import { Product } from "@/types";

/**
 * Dummy product data for TOKO FITS TIRUR.
 * All names and prices are development examples only.
 * Replace with real inventory when a backend is connected.
 *
 * Images use picsum.photos with deterministic seeds so they stay stable across
 * reloads. Swap with real product photography when available.
 */

const unsplashIds = [
  "1529374255404-311a2a4f1fd9",
  "1515886657613-9f3515b0c78f",
  "1492707892479-7bc8d5a4ee93",
  "1583743814966-8936f5b7be1a",
  "1576566588028-4147f3842f27",
  "1541099649105-f69ad21f3246",
  "1552374196-1ab2a1c593e8",
  "1503342394128-c104d54dba01",
  "1521572163474-6864f9cf17ab",
];

const IMG = (seed: number, w = 800, h = 1000) => {
  const id = unsplashIds[seed % unsplashIds.length];
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}&h=${h}`;
};

export const products: Product[] = [
  {
    id: "prod-001",
    slug: "oversized-essential-tee",
    name: "Oversized Essential Tee",
    description:
      "An everyday staple redefined. This oversized tee is crafted from 220 GSM cotton for a thick, premium drape that holds its shape wash after wash. Drop shoulders and a relaxed box fit give you that effortless streetwear silhouette.",
    details: [
      "220 GSM 100% ring-spun cotton",
      "Drop shoulder construction",
      "Ribbed crew neckline",
      "Pre-shrunk fabric",
      "Machine wash cold",
    ],
    price: 899,
    category: "Oversized Tees",
    images: [IMG(101), IMG(102), IMG(103), IMG(104)],
    colors: [
      { name: "Charcoal", hex: "#2D2D2D", images: [IMG(101), IMG(102)] },
      { name: "Off White", hex: "#F5F0EB", images: [IMG(103), IMG(104)] },
      { name: "Sage", hex: "#8B9E7C" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    isNew: true,
    isSale: false,
    stock: 42,
    featured: true,
  },
  {
    id: "prod-002",
    slug: "urban-graphic-tee",
    name: "Urban Graphic Tee",
    description:
      "Bold front graphic on a relaxed-fit silhouette. Water-based print that softens over time for a perfectly broken-in vintage feel. Pair with cargos or denim for an instant street-ready look.",
    details: [
      "180 GSM combed cotton",
      "Water-based screen print",
      "Relaxed regular fit",
      "Taped shoulder seams",
      "Machine wash inside-out",
    ],
    price: 1199,
    category: "Graphic Tees",
    images: [IMG(201), IMG(202), IMG(203)],
    colors: [
      { name: "Black", hex: "#0A0A0A", images: [IMG(201), IMG(202)] },
      { name: "Washed Navy", hex: "#1E2A3A", images: [IMG(203)] },
    ],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    isSale: false,
    stock: 35,
    featured: true,
  },
  {
    id: "prod-003",
    slug: "everyday-boxy-tee",
    name: "Everyday Boxy Tee",
    description:
      "The perfect boxy cut that hits right at the hip. Made from a soft cotton-poly blend that resists wrinkles and keeps you looking fresh all day long.",
    details: [
      "190 GSM cotton-polyester blend (70/30)",
      "Boxy cropped fit",
      "Double-stitched hem",
      "Wrinkle-resistant fabric",
    ],
    price: 799,
    category: "Oversized Tees",
    images: [IMG(301), IMG(302), IMG(303)],
    colors: [
      { name: "Stone", hex: "#B5A99A" },
      { name: "Dusty Rose", hex: "#C4A4A7" },
      { name: "Cement", hex: "#A0A0A0" },
    ],
    sizes: ["S", "M", "L", "XL"],
    isNew: false,
    isSale: false,
    stock: 58,
    featured: true,
  },
  {
    id: "prod-004",
    slug: "washed-street-tee",
    name: "Washed Street Tee",
    description:
      "Enzyme-washed for a worn-in texture from day one. The slightly faded color palette gives each piece an individual character. Heavy-weight cotton ensures durability.",
    details: [
      "240 GSM enzyme-washed cotton",
      "Vintage garment-dyed finish",
      "Oversized fit",
      "Reinforced stitching",
    ],
    price: 1299,
    originalPrice: 1599,
    category: "Oversized Tees",
    images: [IMG(401), IMG(402), IMG(403), IMG(404)],
    colors: [
      { name: "Washed Black", hex: "#3A3A3A", images: [IMG(401), IMG(402)] },
      { name: "Washed Olive", hex: "#6B6B4F", images: [IMG(403), IMG(404)] },
    ],
    sizes: ["M", "L", "XL", "XXL"],
    isNew: false,
    isSale: true,
    stock: 19,
    featured: true,
  },
  {
    id: "prod-005",
    slug: "relaxed-fit-shirt",
    name: "Relaxed Fit Shirt",
    description:
      "A modern camp-collar shirt in a relaxed silhouette. Light enough for layering, sharp enough to wear alone. The perfect crossover between casual and put-together.",
    details: [
      "100% rayon fabric",
      "Camp collar / revere collar",
      "Relaxed fit through body",
      "Single chest pocket",
      "Button-front closure",
    ],
    price: 1799,
    category: "Shirts",
    images: [IMG(501), IMG(502), IMG(503)],
    colors: [
      { name: "Cream", hex: "#F5E6D3" },
      { name: "Midnight", hex: "#0A0F24" },
    ],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    isSale: false,
    stock: 27,
    featured: true,
  },
  {
    id: "prod-006",
    slug: "minimal-logo-tee",
    name: "Minimal Logo Tee",
    description:
      "Understated TOKO branding on a clean regular-fit tee. Small embroidered logo on the left chest. The everyday uniform for those who prefer to keep it minimal.",
    details: [
      "200 GSM organic cotton",
      "Embroidered chest logo",
      "Regular fit",
      "Certified organic cotton",
    ],
    price: 999,
    category: "Graphic Tees",
    images: [IMG(601), IMG(602), IMG(603)],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#0A0A0A" },
      { name: "Grey Marl", hex: "#B8B8B8" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    isNew: false,
    isSale: false,
    stock: 64,
    featured: false,
  },
  {
    id: "prod-007",
    slug: "street-cargo-pants",
    name: "Street Cargo Pants",
    description:
      "Functional utility pockets meet a tapered streetwear silhouette. Elastic waistband with internal drawcord for a secure, adjustable fit. Built to move with you.",
    details: [
      "Cotton-nylon ripstop blend",
      "6-pocket cargo design",
      "Elastic waistband with drawcord",
      "Tapered leg with elasticated cuffs",
      "YKK zippers",
    ],
    price: 2499,
    category: "Bottomwear",
    images: [IMG(701), IMG(702), IMG(703), IMG(704)],
    colors: [
      { name: "Black", hex: "#0A0A0A", images: [IMG(701), IMG(702)] },
      { name: "Olive", hex: "#4A5D3A", images: [IMG(703), IMG(704)] },
    ],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    isSale: false,
    stock: 22,
    featured: true,
  },
  {
    id: "prod-008",
    slug: "utility-overshirt",
    name: "Utility Overshirt",
    description:
      "A heavyweight overshirt that works as a light jacket. Double chest pockets and a straight hem make this the ideal layering piece for transitional weather.",
    details: [
      "300 GSM brushed cotton twill",
      "Shirt-jacket hybrid",
      "Button-front with snaps",
      "Two chest flap pockets",
      "Straight hem",
    ],
    price: 2199,
    originalPrice: 2799,
    category: "Shirts",
    images: [IMG(801), IMG(802), IMG(803)],
    colors: [
      { name: "Tan", hex: "#C4A77D" },
      { name: "Charcoal", hex: "#2D2D2D" },
    ],
    sizes: ["M", "L", "XL"],
    isNew: false,
    isSale: true,
    stock: 11,
    featured: true,
  },
  {
    id: "prod-009",
    slug: "heavyweight-cotton-tee",
    name: "Heavyweight Cotton Tee",
    description:
      "Built to last. Our heaviest tee at 260 GSM delivers a structured, almost jacket-like drape. No see-through fabric, no flimsy construction — just substance.",
    details: [
      "260 GSM heavyweight cotton",
      "Oversized boxy fit",
      "Double-needle stitching throughout",
      "Ribbed collar resists stretching",
    ],
    price: 1099,
    category: "Oversized Tees",
    images: [IMG(901), IMG(902), IMG(903)],
    colors: [
      { name: "Bone", hex: "#E8DDD0" },
      { name: "Graphite", hex: "#4A4A4A" },
      { name: "Rust", hex: "#B7543B" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    isNew: false,
    isSale: false,
    stock: 45,
    featured: false,
  },
  {
    id: "prod-010",
    slug: "vintage-graphic-tee",
    name: "Vintage Graphic Tee",
    description:
      "Retro-inspired graphics with a cracked-ink vintage treatment. Each wash adds more character. Relaxed fit with a slightly longer body for modern layering.",
    details: [
      "200 GSM pre-washed cotton",
      "Cracked vintage print finish",
      "Slightly longer body length",
      "Relaxed fit",
    ],
    price: 1399,
    originalPrice: 1699,
    category: "Graphic Tees",
    images: [IMG(1001), IMG(1002), IMG(1003)],
    colors: [
      { name: "Faded Black", hex: "#2A2A2A" },
      { name: "Washed Burgundy", hex: "#6B3040" },
    ],
    sizes: ["S", "M", "L", "XL"],
    isNew: false,
    isSale: true,
    stock: 16,
    featured: false,
  },
  {
    id: "prod-011",
    slug: "relaxed-denim",
    name: "Relaxed Denim",
    description:
      "Wide-leg denim with a relaxed rise. Washed for a soft, broken-in feel right out of the box. Classic five-pocket construction with branded rivets.",
    details: [
      "12 oz selvedge-style denim",
      "Wide-leg relaxed fit",
      "Mid rise",
      "Five-pocket construction",
      "Branded metal rivets",
    ],
    price: 2799,
    category: "Bottomwear",
    images: [IMG(1101), IMG(1102), IMG(1103), IMG(1104)],
    colors: [
      { name: "Mid Wash", hex: "#5B7FAE", images: [IMG(1101), IMG(1102)] },
      { name: "Black Rinse", hex: "#1A1A1A", images: [IMG(1103), IMG(1104)] },
    ],
    sizes: ["28", "30", "32", "34", "36"],
    isNew: true,
    isSale: false,
    stock: 30,
    featured: false,
  },
  {
    id: "prod-012",
    slug: "everyday-street-shorts",
    name: "Everyday Street Shorts",
    description:
      "Above-the-knee street shorts in a lightweight cotton twill. Elastic waist with an internal drawcord. The warm-weather essential for everyday wear.",
    details: [
      "180 GSM cotton twill",
      "Above-the-knee length",
      "Elastic waistband with drawcord",
      "Two side pockets, one back pocket",
    ],
    price: 1499,
    category: "Bottomwear",
    images: [IMG(1201), IMG(1202), IMG(1203)],
    colors: [
      { name: "Black", hex: "#0A0A0A" },
      { name: "Beige", hex: "#D4C5A9" },
      { name: "Navy", hex: "#1E2A3A" },
    ],
    sizes: ["S", "M", "L", "XL"],
    isNew: false,
    isSale: false,
    stock: 38,
    featured: false,
  },
];

export const categories = [
  "Oversized Tees",
  "Graphic Tees",
  "Shirts",
  "Bottomwear",
] as const;

export const allSizes = [
  "S", "M", "L", "XL", "XXL",
  "28", "30", "32", "34", "36",
] as const;

export const allColors = [
  { name: "Black", hex: "#0A0A0A" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Charcoal", hex: "#2D2D2D" },
  { name: "Off White", hex: "#F5F0EB" },
  { name: "Sage", hex: "#8B9E7C" },
  { name: "Navy", hex: "#1E2A3A" },
  { name: "Stone", hex: "#B5A99A" },
  { name: "Olive", hex: "#4A5D3A" },
  { name: "Cream", hex: "#F5E6D3" },
  { name: "Rust", hex: "#B7543B" },
  { name: "Beige", hex: "#D4C5A9" },
] as const;

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter(
      (p) => p.id !== product.id && p.category === product.category
    )
    .slice(0, limit)
    .concat(
      products
        .filter(
          (p) => p.id !== product.id && p.category !== product.category
        )
    )
    .slice(0, limit);
}
