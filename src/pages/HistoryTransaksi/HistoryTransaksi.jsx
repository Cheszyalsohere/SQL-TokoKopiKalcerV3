import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './HistoryTransaksi.module.css';
import { useData } from '../../context/DataContext.jsx';

const formatRupiah = (value) => `Rp ${value.toLocaleString('id-ID')}`;

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

const formatTrxId = (id) => `#TRX-${String(id).padStart(3, '0')}`;

const filters = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: 'Pending' },
  { id: 'processing', label: 'Processing' },
  { id: 'completed', label: 'Completed' },
];

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: 'easeIn' } },
};

export default function HistoryTransaksi() {
  const { transactions, products, users } = useData();
  const [activeFilter, setActiveFilter] = useState('all');

  const productName = (productId) =>
    products.find((p) => p.id === productId)?.name ?? 'Product';

  const userName = (userId) =>
    users.find((u) => u.id === userId)?.name ?? 'Customer';

  const visibleTransactions = useMemo(
    () =>
      activeFilter === 'all'
        ? transactions
        : transactions.filter((trx) => trx.status === activeFilter),
    [activeFilter, transactions]
  );

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <motion.header
          className={styles.header}
          variants={titleVariants}
          initial="hidden"
          animate="show"
        >
          <h1 className={styles.title}>TRANSACTION HISTORY</h1>
          <p className={styles.subtitle}>All your orders in one place.</p>
        </motion.header>

        <div className={styles.filterBar} role="tablist" aria-label="Filter by status">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={activeFilter === filter.id}
              className={`${styles.filterBtn} ${
                activeFilter === filter.id ? styles.filterBtnActive : ''
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <motion.ul
          className={styles.list}
          variants={listVariants}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleTransactions.length === 0 ? (
              <motion.li
                key="empty"
                className={styles.empty}
                variants={cardVariants}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <p className={styles.emptyText}>
                  No transactions with this status.
                </p>
              </motion.li>
            ) : (
              visibleTransactions.map((trx) => (
                <motion.li
                  key={trx.id}
                  className={styles.card}
                  variants={cardVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  layout
                >
                  <div className={styles.cardTop}>
                    <div className={styles.cardId}>
                      <span className={styles.orderId}>{formatTrxId(trx.id)}</span>
                      <span className={styles.customer}>
                        {userName(trx.userId)}
                      </span>
                    </div>
                    <span
                      className={`${styles.badge} ${
                        styles[`badge_${trx.status}`]
                      }`}
                    >
                      {trx.status}
                    </span>
                  </div>

                  <span className={styles.date}>{formatDate(trx.date)}</span>

                  <hr className={styles.divider} />

                  <ul className={styles.itemList}>
                    {trx.items.map((item, i) => (
                      <li key={i} className={styles.item}>
                        <span className={styles.itemName}>
                          {productName(item.productId)}
                        </span>
                        <span className={styles.itemQty}>× {item.qty}</span>
                      </li>
                    ))}
                  </ul>

                  <hr className={styles.divider} />

                  <div className={styles.cardBottom}>
                    <span className={styles.totalLabel}>TOTAL</span>
                    <span className={styles.totalValue}>
                      {formatRupiah(trx.total)}
                    </span>
                  </div>
                </motion.li>
              ))
            )}
          </AnimatePresence>
        </motion.ul>
      </div>
    </div>
  );
}
