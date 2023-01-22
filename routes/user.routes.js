
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos,validarJWT, esAdminRole, tieneRol } = require('../middlewares');

const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/user');

const router = Router();

// no ocupamos pober el api aqui porque configuramos el router
// no estamos ejecutando la funcion estamos mandando la referencia a la funcion
// cuando se llame esto la req y res esos dos argumentos van a ser pasados al usuarioGet
router.get('/', usuariosGet);

// le asignamos un nombre al parametro del segmento
router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    // check('rol').custom( esRolValido ),
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe de ser de mas de 6 letras').isLength({min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRolValido ),
    validarCampos
] ,usuariosPost);

router.delete('/:id', [
    validarJWT,
    // Obliga a que sea admin
    // esAdminRole 
    tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;