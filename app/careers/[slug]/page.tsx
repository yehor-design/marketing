import { notFound } from "next/navigation";
import { PageHeading } from "@/components/page-heading";
import { careerSlugs, titleFromSlug } from "@/lib/routes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return careerSlugs.map((slug) => ({ slug }));
}

export default async function CareerPage({ params }: PageProps) {
  const { slug } = await params;
  if (!(careerSlugs as readonly string[]).includes(slug)) {
    notFound();
  }

  return <PageHeading title={titleFromSlug(slug)} />;
}
