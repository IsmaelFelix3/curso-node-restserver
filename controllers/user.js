const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {

    // obtenemos los query params
    const { q = 'No Name', nombre, apikey } = req.query;

    res.json({
        msg: 'get API - Controlador',
        nombre,
        apikey, 
        q
    });
}

const usuariosPost = (req = request, res = response) => {

    console.log(req);

    const { nombre, edad } = req.body;

    res.json({
        msg: 'Post Api - Controlador',
        nombre,
        edad
    })
}

const usuariosPut = (req = request, res = response) => {

    // en los params va a estar el nombre que le dimos en la ruta
    const { id } = req.params;

    res.json({
        msg: 'Put Api - Controlador',
        id
    })
}
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Path Api - Controlador'
    })
}
const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'Delete Api - Controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}