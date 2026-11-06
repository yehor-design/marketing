import Link from "next/link";
import { GodRays } from "@/components/motion";
import { JoinButton } from "@/components/updates/join-button";
import { UpdateCover, VideoCover } from "@/components/updates/media";
import { updates, type UpdateNote } from "@/lib/updates";
import styles from "@/components/updates/updates.module.css";

function Cover({ note }: { note: UpdateNote }) {
  if (note.videoId && note.poster) {
    return <VideoCover videoId={note.videoId} poster={note.poster} />;
  }
  return (
    <UpdateCover
      src={note.image ?? ""}
      alt={note.imageAlt ?? note.title}
      fallback={note.socialImage}
    />
  );
}

function ItemText({ text }: { text: string }) {
  const lines = text.split("\n");
  if (lines.length === 1) return text;
  return lines.map((line, index) =>
    index === 0 ? (
      line
    ) : (
      <span key={index}>
        <br />
        {line}
      </span>
    ),
  );
}

function Body({ note }: { note: UpdateNote }) {
  return (
    <div className={styles.detail}>
      <Cover note={note} />
      <div className={styles.copy}>
        <p className={styles.lead}>{note.description}</p>
        <div className={styles.sections}>
          {note.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              <ul>
                {section.items.map((item) => (
                  <li key={item}>
                    <ItemText text={item} />
                  </li>
                ))}
              </ul>
              {note.slug === "march-momentum-update" && section.heading === "Fixed" ? (
                <p className={styles.blankLine}> </p>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

function BackIcon() {
  return (
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
  );
}

export function UpdatesIndex() {
  return (
    <div className={styles.updates}>
      <div className={styles.sheet}>
        <header className={styles.pageHead}>
          <h1>Updates</h1>
        </header>
        {updates.map((note) => (
          <article key={note.slug} className={styles.item}>
            <div className={styles.side}>
              <Link href={`/updates/${note.slug}`} className={styles.sideLink}>
                <h1>{note.title}</h1>
                <time dateTime={note.dateTime}>{note.date}</time>
              </Link>
            </div>
            <Body note={note} />
          </article>
        ))}
      </div>
    </div>
  );
}

export function UpdateArticle({ note }: { note: UpdateNote }) {
  return (
    <div className={styles.updates}>
      <article className={styles.sheet}>
        <div className={styles.crumb}>
          <Link href="/updates" className={styles.back}>
            <BackIcon />
            Back
          </Link>
          <time dateTime={note.dateTime}>{note.date}</time>
        </div>
        <div className={styles.item}>
          <div className={styles.side}>
            <div className={styles.sideLink}>
              <h1>{note.title}</h1>
            </div>
          </div>
          <Body note={note} />
        </div>
      </article>
      <section className={styles.cta} aria-labelledby="updates-cta">
        <div className={styles.ctaMedia} aria-hidden="true">
          <GodRays
            label=""
            shader
            speed={5}
            spotty={0.8}
            offsetY={0.54}
            density={1}
            centerIntensity={0.47}
            centerSize={0.8}
          />
          <div className={styles.grain} />
        </div>
        <div className={styles.ctaCopy}>
          <h2 id="updates-cta">Boost your site speed today.</h2>
          <p>Try Jet now—one click, instant performance. No risk, cancel anytime.</p>
          <JoinButton />
        </div>
      </section>
    </div>
  );
}
