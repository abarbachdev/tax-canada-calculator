
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ slug, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 flex flex-col">
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      <p className="mt-2 text-gray-600 flex-grow">{description}</p>
      <Link
        to={`/blog/${slug}`}
        className="mt-4 text-blue-600 font-semibold inline-flex items-center group"
      >
        Read More
        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
};

export default BlogCard;
