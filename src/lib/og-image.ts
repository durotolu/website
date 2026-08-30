import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

const require = createRequire(import.meta.url);

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

export type OgImageInput = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function generatedOgPath(canonicalPath: string): string {
  const normalized = canonicalPath.replace(/\/+$/, "") || "/";
  if (normalized === "/") return "/og.png";
  return `/og${normalized}.png`;
}

let fontsPromise: Promise<
  { name: string; data: Buffer; weight: 400; style: "normal" }[]
> | null = null;

async function loadFonts() {
  fontsPromise ??= Promise.all([
    readFile(
      require.resolve(
        "@fontsource/source-serif-4/files/source-serif-4-latin-400-normal.woff",
      ),
    ),
    readFile(
      require.resolve(
        "@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff",
      ),
    ),
  ]).then(([serif, mono]) => [
    {
      name: "Source Serif 4",
      data: serif,
      weight: 400 as const,
      style: "normal",
    },
    {
      name: "IBM Plex Mono",
      data: mono,
      weight: 400 as const,
      style: "normal",
    },
  ]);
  return fontsPromise;
}

export async function renderOgPng(input: OgImageInput): Promise<Uint8Array> {
  const fonts = await loadFonts();
  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f6f3ee",
          color: "#1c1916",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                width: 8,
                height: "100%",
                background: "#8f3d2c",
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flex: 1,
                padding: "72px 80px 64px 72px",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      flexDirection: "column",
                    },
                    children: [
                      input.eyebrow
                        ? {
                            type: "div",
                            props: {
                              style: {
                                fontFamily: "IBM Plex Mono",
                                fontSize: 22,
                                letterSpacing: "0.16em",
                                textTransform: "uppercase",
                                color: "#8f3d2c",
                                marginBottom: 28,
                              },
                              children: input.eyebrow,
                            },
                          }
                        : null,
                      {
                        type: "div",
                        props: {
                          style: {
                            fontFamily: "Source Serif 4",
                            fontSize: input.title.length > 70 ? 48 : 60,
                            lineHeight: 1.15,
                            letterSpacing: "-0.02em",
                          },
                          children: input.title,
                        },
                      },
                      {
                        type: "div",
                        props: {
                          style: {
                            marginTop: 28,
                            fontFamily: "IBM Plex Mono",
                            fontSize: 26,
                            lineHeight: 1.4,
                            color: "#5f5850",
                            maxWidth: 980,
                          },
                          children: input.description,
                        },
                      },
                    ].filter(Boolean),
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontFamily: "IBM Plex Mono",
                      fontSize: 20,
                      color: "#8a8278",
                    },
                    children: "modurotolu.com",
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      fonts,
    },
  );

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: OG_WIDTH },
  });
  return resvg.render().asPng();
}

export function pngResponse(png: Uint8Array) {
  return new Response(Buffer.from(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
