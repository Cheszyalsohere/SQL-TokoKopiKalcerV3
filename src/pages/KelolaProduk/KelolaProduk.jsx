import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './KelolaProduk.module.css';
import { useData } from '../../context/DataContext.jsx';

const formatRupiah = (value) => `Rp ${Number(value).toLocaleString('id-ID')}`;

const emptyForm = {
  name: '',
  category: '',
  description: '',
  price: '',
  type: 'drink',
};

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
};

export default function KelolaProduk() {
  const { products, addProduct, updateProduct, deleteProduct } = useData();
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const visibleProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.name.toLowerCase().includes(q));
  }, [products, search]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      description: product.description,
      price: String(product.price),
      type: product.type || 'drink',
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleDelete = (product) => {
    if (window.confirm(`Delete product "${product.name}"?`)) {
      deleteProduct(product.id);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const data = {
      name: form.name,
      category: form.category,
      description: form.description,
      price: form.price,
      type: form.type,
    };
    if (editingId !== null) {
      updateProduct(editingId, data);
    } else {
      addProduct(data);
    }
    closeModal();
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
          MANAGE PRODUCTS
        </motion.h1>

        <div className={styles.topBar}>
          <input
            type="search"
            className={styles.search}
            placeholder="Search product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search products"
          />
          <button type="button" className={styles.addBtn} onClick={openAdd}>
            ADD PRODUCT <span className={styles.plus}>+</span>
          </button>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>No</th>
                <th className={styles.th}>Image</th>
                <th className={styles.th}>Product Name</th>
                <th className={styles.th}>Category</th>
                <th className={styles.th}>Price</th>
                <th className={styles.th}>Action</th>
              </tr>
            </thead>
            <motion.tbody
              variants={listVariants}
              initial="hidden"
              animate="show"
            >
              {visibleProducts.length === 0 ? (
                <tr>
                  <td className={styles.empty} colSpan={6}>
                    No matching products.
                  </td>
                </tr>
              ) : (
                visibleProducts.map((product, i) => (
                  <motion.tr
                    key={product.id}
                    className={styles.tr}
                    variants={rowVariants}
                  >
                    <td className={styles.td}>{i + 1}</td>
                    <td className={styles.td}>
                      <div className={styles.thumbWrap}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className={styles.thumb}
                        />
                      </div>
                    </td>
                    <td className={`${styles.td} ${styles.tdName}`}>
                      {product.name}
                    </td>
                    <td className={styles.td}>
                      <span className={styles.category}>{product.category}</span>
                    </td>
                    <td className={`${styles.td} ${styles.tdPrice}`}>
                      {formatRupiah(product.price)}
                    </td>
                    <td className={styles.td}>
                      <div className={styles.actions}>
                        <button
                          type="button"
                          className={styles.editBtn}
                          onClick={() => openEdit(product)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className={styles.deleteBtn}
                          onClick={() => handleDelete(product)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </motion.tbody>
          </table>
        </div>
      </div>

      {/* ---------- Modal ---------- */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeModal}
          >
            <motion.div
              className={styles.modal}
              role="dialog"
              aria-modal="true"
              aria-label={editingId !== null ? 'Edit product' : 'Add product'}
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className={styles.modalTitle}>
                {editingId !== null ? 'Edit Product' : 'Add Product'}
              </h2>

              <form className={styles.form} onSubmit={handleSave}>
                <div className={styles.field}>
                  <label htmlFor="name" className={styles.label}>
                    Product Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className={styles.input}
                    value={form.name}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="type" className={styles.label}>
                    Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    className={`${styles.input} ${styles.select}`}
                    value={form.type}
                    onChange={handleFormChange}
                  >
                    <option value="drink">Drink (Menu)</option>
                    <option value="food">Food (Menu)</option>
                    <option value="bean">Bean (Shop)</option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label htmlFor="category" className={styles.label}>
                    Category
                  </label>
                  <input
                    id="category"
                    name="category"
                    type="text"
                    className={styles.input}
                    value={form.category}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="description" className={styles.label}>
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    className={`${styles.input} ${styles.textarea}`}
                    value={form.description}
                    onChange={handleFormChange}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="price" className={styles.label}>
                    Price
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="500"
                    className={styles.input}
                    value={form.price}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className={styles.modalActions}>
                  <button type="submit" className={styles.saveBtn}>
                    SAVE
                  </button>
                  <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={closeModal}
                  >
                    CANCEL
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
