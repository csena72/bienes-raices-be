import express from 'express';
import { 
    formularioLogin,
    formularioReistro,
    registrarUsuario,
    confirmarCuenta,
    formularioOlvidePassword
} from '../controllers/usuarioController.js';



const router = express.Router();

router.get("/login", formularioLogin);

router.get("/registro", formularioRegistro);
router.post("/registro", registrarUsuario);
router.get("/confirmar-cuenta/:token", confirmarCuenta);
router.get("/olvide-password", formularioOlvidePassword);


export default router;