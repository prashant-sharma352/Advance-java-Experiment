export type ScreenId =
  | 'explore'
  | 'deals'
  | 'compare'
  | 'product-detail'
  | 'wishlist'
  | 'cart'
  | 'checkout'
  | 'orders'
  | 'account'
  | 'auth';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'smartphones' | 'laptops';
  price: number;
  originalPrice: number;
  discountPercent?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  badgeType?: 'staff-pick' | 'discount' | 'value' | 'feature';
  specs: string[];
  description?: string;
  inStock: boolean;
  stockText?: string;
  labScore: number;
  freeDelivery?: boolean;
}

export interface ComparisonSpec {
  category: string;
  specs: {
    title: string;
    subtext?: string;
    contenderA: {
      value: string;
      subValue?: string;
      isWinner?: boolean;
      score?: number;
    };
    contenderB: {
      value: string;
      subValue?: string;
      isWinner?: boolean;
      score?: number;
    };
    highlightDiff?: boolean;
  }[];
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'In Transit' | 'Delivered' | 'Cancelled';
  awb?: string;
  carrier?: string;
  deliveryEstimate?: string;
  items: {
    product: Product;
    quantity: number;
    color: string;
    storage: string;
    price: number;
  }[];
  totalPrice: number;
  trackingSteps?: {
    title: string;
    desc: string;
    date: string;
    completed: boolean;
    current?: boolean;
  }[];
  courierDetails?: {
    name: string;
    phone: string;
    otp: string;
  };
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatarText: string;
  tier: string;
  ordersCount: number;
  savedDevicesCount: number;
  credits: number;
  isLoggedIn: boolean;
  addresses: {
    id: string;
    tag: string;
    recipient: string;
    addressLine: string;
    city: string;
    pincode: string;
    phone: string;
    isDefault: boolean;
  }[];
}
