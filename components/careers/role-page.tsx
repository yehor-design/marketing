"use client";

import Link from "next/link";
import { ApplyForm } from "@/components/careers/apply-form";
import { BenefitIcon, Chevron } from "@/components/careers/icons";
import { RollLink } from "@/components/careers/roll-link";
import { CornerMarks } from "@/components/motion/corner-marks";
import { benefits, type CareerRole } from "@/lib/careers";
import styles from "@/components/careers/careers.module.css";

const NBSP = "\u00A0";

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className={styles.bullets}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function RolePage({ role }: { role: CareerRole }) {
  return (
    <article className={styles.careers}>
      <header className={styles.frame}>
        <div className={styles.roleHead}>
          <div className={styles.roleIdentity}>
            <Link className={styles.back} href="/careers#open-roles">
              <Chevron direction="left" />
              Back
            </Link>
            <div className={styles.roleHeading}>
            <h1>{role.title}</h1>
            <p className={styles.slash} aria-hidden="true">
              /
            </p>
            <p className={styles.department}>{role.department}</p>
            <p className={styles.pill}>{role.location}</p>
            </div>
          </div>
          <div className={styles.roleLead}>
            <p>{role.summary}</p>
            <RollLink
              href={`/careers/${role.slug}#application`}
              text={`Apply${NBSP}now`}
              className={styles.buttonPrimary}
            />
          </div>
        </div>
      </header>

      <section className={`${styles.frame} ${styles.section}`} aria-labelledby="duties-title">
        <div className={styles.details}>
          <div className={styles.detailMain}>
            <div>
              <h2 id="duties-title">What you'll do</h2>
              <BulletList items={role.duties} />
            </div>
            <div>
              <h2>Who you are</h2>
              <BulletList items={role.requirements} />
            </div>
            <div>
              <h2>What we offer</h2>
              <BulletList items={role.offer} />
            </div>
          </div>
          <div className={styles.perkColumn}>
            <h2>Benefits</h2>
            <ul className={styles.perks}>
              {benefits.map((benefit) => (
                <li key={benefit.title} className="corner-host">
                  <CornerMarks />
                  <BenefitIcon name={benefit.icon} />
                  <div>
                    <h3>{benefit.title}</h3>
                    <div className={styles.perkReveal}>
                      <p>{benefit.body}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        className={`${styles.frame} ${styles.section} ${styles.applySection}`}
        id="application"
        aria-labelledby="apply-title"
      >
        <div className={styles.apply}>
          <h2 id="apply-title">Apply for this job.</h2>
          <ApplyForm title={role.title} slug={role.slug} />
        </div>
      </section>
    </article>
  );
}
