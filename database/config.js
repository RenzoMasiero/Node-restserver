const  mongoose = require('mongoose');


const dbConnection = async() => {


    //esto lo saque de stackoverflow
    mongoose.set("strictQuery", false);

    try {

        await mongoose.connect( process.env.MONGO_CNN);
    
        console.log('Base de datos online');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }


}



module.exports={
    dbConnection
}