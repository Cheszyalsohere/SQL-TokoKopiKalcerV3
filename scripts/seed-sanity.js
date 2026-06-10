/**
 * Seed Sanity with the SQL Coffee articles.
 *
 * Uploads every article from src/data/dummyData.js into your Sanity dataset
 * as `article` documents — so you don't have to type them into the Studio.
 *
 * Usage (PowerShell, from the project root):
 *   $env:SANITY_PROJECT_ID="xxxxxx"
 *   $env:SANITY_TOKEN="your_editor_token"
 *   $env:SANITY_DATASET="production"   # optional, defaults to production
 *   npm run seed:sanity
 *
 * Get the token at sanity.io/manage -> your project -> API -> Tokens
 * (create one with "Editor" permission). The token is secret — don't commit it.
 */
import { createClient } from '@sanity/client';
import { articles } from '../src/data/dummyData.js';

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_TOKEN;

if (!projectId || !token) {
  console.error(
    '\n✖ Missing config. Please set SANITY_PROJECT_ID and SANITY_TOKEN env vars.\n' +
      '  See the comment at the top of scripts/seed-sanity.js for how.\n'
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

async function seed() {
  console.log(`\nSeeding ${articles.length} articles into "${dataset}" (${projectId})...\n`);

  const tx = client.transaction();
  for (const a of articles) {
    const doc = {
      _id: `article-${a.id}`, // deterministic id -> re-running updates instead of duplicating
      _type: 'article',
      id: a.id,
      title: a.title,
      excerpt: a.excerpt,
      body: a.content,
      category: a.category,
      date: a.date,
      image: a.image,
    };
    tx.createOrReplace(doc);
    console.log(`  • #${a.id}  ${a.title}`);
  }

  await tx.commit();
  console.log(`\n✓ Done. ${articles.length} articles are now in Sanity.\n`);
}

seed().catch((err) => {
  console.error('\n✖ Seeding failed:', err.message, '\n');
  process.exit(1);
});
