"use client";

import Link from "next/link";
import { GodRays } from "@/components/motion";
import { BenefitIcon, Chevron } from "@/components/careers/icons";
import { RollLink } from "@/components/careers/roll-link";
import { benefits, careers } from "@/lib/careers";
import styles from "@/components/careers/careers.module.css";

const NBSP = "\u00A0";

export function CareersPage() {
  return (
    <div className={styles.careers}>
      <section className={styles.hero} aria-labelledby="careers-title">
        <div className={styles.band} aria-hidden="true">
          <div className={styles.bandRays}>
            <GodRays
              label=""
              shader
              speed={5}
              frequency={0.5}
              offsetY={0.96}
              spotty={0.05}
              density={0.87}
              centerIntensity={0}
              centerSize={1}
            />
            <div className={styles.grain} />
          </div>
        </div>
        <div className={styles.heroCopy}>
          <h1 id="careers-title">Build a faster web for everyone</h1>
          <p>
            At Jet, we’re on a mission to make the web lightning fast and accessible. We
            believe that every millisecond counts, and we’re building tools that empower
            creators, businesses, and agencies to deliver exceptional digital experiences,
            everywhere.
          </p>
          <div className={styles.actions}>
            <RollLink href="/careers#benefits" text="Company" className={styles.buttonPrimary} />
            <RollLink
              href="/careers#open-roles"
              text={`Open${NBSP}positions`}
              className={styles.buttonSecondary}
            />
          </div>
        </div>
        <div className={styles.band} aria-hidden="true">
          <div className={styles.bandRays}>
            <GodRays
              label=""
              shader
              speed={5}
              frequency={0.5}
              offsetY={0.96}
              spotty={0.05}
              density={0.87}
              centerIntensity={0}
              centerSize={1}
            />
            <div className={styles.grain} />
          </div>
        </div>
      </section>

      <section
        className={`${styles.frame} ${styles.benefits}`}
        id="benefits"
        aria-labelledby="benefits-title"
      >
        <div className={styles.benefitsHead}>
          <h2 id="benefits-title">What drives us.</h2>
          <p>
            <span className={styles.bright}>
              We move fast, optimize relentlessly, and always put the user first.
            </span>
            {
              " If you’re excited by performance, simplicity, and making a real impact on the web, you’ll thrive at Jet."
            }
          </p>
        </div>
        <ul className={styles.benefitGrid}>
          {benefits.map((benefit) => (
            <li key={benefit.title}>
              <BenefitIcon name={benefit.icon} />
              <div>
                <h3>{benefit.title}</h3>
                <div className={styles.benefitReveal}>
                  <p>{benefit.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.frame} id="open-roles" aria-labelledby="roles-title">
        <div className={styles.roles}>
          <div className={styles.rolesIntro}>
            <h2 id="roles-title">Open roles.</h2>
            <p>
              We’re always looking for talented people who care about speed, quality, and
              great user experiences.
            </p>
          </div>
          <ul className={styles.roleList}>
            {careers.map((role) => (
              <li key={role.slug}>
                <Link href={`/careers/${role.slug}`}>
                  <span className={styles.roleName}>
                    <span className={styles.roleTitle}>{role.title}</span>
                    <span aria-hidden="true">/</span>
                    <span className={styles.roleDept}>{role.department}</span>
                  </span>
                  <span className={styles.roleLocation}>{role.location}</span>
                  <span className={styles.roleArrow} aria-hidden="true">
                    <Chevron direction="right" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
