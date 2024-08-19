import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { generarId } from '../helpers/tokens.js';
import Usuario from '../models/Usuario.js';
import { emailRegistro, emailOlvidePassword } from '../helpers/emails.js';


const formularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina: 'Iniciar Sesión',
        csrfToken: req.csrfToken(),
    });
}

const autenticar = async(req, res) => {
    const { email, password } = req.body;

    await check('email').isEmail().withMessage('El email es obligatorio').run(req);
    await check('password').not().notEmpty().withMessage('La contraseña es obligatoria.').run(req);

    let resultado = validationResult(req);

    if (!resultado.isEmpty()) {
        return res.render('auth/login', {
            pagina: 'Iniciar Sesión',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
            usuario: req.body
        });
    }

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
        return res.render('auth/login', {
            pagina: 'Iniciar Sesión',
            csrfToken: req.csrfToken(),
            errores: [ {msg : 'El usuario no existe'} ]
        });
    }

    if (!usuario.confirmado) {
        return res.render('auth/login', {
            pagina: 'Iniciar Sesión',
            csrfToken: req.csrfToken(),
            errores: [ {msg : 'Tu cuenta no ha sido confirmada'}]
        });
    }

    if (!bcrypt.compareSync(password, usuario.password)) {
        return res.render('auth/login', {
            pagina: 'Iniciar Sesión',
            csrfToken: req.csrfToken(),
            errores: [ {msg : 'La contraseña es incorrecta'}]
        });
    }



    return res.render('mis-propiedades', {
        pagina: 'Mis propiedades',
    });
}

const formularioRegistro = (req, res) => {
    res.render('auth/registro', {
        pagina: 'Crear Cuenta',
        csrfToken: req.csrfToken()
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
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
            usuario: req.body
        });
    }

    const existeUsuario = await Usuario.findOne({ where: { email: req.body.email } });
    if (existeUsuario) {
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            csrfToken: req.csrfToken(),
            errores: [{
                msg: 'El usuario ya existe'
            }],
            usuario: req.body
        });
    }

    const usuario = await Usuario.create({
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password,
        token: generarId(),
    });

    emailRegistro({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token
    });

    res.render('templates/mensaje', {
        pagina: 'Cuenta Creada Correctamente',
        mensaje: 'Revisa tu email para confirmar tu cuenta',
    });
}

const confirmarCuenta = async(req, res) => {
    const usuario = await Usuario.findOne({ where: { token: req.params.token } });
    if (!usuario) {
        return res.render('auth/confirmar-cuenta', {
            pagina: 'Error al confirmar la cuenta',
            mensaje: 'Error al confirmar la cuenta, intenta de nuevo',
            error: true
        });
    }
    usuario.token = null;
    usuario.confirmado = true;
    await usuario.save();
    res.render('auth/confirmar-cuenta', {
        pagina: 'Cuenta Confirmada',
        mensaje: 'Cuenta Creada Correctamente',
        error: false
    });
}

const formularioOlvidePassword = (req, res) => {
    res.render('auth/olvide-password', {
        pagina: 'Recuperar tu Cuenta',
        csrfToken: req.csrfToken(),
    });
}

const resetearPassword = async (req, res) => {

    await check('email').isEmail().withMessage('El email es obligatorio').run(req);

    let resultado = validationResult(req);

    if (!resultado.isEmpty()) {
        return res.render('auth/olvide-password', {
            pagina: 'Recuperar tu Cuenta',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
        });
    }

    const usuario = await Usuario.findOne({ where: { email: req.body.email } });

    if (!usuario) {
        return res.render('auth/olvide-password', {
            pagina: 'Recuperar tu Cuenta',
            csrfToken: req.csrfToken(),
            errores: [{
                msg: 'El usuario no existe'
            }],
        });
    }

    usuario.token = generarId();
    await usuario.save();
    emailOlvidePassword({
        email: usuario.email,
        nombre: usuario.nombre,
        token: usuario.token
    });

    res.render('templates/mensaje', {
        pagina: 'Reestablece tu Password',
        mensaje: 'Revisa tu email para reestablecer tu password',
    });
}

const comprobarToken = async(req, res) => {

    const usuario = await Usuario.findOne({ where: { token: req.params.token } });
    if (!usuario) {
        return res.render('auth/confirmar-cuenta', {
            pagina: 'Restablece tu Password',
            mensaje: 'Error al validar tu información, intenta de nuevo',
            error: true
        });
    }
    res.render('auth/resetear-password', {
        pagina: 'Reestablece tu Contraseña',
        csrfToken: req.csrfToken(),
    });
}

const nuevoPassword = async(req, res) => {
    const usuario = await Usuario.findOne({ where: { token: req.params.token } });

    if (!usuario) {
        return res.render('auth/confirmar-cuenta', {
            pagina: 'Error al confirmar la cuenta',
            mensaje: 'Error al confirmar la cuenta, intenta de nuevo',
            error: true
        });
    }

    await check('password').isLength({ min: 6 }).withMessage('El password debe ser minimo de 6 caracteres').run(req);
    let resultado = validationResult(req);
    if (!resultado.isEmpty()) {
        return res.render('auth/olvide-password', {
            pagina: 'Reestablece tu Password',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
        });
    }

    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(req.body.password, salt);
    usuario.token = null;
    await usuario.save();

    res.render('auth/confirmar-cuenta', {
        pagina: 'Contraseña reestablecida correctamente',
        mensaje: 'La contraseña se reestablecio correctamente.',
        error: false
    });
}

export {
    formularioLogin,
    autenticar,
    formularioRegistro,
    registrarUsuario,
    confirmarCuenta,
    formularioOlvidePassword,
    resetearPassword,
    comprobarToken,
    nuevoPassword,
}