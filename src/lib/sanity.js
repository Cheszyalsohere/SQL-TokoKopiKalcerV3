import { createClient } from '@sanity/client';

// Read config from environment (.env). These VITE_ vars are safe to expose —
// projectId & dataset are public information for a Sanity read-only client.
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

// When no projectId is set, the app falls back to local dummyData.
export const isSanityConfigured = Boolean(projectId);

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: true,
    })
  : null;

// GROQ query — maps Sanity "article" documents to the shape the app already uses
// ({ id, title, excerpt, content, category, date, image }).
const ARTICLES_QUERY = `*[_type == "article"] | order(date desc) {
  "id": id,
  title,
  excerpt,
  "content": body,
  category,
  "date": date,
  image
}`;

export async function fetchArticles() {
  if (!sanityClient) return null;
  try {
    const data = await sanityClient.fetch(ARTICLES_QUERY);
    if (!Array.isArray(data)) return null;
    // Only keep docs that have the numeric id used for routing.
    return data.filter((a) => a && a.id != null);
  } catch (err) {
    console.error('Sanity fetch failed, falling back to local data:', err);
    return null;
  }
}
