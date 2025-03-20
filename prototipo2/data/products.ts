import { randomUUID } from 'crypto';

export const products = [
    {
        id: randomUUID(),
        name: 'Product 1',
        price: 1,
        stock: 5,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },

    {
        id: randomUUID(),
        name: 'Product 2',
        price: 2,
        stock: 10,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
];
