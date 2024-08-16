import express from 'express';
import { formularioLogin, formularioReistro } from '../controllers/usuarioController.js';



const router = express.Router();

router.get("/login", formularioLogin);
router.get("/register", formularioReistro);







export default router;