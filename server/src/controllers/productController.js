import Product from '../models/Product.js';

export const getAllProducts = (req, res) => {
    try {
        const { category } = req.query;
        const products = Product.getAll(category);
        res.json(products);
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getProductById = (req, res) => {
    try {
        const product = Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Get product error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const createProduct = (req, res) => {
    try {
        const productId = Product.create(req.body);
        const product = Product.findById(productId);
        res.status(201).json(product);
    } catch (error) {
        console.error('Create product error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const updateProduct = (req, res) => {
    try {
        const product = Product.update(req.params.id, req.body);
        res.json(product);
    } catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const deleteProduct = (req, res) => {
    try {
        Product.delete(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
