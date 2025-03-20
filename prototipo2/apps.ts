import express from 'express';
import productRoutes from './routes/product-routes';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', productRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
