import Image from "next/image";
import { useRef } from "react";
import { useTheme } from "next-themes";
import { RoughNotation } from "react-rough-notation";

import useOnScreen from "../hooks/useOnScreen";

import memojiLaptop from "../public/memoji-laptop.png";
import Link from "next/link";
import BlogCard from "../components/BlogCard";

const BlogSection: React.FC = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useOnScreen(elementRef);
  const { theme } = useTheme();
  return (
    <section id="blog" className="section">
      <div className="text-center">
        <RoughNotation
          type="underline"
          color={`${theme === "light" ? "rgb(0, 140, 140)" : "rgb(5 206 145)"}`}
          strokeWidth={2}
          order={1}
          show={isOnScreen}
        >
          <h2 className="section-heading">Blog</h2>
        </RoughNotation>
      </div>
      <div className="md:flex md:gap-x-8">
        <div className="md:basis-1/2 md:flex md:justify-end md:flex-col-reverse">
          <div className="text-center px-10 md:px-16 lg:px-32">
            <Image
              src={memojiLaptop}
              width={421}
              height={421}
              alt="Sat Naing with Laptop memoji"
            />
          </div>
          <div className="mb-4" ref={elementRef}>
            <p>
              At first, I didn't have any intention to make a blog. But then, I
              decided to write blog posts for what I've done and what I'm doing
              as a documenting practice. In the future, I may occationally share
              some of my knowledge during my professional software developer
              career.
            </p>
            <span className="block my-2 md:hidden">
              Here are some of my latest blog posts
            </span>
          </div>
        </div>
        <div className="md:basis-1/2">
          {blogPosts.map((post) => (
            <BlogCard post={post} key={post.id} />
          ))}
          <div className="mt-4">
            <Link href="/blog">
              <a className="link">
                Read all posts{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 inline-block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const blogPosts = [
  {
    id: 1,
    title: "Rust in the future of JavaScript Ecosystem",
    link: "#somelink",
    desc: "Why is Rust being used to replace parts of the JavaScript web ecosystem like minification (Terser), transpilation (Babel), formatting (Prettier), bundling (webpack), linting (ESLint), and more?",
  },
  {
    id: 2,
    title: "Creating a Monorepo with Lerna & Yarn Workspaces",
    link: "#somelink",
    desc: "In this guide, you will learn how to create a Monorepo to manage multiple packages with a shared build, test, and release process.",
  },
  {
    id: 3,
    title: "From Firebase/Redis to MySQL with PlanetScale",
    link: "#somelink",
    desc: "Learn how I migrated my Next.js website to use MySQL with PlanetScale, resulting in 10x faster response times for my APIs.",
  },
];

export default BlogSection;
