import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Leaf, Info, Plus, Minus, Check, ChevronDown, ChevronUp } from "lucide-react";
import { MenuItem } from "../data/menu";

interface MenuCardProps {
  key?: string;
  item: MenuItem;
  onAddToCart: (item: MenuItem, quantity: number, isVegan: boolean) => void;
  universalVegan: boolean; // if the whole cart is set to vegan
}

export default function MenuCard({ item, onAddToCart, universalVegan }: MenuCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [isVeganLocal, setIsVeganLocal] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Active vegan flag is true if either local toggle is on or the restaurant universal toggle is on
  const isVeganActive = universalVegan || isVeganLocal;

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const triggerAddToCart = () => {
    onAddToCart(item, quantity, isVeganActive);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      setQuantity(1); // resettable
    }, 1200);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
      className="p-2 rounded-[2rem] bg-stone-100/90 border border-stone-200/40 shadow-sm transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-xl hover:bg-brand-beige/50 group h-full flex flex-col"
      id={`menu-card-${item.id}`}
    >
      {/* Inner Core Container */}
      <div className="bg-white rounded-[calc(2rem-0.5rem)] overflow-hidden flex flex-col h-full border border-stone-150/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.85)] relative">
        
        {/* Image Header */}
        <div className="relative overflow-hidden h-48 border-b border-stone-100 flex items-center justify-center">
          {/* Real Food Picture */}
          <img 
            src={item.image} 
            alt={item.name} 
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-108"
          />

          {/* Elegant Gradient Shade */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

          {/* Tag Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
            <span className="px-2.5 py-1 text-[9px] font-mono tracking-widest font-bold bg-brand-dark/80 text-brand-beige rounded-full border border-brand-gold/30 backdrop-blur-sm">
              {item.city.toUpperCase()}
            </span>
            {item.tag && (
              <span className="flex items-center gap-1 px-2.5 py-1 text-[9px] font-mono tracking-widest font-bold bg-brand-gold text-white rounded-full border border-brand-gold-light/40 shadow-sm">
                <Sparkles className="w-2.5 h-2.5 text-white" strokeWidth={1.2} />
                {item.tag}
              </span>
            )}
          </div>

          {/* Veg/Vegan Leaf Indicator */}
          <div className="absolute top-4 right-4 z-10">
            <motion.div 
              animate={{ scale: isVeganActive ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.4 }}
              className={`w-7 h-7 rounded-full flex items-center justify-center border backdrop-blur-md ${
                isVeganActive 
                  ? "bg-emerald-500/95 border-emerald-400 text-white shadow-sm" 
                  : "bg-white/90 border-stone-300 text-stone-500"
              }`}
              title={isVeganActive ? "100% Vegan (Plant-Based Variant Activated)" : "Vegetarian (Vegan Customization Available)"}
            >
              <Leaf className="w-4 h-4 fill-current" strokeWidth={1.2} />
            </motion.div>
          </div>

          {/* Mock Steam animation if item is warm */}
          {item.category !== "sweets" && item.category !== "drinks" && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1.5 pointer-events-none opacity-45 z-20">
              <span className="w-[2px] h-7 bg-white/60 blur-[1px] rounded animate-steam-1"></span>
              <span className="w-[2px] h-10 bg-white/60 blur-[1px] rounded animate-steam-2"></span>
              <span className="w-[2px] h-7 bg-white/60 blur-[1px] rounded animate-steam-3"></span>
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="font-serif text-xl font-bold text-brand-dark leading-snug group-hover:text-brand-gold transition-colors duration-300">
            {item.name}
          </h3>
          <p className="text-xs font-mono text-brand-gold mt-1 font-semibold uppercase tracking-wide">
            {item.nativeName}
          </p>

          <p className="text-stone-600 text-xs mt-3.5 leading-relaxed flex-grow">
            {item.description}
          </p>

          {/* Vegan Customizer Toggle */}
          <div className="mt-5 bg-stone-50 rounded-2xl p-3 border border-stone-100 flex items-center justify-between transition-colors duration-300 hover:bg-stone-100/50">
            <div className="flex items-center gap-2.5">
              <Leaf className={`w-4 h-4 transition-colors duration-300 ${isVeganActive ? "text-emerald-500" : "text-stone-400"}`} strokeWidth={1.2} />
              <div>
                <p className="text-[11px] font-sans font-bold text-stone-850">
                  100% Plant-Based
                </p>
                <p className="text-[9px] font-mono text-stone-400">
                  {isVeganActive ? "Almond curd / tofu variant" : "Substitute cow dairy"}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => {
                if (!universalVegan) {
                  setIsVeganLocal(!isVeganLocal);
                }
              }}
              disabled={universalVegan}
              className={`w-11 h-6 rounded-full p-0.5 cursor-pointer transition-colors duration-500 ${
                isVeganActive 
                  ? "bg-emerald-500" 
                  : "bg-stone-300"
              } ${universalVegan ? "opacity-70 cursor-not-allowed" : ""}`}
              id={`vegan-toggle-btn-${item.id}`}
            >
              <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                isVeganActive ? "translate-x-5" : "translate-x-0"
              }`} />
            </button>
          </div>

          {/* Storytelling Dropdown */}
          <div className="mt-4 border-t border-b border-stone-100 py-3">
            <button
              onClick={() => setShowStory(!showStory)}
              className="flex items-center justify-between w-full text-left text-xs font-serif font-bold text-brand-gold-light hover:text-brand-gold transition-colors py-1 cursor-pointer"
              id={`story-toggle-btn-${item.id}`}
            >
              <span className="flex items-center gap-2 font-sans uppercase tracking-widest text-[9px] font-bold">
                <Info className="w-3.5 h-3.5" strokeWidth={1.2} />
                Culinary Story & Origin
              </span>
              {showStory ? <ChevronUp className="w-4 h-4" strokeWidth={1.2} /> : <ChevronDown className="w-4 h-4" strokeWidth={1.2} />}
            </button>

            <AnimatePresence>
              {showStory && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pt-2 text-[11px] leading-relaxed font-sans text-stone-500 bg-brand-beige/25 p-3 rounded-xl border border-stone-100/60 mt-1.5">
                    <p className="font-bold italic text-brand-dark mb-1">
                      How it's made vegan: <span className="text-emerald-600 font-sans font-semibold">{item.veganAlternative}</span>
                    </p>
                    {item.history}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Price & Add to Cart Section */}
          <div className="mt-5 pt-1.5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-stone-400 block tracking-wider font-bold">PRANAM VALUE</span>
              <span className="font-mono text-base font-bold text-stone-900">
                ₹{item.price}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Quantity Controller */}
              <div className="flex items-center bg-stone-100 border border-stone-200/60 rounded-xl overflow-hidden px-1 py-0.5 shadow-[inset_0_1px_1px_rgba(0,0,0,0.02)]">
                <button
                  onClick={handleDecrement}
                  className="p-1 text-stone-600 hover:text-brand-gold transition-colors cursor-pointer"
                  id={`qty-decrease-${item.id}`}
                >
                  <Minus className="w-3.5 h-3.5" strokeWidth={1.2} />
                </button>
                <span className="w-6 text-center text-xs font-mono font-semibold text-stone-850">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  className="p-1 text-stone-600 hover:text-brand-gold transition-colors cursor-pointer"
                  id={`qty-increase-${item.id}`}
                >
                  <Plus className="w-3.5 h-3.5" strokeWidth={1.2} />
                </button>
              </div>

              {/* Add to Cart Button (Button-in-Button architecture) */}
              <motion.button
                onClick={triggerAddToCart}
                whileTap={{ scale: 0.96 }}
                className={`pl-4 pr-1.5 py-1.5 font-serif font-bold text-xs tracking-wider rounded-full cursor-pointer shadow-sm transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center gap-2.5 active:scale-[0.98] ${
                  addedAnimation
                    ? "bg-emerald-600 text-white shadow-emerald-100"
                    : "bg-brand-blue text-white hover:bg-brand-blue-dark shadow-blue-50"
                }`}
                id={`add-to-cart-btn-${item.id}`}
              >
                <span>{addedAnimation ? "ADDED" : "ADD"}</span>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  addedAnimation ? "bg-white/20" : "bg-black/10 group-hover:bg-white/25"
                }`}>
                  {addedAnimation ? (
                    <Check className="w-3.5 h-3.5 stroke-[2]" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 stroke-[2] transition-transform duration-550 group-hover:rotate-90" />
                  )}
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
