import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const SITE_URL = 'https://www.fuhaichun.cn';
  
  const products = await getCollection('products');
  const advantages = await getCollection('advantages');

  const staticPages = [
    { path: '/', changefreq: 'daily', priority: '1.0' },
    { path: '/about/', changefreq: 'monthly', priority: '0.8' },
    { path: '/products/', changefreq: 'weekly', priority: '0.9' },
    { path: '/advantages/', changefreq: 'monthly', priority: '0.8' },
  ];

  const productUrls = products.map(p => ({
    path: `/product/${p.id}/`,
    changefreq: 'weekly' as const,
    priority: '0.7',
  }));

  const advantageUrls = advantages.map(a => ({
    path: `/advantage/${a.id}/`,
    changefreq: 'monthly' as const,
    priority: '0.6',
  }));

  const allPages = [...staticPages, ...productUrls, ...advantageUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
