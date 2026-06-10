import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';
import { useData } from '../../context/DataContext.jsx';

const navItems = [
  { label: 'Home', to: '/', end: true },
  { label: 'About', to: '/#about', anchor: true },
  { label: 'Menu', to: '/menu' },
  { label: 'Shop', to: '/produk' },
  { label: 'Journal', to: '/artikel' },
  { label: 'Contact', to: '/#contact', anchor: true },
];

const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 7h12l-1.2 11.4a2 2 0 0 1-2 1.6H9.2a2 2 0 0 1-2-1.6L6 7Z" />
    <path d="M9 7V5a3 3 0 0 1 6 0v2" />
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount, isAdmin, logout } = useData();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const renderLink = (item, onClick) => {
    const className = ({ isActive }) =>
      `${styles.link} ${isActive ? styles.linkActive : ''}`;

    if (item.anchor) {
      return (
        <Link
          key={item.label}
          to={item.to}
          className={styles.link}
          onClick={onClick}
        >
          {item.label}
        </Link>
      );
    }

    return (
      <NavLink
        key={item.label}
        to={item.to}
        end={item.end}
        className={className}
        onClick={onClick}
      >
        {item.label}
      </NavLink>
    );
  };

  return (
    <>
      <motion.header
        className={styles.nav}
        initial={false}
        animate={{
          backgroundColor: scrolled ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className={`container ${styles.inner}`}>
          <Link to="/" className={styles.logo}>SQL.</Link>

          <nav className={styles.desktopNav} aria-label="Primary">
            {navItems.map((item) => renderLink(item))}
          </nav>

          <div className={styles.right}>
            {isAdmin ? (
              <button
                type="button"
                className={styles.authBtn}
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className={styles.authBtn}>
                Login
              </Link>
            )}

            <Link
              to="/keranjang"
              className={styles.cartBtn}
              aria-label={`Cart (${cartCount} items)`}
            >
              <CartIcon />
              {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
            </Link>

            <button
              className={styles.hamburger}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`} />
              <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`} />
              <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ''}`} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <nav className={styles.mobileNav} aria-label="Mobile">
              {navItems.map((item) =>
                renderLink(item, () => setMenuOpen(false))
              )}
              {isAdmin ? (
                <button
                  type="button"
                  className={styles.mobileAuthBtn}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className={styles.mobileAuthBtn}
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
