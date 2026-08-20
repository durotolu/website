import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const httpUrl = z.string().refine((value) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}, "Must be a valid http(s) URL");

const tags = z.array(z.string().min(1)).default([]);

const writing = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/writing" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags,
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    heroImage: z.string().nullable().optional(),
    heroImageAlt: z.string().optional(),
    externalUrl: httpUrl.optional(),
    venue: z.string().optional(),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/notes" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags,
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    status: z.enum(["active", "maintained", "archived", "complete"]),
    tags,
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    heroImage: z.string().nullable().optional(),
    heroImageAlt: z.string().optional(),
    githubUrl: httpUrl.optional(),
    liveUrl: httpUrl.optional(),
    relatedWriting: z.array(z.string()).optional(),
    problem: z.string().optional(),
    approach: z.string().optional(),
    architecture: z.string().optional(),
    implementation: z.string().optional(),
    results: z.string().optional(),
    lessons: z.string().optional(),
    next: z.string().optional(),
  }),
});

const lab = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/lab" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    status: z.enum(["exploring", "paused", "concluded"]),
    tags,
    draft: z.boolean().default(false),
    demoUrl: httpUrl.optional(),
    repoUrl: httpUrl.optional(),
    related: z.array(z.string()).optional(),
  }),
});

export const collections = { writing, notes, projects, lab };
