const { response, request } = require("express");
const jwt = require('jsonwebtoken');
 
const Usuario = require('../models/usuario');


const validarJWT = async (req =request , res = response, next) =>{

    const token = req.header( 'auth' );

    if(!token){
        return res.status(401).json({
            msg : 'no hay token en la peticion'
        })
    }
    
    try{

        const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY);
        
        const usuario = await Usuario.findById( uid ); 

        if(!usuario.estado){
             return res.status(401).json({
                msg: 'Token no valido - ususario borrado'
             });
        }
        
        if (!usuario){
            return res.status(401).json({
                msg: 'usuario no encontrado en la DB'
             });
        }
        req.usuario = usuario;

        next();

    }catch(error){
        console.log(error);
        res.status(401).json({
            msg: 'toker no valido'
        })
    }
    
}



  module.exports= {
    validarJWT
  }