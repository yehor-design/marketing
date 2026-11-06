"use client";

import Link from "next/link";
import { useState } from "react";
import { DitherImage } from "@/components/home/dither-image";
import { orderedDither } from "@/components/motion";
import type { Post } from "@/lib/blog";
import styles from "@/components/blog/blog.module.css";

const coverDither = {
  ...orderedDither,
  animation: false,
  brightness: -46,
  pixelSize: 2,
  threshold: 116,
  midtones: 56,
  glow: 2,
};

export function CoverImage({
  src,
  label,
  decorative = false,
  pixelSize = coverDither.pixelSize,
  hot = false,
}: {
  src: string;
  label: string;
  decorative?: boolean;
  pixelSize?: number;
  hot?: boolean;
}) {
  return (
    <span className={styles.art} aria-hidden={decorative || undefined}>
      <DitherImage
        src={src}
        label={decorative ? "" : label}
        preset={{
          ...coverDither,
          pixelSize,
          animation: hot,
          intensity: 10,
          interval: 0.08,
        }}
      />
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
  const [hot, setHot] = useState(false);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={variant === "feature" ? styles.feature : styles.small}
      onPointerEnter={() => setHot(true)}
      onPointerLeave={() => setHot(false)}
      onFocus={() => setHot(true)}
      onBlur={() => setHot(false)}
    >
      <CoverImage
        src={post.image}
        label={post.imageAlt}
        decorative
        pixelSize={variant === "feature" ? 1 : 2}
        hot={hot}
      />
      <span className={styles.copy}>
        <span className={styles.tagRow}>
          <span className={styles.tag}>{post.category}</span>
        </span>
        <span className={styles.text}>
          <h3>{post.title}</h3>
          {variant === "feature" ? <p className={styles.desc}>{post.description}</p> : null}
        </span>
        <time className={styles.date} dateTime={post.dateTime}>
          {post.date}
        </time>
      </span>
    </Link>
  );
}
