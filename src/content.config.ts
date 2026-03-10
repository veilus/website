import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        author: z.string().default('Veilus Team'),
        image: z.string().optional(),
        tags: z.array(z.string()).default([]),
        lang: z.enum(['en', 'vi']).default('en'),
        draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
