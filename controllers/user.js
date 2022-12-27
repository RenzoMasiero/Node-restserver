 const { response } = require ('express');



const usuariosGet = (req, res = response )=> {
    res.json({
        msg: 'get Api - controlador'
    });
 }  

 const usuariosPost = (req, res = response )=> {
    const {nombre, edad} = req.body;
    res.json({
        msg: 'Post Api - controlador',
        nombre,
        edad
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