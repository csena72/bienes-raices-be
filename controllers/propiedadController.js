

export const adminPropiedades = async (req, res) => {
    
    //const propiedades = await Propiedad.findAll({ where: { vendedorId: req.vendedor.id } });

    res.render('propiedades/admin', {
        pagina: 'Mis Propiedades',
        bar: true,
        //propiedades
    });
}