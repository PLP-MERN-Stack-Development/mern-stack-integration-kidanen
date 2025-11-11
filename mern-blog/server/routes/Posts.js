import express from 'express';
import Post from '../models/Posts.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// GET all posts
router.get('/', async (req, res, next) => {
    try {
        const posts = await Post.find().populate('category');
        res.json(posts);
    } catch (err) { next(err); }
});

// GET post by ID
router.get('/:id', async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id).populate('category');
        if(!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (err) { next(err); }
});

// CREATE post
router.post(
    '/',
    body('title').notEmpty(),
    body('content').notEmpty(),
    async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        try {
            const newPost = new Post(req.body);
            const savedPost = await newPost.save();
            res.status(201).json(savedPost);
        } catch (err) { next(err); }
    }
);

// UPDATE post
router.put('/:id', async (req, res, next) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!updatedPost) return res.status(404).json({ message: 'Post not found' });
        res.json(updatedPost);
    } catch (err) { next(err); }
});

// DELETE post
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if(!deletedPost) return res.status(404).json({ message: 'Post not found' });
        res.json({ message: 'Post deleted' });
    } catch (err) { next(err); }
});

export default router;
