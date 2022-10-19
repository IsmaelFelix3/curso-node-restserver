
const { Router } = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/user');

const router = Router();

// no ocupamos pober el api aqui porque configuramos el router
// no estamos ejecutando la funcion estamos mandando la referencia a la funcion
// cuando se llame esto la req y res esos dos argumentos van a ser pasados al usuarioGet
router.get('/', usuariosGet);

// le asignamos un nombre al parametro del segmento
router.put('/:id', usuariosPut);

router.post('/', usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;