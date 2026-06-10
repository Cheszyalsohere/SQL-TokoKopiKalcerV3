import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './DetailProduk.module.css';
import { useData } from '../../context/DataContext.jsx';

const formatRupiah = (value) => `Rp ${value.toLocaleString('id-ID')}`;

const imageVariants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const infoContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const infoItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const relatedParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const relatedCard = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function DetailProduk() {
  const { id } = useParams();
  const { products, addToCart } = useData();
  const product = products.find((p) => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h1 className={styles.notFoundTitle}>Product not found</h1>
        <Link to="/produk" className={styles.backLink}>
          ← Back to Catalog
        </Link>
      </div>
    );
  }

  const isMenuItem = product.type === 'drink' || product.type === 'food';
  const backTo = isMenuItem ? '/menu' : '/produk';
  const backLabel = isMenuItem ? 'Menu' : 'Shop';

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.type === product.type)
    .slice(0, 3);

  const decrement = () => setQuantity((q) => Math.max(1, q - 1));
  const increment = () => setQuantity((q) => q + 1);

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <section className={styles.detail}>
          <motion.div
            className={styles.imageCol}
            variants={imageVariants}
            initial="hidden"
            animate="show"
          >
            <div className={styles.mainImageWrap}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.mainImage}
              />
            </div>
            <div className={styles.thumbs}>
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  type="button"
                  className={`${styles.thumb} ${
                    activeThumb === i ? styles.thumbActive : ''
                  }`}
                  onClick={() => setActiveThumb(i)}
                  aria-label={`Thumbnail ${i + 1}`}
                >
                  <img
                    src={product.image}
                    alt=""
                    className={styles.thumbImage}
                  />
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            className={styles.infoCol}
            variants={infoContainer}
            initial="hidden"
            animate="show"
          >
            <motion.nav
              variants={infoItem}
              className={styles.breadcrumb}
              aria-label="Breadcrumb"
            >
              <Link to={backTo} className={styles.breadcrumbLink}>
                {backLabel}
              </Link>
              <span className={styles.breadcrumbSep}>→</span>
              <span className={styles.breadcrumbCurrent}>{product.name}</span>
            </motion.nav>

            <motion.span variants={infoItem} className={styles.category}>
              {product.category}
            </motion.span>

            <motion.h1 variants={infoItem} className={styles.name}>
              {product.name}
            </motion.h1>

            <motion.div variants={infoItem} className={styles.price}>
              {formatRupiah(product.price)}
            </motion.div>

            <motion.hr variants={infoItem} className={styles.divider} />

            <motion.p variants={infoItem} className={styles.description}>
              {product.description}. Every cup is brewed with hand-picked beans
              and a consistent method — simple, honest, and made to be enjoyed
              in peace.
            </motion.p>

            <motion.div variants={infoItem} className={styles.qtyRow}>
              <span className={styles.qtyLabel}>Quantity</span>
              <div className={styles.qtyControl}>
                <button
                  type="button"
                  className={styles.qtyBtn}
                  onClick={decrement}
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className={styles.qtyValue} aria-live="polite">
                  {quantity}
                </span>
                <button
                  type="button"
                  className={styles.qtyBtn}
                  onClick={increment}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </motion.div>

            <motion.button
              variants={infoItem}
              type="button"
              className={styles.addBtn}
              onClick={handleAddToCart}
            >
              {added ? 'ADDED ✓' : 'ADD TO CART'}
            </motion.button>

            <motion.div variants={infoItem}>
              <Link to={backTo} className={styles.backLink}>
                ← Back to {backLabel}
              </Link>
            </motion.div>
          </motion.div>
        </section>

        <section className={styles.related}>
          <h2 className={styles.relatedHeading}>More Products</h2>
          <motion.div
            className={styles.relatedGrid}
            variants={relatedParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {relatedProducts.map((item) => (
              <motion.article
                key={item.id}
                className={styles.relatedCard}
                variants={relatedCard}
              >
                <Link to={`/produk/${item.id}`} className={styles.relatedLink}>
                  <div className={styles.relatedImageWrap}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className={styles.relatedImage}
                    />
                  </div>
                  <div className={styles.relatedBody}>
                    <span className={styles.category}>{item.category}</span>
                    <h3 className={styles.relatedName}>{item.name}</h3>
                    <p className={styles.relatedDesc}>{item.description}</p>
                    <div className={styles.relatedFoot}>
                      <span className={styles.relatedPrice}>
                        {formatRupiah(item.price)}
                      </span>
                      <span className={styles.detailHint}>
                        VIEW DETAIL <span className={styles.arrow}>→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </section>
      </div>
    </div>
  );
}
