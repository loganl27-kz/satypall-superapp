import { productImages, bundleImages } from './images';
import { Category, Product, BundleSet } from './types';

export const categories: Category[] = [
  { id: 'meat', name: 'Ет және ет өнімдері', icon: '🥩', productCount: 24 },
  { id: 'dairy', name: 'Сүт өнімдері', icon: '🥛', productCount: 18 },
  { id: 'fruits', name: 'Жемістер мен көкөністер', icon: '🍎', productCount: 32 },
  { id: 'bread', name: 'Нан және тоқаш', icon: '🍞', productCount: 15 },
  { id: 'drinks', name: 'Сусындар', icon: '🥤', productCount: 20 },
  { id: 'grains', name: 'Крупа, макарон', icon: '🌾', productCount: 14 },
  { id: 'sweets', name: 'Кондитерлік өнімдер', icon: '🍫', productCount: 22 },
  { id: 'household', name: 'Тұрмыстық тауарлар', icon: '🧹', productCount: 16 },
  { id: 'tobacco', name: 'Темекі өнімдері', icon: '🚬', productCount: 8 },
  { id: 'baby', name: 'Балалар тағамы', icon: '🍼', productCount: 12 },
  { id: 'spices', name: 'Дәмдеуіштер мен соустар', icon: '🧂', productCount: 19 },
  { id: 'frozen', name: 'Мұздатылған өнімдер', icon: '❄️', productCount: 17 },
];

export const products: Product[] = [
  {
    id: 'p1', name: 'Тауық еті (филе)', categoryId: 'meat', price: 2490, oldPrice: 2990,
    image: productImages.p1, unit: '1 кг',
    composition: 'Тауық етінің филесі, табиғи өнім',
    allergens: [], expiryDays: 5, inStock: true,
    nutrition: { calories: 165, protein: 31, fat: 3.6, carbs: 0 },
  },
  {
    id: 'p2', name: 'Сиыр еті (ұмбет)', categoryId: 'meat', price: 3990,
    image: productImages.p2, unit: '1 кг',
    composition: 'Сиыр етінің ұмбет бөлігі',
    allergens: [], expiryDays: 4, inStock: true,
    nutrition: { calories: 250, protein: 26, fat: 15, carbs: 0 },
  },
  {
    id: 'p3', name: 'Сүт 2.5%', categoryId: 'dairy', price: 690,
    image: productImages.p3, unit: '1 л',
    composition: 'Сиыр сүті, нормалданған',
    allergens: ['лактоза'], expiryDays: 7, inStock: true,
    nutrition: { calories: 52, protein: 2.8, fat: 2.5, carbs: 4.7 },
  },
  {
    id: 'p4', name: 'Ірімшік 45%', categoryId: 'dairy', price: 1890, oldPrice: 2190,
    image: productImages.p4, unit: '300 г',
    composition: 'Сүт, ашытқы, тұз, кальций хлориді',
    allergens: ['лактоза'], expiryDays: 30, inStock: true,
    nutrition: { calories: 350, protein: 25, fat: 27, carbs: 0 },
  },
  {
    id: 'p5', name: 'Алма (Голден)', categoryId: 'fruits', price: 890,
    image: productImages.p5, unit: '1 кг',
    composition: 'Алма, табиғи жеміс',
    allergens: [], expiryDays: 14, inStock: true,
    nutrition: { calories: 52, protein: 0.3, fat: 0.2, carbs: 14 },
  },
  {
    id: 'p6', name: 'Нан (ақ бөлке)', categoryId: 'bread', price: 290,
    image: productImages.p6, unit: '1 дана',
    composition: 'Бидай ұны, су, ашытқы, тұз, қант',
    allergens: ['глютен'], expiryDays: 3, inStock: true,
    nutrition: { calories: 265, protein: 9, fat: 3.2, carbs: 49 },
  },
  {
    id: 'p7', name: 'Шоколад (сүтті)', categoryId: 'sweets', price: 590,
    image: productImages.p7, unit: '100 г',
    composition: 'Какао-масса, қант, сүт ұнтағы, какао-май, лецитин (соя)',
    allergens: ['лактоза', 'соя'], expiryDays: 180, inStock: true,
    nutrition: { calories: 535, protein: 7, fat: 30, carbs: 59 },
  },
  {
    id: 'p8', name: 'Макарон (спагетти)', categoryId: 'grains', price: 490,
    image: productImages.p8, unit: '500 г',
    composition: 'Бидай ұны, жұмыртқа, су',
    allergens: ['глютен', 'жұмыртқа'], expiryDays: 365, inStock: true,
    nutrition: { calories: 350, protein: 12, fat: 1.5, carbs: 72 },
  },
  {
    id: 'p9', name: 'Апельсін шырыны', categoryId: 'drinks', price: 890,
    image: productImages.p9, unit: '1 л',
    composition: 'Апельсін шырыны (қалпына келтірілген), қант, су, лимон қышқылы',
    allergens: [], expiryDays: 90, inStock: true,
    nutrition: { calories: 45, protein: 0.7, fat: 0.2, carbs: 10 },
  },
  {
    id: 'p10', name: 'Жаңғақ (грек)', categoryId: 'fruits', price: 2990,
    image: productImages.p10, unit: '500 г',
    composition: 'Грек жаңғағы, табиғи өнім',
    allergens: ['жаңғақ'], expiryDays: 180, inStock: true,
    nutrition: { calories: 654, protein: 15, fat: 65, carbs: 14 },
  },
  {
    id: 'p11', name: 'Тауық жұмыртқасы', categoryId: 'dairy', price: 690,
    image: productImages.p11, unit: '10 дана',
    composition: 'Тауық жұмыртқасы, 1 категория',
    allergens: ['жұмыртқа'], expiryDays: 25, inStock: true,
    nutrition: { calories: 155, protein: 13, fat: 11, carbs: 1.1 },
  },
  {
    id: 'p12', name: 'Пельмені (үй)', categoryId: 'frozen', price: 1590,
    image: productImages.p12, unit: '1 кг',
    composition: 'Бидай ұны, сиыр еті, пияз, тұз, бұрыш, су, жұмыртқа',
    allergens: ['глютен', 'жұмыртқа'], expiryDays: 90, inStock: true,
    nutrition: { calories: 275, protein: 12, fat: 14, carbs: 25 },
  },
];

