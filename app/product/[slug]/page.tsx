//a page component that takes a slug
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";

import { WatchProductPage } from "@/components/product-page";
import { auth } from "@/lib/auth";
import { getProductBySlug } from "@/services/products";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage(props: PageProps) {
  const params = await props.params;

  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session) {
    redirect("/login");
  }

  // In a real app, you would fetch product data based on the slug
  // For now, we'll just render the reviews section
  if (!params.slug) {
    notFound();
  }

  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <main>
      <WatchProductPage clientId={session.user.id} product={product} />
    </main>
  );
}
