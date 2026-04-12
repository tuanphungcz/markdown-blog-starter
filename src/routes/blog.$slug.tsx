import { createFileRoute, Link } from "@tanstack/react-router";
import { siteConfig } from "@config";
import { getPost, getPosts } from "@/lib/posts";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) return {};
    return {
      meta: [
        { title: `${post.title} — ${siteConfig.title}` },
        { name: "description", content: post.summary },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.summary },
        { property: "og:type", content: "article" },
        {
          property: "article:published_time",
          content: new Date(post.date).toISOString(),
        },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.summary },
      ],
    };
  },
  component: BlogPost,
});

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function BlogPost() {
  const { slug } = Route.useParams();
  const post = getPost(slug);

  if (!post) {
    return (
      <div>
        <h1>Post not found</h1>
        <Link to="/">Go back home</Link>
      </div>
    );
  }

  const allPosts = getPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <article>
      {/* Header */}
      <header>
        <time>{formatDate(post.date)}</time>
        <h1>{post.title}</h1>
        {post.tags.length > 0 && (
          <div>
            {post.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}
      </header>

      {/* Content */}
      <div
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      {/* Footer: prev/next + back */}
      <footer>
        <div>
          {prevPost && (
            <div>
              <p>Previous</p>
              <Link to="/blog/$slug" params={{ slug: prevPost.slug }}>
                {prevPost.title}
              </Link>
            </div>
          )}
          {nextPost && (
            <div>
              <p>Next</p>
              <Link to="/blog/$slug" params={{ slug: nextPost.slug }}>
                {nextPost.title}
              </Link>
            </div>
          )}
        </div>
        <div>
          <Link to="/">← Back to blog</Link>
        </div>
      </footer>
    </article>
  );
}
