import { notFound } from "next/navigation";
import { ActiveLabClient } from "@/components/ActiveLabClient";
import { LAB_CATALOG } from "@/lib/lab-data";

export function generateStaticParams() {
  return LAB_CATALOG.filter((lab) => lab.status !== "locked").map((lab) => ({
    slug: lab.slug,
  }));
}

export default async function LabDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lab = LAB_CATALOG.find((item) => item.slug === slug);

  if (!lab || lab.status === "locked") {
    notFound();
  }

  return <ActiveLabClient lab={lab} />;
}

