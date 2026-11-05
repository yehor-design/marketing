"use client";

import Link from "next/link";
import { useState } from "react";
import { GodRays, RollingText } from "@/components/motion";
import { getPost, posts, type Block, type Post } from "@/lib/blog";
import { CoverImage, PostCard } from "@/components/blog/post-card";
import styles from "@/components/blog/blog.module.css";

const NBSP = "\u00A0";

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className={styles.body}>
      {blocks.map((block, index) => {
        const key = `${block.kind}-${index}`;
        if (block.kind === "h2") {
          return <h2 key={key}>{block.text}</h2>;
        }
        if (block.kind === "h3") {
          return <h3 key={key}>{block.text}</h3>;
        }
        if (block.kind === "p") {
          return <p key={key}>{block.text}</p>;
        }
        if (block.kind === "quote") {
          return (
            <blockquote key={key} className={styles.quote}>
              <p>{block.text}</p>
            </blockquote>
          );
        }
        if (block.kind === "list") {
          return (
            <ul key={key}>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        if (block.kind === "table") {
          return (
            <div key={key} className={styles.tableWrap}>
              <table>
                <thead>
                  <tr>
                    {block.headers.map((header) => (
                      <th key={header} scope="col">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row) => (
                    <tr key={row.join("|")}>
                      {row.map((cell, cellIndex) => (
                        <td key={`${cell}-${cellIndex}`}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return (
          <div key={key} className={styles.code}>
            <pre>
              <code>{block.text}</code>
            </pre>
          </div>
        );
      })}
    </div>
  );
}

function RollLink({ href, text }: { href: string; text: string }) {
  const [rolling, setRolling] = useState(false);

  return (
    <Link
      href={href}
      className={styles.button}
      onPointerEnter={() => setRolling(true)}
      onPointerLeave={() => setRolling(false)}
      onFocus={() => setRolling(true)}
      onBlur={() => setRolling(false)}
    >
      <RollingText text={text} rolling={rolling} />
    </Link>
  );
}

export function ArticlePage({ slug }: { slug: string }) {
  const post = getPost(slug) as Post;
  const related = post.related.map((item) => posts.find((entry) => entry.slug === item) as Post);

  return (
    <article className={styles.blog}>
      <header className={styles.info}>
        <div className={styles.meta}>
          <Link href="/blog" className={styles.back}>
            <span className={styles.backIcon} aria-hidden="true">
              <svg viewBox="0 0 12 12" width="12" height="12">
                <path
                  d="M7.8 2.2 L4.2 6 L7.8 9.8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Back
          </Link>
          <span className={styles.category}>{post.category}</span>
          <time className={styles.metaDate} dateTime={post.dateTime}>
            {post.date}
          </time>
        </div>
        <CoverImage src={post.image} label={post.imageAlt} />
        <div className={styles.intro}>
          <h1>{post.title}</h1>
          <p className={styles.lede}>{post.description}</p>
          <ul className={styles.authors}>
            {post.authors.map((author) => (
              <li key={author.name} className={styles.author}>
                <img src={author.image} alt="" width={36} height={36} />
                <span>
                  <p className={styles.authorName}>{author.name}</p>
                  <p className={styles.authorRole}>{author.role}</p>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <section className={styles.content} aria-label="Article">
        <Blocks blocks={post.body} />
      </section>

      <section className={styles.relatedSection} aria-labelledby="read-more">
        <div className={styles.relatedHead}>
          <h2 id="read-more">Read more</h2>
          <Link href="/blog" className={styles.viewAll}>
            View all
            <span className={styles.viewIcon} aria-hidden="true">
              <svg viewBox="0 0 12 12" width="12" height="12">
                <path
                  d="M4.2 2.2 L7.8 6 L4.2 9.8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        </div>
        <ul className={styles.related}>
          {related.map((item) => (
            <li key={item.slug}>
              <PostCard post={item} variant="small" />
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.cta} aria-labelledby="blog-cta">
        <div className={styles.ctaMedia} aria-hidden="true">
          <GodRays label="" />
          <div className={styles.grain} />
        </div>
        <div className={styles.ctaCopy}>
          <h2 id="blog-cta">Boost your site speed today.</h2>
          <p>Try Jet now—one click, instant performance. No risk, cancel anytime.</p>
          <RollLink href="/waitlist" text={`Join${NBSP}waitlist`} />
        </div>
      </section>
    </article>
  );
}
