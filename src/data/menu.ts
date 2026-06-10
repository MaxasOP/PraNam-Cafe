export interface MenuItem {
  id: string;
  name: string;
  nativeName: string;
  city: string;
  tag?: "HERITAGE" | "CHEF'S PICK";
  price: number;
  description: string;
  category: "chaat" | "mains" | "sweets" | "drinks" | "all";
  veganAlternative: string; // How it's made vegan, e.g. "vegan curd, almond cream, olive butter"
  history: string; // Rich regional history/story for the chatbot and hover cards
  image: string; // High-resolution real food image URL from Unsplash
}

export const CITIES = [
  { id: "all", name: "All UP Roots", icon: "MapPin", sub: "Curated Uttar Pradesh" },
  { id: "Varanasi", name: "Varanasi", icon: "Compass", sub: "Kashi · काशी" },
  { id: "Prayagraj", name: "Prayagraj", icon: "Waves", sub: "Sangam · संगम" },
  { id: "Agra", name: "Agra", icon: "Crown", sub: "Taj City · ताज़" },
  { id: "Mathura", name: "Mathura", icon: "Music", sub: "Brij · वृंदावन" },
  { id: "Muradabad", name: "Muradabad", icon: "Flame", sub: "Brass City · पीतलनगर" },
  { id: "Lucknow", name: "Lucknow", icon: "Gem", sub: "Nawab City · लखनऊ" }
];

