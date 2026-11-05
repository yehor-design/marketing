import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RolePage } from "@/components/careers/role-page";
import { careers, getCareer } from "@/lib/careers";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return careers.map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const role = getCareer(slug);
  if (!role) {
    return {};
  }

  return {
    title: `${role.title} – ${role.department}`,
    description: role.summary,
    alternates: {
      canonical: `https://jet.framer.website/careers/${role.slug}`,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const role = getCareer(slug);
  if (!role) {
    notFound();
  }

  return <RolePage role={role} />;
}
