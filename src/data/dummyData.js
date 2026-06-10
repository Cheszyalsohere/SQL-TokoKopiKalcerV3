// Dummy data for SQL Coffee

export const products = [
  // ---------- Drinks (Menu) ----------
  {
    id: 1,
    name: 'Espresso',
    description: 'Bold & Clean',
    price: 27000,
    category: 'black coffee',
    type: 'drink',
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    id: 2,
    name: 'Americano',
    description: 'Black, No Fuss',
    price: 28000,
    category: 'black coffee',
    type: 'drink',
    image: 'https://images.unsplash.com/photo-1494314671902-399b18174975?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    id: 3,
    name: 'Latte',
    description: 'Creamy & Smooth',
    price: 32000,
    category: 'latte',
    type: 'drink',
    image: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    id: 4,
    name: 'Cold Brew',
    description: 'Slow Steeped 12 Hours',
    price: 36000,
    category: 'cold brew',
    type: 'drink',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    id: 5,
    name: 'Matcha Latte',
    description: 'Earthy & Sweet',
    price: 34000,
    category: 'specialty',
    type: 'drink',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    id: 6,
    name: 'Hazelnut Latte',
    description: 'Nutty & Warm',
    price: 33000,
    category: 'latte',
    type: 'drink',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&h=600&q=80',
  },

  // ---------- Beans (Shop) ----------
  {
    id: 7,
    name: 'Aceh Gayo',
    description: 'Herbal & Full-bodied',
    price: 95000,
    category: 'single origin',
    type: 'bean',
    image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    id: 8,
    name: 'Toraja Sapan',
    description: 'Earthy & Spiced',
    price: 98000,
    category: 'single origin',
    type: 'bean',
    image: 'https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    id: 9,
    name: 'Bali Kintamani',
    description: 'Citrus & Floral',
    price: 92000,
    category: 'single origin',
    type: 'bean',
    image: 'https://images.unsplash.com/photo-1442550528053-c431ecb55509?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    id: 10,
    name: 'House Blend',
    description: 'Balanced & Sweet',
    price: 85000,
    category: 'blend',
    type: 'bean',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    id: 11,
    name: 'Dark Roast Blend',
    description: 'Bold & Smoky',
    price: 88000,
    category: 'blend',
    type: 'bean',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=600&h=600&q=80',
  },

  // ---------- Food (Menu) ----------
  {
    id: 12,
    name: 'Butter Croissant',
    description: 'Flaky & Golden',
    price: 28000,
    category: 'pastry',
    type: 'food',
    image: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    id: 13,
    name: 'Cinnamon Roll',
    description: 'Warm & Sweet',
    price: 32000,
    category: 'pastry',
    type: 'food',
    image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    id: 14,
    name: 'Almond Croissant',
    description: 'Nutty & Rich',
    price: 34000,
    category: 'pastry',
    type: 'food',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    id: 15,
    name: 'Sourdough Toast',
    description: 'Crisp & Hearty',
    price: 30000,
    category: 'savory',
    type: 'food',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&h=600&q=80',
  },
  {
    id: 16,
    name: 'Chocolate Cookie',
    description: 'Chewy & Decadent',
    price: 22000,
    category: 'snack',
    type: 'food',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&h=600&q=80',
  },
];

