import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Keranjang.module.css';
import { useData } from '../../context/DataContext.jsx';

const formatRupiah = (value) => `Rp ${value.toLocaleString('id-ID')}`;

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  exit: {
    opacity: 0,
    x: -30,
    height: 0,
    marginBottom: 0,
    paddingTop: 0,
    paddingBottom: 0,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

const summaryVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: 0.2 },
  },
};

export default function Keranjang() {
  const {
    cartItems,
    cartTotal: totalPrice,
    increaseQty,
    decreaseQty,
    removeFromCart: removeItem,
  } = useData();

  const itemCount = cartItems.length;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <motion.header
          className={styles.header}
          variants={titleVariants}
          initial="hidden"
          animate="show"
        >
          <h1 className={styles.title}>CART</h1>
          <p className={styles.subtitle}>
            {itemCount} item{itemCount !== 1 ? 's' : ''} in your cart
          </p>
        </motion.header>

        <div className={styles.layout}>
          <section className={styles.itemsCol} aria-label="Cart items">
            {itemCount === 0 ? (
              <div className={styles.empty}>
                <p className={styles.emptyText}>Your cart is empty.</p>
                <Link to="/produk" className={styles.emptyLink}>
                  ← Continue Shopping
                </Link>
              </div>
            ) : (
              <motion.ul
                className={styles.itemList}
                variants={listVariants}
                initial="hidden"
                animate="show"
              >
                <AnimatePresence initial={false}>
                  {cartItems.map((item) => (
                    <motion.li
                      key={item.id}
                      className={styles.item}
                      variants={itemVariants}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      layout
                    >
                      <div className={styles.itemImageWrap}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className={styles.itemImage}
                        />
                      </div>

                      <div className={styles.itemInfo}>
                        <span className={styles.itemCategory}>
                          {item.category}
                        </span>
                        <h2 className={styles.itemName}>{item.name}</h2>
                        <span className={styles.itemPrice}>
                          {formatRupiah(item.price)}
                        </span>
                      </div>

                      <div className={styles.qtyControl}>
                        <button
                          type="button"
                          className={styles.qtyBtn}
                          onClick={() => decreaseQty(item.id)}
                          aria-label={`Decrease ${item.name}`}
                        >
                          −
                        </button>
                        <span className={styles.qtyValue}>{item.qty}</span>
                        <button
                          type="button"
                          className={styles.qtyBtn}
                          onClick={() => increaseQty(item.id)}
                          aria-label={`Increase ${item.name}`}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className={styles.removeBtn}
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                      >
                        ×
                      </button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </motion.ul>
            )}
          </section>

          <motion.aside
            className={styles.summaryCol}
            variants={summaryVariants}
            initial="hidden"
            animate="show"
          >
            <div className={styles.summary}>
              <h2 className={styles.summaryHeading}>Order Summary</h2>

              {itemCount === 0 ? (
                <p className={styles.summaryEmpty}>
                  Belum ada item untuk dirangkum.
                </p>
              ) : (
                <ul className={styles.summaryList}>
                  {cartItems.map((item) => (
                    <li key={item.id} className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>
                        {item.name} <span className={styles.summaryQty}>× {item.qty}</span>
                      </span>
                      <span className={styles.summaryValue}>
                        {formatRupiah(item.price * item.qty)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              <hr className={styles.summaryDivider} />

              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>TOTAL</span>
                <span className={styles.totalValue}>
                  {formatRupiah(totalPrice)}
                </span>
              </div>

              <Link
                to="/pembayaran"
                className={`${styles.checkoutBtn} ${
                  itemCount === 0 ? styles.checkoutBtnDisabled : ''
                }`}
                aria-disabled={itemCount === 0}
                onClick={(e) => {
                  if (itemCount === 0) e.preventDefault();
                }}
              >
                PROCEED TO CHECKOUT <span className={styles.arrow}>→</span>
              </Link>

              <Link to="/produk" className={styles.continueLink}>
                ← Continue Shopping
              </Link>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
