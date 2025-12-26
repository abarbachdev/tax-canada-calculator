
import React from 'react';
import { blogPosts } from '../utils/blogData';
import BlogCard from '../components/BlogCard';

const BlogListPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-2">
        Tax Insights Blog
      </h1>
      <p className="text-lg text-gray-600 text-center mb-8">
        Articles and guides to help you understand Canadian taxes.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map(post => (
          <BlogCard
            key={post.slug}
            slug={post.slug}
            title={post.title}
            description={post.description}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogListPage;