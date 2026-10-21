import { Product, Order, UserProfile } from '../types';

export const PRODUCTS: Record<string, Product> = {
  's25-ultra': {
    id: 's25-ultra',
    name: 'Samsung Galaxy S25 Ultra',
    brand: 'Samsung',
    category: 'smartphones',
    price: 124999,
    originalPrice: 134999,
    discountPercent: 7,
    rating: 4.8,
    reviewsCount: 2410,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMchmRgfFN5WqrQu-ruevX_GY_AKen994nF2l6pgCwFzwwkX37cZrjYhJWdA3AcNS1qB7lAWscAtu6CLjEu40aLeQd7ij5zI7KQTGAoXcSzMb1EoK5lKnlb5IG0oTL9ar7CLYi6VKiK4xJOohk9UjKeduyxacPQd8qFZe6vhOt187l4tedEZke3MRW21CUvkJqYr84WUnk89IMJ-PN5m7LFTNWUbnvVts-UqpMbtf1DjgED6YetaLY_w',
    badge: '7% OFF',
    badgeType: 'discount',
    specs: [
      '6.8" Dyn AMOLED 2X',
      'SD 8 Elite',
      '200MP Quad',
      '5000mAh 45W'
    ],
    description: 'Phantom Titanium · 12GB RAM · 256GB Storage · AI Pro Vision. Snapdragon 8 Elite yields exceptional sustained frame rates in AAA mobile titles.',
    inStock: true,
    stockText: 'In Stock - Express Delivery',
    labScore: 9.4,
    freeDelivery: true
  },
  'macbook-air-m3': {
    id: 'macbook-air-m3',
    name: 'Apple MacBook Air M3 (15")',
    brand: 'Apple',
    category: 'laptops',
    price: 129900,
    originalPrice: 134000,
    discountPercent: 3,
    rating: 4.9,
    reviewsCount: 1840,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJIoUDXcd4oJ4IFXEoGf6qlylsjyaw-R7AV2fVmb9hgDJWErgLRUhxXa2Iv0tiIQMiNpl5lGzLmeFADTrzFkHXcdkz-yxtf3O5_iaX4D6L74C8DUAIpwxMgcBnm_Re7zF1fFKSAsI_bAXEJ8KObf5tSYFS5AD9vdKCl2Sacep_v-QTsMyftw80GT5aZxV6iS23O-u2sJzD12_hfS-qW8Oodbz1lChZL-EaJQE4rsdWym_yiUOxCIPseg',
    badge: 'Staff Pick',
    badgeType: 'staff-pick',
    specs: [
      'Apple M3 chip',
      '16GB Unified RAM',
      '512GB SSD',
      '18h Battery',
      '1.51 kg'
    ],
    description: 'Midnight · 16GB Unified RAM · 512GB SSD · Liquid Retina Display with Apple Care eligibility.',
    inStock: true,
    stockText: 'In Stock',
    labScore: 9.3,
    freeDelivery: true
  },
  'oneplus-nord-4': {
    id: 'oneplus-nord-4',
    name: 'OnePlus Nord 4 5G',
    brand: 'OnePlus',
    category: 'smartphones',
    price: 29999,
    originalPrice: 32999,
    discountPercent: 9,
    rating: 4.5,
    reviewsCount: 5120,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpn2Cq4jAoIXhEc7byf1B-_ZAQB-cybH7oomI091LnRPRpTs4MkV_Hn7SempRQX7od5eSyz_ZpudooyRcNUbejTN4Jo0fpCimmq_JC3cc61T-9DFJn-evaY3AwW2-fPhjFYA-UkZ4pUukm-5ri8MDAINmajFNNPAmxFXLJXdCOk7H002Q-t5NGStsaWM83sECS9pQXwC0bZt2P5-otCy4LeESigkh8RIl1ExD9YRj-xsle7lWwa3TsVQ',
    badge: 'Best Value Under ₹30k',
    badgeType: 'value',
    specs: [
      'SD 7+ Gen 3',
      '5500 mAh',
      '100W SuperVOOC',
      '120Hz OLED'
    ],
    description: 'Metallic unibody sleek 5G smartphone with flagship Snapdragon 7+ Gen 3 and all-day 5500mAh cell.',
    inStock: true,
    stockText: 'In Stock',
    labScore: 8.8,
    freeDelivery: true
  },
  'asus-rog-g16': {
    id: 'asus-rog-g16',
    name: 'ASUS ROG Zephyrus G16',
    brand: 'ASUS',
    category: 'laptops',
    price: 169990,
    originalPrice: 179990,
    discountPercent: 6,
    rating: 4.7,
    reviewsCount: 890,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaYEQPmU-aovu-UucPJ2Ia7kZcX4ckNaCxXoRK8RnARq4vVd2KPEIACG2IbBUIoSR6-av4mrFmgItxFA4z_WO-P5y_eMWLZyGmXFD81W5LYcDEfsbJa4rpQGy8BAN8p-TKIPQrTmDjM8TGJQ9D09DuSH-YcCx8bCQ4Nsb8VHg0KXWSFMjcfc5GtqgQtr_fkSw-8dU-ddsye4-fDvc6i5MeLxDw7cg0bNCHLC3zSDoXO7U-rVunJLB0uQ',
    badge: 'RTX 4070',
    badgeType: 'feature',
    specs: [
      'Intel Core Ultra 9',
      'RTX 4070 8GB',
      'OLED 240Hz',
      '32GB RAM'
    ],
    description: 'Intel Core Ultra 9 · RTX 4070 · 240Hz OLED · CNC aluminum stealth construction.',
    inStock: false,
    stockText: 'Replenishing inventory expected in 4 days',
    labScore: 9.1,
    freeDelivery: true
  },
  'iphone-16-pro-max': {
    id: 'iphone-16-pro-max',
    name: 'Apple iPhone 16 Pro Max',
    brand: 'Apple',
    category: 'smartphones',
    price: 134900,
    originalPrice: 139900,
    discountPercent: 4,
    rating: 4.8,
    reviewsCount: 2108,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDO6Rlhxn58jVtdVCJtGx3u77ym6wMlu5mM8F4R2QoDY6tWh8rRpF5IrUxwNMRlqGBbaYBd-9GEc9aUBVwY4QUsAXlm5bi0BPSIe0lortPoZ23fpC43Zfx6VKBKf8KQdWpF4Ca4iVhIJeQAMA4EUPYH-YBXzj1wzKcakvlIEEeGfcMHJLtEiAim_4FROla9FfYoRzWTeLAsF3yuzh5_2kAZnWGpM-faqfdDuK2gldvtY_L_AcumFPdUpg',
    badge: 'Pro Video King',
    badgeType: 'feature',
    specs: [
      'Apple A18 Pro',
      '6.9" Super Retina XDR',
      '5x Tetraprism Zoom',
      'ProRes 4K 120fps'
    ],
    description: 'Titanium chassis, Apple A18 Pro 3nm silicon, 5x optical tetraprism camera, and best-in-class video workflows.',
    inStock: true,
    stockText: 'In Stock',
    labScore: 9.3,
    freeDelivery: true
  },
  'dell-xps-13-plus': {
    id: 'dell-xps-13-plus',
    name: 'Dell XPS 13 Plus',
    brand: 'Dell',
    category: 'laptops',
    price: 114990,
    originalPrice: 126990,
    discountPercent: 9,
    rating: 4.6,
    reviewsCount: 740,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLdzAVnXJBBI6OQDMJ02RNyTwnPAlsBS3db2vtk4s5xoRrW19dmHPtkI0vd2Xu6DYI0zA1T4EYhucvKtZe9nEsdRSkZGnC-AeFyVuI0746QjNPjxcyEehd3c39QWXRZymdSuc5Gvfdfm43jU0SIhfnqHNGBFR0JCXPP9yBMY300DWRiN0-OErQ-5iB-wGPUMhQblWp9YGPM49Jzg8_Qww5P29AhP6JNnTgnEX9sFkyuVlHxgitQ1auSw',
    badge: 'Save ₹12,000',
    badgeType: 'discount',
    specs: [
      'Intel Core i7 13th Gen',
      '16GB LPDDR5',
      '1TB NVMe SSD',
      '3.5K OLED Touch'
    ],
    description: 'Obsidian black ultra-thin laptop with invisible haptic trackpad and edge-to-edge keyboard.',
    inStock: true,
    stockText: 'In Stock',
    labScore: 8.9,
    freeDelivery: true
  },
  'pixel-9': {
    id: 'pixel-9',
    name: 'Google Pixel 9 (128GB)',
    brand: 'Google',
    category: 'smartphones',
    price: 57999,
    originalPrice: 79999,
    discountPercent: 28,
    rating: 4.6,
    reviewsCount: 1230,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtKXeiSR0Tu0OXAutmLvAKhOgWInXyp2sZiRgxQUXojoebdpYageEpg_-P2n4xV3kywBZL2x2U6-d_eRv_dlfBsGc1kgcQjRHOWoysmJt4V6RU086qHXlFBbeN77vS_UDYw2G07FS7lLwrm415lMQq7wTGZJgZRiPhqlKkAaKpxy6ASTL_t9hvw8WTDlJrbXEo2l-H5iB8n9_O6LoHHx6wQu6K4gv2UTkcmB-Dcy2PgNPcKZBrm3NOsQ',
    badge: '28% OFF',
    badgeType: 'discount',
    specs: [
      'Google Tensor G4',
      '50MP Dual Camera',
      '120Hz Actua OLED',
      '7 Years OS Updates'
    ],
    description: 'Olive Green Android flagship with pure Pixel Camera AI and Gemini Nano integration.',
    inStock: true,
    stockText: 'In Stock',
    labScore: 9.0,
    freeDelivery: true
  },
  'ipad-air-m2': {
    id: 'ipad-air-m2',
    name: 'iPad Air M2 (11")',
    brand: 'Apple',
    category: 'laptops',
    price: 48900,
    originalPrice: 59900,
    discountPercent: 18,
    rating: 4.7,
    reviewsCount: 890,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxoy37ipq2hlUfmJZZYKe4MigqSF-NOniup6sTo4u5Lz7-0a8lPBPA_f3JnsEv-Np-gxkh_IyLzrzQwW7eWO3dRSYb4OZb6n94vLR5pykFLN2-QXNw8EWV7khJvv4fcMAPli9eMFFGvQ9IzFMkCXAFseY07CYGm2dhcvqF_CO4tEPmvWHe5UwmykHesthZ9XCYr3TRNzzuqpI9UuJDRiz_SwFkQl8Iva8kyzCGglUgyPGOS-JGNr77HA',
    badge: '18% OFF',
    badgeType: 'discount',
    specs: [
      'Apple M2 chip',
      '11" Liquid Retina',
      'Apple Pencil Pro support',
      'Landscape 12MP Camera'
    ],
    description: 'Dark space gray high-power tablet with M2 chip speed and pencil hover gestures.',
    inStock: true,
    stockText: 'In Stock',
    labScore: 9.2,
    freeDelivery: true
  },
  's24-fe': {
    id: 's24-fe',
    name: 'Samsung Galaxy S24 FE',
    brand: 'Samsung',
    category: 'smartphones',
    price: 42999,
    originalPrice: 59999,
    discountPercent: 28,
    rating: 4.7,
    reviewsCount: 1650,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1gKFEA-eNQ8JdHQZKtKhkblcD9HnBYNheVDG7H9sNxlDnlLuUPJlBR924QFfirLSBgFtjHmY80dBVf9FncFuusjv-tXTyZSV_zkrHDVJb65YvkJ-wqrAIuk8soPo4Jqd7PAHmt9te2V9ftA7_FkKJVBlBea7fsy-JDhygRhIiWbjm9xR8e2biTbYQKZm4LR8qkiglTl81GIKY8rc97QyDr_o4ZGyqhGXHGU9wRXU5JveY0e7JR-mLWw',
    badge: '28% OFF',
    badgeType: 'discount',
    specs: [
      'Exynos 2400e',
      '8GB RAM · 256GB',
      'Galaxy AI Features',
      '4700mAh Battery'
    ],
    description: '8GB RAM • 256GB • Mint Green. 78% Claimed in today\'s Lightning drop.',
    inStock: true,
    stockText: 'Only 9 left',
    labScore: 8.7,
    freeDelivery: true
  },
  'macbook-air-m2': {
    id: 'macbook-air-m2',
    name: 'Apple MacBook Air M2',
    brand: 'Apple',
    category: 'laptops',
    price: 81990,
    originalPrice: 99900,
    discountPercent: 18,
    rating: 4.9,
    reviewsCount: 3100,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDxZOljjNq6TKkjBJa-s2gW9QoTu__VmeAcbcSvBRHkMP-zxqNEItL_aKQgpiN7arQDVOq8e60OWRlWflo-nJ8IUqO-SPK5KWrPhO5pok27HCWWf7IlsKgOJaaQCuPWLwbT7e5zWZ1D_KWItcwdYeKGl_K0Hl6C6AUVC2p-YxFeNWbCFxIehmuMC9gDTiMOYKSzSlHe0IunRxx3Nmvprcs3m8QHjPC5HhzOBU-tF3OCW47tHjvYOzCEw',
    badge: '18% OFF',
    badgeType: 'discount',
    specs: [
      'Apple M2 chip (8-core)',
      '8GB Unified Memory',
      '256GB SSD',
      'Liquid Retina 13.6"'
    ],
    description: 'Midnight anodized aluminum unibody, fanless silent operation, MagSafe 3 charging.',
    inStock: true,
    stockText: '14 units left',
    labScore: 9.1,
    freeDelivery: true
  },
  'oneplus-nord-ce4': {
    id: 'oneplus-nord-ce4',
    name: 'OnePlus Nord CE4',
    brand: 'OnePlus',
    category: 'smartphones',
    price: 19999,
    originalPrice: 24999,
    discountPercent: 20,
    rating: 4.5,
    reviewsCount: 2210,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAH7YLycasNESSHq8nIWgPKYGBu9Cn1s5Vf1ejbYzJwlLV0h2txym9QL94mbwHGnZJvWxE0WwuEzG_EYqSe2vkG1US8LiwVouJsbAs1L1Eke4JThBFVv1qI7c9wDcBwGc1_yrQysciYs3nstG4-QhGfMtHfrh1CcHkFDO7OoWxhk-gk84RyKzVPy1MyGbh34Yzs8ycQuSnVYpbqVrsEz6779NPyYrNfDk40SfxMudbqCf0ZAVzDYT-9Uw',
    badge: '20% OFF',
    badgeType: 'discount',
    specs: [
      '100W SUPERVOOC',
      'Snapdragon 7 Gen 3',
      '8GB · 128GB',
      '5500 mAh battery'
    ],
    description: 'Fastest charging phone under ₹20,000 with 100W flash charging and marble texture finish.',
    inStock: true,
    stockText: 'Almost Gone',
    labScore: 8.5,
    freeDelivery: true
  }
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: '#APX-98241',
    date: '18 Oct 2026',
    status: 'In Transit',
    awb: 'BD-849103829IN',
    carrier: 'BlueDart Express Air',
    deliveryEstimate: 'Today by 6:00 PM',
    items: [
      {
        product: PRODUCTS['s25-ultra'],
        quantity: 1,
        color: 'Phantom Titanium',
        storage: '256GB',
        price: 124999
      }
    ],
    totalPrice: 124999,
    courierDetails: {
      name: 'Rajesh Kumar',
      phone: '+91 98*** 41029',
      otp: '7412'
    },
    trackingSteps: [
      {
        title: 'Order Confirmed',
        desc: 'Payment verified via UPI & serial allocated',
        date: 'Oct 18, 10:30 AM',
        completed: true
      },
      {
        title: 'Shipped via BlueDart Express',
        desc: 'Departed Bangalore Central Hub Facility',
        date: 'Oct 19, 04:15 PM',
        completed: true
      },
      {
        title: 'Out for Delivery',
        desc: 'Courier executive assigned with tamper-sealed secure OTP packaging.',
        date: 'Today, 08:30 AM',
        completed: true,
        current: true
      },
      {
        title: 'Delivered',
        desc: 'Physical inspection OTP signature pending at destination',
        date: 'Expected Today by 6:00 PM',
        completed: false
      }
    ]
  },
  {
    id: '#APX-87102',
    date: '12 Sep 2026',
    status: 'Delivered',
    awb: 'DL-72019482IN',
    carrier: 'Delhivery Surface Pro',
    deliveryEstimate: 'Delivered on 12 Sep 2026',
    items: [
      {
        product: PRODUCTS['macbook-air-m3'],
        quantity: 1,
        color: 'Midnight Black',
        storage: '16GB / 512GB',
        price: 129900
      }
    ],
    totalPrice: 129900,
    trackingSteps: [
      {
        title: 'Order Confirmed',
        desc: 'Payment captured securely via HDFC Credit Card',
        date: 'Sep 09, 02:15 PM',
        completed: true
      },
      {
        title: 'Dispatched from Hub',
        desc: 'Departed Mumbai Central Logistics Center',
        date: 'Sep 10, 11:00 AM',
        completed: true
      },
      {
        title: 'Delivered',
        desc: 'Signed by recipient: Rohit Rajput (OTP Verified)',
        date: 'Sep 12, 03:45 PM',
        completed: true
      }
    ]
  }
];

export const INITIAL_USER: UserProfile = {
  name: 'Rohit Rajput',
  email: 'rohit.rajput@techmail.io',
  phone: '+91 98765 43210',
  avatarText: 'RP',
  tier: 'Apex Pro',
  ordersCount: 6,
  savedDevicesCount: 5,
  credits: 4500,
  isLoggedIn: true,
  addresses: [
    {
      id: 'addr-1',
      tag: 'HOME',
      recipient: 'Rohit Rajput',
      addressLine: 'Flat 402, HighTech Heights, Cyber City',
      city: 'Bengaluru, Karnataka',
      pincode: '560100',
      phone: '+91 98765 43210',
      isDefault: true
    },
    {
      id: 'addr-2',
      tag: 'STUDIO LAB',
      recipient: 'Rohit Rajput (ApexTech Lab)',
      addressLine: 'Bay 4, Indiranagar Tech Hub, 100ft Road',
      city: 'Bengaluru, Karnataka',
      pincode: '560038',
      phone: '+91 98765 43210',
      isDefault: false
    }
  ]
};
