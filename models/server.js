const express = require('express');
const cors = require('cors');
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('../docs/openapi.json');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        
        this.middlewares();

        this.routes();
    }

    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(express.json()); //lectura y parseo del body
        this.app.use(cors());
    }

    routes(){
        this.app.use('/api/usuarios', require('../routes/usuarios'));
        this.app.use('/api/auth', require('../routes/auth'));
        this.app.use('/api-doc',swaggerUi.serve,swaggerUi.setup(swaggerDocument));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
          })
    }

}

module.exports = Server;