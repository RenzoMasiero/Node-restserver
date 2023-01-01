const { response } = require ('express');
const Usuario = require('../models/usuario') ;
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const usuariosGet = (req, res = response )=> {
    res.json({
        msg: 'get Api - controlador'
    });
 }  

 const usuariosPost = async (req, res = response )=> {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    const { nombre, correo, password, rol }  = req.body;

    const usuario = new Usuario( { nombre, correo, password, rol } );

    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        return res.status(400).json({
            msg: 'Ese correo ya existe'
        });
    }

    //Encriptar 
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);


    await usuario.save();

    res.json({
        msg: 'Post Api - controlador',
        usuario
    });
 }  

 const usuariosPut = (req, res = response )=> {
    const id = req.params.id;

    res.json({
        msg: 'Put Api - controlador',
        id
    });
 }  


 const usuariosDelete = (req, res = response )=> {
    res.json({
        msg: 'Delete Api - controlador'
    });
 }  







 module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
 }