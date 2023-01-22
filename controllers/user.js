const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
// esto me va a permitir crearme instancias de mi modelo
// es un estandar que sea en mayuscula
const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {

    // obtenemos los query params
    // const { q = 'No Name', nombre, apikey } = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    // cambiamos esto porque los querys no dependen uno del otro por eso no es necesario el await
    // const usuarios = await Usuario.find(query).skip(Number(desde)).limit(Number(limite));
    // const total = await Usuario.countDocuments(query);

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(Number(desde)).limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async(req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json({
        msg: 'Post Api - Controlador',
        usuario
    })
}

const usuariosPut = async(req = request, res = response) => {

    // en los params va a estar el nombre que le dimos en la ruta
    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;

    if( password){
         // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }
    // Le mando el objeto new : true para que me traiga el objeto nuevo y no el viejo
    const usuario = await Usuario.findByIdAndUpdate( id, resto, {new: true});

    res.json({
        msg: 'El usuario se actualizo correctamente',
        usuario
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Path Api - Controlador'
    })
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;

    // Borrador fisicamente
    // const usuario = await Usuario.findByIdAndDelete( id );
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false });

    const usuarioAutenticado = req.usuario;

    res.json({
        msg: 'Delete Api - Controlador',
        usuario,
        usuarioAutenticado
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}