const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const filePath = path.join(process.cwd(), 'api_cultura', 'cultura.json');
const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

app.get('/api/cultura', (req, res) => {
  const luogo = req.query.luogo;
  const tipo = req.query.tipo;
  const id = req.query.id;
  
  if(id){
    jsonData = jsonData.find(cultura => {
      return cultura.id == id;
    });
  }
  
  if(luogo){
    jsonData = jsonData.filter(cultura => {
      return cultura.luogo.toLowerCase().includes(id.toLowerCase());
    });
  }
  
  if(tipo){
    jsonData = jsonData.filter(cultura => {
      return cultura.tipo.toLowerCase().includes(id.toLowerCase());
    }));    
  }
  res.json(jsonData);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API in ascolto sulla porta ${port}`);
});
