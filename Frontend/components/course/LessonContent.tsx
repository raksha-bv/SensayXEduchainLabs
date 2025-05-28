import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { Lesson } from "@/types/course";

interface LessonContentProps {
  lesson: Lesson;
}

export const LessonContent: React.FC<LessonContentProps> = ({ lesson }) => {
  return (
    <article className="prose prose-invert prose-violet max-w-none bg-gray-900/60 border border-violet-900/30 rounded-lg p-6">
      <div className="markdown-body">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => (
              <h1
                className="text-2xl font-bold mb-4 text-violet-400"
                {...props}
              />
            ),
            h2: ({ node, ...props }) => (
              <h2
                className="text-xl font-bold mt-8 mb-4 text-violet-400"
                {...props}
              />
            ),
            h3: ({ node, ...props }) => (
              <h3
                className="text-lg font-bold mt-6 mb-3 text-violet-400"
                {...props}
              />
            ),
            p: ({ node, ...props }) => (
              <p className="mb-4 text-gray-300" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="ml-6 mb-4 list-disc text-gray-300" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="ml-6 mb-4 list-decimal text-gray-300" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="mb-1 text-gray-300" {...props} />
            ),
            a: ({ node, ...props }) => (
              <a
                className="text-violet-400 underline hover:text-violet-300"
                {...props}
              />
            ),
            code: ({ node, className, ...props }) => {
              const isInline = !className || !className.includes("language-");
              return isInline ? (
                <code
                  className="px-1 py-0.5 rounded text-sm bg-gray-800 text-gray-300"
                  {...props}
                />
              ) : (
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-4 overflow-x-auto">
                  <code
                    className={`block text-sm text-gray-300 ${className}`}
                    {...props}
                  />
                </div>
              );
            },
          }}
        >
          {lesson.content}
        </ReactMarkdown>
      </div>
    </article>
  );
};

export default LessonContent;
