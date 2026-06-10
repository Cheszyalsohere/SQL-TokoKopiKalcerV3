import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './KelolaPengguna.module.css';
import { useData } from '../../context/DataContext.jsx';

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

const emptyForm = { name: '', email: '', role: 'user' };

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

export default function KelolaPengguna() {
  const { users, addUser, updateUser, deleteUser } = useData();
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const visibleUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) => u.name.toLowerCase().includes(q));
  }, [users, search]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (user) => {
    setEditingId(user.id);
    setForm({ name: user.name, email: user.email, role: user.role });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleDelete = (user) => {
    if (window.confirm(`Delete user "${user.name}"?`)) {
      deleteUser(user.id);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const data = { name: form.name, email: form.email, role: form.role };
    if (editingId !== null) {
      updateUser(editingId, data);
    } else {
      addUser(data);
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
          MANAGE USERS
        </motion.h1>

        <div className={styles.topBar}>
          <input
            type="search"
            className={styles.search}
            placeholder="Search user name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search users"
          />
          <button type="button" className={styles.addBtn} onClick={openAdd}>
            ADD USER <span className={styles.plus}>+</span>
          </button>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>No</th>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>Email</th>
                <th className={styles.th}>Role</th>
                <th className={styles.th}>Join Date</th>
                <th className={styles.th}>Action</th>
              </tr>
            </thead>
            <motion.tbody
              variants={listVariants}
              initial="hidden"
              animate="show"
            >
              {visibleUsers.length === 0 ? (
                <tr>
                  <td className={styles.empty} colSpan={6}>
                    No matching users.
                  </td>
                </tr>
              ) : (
                visibleUsers.map((user, i) => (
                  <motion.tr
                    key={user.id}
                    className={styles.tr}
                    variants={rowVariants}
                  >
                    <td className={styles.td}>{i + 1}</td>
                    <td className={`${styles.td} ${styles.tdName}`}>
                      {user.name}
                    </td>
                    <td className={`${styles.td} ${styles.tdEmail}`}>
                      {user.email}
                    </td>
                    <td className={styles.td}>
                      <span
                        className={`${styles.badge} ${styles[`badge_${user.role}`]}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className={`${styles.td} ${styles.tdDate}`}>
                      {formatDate(user.joinDate)}
                    </td>
                    <td className={styles.td}>
                      <div className={styles.actions}>
                        <button
                          type="button"
                          className={styles.editBtn}
                          onClick={() => openEdit(user)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className={styles.deleteBtn}
                          onClick={() => handleDelete(user)}
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
              aria-label={editingId !== null ? 'Edit user' : 'Add user'}
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className={styles.modalTitle}>
                {editingId !== null ? 'Edit User' : 'Add User'}
              </h2>

              <form className={styles.form} onSubmit={handleSave}>
                <div className={styles.field}>
                  <label htmlFor="name" className={styles.label}>
                    Name
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
                  <label htmlFor="email" className={styles.label}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={styles.input}
                    value={form.email}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="role" className={styles.label}>
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    className={`${styles.input} ${styles.select}`}
                    value={form.role}
                    onChange={handleFormChange}
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
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
