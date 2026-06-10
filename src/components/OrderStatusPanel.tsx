import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Utensils, Flame, Sparkles, ChefHat, CheckCircle2, Clock, MapPin, Loader2 } from "lucide-react";

interface OrderStatusPanelProps {
  orderId: string;
  tableNumber: string;
  total: number;
  onClearStatus: () => void;
}

export default function OrderStatusPanel({
  orderId,
  tableNumber,
  total,
  onClearStatus
}: OrderStatusPanelProps) {
  const [stage, setStage] = useState<1 | 2 | 3 | 4>(1);
  const [minsRemaining, setMinsRemaining] = useState(11);

  useEffect(() => {
    // Progress through cooking stages systematically
    const stageTimer = setInterval(() => {
      setStage((prev) => {
        if (prev < 4) {
          return (prev + 1) as 1 | 2 | 3 | 4;
        }
        return prev;
      });
    }, 7000); // 7s per stage tick

    const minutesTimer = setInterval(() => {
      setMinsRemaining((prev) => (prev > 1 ? prev - 1 : 1));
    }, 3000); // countdown

    return () => {
      clearInterval(stageTimer);
      clearInterval(minutesTimer);
    };
  }, []);

  const stagesDef = [
    {
      id: 1,
      title: "Spices Assembly",
      desc: "Gathering pristine grains & grinding fresh local cardamoms.",
      icon: ChefHat,
      color: "text-amber-500 bg-amber-50 border-amber-200"
    },
    {
      id: 2,
      title: "Wood Fire Dum / Griddling",
      desc: "Simmering items slow over custom fires to capture earth flavor.",
      icon: Flame,
      color: "text-orange-500 bg-orange-50 border-orange-250"
    },
    {
      id: 3,
      title: "Garnishing & Plate Decor",
      desc: "Draping in cool almond malai, pomegranate, or saffron dew.",
      icon: Sparkles,
      color: "text-brand-blue bg-sky-50 border-sky-200"
    },
    {
      id: 4,
      title: "Served at Table !",
      desc: "Delivered fresh to Table " + tableNumber + " in heritage clay kulhads.",
      icon: CheckCircle2,
      color: "text-emerald-600 bg-emerald-50 border-emerald-300"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white border border-brand-gold/15 rounded-3xl p-6 shadow-md max-w-2xl mx-auto space-y-6 glow-gold relative overflow-hidden"
      id="order-status-panel"
    >
      {/* Decorative Gold Rim */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-brand-gold" />

      {/* Header info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
        <div>
          <span className="text-[9px] font-mono tracking-widest text-brand-gold font-bold uppercase block">
            CONTACTLESS QUEUE QUEUE
          </span>
          <h3 className="font-serif text-lg font-bold text-brand-dark flex items-center gap-2">
            <Utensils className="w-5 h-5 text-brand-gold" />
            Kitchen Order Activated
          </h3>
          <p className="text-xs text-stone-500 mt-1 font-mono">
            ID: <span className="text-stone-850 font-bold">{orderId}</span> · Table Location: <span className="text-brand-blue font-bold">#{tableNumber}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 bg-brand-beige/40 px-4 py-2.5 rounded-2xl border border-brand-gold/15">
          <Clock className="w-5 h-5 text-brand-gold animate-pulse" />
          <div className="text-left font-mono">
            <span className="text-[9px] text-stone-400 block tracking-widest font-sans uppercase">AWAITING TIME</span>
            <span className="text-xs font-bold text-stone-850">{stage === 4 ? "Fulfillled !" : `~${minsRemaining} Minutes`}</span>
          </div>
        </div>
      </div>

      {/* Live progress graphic */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
        {stagesDef.map((s) => {
          const ActiveIcon = s.icon;
          const isDone = stage >= s.id;
          const isActive = stage === s.id;

          return (
            <div
              key={s.id}
              className={`flex flex-col p-4 rounded-2xl border transition-all duration-350 relative ${
                isActive
                  ? "bg-brand-blue-dark text-white border-brand-blue-dark shadow-md"
                  : isDone
                  ? "bg-emerald-50/50 border-emerald-100 text-stone-700"
                  : "bg-stone-50 border-stone-150 text-stone-400 opacity-60"
              }`}
            >
              {/* Corner tick indicator */}
              <div className="absolute top-3 right-3">
                {isDone && !isActive ? (
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 fill-white" />
                ) : isActive ? (
                  <Loader2 className="w-4.5 h-4.5 text-brand-gold animate-spin" />
                ) : (
                  <div className="w-4.5 h-4.5 rounded-full border-2 border-stone-250 bg-stone-100" />
                )}
              </div>

              <div className={`w-8 h-8 rounded-xl flex items-center justify-center border mb-3 ${
                isActive ? "bg-white/25 text-brand-gold border-white/10" : s.color
              }`}>
                <ActiveIcon className="w-4.5 h-4.5" />
              </div>

              <h4 className={`text-xs font-serif font-bold ${isActive ? "text-brand-bevel text-white" : "text-brand-dark"}`}>
                {s.title}
              </h4>
              <p className={`text-[10px] mt-1 leading-snug ${isActive ? "text-stone-200" : "text-stone-500"}`}>
                {s.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Culinary Wisdom Story Banner */}
      <div className="bg-brand-beige/20 border border-brand-gold/10 rounded-2xl p-4 flex gap-3 text-xs leading-relaxed text-stone-600">
        <MapPin className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
        <div>
          <span className="text-[9px] font-mono tracking-widest text-brand-gold font-bold block uppercase mb-0.5">
            CULINARY HISTORIES OVERVIEW
          </span>
          Did you know? The clay cups we use (called <span className="font-bold text-stone-800 italic">kulhads</span>) are fired locally. Because they are porous, they absorb excess water from hot chai or dense lassis, infusing the beverage with an incredible earthy scent. Eat, drink, and journey through Uttar Pradesh's lanes sustainably!
        </div>
      </div>

      {/* Clear Status button (on completed stage) */}
      {stage === 4 && (
        <motion.button
          onClick={onClearStatus}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3.5 bg-brand-gold hover:bg-brand-gold-light text-white font-serif text-xs font-bold tracking-widest rounded-2xl shadow-lg transition-colors cursor-pointer"
          id="status-dismiss-btn"
        >
          ORDER DISMISSED - BACK TO MAIN DESK
        </motion.button>
      )}
    </motion.div>
  );
}
