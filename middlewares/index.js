

const a = require('../middlewares/validar-campos');
const b = require('../middlewares/validar-jwt');
const c = require('../middlewares/validar-roles');


module.exports = {
    ...a,
    ...b,
    ...c,
}