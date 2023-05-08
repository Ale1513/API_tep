const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const filePathCultura = path.join(process.cwd(), 'api_cultura', 'cultura.json');
const filePathLavoro = path.join(process.cwd(), 'api_cultura', 'lavoro.json');
const jsonDataCultura = JSON.parse(fs.readFileSync(filePathCultura, 'utf8'));
const jsonDataLavoro = JSON.parse(fs.readFileSync(filePathLavoro, 'utf8'));

app.get('/api/cultura', (req, res) => {
  let filteredData = jsonDataCultura;

  if (req.query.id) {
    filteredData = filteredData.filter(cultura => cultura.id == req.query.id);
  }

  if (req.query.luogo) {
    filteredData = filteredData.filter(cultura => cultura.luogo.toLowerCase().includes(req.query.luogo.toLowerCase()));
  }

  if (req.query.tipo) {
    filteredData = filteredData.filter(cultura => cultura.tipo.toLowerCase().includes(req.query.tipo.toLowerCase()));
  }

  res.json(filteredData);
});

app.get('/api/lavoro', (req, res) => {
  let filteredData = jsonDataLavoro;

  if (req.query.regione) {
    filteredData = filteredData.filter(lavoro => lavoro.regione.toLowerCase().includes(req.query.regione.toLowerCase()));
  }
  
  if (req.query.tasso_occ_min && req.query.tasso_occ_max) {
    filteredData = filteredData.filter(lavoro => {
      return lavoro.tasso_occ >= parseInt(req.query.tasso_occ_min) && lavoro.tasso_occ <= parseInt(req.query.tasso_occ_max);
    });
  }
  
  if (req.query.tasso_dis_min && req.query.tasso_dis_max) {
    filteredData = filteredData.filter(lavoro => {
      return lavoro.tasso_dis >= parseInt(req.query.tasso_dis_min) && lavoro.tasso_dis <= parseInt(req.query.tasso_dis_max);
    });
  }

  if (req.query.stipendio_min && req.query.stipendio_max) {
    filteredData = filteredData.filter(lavoro => {
      return lavoro.stipendi_lordi_media >= parseInt(req.query.stipendio_min) && lavoro.stipendi_lordi_media <= parseInt(req.query.stipendio_max);
    });
  }

  res.json(filteredData);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API in ascolto sulla porta ${port}`);
});
