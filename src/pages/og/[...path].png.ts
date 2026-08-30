import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { siteConfig } from "../../config";
import { isExternalWriting, isPublished } from "../../lib/content";
import {
  pngResponse,
  renderOgPng,
  type OgImageInput,
} from "../../lib/og-image";

export async function getStaticPaths() {
  const [writing, notes, projects, lab] = await Promise.all([
    getCollection("writing", isPublished),
    getCollection("notes", isPublished),
    getCollection("projects", isPublished),
    getCollection("lab", isPublished),
  ]);

  const pages: { params: { path: string }; props: OgImageInput }[] = [
    {
      params: { path: "about" },
      props: {
        eyebrow: "About",
        title: siteConfig.name,
        description: siteConfig.tagline,
      },
    },
    {
      params: { path: "now" },
      props: {
        eyebrow: "Now",
        title: "Currently",
        description: "What I am building, learning, exploring, and reading.",
      },
    },
    {
      params: { path: "writing" },
      props: {
        eyebrow: "Archive",
        title: "Writing",
        description:
          "Essays and technical writing — some published here, some elsewhere.",
      },
    },
    {
      params: { path: "notes" },
      props: {
        eyebrow: "Notes",
        title: "Notes",
        description: "Short observations, questions, and working notes.",
      },
    },
    {
      params: { path: "projects" },
      props: {
        eyebrow: "Projects",
        title: "Projects",
        description: "Selected work, described without résumé padding.",
      },
    },
    {
      params: { path: "lab" },
      props: {
        eyebrow: "Lab",
        title: "Lab",
        description: "Experiments, prototypes, and questions I wanted to try.",
      },
    },
  ];

  for (const entry of writing.filter((entry) => !isExternalWriting(entry))) {
    pages.push({
      params: { path: `writing/${entry.id}` },
      props: {
        eyebrow: "Writing",
        title: entry.data.title,
        description: entry.data.description,
      },
    });
  }

  for (const entry of notes) {
    pages.push({
      params: { path: `notes/${entry.id}` },
      props: {
        eyebrow: "Notes",
        title: entry.data.title,
        description: entry.data.description,
      },
    });
  }

  for (const entry of projects) {
    pages.push({
      params: { path: `projects/${entry.id}` },
      props: {
        eyebrow: "Projects",
        title: entry.data.title,
        description: entry.data.description,
      },
    });
  }

  for (const entry of lab) {
    pages.push({
      params: { path: `lab/${entry.id}` },
      props: {
        eyebrow: "Lab",
        title: entry.data.title,
        description: entry.data.description,
      },
    });
  }

  return pages;
}

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgPng(props as OgImageInput);
  return pngResponse(png);
};
