import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './KelolaTransaksi.module.css';
import { useData } from '../../context/DataContext.jsx';

const formatRupiah = (value) => `Rp ${Number(value).toLocaleString('id-ID')}`;

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

const formatTrxId = (id) => `#TRX-${String(id).padStart(3, '0')}`;

const statusOptions = ['pending', 'processing', 'completed'];

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
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: 'easeIn' } },
};

export default function KelolaTransaksi() {
  const { transactions, products, users, updateTransactionStatus, deleteTransaction } =
    useData();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const productName = (productId) =>
    products.find((p) => p.id === productId)?.name ?? 'Product';

  const userName = (userId) =>
    users.find((u) => u.id === userId)?.name ?? 'Customer';

  const visibleTransactions = useMemo(() => {
    const q = search.trim().toLowerCase();
    return transactions.filter((trx) => {
      const matchesStatus =
        activeFilter === 'all' || trx.status === activeFilter;
      if (!matchesStatus) return false;
      if (!q) return true;
      const idMatch = formatTrxId(trx.id).toLowerCase().includes(q);
      const customerMatch = userName(trx.userId).toLowerCase().includes(q);
      return idMatch || customerMatch;
    });
  }, [transactions, search, activeFilter]);

  const handleStatusChange = (id, status) => {
    updateTransactionStatus(id, status);
  };

  const handleDelete = (trx) => {
    if (window.confirm(`Delete transaction ${formatTrxId(trx.id)}?`)) {
      deleteTransaction(trx.id);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <motion.h1
          className={styles.title}
          variants={titleVariants}
          initial="hidden"
          animate="show"
        >
          MANAGE TRANSACTIONS
        </motion.h1>

        <div className={styles.toolbar}>
          <input
            type="search"
            className={styles.search}
            placeholder="Search Order ID or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search transactions"
          />

          <div
            className={styles.filterBar}
            role="tablist"
            aria-label="Filter by status"
          >
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
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>No</th>
                <th className={styles.th}>Order ID</th>
                <th className={styles.th}>Customer</th>
                <th className={styles.th}>Items</th>
                <th className={styles.th}>Total</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Date</th>
                <th className={styles.th}>Action</th>
              </tr>
            </thead>
            <motion.tbody
              variants={listVariants}
              initial="hidden"
              animate="show"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {visibleTransactions.length === 0 ? (
                  <motion.tr
                    key="empty"
                    variants={rowVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                  >
                    <td className={styles.empty} colSpan={8}>
                      No matching transactions.
                    </td>
                  </motion.tr>
                ) : (
                  visibleTransactions.map((trx, i) => (
                    <motion.tr
                      key={trx.id}
                      className={styles.tr}
                      variants={rowVariants}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      layout
                    >
                      <td className={styles.td}>{i + 1}</td>
                      <td className={`${styles.td} ${styles.tdId}`}>
                        {formatTrxId(trx.id)}
                      </td>
                      <td className={styles.td}>{userName(trx.userId)}</td>
                      <td className={`${styles.td} ${styles.tdItems}`}>
                        <ul className={styles.itemList}>
                          {trx.items.map((item, idx) => (
                            <li key={idx} className={styles.item}>
                              {productName(item.productId)}
                              <span className={styles.itemQty}>
                                {' '}
                                × {item.qty}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className={`${styles.td} ${styles.tdTotal}`}>
                        {formatRupiah(trx.total)}
                      </td>
                      <td className={styles.td}>
                        <span
                          className={`${styles.badge} ${
                            styles[`badge_${trx.status}`]
                          }`}
                        >
                          {trx.status}
                        </span>
                      </td>
                      <td className={`${styles.td} ${styles.tdDate}`}>
                        {formatDate(trx.date)}
                      </td>
                      <td className={styles.td}>
                        <div className={styles.actions}>
                          <select
                            className={styles.statusSelect}
                            value={trx.status}
                            onChange={(e) =>
                              handleStatusChange(trx.id, e.target.value)
                            }
                            aria-label={`Change status ${formatTrxId(trx.id)}`}
                          >
                            {statusOptions.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            className={styles.deleteBtn}
                            onClick={() => handleDelete(trx)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </motion.tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
