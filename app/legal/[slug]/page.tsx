import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal/legal-page";
import { getLegal, legalDocuments } from "@/lib/legal";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return legalDocuments.map((document) => ({ slug: document.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const document = getLegal(slug);
  if (!document) {
    return {};
  }

  return {
    title: document.title,
    description: document.description,
    alternates: {
      canonical: document.canonical,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const document = getLegal(slug);
  if (!document) {
    notFound();
  }

  return <LegalPage doc={document} />;
}
