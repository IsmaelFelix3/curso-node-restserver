const express = require('express');
const cors = require('cors');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

         // Middlewares
        this.middlewares();


        // Rutas de mi aplicacion
        this.routes();
    }

    middlewares(){

        // CORS
        this.app.use( cors() );

        //  lectura y Parseo del body
        // de esta manera caulquier informacion que venga ya sea en post put o delete la va a intentar serializar a formato JSON
        this.app.use( express.json() );


        // Directorio publico
        this.app.use( express.static('public') );
    }

    
    routes(){
        // como un middleware condicional
        this.app.use( this.usuariosPath, require('../routes/user.routes') );
       
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;