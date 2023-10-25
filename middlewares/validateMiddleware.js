const express = require('express');
const bodyParser = require('body-parser');
//Objetivo: recuperar los datos de la cookie, en caso de existir, en variables locales
const app = express();
app.use(bodyParser.json());

function validateMiddleware (req, res, next) {
    console.log("Entro en la función validateMiddleware");
    app.use((req, res, next) => {
        try {
          JSON.parse(JSON.stringify(req.body)); // Intenta analizar el JSON
          next(); // Si el JSON es válido, pasa al siguiente middleware
        } catch (error) {
          // Si ocurre un error de sintaxis JSON, manejarlo aquí
          console.error('Error de sintaxis JSON:', error);
          res.status(400).json({ error: 'Error de sintaxis en el JSON' });
        }
      });
    /*
    app.use((error, req, res, next) => {
        if (error instanceof SyntaxError) {
            // Error de análisis JSON
            res.status(400).json({ error: 'Error de sintaxis en el JSON' });
            console.log('error ' + error)
        } else {
            console("validateMiddleware - error: " + error)
            // Otros errores
            next(error);
        }
    });
    */
    console.log("Entro en la función validateMiddleware - FIN");
    next();
}
module.exports = validateMiddleware;

/*
function recordarmeMiddleware (req, res, next) {
    if (req.cookies){
        if (req.cookies.recordarme != undefined && req.session.userLogged == undefined){
            // revisar la persistencia en la cookie, que datos sensibles tenemos. 
            // para un evolutivo ver de guardar los datos minimos y buscar info cada vez que sea necesario
            req.session.userLogged = req.cookies.recordarme;
        //
        }
    }
    next();

}

module.exports = recordarmeMiddleware;

*/