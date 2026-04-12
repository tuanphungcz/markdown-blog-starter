import { createFileRoute } from "@tanstack/react-router";
import { siteConfig } from "@config";
import { getPost, formatDate } from "@/lib/posts";
import { generateOgImage } from "@/lib/og";
import type { OgImageOptions } from "@/lib/og";

const IMAGE_CONTENT_TYPE = "image/png";
const ERROR_CONTENT_TYPE = "text/plain; charset=utf-8";

function resolveOgImageOptions(slug: string): OgImageOptions | null {
  if (slug === "home") {
    return {
      title: siteConfig.title,
      description: siteConfig.description,
      siteUrl: siteConfig.url,
    };
  }

  const post = getPost(slug);
  if (!post) {
    return null;
  }

  return {
    title: post.title,
    date: formatDate(post.publishedAt),
    readingTime: post.readingTime,
    tags: post.tags,
    siteUrl: siteConfig.url,
  };
}

function getOgCacheControl(request: Request): string {
  const hasVersion = new URL(request.url).searchParams.has("v");

  return hasVersion
    ? "public, max-age=31536000, immutable"
    : "public, max-age=3600";
}

function createImageHeaders(request: Request): HeadersInit {
  return {
    "Content-Type": IMAGE_CONTENT_TYPE,
    "Cache-Control": getOgCacheControl(request),
  };
}

async function handleOgRequest({
  request,
  params,
  method,
}: {
  request: Request;
  params: { slug: string };
  method: "GET" | "HEAD";
}) {
  try {
    const options = resolveOgImageOptions(params.slug);

    if (!options) {
      return new Response("Not found", { status: 404 });
    }

    const headers = createImageHeaders(request);

    if (method === "HEAD") {
      return new Response(null, { headers });
    }

    const png = await generateOgImage(options);

    return new Response(png, { headers });
  } catch (error) {
    console.error(`Failed to generate OG image for "${params.slug}"`, error);

    return new Response("Failed to generate OG image", {
      status: 500,
      headers: {
        "Content-Type": ERROR_CONTENT_TYPE,
        "Cache-Control": "no-store",
      },
    });
  }
}

export const Route = createFileRoute("/og/$slug")({
  server: {
    handlers: {
      GET: ({
        request,
        params,
      }: {
        request: Request;
        params: { slug: string };
      }) => handleOgRequest({ request, params, method: "GET" }),
      HEAD: ({
        request,
        params,
      }: {
        request: Request;
        params: { slug: string };
      }) => handleOgRequest({ request, params, method: "HEAD" }),
    },
  },
});
