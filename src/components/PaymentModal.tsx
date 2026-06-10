import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CreditCard, QrCode, CheckCircle2, ShieldCheck, Sparkles, Loader2, Landmark } from "lucide-react";
import { CartItem } from "../types";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  tableNumber: string;
  total: number;
  onPaymentSuccess: (orderId: string) => void;
}

export default function PaymentModal({
  isOpen,
  onClose,
  cartItems,
  tableNumber,
  total,
  onPaymentSuccess
}: PaymentModalProps) {
  const [method, setMethod] = useState<"upi" | "card" | null>(null);
  const [step, setStep] = useState<"select" | "details" | "processing" | "success">("select");
  const [cardNo, setCardNo] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [simulatedOrderId, setSimulatedOrderId] = useState("");

  const handleSelectMethod = (selected: "upi" | "card") => {
    setMethod(selected);
    setStep("details");
  };

  const handleMockPay = async () => {
    setStep("processing");

    // Mimic quick network confirmation delays with state ticks
    await new Promise((resolve) => setTimeout(resolve, 3100));

    // Send mock request to server to create order id
    try {
      const res = await fetch("/api/order/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            id: item.menuItem.id,
            name: item.menuItem.name,
            quantity: item.quantity,
            price: item.menuItem.price,
            isVeganCustomized: item.isVeganCustomized
          })),
          tableNumber,
          total,
          isVegan: cartItems.every((item) => item.isVeganCustomized)
        })
      });

      const data = await res.json();
      if (data.success) {
        setSimulatedOrderId(data.orderId);
        setStep("success");
        // pass upward after some celebratory delay
        setTimeout(() => {
          onPaymentSuccess(data.orderId);
        }, 3400);
      }
    } catch (e) {
      // Fallback
      const orderId = "PRANAM-" + Math.floor(100000 + Math.random() * 90000);
      setSimulatedOrderId(orderId);
      setStep("success");
      setTimeout(() => {
        onPaymentSuccess(orderId);
      }, 3400);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop screen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={step !== "processing" ? onClose : undefined}
            className="absolute inset-0 bg-stone-900"
          />

          {/* Modal Container */}
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-brand-ivory w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-brand-gold/20 flex flex-col glow-gold"
            id="payment-modal"
          >
            {/* Header */}
            <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-white">
              <div>
                <span className="text-[9px] font-mono tracking-widest text-brand-gold font-bold uppercase block">
                  Table {tableNumber} Checkout
                </span>
                <h3 className="font-serif text-base font-bold text-brand-dark">Contactless Payment Gateway</h3>
              </div>

              {step !== "processing" && (
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
                  id="close-payment-modal"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* --- STEP 1: Select payment method --- */}
              {step === "select" && (
                <div className="space-y-4">
                  <p className="text-xs text-stone-600 leading-relaxed text-center mb-1">
                    Select your preferred contactless payment vehicle to instantly clear checkout from Table {tableNumber}:
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleSelectMethod("upi")}
                      className="bg-white border border-stone-200 hover:border-brand-blue rounded-2xl p-5 text-center flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-brand-blue/5 duration-300"
                      id="payment-method-upi"
                    >
                      <div className="w-11 h-11 rounded-xl bg-sky-50 text-brand-blue flex items-center justify-center mb-2 border border-sky-100">
                        <QrCode className="w-6.5 h-6.5" />
                      </div>
                      <span className="font-serif text-sm font-bold text-stone-900 block">UPI QR Scan</span>
                      <span className="text-[10px] text-stone-400 mt-1">Instant via GPay/PhonePe</span>
                    </button>

                    <button
                      onClick={() => handleSelectMethod("card")}
                      className="bg-white border border-stone-200 hover:border-brand-gold rounded-2xl p-5 text-center flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-brand-gold/5 duration-300"
                      id="payment-method-card"
                    >
                      <div className="w-11 h-11 rounded-xl bg-amber-50 text-brand-gold flex items-center justify-center mb-2 border border-amber-100">
                        <CreditCard className="w-6.5 h-6.5" />
                      </div>
                      <span className="font-serif text-sm font-bold text-stone-900 block">Bank Card</span>
                      <span className="text-[10px] text-stone-400 mt-1">Visa, Mastercard, RuPay</span>
                    </button>
                  </div>

                  <div className="p-3.5 bg-brand-beige/20 rounded-xl border border-stone-150 flex items-center gap-2.5 text-[10px] text-stone-600 font-sans mt-2">
                    <ShieldCheck className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0" />
                    <span>Your checkout operates secured by standard SSL, routed directly to PraNam QSR queue management system.</span>
                  </div>
                </div>
              )}

              {/* --- STEP 2: Payment details --- */}
              {step === "details" && method === "upi" && (
                <div className="text-center space-y-4">
                  <span className="text-[9px] font-mono tracking-widest text-[#6200EE] font-bold bg-[#E8E0FF] px-2.5 py-1 rounded-full border border-[#D5C2FF]">
                    BHARAT UPI DEPLOYED
                  </span>
                  
                  <div className="w-44 h-44 bg-white border-2 border-stone-150 p-2.5 rounded-3xl mx-auto relative shadow-sm flex items-center justify-center">
                    {/* Simulated Table-Specific QR Code */}
                    <svg viewBox="0 0 100 100" className="w-full h-full text-stone-800">
                      {/* Corners */}
                      <rect x="5" y="5" width="25" height="25" class="fill-none stroke-brand-dark stroke-[6]" />
                      <rect x="12" y="12" width="11" height="11" class="fill-brand-gold" />
                      
                      <rect x="70" y="5" width="25" height="25" class="fill-none stroke-brand-dark stroke-[6]" />
                      <rect x="77" y="12" width="11" height="11" class="fill-brand-gold" />
                      
                      <rect x="5" y="70" width="25" height="25" class="fill-none stroke-brand-dark stroke-[6]" />
                      <rect x="12" y="77" width="11" height="11" class="fill-brand-gold" />
                      
                      {/* Random Matrix Dots for authentic feeling */}
                      <path d="M 35,10 H 45 V 20 H 35 Z M 55,5 H 65 V 15 H 55 Z M 35,40 H 55 V 45 H 35 Z M 15,45 H 25 V 65 H 15 Z M 45,55 H 55 V 65 H 45 Z M 65,45 H 85 V 50 H 65 Z M 70,70 H 85 V 75 H 70 Z" class="fill-stone-800" />
                      <circle cx="50" cy="50" r="14" class="fill-white stroke-brand-blue stroke-2" />
                      <text x="50" y="53" text-anchor="middle" font-size="9" font-weight="900" font-family="monospace" class="fill-brand-blue">UP</text>
                    </svg>
                  </div>

                  <p className="text-xs text-stone-600 max-w-xs mx-auto">
                    Scan this table-specific code using <span className="font-bold text-stone-800">Google Pay, BHIM, PayTM or PhonePe</span>. 
                  </p>

                  <div className="bg-stone-50 border border-stone-200 py-3 rounded-2xl font-mono text-xs font-bold text-stone-800 grid grid-cols-2 divide-x divide-stone-200">
                    <div>
                      <span className="text-[9px] block text-stone-400 font-sans uppercase">AMOUNT</span>
                      ₹{total}
                    </div>
                    <div>
                      <span className="text-[9px] block text-stone-400 font-sans uppercase">TABLE LINKED</span>
                      Table #{tableNumber}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setStep("select")}
                      className="w-1/2 py-3 bg-stone-100 hover:bg-stone-200 text-stone-600 font-serif text-xs font-bold tracking-widest rounded-xl transition-colors cursor-pointer"
                      id="back-to-pay-select"
                    >
                      CHOOSE OTHER
                    </button>
                    <button
                      onClick={handleMockPay}
                      className="w-1/2 py-3 bg-brand-blue text-white font-serif text-xs font-bold tracking-widest rounded-xl hover:bg-brand-blue-dark transition-all duration-300 shadow-md shadow-brand-blue/15 cursor-pointer"
                      id="upi-confirm-pay"
                    >
                      I HAVE PAID
                    </button>
                  </div>
                </div>
              )}

              {step === "details" && method === "card" && (
                <div className="space-y-4">
                  {/* Mock Interactive Credit Card display */}
                  <motion.div
                    className="h-44 rounded-2xl bg-gradient-to-tr from-brand-dark via-brand-dark/95 to-brand-blue-dark p-5 text-white flex flex-col justify-between border border-brand-gold/30 shadow-md relative overflow-hidden"
                    initial={{ rotateX: 15 }}
                    animate={{ rotateX: 0 }}
                  >
                    {/* Visual Highlights */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] font-mono tracking-widest text-brand-gold uppercase block">PRANAM EMBOSSED</span>
                        <span className="font-serif text-sm font-bold tracking-widest">LOYALTY PASS</span>
                      </div>
                      <div className="p-1 rounded bg-white/10">
                        <CreditCard className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    <div>
                      <p className="font-mono text-sm tracking-widest font-bold">
                        {cardNo ? cardNo : "•••• •••• •••• ••••"}
                      </p>
                    </div>

                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-[8px] font-sans text-stone-400 block uppercase">CARDHOLDER</span>
                        <p className="text-xs font-mono font-bold tracking-wider capitalize whitespace-nowrap truncate max-w-[150px]">
                          {cardName ? cardName : "VIP GUEST"}
                        </p>
                      </div>
                      <div>
                        <span className="text-[8px] font-sans text-stone-400 block uppercase">VALID THRU</span>
                        <p className="text-xs font-mono font-bold">
                          {expiry ? expiry : "MM / YY"}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Form inputs */}
                  <div className="space-y-3 text-xs leading-none">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-mono tracking-wider text-stone-400 uppercase block mb-1">
                          CARD NUMBER
                        </label>
                        <input
                          type="text"
                          value={cardNo}
                          onChange={(e) => setCardNo(e.target.value.replace(/\D/g, "").slice(0, 16))}
                          placeholder="4000 1234 5678 9010"
                          className="w-full bg-white border border-stone-250 p-2.5 rounded-xl font-mono text-stone-850 outline-none focus:border-brand-gold"
                          id="card-no-field"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono tracking-wider text-stone-400 uppercase block mb-1">
                          CARDHOLDER NAME
                        </label>
                        <input
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="Your Premium Name"
                          className="w-full bg-white border border-stone-250 p-2.5 rounded-xl font-mono text-stone-850 outline-none focus:border-brand-gold"
                          id="card-name-field"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-mono tracking-wider text-stone-400 uppercase block mb-1">
                          EXPIRY DATE
                        </label>
                        <input
                          type="text"
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value.slice(0, 5))}
                          placeholder="12/29"
                          className="w-full bg-white border border-stone-250 p-2.5 rounded-xl font-mono text-stone-850 outline-none focus:border-brand-gold"
                          id="card-expiry-field"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono tracking-wider text-stone-400 uppercase block mb-1">
                          CVV CODE
                        </label>
                        <input
                          type="password"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                          placeholder="•••"
                          className="w-full bg-white border border-stone-250 p-2.5 rounded-xl font-mono text-stone-850 outline-none focus:border-brand-gold"
                          id="card-cvv-field"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setStep("select")}
                      className="w-1/2 py-3 bg-stone-100 hover:bg-stone-200 text-stone-600 font-serif text-xs font-bold tracking-widest rounded-xl transition-colors cursor-pointer"
                      id="back-to-pay-select-card"
                    >
                      CHOOSE OTHER
                    </button>
                    <button
                      onClick={handleMockPay}
                      disabled={!cardNo || !cvv || !cardName || !expiry}
                      className={`w-1/2 py-3 font-serif text-xs font-bold tracking-widest rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-1.5 ${
                        cardNo && cvv && cardName && expiry
                          ? "bg-brand-blue text-white hover:bg-brand-blue-dark shadow-brand-blue/15 cursor-pointer"
                          : "bg-stone-200 text-stone-400 cursor-not-allowed shadow-none"
                      }`}
                      id="card-confirm-pay"
                    >
                      SECURE PAY ₹{total}
                    </button>
                  </div>
                </div>
              )}

              {/* --- STEP 3: Transaction Processing --- */}
              {step === "processing" && (
                <div className="text-center py-12 space-y-5">
                  <div className="relative w-16 h-16 mx-auto">
                    <Loader2 className="w-16 h-16 text-brand-gold animate-spin stroke-1" />
                    <Landmark className="w-6 h-6 text-brand-dark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="font-serif text-base font-bold text-brand-dark">Clearing Node Transaction</h4>
                    <p className="text-stone-500 text-xs animate-pulse max-w-xs mx-auto">
                      Deducting securely from connected bank, verifying Table Number #{tableNumber} clearance...
                    </p>
                  </div>

                  <div className="h-1 bg-stone-100 rounded-full overflow-hidden max-w-[200px] mx-auto">
                    <motion.div
                      className="h-full bg-brand-blue"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3 }}
                    />
                  </div>
                </div>
              )}

              {/* --- STEP 4: Transaction Successful & Receipt --- */}
              {step === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-5"
                >
                  <div className="text-center">
                    <motion.div
                      className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 10 }}
                    >
                      <CheckCircle2 className="w-7 h-7" />
                    </motion.div>
                    <h4 className="font-serif text-base font-bold text-emerald-700">Payment Completed!</h4>
                    <span className="text-[10px] font-mono text-stone-400 uppercase">PRANAM HOUSE RECEIPT</span>
                  </div>

                  {/*torn bottom receipt ticket component*/}
                  <div className="bg-white border border-stone-200 rounded-2xl relative shadow-md p-5 pb-8 overflow-hidden font-mono text-xs text-stone-800 leading-snug">
                    <div className="absolute top-0 inset-x-0 h-1.5 bg-brand-gold" />
                    
                    <div className="text-center border-b border-dashed border-stone-200 pb-3 mb-3">
                      <p className="font-serif text-sm font-bold text-brand-dark">PraNam Cafe</p>
                      <p className="text-[9px] font-mono text-stone-400 mt-0.5 whitespace-nowrap">
                        By The Jagmal Group · Lucknow, UP
                      </p>
                      <p className="text-[9px] font-mono text-stone-500 font-bold mt-1.5">
                        ORDER ID: {simulatedOrderId}
                      </p>
                    </div>

                    <div className="space-y-1">
                      {cartItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between font-medium">
                          <span>
                            {item.quantity}x {item.menuItem.name} 
                            {item.isVeganCustomized && <span className="text-[9px] text-emerald-600 ml-1 font-bold">(V)</span>}
                          </span>
                          <span>₹{item.menuItem.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-dashed border-stone-200 pt-3 mt-3 space-y-1 font-bold text-stone-900 leading-snug">
                      <div className="flex justify-between">
                        <span>TOTAL PAID</span>
                        <span>₹{total}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-stone-500 font-medium">
                        <span>TABLE LOCATION</span>
                        <span>TABLE #{tableNumber}</span>
                      </div>
                    </div>

                    {/* torn zig-zag canvas details */}
                    <div className="absolute bottom-[-11px] left-0 right-0 h-4 flex overflow-hidden">
                      {Array.from({ length: 40 }).map((_, rIdx) => (
                        <div
                          key={rIdx}
                          className="w-4 h-4 bg-brand-ivory flex-shrink-0 border-t border-stone-200 transform rotate-45"
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-[10px] text-center font-mono text-brand-gold animate-pulse leading-tight">
                    🔥 Sent directly to kitchen line. Keep sitting comfortable at Table {tableNumber}!
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
