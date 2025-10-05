import { useRouter } from "next/router";

import { Fact as FactComponent } from "@/components/Fact";
import { mockFacts } from "../../mocks/mock-facts";

export default function Fact() {
	const router = useRouter();
	const { slug } = router.query;
	const key = slug && Array.isArray(slug) ? slug[0] : slug;

	const { title, description } = key && mockFacts[key] || mockFacts['default'];

  return (
    <FactComponent title={title} description={description} />
  )
}
