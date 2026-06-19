import { useEffect, useRef, useState, createContext, useContext } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────── data & config ─────────────── */

const CUISINES = [
  'Kebabs & Grills', 'Pizza & Pasta', 'Burgers', 'Sushi & Poke',
  'Wings', 'Pan-Asian', 'Arabic', 'Turkish', 'Persian', 'Greek',
  'Uzbek & Plov', 'Russian', 'Indian & Biryani', 'Mexican',
  'Sandwiches', 'Salads & Healthy', 'Lebanese', 'BBQ',
  'Fried Chicken', 'Gluten-Free & Desserts',
];

const CUISINE_IMAGES: Record<string, string> = {
  'Kebabs & Grills': '/cuisine-kebabs.jpg',
  'Pizza & Pasta': '/cuisine-pizza.jpg',
  'Burgers': '/cuisine-burger.jpg',
  'Sushi & Poke': '/cuisine-sushi.jpg',
  'Wings': '/cuisine-wings.jpg',
  'Pan-Asian': '/cuisine-kebabs.jpg',
  'Arabic': '/cuisine-kebabs.jpg',
  'Salads & Healthy': '/cuisine-salad.jpg',
  'Fried Chicken': '/cuisine-wings.jpg',
  'BBQ': '/cuisine-kebabs.jpg',
  'Lebanese': '/cuisine-kebabs.jpg',
};

const SHOWCASE_CUISINES = [
  { name: 'Kebabs & Grills', image: '/cuisine-kebabs.jpg' },
  { name: 'Pizza & Pasta', image: '/cuisine-pizza.jpg' },
  { name: 'Gourmet Burgers', image: '/cuisine-burger.jpg' },
  { name: 'Sushi & Poke', image: '/cuisine-sushi.jpg' },
  { name: 'Fried Chicken & Wings', image: '/cuisine-wings.jpg' },
  { name: 'Salads & Healthy', image: '/cuisine-salad.jpg' },
];

const SERVICE_CARDS = [
  { title: 'Brand & menu', desc: 'Concept, name, logo, and a delivery-optimized menu with smart pricing built to sell.', color: 'bg-orange' },
  { title: 'Content & tech', desc: 'Professional food photography, app listings, and order-management systems set up end to end.', color: 'bg-gold' },
  { title: 'Platform launch', desc: 'Full setup, approval, and activation across every major UAE delivery aggregator.', color: 'bg-burgundy' },
  { title: 'Daily operations', desc: 'Cooking, packaging, dispatch, customer support, and growth — managed entirely by us.', color: 'bg-dark-brown' },
];

const SERVICE_GRID = [
  { title: 'Kitchen & Production', desc: 'Licensed facility, trained chefs, consistent quality — every order, every day.' },
  { title: 'Packaging & Fulfilment', desc: 'Branded packaging, portion control, and quality checks before every dispatch.' },
  { title: 'Orders & Logistics', desc: 'Real-time order processing, dispatch coordination, and delivery management.' },
  { title: 'Aggregator Management', desc: 'Account management, menu updates, and performance optimization across all platforms.' },
  { title: 'Merchandising & Optimization', desc: 'Menu positioning, photo updates, and conversion rate optimization on every app.' },
  { title: 'Financial Reporting', desc: 'Weekly sales reports, cost breakdowns, and transparent revenue tracking.' },
  { title: 'Marketing & Growth', desc: 'Promotional campaigns, discount strategies, and customer acquisition support.' },
  { title: 'Customer Experience', desc: 'Review management, complaint resolution, and customer retention programs.' },
  { title: 'Brand Control', desc: 'You own the trademark, the menu, and the brand identity — 100% yours, always.' },
];

const FAQ_ITEMS = [
  { q: 'Who owns the food brand?', a: 'You do. 100%. Your name is on the trademark, the menu, and the brand identity. We operate it for you, but you own everything.' },
  { q: 'Do I need a kitchen or staff?', a: 'No. We handle all cooking, packaging, and dispatch from our licensed facility. You never step into a kitchen unless you want to visit.' },
  { q: 'How fast can I go live?', a: 'Most brands launch within 2–4 weeks. Some start receiving trial orders within days. The full setup with all platforms, photography, and systems takes about a month.' },
  { q: 'Which delivery platforms do you work with?', a: 'We onboard your brand across all major UAE aggregators: Talabat, Deliveroo, Careem, Noon, Keeta, and Smiles.' },
  { q: 'What cuisines can I choose from?', a: 'We offer 20+ cuisines including Kebabs & Grills, Pizza & Pasta, Burgers, Sushi, Fried Chicken, Arabic, Pan-Asian, and many more. Don\'t see your idea? Tell us — we can develop it.' },
  { q: 'How does pricing work?', a: 'We offer three plans: Monthly (AED 5,500/mo), Hybrid (AED 12,500 + AED 3,500/mo), and Yearly (AED 4,500/mo billed annually). All plans include a 5% management fee on net revenue.' },
  { q: 'How do I get my sales revenue?', a: 'All sales revenue goes directly to your company bank account. We provide transparent weekly reports so you always know your numbers.' },
  { q: 'Can I visit the kitchen?', a: 'Absolutely. We encourage founders to visit our facility, meet the team, and see how their brand is being prepared.' },
];

