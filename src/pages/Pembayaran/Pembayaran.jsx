import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Pembayaran.module.css';
import { useData } from '../../context/DataContext.jsx';

const formatRupiah = (value) => `Rp ${value.toLocaleString('id-ID')}`;

const STORE_ADDRESS = 'SQL Coffee — Jl. Jambu No. 520, Kidul Dalem, Kec. Bangil, Pasuruan';

const ICONS = {
  dinein: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 8h12v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M16 9h2.5a2 2 0 0 1 0 4H16" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M3 20h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  pickup: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 8h14l-1 12H6L5 8z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  delivery: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 7h11v8H3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M14 10h4l3 3v2h-7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="7" cy="17" r="1.8" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17.5" cy="17" r="1.8" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  bank: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 9l9-5 9 5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M4 9h16v2H4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M6 11v6M10 11v6M14 11v6M18 11v6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 19h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  qris: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M14 14h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2z" fill="currentColor" />
    </svg>
  ),
  cod: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 7h13v8H3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M16 10h3l2 3v2h-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="7" cy="17" r="1.8" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17.5" cy="17" r="1.8" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  counter: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 10h18l-1.2-3.2A2 2 0 0 0 17.9 5H6.1a2 2 0 0 0-1.9 1.3L3 10z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M4 10v9h16v-9" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M9 14h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
};

const orderTypes = [
  { id: 'dinein', label: 'Dine-in', desc: 'Order to your table', icon: ICONS.dinein },
  { id: 'pickup', label: 'Pickup', desc: 'Grab it at our store', icon: ICONS.pickup },
  { id: 'delivery', label: 'Delivery', desc: 'Sent to your address', icon: ICONS.delivery },
];

const getPaymentMethods = (orderType) => {
  const base = [
    { id: 'Transfer Bank', label: 'Bank Transfer', desc: 'BCA, Mandiri, BNI', icon: ICONS.bank },
    { id: 'QRIS', label: 'QRIS', desc: 'Scan & pay instantly', icon: ICONS.qris },
  ];
  if (orderType === 'delivery') {
    base.push({ id: 'COD', label: 'COD', desc: 'Pay on delivery', icon: ICONS.cod });
  } else if (orderType === 'pickup') {
    base.push({ id: 'Counter', label: 'Pay at Counter', desc: 'Cash when you pick up', icon: ICONS.counter });
  } else {
    base.push({ id: 'Counter', label: 'Pay at Cashier', desc: 'Settle at the cashier', icon: ICONS.counter });
  }
  return base;
};

const sectionTitles = {
  dinein: 'Dine-in Details',
  pickup: 'Pickup Details',
  delivery: 'Shipping Information',
};

const formVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const summaryVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: 0.35 },
  },
};

