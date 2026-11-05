import { notFound } from "next/navigation";
import { PageHeading } from "@/components/page-heading";
import { updateSlugs, titleFromSlug } from "@/lib/routes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return updateSlugs.map((slug) => ({ slug }));
}

export default async function UpdatePage({ params }: PageProps) {
  const { slug } = await params;
  if (!(updateSlugs as readonly string[]).includes(slug)) {
    notFound();
  }

  return <PageHeading title={titleFromSlug(slug)} />;
}
