import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Trash2, Leaf, ShoppingCart, ArrowRight } from "lucide-react";
import { CartItem } from "../types";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (menuItemId: string, newQty: number) => void;
  onRemoveItem: (menuItemId: string) => void;
  onToggleItemVegan: (menuItemId: string) => void;
  tableNumber: string;
  onTableNumberChange: (tableNum: string) => void;
  universalVegan: boolean;
  onToggleUniversalVegan: () => void;
  onProceedToPayment: () => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onToggleItemVegan,
  tableNumber,
  onTableNumberChange,
  universalVegan,
  onToggleUniversalVegan,
  onProceedToPayment
}: CartSidebarProps) {
  const subtotal = cartItems.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
  const packagingFee = subtotal > 0 ? 15 : 0; // standard contactless packaging / hygiene bowl fee
  const total = subtotal + packagingFee;

  const handleQtyChange = (menuItemId: string, currentQty: number, offset: number) => {
    const next = currentQty + offset;
    if (next <= 0) {
      onRemoveItem(menuItemId);
    } else {
      onUpdateQuantity(menuItemId, next);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40 cursor-pointer"
          />

          {/* Sidebar Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-brand-ivory z-50 shadow-2xl flex flex-col border-l border-brand-gold/20"
            id="cart-sidebar"
          >
            {/* Header */}
            <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                  <ShoppingCart className="w-5 h-5" strokeWidth={1.2} />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-brand-dark">Order Basket</h3>
                  <span className="text-xs font-mono text-stone-400">
                    {cartItems.length === 0 ? "Empty" : `${cartItems.length} dish types`}
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
                id="close-cart-btn"
              >
                <X className="w-4.5 h-4.5" strokeWidth={1.2} />
              </button>
            </div>

            {/* Cart Body */}
            <div className="flex-grow overflow-y-auto p-6 space-y-5">
              {/* Contactless QR Table Selector */}
              <div className="bg-brand-beige/50 border border-brand-gold/25 rounded-2xl p-4">
                <span className="text-[10px] font-mono tracking-widest text-brand-gold font-bold block uppercase">
                  Contactless Ordering Node
                </span>
                <p className="text-xs text-stone-600 mt-1">
                  Enter your physical table number at PraNam Cafe to directly alert the kitchen line:
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-stone-700 bg-brand-beige border border-brand-gold/20 px-3 py-1.5 rounded-lg whitespace-nowrap">
                    TABLE NO:
                  </span>
                  <input
                    type="text"
                    value={tableNumber}
                    onChange={(e) => onTableNumberChange(e.target.value)}
                    placeholder="Enter Table (e.g. 4)"
                    className="w-full text-sm font-mono font-bold text-stone-800 bg-white border border-stone-250 focus:border-brand-gold outline-none rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-brand-gold/20"
                    id="table-number-input"
                  />
                </div>
              </div>

              {/* Universal 100% Vegan Switch */}
              <div className="bg-emerald-50/70 border border-emerald-250/50 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Leaf className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-800">100% Vegan Cart</h4>
                    <p className="text-[10px] font-mono text-emerald-700 mt-0.5">
                      Toggle every dish to its plant-based version!
                    </p>
                  </div>
                </div>

                <button
                  onClick={onToggleUniversalVegan}
                  className={`w-11 h-6 rounded-full p-0.5 cursor-pointer transition-colors duration-300 ${
                    universalVegan ? "bg-emerald-500" : "bg-stone-300"
                  }`}
                  id="universal-vegan-toggle"
                >
                  <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                    universalVegan ? "translate-x-5" : "translate-x-0"
                  }`} />
                </button>
              </div>

              {/* Basket list */}
              {cartItems.length === 0 ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-brand-beige/30 flex items-center justify-center mx-auto text-stone-400 mb-4 border border-dashed border-stone-200">
                    <ShoppingCart className="w-7 h-7" />
                  </div>
                  <p className="font-serif text-sm font-bold text-brand-dark">Your basket is pristine</p>
                  <p className="text-xs text-stone-400 mt-1 max-w-xs mx-auto">
                    Take your tastebuds on a journey by adding regional dishes of Uttar Pradesh!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h4 className="text-[10px] font-mono text-stone-400 tracking-wider uppercase">
                    Your Selected Delicacies
                  </h4>

                  <AnimatePresence initial={false}>
                    {cartItems.map((item, idx) => {
                      const isItemVeganActive = universalVegan || item.isVeganCustomized;
                      return (
                        <motion.div
                          key={`${item.menuItem.id}-${item.isVeganCustomized}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-white border border-stone-150 rounded-2xl p-4 flex flex-col gap-3"
                          id={`cart-item-${item.menuItem.id}`}
                        >
                          <div className="flex gap-3 justify-between">
                            <div className="flex gap-2.5">
                              {/* Small thumb image container */}
                              <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center border border-stone-100">
                                <img src={item.menuItem.image} alt={item.menuItem.name} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <h5 className="text-xs font-serif font-bold text-brand-dark leading-tight line-clamp-1">
                                  {item.menuItem.name}
                                </h5>
                                <span className="text-[9px] font-mono text-brand-gold uppercase block mt-0.5">
                                  {item.menuItem.city} corridor
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => onRemoveItem(item.menuItem.id)}
                              className="text-stone-400 hover:text-red-500 transition-colors cursor-pointer self-start p-1"
                              id={`delete-cart-item-${item.menuItem.id}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Controls bar */}
                          <div className="flex items-center justify-between border-t border-stone-50 pt-2.5">
                            {/* Vegan Individual Toggle */}
                            <button
                              onClick={() => {
                                if (!universalVegan) {
                                  onToggleItemVegan(item.menuItem.id);
                                }
                              }}
                              disabled={universalVegan}
                              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-semibold transition-all duration-300 ${
                                isItemVeganActive
                                  ? "bg-emerald-50 border-emerald-250 text-emerald-600"
                                  : "bg-stone-50 border-stone-200 text-stone-500"
                              } ${universalVegan ? "opacity-75 cursor-not-allowed" : "cursor-pointer"}`}
                              id={`cart-item-vegan-btn-${item.menuItem.id}`}
                            >
                              <Leaf className="w-3 H-3 fill-current" />
                              {isItemVeganActive ? "100% Plant-Based" : "Make Vegan"}
                            </button>

                            {/* Quantity Editor */}
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-mono font-bold text-stone-800">
                                ₹{item.menuItem.price * item.quantity}
                              </span>

                              <div className="flex items-center bg-stone-100 border border-stone-200 rounded-lg overflow-hidden px-0.5 py-0.2">
                                <button
                                  onClick={() => handleQtyChange(item.menuItem.id, item.quantity, -1)}
                                  className="p-1 text-stone-600 hover:text-brand-gold transition-colors cursor-pointer"
                                  id={`cart-qty-decrease-${item.menuItem.id}`}
                                >
                                  <X className="w-3 h-3" />
                                </button>
                                <span className="w-5 text-center text-[11px] font-mono font-bold text-stone-850">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleQtyChange(item.menuItem.id, item.quantity, 1)}
                                  className="p-1 text-stone-600 hover:text-brand-gold transition-colors cursor-pointer"
                                  id={`cart-qty-increase-${item.menuItem.id}`}
                                >
                                  <Leaf className="w-3 h-3 scale-x-[-1]" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-stone-250 bg-white space-y-4">
                <div className="space-y-1.5 text-xs text-stone-600 font-sans">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono text-stone-900">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contactless Packing/Hygiene charge</span>
                    <span className="font-mono text-stone-900">₹{packagingFee}</span>
                  </div>
                  <div className="flex justify-between text-base font-serif font-bold text-brand-dark pt-1.5 border-t border-stone-100">
                    <span>Grand Total</span>
                    <span className="font-mono text-stone-950 text-lg">₹{total}</span>
                  </div>
                </div>

                <motion.button
                  onClick={onProceedToPayment}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!tableNumber.trim()}
                  className={`w-full py-4 text-center font-serif text-sm font-bold tracking-widest rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all duration-300 ${
                    tableNumber.trim()
                      ? "bg-brand-blue text-white hover:bg-brand-blue-dark shadow-brand-blue/20 cursor-pointer"
                      : "bg-stone-200 text-stone-400 cursor-not-allowed shadow-none"
                  }`}
                  id="checkout-proceed-btn"
                >
                  {tableNumber.trim() ? (
                    <>
                      PROCEED TO ORDER
                      <ArrowRight className="w-4 h-4" strokeWidth={1.2} />
                    </>
                  ) : (
                    "ENTER TABLE NUMBER TO PAY"
                  )}
                </motion.button>
                {!tableNumber.trim() && (
                  <p className="text-[10px] text-center text-red-500 font-mono">
                    ⚠️ Enter your Table Number above to continue
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
