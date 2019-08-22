const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());
//app.use(express.static(path.join(__dirname, 'data')));

// An api endpoints
// app.get('/api/getHotDogsasufblweb', (req,res) => {
    
//     res.json(list);
//     console.log('Sent list of items');
// });

app.get('/api/getHotDogs', (req,res) =>{
    const hotDogsData =fs.readFileSync('./data/hotDogs.json');
    res.json(JSON.parse(hotDogsData));
});

app.post('/api/addHotDog', (req,res) =>{
    let newHotDog = req.body;
    const hotDogs =JSON.parse(fs.readFileSync('./data/hotDogs.json'));
    let lastId =JSON.parse(fs.readFileSync('./data/lastId.json'));
    newHotDog.id = lastId.lastId++;
    fs.writeFile('./data/lastId.json',JSON.stringify(lastId),()=>{});
    hotDogs.unshift(newHotDog);
    fs.writeFile('./data/hotDogs.json',JSON.stringify(hotDogs,null,2),()=>{});
    res.end();

});

app.delete('/api/deleteHotDog', (req,res) =>{
    const id = req.query.id;    
    let hotDogs =JSON.parse(fs.readFileSync('./data/hotDogs.json'));
    hotDogs = hotDogs.filter(hotDog=>hotDog.id != id);
    fs.writeFile('./data/hotDogs.json',JSON.stringify(hotDogs,null,2),()=>{});
    res.end();
});

app.put('/api/editHotDog', (req,res) =>{
    const id = req.query.id;    
    let editedHotDog = req.body;
    let hotDogs =JSON.parse(fs.readFileSync('./data/hotDogs.json'));
    hotDogs=hotDogs.map((hotDog=>{
        return hotDog.id==id?editedHotDog:hotDog;
    }));
    fs.writeFile('./data/hotDogs.json',JSON.stringify(hotDogs,null,2),()=>{});
    res.end();
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);