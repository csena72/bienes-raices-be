import express from 'express';
import { adminPropiedades } from '../controllers/propiedadController.js';


const router = express.Router();

router.get('/mis-propiedades', adminPropiedades);


export default router;