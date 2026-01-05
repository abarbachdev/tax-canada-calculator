
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../utils/blogData';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <>
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800">Post Not Found</h1>
          <p className="mt-2 text-gray-600">Sorry, we couldn't find the article you were looking for.</p>
          <Link
            to="/blog"
            className="mt-6 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </>
    );
  }

  return (
    <div>
      <Link
        to="/blog"
        className="inline-flex items-center text-blue-600 font-semibold mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
        Back to All Articles
      </Link>
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">{post.title}</h1>
        <div className="mt-6 prose max-w-none prose-h3:font-bold prose-h3:text-gray-800 prose-p:text-gray-700 prose-ul:text-gray-700">
            {post.content}
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;