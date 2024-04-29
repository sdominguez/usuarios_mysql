const {Router} = require('express');
const {
    usuariosGet,
    usuariosGetById,
    usuariosCreate,
    usuariosUpdate,
    usuariosUpdatePass,
    usuariosDelete
} = require('../controllers/usuarios');
const{ validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', usuariosGet);

router.get('/:id', usuariosGetById);

router.post('/', [validarJWT], usuariosCreate);

router.put('/:id', [validarJWT], usuariosUpdate);

router.patch('/:id', [validarJWT], usuariosUpdatePass);

router.delete('/:id', [validarJWT], usuariosDelete);


module.exports = router;
