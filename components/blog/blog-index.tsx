"use client";

import { useState } from "react";
import { RollingText } from "@/components/motion";
import { GrayRing } from "@/components/motion/gray-ring";
import { blogCategories, posts } from "@/lib/blog";
import { PostCard } from "@/components/blog/post-card";
import styles from "@/components/blog/blog.module.css";

const PAGE_SIZE = 2;
const NBSP = "\u00A0";

export function BlogIndex() {
  const [category, setCategory] = useState<(typeof blogCategories)[number]>("All");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [rolling, setRolling] = useState(false);
  const filtered = category === "All" ? posts : posts.filter((post) => post.category === category);
  const featured = posts.slice(0, 3);

  return (
    <div className={styles.blog}>
      <div className={`${styles.column} ${styles.index}`}>
        <div className={styles.kicker}>
          <h1>Blog</h1>
          <span aria-hidden="true">/</span>
          <h2>Featured</h2>
        </div>
        <div className={styles.featureGrid}>
          <PostCard post={featured[0]} variant="feature" />
          <PostCard post={featured[1]} variant="small" />
          <PostCard post={featured[2]} variant="small" />
        </div>
      </div>

      <section className={`${styles.column} ${styles.all}`} aria-labelledby="all-posts">
        <div className={styles.allHead}>
          <h2 id="all-posts">All posts</h2>
          <div className={styles.filters} role="group" aria-label="Post categories">
            {blogCategories.map((item) => (
              <button
                key={item}
                type="button"
                className={styles.filter}
                aria-pressed={item === category}
                onClick={() => {
                  setCategory(item);
                  setVisible(PAGE_SIZE);
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <ul className={styles.grid}>
          {filtered.map((post, index) => (
            <li key={post.slug} hidden={index >= visible}>
              <PostCard post={post} variant="small" />
            </li>
          ))}
        </ul>
        {visible < filtered.length ? (
          <div className={styles.more}>
            <button
              type="button"
              className={`${styles.moreButton} gray-pill`}
              onClick={() => setVisible((count) => count + PAGE_SIZE)}
              onPointerEnter={() => setRolling(true)}
              onPointerLeave={() => setRolling(false)}
              onFocus={() => setRolling(true)}
              onBlur={() => setRolling(false)}
            >
              <RollingText text={`Load${NBSP}more`} rolling={rolling} />
              <GrayRing />
            </button>
          </div>
        ) : null}
      </section>
    </div>
  );
}
