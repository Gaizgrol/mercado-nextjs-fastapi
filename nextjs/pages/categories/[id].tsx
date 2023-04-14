import { useRouter } from "next/router";

export default function CategoryDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  return <div>Detalhes categoria {id}</div>;
}
