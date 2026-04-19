import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

// 1. Updated Query: Fetching tags with their titles and slugs
async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    mainImage {
      asset->
    },
    publishedAt,
    "author": authors[0]->{name, image},
    "tags": tags[]->{title, "slug": slug.current},
    content
  }`;
  return await client.fetch(query, { slug });
}

export default async function PostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return (
      <div className="py-20 text-center font-serif">
        <h1 className="text-2xl">Post not found.</h1>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-20">
      <header className="mb-12">
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
          {post.title}
        </h1>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-8">
          <div className="flex items-center gap-4">
            {post.author?.image && (
               <div className="w-12 h-12 rounded-full overflow-hidden relative border border-gray-100">
                  <Image 
                    src={urlFor(post.author.image).width(100).url()} 
                    alt={post.author.name || "Author"} 
                    fill 
                    className="object-cover"
                  />
               </div>
            )}
            <div>
              <p className="font-bold text-lg">{post.author?.name || "Editorial Staff"}</p>
              <p className="text-gray-500 text-sm">
                {post.publishedAt 
                  ? new Date(post.publishedAt).toLocaleDateString('en-US', { dateStyle: 'long' })
                  : "Recently Published"}
              </p>
            </div>
          </div>

          {/* TOPIC TAGS BAR */}
          <div className="flex flex-wrap gap-2">
            {post.tags?.map((tag: any) => (
              <Link 
                key={tag.slug} 
                href={`/tag/${tag.slug}`}
                className="px-3 py-1 bg-white-100 hover:bg-red-600 hover:text-black transition-all duration-300 rounded-md text-[10px] font-black uppercase tracking-tighter border border-gray-200"
              >
                {tag.title}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {post.mainImage?.asset && (
        <div className="relative aspect-video mb-12 rounded-2xl overflow-hidden shadow-xl bg-gray-100">
          <Image
            src={urlFor(post.mainImage).width(1200).url()}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="prose prose-lg prose-red max-w-none font-serif leading-relaxed">
        <PortableText value={post.content} components={ptComponents} />
      </div>
    </article>
  );
}

const ptComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-10 relative aspect-video w-full overflow-hidden rounded-xl">
        <Image
          src={urlFor(value).width(1000).url()}
          alt="Article imagery"
          fill
          className="object-cover"
        />
      </div>
    ),
    audioFile: ({ value }: any) => {
      const fileAsset = value?.file?.asset?._ref;
      if (!fileAsset) return null;

      const [,, id, extension] = fileAsset.split('-');
      const audioUrl = `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${id}.${extension}`;

      return (
        <div className="my-8 p-6 bg-black text-white rounded-2xl border border-white/10 shadow-lg">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-red-500">
            Exclusive Audio Content
          </p>
          <audio controls className="w-full invert">
            <source src={audioUrl} type="audio/mpeg" />
          </audio>
          {value.caption && (
            <p className="mt-3 text-sm text-gray-400 italic font-serif">— {value.caption}</p>
          )}
        </div>
      );
    },
  },
};