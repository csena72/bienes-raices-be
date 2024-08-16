import  express  from 'express';
import usuarioRoutes from './routes/usuarioRoutes.js';


const app = express();
const PORT = 3000;

app.use('/', usuarioRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});