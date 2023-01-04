const { Router } = require ('express');
const { check } = require('express-validator');
const { ChainCondition } = require('express-validator/src/context-items');

const { usuariosGet, 
        usuariosPut,
        usuariosPost,
        usuariosDelete } = require('../controllers/user');

const { esRolValido, 
        emailValido, 
        idExistente} = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();



router.get('/', usuariosGet );

router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(idExistente),
    check("rol").custom(esRolValido),
    validarCampos
], usuariosPut );

router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe ser de mas de 6 letras ').isLength({ min: 6 }),
    check('correo','El correo no es valido ').isEmail(),
    check('correo').custom(emailValido),
    //check('rol','No es un usuario valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check("rol").custom(esRolValido),
    validarCampos
], usuariosPost );

router.delete('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(idExistente),
    validarCampos
], usuariosDelete );


 module.exports = router; 