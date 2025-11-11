import express from 'express';
import Category from '../models/Category.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// GET all categories
router.get('/', async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) { next(err); }
});

// CREATE category
router.post(
    '/',
    body('name').notEmpty(),
    async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        try {
            const newCategory = new Category(req.body);
            const savedCategory = await newCategory.save();
            res.status(201).json(savedCategory);
        } catch (err) { next(err); }
    }
);

export default router;
