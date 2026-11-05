import * as motion from "motion/react-client";

export function PageHeading({ title }: { title: string }) {
  return (
    <motion.h1
      className="page-heading"
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {title}
    </motion.h1>
  );
}