const TIMELINE_STEPS = [
  { title: 'Brand name & logo', desc: 'We develop your concept, create a memorable name, and design a logo that stands out on delivery apps.' },
  { title: 'Trademark reservation', desc: 'Your brand name and identity are protected under UAE trademark law — 100% owned by you.' },
  { title: 'Menu & pricing engineering', desc: 'We craft a delivery-optimized menu with smart pricing, portion sizes, and upsell strategies built to sell.' },
  { title: 'Food styling & photography', desc: 'Professional food photography shot by our team — every dish styled to convert browsers into buyers.' },
  { title: 'Systems & KDS setup', desc: 'Order management systems, kitchen display screens, and tech infrastructure configured end to end.' },
  { title: 'Aggregator onboarding', desc: 'Full setup and approval across Talabat, Deliveroo, Careem, Noon, Keeta, and Smiles.' },
  { title: 'Go live & first orders', desc: 'Your brand launches. Orders start flowing. We manage daily operations while you watch your business grow.' },
];

/* ─────────────── context ─────────────── */

interface AppContextType {
  selectedCuisine: string;
  setSelectedCuisine: (c: string) => void;
  scrollTo: (id: string) => void;
}

const AppContext = createContext<AppContextType>({
  selectedCuisine: 'Kebabs & Grills',
  setSelectedCuisine: () => {},
  scrollTo: () => {},
});

export const useApp = () => useContext(AppContext);

/* ─────────────── SVG Icons ─────────────── */

const ForkIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 2v10M14 2v10M10 18.5V22M14 18.5V22M8 2h8v4a4 4 0 0 1-8 0V2z" />
  </svg>
);

const CheckIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const XIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const PhoneIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const WhatsAppIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const StarIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ArrowDown = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
  </svg>
);



const InstagramIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedInIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

/* ─────────────── Components ─────────────── */

