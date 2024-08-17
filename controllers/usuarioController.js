import { check, validationResult } from 'express-validator';
import Usuario from '../models/Usuario.js';


const formularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina: 'Iniciar Sesión',
    });
}

const formularioReistro = (req, res) => {
    res.render('auth/registro', {
        pagina: 'Crear Cuenta',
    });
}

const registrarUsuario = async(req, res) => {

    await check('nombre').not().isEmpty().withMessage('El nombre es obligatorio').run(req);
    await check('email').isEmail().withMessage('El email es obligatorio').run(req);
    await check('password').not().isEmpty().isLength({ min: 6 }).withMessage('La contraseña es obligatoria debe tener 6 caracteres mínimo.').run(req);
    await check('repetir_password').equals(req.body.password).withMessage('Las contraseñas deben ser iguales').run(req);

    let resultado = validationResult(req);

    if (!resultado.isEmpty()) {
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            errores: resultado.array(),
            usuario: req.body
        });
    }

    const existeUsuario = await Usuario.findOne({ where: { email: req.body.email } });
    if (existeUsuario) {
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            errores: [{
                msg: 'El usuario ya existe'
            }],
            usuario: req.body
        });
    }

    const usuario = await Usuario.create(req.body);
    res.json(usuario);
}

const formularioOlvidePassword = (req, res) => {
    res.render('auth/olvide-password', {
        pagina: 'Recuperar tu Cuenta',
    });
}

export {
    formularioLogin,
    formularioReistro,
    registrarUsuario,
    formularioOlvidePassword,
}