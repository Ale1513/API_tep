const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const filePath = path.join(process.cwd(), 'api_cultura', 'cultura.json');
const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

app.get('/api/cultura', (req, res) => {
  res.json(jsonData);
});

app.get('/api/cultura/:luogo', (req, res) => {
  const id = req.params.luogo;
  
  res.json(jsonData.filter(cultura => {
    return cultura.luogo.toLowerCase().includes(id.toLowerCase());
  }));
});

app.get('/api/cultura/:tipo', (req, res) => {
  const id = req.params.tipo;
  
  res.json(jsonData.filter(cultura => {
    return cultura.tipo.toLowerCase().includes(id.toLowerCase());
  }));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API in ascolto sulla porta ${port}`);
});
