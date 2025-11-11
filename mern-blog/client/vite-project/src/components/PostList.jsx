import { useEffect, useState } from 'react';
import { getPosts } from '../api/api';
import { Link } from 'react-router-dom';

export default function PostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts().then(res => setPosts(res.data));
    }, []);

    return (
        <div>
            <h1>All Posts</h1>
            {posts.map(post => (
                <div key={post._id}>
                    <Link to={`/posts/${post._id}`}><h2>{post.title}</h2></Link>
                    <p>{post.content.slice(0, 100)}...</p>
                </div>
            ))}
        </div>
    );
}
