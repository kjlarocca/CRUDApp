const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

app.post('/addanimal', (req, res) => {
    const animal = req.body;
    console.log('New animal:', animal);
    res.send('Animal added to the Zoo.');
  });
  

app.get('/addanimal', (req, res) => {
    console.log(req.body);
    res.send("Response Received:" + req.body);
});

app.put('/animals/:id', (req, res) => {
    const animalId = req.params.id;
    const updatedAnimal = req.body;
    console.log('You have updated this animal:', updatedAnimal);
  
    res.send('You have updated this animal');
  });
  
  app.delete('/animals/:id', (req, res) => {
    const animalId = req.params.id;
    console.log('You have removed the animal named:', animalId);
  
    res.send('You have removed this animal.');
  });  

app.listen(3001, () => {
    console.log('server is running on port 3001');
});