import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './KelolaArtikel.module.css';
import { useData } from '../../context/DataContext.jsx';

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

const emptyForm = { title: '', category: '', excerpt: '' };

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

export default function KelolaArtikel() {
  const { articles, addArticle, updateArticle, deleteArticle } = useData();
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const visibleArticles = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return articles;
    return articles.filter((a) => a.title.toLowerCase().includes(q));
  }, [articles, search]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (article) => {
    setEditingId(article.id);
    setForm({
      title: article.title,
      category: article.category,
      excerpt: article.excerpt,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleDelete = (article) => {
    if (window.confirm(`Delete article "${article.title}"?`)) {
      deleteArticle(article.id);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingId !== null) {
      updateArticle(editingId, {
        title: form.title,
        category: form.category,
        excerpt: form.excerpt,
      });
    } else {
      addArticle({
        title: form.title,
        category: form.category,
        excerpt: form.excerpt,
      });
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
          MANAGE ARTICLES
        </motion.h1>

        <div className={styles.topBar}>
          <input
            type="search"
            className={styles.search}
            placeholder="Search article title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search articles"
          />
          <button type="button" className={styles.addBtn} onClick={openAdd}>
            ADD ARTICLE <span className={styles.plus}>+</span>
          </button>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>No</th>
                <th className={styles.th}>Image</th>
                <th className={styles.th}>Title</th>
                <th className={styles.th}>Category</th>
                <th className={styles.th}>Date</th>
                <th className={styles.th}>Action</th>
              </tr>
            </thead>
            <motion.tbody
              variants={listVariants}
              initial="hidden"
              animate="show"
            >
              {visibleArticles.length === 0 ? (
                <tr>
                  <td className={styles.empty} colSpan={6}>
                    No matching articles.
                  </td>
                </tr>
              ) : (
                visibleArticles.map((article, i) => (
                  <motion.tr
                    key={article.id}
                    className={styles.tr}
                    variants={rowVariants}
                  >
                    <td className={styles.td}>{i + 1}</td>
                    <td className={styles.td}>
                      <div className={styles.thumbWrap}>
                        <img
                          src={article.image}
                          alt={article.title}
                          className={styles.thumb}
                        />
                      </div>
                    </td>
                    <td className={`${styles.td} ${styles.tdTitle}`}>
                      {article.title}
                    </td>
                    <td className={styles.td}>
                      <span className={styles.category}>{article.category}</span>
                    </td>
                    <td className={`${styles.td} ${styles.tdDate}`}>
                      {formatDate(article.date)}
                    </td>
                    <td className={styles.td}>
                      <div className={styles.actions}>
                        <button
                          type="button"
                          className={styles.editBtn}
                          onClick={() => openEdit(article)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className={styles.deleteBtn}
                          onClick={() => handleDelete(article)}
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
              aria-label={editingId !== null ? 'Edit article' : 'Add article'}
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className={styles.modalTitle}>
                {editingId !== null ? 'Edit Article' : 'Add Article'}
              </h2>

              <form className={styles.form} onSubmit={handleSave}>
                <div className={styles.field}>
                  <label htmlFor="title" className={styles.label}>
                    Title
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    className={styles.input}
                    value={form.title}
                    onChange={handleFormChange}
                    required
                  />
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
                  <label htmlFor="excerpt" className={styles.label}>
                    Excerpt
                  </label>
                  <textarea
                    id="excerpt"
                    name="excerpt"
                    rows={4}
                    className={`${styles.input} ${styles.textarea}`}
                    value={form.excerpt}
                    onChange={handleFormChange}
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
