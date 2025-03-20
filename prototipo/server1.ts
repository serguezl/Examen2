import express, { Request, Response } from 'express';
import { products } from './products';
import { randomUUID } from 'crypto';

// Pasos más básicos:
// Importaciones: Express para manejar las request y responses, products para acceder al mock y randomUUID para generar el ID de los productos que creemos
// Lo primer es crear la instancia de Express.
// Un middleware para manejar el JSON de las solicitudes
// Dejamos definido qué puerto se va a usar. En este caso, el 3000.

const app = express();

app.use(express.json());
const port = 3000;

// Endpoints de la API: GET, GET(Id), POST, PATCH, DELETE.
// GET: Devuelve la lista de los productos que ya tenemos. Hacemos una request a nuestra lista de productos (req) y la devolvemos (res)
app.get('/products', (req: Request, res: Response) => {
    res.json(products);
});

// Igual que GET, con la excepción de que busca y devuelve el ID. Le damos las condiciones que pide y nos devuelve o bien un producto existente o un error 404 si no lo encuentra.
app.get('/products/:id', (req: Request, res: Response) => {
    const productId = req.params.id;
    const product = products.find((p) => p.id === productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// POST: Con post añadiremos nuevos productos a nuestra lista. Lo primero es desestructurar los campos que va a necesitar el producto. Después le diremos los campos imprescindibles para que nos dirija a un error si no funciona. Si conseguimos pasar el if, nos creará un producto nuevo.
app.post('/products', (req: Request, res: Response) => {
    const { name, price, stock, is_active } = req.body;
    if (
        !name ||
        typeof price !== 'number' ||
        typeof stock !== 'number' ||
        typeof is_active !== 'boolean'
    ) {
        return res.status(400).json({ message: 'Missing or invalid fields' });
    }
    // El producto nuevo empezará con un random UUID autogenerado. Como los datos clave que necesitamos ya se han comprobado añadimos las fechas de creación y actualización para completar los casos necesarios.
    const newProduct = {
        id: randomUUID(),
        name,
        price,
        stock,
        is_active,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };
    // Agregamos el nuevo producto creado a nuestra lista y comprobamos que se ha añadido correctamente con un mensaje.
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// PATCH: Dándole el ID de uno de nuestros productos, lo actualizamos. Primero buscamos el producto (devolviendo un error en caso de no encontrarlo)
app.patch('/products/:id', (req: Request, res: Response) => {
    const productId = req.params.id;
    const { name, price, stock, is_active } = req.body;
    const product = products.find((p) => p.id === productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    // Comprobamos que el formato es correcto y actualizamos los campos que corresponda. También actualizamos la fecha de última modificación. Finalmente, para asegurarnos, le pedimos que devuelva el objeto que acabamos de actualizar.
    if (name) product.name = name;
    if (typeof price === 'number') product.price = price;
    if (typeof stock === 'number') product.stock = stock;
    if (typeof is_active === 'boolean') product.is_active = is_active;
    product.updated_at = new Date().toISOString();
    res.json(product);
});

// DELETE: Igual que hemos hecho con Patch, lo primero es buscar el producto mediante su ID. Como siempre, devolvemos un mensaje de error si no encuentra el producto. Una vez pasado el if, borramos el producto de nuestro array y devolvemos el producto que hemos eliminado.
app.delete('/products/:id', (req: Request, res: Response) => {
    const productId = req.params.id;
    const index = products.findIndex((p) => p.id === productId);
    if (index === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }
    const deletedProduct = products.splice(index, 1);
    res.json(deletedProduct[0]);
});

// Iniciamos el servidor
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
