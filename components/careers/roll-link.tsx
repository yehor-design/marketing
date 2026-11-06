"use client";

import Link from "next/link";
import { useState } from "react";
import { RollingText } from "@/components/motion";
import { GrayRing } from "@/components/motion/gray-ring";

export function RollLink({
  href,
  text,
  className,
}: {
  href: string;
  text: string;
  className: string;
}) {
  const [rolling, setRolling] = useState(false);

  return (
    <Link
      href={href}
      className={className}
      onPointerEnter={() => setRolling(true)}
      onPointerLeave={() => setRolling(false)}
      onFocus={() => setRolling(true)}
      onBlur={() => setRolling(false)}
    >
      <RollingText text={text} rolling={rolling} />
      {className.includes("gray-pill") ? <GrayRing /> : null}
    </Link>
  );
}

export function RollSubmit({
  text,
  className,
}: {
  text: string;
  className: string;
}) {
  const [rolling, setRolling] = useState(false);

  return (
    <button
      type="submit"
      className={className}
      onPointerEnter={() => setRolling(true)}
      onPointerLeave={() => setRolling(false)}
      onFocus={() => setRolling(true)}
      onBlur={() => setRolling(false)}
    >
      <RollingText text={text} rolling={rolling} />
    </button>
  );
}
