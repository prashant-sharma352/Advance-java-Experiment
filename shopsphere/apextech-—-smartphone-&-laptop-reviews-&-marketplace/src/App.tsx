import React, { useState } from 'react';
import { ScreenId, Product, CartItem, Order, UserProfile } from './types';
import { PRODUCTS, INITIAL_ORDERS, INITIAL_USER } from './data/mockData';
import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar } from './components/BottomNavBar';
import { NavigationDrawer } from './components/NavigationDrawer';
import { Footer } from './components/Footer';
import {
  TrackCourierModal,
  PriceAlertModal,
  ComparisonExportModal,
  SupportChatModal,
} from './components/Modals';

// Screens
import { ExploreScreen } from './screens/ExploreScreen';
import { DealsScreen } from './screens/DealsScreen';
import { CompareScreen } from './screens/CompareScreen';
import { ProductDetailScreen } from './screens/ProductDetailScreen';
import { WishlistScreen } from './screens/WishlistScreen';
import { CartScreen } from './screens/CartScreen';
import { CheckoutScreen } from './screens/CheckoutScreen';
import { OrdersScreen } from './screens/OrdersScreen';
import { AccountScreen } from './screens/AccountScreen';
import { AuthScreen } from './screens/AuthScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('explore');
  const [selectedProductId, setSelectedProductId] = useState<string>('s25-ultra');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Cart State (Preloaded with the 2 items from design)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-1',
      productId: 's25-ultra',
      product: PRODUCTS['s25-ultra'],
      quantity: 1,
      selectedColor: 'Phantom Titanium',
      selectedStorage: '256GB Storage',
    },
    {
      id: 'cart-2',
      productId: 'macbook-air-m3',
      product: PRODUCTS['macbook-air-m3'],
      quantity: 1,
      selectedColor: 'Midnight',
      selectedStorage: '16GB / 512GB',
    },
  ]);

  // Wishlist State (3 initial items)
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(
    new Set(['s25-ultra', 'macbook-air-m3', 'asus-rog-g16'])
  );

  // Promo Code State (Preloaded with TECHBONUS5K)
  const [appliedPromo, setAppliedPromo] = useState<string | null>('TECHBONUS5K');

  // Orders State
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  // User State
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);

  // Modals state
  const [liveTrackModal, setLiveTrackModal] = useState<{
    isOpen: boolean;
    orderId: string;
    awb: string;
  }>({
    isOpen: false,
    orderId: '#APX-98241',
    awb: 'BD-849103829IN',
  });

  const [priceAlertModal, setPriceAlertModal] = useState<{
    isOpen: boolean;
    productName: string;
    currentPrice: number;
  }>({
    isOpen: false,
    productName: 'Samsung Galaxy S25 Ultra',
    currentPrice: 124999,
  });

  const [isPdfExportOpen, setIsPdfExportOpen] = useState(false);
  const [isSupportChatOpen, setIsSupportChatOpen] = useState(false);

  // Toast Banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Handlers
  const handleNavigate = (screen: ScreenId) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentScreen('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
        showToast(`Removed ${product.name} from Wishlist`);
      } else {
        next.add(product.id);
        showToast(`Added ${product.name} to Wishlist`);
      }
      return next;
    });
  };

  const handleAddToCart = (
    product: Product,
    options?: { color?: string; storage?: string }
  ) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}`,
          productId: product.id,
          product,
          quantity: 1,
          selectedColor: options?.color || 'Phantom Titanium',
          selectedStorage: options?.storage || '256GB Storage',
        },
      ];
    });
    showToast(`Added ${product.name} to Shopping Cart`);
  };

  const handleBuyNow = (
    product: Product,
    options?: { color?: string; storage?: string }
  ) => {
    handleAddToCart(product, options);
    setCurrentScreen('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from Cart');
  };

  const handleApplyPromo = (code: string) => {
    if (code === 'TECHBONUS5K' || code === 'APEXPRO' || code === 'STUDENT10') {
      setAppliedPromo(code);
      showToast(`Promo Code ${code} applied: ₹5,000 instant discount!`);
      return true;
    }
    return false;
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    showToast('Promo code removed');
  };

  const handlePaymentSuccess = () => {
    // Generate new order
    const newOrderId = `#APX-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      id: newOrderId,
      date: 'Today, Just Now',
      status: 'In Transit',
      awb: `BD-${Math.floor(100000000 + Math.random() * 900000000)}IN`,
      carrier: 'BlueDart Express Air Priority',
      deliveryEstimate: 'Tomorrow by 2:00 PM',
      items: cartItems.map((ci) => ({
        product: ci.product,
        quantity: ci.quantity,
        color: ci.selectedColor || 'Phantom Titanium',
        storage: ci.selectedStorage || '256GB',
        price: ci.product.price,
      })),
      totalPrice: cartItems.reduce((acc, ci) => acc + ci.product.price * ci.quantity, 0) - 20000,
      trackingSteps: [
        {
          title: 'Order Confirmed',
          desc: 'Payment captured via Instant UPI. Serial numbers allocated.',
          date: 'Just now',
          completed: true,
        },
        {
          title: 'Packed & Awaiting Hub Dispatch',
          desc: 'Tamper-evident holographic seal attached at ApexTech Bengaluru hub.',
          date: 'Processing',
          completed: false,
          current: true,
        },
        {
          title: 'Out for Delivery',
          desc: 'Courier executive assigned.',
          date: 'Tomorrow morning',
          completed: false,
        },
        {
          title: 'Delivered',
          desc: 'OTP verified signature required.',
          date: 'Tomorrow by 2:00 PM',
          completed: false,
        },
      ],
      courierDetails: {
        name: 'BlueDart Air Courier',
        phone: '+91 98*** 41029',
        otp: '9182',
      },
    };

    setOrders([newOrder, ...orders]);
    setCartItems([]);
    showToast(`Order ${newOrderId} placed successfully!`);
    setCurrentScreen('orders');
  };

  const handleLoginSuccess = (name: string, email: string) => {
    setUser((prev) => ({
      ...prev,
      name,
      email,
      isLoggedIn: true,
    }));
    showToast(`Welcome back, ${name}!`);
    setCurrentScreen('account');
  };

  const handleLogout = () => {
    setUser((prev) => ({
      ...prev,
      isLoggedIn: false,
    }));
    showToast('Signed out of session');
    setCurrentScreen('auth');
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8ff] text-[#131b2e] antialiased">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#131b2e] text-white px-4 py-2 rounded-full shadow-lg text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200 border border-slate-700">
          <span className="material-symbols-outlined text-[16px] text-[#7ffc97]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Application Bar */}
      <TopAppBar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        wishlistCount={wishlistIds.size}
        cartCount={totalCartCount}
        onToggleDrawer={() => setIsDrawerOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onPerformSearch={(term) => {
          setSearchQuery(term);
          setCurrentScreen('explore');
        }}
      />

      {/* Slide-over Navigation Drawer */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onNavigate={(screen) => {
          setIsDrawerOpen(false);
          handleNavigate(screen);
        }}
      />

      {/* Dynamic Screen View Router */}
      <div className="flex-1">
        {currentScreen === 'explore' && (
          <ExploreScreen
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            onAddToCart={(p) => handleAddToCart(p)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {currentScreen === 'deals' && (
          <DealsScreen
            onNavigate={handleNavigate}
            onAddToCart={(p) => handleAddToCart(p)}
            onOpenPriceAlert={(productName, price) => {
              setPriceAlertModal({
                isOpen: true,
                productName,
                currentPrice: price,
              });
            }}
            cartCount={totalCartCount}
          />
        )}

        {currentScreen === 'compare' && (
          <CompareScreen
            onNavigate={handleNavigate}
            onAddToCart={(p) => handleAddToCart(p)}
            onOpenPdfExport={() => setIsPdfExportOpen(true)}
          />
        )}

        {currentScreen === 'product-detail' && (
          <ProductDetailScreen
            productId={selectedProductId}
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlistIds.has(selectedProductId)}
          />
        )}

        {currentScreen === 'wishlist' && (
          <WishlistScreen
            onNavigate={handleNavigate}
            onAddToCart={(p) => handleAddToCart(p)}
            cartCount={totalCartCount}
          />
        )}

        {currentScreen === 'cart' && (
          <CartScreen
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveFromCart}
            onNavigate={handleNavigate}
            appliedPromo={appliedPromo}
            onApplyPromo={handleApplyPromo}
            onRemovePromo={handleRemovePromo}
          />
        )}

        {currentScreen === 'checkout' && (
          <CheckoutScreen
            cartItems={cartItems}
            user={user}
            onNavigate={handleNavigate}
            onPaymentSuccess={handlePaymentSuccess}
            appliedPromo={appliedPromo}
          />
        )}

        {currentScreen === 'orders' && (
          <OrdersScreen
            orders={orders}
            onNavigate={handleNavigate}
            onAddToCart={(p) => handleAddToCart(p)}
            onOpenLiveTrack={(orderId, awb) => {
              setLiveTrackModal({
                isOpen: true,
                orderId,
                awb,
              });
            }}
          />
        )}

        {currentScreen === 'account' && (
          <AccountScreen
            user={user}
            onNavigate={handleNavigate}
            onOpenSupport={() => setIsSupportChatOpen(true)}
            onLogout={handleLogout}
          />
        )}

        {currentScreen === 'auth' && (
          <AuthScreen
            onNavigate={handleNavigate}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
      </div>

      {/* Global Interactive Modals */}
      <TrackCourierModal
        isOpen={liveTrackModal.isOpen}
        onClose={() => setLiveTrackModal((prev) => ({ ...prev, isOpen: false }))}
        orderId={liveTrackModal.orderId}
        awb={liveTrackModal.awb}
      />

      <PriceAlertModal
        isOpen={priceAlertModal.isOpen}
        onClose={() => setPriceAlertModal((prev) => ({ ...prev, isOpen: false }))}
        productName={priceAlertModal.productName}
        currentPrice={priceAlertModal.currentPrice}
      />

      <ComparisonExportModal
        isOpen={isPdfExportOpen}
        onClose={() => setIsPdfExportOpen(false)}
      />

      <SupportChatModal
        isOpen={isSupportChatOpen}
        onClose={() => setIsSupportChatOpen(false)}
      />

      {/* Footer on non-transactional screens */}
      {currentScreen !== 'checkout' && (
        <Footer onNavigate={handleNavigate} />
      )}

      {/* Bottom Navigation Dock on Mobile */}
      <BottomNavBar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        compareCount={2}
        wishlistCount={wishlistIds.size}
      />
    </div>
  );
}