export const menuItems: MenuItem[] = [
  // --- VARANASI ---
  {
    id: "var-1",
    name: "The Ghaat's Golden Embrace",
    nativeName: "Aloo Kachori with Kala Channa Masala Gravy",
    city: "Varanasi",
    tag: "HERITAGE",
    price: 199,
    category: "mains",
    description: "Small-batch kachori paired with spiced black chickpea gravy, green chutney, tamarind chutney, crisp onion & fresh coriander.",
    veganAlternative: "Uses plant-based shortening for dough, organic oils instead of ghee. Gravy is naturally plant-based.",
    history: "A legendary breakfast served along the ancient ghats of Kashi, typically consumed after morning prayers as a warming, nutritious start to the day.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "var-2",
    name: "Tikki Durbar",
    nativeName: "Aloo Tikki Chaat",
    city: "Varanasi",
    tag: "CHEF'S PICK",
    price: 150,
    category: "chaat",
    description: "Crisp potato patties crowned with dry yellow peas, twin chutneys, chaat masala, aloo bhujia, carrot & radish ribbons.",
    veganAlternative: "Prepared using mustard and peanut cooking oils. Topped with customized house vegan yoghurt.",
    history: "In Varanasi's labyrinth of lanes, Tikki Durbar represents the royal assembly (durbar) of crispiness, tang, and warming spices that Varanasi chaat is globally famed for.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "var-3",
    name: "Spinach Fritters",
    nativeName: "Palak Chaat with Pakodi",
    city: "Varanasi",
    price: 200,
    category: "chaat",
    description: "Spinach pakodis nestled in a garden of chutneys, chaat masala, carrot & radish — a celebration of green.",
    veganAlternative: "Fried in cold-pressed rice bran oil, topped with soy-based sweetened vegan yogurt and date chutney.",
    history: "A modern classic from the modern culinary lanes of Varanasi, showcasing crisp whole baby spinach leaves dressed like an ornate tapestry.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "var-4",
    name: "The Bitter Jewel of Banaras",
    nativeName: "Karela Chaat",
    city: "Varanasi",
    price: 140,
    category: "chaat",
    description: "Karela shells crafted from refined flour, filled and dressed with all the classic chaat adornments. Bittersweet perfection.",
    veganAlternative: "Shells are butter-free, utilizing high-quality vegetable shortening. Filling features sprouted mung, spices, and tangy mango dust.",
    history: "Despite its bitter-sounding name, this dish is a sensory revelation. The bitter-crisp flour shell holds custom spices that turn bitterness into an elite sweet-sour-spicy symphony.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "var-5",
    name: "Scarlet Chaat Soirée",
    nativeName: "Tamatar Chaat",
    city: "Varanasi",
    price: 200,
    category: "chaat",
    description: "Tomatoes transformed through a signature preparation, adorned with the full suite of chaat elements.",
    veganAlternative: "Prepared strictly without ghee. Refined peanut oil is used with vegan-friendly roasted cumin cashew syrup.",
    history: "Exclusively local to Varanasi, this chaat cooks fresh, pulpy tomatoes into a spicy mash served in earthenware bowls (kulhads), seasoned with ginger and a sweet sugar-cumin water.",
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "var-6",
    name: "Spicy Water Boms",
    nativeName: "Pani Puri / Golgappe",
    city: "Varanasi",
    tag: "CHEF'S PICK",
    price: 80,
    category: "chaat",
    description: "Eight crisp puris with Jal Jeera in a small jar, boiled sprouted mutter, boiled potato & sweet chutney.",
    veganAlternative: "Naturally 100% vegan! Sourced from wheat-durum shells, filled with spicy mint water and digestive hing-jeera syrup.",
    history: "A staple across Northern India. In Varanasi, the 'water bomb' is famous for its intensive infusion of mint, coriander, ginger, rock-salt, and cooling digestive elixirs.",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "var-7",
    name: "Clouds of Kashi",
    nativeName: "Dudh Malaiyo",
    city: "Varanasi",
    tag: "HERITAGE",
    price: 240,
    category: "sweets",
    description: "Whipped winter milk with saffron-laced feeni and a constellation of dry fruits. Served chilled.",
    veganAlternative: "Crafted beautifully with whipped soy/cashew milk cream, flavored with authentic saffron, cardamoms, and almond flakes.",
    history: "A mystical sweet prepared overnight by setting raw milk under the sacred dew of winter moonlight, then whipped into an airy foam. A specialty that literally melts on the tongue like a cardamom-flavored cloud.",
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "var-8",
    name: "Malai Lassi",
    nativeName: "Ancient Whipped Lassi",
    city: "Varanasi",
    price: 160,
    category: "drinks",
    description: "Churned in the old-fashioned way, topped with a thick layer of malai cream, pistachios, and a touch of rosewater.",
    veganAlternative: "Made with thick, creamy whipped cashew-almond yogurt and topped with shredded nuts and vegan coconut malai.",
    history: "Varanasi lassis are served in pristine hand-baked clay cups (kulhads), hand-whipped to order using long wooden churns.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "var-9",
    name: "Rabri Malai Lassi",
    nativeName: "Luxury Rabdi Cardamom Lassi",
    city: "Varanasi",
    price: 200,
    category: "drinks",
    description: "Thick hand-churned sweet curd topped with rich caramelized cardamom rabri, saffron filaments, and sliced almonds.",
    veganAlternative: "Cashew milk base lassi topped with artisanal vegan caramelized milk reduction (almond-coconut rabdi).",
    history: "The premium offering in the lanes of Varanasi, merging the coolness of whipped lassi with the rich decadence of slow-cooked Rabri.",
    image: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "var-10",
    name: "Kesar Dry Fruit Lassi",
    nativeName: "Saffron Shahi Lassi",
    city: "Varanasi",
    price: 220,
    category: "drinks",
    description: "Lassi infused with pure Kashmiri saffron extract, loaded with chopped almonds, pistachios, cashews, and raisins.",
    veganAlternative: "Whipped peanut/coconut milk custom curd laced with natural saffron extracts and loaded dry fruits.",
    history: "A royal cooling formula historically made for travelers navigating the intensely hot, sunny afternoons along the Ganges.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "var-11",
    name: "Seasonal Fruit Lassi",
    nativeName: "Thick Mango / Banana Lassi",
    city: "Varanasi",
    price: 180,
    category: "drinks",
    description: "Churned fresh with organic seasonal fruit pulp (mango in summer, absolute berries in winter), completely refreshing.",
    veganAlternative: "100% plant-based yogurt base swirled with fresh seasonal pureed mangoes or seasonal local sub-tropical fruits.",
    history: "A cheerful fusion celebrating local orchards. The thick pulp provides natural sugars paired with cardamoms.",
    image: "https://images.unsplash.com/photo-1553530979-7ee52a2670c4?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "var-12",
    name: "Plain Chaas",
    nativeName: "Ganga Ki Chhaach",
    city: "Varanasi",
    price: 80,
    category: "drinks",
    description: "Cooling, restorative buttermilk — a glass of the Ganga's gentleness.",
    veganAlternative: "Diluted custom almond yogurt churned with Himalayan pink salt, ginger juice, and cool mint oils.",
    history: "Chaas is Northern India's answer to dehydration. Extremely thin and savory, it is highly digestive and cooling.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "var-13",
    name: "Masala Chaas",
    nativeName: "Spiced Herb Butter Milk",
    city: "Varanasi",
    price: 120,
    category: "drinks",
    description: "Buttermilk blended with fresh green chillies, coriander leaves, ginger, black salt, and roasted cumin powder.",
    veganAlternative: "Diluted peanut and soy curd base churned with roasted Indian rock spices and fresh green herbs.",
    history: "The spice-laden variant of the buttermilk, ideal for waking up tastebuds and assisting in the immediate digestion of UP's rich kachoris.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80"
  },
  // --- PRAYAGRAJ ---
  {
    id: "pra-1",
    name: "Sangam Samosa Ragda",
    nativeName: "Samosa with Boiled Peas",
    city: "Prayagraj",
    tag: "CHEF'S PICK",
    price: 120,
    category: "chaat",
    description: "Two golden-crusted samosas with dry peas ragda, green/khalai chutney & sweet chutney.",
    veganAlternative: "Naturally vegan. Samosa crust is kneaded with organic vegetable oil, filled with cumin potatoes, served with yellow pea ragda.",
    history: "Originating around the sacred confluence (Sangam) of Prayagraj. Samosas here are crushed open in bowls and completely drenched in a savory pea curry with spicy black salt.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "pra-2",
    name: "The Pilgrim's Breakfast",
    nativeName: "Khasta with Dum Aloo",
    city: "Prayagraj",
    price: 140,
    category: "mains",
    description: "Crisp khasta flatbread alongside slow-cooked potatoes in aromatic gravy.",
    veganAlternative: "Entirely vegan. The puffed khasta bread uses premium plant shortening, while the dum aloo uses a tomato, ginger, and cumin gravy.",
    history: "A legendary street side dish consumed by millions of pilgrims visiting Prayagraj's Triveni Sangam. The potatoes are slow-cooked with skin on, yielding a deep earthy flavor.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "pra-3",
    name: "The Grand Kachori Thali",
    nativeName: "Kachori Thali - 4 Kachoris + 2 Sabzis + Raita + Sweet",
    city: "Prayagraj",
    tag: "HERITAGE",
    price: 299,
    category: "mains",
    description: "Four kachoris with two sabzis, house raita & sweet chutney. A complete, nourishing repast.",
    veganAlternative: "Served with rich soy-yogurt based local raita, vegetable-oil kachoris, and non-dairy sweet confections.",
    history: "A traditional feast celebrating the rich food culture of Allahabad (Prayagraj). Highly fulfilling, with lentils stuffed inside crisp wheat balloons.",
    image: "https://images.unsplash.com/photo-1585938338392-50a59970d2ee?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "pra-4",
    name: "Yogurt Dumplings",
    nativeName: "Dahi Vada / Dahi Bhalla",
    city: "Prayagraj",
    price: 150,
    category: "chaat",
    description: "Yielding vadas draped in chilled curd, sweet chutney, masala, extra curd & bundi pearls.",
    veganAlternative: "Made with airy, soaked black gram dumplings (vadas) drowned in sweet-spiced almond/coconut curd. Out of this world!",
    history: "Blessed with super soft texture from overnight lentil fermentation, then dropped into hand-whipped yogurt garnished with roasted cumin seeds.",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "pra-5",
    name: "Saffron Coil & Cream",
    nativeName: "Jalebi with Rabdi",
    city: "Prayagraj",
    tag: "CHEF'S PICK",
    price: 200,
    category: "sweets",
    description: "Five spirals of warm, syrup-soaked jalebi paired with thick, fragrant rabdi.",
    veganAlternative: "Batter uses organic yeast fermentation, and is deep-fried in rice-bran oil, served with authentic non-dairy almond-based rabdi.",
    history: "The absolute standard of comfort food across the Ganges path. The pairing of piping-hot sweet, sour, crispy jalebis with cold, dense, creamy rabdi is a national treasure.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "pra-6",
    name: "Rose Spheres",
    nativeName: "Gulab Jamun with Rabdi",
    city: "Prayagraj",
    price: 160,
    category: "sweets",
    description: "Two velvety dumplings, slow-soaked in sweet-cardamom syrup.",
    veganAlternative: "Dumplings are crafted from mashed sweet potato, organic wheat, and soy flour, soaked in pure saffron-cardamom syrup and drizzled with cashew milk reduction.",
    history: "A classical dessert modified beautifully. The spheres are served beautifully warm, sitting on a cool mattress of rabdi.",
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600&auto=format&fit=crop&q=80"
  },
  // --- AGRA ---
  {
    id: "agr-1",
    name: "The Marble City Breakfast",
    nativeName: "Bedhai Puri with Aloo Sabzi & Chutney",
    city: "Agra",
    tag: "HERITAGE",
    price: 249,
    category: "mains",
    description: "Flaky, stuffed puris paired with hearty potato sabzi and a side of house chutney. Agra's most beloved breakfast.",
    veganAlternative: "Uses robust whole-wheat flour mixed with native spices, fried in clean plant oil. Naturally vegan.",
    history: "Bedhai is a crisp, puffed, lentil-stuffed fried bread unique to Agra. Traditionally eaten at street corners looking towards the rising sun in the early morning streets of the Taj Ganj.",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "agr-2",
    name: "Mughlai Paratha",
    nativeName: "Stuffed Muglai Paratha",
    city: "Agra",
    price: 180,
    category: "mains",
    description: "Rich, stuffed paratha with minced cheese. Cooked with lots of butter. Reflects Mughal culinary heritage.",
    veganAlternative: "Stuffed with grated organic raw tofu, seasoned like paneer, griddled with pure high-oleic sunflower lipids and vegan-butter.",
    history: "A direct descendant of the majestic imperial kitchens of Emperor Akbar, altered to provide high texture and flaky butter layers.",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "agr-3",
    name: "Ivory Sweetmeat - Dry",
    nativeName: "Dry Agra Petha",
    city: "Agra",
    price: 80,
    category: "sweets",
    description: "The legendary Agra confection — delicate ash gourd candy, crystallised to perfection.",
    veganAlternative: "Naturally 100% vegan. Pure ash gourd (winter melon) boiled down and crystallized in cane sugar syrup with natural kewra (screwpine) essence.",
    history: "Crafted since the construction of the Taj Mahal. Legends say this pure sweet was invented by Shah Jahan’s royal chefs to energize the 20,000 workers building the mausoleum.",
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "agr-4",
    name: "Ivory Sweetmeat - Chasni",
    nativeName: "Chasni Saffron Petha",
    city: "Agra",
    price: 100,
    category: "sweets",
    description: "Agra's iconic petha in syrup — moist, fragrant, glistening. A dessert fit for the Mughal court.",
    veganAlternative: "Naturally vegan. Ash gourd cooked to a plump, juicy sponge state and saturated in high-grade sugar syrup flavored with organic cardamoms.",
    history: "A drippingly sweet variation of the classic petha, traditionally offered to guests at royal courts to express pure hospitality.",
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600&auto=format&fit=crop&q=80"
  },
  // --- MATHURA ---
  {
    id: "mat-1",
    name: "Golden Gram Crepe",
    nativeName: "Besan Chilla with Paneer Stuffed",
    city: "Mathura",
    price: 180,
    category: "mains",
    description: "Thin, lacy chickpea flour crepe served with fresh paneer or cheese and house chutney.",
    veganAlternative: "Filled with seasoned plant-based shredded tofu cheese, green beans, and roasted almond powder.",
    history: "Mathura is the ancient heartland (Brij Bhoomi) of pastoral food. The besan chilla is a light, protein-filled crepe that honors Brij's rustic farm heritage.",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "mat-2",
    name: "Green Lentil Veil",
    nativeName: "Moong Dal Chilla",
    city: "Mathura",
    tag: "CHEF'S PICK",
    price: 220,
    category: "mains",
    description: "Silken moong dal crepe with your choice of paneer, cheese or aloo sabzi. Light, protein-rich, deeply satisfying.",
    veganAlternative: "Uses cold-milled yellow moong flour batter, cooked in mustard oil, stuffed with custom vegan home cheese and garden herbs.",
    history: "A very popular energetic breakfast/snack option across Mathura temples, known for being incredibly gentle on digestion while carrying dense nutrition.",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&auto=format&fit=crop&q=80"
  },
  // --- MURADABAD ---
  {
    id: "mur-1",
    name: "The Brass City's Lentil Banquet",
    nativeName: "Muradabadi Dal Chaat",
    city: "Muradabad",
    tag: "HERITAGE",
    price: 320,
    category: "chaat",
    description: "Boiled moong dal served with green chutney, Amul butter, jeera powder, black salt, lemon juice, red chilli oil, roasted papad, chopped green chilli, coriander, ginger & gossaan chutney. The most generous bowl on the menu.",
    veganAlternative: "Topped with vegan extra-virgin olive butter substitute, fresh vegetable oils, and raw cold-pressed cilantro extracts. Zero compromise on flavor!",
    history: "Muradabad's iconic golden lentil chaat. Unlike southern or western chaats, this has no potato or wheat wafers; it is composed of creamy moong lentils served in brassware (hence 'Brass City'), topped with crunchy crushed roasted papadums.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "mur-2",
    name: "Homestyle Bowl",
    nativeName: "Chole with Rice",
    city: "Muradabad",
    price: 200,
    category: "mains",
    description: "A comforting bowl of spiced chickpea curry paired with fluffy steamed rice.",
    veganAlternative: "Naturally vegan. Prepared with slow-boiled chickpeas simmered in an onion-tomato-pomegranate seed reduction over an open wood-fire.",
    history: "Simple, honest street-corner nourishment that keeps the brass craftsmen of Muradabad energized through intense metalworking shifts.",
    image: "https://images.unsplash.com/photo-1585938338392-50a59970d2ee?w=600&auto=format&fit=crop&q=80"
  },
  // --- LUCKNOW ---
  {
    id: "luc-1",
    name: "Golden Cradle",
    nativeName: "Lucknowi Basket Chaat / Tokri Chaat",
    city: "Lucknow",
    tag: "HERITAGE",
    price: 180,
    category: "chaat",
    description: "A crisp edible basket filled with spiced potatoes, creamy curd, sweet and tangy chutneys, and crunchy toppings for the perfect mix of textures.",
    veganAlternative: "Crafted with a crispy hand-woven grated potato safe basket, packed with custom plant milk curd, pomegranate jewels, coriander leaves, and spicy sweet tamarind nectar.",
    history: "A visual and gastronomic masterpiece from Hazratganj, Lucknow. It delivers an entire carnival of textures - crunchy, creamy, soft, sweet, tangy, and dangerously spicy - all resting inside a handmade crispy woven potato basket.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "luc-2",
    name: "Royal Biryani",
    nativeName: "Awadhi Dum Biryani",
    city: "Lucknow",
    price: 280,
    category: "mains",
    description: "Traditional layered biryani cooked on slow dum, where basmati rice and spices are sealed together to create a rich, fragrant dish.",
    veganAlternative: "Made with aromatic long-grain aged direct basmati, cooked with slow-steamed saffron jackfruit or soya-chunks, sealed with absolute wheat dough.",
    history: "Awadhi Dum Biryani from Lucknow is legendary for its 'dum' style of cooking, where the pot is sealed with dough to lock in the saffron, rosewater, and cardamoms, resulting in highly perfumed and insanely delicate grains of rice.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80"
  },
  // --- BEVERAGES ---
  {
    id: "bev-1",
    name: "coolcool Shikanji",
    nativeName: "Spicy UP Lemonade",
    city: "Beverages",
    price: 50,
    category: "drinks",
    description: "A refreshing lemon-based drink infused with direct black salt, roasted cumin seeds, and fresh mint sprigs.",
    veganAlternative: "Naturally vegan. Uses hand-squeezed organic local lemons and home-brewed rock-salt spiced water.",
    history: "Historically served from wooden carts adorned with huge blocks of red cotton-wrapped ice to combat the searing summer winds of northern plains.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "bev-2",
    name: "Namkeen Sattu",
    nativeName: "Earthy Roasted Gram Flour Drink",
    city: "Beverages",
    price: 60,
    category: "drinks",
    description: "A protein-rich drink made from roasted gram flour (sattu). Savory, earthy, cooling.",
    veganAlternative: "Naturally 100% vegan. Excellent source of plant-based protein, whisked with cold water, green chillies, and roasted cumin.",
    history: "The rustic superfood of the working class of UP and Bihar. Sattu is roasted black chickpeas ground into fine flour, instantly restoring electrolytes and providing sustainable fiber.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "bev-3",
    name: "Coffee",
    nativeName: "Slow Filter Brewed Chicory Coffee",
    city: "Beverages",
    price: 60,
    category: "drinks",
    description: "Espresso/decaf, served either comforting hot or chilled over rock ice.",
    veganAlternative: "Prepared beautifully with frothy, creamy hot soy milk or almond milk syrup.",
    history: "A modern introduction, brewed with a hint of chicory to match the robust, full-bodied expectations of local travelers.",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "bev-4",
    name: "Chai",
    nativeName: "Lucknowi Masala Kulhad Tea",
    city: "Beverages",
    price: 40,
    category: "drinks",
    description: "Black Assam leaves boiled with fresh green cardamom, ginger root, cloves, and whole black peppercorns.",
    veganAlternative: "Simmered over slow fire with rich soy or oat milk, sweetened with organic jaggery.",
    history: "The heartbeat of the state. Uttar Pradesh runs on chai (tea), usually sipped at street corners out of porous clay cups that add a sweet, dry earth flavor to every sip.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80"
  }
];
