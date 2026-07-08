import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  products as seedProducts,
  articles as seedArticles,
  users as seedUsers,
  transactions as seedTransactions,
} from '../data/dummyData';
import { isSanityConfigured, fetchArticles } from '../lib/sanity';

const DataContext = createContext(null);

const STORAGE_KEYS = {
  products: 'sql_products',
  articles: 'sql_articles',
  users: 'sql_users',
  transactions: 'sql_transactions',
  cart: 'sql_cart',
};

// Bump this whenever the seed data shape changes so old cached data in
// localStorage is dropped automatically (otherwise stale data hides new items).
const STORAGE_VERSION = '5';
try {
  if (localStorage.getItem('sql_version') !== STORAGE_VERSION) {
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
    localStorage.setItem('sql_version', STORAGE_VERSION);
  }
} catch {
  /* localStorage unavailable — ignore */
}

const DEFAULT_PRODUCT_IMAGE =
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&h=600&q=80';
const DEFAULT_ARTICLE_IMAGE =
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&h=500&q=80';

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const nextId = (list) => list.reduce((max, item) => Math.max(max, item.id), 0) + 1;

export function DataProvider({ children }) {
  const [products, setProducts] = useState(() =>
    load(STORAGE_KEYS.products, seedProducts)
  );
  const [articles, setArticles] = useState(() =>
    load(STORAGE_KEYS.articles, seedArticles)
  );
  const [users, setUsers] = useState(() => load(STORAGE_KEYS.users, seedUsers));
  const [transactions, setTransactions] = useState(() =>
    load(STORAGE_KEYS.transactions, seedTransactions)
  );
  const [cart, setCart] = useState(() => load(STORAGE_KEYS.cart, []));
  const [isAdmin, setIsAdmin] = useState(
    () => localStorage.getItem('isAdmin') === 'true'
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products));
  }, [products]);
  useEffect(() => {
    // When Sanity is the source of truth, don't cache it to localStorage.
    if (!isSanityConfigured) {
      localStorage.setItem(STORAGE_KEYS.articles, JSON.stringify(articles));
    }
  }, [articles]);

  // Load articles from the Sanity CMS when configured (.env). Falls back to
  // local dummyData if Sanity isn't set up or the request fails.
  useEffect(() => {
    let active = true;
    if (isSanityConfigured) {
      fetchArticles().then((data) => {
        if (active && data && data.length > 0) {
          setArticles(data);
        }
      });
    }
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
  }, [users]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.transactions, JSON.stringify(transactions));
  }, [transactions]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
  }, [cart]);

  /* ---------- Products CRUD ---------- */
  const addProduct = (data) =>
    setProducts((prev) => [
      {
        id: nextId(prev),
        name: data.name,
        description: data.description ?? '',
        price: Number(data.price) || 0,
        category: data.category,
        type: data.type || 'drink',
        image: data.image || DEFAULT_PRODUCT_IMAGE,
      },
      ...prev,
    ]);

  const updateProduct = (id, data) =>
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, ...data, price: Number(data.price) || 0 } : p
      )
    );

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  /* ---------- Articles CRUD ---------- */
  const addArticle = (data) =>
    setArticles((prev) => [
      {
        id: nextId(prev),
        title: data.title,
        excerpt: data.excerpt ?? '',
        content: data.content ?? '',
        category: data.category,
        date: new Date().toISOString().slice(0, 10),
        image: data.image || DEFAULT_ARTICLE_IMAGE,
      },
      ...prev,
    ]);

  const updateArticle = (id, data) =>
    setArticles((prev) => prev.map((a) => (a.id === id ? { ...a, ...data } : a)));

  const deleteArticle = (id) =>
    setArticles((prev) => prev.filter((a) => a.id !== id));

  /* ---------- Users CRUD ---------- */
  const addUser = (data) =>
    setUsers((prev) => [
      {
        id: nextId(prev),
        name: data.name,
        email: data.email,
        role: data.role || 'user',
        joinDate: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);

  const updateUser = (id, data) =>
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...data } : u)));

  const deleteUser = (id) => setUsers((prev) => prev.filter((u) => u.id !== id));

  /* ---------- Transactions ---------- */
  const updateTransactionStatus = (id, status) =>
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );

  const deleteTransaction = (id) =>
    setTransactions((prev) => prev.filter((t) => t.id !== id));

  /* ---------- Cart ---------- */
  const addToCart = (productId, qty = 1) =>
    setCart((prev) => {
      const existing = prev.find((c) => c.id === productId);
      if (existing) {
        return prev.map((c) =>
          c.id === productId ? { ...c, qty: c.qty + qty } : c
        );
      }
      return [...prev, { id: productId, qty }];
    });

  const increaseQty = (productId) =>
    setCart((prev) =>
      prev.map((c) => (c.id === productId ? { ...c, qty: c.qty + 1 } : c))
    );

  const decreaseQty = (productId) =>
    setCart((prev) =>
      prev
        .map((c) => (c.id === productId ? { ...c, qty: c.qty - 1 } : c))
        .filter((c) => c.qty > 0)
    );

  const removeFromCart = (productId) =>
    setCart((prev) => prev.filter((c) => c.id !== productId));

  const clearCart = () => setCart([]);

  /* ---------- Derived cart data ---------- */
  const cartItems = useMemo(
    () =>
      cart
        .map((c) => {
          const product = products.find((p) => p.id === c.id);
          return product ? { ...product, qty: c.qty } : null;
        })
        .filter(Boolean),
    [cart, products]
  );

  const cartCount = useMemo(
    () => cart.reduce((sum, c) => sum + c.qty, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cartItems]
  );

  /* ---------- Auth ---------- */
  const login = () => {
    localStorage.setItem('isAdmin', 'true');
    setIsAdmin(true);
  };

  const logout = () => {
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
  };

  /* ---------- Reset to seed data ---------- */
  const resetData = () => {
    setProducts(seedProducts);
    setArticles(seedArticles);
    setUsers(seedUsers);
    setTransactions(seedTransactions);
    setCart([]);
  };

  /* ---------- Checkout ---------- */
  const checkout = ({ address = '' } = {}) => {
    if (cartItems.length === 0) return null;
    const newTransaction = {
      id: nextId(transactions),
      userId: 0,
      items: cart.map((c) => ({ productId: c.id, qty: c.qty })),
      total: cartTotal,
      status: 'pending',
      date: new Date().toISOString().slice(0, 10),
      address,
    };
    setTransactions((prev) => [newTransaction, ...prev]);
    setCart([]);
    return newTransaction;
  };

  const value = {
    products,
    articles,
    users,
    transactions,
    cart,
    cartItems,
    cartCount,
    cartTotal,
    addProduct,
    updateProduct,
    deleteProduct,
    addArticle,
    updateArticle,
    deleteArticle,
    addUser,
    updateUser,
    deleteUser,
    updateTransactionStatus,
    deleteTransaction,
    addToCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
    checkout,
    resetData,
    isAdmin,
    login,
    logout,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw new Error('useData must be used within a DataProvider');
  }
  return ctx;
}
