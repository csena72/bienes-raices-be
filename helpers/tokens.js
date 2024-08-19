import jwt from 'jsonwebtoken';

export const generarJWT = (datos) => {
    return jwt.sign({ id: datos.id, nombre: datos.nombre }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
}

export const generarId = () => {
    const random = Math.random().toString(32).substring(2);
    const fecha = Date.now().toString(32);
    return random + fecha;
}
