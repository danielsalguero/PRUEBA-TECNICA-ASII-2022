const fiscalias = require('./fiscalias.js');

const express = require('express');
var cors = require('cors');

const { get, status, contentType } = require('express/lib/response');
const { resetWatchers } = require('nodemon/lib/monitor/watch');
const app = express();
var router = express.Router('express');

app.use(cors());

app.listen(4000, ()=> {

  console.log('App is running.');

});

app.get('/', (req,res) => {
    console.log(req.query);
    res.status(200).json({
        status:'success',
        data:'App is running.'
    })
});

app.get('/departamento/:depto/ObtenerFiscalias', (req, res) => {

  const deptoID = req.params.depto;

    fiscalias.getFiscalias(deptoID).then(result => {
      res.json(result[0]);
    })

  });

  app.get('/Departamentos', (req, res) => {

     
    res.status(200).json(
      [
        {
          departamento:'Guatemala',
          id_departamento: 1     
        },
        {
          departamento:'Chiquimula',
          id_departamento: 2     
        },
        {
          departamento:'Huehuetenango',
          id_departamento: 3     
        }
    ])
     
    });
  


