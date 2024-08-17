import express from 'express';
import { 
    formularioLogin,
    formularioReistro,
    registrarUsuario,
    formularioOlvidePassword
} from '../controllers/usuarioController.js';



const router = express.Router();

router.get("/login", formularioLogin);

router.get("/registro", formularioReistro);
router.post("/registro", registrarUsuario);

router.get("/olvide-password", formularioOlvidePassword);







export default router;