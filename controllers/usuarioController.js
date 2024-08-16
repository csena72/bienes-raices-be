
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

const formularioOlvidePassword = (req, res) => {
    res.render('auth/olvide-password', {
        pagina: 'Recuperar tu Cuenta',
    });
}

export {
    formularioLogin,
    formularioReistro,
    formularioOlvidePassword,
}