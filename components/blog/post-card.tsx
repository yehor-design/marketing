"use client";

import Link from "next/link";
import { DitherImage } from "@/components/home/dither-image";
import { orderedDither } from "@/components/motion";
import type { Post } from "@/lib/blog";
import styles from "@/components/blog/blog.module.css";

const coverDither = {
  ...orderedDither,
  brightness: 4,
  pixelSize: 6,
  threshold: 136,
  midtones: 42,
};

export function CoverImage({
  src,
  label,
  decorative = false,
}: {
  src: string;
  label: string;
  decorative?: boolean;
}) {
  return (
    <span className={styles.art} aria-hidden={decorative || undefined}>
      <DitherImage src={src} label={decorative ? "" : label} preset={coverDither} />
    </span>
  );
}

export function PostCard({
  post,
  variant,
}: {
  post: Post;
  variant: "feature" | "small";
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={variant === "feature" ? styles.feature : styles.small}
    >
      <CoverImage src={post.image} label={post.imageAlt} decorative />
      <span className={styles.copy}>
        <span className={styles.tag}>{post.category}</span>
        <h3>{post.title}</h3>
        {variant === "feature" ? <p className={styles.desc}>{post.description}</p> : null}
        <time className={styles.date} dateTime={post.dateTime}>
          {post.date}
        </time>
      </span>
    </Link>
  );
}