export const articles = [
  {
    id: 1,
    title: 'A Field Guide to Roast Levels',
    excerpt:
      'Light, medium, or dark — the roast curve quietly decides what your cup will taste like before the beans ever touch water.',
    content: `Roast level is the single biggest variable that shapes how a coffee tastes. A light roast keeps the bean's origin character intact — bright acidity, floral notes, hints of fruit. A medium roast balances that brightness with body and caramel sweetness, which is why so many cafes default to it. Dark roasts push past origin flavor into bittersweet chocolate, smoke, and a heavier mouthfeel.

There's no "best" roast — only the roast that fits the brew method and the drinker. Filter and pour-over tend to favor lighter roasts; espresso and milk drinks usually shine darker. The trick is matching the roast to how you'll drink it, not chasing a label.

At SQL, we cup every roast against the brew it's headed for. If a bean tastes flat as a pour-over but sings as an espresso, that's where it goes — no method worship, just the cup that works.`,
    category: 'Roast',
    date: '2026-05-08',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&h=500&q=80',
  },
  {
    id: 2,
    title: 'The Honest Brewing Guide',
    excerpt:
      'Forget the gear flexes. Here is the smallest set of variables you actually need to control to brew a good cup at home.',
    content: `Most brewing guides bury you in gear. The truth is, four variables do 90% of the work: grind size, ratio, water temperature, and time. Get those in the right neighborhood and the cup is already good — everything else is fine-tuning.

Start with a 1:16 ratio (one gram of coffee to sixteen grams of water), water just off the boil, and a grind size that looks like coarse table salt for pour-over or fine sand for espresso. Brew, taste, adjust. Too sour? Grind finer or brew longer. Too bitter? Coarser or shorter.

A scale and a kettle beat a fancy machine every time. Once those basics feel automatic, then think about water chemistry or pulse pours — not before.`,
    category: 'Brewing',
    date: '2026-04-30',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&h=500&q=80',
  },
  {
    id: 3,
    title: 'Where Our Beans Come From',
    excerpt:
      'A short tour through the highlands of Aceh, Toraja, and Bali — three Indonesian origins that anchor our menu.',
    content: `Indonesia grows some of the most distinct coffees in the world, and three regions do most of the heavy lifting on our menu. Aceh Gayo, grown at over 1,400 meters, brings deep body and herbal sweetness — the backbone of our espresso. Toraja, from the highlands of South Sulawesi, leans earthy and spiced, with a finish that lingers like dark chocolate.

Bali Kintamani sits at the brighter end: citrus, a clean acidity, and a floral top note that wakes up a pour-over. We rotate seasonally between these three, plus the occasional micro-lot from a farmer we've worked with for years.

Origin isn't a marketing label for us. It's the reason a cup tastes the way it does — and knowing the farm means knowing why.`,
    category: 'Origin',
    date: '2026-04-18',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&h=500&q=80',
  },
  {
    id: 4,
    title: 'In Defense of Simplicity',
    excerpt:
      'Specialty coffee got complicated. Here is the case for stripping it back to what actually matters in the cup.',
    content: `Somewhere along the way, ordering coffee turned into a vocabulary test. Single-origin, washed, natural, anaerobic, third wave, fourth wave — most of it is signal for people inside the industry, not the person who just wants a good cup before work.

We built SQL around a simple bet: people deserve to know their coffee is good without needing a glossary. Speciality grade, sourced honestly, brewed the way it brews best. That's the whole pitch. F*ck the method theater.

Simplicity isn't dumbing it down. It's trusting that the cup speaks for itself when the inputs are right. Everything else is noise dressed up as expertise.`,
    category: 'Manifesto',
    date: '2026-04-05',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&h=500&q=80',
  },
  {
    id: 5,
    title: 'The Science of Cold Brew',
    excerpt:
      'Twelve hours of cold water does something hot water cannot. Here is what is actually happening inside the jar.',
    content: `Cold brew isn't just iced coffee. The chemistry is fundamentally different. Hot water extracts coffee fast — flavor, acidity, and bitter compounds all come out together in four minutes. Cold water extracts slowly and selectively, pulling sweetness and body while leaving most of the bitter and acidic compounds behind.

That's why a good cold brew tastes smooth and mellow even when it's strong. The twelve-hour steep we use lets the water work patiently — no shortcuts, no heat, no acidity spike.

The tradeoff is time and yield. You give up bright origin notes; you gain a cup that's forgiving, refreshing, and easy to drink black. For hot days, it's the answer.`,
    category: 'Science',
    date: '2026-03-22',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&h=500&q=80',
  },
  {
    id: 6,
    title: 'Espresso Basics, Without the Gatekeeping',
    excerpt:
      'Nine grams in, thirty grams out, in about thirty seconds. Everything else is detail. Here is what you need to know.',
    content: `Espresso has a reputation for being hard, and parts of it are. But the core idea is simple: push hot water through finely ground coffee under pressure, and you get a concentrated shot with a layer of crema on top. The standard recipe is roughly 18 grams of grounds yielding 36 grams of liquid in around 27 to 32 seconds.

Three things make or break the shot: grind, dose, and tamp. Grind too coarse and water rushes through, leaving a thin sour shot. Too fine and it chokes, going bitter. The dial-in process is just nudging these variables until the cup tastes right.

You don't need a five-thousand-dollar machine to learn this. You need consistency — same beans, same grinder, same routine — and the patience to taste every shot like it matters. Because it does.`,
    category: 'Espresso',
    date: '2026-03-10',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&h=500&q=80',
  },
];

export const users = [
  {
    id: 1,
    name: 'Irfan Nuha',
    email: 'irfan@sql.coffee',
    role: 'admin',
    joinDate: '2024-08-12',
  },
  {
    id: 2,
    name: 'Maya Pratiwi',
    email: 'maya.pratiwi@gmail.com',
    role: 'user',
    joinDate: '2025-01-04',
  },
  {
    id: 3,
    name: 'Reza Hakim',
    email: 'reza.hakim@gmail.com',
    role: 'user',
    joinDate: '2025-03-19',
  },
  {
    id: 4,
    name: 'Citra Anggraini',
    email: 'citra.a@sql.coffee',
    role: 'admin',
    joinDate: '2025-05-02',
  },
  {
    id: 5,
    name: 'Dimas Pranoto',
    email: 'dimas.pranoto@gmail.com',
    role: 'user',
    joinDate: '2026-02-11',
  },
];

export const transactions = [
  {
    id: 1,
    userId: 2,
    items: [
      { productId: 1, qty: 2 },
      { productId: 3, qty: 1 },
    ],
    total: 86000,
    status: 'completed',
    date: '2026-05-09',
    address: 'Jl. Kemang Raya No. 12, Jakarta Selatan',
  },
  {
    id: 2,
    userId: 3,
    items: [
      { productId: 4, qty: 1 },
      { productId: 5, qty: 1 },
    ],
    total: 70000,
    status: 'processing',
    date: '2026-05-11',
    address: 'Jl. Cipete Utara No. 8, Jakarta Selatan',
  },
  {
    id: 3,
    userId: 5,
    items: [
      { productId: 6, qty: 2 },
    ],
    total: 66000,
    status: 'pending',
    date: '2026-05-12',
    address: 'Jl. Sudirman No. 45, Jakarta Pusat',
  },
  {
    id: 4,
    userId: 2,
    items: [
      { productId: 2, qty: 1 },
      { productId: 4, qty: 1 },
      { productId: 5, qty: 1 },
    ],
    total: 98000,
    status: 'completed',
    date: '2026-04-28',
    address: 'Jl. Kemang Raya No. 12, Jakarta Selatan',
  },
  {
    id: 5,
    userId: 3,
    items: [
      { productId: 1, qty: 1 },
      { productId: 3, qty: 2 },
    ],
    total: 91000,
    status: 'processing',
    date: '2026-05-10',
    address: 'Jl. Cipete Utara No. 8, Jakarta Selatan',
  },
];
