import type { LegalBlock, LegalDocument, RichText } from "@/lib/legal";
import styles from "@/components/legal/legal.module.css";

function Rich({ content }: { content: RichText[] }) {
  return content.map((part, index) =>
    "href" in part ? (
      <a key={index} href={part.href} rel="noopener">
        {part.text}
      </a>
    ) : (
      <span key={index}>{part.text}</span>
    ),
  );
}

function Blocks({ blocks }: { blocks: LegalBlock[] }) {
  return blocks.map((block, index) => {
    if (block.kind === "h2") {
      return <h2 key={index}>{block.text}</h2>;
    }
    if (block.kind === "list") {
      return (
        <ul key={index}>
          {block.items.map((item) => (
            <li key={item}>
              <p>{item}</p>
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={index}>
        <Rich content={block.content} />
      </p>
    );
  });
}

export function LegalPage({ doc }: { doc: LegalDocument }) {
  return (
    <article className={styles.legal}>
      <div className={styles.meta}>
        <div className={styles.version}>
          <p>Version</p>
          <p>{doc.version}</p>
        </div>
        <p className={styles.date}>{doc.date}</p>
      </div>
      <div className={styles.column}>
        <header className={styles.heading}>
          <div className={styles.headingRow}>
            <h1 className={styles.quiet}>Legal</h1>
            <div className={styles.name}>
              <h1 className={styles.quiet}>/</h1>
              <h1>{doc.heading}</h1>
            </div>
          </div>
        </header>
        <div className={styles.body}>
          <Blocks blocks={doc.blocks} />
        </div>
      </div>
    </article>
  );
}
