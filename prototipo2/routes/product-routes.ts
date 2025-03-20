import express from 'express';
import {
    getProducts,
    getProduct,
    addProduct,
    updateProductDetails,
    removeProduct,
} from '../controllers/product-controller';

const router = express.Router();

router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.post('/products', addProduct);
router.patch('/products/:id', updateProductDetails);
router.delete('/products/:id', removeProduct);

export default router;
