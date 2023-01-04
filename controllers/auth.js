const { response } = require("express");
const { generarJWT } = require("../helpers/generar-jwt");
const Usuario = require('../models/usuario');

bcryptjs = require ('bcryptjs');




const login = async(req, res = response )=>{

    const {correo, password} = req.body;

    try{
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / Contraseña incorrecto - correo'
            });
        }

        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Contraseña incorrecto - Estado false'
            });
        }

        const contraseñaValida = bcryptjs.compareSync(password, usuario.password);
        if(!contraseñaValida){
            return res.status(400).json({
                msg: 'Usuario / Contraseña incorrecto - Contraseña incorrecta'
            });
        }

        const token = await generarJWT(usuario.id); 
        res.json({
            usuario,
            token
        })
    

    }catch(error){
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
};


module.exports = {
    login
} 