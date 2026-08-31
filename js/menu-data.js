// JUST TOFU - Menu Database
const MENU_DATA = [
  {
    id: "tofu-pepper-soup",
    name: "Tofu Pepper Soup",
    category: "SOUPS",
    tags: ["SIGNATURE", "CHEF'S SPECIAL", "SPICY", "TOFU"],
    price: 17.50,
    image: "images/tofu_pepper_soup.jpg",
    description: "Our legendary sizzling stone-pot silken tofu soup infused with fresh cracked black pepper, enoki mushrooms, rich golden broth, and vibrant chili threads.",
    isSignature: true,
    badge: "Chef's Signature ★",
    spiceLevel: 2,
    calories: "380 kcal",
    dietary: ["Organic Non-GMO", "Gluten-Free Option", "Vegetarian / Vegan Available"]
  },
  {
    id: "crispy-tofu",
    name: "Crispy Tofu",
    category: "TOFU",
    tags: ["POPULAR", "VEGAN", "CRUNCHY", "SIDES"],
    price: 12.50,
    image: "images/crispy_tofu.jpg",
    description: "Golden cubed organic tofu fried to airy crisp perfection, drizzled with savory scallion-garlic glaze and toasted white sesame.",
    isSignature: false,
    badge: "Fan Favorite",
    spiceLevel: 0,
    calories: "310 kcal",
    dietary: ["100% Vegan", "Dairy-Free"]
  },
  {
    id: "spicy-tofu",
    name: "Spicy Tofu",
    category: "TOFU",
    tags: ["SPICY", "HOUSE SPECIALTY", "SIDES"],
    price: 13.50,
    image: "images/spicy_tofu.jpg",
    description: "Pan-braised artisan tofu in a savory chili glaze reduction with caramelized garlic, sweet soy, and fresh scallions.",
    isSignature: false,
    badge: "Spicy Hit",
    spiceLevel: 3,
    calories: "340 kcal",
    dietary: ["Vegan", "Nut-Free"]
  },
  {
    id: "grilled-tofu",
    name: "Grilled Tofu",
    category: "TOFU",
    tags: ["SMOKY", "GLUTEN-FREE", "HIGH PROTEIN"],
    price: 14.00,
    image: "images/grilled_tofu.jpg",
    description: "Char-grilled firm artisan tofu skewers brushed with house sweet tamari glaze, served with microgreens and roasted cherry tomatoes.",
    isSignature: false,
    badge: "High Protein",
    spiceLevel: 0,
    calories: "360 kcal",
    dietary: ["Gluten-Free", "Vegan"]
  },
  {
    id: "tofu-bowl",
    name: "Tofu Bowl",
    category: "TOFU",
    tags: ["FRESH", "POPULAR", "HEALTHY", "RICE"],
    price: 16.50,
    image: "images/tofu_bowl.jpg",
    description: "Nourishing grain bowl with crispy seasoned tofu, sliced Haas avocado, bright edamame, pickled daikon, purple cabbage, soft egg, and toasted sesame dressing.",
    isSignature: false,
    badge: "Balanced Nourish",
    spiceLevel: 0,
    calories: "490 kcal",
    dietary: ["Vegetarian", "Vegan upon request"]
  },
  {
    id: "tofu-with-rice",
    name: "Tofu with Rice",
    category: "RICE",
    tags: ["COMFORT", "POPULAR", "TOFU"],
    price: 15.00,
    image: "images/tofu_rice.jpg",
    description: "Savory glazed braised tofu steak and delicate silken tofu cubes served over fragrant steamed multigrain rice with toasted seasoning and scallion relish.",
    isSignature: false,
    badge: "Comfort Bowl",
    spiceLevel: 1,
    calories: "450 kcal",
    dietary: ["Vegan", "Nut-Free"]
  },
  {
    id: "tofu-with-noodles",
    name: "Tofu with Noodles",
    category: "NOODLES",
    tags: ["SIGNATURE", "POPULAR", "TOFU"],
    price: 16.00,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    description: "Handcrafted wheat noodles in an aromatic mushroom broth topped with glazed tofu slices, tender baby bok choy, marinated egg, and chili crisp.",
    isSignature: false,
    badge: "Warm & Cozy",
    spiceLevel: 1,
    calories: "520 kcal",
    dietary: ["Vegetarian", "Dairy-Free"]
  },
  {
    id: "tofu-and-rice",
    name: "Tofu & Rice",
    category: "RICE",
    tags: ["CLASSIC", "TOFU"],
    price: 14.50,
    image: "images/tofu_rice.jpg",
    description: "Simmered soy glazed tofu with sweet caramelized onions, served over fluffy steamed jasmine rice with house pickles on the side.",
    isSignature: false,
    badge: "Classic Set",
    spiceLevel: 0,
    calories: "420 kcal",
    dietary: ["Vegan Option", "Low Sodium"]
  },
  {
    id: "kimchi-tofu-jjigae",
    name: "Silken Tofu Spicy Stew",
    category: "SOUPS",
    tags: ["SPICY", "HOUSE SPECIALTY"],
    price: 16.50,
    image: "images/tofu_pepper_soup.jpg",
    description: "Bubbling clay pot stew packed with seasoned pickled cabbage, shiitake mushrooms, tender silken tofu, and savory broth. Served piping hot.",
    isSignature: false,
    badge: "Soul Food",
    spiceLevel: 3,
    calories: "390 kcal",
    dietary: ["Gluten-Free", "Dairy-Free"]
  },
  {
    id: "tofu-dan-dan-noodles",
    name: "Tofu Dan Dan Noodles",
    category: "NOODLES",
    tags: ["SPICY", "NUTTY", "POPULAR"],
    price: 16.50,
    image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80",
    description: "Thick chewy noodles tossed in rich roasted sesame-peanut sauce, topped with spiced minced tofu crumble, bok choy, and chili crunch.",
    isSignature: false,
    badge: "Rich & Savory",
    spiceLevel: 2,
    calories: "560 kcal",
    dietary: ["Vegan", "Contains Peanuts"]
  },
  {
    id: "banchan-trio",
    name: "House Pickled Trio",
    category: "SIDES",
    tags: ["SIDE", "VEGAN"],
    price: 7.50,
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80",
    description: "House-crafted seasonal trio: aged seasoned pickled cabbage, yellow pickled daikon radish, and sesame-marinated sweet tofu strips.",
    isSignature: false,
    badge: "House Made",
    spiceLevel: 2,
    calories: "120 kcal",
    dietary: ["Vegan", "Gluten-Free"]
  },
  {
    id: "sweet-ginger-tofu",
    name: "Sweet Ginger Silken Tofu Pudding",
    category: "SIDES",
    tags: ["DESSERT", "SWEET", "COMFORT"],
    price: 8.50,
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80",
    description: "Silky warm tofu pudding bathed in aromatic ginger brown sugar syrup, topped with roasted sliced almonds and sweet red beans.",
    isSignature: false,
    badge: "Sweet Treat",
    spiceLevel: 0,
    calories: "210 kcal",
    dietary: ["Vegan", "Gluten-Free"]
  },
  {
    id: "matcha-soy-latte",
    name: "Iced Matcha Soy Latte",
    category: "DRINKS",
    tags: ["DRINK", "CAFE SPECIAL"],
    price: 6.50,
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80",
    description: "Ceremonial premium matcha whisked fresh and layered over our house-pressed organic chilled soy milk and light agave nectar.",
    isSignature: false,
    badge: "Café Favorite",
    spiceLevel: 0,
    calories: "140 kcal",
    dietary: ["100% Vegan", "Organic"]
  },
  {
    id: "sparkling-yuzu-ade",
    name: "Sparkling Citron Ade",
    category: "DRINKS",
    tags: ["DRINK", "REFRESHING"],
    price: 6.00,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    description: "Sparkling citrus honey tea over crushed ice with fresh mint sprigs and citrus wheels. Refreshing and bright.",
    isSignature: false,
    badge: "Refreshing",
    spiceLevel: 0,
    calories: "110 kcal",
    dietary: ["Vegetarian", "Gluten-Free"]
  },
  {
    id: "fresh-warm-soymilk",
    name: "Fresh Stoneground Soy Milk",
    category: "DRINKS",
    tags: ["DRINK", "HOUSE CRAFTED"],
    price: 5.00,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    description: "Pure, silky stoneground non-GMO soybean milk brewed fresh daily every morning. Available unsweetened or with a touch of brown sugar.",
    isSignature: false,
    badge: "100% Pure",
    spiceLevel: 0,
    calories: "120 kcal",
    dietary: ["Vegan", "High Protein", "Gluten-Free"]
  }
];

