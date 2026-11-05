"use client";

import Link from "next/link";
import { useState } from "react";
import { RollingText } from "@/components/motion";
import styles from "@/components/updates/updates.module.css";

const NBSP = "\u00A0";

export function JoinButton() {
  const [rolling, setRolling] = useState(false);

  return (
    <Link
      href="/waitlist"
      className={styles.button}
      onPointerEnter={() => setRolling(true)}
      onPointerLeave={() => setRolling(false)}
      onFocus={() => setRolling(true)}
      onBlur={() => setRolling(false)}
    >
      <RollingText text={`Join${NBSP}waitlist`} rolling={rolling} />
    </Link>
  );
}
