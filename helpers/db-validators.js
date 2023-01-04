const Role = require ('../models/role');
const Usuario = require('../models/usuario')


const esRolValido = async (rol = '') =>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${ rol } no existe en la BD`)
    }
}


const emailValido = async (correo = ' ') =>{
    const existeEmail = Usuario.findOne({correo});
    if(existeEmail){
        throw new Error (`Ese correo ya existe`)
    };
}


module.exports = {
    esRolValido,
    emailValido
}