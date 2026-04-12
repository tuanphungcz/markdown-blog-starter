import { createFileRoute, Link } from "@tanstack/react-router";
import { siteConfig } from "@config";
import { getPosts } from "@/lib/posts";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function HomePage() {
  const posts = getPosts().slice(0, siteConfig.postsPerPage);

  return (
    <div>
      {/* Hero / About */}
      <div>
        <div>
          <h1>{siteConfig.name}</h1>
          <p>{siteConfig.tagline}</p>
        </div>
        <div>
          <p>{siteConfig.bio}</p>
        </div>
      </div>

      {/* Latest Writing */}
      <div>
        <h2>Latest Writing</h2>

        {posts.length === 0 ? (
          <p>
            No posts yet. Add your first post in <code>content/blog/</code>
          </p>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.slug}>
                <article>
                  <time>{formatDate(post.date)}</time>
                  <h3>
                    <Link to="/blog/$slug" params={{ slug: post.slug }}>
                      {post.title}
                    </Link>
                  </h3>
                  {post.tags.length > 0 && (
                    <div>
                      {post.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  )}
                  {post.summary && <p>{post.summary}</p>}
                  <Link to="/blog/$slug" params={{ slug: post.slug }}>
                    Read article →
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
