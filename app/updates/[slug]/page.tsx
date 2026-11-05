import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UpdateArticle } from "@/components/updates/changelog";
import { getUpdate, updates } from "@/lib/updates";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return updates.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getUpdate(slug);
  if (!note) {
    return {};
  }

  return {
    title: note.title,
    description: note.description,
    alternates: {
      canonical: `https://jet.framer.website/updates/${note.slug}`,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const note = getUpdate(slug);
  if (!note) {
    notFound();
  }

  return <UpdateArticle note={note} />;
}