function Navigation({ lenisRef }: { lenisRef: React.MutableRefObject<Lenis | null> }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Cuisines', href: '#cuisines' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      lenisRef.current?.scrollTo(el as HTMLElement, { offset: -72 });
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-cream/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 h-[72px] flex items-center justify-between">
          <button onClick={() => lenisRef.current?.scrollTo(0)} className="flex items-center gap-2 group">
            <ForkIcon className="w-5 h-5 text-burgundy group-hover:text-orange transition-colors" />
            <span className="font-semibold text-charcoal text-lg tracking-tight">Fork & Founders</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <button key={link.href} onClick={() => handleNav(link.href)} className="text-sm font-medium text-charcoal hover:text-orange transition-colors">
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="tel:0581913320" className="flex items-center gap-1.5 text-sm font-medium text-charcoal hover:text-orange transition-colors">
              <PhoneIcon className="w-4 h-4" />
              058 191 3320
            </a>
            <button onClick={() => handleNav('#lead-form')} className="bg-orange text-white text-sm font-semibold px-5 py-2.5 rounded-pill hover:bg-orange/90 transition-colors shadow-card">
              Get Your Plan
            </button>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></> : <><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></>}
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-cream pt-[72px]">
          <div className="flex flex-col items-center gap-6 pt-12">
            {navLinks.map(link => (
              <button key={link.href} onClick={() => handleNav(link.href)} className="text-xl font-medium text-charcoal hover:text-orange transition-colors">
                {link.label}
              </button>
            ))}
            <a href="tel:0581913320" className="flex items-center gap-2 text-lg font-medium text-charcoal mt-4">
              <PhoneIcon className="w-5 h-5" />
              058 191 3320
            </a>
            <button onClick={() => handleNav('#lead-form')} className="bg-orange text-white font-semibold px-8 py-3 rounded-pill hover:bg-orange/90 transition-colors mt-4">
              Get Your Plan
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function HeroSection({ lenisRef }: { lenisRef: React.MutableRefObject<Lenis | null> }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const blobPathRef = useRef<SVGPathElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  const blobPaths = [
    'M300,120 C420,120 480,200 480,300 C480,400 420,480 300,480 C180,480 120,400 120,300 C120,200 180,120 300,120 Z',
    'M300,100 C440,120 500,220 470,340 C440,460 350,490 250,470 C150,450 100,350 130,230 C160,110 200,90 300,100 Z',
    'M280,90 C450,110 520,260 480,380 C440,500 320,510 220,480 C120,450 80,320 120,200 C160,80 180,80 280,90 Z',
    'M300,80 C460,100 540,240 500,370 C460,500 340,520 240,490 C140,460 60,340 100,210 C140,80 200,70 300,80 Z',
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content entrance animation
      gsap.from('.hero-eyebrow', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.2 });
      gsap.from('.hero-h1', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.4 });
      gsap.from('.hero-body', { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.8 });
      gsap.from('.hero-ctas', { opacity: 0, duration: 0.5, delay: 1.0 });
      gsap.from('.hero-social', { scale: 0.9, opacity: 0, duration: 0.5, delay: 1.2 });
      gsap.from('.hero-stats', { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 1.4 });

      // Scroll-driven blob morph
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 200,
        },
      });

      // Morph through paths
      blobPaths.forEach((path, i) => {
        if (i === 0) return;
        tl.to(blobPathRef.current, {
          attr: { d: path },
          duration: 1,
          ease: 'none',
        }, (i - 1) * 0.25);
      });

      // Scale up the blob
      tl.to('.blob-svg', { scale: 1.5, rotation: 8, duration: 1, ease: 'none' }, 0);

      // Image parallax
      tl.to(heroImageRef.current, { scale: 1.2, yPercent: 15, duration: 1, ease: 'none' }, 0);

      // Content exit
      tl.to(contentRef.current, { yPercent: -20, opacity: 0, duration: 0.5, ease: 'none' }, 0.3);

      // Blob drifts up
      tl.to('.blob-layer', { yPercent: -50, duration: 0.4, ease: 'none' }, 0.6);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollDown = () => {
    const el = document.querySelector('#cuisine-selector');
    if (el) lenisRef.current?.scrollTo(el as HTMLElement, { offset: -72 });
  };

  return (
    <section ref={sectionRef} className="relative" style={{ height: '200vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Blob layer */}
        <div className="blob-layer absolute inset-0 flex items-center justify-center z-[1] pointer-events-none">
          <svg className="blob-svg w-[120vw] h-[120vh] overflow-visible" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet" style={{ transformOrigin: 'center center' }}>
            <defs>
              <clipPath id="blob-clip">
                <path ref={blobPathRef} d="M300,120 C420,120 480,200 480,300 C480,400 420,480 300,480 C180,480 120,400 120,300 C120,200 180,120 300,120 Z" />
              </clipPath>
            </defs>
            <path ref={blobPathRef} className="blob-path" fill="#4A0D2C" d="M300,120 C420,120 480,200 480,300 C480,400 420,480 300,480 C180,480 120,400 120,300 C120,200 180,120 300,120 Z" />
          </svg>
        </div>

        {/* Image layer clipped to blob */}
        <div ref={heroImageRef} className="absolute inset-0 flex items-center justify-center z-[2] pointer-events-none" style={{ clipPath: 'url(#blob-clip)' }}>
          <img src="/hero-food.jpg" alt="Chef plating gourmet food" className="w-full h-full object-cover" />
        </div>

        {/* Floating decorative elements */}
        <div className="absolute inset-0 flex items-center justify-center z-[3] pointer-events-none">
          <div className="animate-orbit absolute">
            <div className="w-12 h-12 bg-orange/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg className="w-6 h-6 text-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
          </div>
          <div className="animate-orbit-reverse absolute" style={{ animationDelay: '-8s' }}>
            <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg className="w-5 h-5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            </div>
          </div>
        </div>

        {/* Content layer */}
        <div ref={contentRef} className="relative z-10 h-full flex items-center">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 w-full">
            <div className="max-w-xl">
              <div className="hero-eyebrow">
                <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.12em] text-orange bg-orange/10 px-3 py-1.5 rounded-pill mb-4">
                  UAE&apos;S #1 FOOD BRAND LAUNCHER
                </span>
              </div>

              <h1 className="hero-h1 text-[clamp(3rem,5.5vw,5rem)] font-medium leading-[0.95] tracking-[-0.04em] text-charcoal mb-6">
                Own a food brand in Dubai.
                <br />
                <span className="text-orange">We cook, deliver &amp; run it all.</span>
              </h1>

              <p className="hero-body text-lg text-warm-grey leading-relaxed max-w-lg mb-8">
                Launch a profitable delivery brand in the UAE — without renting a kitchen, hiring staff, or touching daily operations. You own 100% of the brand. We handle everything else.
              </p>

              <div className="hero-ctas flex flex-wrap items-center gap-4 mb-8">
                <button onClick={() => { const el = document.querySelector('#lead-form'); if (el) lenisRef.current?.scrollTo(el as HTMLElement, { offset: -72 }); }} className="bg-orange text-white font-semibold px-7 py-3.5 rounded-pill hover:bg-orange/90 transition-all shadow-card hover:shadow-card-hover">
                  Get your free brand plan
                </button>
                <a href="https://wa.me/971581913320?text=Hi%20Fork%20%26%20Founders%2C%20I%27m%20interested%20in%20launching%20a%20food%20brand." target="_blank" rel="noopener noreferrer" className="text-charcoal font-medium hover:text-orange transition-colors flex items-center gap-1.5">
                  <WhatsAppIcon className="w-5 h-5 text-green-600" />
                  or chat on WhatsApp
                </a>
              </div>

              <div className="hero-social flex items-center gap-3 mb-8">
                <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-4 py-2.5 rounded-pill shadow-card">
                  <span className="text-sm font-semibold text-charcoal">60+</span>
                  <span className="text-sm text-warm-grey">brands live across Dubai</span>
                </div>
                <div className="flex items-center gap-0.5 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-pill shadow-card">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>
              </div>

              <div className="hero-stats flex items-center gap-6">
                {[
                  { value: '20+', label: 'Cuisines' },
                  { value: '14', label: 'Days to go live' },
                  { value: '100%', label: 'You own it' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-orange/10 flex items-center justify-center mb-2">
                      <span className="text-xl font-semibold text-orange">{stat.value}</span>
                    </div>
                    <span className="text-xs font-medium text-warm-grey uppercase tracking-wide">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button onClick={handleScrollDown} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-warm-grey hover:text-orange transition-colors">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em]">Scroll to explore</span>
          <ArrowDown className="w-5 h-5 animate-bounce-subtle" />
        </button>
      </div>
    </section>
  );
}

function CuisineSelector() {
  const { selectedCuisine, setSelectedCuisine } = useApp();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cuisine-left', { x: -60, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      gsap.from('.cuisine-right', { x: 60, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.15, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const topCuisines = CUISINES.slice(0, 7);

  return (
    <section id="cuisine-selector" ref={sectionRef} className="bg-cream py-20 lg:py-28">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-8 lg:gap-12 items-start">
          {/* Left — Selector Card */}
          <div className="cuisine-left bg-white rounded-2xl shadow-card p-6 lg:p-8">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-orange block mb-2">BUILD YOUR BRAND</span>
            <h3 className="text-2xl font-medium text-charcoal mb-2">Pick a cuisine to begin</h3>
            <p className="text-warm-grey text-sm mb-6">See your future brand — then we make it real.</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {topCuisines.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedCuisine(c)}
                  className={`px-4 py-2 rounded-pill text-sm font-medium transition-all ${selectedCuisine === c ? 'bg-orange text-white shadow-sm' : 'bg-light-grey text-charcoal hover:bg-orange/10 hover:text-orange'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Right — Brand Preview */}
          <div className="cuisine-right">
            <div className="relative">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 rounded-full overflow-hidden shadow-card border-4 border-white">
                  <img
                    src={CUISINE_IMAGES[selectedCuisine] || '/cuisine-kebabs.jpg'}
                    alt={selectedCuisine}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                </div>
                <div className="absolute top-4 right-4 bg-orange text-white text-xs font-semibold px-3 py-1.5 rounded-pill">
                  Live on delivery
                </div>
              </div>

              <div className="text-center mt-6">
                <h2 className="text-3xl font-medium text-charcoal mb-2">Your {selectedCuisine} Brand</h2>
                <div className="flex items-center justify-center gap-3 mb-3">
                  {['Talabat', 'Careem', 'Deliveroo', 'Noon', 'Keeta', 'Smiles'].map(p => (
                    <span key={p} className="text-xs font-medium text-warm-grey bg-light-grey px-2.5 py-1 rounded-md">{p}</span>
                  ))}
                </div>
                <p className="text-sm text-warm-grey mb-6">Registered &amp; trademarked 100% in your name</p>
                <button className="bg-orange text-white font-semibold px-8 py-3.5 rounded-pill hover:bg-orange/90 transition-all shadow-card hover:shadow-card-hover inline-flex items-center gap-2">
                  Build my {selectedCuisine} brand
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
                <p className="text-[11px] text-warm-grey mt-3">Free brand plan · No obligation · We reply within hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.wcu-header', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      gsap.from('.wcu-old', { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });
      gsap.from('.wcu-new', { y: 50, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const oldWay = [
    'Sign a long kitchen lease & buy equipment',
    'Hire & train a full kitchen team',
    'Fight for delivery app approvals alone',
    'Run daily cooking, packing & dispatch',
    'Wait months before your first order',
  ];

  const newWay = [
    'No kitchen lease — we cook in our licensed facility',
    'No staff headaches — our team runs everything',
    'Onboarded on every major delivery app',
    'Packaging, logistics & customer support handled',
    'Your brand goes live in days, not months',
  ];

  return (
    <section id="why-choose" ref={sectionRef} className="bg-white py-20 lg:py-28">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="wcu-header text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-orange block mb-3">WHY FOUNDERS CHOOSE US</span>
          <h2 className="text-[clamp(2rem,3.5vw,3.5rem)] font-medium leading-[0.95] text-charcoal mb-4">Skip the hardest, most expensive parts</h2>
          <p className="text-warm-grey leading-relaxed">Opening a food business usually means burning capital on rent, equipment, and a team before your first order. We flipped the model.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Old Way */}
          <div className="wcu-old bg-light-grey rounded-2xl p-6 lg:p-8">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-warm-grey block mb-2">THE OLD WAY</span>
            <h3 className="text-2xl font-medium text-charcoal mb-6">Open it yourself</h3>
            <ul className="space-y-4">
              {oldWay.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <XIcon className="w-3 h-3" />
                  </span>
                  <span className="text-charcoal">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* New Way */}
          <div className="wcu-new bg-burgundy rounded-2xl p-6 lg:p-8">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-orange block mb-2">THE FORK &amp; FOUNDERS WAY</span>
            <h3 className="text-2xl font-medium text-white mb-6">We build &amp; run it for you</h3>
            <ul className="space-y-4">
              {newWay.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-orange/20 text-orange flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckIcon className="w-3 h-3" />
                  </span>
                  <span className="text-white/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function FullTeam() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ft-image', { clipPath: 'inset(100% 0 0 0)', duration: 1, ease: 'power3.inOut', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } });
      gsap.utils.toArray('.ft-card').forEach((card, i) => {
        gsap.from(card as Element, { y: 40, opacity: 0, duration: 0.7, delay: i * 0.12, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="bg-cream py-20 lg:py-28">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-8 lg:gap-12 items-start">
          <div className="ft-image rounded-2xl overflow-hidden shadow-card">
            <img src="/chef-manager.jpg" alt="Professional chef in modern kitchen" className="w-full h-full object-cover min-h-[400px] lg:min-h-[500px]" />
          </div>

          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-orange block mb-3">HOW WE WORK</span>
            <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-medium leading-[0.95] text-charcoal mb-3">A full team behind your brand</h2>
            <p className="text-warm-grey leading-relaxed mb-8">Four engines work together so your brand launches fast and keeps growing — while you stay hands-off.</p>

            <div className="grid sm:grid-cols-2 gap-4">
              {SERVICE_CARDS.map((card, i) => (
                <div key={i} className="ft-card bg-white rounded-2xl shadow-card p-5 hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300">
                  <div className={`w-12 h-12 ${card.color} rounded-full flex items-center justify-center mb-4`}>
                    <span className="text-white text-lg font-semibold">{i + 1}</span>
                  </div>
                  <h3 className="text-lg font-medium text-charcoal mb-2">{card.title}</h3>
                  <p className="text-sm text-warm-grey leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LeadForm() {
  const { selectedCuisine } = useApp();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', cuisine: selectedCuisine, plan: 'No preference', notes: '', whatsapp: true,
  });

  useEffect(() => {
    setFormData(prev => ({ ...prev, cuisine: selectedCuisine }));
  }, [selectedCuisine]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.lf-left', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      gsap.from('.lf-right', { y: 60, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const benefits = [
    'Name & concept ideas tailored to your vision',
    'Package & price that fits your budget',
    'Week-by-week launch timeline',
    'Honest answers to all your questions',
  ];

  return (
    <section id="lead-form" ref={sectionRef} className="bg-white py-20 lg:py-28">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div className="lf-left">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-orange block mb-3">START HERE — IT&apos;S FREE</span>
            <h2 className="text-[clamp(2rem,3.5vw,3.5rem)] font-medium leading-[0.95] text-charcoal mb-4">Get your free brand plan</h2>
            <p className="text-warm-grey leading-relaxed mb-8">Tell us what you&apos;d like to launch. A brand specialist will reach out with name ideas, clear pricing, and a realistic timeline — no obligation.</p>

            <ul className="space-y-4">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-orange/10 text-orange flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckIcon className="w-3 h-3" />
                  </span>
                  <span className="text-charcoal">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lf-right bg-white rounded-2xl shadow-card p-6 lg:p-8 relative">
            {/* Decorative document icon */}
            <div className="absolute top-4 right-4 opacity-10">
              <svg className="w-20 h-20 text-burgundy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            </div>

            {!submitted ? (
              <>
                <h3 className="text-2xl font-medium text-charcoal mb-1">Request your brand plan</h3>
                <p className="text-sm text-warm-grey mb-6">Takes 30 seconds. A specialist replies the same day.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-charcoal mb-1.5 block">Your Name</label>
                    <input type="text" placeholder="Ahmed Khalil" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-light-grey bg-light-grey/50 text-charcoal placeholder:text-warm-grey/60" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-charcoal mb-1.5 block">WhatsApp / Phone</label>
                    <input type="tel" placeholder="+971 5X XXX XXXX" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-light-grey bg-light-grey/50 text-charcoal placeholder:text-warm-grey/60" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-charcoal mb-1.5 block">Email</label>
                    <input type="email" placeholder="you@email.com" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-light-grey bg-light-grey/50 text-charcoal placeholder:text-warm-grey/60" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-charcoal mb-1.5 block">Preferred Cuisine</label>
                      <select value={formData.cuisine} onChange={e => setFormData({ ...formData, cuisine: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-light-grey bg-light-grey/50 text-charcoal">
                        {CUISINES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-charcoal mb-1.5 block">Preferred Plan</label>
                      <select value={formData.plan} onChange={e => setFormData({ ...formData, plan: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-light-grey bg-light-grey/50 text-charcoal">
                        <option>No preference</option>
                        <option>Monthly</option>
                        <option>Hybrid</option>
                        <option>Yearly</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-charcoal mb-1.5 block">Anything else? <span className="text-warm-grey font-normal">(Optional)</span></label>
                    <textarea placeholder="Tell us more about your vision..." rows={3} value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-light-grey bg-light-grey/50 text-charcoal placeholder:text-warm-grey/60 resize-none" />
                  </div>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={formData.whatsapp} onChange={e => setFormData({ ...formData, whatsapp: e.target.checked })} className="w-4 h-4 rounded border-light-grey text-orange accent-orange" />
                    <span className="text-sm text-warm-grey">Prefer WhatsApp contact?</span>
                  </label>
                  <button type="submit" className="w-full bg-orange text-white font-semibold py-3.5 rounded-pill hover:bg-orange/90 transition-all shadow-card">
                    Send my request
                  </button>
                  <p className="text-[11px] text-warm-grey text-center">We only use your details to contact you.</p>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckIcon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-medium text-charcoal mb-2">Thanks! Your brand plan request is sent.</h3>
                <p className="text-warm-grey mb-6">A specialist will review your request and reply within 24 hours.</p>
                <a href="https://wa.me/971581913320?text=Hi%20Fork%20%26%20Founders%2C%20I%27m%20interested%20in%20launching%20a%20food%20brand." target="_blank" rel="noopener noreferrer" className="text-orange font-medium hover:underline inline-flex items-center gap-2">
                  <WhatsAppIcon className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FoodShowcase() {
  const { setSelectedCuisine } = useApp();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fs-header', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      gsap.utils.toArray('.fs-card').forEach((card, i) => {
        gsap.from(card as Element, { scale: 0.8, opacity: 0, duration: 0.6, delay: i * 0.08, ease: 'back.out(1.7)', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });
      });
      gsap.from('.fs-banner', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.fs-banner', start: 'top 85%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleCuisineClick = (name: string) => {
    setSelectedCuisine(name);
    const el = document.querySelector('#cuisine-selector');
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="cuisines" ref={sectionRef} className="bg-cream py-20 lg:py-28">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="fs-header text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-orange block mb-3">FROM OUR KITCHENS</span>
          <h2 className="text-[clamp(2rem,3.5vw,3.5rem)] font-medium leading-[0.95] text-charcoal mb-4">Real food. Built to sell on delivery.</h2>
          <p className="text-warm-grey leading-relaxed">Every dish is cooked, styled, and shot by our team. Tap a category to start building your brand.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {SHOWCASE_CUISINES.map((c, i) => (
            <button key={i} onClick={() => handleCuisineClick(c.name)} className="fs-card group text-center">
              <div className="w-32 h-32 lg:w-40 lg:h-40 mx-auto rounded-full overflow-hidden shadow-card group-hover:shadow-card-hover group-hover:scale-105 transition-all duration-300 mb-3">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-medium text-charcoal group-hover:text-orange transition-colors">{c.name}</span>
            </button>
          ))}
        </div>

        <div className="fs-banner bg-burgundy rounded-2xl p-8 lg:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 600 600" preserveAspectRatio="none">
              <path fill="#4A0D2C" d="M100,300 Q200,100 400,100 Q550,200 500,400 Q400,550 200,500 Q50,400 100,300 Z" />
            </svg>
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl lg:text-3xl font-medium text-white mb-3">Ready to skip the hard parts?</h3>
            <p className="text-white/70 mb-6">Get a free brand plan today — your brand could be live within days.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="#lead-form" className="bg-orange text-white font-semibold px-7 py-3 rounded-pill hover:bg-orange/90 transition-all shadow-card">
                Get your free brand plan
              </a>
              <a href="https://wa.me/971581913320?text=Hi%20Fork%20%26%20Founders%2C%20I%27m%20interested%20in%20launching%20a%20food%20brand." target="_blank" rel="noopener noreferrer" className="text-white font-medium hover:text-orange transition-colors inline-flex items-center gap-1.5">
                <WhatsAppIcon className="w-5 h-5" />
                or WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LaunchTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.lt-header', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      gsap.utils.toArray('.lt-step').forEach((step, i) => {
        gsap.from(step as Element, { x: i % 2 === 0 ? -40 : 40, opacity: 0, duration: 0.7, delay: i * 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.lt-timeline', start: 'top 80%' } });
      });
      gsap.from('.lt-line', { scaleY: 0, duration: 1.5, ease: 'none', transformOrigin: 'top', scrollTrigger: { trigger: '.lt-timeline', start: 'top 80%', end: 'bottom 50%', scrub: true } });
      gsap.from('.lt-card', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.lt-card', start: 'top 85%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-20 lg:py-28">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="lt-header text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-orange block mb-3">FROM IDEA TO FIRST ORDERS</span>
          <h2 className="text-[clamp(2rem,3.5vw,3.5rem)] font-medium leading-[0.95] text-charcoal mb-4">Your launch, step by step</h2>
          <p className="text-warm-grey leading-relaxed">A clear, proven sequence — and a realistic four-week roadmap to a brand that&apos;s live and earning.</p>
        </div>

        {/* Timeline */}
        <div className="lt-timeline relative max-w-3xl mx-auto mb-12">
          {/* Line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-light-grey">
            <div className="lt-line absolute inset-0 w-full bg-burgundy origin-top" />
          </div>

          {TIMELINE_STEPS.map((step, i) => (
            <div key={i} className={`lt-step relative flex items-start gap-6 mb-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} pl-12 md:pl-0`}>
                <h3 className="text-lg font-medium text-charcoal mb-1">{step.title}</h3>
                <p className="text-sm text-warm-grey leading-relaxed">{step.desc}</p>
              </div>
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center text-sm font-semibold z-10 shadow-sm">
                {i + 1}
              </div>
              <div className="flex-1 hidden md:block" />
            </div>
          ))}
        </div>

        {/* Timeline Card */}
        <div className="lt-card max-w-2xl mx-auto bg-white rounded-2xl shadow-card p-6 lg:p-8 border-2 border-burgundy/20">
          <h3 className="text-xl font-medium text-charcoal mb-4">Estimated timeline</h3>
          <div className="space-y-3">
            {[
              { week: 'Week 1', task: 'Documentation & brand setup' },
              { week: 'Week 2', task: 'Menu, pricing & systems' },
              { week: 'Week 3', task: 'Aggregator approvals' },
              { week: 'Week 4', task: 'Testing, soft launch & go live' },
            ].map((row, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-sm font-semibold text-orange w-16 flex-shrink-0">{row.week}</span>
                <div className="flex-1 h-px bg-light-grey" />
                <span className="text-sm text-warm-grey">{row.task}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-warm-grey mt-4 pt-4 border-t border-light-grey">Many brands start receiving orders within days — the four weeks cover the complete, polished setup.</p>
        </div>
      </div>
    </section>
  );
}

function ServiceGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.sg-header', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      gsap.utils.toArray('.sg-card').forEach((card, i) => {
        gsap.from(card as Element, { y: 30, opacity: 0, duration: 0.6, delay: i * 0.06, ease: 'power3.out', scrollTrigger: { trigger: '.sg-grid', start: 'top 80%' } });
      });
      gsap.from('.sg-cta', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.sg-cta', start: 'top 85%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-cream py-20 lg:py-28">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="sg-header text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-orange block mb-3">EVERYTHING IS DONE FOR YOU</span>
          <h2 className="text-[clamp(2rem,3.5vw,3.5rem)] font-medium leading-[0.95] text-charcoal">What we handle, A to Z</h2>
        </div>

        <div className="sg-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {SERVICE_GRID.map((service, i) => (
            <div key={i} className="sg-card bg-white rounded-2xl shadow-card p-6 text-center hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300">
              <div className="w-12 h-12 bg-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange text-lg font-semibold">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="text-base font-medium text-charcoal mb-2">{service.title}</h3>
              <p className="text-sm text-warm-grey leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>

        <div className="sg-cta text-center">
          <h3 className="text-2xl font-medium text-charcoal mb-4">We handle all of it. You own the brand.</h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#lead-form" className="bg-orange text-white font-semibold px-7 py-3 rounded-pill hover:bg-orange/90 transition-all shadow-card">
              Get your free brand plan
            </a>
            <a href="https://wa.me/971581913320?text=Hi%20Fork%20%26%20Founders%2C%20I%27m%20interested%20in%20launching%20a%20food%20brand." target="_blank" rel="noopener noreferrer" className="text-charcoal font-medium hover:text-orange transition-colors">
              or WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CuisinesFull() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cf-header', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      gsap.utils.toArray('.cf-item').forEach((item, i) => {
        gsap.from(item as Element, { y: 20, opacity: 0, duration: 0.5, delay: i * 0.03, ease: 'power3.out', scrollTrigger: { trigger: '.cf-grid', start: 'top 80%' } });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-20 lg:py-28">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="cf-header text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-orange block mb-3">CHOOSE YOUR CONCEPT</span>
          <h2 className="text-[clamp(2rem,3.5vw,3.5rem)] font-medium leading-[0.95] text-charcoal mb-4">20+ cuisines. 1,600+ products.</h2>
        </div>

        <div className="cf-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          {CUISINES.map((c, i) => (
            <div key={i} className="cf-item flex items-center gap-3 p-3 rounded-xl hover:bg-cream transition-colors cursor-default">
              <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center flex-shrink-0">
                <span className="text-burgundy text-xs font-semibold">{c.charAt(0)}</span>
              </div>
              <span className="text-sm font-medium text-charcoal">{c}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-warm-grey">
          Don&apos;t see your idea?{' '}
          <a href="#lead-form" className="text-orange font-medium hover:underline">Tell us your concept</a>
          {' '}— we work across 20+ cuisines and 1,600+ products.
        </p>
      </div>
    </section>
  );
}

function Pricing({ lenisRef }: { lenisRef: React.MutableRefObject<Lenis | null> }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pr-header', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      gsap.utils.toArray('.pr-card').forEach((card, i) => {
        gsap.from(card as Element, { y: 60, opacity: 0, duration: 0.9, delay: i * 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.pr-grid', start: 'top 75%' } });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const features = [
    'Full brand concept & design',
    'Menu development & photography',
    'Delivery app onboarding (all 6 platforms)',
    'Kitchen, cooking & packaging',
    'Order management & dispatch',
    'Customer support',
    'Monthly financial reporting',
    'Marketing & growth support',
    'Priority support & menu updates',
  ];

  const plans = [
    {
      name: 'Hybrid',
      desc: 'Best for founders who want lower commitment',
      price: 'AED 12,500',
      period: 'one-time + AED 3,500/month',
      featured: false,
      featureCount: 7,
      cta: 'Choose Hybrid',
    },
    {
      name: 'Monthly',
      desc: 'Best for founders who want to start fast',
      price: 'AED 5,500',
      period: '/month',
      featured: true,
      featureCount: 8,
      cta: 'Start Monthly',
      note: 'No large upfront fee. Cancel anytime.',
      badge: 'MOST POPULAR',
    },
    {
      name: 'Yearly',
      desc: 'Best value for committed founders',
      price: 'AED 4,500',
      period: '/month (billed annually)',
      featured: false,
      featureCount: 9,
      cta: 'Choose Yearly',
      originalPrice: 'AED 5,500',
      saveNote: 'Save AED 12,000 per year',
    },
  ];

  return (
    <section id="pricing" ref={sectionRef} className="bg-white py-20 lg:py-28">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="pr-header text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-orange block mb-3">SIMPLE, FLEXIBLE PRICING</span>
          <h2 className="text-[clamp(2rem,3.5vw,3.5rem)] font-medium leading-[0.95] text-charcoal mb-4">Three ways to start</h2>
          <p className="text-warm-grey leading-relaxed">Choose the plan that fits your goals. All plans include full brand setup, daily operations, and platform management.</p>
        </div>

        <div className="pr-grid grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
          {plans.map((plan, pi) => (
            <div key={pi} className={`pr-card relative rounded-2xl p-6 lg:p-8 ${plan.featured ? 'bg-burgundy text-white scale-[1.02] shadow-lg' : 'bg-white border border-light-grey shadow-card'}`}>
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-pill">
                  {plan.badge}
                </div>
              )}

              <h3 className="text-xl font-medium mb-1">{plan.name}</h3>
              <p className={`text-sm mb-4 ${plan.featured ? 'text-white/70' : 'text-warm-grey'}`}>{plan.desc}</p>

              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-semibold">{plan.price}</span>
                  {plan.originalPrice && (
                    <span className="text-sm text-warm-grey line-through">{plan.originalPrice}</span>
                  )}
                </div>
                <span className={`text-sm ${plan.featured ? 'text-white/70' : 'text-warm-grey'}`}>{plan.period}</span>
              </div>

              <div className={`h-px mb-4 ${plan.featured ? 'bg-white/20' : 'bg-light-grey'}`} />

              <ul className="space-y-2.5 mb-6">
                {features.slice(0, plan.featureCount).map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.featured ? 'bg-orange/30 text-orange' : 'bg-orange/10 text-orange'}`}>
                      <CheckIcon className="w-2.5 h-2.5" />
                    </span>
                    <span className={`text-sm ${plan.featured ? 'text-white/90' : 'text-charcoal'}`}>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => { const el = document.querySelector('#lead-form'); if (el) lenisRef.current?.scrollTo(el as HTMLElement, { offset: -72 }); }}
                className={`w-full font-semibold py-3 rounded-pill transition-all ${plan.featured ? 'bg-orange text-white hover:bg-orange/90' : 'border-2 border-burgundy text-burgundy hover:bg-burgundy hover:text-white'}`}
              >
                {plan.cta}
              </button>

              {plan.note && <p className="text-[11px] text-white/50 text-center mt-3">{plan.note}</p>}
              {plan.saveNote && <p className="text-[11px] text-orange text-center mt-3 font-medium">{plan.saveNote}</p>}
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-warm-grey mt-8 max-w-lg mx-auto">
          + 5% monthly management fee on net revenue across all plans.
        </p>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-header', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      gsap.utils.toArray('.faq-item').forEach((item, i) => {
        gsap.from(item as Element, { y: 20, opacity: 0, duration: 0.5, delay: i * 0.06, ease: 'power3.out', scrollTrigger: { trigger: '.faq-list', start: 'top 80%' } });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" ref={sectionRef} className="bg-light-grey py-20 lg:py-28">
      <div className="max-w-[800px] mx-auto px-6 lg:px-8">
        <div className="faq-header text-center mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-orange block mb-3">GOOD QUESTIONS</span>
          <h2 className="text-[clamp(2rem,3.5vw,3.5rem)] font-medium leading-[0.95] text-charcoal">Everything you&apos;re wondering</h2>
        </div>

        <div className="faq-list space-y-3">
          {FAQ_ITEMS.map((faq, i) => (
            <div key={i} className="faq-item bg-white rounded-xl shadow-xs overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-cream/50 transition-colors"
              >
                <span className="text-base font-medium text-charcoal pr-4">{faq.q}</span>
                <span className={`w-6 h-6 text-orange flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-45' : ''}`}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300 ease-out"
                style={{ maxHeight: openIndex === i ? '300px' : '0px' }}
              >
                <div className="px-5 pb-5">
                  <p className="text-warm-grey leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ lenisRef }: { lenisRef: React.MutableRefObject<Lenis | null> }) {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-content', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: footerRef.current, start: 'top 90%' } });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  const handleNav = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) lenisRef.current?.scrollTo(el as HTMLElement, { offset: -72 });
    }
  };

  return (
    <footer ref={footerRef} className="bg-deep-maroon pt-16 pb-8">
      <div className="footer-content max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Newsletter */}
        <div className="relative bg-burgundy/50 rounded-2xl p-8 lg:p-12 mb-12 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 600 600" preserveAspectRatio="none">
              <path fill="#4A0D2C" d="M100,300 Q200,100 400,100 Q550,200 500,400 Q400,550 200,500 Q50,400 100,300 Z" />
            </svg>
          </div>
          <div className="relative z-10 max-w-xl mx-auto text-center">
            <h3 className="text-2xl font-medium text-white mb-2">Subscribe to our daily newsletter</h3>
            <p className="text-white/70 mb-6">Get insights on UAE food delivery trends, success stories, and tips from our team.</p>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="your@email.com" className="flex-1 px-5 py-3 rounded-pill bg-white text-charcoal placeholder:text-warm-grey/60" />
              <button type="submit" className="bg-orange text-white font-semibold px-6 py-3 rounded-pill hover:bg-orange/90 transition-colors">Subscribe</button>
            </form>
          </div>
        </div>

        {/* Main Footer */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ForkIcon className="w-5 h-5 text-orange" />
              <span className="font-semibold text-white text-lg">Fork &amp; Founders</span>
            </div>
            <p className="text-white/70 text-sm mb-4">Own a food brand in Dubai. We cook, deliver &amp; run it all.</p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-orange transition-colors">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-orange transition-colors">
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a href="https://wa.me/971581913320" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-green-600 transition-colors">
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Links</h4>
            <ul className="space-y-2.5">
              {['How It Works', 'Cuisines', 'Pricing', 'FAQ'].map(link => (
                <li key={link}>
                  <button onClick={() => handleNav(`#${link.toLowerCase().replace(/\s+/g, '-')}`)} className="text-white/70 hover:text-orange transition-colors text-sm">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="tel:0581913320" className="text-white/70 hover:text-orange transition-colors text-sm flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4" /> 058 191 3320
                </a>
              </li>
              <li>
                <a href="https://wa.me/971581913320" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-orange transition-colors text-sm flex items-center gap-2">
                  <WhatsAppIcon className="w-4 h-4" /> WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/50">&copy; 2025 Fork &amp; Founders. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-[11px] text-white/50 hover:text-orange transition-colors">Privacy Policy</a>
            <a href="#" className="text-[11px] text-white/50 hover:text-orange transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function MobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-burgundy transition-transform duration-500 ${visible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="flex items-center h-16">
        <a href="tel:0581913320" className="flex-1 flex flex-col items-center justify-center text-white/80 hover:text-white">
          <PhoneIcon className="w-5 h-5" />
          <span className="text-[10px]">Call</span>
        </a>
        <a href="https://wa.me/971581913320" target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-col items-center justify-center text-white/80 hover:text-white">
          <WhatsAppIcon className="w-5 h-5" />
          <span className="text-[10px]">WhatsApp</span>
        </a>
        <a href="#lead-form" className="flex-1 bg-orange text-white font-semibold text-sm flex items-center justify-center h-full hover:bg-orange/90 transition-colors">
          Get Your Plan
        </a>
      </div>
    </div>
  );
}

/* ─────────────── Main App ─────────────── */

export default function App() {
  const [selectedCuisine, setSelectedCuisine] = useState('Kebabs & Grills');
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) lenisRef.current?.scrollTo(el as HTMLElement, { offset: -72 });
  };

  return (
    <AppContext.Provider value={{ selectedCuisine, setSelectedCuisine, scrollTo }}>
      <Navigation lenisRef={lenisRef} />
      <main className="pt-[72px]">
        <HeroSection lenisRef={lenisRef} />
        <CuisineSelector />
        <WhyChooseUs />
        <FullTeam />
        <LeadForm />
        <FoodShowcase />
        <LaunchTimeline />
        <ServiceGrid />
        <CuisinesFull />
        <Pricing lenisRef={lenisRef} />
        <FAQ />
      </main>
      <Footer lenisRef={lenisRef} />
      <MobileCTA />
    </AppContext.Provider>
  );
}
