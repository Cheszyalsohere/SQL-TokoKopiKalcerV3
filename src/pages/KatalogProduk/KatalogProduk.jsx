import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './KatalogProduk.module.css';
import { useData } from '../../context/DataContext.jsx';

const formatRupiah = (value) => `Rp ${value.toLocaleString('id-ID')}`;

const titleCase = (s) =>
  s.replace(/\b\w/g, (c) => c.toUpperCase());

const MODES = {
  shop: {
    title: 'SHOP',
    subtitle: 'Beans for your home brew.',
    types: ['bean'],
  },
  menu: {
    title: 'MENU',
    subtitle: 'Coffee drinks & fresh bites.',
    types: ['drink', 'food'],
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.25, ease: 'easeIn' } },
};

export default function KatalogProduk({ mode = 'shop' }) {
  const { products } = useData();
  const config = MODES[mode] ?? MODES.shop;
  const [activeFilter, setActiveFilter] = useState('all');

  const typeItems = useMemo(
    () => products.filter((p) => config.types.includes(p.type)),
    [products, config.types]
  );

  const filters = useMemo(() => {
    const categories = [...new Set(typeItems.map((p) => p.category))];
    return [
      { label: 'All', value: 'all' },
      ...categories.map((c) => ({ label: titleCase(c), value: c })),
    ];
  }, [typeItems]);

  const visibleProducts = useMemo(() => {
    if (activeFilter === 'all') return typeItems;
    return typeItems.filter((p) => p.category === activeFilter);
  }, [activeFilter, typeItems]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <motion.header
          className={styles.header}
          variants={titleVariants}
          initial="hidden"
          animate="show"
        >
          <h1 className={styles.title}>{config.title}</h1>
          <p className={styles.subtitle}>{config.subtitle}</p>
        </motion.header>

        <div className={styles.filterBar} role="tablist" aria-label="Category filter">
          {filters.map((filter) => {
            const isActive = filter.value === activeFilter;
            return (
              <button
                key={filter.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`${styles.filterBtn} ${isActive ? styles.filterBtnActive : ''}`}
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <motion.div
          className={styles.grid}
          variants={gridVariants}
          initial="hidden"
          animate="show"
          key={activeFilter}
        >
          <AnimatePresence mode="popLayout">
            {visibleProducts.map((product) => (
              <motion.article
                key={product.id}
                className={styles.card}
                variants={cardVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                layout
              >
                <div className={styles.imageWrap}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.image}
                  />
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.category}>{product.category}</span>
                  <h2 className={styles.name}>{product.name}</h2>
                  <p className={styles.description}>{product.description}</p>
                  <div className={styles.cardFoot}>
                    <span className={styles.price}>
                      {formatRupiah(product.price)}
                    </span>
                    <Link
                      to={`/produk/${product.id}`}
                      className={styles.detailLink}
                    >
                      VIEW DETAIL <span className={styles.arrow}>→</span>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {visibleProducts.length === 0 && (
          <p className={styles.empty}>No items in this category.</p>
        )}
      </div>
    </div>
  );
}
