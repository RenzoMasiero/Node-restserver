const Role = require ('../models/role');
const Usuario = require('../models/usuario')


const esRolValido = async (rol = '') =>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${ rol } no existe en la BD`)
    }
}


const emailValido = async (correo = ' ') =>{
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error (`Ese correo ya existe`)
    };
}

const idExistente = async (id) =>{
    const existeId = await Usuario.findById(id);
    console.log('idvalido f');
    if(!existeId){
        console.log('if de no existe id');
        throw new Error (`El id ${ id } no existe`)
    };
}

module.exports = {
    esRolValido,
    emailValido,
    idExistente
}