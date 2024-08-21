'use client';

import { Body } from '@/components/app/layouts';
import { useEffect, useState } from 'react';

interface Blog {
    id: number;
    author_id: string;
    title: string;
    body: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    tags: Tag[];
    blog_tag: BlogTag[];
}

interface Tag {
    id: number;
    type: number;
    type_name: string;
}

interface BlogTag {
    blog_id: number;
    tag_id: number;
    created_at: string;
    deleted_at: string | null;
}

const Blog = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch('/api/blog');
                const data = await res.json();
                setBlogs(data);
            } catch (error) {
                console.error('Error fetching blog : ', error);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <Body title="BLOG" marginTop="small">
            <>
                <div className="text-xl font-semibold tracking-widest text-elem-alert">
                    準備中...
                </div>
                {/* {blogs.map((blog) => (
                    <div key={blog.id}>
                        <h2>{blog.title}</h2>
                    </div>
                ))} */}
            </>
        </Body>
    );
};

export default Blog;
