
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

export {
    formularioLogin,
    formularioReistro,
}