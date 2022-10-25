const mongoose = require('mongoose');


const dbConnection = async() => {

    try {
        // Me marcaba error por las opciones, las quite y ya corrio bien, aunque muestra error en el new el catch
        await mongoose.connect( process.env.MONGODB_CNN);

        console.log('Base de datos online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }

}

module.exports = {
    dbConnection
}