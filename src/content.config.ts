import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const products = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
    schema: z.object({
        name: z.string(),
        image: z.string().default(''),
        sort: z.number().default(99),
        series: z.string().default('福海醇系列'),
        price: z.number().default(888),
        alcohol: z.string().default(''),
        volume: z.string().default(''),
        aroma: z.string().default(''),
        origin: z.string().default(''),
        productType: z.string().default(''),
        description: z.string().default(''),
    }),
});

const advantages = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/advantages' }),
    schema: z.object({
        title: z.string(),
        image: z.string(),
        subtitle: z.string(),
        sort: z.number().default(99),
        icon: z.string().default(''),
    }),
});

export const collections = { products, advantages };