export default function Pembayaran() {
  const { cartItems, cartTotal, checkout } = useData();
  const [orderType, setOrderType] = useState('dinein');
  const [form, setForm] = useState({
    nama: '',
    telepon: '',
    alamat: '',
    kota: '',
    kodePos: '',
    pickupTime: '',
    tableNumber: '',
  });
  const [selectedPayment, setSelectedPayment] = useState('Transfer Bank');
  const [submitted, setSubmitted] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  const isDinein = orderType === 'dinein';
  const isPickup = orderType === 'pickup';
  const isDelivery = orderType === 'delivery';
  const paymentMethods = getPaymentMethods(orderType);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderTypeChange = (type) => {
    setOrderType(type);
    // Reset payment if the current one no longer applies to this order type.
    const validIds = getPaymentMethods(type).map((m) => m.id);
    if (!validIds.includes(selectedPayment)) {
      setSelectedPayment('Transfer Bank');
    }
  };

  // After checkout the cart is cleared, so keep a snapshot for display.
  const orderItems = submitted ? placedOrder.items : cartItems;
  const totalPrice = submitted ? placedOrder.total : cartTotal;
  const isEmpty = !submitted && cartItems.length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    let destination;
    if (isDelivery) {
      destination = [form.alamat, form.kota, form.kodePos].filter(Boolean).join(', ');
    } else if (isPickup) {
      destination = `Pickup at ${STORE_ADDRESS}${form.pickupTime ? ` @ ${form.pickupTime}` : ''}`;
    } else {
      destination = `Dine-in — Table ${form.tableNumber || '-'} (${STORE_ADDRESS})`;
    }
    setPlacedOrder({ items: cartItems, total: cartTotal });
    checkout({ address: destination });
    setSubmitted(true);
  };

  const fulfillmentLabel = isDelivery ? 'Shipping' : isPickup ? 'Pickup' : 'Dine-in';
  const fulfillmentValue = isDelivery
    ? 'Free'
    : isDinein && form.tableNumber
    ? `Table ${form.tableNumber}`
    : 'At store';

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.layout}>
          {/* ---------- Left: Form ---------- */}
          <motion.form
            className={styles.formCol}
            onSubmit={handleSubmit}
            variants={formVariants}
            initial="hidden"
            animate="show"
          >
            <motion.h1 className={styles.title} variants={sectionVariants}>
              CHECKOUT
            </motion.h1>

            {/* Order Type */}
            <motion.section className={styles.section} variants={sectionVariants}>
              <h2 className={styles.sectionTitle}>Order Type</h2>
              <div className={styles.orderTypeGrid}>
                {orderTypes.map((type) => {
                  const active = orderType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      className={`${styles.method} ${active ? styles.methodActive : ''}`}
                      onClick={() => handleOrderTypeChange(type.id)}
                      aria-pressed={active}
                    >
                      <span className={styles.methodIcon}>{type.icon}</span>
                      <span className={styles.methodText}>
                        <span className={styles.methodLabel}>{type.label}</span>
                        <span className={styles.methodDesc}>{type.desc}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.section>

            {/* Customer / Dine-in / Pickup / Shipping details */}
            <motion.section className={styles.section} variants={sectionVariants}>
              <h2 className={styles.sectionTitle}>{sectionTitles[orderType]}</h2>

              <div className={styles.field}>
                <label htmlFor="nama" className={styles.label}>
                  Full Name
                </label>
                <input
                  id="nama"
                  name="nama"
                  type="text"
                  className={styles.input}
                  value={form.nama}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="telepon" className={styles.label}>
                  Phone Number
                </label>
                <input
                  id="telepon"
                  name="telepon"
                  type="tel"
                  className={styles.input}
                  value={form.telepon}
                  onChange={handleChange}
                  autoComplete="tel"
                />
              </div>

              {isDinein && (
                <>
                  <div className={styles.pickupNote}>
                    <span className={styles.pickupNoteLabel}>You're ordering at</span>
                    <span className={styles.pickupNoteValue}>{STORE_ADDRESS}</span>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="tableNumber" className={styles.label}>
                      Table Number
                    </label>
                    <input
                      id="tableNumber"
                      name="tableNumber"
                      type="number"
                      min="1"
                      placeholder="e.g. 12"
                      className={styles.input}
                      value={form.tableNumber}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              {isPickup && (
                <>
                  <div className={styles.pickupNote}>
                    <span className={styles.pickupNoteLabel}>Pickup location</span>
                    <span className={styles.pickupNoteValue}>{STORE_ADDRESS}</span>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="pickupTime" className={styles.label}>
                      Pickup Time
                    </label>
                    <input
                      id="pickupTime"
                      name="pickupTime"
                      type="time"
                      className={styles.input}
                      value={form.pickupTime}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              {isDelivery && (
                <>
                  <div className={styles.field}>
                    <label htmlFor="alamat" className={styles.label}>
                      Full Address
                    </label>
                    <textarea
                      id="alamat"
                      name="alamat"
                      rows={3}
                      className={`${styles.input} ${styles.textarea}`}
                      value={form.alamat}
                      onChange={handleChange}
                      autoComplete="street-address"
                    />
                  </div>

                  <div className={styles.fieldRow}>
                    <div className={styles.field}>
                      <label htmlFor="kota" className={styles.label}>
                        City
                      </label>
                      <input
                        id="kota"
                        name="kota"
                        type="text"
                        className={styles.input}
                        value={form.kota}
                        onChange={handleChange}
                        autoComplete="address-level2"
                      />
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="kodePos" className={styles.label}>
                        Postal Code
                      </label>
                      <input
                        id="kodePos"
                        name="kodePos"
                        type="text"
                        inputMode="numeric"
                        className={styles.input}
                        value={form.kodePos}
                        onChange={handleChange}
                        autoComplete="postal-code"
                      />
                    </div>
                  </div>
                </>
              )}
            </motion.section>

            {/* Payment Method */}
            <motion.section className={styles.section} variants={sectionVariants}>
              <h2 className={styles.sectionTitle}>Payment Method</h2>

              <div className={styles.methods}>
                {paymentMethods.map((method) => {
                  const active = selectedPayment === method.id;
                  return (
                    <button
                      key={method.id}
                      type="button"
                      className={`${styles.method} ${
                        active ? styles.methodActive : ''
                      }`}
                      onClick={() => setSelectedPayment(method.id)}
                      aria-pressed={active}
                    >
                      <span className={styles.methodIcon}>{method.icon}</span>
                      <span className={styles.methodText}>
                        <span className={styles.methodLabel}>{method.label}</span>
                        <span className={styles.methodDesc}>{method.desc}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.section>

            {/* Confirm / Success */}
            <motion.div variants={sectionVariants}>
              {submitted ? (
                <motion.div
                  className={styles.success}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  role="status"
                >
                  Order confirmed successfully! ✓
                </motion.div>
              ) : (
                <button
                  type="submit"
                  className={`${styles.confirmBtn} ${
                    isEmpty ? styles.confirmBtnDisabled : ''
                  }`}
                  disabled={isEmpty}
                >
                  CONFIRM ORDER
                </button>
              )}
            </motion.div>
          </motion.form>

          {/* ---------- Right: Order Summary ---------- */}
          <motion.aside
            className={styles.summaryCol}
            variants={summaryVariants}
            initial="hidden"
            animate="show"
          >
            <div className={styles.summary}>
              <h2 className={styles.summaryHeading}>Order Summary</h2>

              {isEmpty ? (
                <p className={styles.summaryEmpty}>
                  Your cart is empty.{' '}
                  <Link to="/produk" className={styles.summaryShopLink}>
                    Shop first →
                  </Link>
                </p>
              ) : (
                <ul className={styles.summaryList}>
                  {orderItems.map((item) => (
                    <li key={item.id} className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>
                        {item.name}{' '}
                        <span className={styles.summaryQty}>× {item.qty}</span>
                      </span>
                      <span className={styles.summaryValue}>
                        {formatRupiah(item.price * item.qty)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              <hr className={styles.summaryDivider} />

              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Subtotal</span>
                <span className={styles.metaValue}>{formatRupiah(totalPrice)}</span>
              </div>
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>{fulfillmentLabel}</span>
                <span className={styles.metaValueFree}>{fulfillmentValue}</span>
              </div>

              <hr className={styles.summaryDivider} />

              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Total</span>
                <span className={styles.totalValue}>{formatRupiah(totalPrice)}</span>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
