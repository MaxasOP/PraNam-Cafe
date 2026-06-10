import { MenuItem } from "./data/menu";

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  isVeganCustomized: boolean; // Toggled individual plant-based variant
}

export interface Order {
  orderId: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    isVeganCustomized: boolean;
  }[];
  tableNumber: string;
  isVegan: boolean;
  total: number;
  notes: string;
  createdAt: string;
  status: "pending" | "preparing" | "plating" | "completed";
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}
