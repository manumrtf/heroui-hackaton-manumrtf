import { products } from "@/data/products";
import { reviews } from "@/data/reviews";

//In a real example, you might want to use a database

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductReviews(slug: string) {
  return reviews.filter((review) => review.productSlug === slug);
}
