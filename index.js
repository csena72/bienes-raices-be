import  express  from 'express';
import usuarioRoutes from './routes/usuarioRoutes.js';


const app = express();
const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use('/auth', usuarioRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});