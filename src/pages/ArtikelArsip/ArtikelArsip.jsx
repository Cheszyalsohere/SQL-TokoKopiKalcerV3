import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ArtikelArsip.module.css';
import { useData } from '../../context/DataContext.jsx';

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: 'easeIn' } },
};

export default function ArtikelArsip() {
  const { articles } = useData();
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = useMemo(
    () => ['All', ...new Set(articles.map((a) => a.category))],
    [articles]
  );

  const visibleArticles = useMemo(
    () =>
      activeFilter === 'All'
        ? articles
        : articles.filter((a) => a.category === activeFilter),
    [activeFilter, articles]
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
          <h1 className={styles.title}>JOURNAL</h1>
          <p className={styles.subtitle}>Thoughts, stories &amp; more.</p>
        </motion.header>

        <div className={styles.filterBar} role="tablist" aria-label="Filter by category">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={activeFilter === category}
              className={`${styles.filterBtn} ${
                activeFilter === category ? styles.filterBtnActive : ''
              }`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div
          className={styles.grid}
          variants={gridVariants}
          initial="hidden"
          animate="show"
          layout
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleArticles.map((article) => (
              <motion.article
                key={article.id}
                className={styles.card}
                variants={cardVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                layout
              >
                <Link to={`/artikel/${article.id}`} className={styles.cardLink}>
                  <div className={styles.imageWrap}>
                    <img
                      src={article.image}
                      alt={article.title}
                      className={styles.image}
                      loading="lazy"
                    />
                  </div>

                  <div className={styles.cardBody}>
                    <span className={styles.date}>{formatDate(article.date)}</span>
                    <h2 className={styles.cardTitle}>{article.title}</h2>
                    <p className={styles.excerpt}>{article.excerpt}</p>
                    <span className={styles.category}>{article.category}</span>
                    <span className={styles.readMore}>
                      READ MORE <span className={styles.arrow}>→</span>
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
