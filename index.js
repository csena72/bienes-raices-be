import  express  from 'express';
import usuarioRoutes from './routes/usuarioRoutes.js';
import db from './config/db.js';


const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

try {
    await db.authenticate();
    db.sync();
    console.log('Connection DB has been established successfully.');
} catch (error) {
    console.log(error);
}

app.set('view engine', 'pug');
app.set('views', './views');


app.use(express.static('public'));

app.use('/auth', usuarioRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});