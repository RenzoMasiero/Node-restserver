const { response } = require ('express');
const Usuario = require('../models/usuario') ;
const bcryptjs = require('bcryptjs');

const usuariosGet = (req, res = response )=> {
    res.json({
        msg: 'get Api - controlador'
    });
 }  

 const usuariosPost = async (req, res = response )=> {


    const { nombre, correo, password, rol }  = req.body;

    const usuario = new Usuario( { nombre, correo, password, rol } );


    //Encriptar 
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);


    await usuario.save();

    res.json({
        msg: 'Post Api - controlador',
        usuario
    });
 }  

 const usuariosPut = async(req, res = response )=> {
    const id = req.params.id;
    const {password, google, correo,  ...resto} = req.body;
    
    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndDelete(id, resto);
    
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