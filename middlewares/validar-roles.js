const { response, request } = require("express")




const esAdminRole = (req = request, res = response, next )=>{

    if(!req.usuario){
        return res.status(500).json({
            msg: "se quiere validar rol sin haber validado token"
        });
    }

    const { nombre , rol } = req.usuario; 

    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `El usuario ${ nombre } no esta habilitado para esta tarea`
        });
    }

    next();
}


const tieneRol = (...roles)=>{
    return (req = request, res = response, next )=>{
        
        if(!req.usuario){
            return res.status(500).json({
                msg: "se quiere validar rol sin haber validado token"
            });
        }

        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }

        next();

    }
}



module.exports={
    esAdminRole,
    tieneRol
}