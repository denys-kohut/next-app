import { Fact as FactComponent } from "@/components/Fact";
import { mockFacts } from "@/mocks/mock-facts";

type PageProps = {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(mockFacts).map((key) => ({ slug: key }));
}

export default async function Fact({ params }: PageProps) {
  const { slug } = await params;
  // const key = slug && Array.isArray(slug) ? slug[0] : slug;

  const { title, description } = slug && mockFacts[slug] || mockFacts['default'];

  return (
    <FactComponent title={title} description={description} />
  )
}
