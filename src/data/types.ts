export type Allergen = 'глютен' | 'лактоза' | 'жаңғақ' | 'жұмыртқа' | 'соя' | 'балық' | 'бал';

export interface NutritionInfo {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  oldPrice?: number;
  image: string;
  composition: string;
  allergens: Allergen[];
  expiryDays: number;
  nutrition: NutritionInfo;
  unit: string;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  productCount: number;
}

export interface BundleSet {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice: number;
  products: { productId: string; quantity: number }[];
  allergenFree: boolean;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
