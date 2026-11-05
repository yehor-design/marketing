import { notFound } from "next/navigation";
import { PageHeading } from "@/components/page-heading";
import { blogSlugs, titleFromSlug } from "@/lib/routes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }));
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  if (!(blogSlugs as readonly string[]).includes(slug)) {
    notFound();
  }

  return <PageHeading title={titleFromSlug(slug)} />;
}
