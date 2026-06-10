import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25h6.828l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
  </svg>
);

const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.84a8.16 8.16 0 0 0 4.77 1.52V6.94a4.85 4.85 0 0 1-1.84-.25Z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.grid}>
          {/* Col 1: Brand */}
          <div className={styles.col}>
            <Link to="/" className={styles.logo}>SQL.</Link>
            <p className={styles.tagline}>Good coffee, clear taste.</p>
            <div className={styles.socials}>
              <a href="#" aria-label="Instagram" className={styles.social}>
                <InstagramIcon />
              </a>
              <a href="#" aria-label="X" className={styles.social}>
                <XIcon />
              </a>
              <a href="#" aria-label="TikTok" className={styles.social}>
                <TikTokIcon />
              </a>
            </div>
          </div>

          {/* Col 2: Links */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Explore</h4>
            <ul className={styles.list}>
              <li><Link to="/#about">About</Link></li>
              <li><Link to="/#menu">Menu</Link></li>
              <li><Link to="/produk">Shop</Link></li>
              <li><Link to="/artikel">Journal</Link></li>
              <li><Link to="/#contact">Contact</Link></li>
            </ul>
          </div>

          {/* Col 3: Shop */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Shop</h4>
            <ul className={styles.list}>
              <li><a href="#">Beans</a></li>
              <li><a href="#">Brewing Tools</a></li>
              <li><a href="#">Merchandise</a></li>
              <li><a href="#">Gift Card</a></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Stay in the Loop</h4>
            <p className={styles.newsletterText}>
              Quiet updates. New beans, new journal entries, no noise.
            </p>
            <form className={styles.form} onSubmit={onSubmit}>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
              <button type="submit" className={styles.submit} aria-label="Subscribe">
                <ArrowRightIcon />
              </button>
            </form>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© 2024 SQL Coffee. All rights reserved.</p>
          <p className={styles.identity}>Speciality · Quality · Low Profile</p>
        </div>
      </div>
    </footer>
  );
}
