
const formularioLogin = (req, res) => {
    res.render('auth/login', {
        autenticado: false,
    });
}

const formularioReistro = (req, res) => {
    res.render('auth/registro', {
        
    });
}

export {
    formularioLogin,
    formularioReistro,
}