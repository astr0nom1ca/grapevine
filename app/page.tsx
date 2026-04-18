import { client } from "@/sanity/lib/client";
import Jumbotron from "@/components/Jumbotron";
import LatestPosts from "@/components/LatestPosts";

async function getPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    isFeatured,
    category,
    "authorName": authors[0]->name,
    mainImage{
    asset->
    },
    publishedAt
  }`
  return await client.fetch(query, {}, { next: { revalidate: 60 } })
}

export default async function Home() {
  const posts = await getPosts();
  
  const featured = posts.filter((p: any) => p.isFeatured);
  const regular = posts.filter((p: any) => !p.isFeatured);

  return (
    <main className="w-full">
      <Jumbotron posts={featured} />
      <LatestPosts posts={regular} />
    </main>
  );
}