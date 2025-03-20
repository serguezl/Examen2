import { products } from '../data/products';

export interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export const getAllProducts = (): Product[] => {
    return products;
};

export const getProductById = (id: string): Product | undefined => {
    return products.find((product) => product.id === id);
};

export const createProduct = (
    name: string,
    price: number,
    stock: number,
    is_active: boolean,
): Product => {
    const newProduct = {
        id: crypto.randomUUID(),
        name,
        price,
        stock,
        is_active,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };
    products.push(newProduct);
    return newProduct;
};

export const updateProduct = (
    id: string,
    name?: string,
    price?: number,
    stock?: number,
    is_active?: boolean,
): Product | undefined => {
    const product = getProductById(id);
    if (!product) return undefined;

    if (name) product.name = name;
    if (price !== undefined) product.price = price;
    if (stock !== undefined) product.stock = stock;
    if (is_active !== undefined) product.is_active = is_active;

    product.updated_at = new Date().toISOString();
    return product;
};

export const deleteProduct = (id: string): Product | undefined => {
    const index = products.findIndex((product) => product.id === id);
    if (index === -1) return undefined;
    return products.splice(index, 1)[0];
};
