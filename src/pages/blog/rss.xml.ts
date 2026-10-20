import type { APIRoute } from 'astro';
import { getPublishedPosts, postPath } from '../../lib/blog';
import { site as profile } from '../../data/site';

function xml(value: string) {
  return value.replace(/[<>&"']/g, (character) => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
  })[character]!);
}

export const GET: APIRoute = async ({ site, url }) => {
  const origin = site ?? new URL('/', url);
  const posts = await getPublishedPosts();
  const items = posts.map((post) => {
    const link = new URL(postPath(post.id), origin).href;
    return `<item><title>${xml(post.data.title)}</title><link>${xml(link)}</link><guid isPermaLink="true">${xml(link)}</guid><description>${xml(post.data.description)}</description><pubDate>${post.data.publishedAt.toUTCString()}</pubDate></item>`;
  }).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${xml(profile.name)} — Writing</title><link>${xml(new URL('/blog/', origin).href)}</link><description>Research notes, experiments, and ideas.</description><language>en</language>${items}</channel></rss>`, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
};
