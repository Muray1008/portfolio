import type { GetStaticProps, NextPage } from "next";

import AppHead from "@/components/AppHead";
import SkipToMain from "@/components/SkipToMain";
import SocialLinks from "@/components/SocialLinks";
import BlogHeader from "@/components/blog/BlogHeader";
import Tag from "@/components/blog/Tag";
import Footer from "@/components/Footer";
import { getAllPosts } from "utils/api";

type Props = {
  tags: string[];
  tagCounts: { [key: string]: number };
};

const Blog: NextPage<Props> = ({ tags, tagCounts }) => {
  return (
    <>
      <AppHead
        title="Blog - Sat Naing"
        meta={{ description: "my blog desc" }}
      />
      <div className="bg-bglight dark:bg-bgdark min-h-screen">
        <div className="selection:bg-marrsgreen selection:text-bglight dark:selection:bg-carrigreen dark:selection:text-bgdark">
          <SkipToMain />
          <BlogHeader />
          <SocialLinks />
          <main id="main" className="mb-20 min-h-[65vh] md:min-h-[70vh]">
            <div className="mt-16 pt-8 pb-2 md:pt-16 px-4 sm:px-8 md:px-20 max-w-4xl mx-auto">
              <h1 className="text-3xl lg:text-4xl font-bold">Tags</h1>
            </div>
            {tags && (
              <div className="pt-4 pb-2 px-4 sm:px-8 md:px-20 max-w-4xl mx-auto">
                {tags.map((tag: string) => (
                  <Tag tag={tag} size="lg" count={tagCounts[tag]} key={tag} />
                ))}
              </div>
            )}
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts(["tags"]);

  let tags: string[] = [];
  for (let post of posts) {
    if (post.tags) tags.push(...(post.tags as string[]));
  }

  const tagCounts: { [key: string]: number } = {};

  for (const tag of tags) {
    tagCounts[tag] = tagCounts[tag] ? tagCounts[tag] + 1 : 1;
  }

  tags = tags.filter((x, i, a) => a.indexOf(x) == i);

  return {
    props: {
      tags,
      tagCounts,
    },
  };
};

export default Blog;
