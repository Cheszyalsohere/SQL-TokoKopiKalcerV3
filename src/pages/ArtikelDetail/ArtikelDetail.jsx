import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './ArtikelDetail.module.css';
import { useData } from '../../context/DataContext.jsx';

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

const metaVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const heroVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7, ease: 'easeOut', delay: 0.2 } },
};

const contentVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: 0.35 },
  },
};

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export default function ArtikelDetail() {
  const { id } = useParams();
  const { articles } = useData();

  const article = useMemo(
    () => articles.find((a) => a.id === Number(id)),
    [id, articles]
  );

  const related = useMemo(
    () => articles.filter((a) => a.id !== Number(id)).slice(0, 3),
    [id, articles]
  );

  if (!article) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.notFound}>
            <h1 className={styles.notFoundTitle}>Article not found</h1>
            <Link to="/artikel" className={styles.backLink}>
              ← Back to Journal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const paragraphs = article.content
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className={styles.page}>
      <article className={styles.container}>
        <motion.div
          className={styles.meta}
          variants={metaVariants}
          initial="hidden"
          animate="show"
        >
          <motion.nav className={styles.breadcrumb} variants={itemVariants}>
            <Link to="/artikel" className={styles.breadcrumbLink}>
              Journal
            </Link>
            <span className={styles.breadcrumbSep}>→</span>
            <span className={styles.breadcrumbCurrent}>{article.title}</span>
          </motion.nav>

          <motion.span className={styles.category} variants={itemVariants}>
            {article.category}
          </motion.span>

          <motion.h1 className={styles.title} variants={itemVariants}>
            {article.title}
          </motion.h1>

          <motion.span className={styles.date} variants={itemVariants}>
            {formatDate(article.date)}
          </motion.span>
        </motion.div>

        <hr className={styles.divider} />

        <motion.div
          className={styles.heroWrap}
          variants={heroVariants}
          initial="hidden"
          animate="show"
        >
          <img
            src={article.image}
            alt={article.title}
            className={styles.hero}
          />
        </motion.div>

        <motion.div
          className={styles.content}
          variants={contentVariants}
          initial="hidden"
          animate="show"
        >
          {paragraphs.map((paragraph, i) => (
            <p key={i} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </motion.div>

        <hr className={styles.divider} />

        <Link to="/artikel" className={styles.backLink}>
          ← Back to Journal
        </Link>

        {related.length > 0 && (
          <section className={styles.related}>
            <h2 className={styles.relatedHeading}>More Articles</h2>

            <motion.div
              className={styles.grid}
              variants={gridVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {related.map((item) => (
                <motion.article
                  key={item.id}
                  className={styles.card}
                  variants={cardVariants}
                >
                  <Link to={`/artikel/${item.id}`} className={styles.cardLink}>
                    <div className={styles.cardImageWrap}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className={styles.cardImage}
                        loading="lazy"
                      />
                    </div>

                    <div className={styles.cardBody}>
                      <span className={styles.cardDate}>
                        {formatDate(item.date)}
                      </span>
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                      <p className={styles.cardExcerpt}>{item.excerpt}</p>
                      <span className={styles.readMore}>
                        READ MORE <span className={styles.arrow}>→</span>
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </section>
        )}
      </article>
    </div>
  );
}
