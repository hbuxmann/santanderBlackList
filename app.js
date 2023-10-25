const express = require('express');
const bodyParser = require('body-parser');
const usuarioRouter = require('./routes/routerApi');
const app = express();
const dbLending_entity_code = require('./functions/dbLending_entity_code');
const dbLending_entity = require('./functions/dbLending_entity');
const validateMiddleware = require('./middlewares/validateMiddleware');
//const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

app.use(bodyParser.json());
//app.use(validateMiddleware);
app.use('/api', usuarioRouter);



// middlewares ejecutados siempre

//app.use(userLoggedMiddleware);


// Middleware de manejo de errores para análisis JSON
app.use((error, req, res, next) => {
    if (error instanceof SyntaxError) {
      // Error de análisis JSON
      res.status(400).json({ error: 'Error de sintaxis en el JSON' });
    } else {
      // Otros errores
      next(error);
    }
  });



//
(async () => {
    try{
      global.lending_entity_code = await dbLending_entity_code();
    } catch (error){
      console.error('Error trying to recover credentials:', error);
    }
  })();
//
(async () => {
    try{
        global.lending_entity = await dbLending_entity();
    } catch (error){
        console.error('Error trying to recover credentials:', error);
    }
})();


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});