const express = require("express");
const fs = require('fs');

const app = express();
const data = fs.readFileSync('./cultura.json', 'utf8');
const jsonData = JSON.parse(data);

app.get('/api/cultura', (req, res) => {
  res.json(jsonData);
});


app.get('/api/cultura/:luogo', function(req, res){
    const id = req.params.luogo;
    
    res.json(c.filter(cultura => {
        return cultura.luogo.toLowerCase().includes(id.toLowerCase());
      }));
});

app.listen(3000, () => {
  console.log('API in ascolto sulla porta 3000');
});
