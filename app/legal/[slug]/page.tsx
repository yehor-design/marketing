import { notFound } from "next/navigation";
import { PageHeading } from "@/components/page-heading";
import { legalSlugs, titleFromSlug } from "@/lib/routes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return legalSlugs.map((slug) => ({ slug }));
}

export default async function LegalPage({ params }: PageProps) {
  const { slug } = await params;
  if (!(legalSlugs as readonly string[]).includes(slug)) {
    notFound();
  }

  return <PageHeading title={titleFromSlug(slug)} />;
}
