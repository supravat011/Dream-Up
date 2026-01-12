export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  items: CartItem[];
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  sizes: {
    top: string;
    bottom: string;
    shoe: string;
  };
}

export interface OutfitSuggestion {
  name: string;
  description: string;
  items: string[];
}
