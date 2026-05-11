import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const products = await getCollection('products');
  const advantages = await getCollection('advantages');

  const SITE_URL = 'https://www.fuhaichun.cn';

  const items = [
    ...products.map(p => ({
      title: `${p.data.name} | 福海醇青稞酒`,
      pubDate: new Date(),
      description: `${p.data.name}是福海醇酒业的${p.data.series}产品之一，传承西藏传统酿酒工艺，精选雪域高原优质青稞，口感醇厚柔和。`,
      link: `/product/${p.id}/`,
    })),
    ...advantages.map(a => ({
      title: `核心优势：${a.data.title}`,
      pubDate: new Date(),
      description: a.data.subtitle,
      link: `/advantage/${a.id}/`,
    })),
  ];

  return rss({
    title: '西藏福海醇酒业有限公司 | 福海醇青稞酒',
    description: '西藏传统酿酒工艺，结合现代技术，酿造口感醇正的青稞白酒。提供青稞酒贴牌、加盟、定制、OEM服务。',
    site: SITE_URL,
    items,
  });
}
