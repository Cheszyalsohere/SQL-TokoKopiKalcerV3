import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Dashboard.module.css';
import { useData } from '../../context/DataContext.jsx';

const formatRupiah = (value) => `Rp ${value.toLocaleString('id-ID')}`;

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

const formatTrxId = (id) => `#TRX-${String(id).padStart(3, '0')}`;

const quickLinks = [
  {
    label: 'Manage Products',
    to: '/dashboard/produk',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 7l9-4 9 4-9 4-9-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M3 7v10l9 4 9-4V7" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M12 11v10" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    label: 'Manage Articles',
    to: '/dashboard/artikel',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 3h14v18l-7-3-7 3V3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M9 7h6M9 11h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Manage Users',
    to: '/dashboard/pengguna',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Manage Transactions',
    to: '/dashboard/transaksi',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 5h16v14H4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M4 9h16" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 13h5M8 16h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
];

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

const tableVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay: 0.35 },
  },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { products, articles, users, transactions, resetData, logout } = useData();

  const userName = (userId) =>
    users.find((u) => u.id === userId)?.name ?? 'Customer';

  const stats = [
    { label: 'Total Products', value: products.length },
    { label: 'Total Articles', value: articles.length },
    { label: 'Total Users', value: users.length },
    { label: 'Total Transactions', value: transactions.length },
  ];

  const recentTransactions = [...transactions].slice(-5).reverse();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleReset = () => {
    if (
      window.confirm(
        'Reset all data to its initial state? All changes to products, articles, users, transactions, and the cart will be lost.'
      )
    ) {
      resetData();
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <motion.div
          className={styles.titleRow}
          variants={titleVariants}
          initial="hidden"
          animate="show"
        >
          <h1 className={styles.title}>DASHBOARD</h1>
          <div className={styles.titleActions}>
            <button type="button" className={styles.resetBtn} onClick={handleReset}>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M3 12a9 9 0 109-9 9 9 0 00-6.4 2.7L3 8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 4v4h4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Reset Data
            </button>
            <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M15 4h3a1 1 0 011 1v14a1 1 0 01-1 1h-3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 8l-4 4 4 4M6 12h11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Log Out
            </button>
          </div>
        </motion.div>

        {/* ---------- Stats ---------- */}
        <motion.section
          className={styles.statsGrid}
          variants={gridVariants}
          initial="hidden"
          animate="show"
          aria-label="Statistik"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className={styles.statCard}
              variants={cardVariants}
            >
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </motion.div>
          ))}
        </motion.section>

        {/* ---------- Recent transactions ---------- */}
        <motion.section
          className={styles.tableSection}
          variants={tableVariants}
          initial="hidden"
          animate="show"
        >
          <div className={styles.tableHeader}>
            <h2 className={styles.sectionTitle}>Recent Transactions</h2>
            <Link to="/history" className={styles.viewAll}>
              View All <span className={styles.arrow}>→</span>
            </Link>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>No</th>
                  <th className={styles.th}>Order ID</th>
                  <th className={styles.th}>Customer</th>
                  <th className={styles.th}>Total</th>
                  <th className={styles.th}>Status</th>
                  <th className={styles.th}>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((trx, i) => (
                  <tr key={trx.id} className={styles.tr}>
                    <td className={styles.td}>{i + 1}</td>
                    <td className={`${styles.td} ${styles.tdId}`}>
                      {formatTrxId(trx.id)}
                    </td>
                    <td className={styles.td}>{userName(trx.userId)}</td>
                    <td className={styles.td}>{formatRupiah(trx.total)}</td>
                    <td className={styles.td}>
                      <span
                        className={`${styles.badge} ${styles[`badge_${trx.status}`]}`}
                      >
                        {trx.status}
                      </span>
                    </td>
                    <td className={`${styles.td} ${styles.tdDate}`}>
                      {formatDate(trx.date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* ---------- Quick links ---------- */}
        <motion.section
          className={styles.quickGrid}
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          aria-label="Tautan cepat"
        >
          {quickLinks.map((link) => (
            <motion.div key={link.to} variants={cardVariants}>
              <Link to={link.to} className={styles.quickCard}>
                <span className={styles.quickIcon}>{link.icon}</span>
                <span className={styles.quickLabel}>{link.label}</span>
                <span className={styles.quickArrow}>→</span>
              </Link>
            </motion.div>
          ))}
        </motion.section>
      </div>
    </div>
  );
}