// Featured items for "Our Tofu" section
const FEATURED_ITEMS = [
  "tofu-pepper-soup", // Signature
  "crispy-tofu",
  "spicy-tofu",
  "grilled-tofu",
  "tofu-bowl",
  "tofu-with-rice",
  "tofu-with-noodles",
  "tofu-and-rice"
];

// Gallery Images
const GALLERY_ITEMS = [
  {
    title: "Signature Tofu Pepper Soup",
    subtitle: "Stone pot bubbling with rich broth & silken tofu",
    tag: "Signature Dish",
    image: "images/tofu_pepper_soup.jpg"
  },
  {
    title: "Cozy Dining Atmosphere",
    subtitle: "Warm wood tones, natural lighting & cozy café charm",
    tag: "Atmosphere",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Crispy Golden Tofu",
    subtitle: "Airy crust with scallion sesame glaze",
    tag: "Appetizer",
    image: "images/crispy_tofu.jpg"
  },
  {
    title: "Artisan Soy Crafting",
    subtitle: "100% organic non-GMO soybeans ground fresh daily",
    tag: "Craft",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Spicy Pan-Braised Tofu",
    subtitle: "Braised in sweet chili reduction glaze",
    tag: "House Specialty",
    image: "images/spicy_tofu.jpg"
  },
  {
    title: "Vibrant Nourish Bowl",
    subtitle: "Wholesome avocado, edamame & crispy tofu",
    tag: "Healthy Living",
    image: "images/tofu_bowl.jpg"
  },
  {
    title: "Char-Grilled Tofu Skewers",
    subtitle: "Tamari glazed with caramelized grill marks",
    tag: "Chef's Cut",
    image: "images/grilled_tofu.jpg"
  },
  {
    title: "Warm Rice & Tofu Pairings",
    subtitle: "Comforting bowls prepared with care",
    tag: "Comfort Food",
    image: "images/tofu_rice.jpg"
  }
];
