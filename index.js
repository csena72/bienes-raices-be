import  express  from 'express';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import usuarioRoutes from './routes/usuarioRoutes.js';
import propiedadRoutes from './routes/propiedadRoutes.js';
import db from './config/db.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(csrf({ cookie: true }));

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
app.use('/', propiedadRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});