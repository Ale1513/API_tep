const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const filePath = path.join(process.cwd(), 'api_cultura', 'cultura.json');
const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

app.get('/api/cultura', (req, res) => {
  let filteredData = jsonData;

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API in ascolto sulla porta ${port}`);
});
