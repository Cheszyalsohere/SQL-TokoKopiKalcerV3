import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './LandingPage.module.css';
import { useData } from '../../context/DataContext.jsx';

const formatRupiah = (value) =>
  `Rp ${value.toLocaleString('id-ID')}`;

const formatDate = (iso) => {
  const d = new Date(iso);
  return d
    .toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
    .toUpperCase();
};

const PinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12Z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const heroContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function LandingPage() {
  const { products, articles } = useData();
  const featuredProducts = products
    .filter((p) => p.type === 'drink')
    .slice(0, 3);
  const featuredArticles = articles.slice(0, 3);

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <motion.div
          className={styles.heroLeft}
          variants={heroContainer}
          initial="hidden"
          animate="show"
        >
          <motion.span variants={heroItem} className={styles.label}>
            EST. 2024
          </motion.span>
          <motion.h1 variants={heroItem} className={styles.heroHeading}>
            COFFEE,
            <br />
            SIMPLE AS SQL
          </motion.h1>
          <motion.p variants={heroItem} className={styles.heroSub}>
            Good coffee, clear taste. Every query has a result, every cup has a story.
          </motion.p>
          <motion.div variants={heroItem}>
            <Link to="/menu" className={styles.ctaBtn}>
              ORDER NOW <span className={styles.arrow}>→</span>
            </Link>
          </motion.div>
          <motion.span variants={heroItem} className={styles.scrollHint}>
            ↓ SCROLL DOWN
          </motion.span>
        </motion.div>

        <div className={styles.heroRight}>
          <img
            src="https://picsum.photos/seed/coffeehero/800/900"
            alt="Coffee being poured"
            className={styles.heroImage}
          />
        </div>
      </section>

      {/* ABOUT */}
      <motion.section
        id="about"
        className={styles.about}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className={styles.aboutInner}>
          <div className={styles.aboutText}>
            <span className={styles.label}>ABOUT US</span>
            <h2 className={styles.sectionHeading}>More Than Just Coffee</h2>
            <p className={styles.bodyText}>
              SQL is a space for everyone who appreciates quality and simplicity.
              We believe great coffee brings people and ideas together.
            </p>
            <Link to="/artikel" className={styles.darkLink}>
              LEARN MORE <span className={styles.arrow}>→</span>
            </Link>
          </div>
          <div className={styles.aboutImageWrap}>
            <img
              src="https://picsum.photos/seed/coffeeabout/600/700"
              alt="Inside the SQL cafe"
              className={styles.aboutImage}
            />
          </div>
        </div>
      </motion.section>

      {/* MENU HIGHLIGHTS */}
      <section id="menu" className={styles.menu}>
        <div className={styles.menuInner}>
          <motion.div
            className={styles.menuHeader}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div>
              <span className={styles.label}>OUR SIGNATURE</span>
              <h2 className={styles.sectionHeading}>Menu Highlights</h2>
            </div>
            <Link to="/menu" className={styles.darkLink}>
              VIEW ALL MENU <span className={styles.arrow}>→</span>
            </Link>
          </motion.div>

          <motion.div
            className={styles.cardGrid}
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {featuredProducts.map((product) => (
              <motion.article
                key={product.id}
                className={styles.productCard}
                variants={cardItem}
              >
                <div className={styles.productImageWrap}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.productImage}
                  />
                </div>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productDesc}>{product.description}</p>
                <span className={styles.productPrice}>
                  {formatRupiah(product.price)}
                </span>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* VISIT US */}
      <motion.section
        id="contact"
        className={styles.visit}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className={styles.visitImageWrap}>
          <img
            src="https://picsum.photos/seed/coffeevisit/700/600"
            alt="The SQL coffee shop interior"
            className={styles.visitImage}
          />
        </div>
        <div className={styles.visitText}>
          <span className={styles.label}>VISIT US</span>
          <h2 className={styles.sectionHeading}>
            A Space to Think, A Space to Feel
          </h2>
          <p className={styles.bodyText}>
            Come by, enjoy a cup, and stay awhile.
          </p>
          <ul className={styles.infoList}>
            <li className={styles.infoItem}>
              <PinIcon />
              <span>Jl. Ide Lama No. 21, Jakarta, Indonesia</span>
            </li>
            <li className={styles.infoItem}>
              <ClockIcon />
              <span>Mon – Sun, 08.00 – 22.00</span>
            </li>
          </ul>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noreferrer"
            className={styles.ctaBtn}
          >
            GET DIRECTION <span className={styles.arrow}>→</span>
          </a>
        </div>
      </motion.section>

      {/* JOURNAL */}
      <section className={styles.journal}>
        <div className={styles.journalInner}>
          <motion.div
            className={styles.menuHeader}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div>
              <span className={styles.label}>FROM OUR JOURNAL</span>
              <h2 className={styles.sectionHeading}>Thoughts, Stories & More</h2>
            </div>
            <Link to="/artikel" className={styles.darkLink}>
              VIEW ALL ARTICLES <span className={styles.arrow}>→</span>
            </Link>
          </motion.div>

          <motion.div
            className={styles.cardGrid}
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {featuredArticles.map((article) => (
              <motion.article
                key={article.id}
                className={styles.articleCard}
                variants={cardItem}
              >
                <Link
                  to={`/artikel/${article.id}`}
                  className={styles.articleLink}
                >
                  <div className={styles.articleImageWrap}>
                    <img
                      src={article.image}
                      alt={article.title}
                      className={styles.articleImage}
                    />
                  </div>
                  <span className={styles.articleDate}>
                    {formatDate(article.date)}
                  </span>
                  <h3 className={styles.articleTitle}>{article.title}</h3>
                  <p className={styles.articleExcerpt}>{article.excerpt}</p>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
