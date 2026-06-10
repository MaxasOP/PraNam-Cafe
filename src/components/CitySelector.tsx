import React from "react";
import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { CITIES } from "../data/menu";

interface CitySelectorProps {
  selectedCity: string;
  onSelectCity: (cityId: string) => void;
}

export default function CitySelector({ selectedCity, onSelectCity }: CitySelectorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 px-1">
        <div>
          <span className="text-xs font-mono tracking-widest text-brand-gold uppercase block">The Uttar Pradesh Heritage Belt</span>
          <h2 className="font-serif text-2xl text-brand-dark font-semibold">Select Regional Corridor</h2>
        </div>
        <div className="hidden md:flex items-center gap-1.5 text-xs text-stone-500 font-mono">
          <Icons.Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
          <span>Tap to filter dishes by sacred regions</span>
        </div>
      </div>
      
      {/* Horizontal scroll container with beautiful pills */}
      <div className="flex gap-3 overflow-x-auto pb-4 pt-1 snap-x scrollbar-none scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0">
        {CITIES.map((city, idx) => {
          const isSelected = selectedCity === city.id;
          
          // Dynamically map icon names to actual Lucide-React elements safely
          let DynamicIcon = Icons.Compass;
          if (city.icon === "Waves") DynamicIcon = Icons.Waves;
          else if (city.icon === "Crown") DynamicIcon = Icons.Crown;
          else if (city.icon === "Music") DynamicIcon = Icons.Music;
          else if (city.icon === "Flame") DynamicIcon = Icons.Flame;
          else if (city.icon === "Gem") DynamicIcon = Icons.Gem;
          else if (city.icon === "Compass") DynamicIcon = Icons.Compass;
          else if (city.icon === "MapPin") DynamicIcon = Icons.MapPin;

          return (
            <motion.button
              key={city.id}
              onClick={() => onSelectCity(city.id)}
              className={`snap-center flex-shrink-0 flex items-center gap-3.5 px-5 py-3 rounded-2xl cursor-pointer transition-all duration-300 border text-left ${
                isSelected
                  ? "bg-brand-blue border-brand-blue text-white shadow-lg shadow-brand-blue/20"
                  : "bg-white hover:bg-brand-beige/50 border-stone-200 text-stone-700 hover:border-brand-gold/30"
              }`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              whileTap={{ scale: 0.96 }}
              id={`city-btn-${city.id}`}
            >
              <div className={`p-2 rounded-xl flex items-center justify-center ${
                isSelected ? "bg-white/20 text-white" : "bg-stone-50 text-brand-gold"
              }`}>
                <DynamicIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-serif text-sm font-semibold tracking-wide leading-tight">{city.name}</p>
                <p className={`text-[10px] font-mono whitespace-nowrap mt-0.5 ${
                  isSelected ? "text-stone-100" : "text-stone-400"
                }`}>
                  {city.sub}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