export const bundleSets: BundleSet[] = [
  {
    id: 'b1', name: '15 000 ₸ отбасылық жинақ',
    description: 'Бір аптаға жеткілікті негізгі азық-түлік жинағы. Ет, сүт, нан, көкөніс — барлығы бар!',
    price: 15000, oldPrice: 18500,
    allergenFree: false, image: bundleImages.b1,
    products: [
      { productId: 'p1', quantity: 2 }, { productId: 'p3', quantity: 3 },
      { productId: 'p5', quantity: 2 }, { productId: 'p6', quantity: 4 },
      { productId: 'p11', quantity: 1 },
    ],
  },
  {
    id: 'b2', name: '10 000 ₸ студенттік жинақ',
    description: 'Студенттерге арналған үнемді жинақ. Тез әзірленетін тағамдар.',
    price: 10000, oldPrice: 12800,
    allergenFree: false, image: bundleImages.b2,
    products: [
      { productId: 'p8', quantity: 3 }, { productId: 'p6', quantity: 3 },
      { productId: 'p3', quantity: 2 }, { productId: 'p12', quantity: 1 },
      { productId: 'p9', quantity: 2 },
    ],
  },
  {
    id: 'b3', name: '20 000 ₸ салауатты жинақ',
    description: 'Салауатты тамақтану жинағы — аллергенсіз өнімдер.',
    price: 20000, oldPrice: 25000,
    allergenFree: true, image: bundleImages.b3,
    products: [
      { productId: 'p1', quantity: 3 }, { productId: 'p2', quantity: 1 },
      { productId: 'p5', quantity: 3 }, { productId: 'p9', quantity: 3 },
    ],
  },
];
