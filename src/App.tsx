import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  ShoppingBag, 
  Leaf, 
  Sparkles, 
  MapPin, 
  UtensilsCrossed, 
  Info, 
  Share2, 
  Trash2, 
  Clock, 
  Compass,
  ArrowRight,
  Bookmark
} from "lucide-react";
import { menuItems, MenuItem } from "./data/menu";
import { CartItem, Order } from "./types";
import CitySelector from "./components/CitySelector";
import MenuCard from "./components/MenuCard";
import CartSidebar from "./components/CartSidebar";
import CulinaryChatbot from "./components/CulinaryChatbot";
import PaymentModal from "./components/PaymentModal";
import OrderStatusPanel from "./components/OrderStatusPanel";

export default function App() {
  const [selectedCity, setSelectedCity] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [universalVegan, setUniversalVegan] = useState(false);
  const [tableNumber, setTableNumber] = useState("4");
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  
  // Track active orders
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  // Initialize table number on scan: check for '?table=X' in query parameters!
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tableParam = params.get("table");
    if (tableParam) {
      setTableNumber(tableParam);
    }
  }, []);

  // Filtered menu items memoization
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCity = selectedCity === "all" || item.city === selectedCity;
      
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.history.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.city.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = 
        selectedCategory === "all" || 
        item.category === selectedCategory;

      return matchesCity && matchesSearch && matchesCategory;
    });
  }, [selectedCity, searchQuery, selectedCategory]);

  const categories = [
    { id: "all", label: "Full Legacy Menu" },
    { id: "chaat", label: "Street Side Chaat" },
    { id: "mains", label: "Pilgrim Mains" },
    { id: "sweets", label: "Royal Sweets" },
    { id: "drinks", label: "Sacred Elixirs" }
  ];

  // Cart operations
  const handleAddToCart = (item: MenuItem, qty: number, isVegan: boolean) => {
    setCart((prev) => {
      // Find matching item in cart
      const existingIdx = prev.findIndex(
        (ci) => ci.menuItem.id === item.id && ci.isVeganCustomized === isVegan
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += qty;
        return updated;
      } else {
        return [...prev, { menuItem: item, quantity: qty, isVeganCustomized: isVegan }];
      }
    });
  };

  const handleUpdateCartQty = (menuItemId: string, newQty: number) => {
    setCart((prev) => 
      prev.map((ci) => 
        ci.menuItem.id === menuItemId ? { ...ci, quantity: newQty } : ci
      )
    );
  };

  const handleRemoveFromCart = (menuItemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.menuItem.id !== menuItemId));
  };

  const handleToggleItemVegan = (menuItemId: string) => {
    setCart((prev) =>
      prev.map((ci) =>
        ci.menuItem.id === menuItemId
          ? { ...ci, isVeganCustomized: !ci.isVeganCustomized }
          : ci
      )
    );
  };

  const handleToggleUniversalVegan = () => {
    const nextVal = !universalVegan;
    setUniversalVegan(nextVal);
    // synchronize existing cart items to the new state
    setCart((prev) =>
      prev.map((ci) => ({ ...ci, isVeganCustomized: nextVal }))
    );
  };

  // Payment confirmation success callback
  const handlePaymentSuccess = (orderId: string) => {
    setIsPaymentOpen(false);
    setIsCartOpen(false);

    // Create tracking order payload
    const orderPayload: Order = {
      orderId,
      items: cart.map((c) => ({
        id: c.menuItem.id,
        name: c.menuItem.name,
        quantity: c.quantity,
        price: c.menuItem.price,
        isVeganCustomized: c.isVeganCustomized
      })),
      tableNumber,
      isVegan: universalVegan || cart.every((c) => c.isVeganCustomized),
      total: cart.reduce((acc, c) => acc + c.menuItem.price * c.quantity, 0) + 15,
      notes: "Contactless order processing.",
      createdAt: new Date().toISOString(),
      status: "pending"
    };

    setActiveOrder(orderPayload);
    setCart([]); // Clean order basket
  };

  const cartTotalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-brand-ivory text-stone-900 font-sans selection:bg-brand-blue/25 selection:text-brand-blue relative">
      <div className="noise-overlay" />
      
      {/* Background Ornate Graphic Lines */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

      {/* --- PREMIUM BRAND HEADER BRAND BLOCK (Matching PDF Front Cover) --- */}
      <header className="relative bg-brand-dark text-brand-ivory overflow-hidden border-b-2 border-brand-gold py-12 px-6 sm:px-12 md:py-16">
        {/* Mughal scallop window background outlines */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none flex items-center justify-center">
          <svg className="w-full h-full max-w-lg" viewBox="0 0 100 100">
            <path d="M 50,0 C 25,0 15,30 15,50 C 15,70 30,90 50,90 C 70,90 85,70 85,50 C 85,30 75,0 50,0 Z" fill="none" stroke="#B8963E" strokeWidth="2" />
            <path d="M 50,15 C 35,15 25,35 25,50 C 25,65 35,75 50,75 C 65,75 75,65 75,50 C 75,35 65,15 50,15 Z" fill="none" stroke="#FAF7F0" strokeWidth="1" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="text-center md:text-left space-y-3.5">
            <span className="text-[11px] font-mono tracking-widest text-brand-gold uppercase font-bold block">
              BY THE JAGMAL GROUP
            </span>
            
            <h1 className="font-serif text-5xl md:text-6xl font-bold tracking-wider text-brand-beige">
              PraNam
            </h1>
            <h2 className="font-serif text-xl tracking-widest text-brand-blue font-medium">
              प्रणाम
            </h2>

            <div className="w-32 h-[1px] bg-brand-gold my-4 mx-auto md:mx-0" />

            <p className="font-serif italic text-sm md:text-base text-stone-300 max-w-md tracking-wide">
              A Curated Journey Along The Sacred Corridors of Uttar Pradesh
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-stretch gap-4">
            {/* Quick scanning simulated info */}
            <div className="bg-white/5 border border-brand-gold/30 rounded-2xl p-4 flex items-center gap-4 dark-glass">
              <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center text-brand-gold border border-brand-gold/20">
                <MapPin className="w-6 h-6" strokeWidth={1.2} />
              </div>
              <div>
                <p className="text-[10px] font-mono tracking-wider text-brand-gold uppercase font-bold">
                  CONTACTLESS QR SCAN
                </p>
                <p className="text-xs font-serif font-semibold text-white">
                  Actively Sitting at: <span className="text-brand-blue font-sans font-bold">TABLE #{tableNumber}</span>
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase">Linked to Kitchen Line</span>
                </div>
              </div>
            </div>

            {/* Change table simulated button */}
            <div className="flex gap-2 text-[10px] font-mono text-stone-400 justify-center md:justify-end">
              <span>Change table query: </span>
              <a href="?table=2" className="text-brand-gold font-bold hover:underline">Table 2</a>
              <span>·</span>
              <a href="?table=9" className="text-brand-gold font-bold hover:underline">Table 9</a>
              <span>·</span>
              <a href="?table=15" className="text-brand-gold font-bold hover:underline">Table 15</a>
            </div>
          </div>
        </div>
      </header>

      {/* --- CONTENT LAYOUT CONTAINER --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

        {/* ACTIVE STATUS DISPLAY (Shown only when they order and have a queue tracking item) */}
        <AnimatePresence>
          {activeOrder && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-2"
            >
              <OrderStatusPanel
                orderId={activeOrder.orderId}
                tableNumber={activeOrder.tableNumber}
                total={activeOrder.total}
                onClearStatus={() => setActiveOrder(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 100% VEGAN-FORWARD COMMITMENT BANNER */}
        <div className="bg-emerald-50 rounded-3xl p-6 sm:p-8 border border-emerald-150 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          {/* Subtle leaves decoration */}
          <div className="absolute right-[-10px] bottom-[-20px] opacity-10 pointer-events-none scale-150">
            <Leaf className="w-48 h-48 text-emerald-700 fill-current" />
          </div>

          <div className="flex items-center gap-4.5">
            <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-600/20">
              <Leaf className="w-8 h-8 fill-current scale-x-[-1]" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-emerald-700 font-bold block uppercase mb-0.5">
                NORTH INDIA'S FIRST VEGAN-FORWARD QSR
              </span>
              <h3 className="font-serif text-xl font-bold text-stone-900 leading-snug">
                100% Plant-Based Alternative Committed
              </h3>
              <p className="text-xs text-stone-600 mt-1 max-w-xl">
                We believe hospitality should have no bounds. Every single dish in our Uttar Pradesh menu has an exact vegan equivalent prepared using custom almond curds, soy-rabris, cashew reductions, or organic tofu-paneers on isolated griddles. Just toggle the "Plant-Based" switch on items or below !
              </p>
            </div>
          </div>

          <motion.button
            onClick={handleToggleUniversalVegan}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-5 py-3.5 rounded-2xl cursor-pointer text-xs font-serif font-bold tracking-widest shadow-md transition-all duration-355 flex items-center gap-2 ${
              universalVegan
                ? "bg-emerald-600 text-white shadow-emerald-250"
                : "bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-250"
            }`}
            id="global-vegan-switch-home"
          >
            <Leaf className="w-4 h-4 fill-current" />
            {universalVegan ? "ENTIRE MENU: 100% VEGAN" : "SWITCH ALL TO VEGAN"}
          </motion.button>
        </div>

        {/* SEARCH, CATEGORIES, & CITY FILTERS */}
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Search Input bar */}
            <div className="relative flex-grow max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search U.P. street foods (e.g. Kachori, Chaat, Lassi)..."
                className="w-full bg-white border border-stone-250 outline-none rounded-2xl py-3.5 pl-11 pr-4 text-sm focus:border-brand-blue text-stone-850 shadow-xs focus:ring-1 focus:ring-brand-blue/20"
                id="food-search-bar"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs font-mono"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Category selection buttons scroll */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none snap-x whitespace-nowrap -mx-4 px-4 sm:mx-0 sm:px-0">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`snap-center px-4 py-2 text-xs font-serif font-bold tracking-wider border rounded-xl cursor-pointer transition-all ${
                      isSelected
                        ? "bg-brand-dark text-white border-brand-dark"
                        : "bg-white text-stone-600 hover:bg-stone-50 border-stone-200"
                    }`}
                    id={`category-pill-${cat.id}`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* City slider row */}
          <CitySelector selectedCity={selectedCity} onSelectCity={setSelectedCity} />
        </div>

        {/* CATALOG ACTIVE GRID TITLE */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div>
            <h3 className="font-serif text-lg font-bold text-brand-dark">
              Available Delicacies ({filteredItems.length} items found)
            </h3>
            {searchQuery && (
              <p className="text-xs text-stone-500 font-mono mt-0.5">
                Active query: <span className="italic font-bold">"{searchQuery}"</span>
              </p>
            )}
          </div>
        </div>

        {/* GRID LAYOUT FOR THE MENU ITEMS */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-150">
            <Compass className="w-12 h-12 text-stone-300 mx-auto animate-spin [animation-duration:15s] mb-3" />
            <p className="font-serif text-base font-bold text-brand-dark">None of U.P.'s lane has this item today</p>
            <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
              Try readjusting your search inquiry or regional corridor to find Lucknow biryanis, Varanasi chaats, or Mathura crepes!
            </p>
            <button
              onClick={() => {
                setSelectedCity("all");
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 px-4 py-2 bg-brand-gold text-white font-serif text-xs font-bold tracking-widest rounded-xl hover:bg-brand-gold-light transition-colors cursor-pointer"
            >
              RESET ALL SELECTION FILTERS
            </button>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            id="menu-rendered-grid"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  onAddToCart={handleAddToCart}
                  universalVegan={universalVegan}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-brand-dark text-stone-400 border-t border-brand-gold/20 py-12 px-6 text-center">
        <div className="max-w-7xl mx-auto space-y-4">
          <p className="font-serif text-base text-brand-beige tracking-wider">PraNam Cafe</p>
          <div className="flex justify-center gap-3 text-xs w-full">
            <span>By The Jagmal Group</span>
            <span>•</span>
            <span>Varanasi</span>
            <span>•</span>
            <span>Prayagraj</span>
            <span>•</span>
            <span>Agra</span>
            <span>•</span>
            <span>Mathura</span>
            <span>•</span>
            <span>Lucknow</span>
          </div>
          <p className="text-[10px] font-mono text-stone-600 max-w-md mx-auto pt-2">
            This checkout simulates high-fidelity contactless ordering. Scanning QR code at the table opens menu filters and channels directly to kitchen line securely.
          </p>
        </div>
      </footer>

      {/* --- SIDE FLOATING CART AND WIDGETS --- */}

      {/* Floating Cart Launcher Button */}
      {cartTotalQty > 0 && (
        <motion.button
          onClick={() => setIsCartOpen(true)}
          initial={{ scale: 0, y: 100 }}
          animate={{ scale: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-24 right-6 w-16 h-16 rounded-full bg-brand-blue text-white flex flex-col items-center justify-center shadow-2xl cursor-pointer hover:bg-brand-blue-dark transition-colors z-50 ring-4 ring-white border-2 border-brand-blue"
          id="cart-floating-launcher"
        >
          <div className="relative">
            <ShoppingBag className="w-6.5 h-6.5" strokeWidth={1.2} />
            <span className="absolute -top-2.5 -right-2.5 bg-brand-gold text-white font-sans font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-brand-blue animate-bounce">
              {cartTotalQty}
            </span>
          </div>
          <span className="text-[9px] font-mono font-bold mt-0.5">₹{cartSubtotal}</span>
        </motion.button>
      )}

      {/* Static sidebar and cart drawer overlay */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveFromCart}
        onToggleItemVegan={handleToggleItemVegan}
        tableNumber={tableNumber}
        onTableNumberChange={setTableNumber}
        universalVegan={universalVegan}
        onToggleUniversalVegan={handleToggleUniversalVegan}
        onProceedToPayment={() => setIsPaymentOpen(true)}
      />

      {/* AI Storyteller Floating Chatbot */}
      <CulinaryChatbot />

      {/* Payment simulated popup */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        cartItems={cart}
        tableNumber={tableNumber}
        total={cartSubtotal + (cartSubtotal > 0 ? 15 : 0)}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
