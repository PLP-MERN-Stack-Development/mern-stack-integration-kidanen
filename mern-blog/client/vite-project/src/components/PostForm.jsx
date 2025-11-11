import { useState, useEffect } from 'react';
import { createPost, updatePost, getCategories } from '../api/api';
import { useNavigate, useParams } from 'react-router-dom';
import { getPost } from '../api/api';

export default function PostForm({ edit=false }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getCategories().then(res => setCategories(res.data));
        if(edit && id) {
            getPost(id).then(res => {
                setTitle(res.data.title);
                setContent(res.data.content);
                setCategory(res.data.category?._id);
            });
        }
    }, [edit, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { title, content, category };
        if(edit) await updatePost(id, data);
        else await createPost(data);
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
            <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" required />
            <select value={category} onChange={e => setCategory(e.target.value)} required>
                <option value="">Select Category</option>
                {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
            </select>
            <button type="submit">{edit ? 'Update' : 'Create'} Post</button>
        </form>
    );
}
