import express from 'express';
import { 
    formularioLogin,
    autenticar,
    formularioRegistro,
    registrarUsuario,
    confirmarCuenta,
    formularioOlvidePassword,
    resetearPassword,
    comprobarToken,
    nuevoPassword
} from '../controllers/usuarioController.js';



const router = express.Router();

router.get("/login", formularioLogin);
router.post("/login", autenticar);

router.get("/registro", formularioRegistro);
router.post("/registro", registrarUsuario);

router.get("/confirmar-cuenta/:token", confirmarCuenta);

router.get("/olvide-password", formularioOlvidePassword);
router.post("/olvide-password", resetearPassword);

router.get("/olvide-password/:token", comprobarToken);
router.post("/olvide-password/:token", nuevoPassword);


export default router;