import { Request, Response } from 'express';
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} from '../models/product-model';

export const getProducts = (req: Request, res: Response) => {
    const products = getAllProducts();
    res.json(products);
};

export const getProduct = (req: Request, res: Response) => {
    const product = getProductById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

export const addProduct = (req: Request, res: Response) => {
    const { name, price, stock, is_active } = req.body;
    if (
        !name ||
        typeof price !== 'number' ||
        typeof stock !== 'number' ||
        typeof is_active !== 'boolean'
    ) {
        return res.status(400).json({ message: 'Missing or invalid fields' });
    }
    const newProduct = createProduct(name, price, stock, is_active);
    res.status(201).json(newProduct);
};

export const updateProductDetails = (req: Request, res: Response) => {
    const { name, price, stock, is_active } = req.body;
    const updatedProduct = updateProduct(
        req.params.id,
        name,
        price,
        stock,
        is_active,
    );
    if (updatedProduct) {
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

export const removeProduct = (req: Request, res: Response) => {
    const deletedProduct = deleteProduct(req.params.id);
    if (deletedProduct) {
        res.json(deletedProduct);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};
