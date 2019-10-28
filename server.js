const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer')
const path = require('path');
const crypto = require('crypto');
var mime = require('mime');
const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static('./data'));
app.use(bodyParser.json());
// const upload = multer({dest:'./data/photos'});
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './data/photos')
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            const fileName = "hdImgNew";
            cb(null, `${fileName}` + '.' + mime.extension(file.mimetype));
        });
    }
});
var upload = multer({ storage: storage });
var img = upload.single('hdimg');
//app.use(express.static(path.join(__dirname, 'data')));

// An api endpoints
// app.get('/api/getHotDogsasufblweb', (req,res) => {
    
//     res.json(list);
//     console.log('Sent list of items');
// });

app.get('/api/getHotDogs', (req,res) =>{
    const hotDogsData =fs.readFileSync('./data/hotDogs.json');
    let allHotDogs = JSON.parse(hotDogsData);
    const filter = req.query.filter;
    if(filter!=="null"&&filter!=="undefined"){
        allHotDogs = allHotDogs.filter(hotDog=>hotDog.name.toUpperCase().includes(filter.toUpperCase()));
    }
    res.json(allHotDogs);
});

app.put('/api/getFilteredHotDogs', (req,res) =>{
    const hotDogsData =fs.readFileSync('./data/hotDogs.json');
    const filters = req.body;
    let allHotDogs = JSON.parse(hotDogsData);
    let filtered = [];
    const filterName = filters.hotDogName;
    const countOfIngs = +filters.countOfIngs;
    const ingredients = filters.ingredients;
    const minCost = filters.minCost;
    const maxCost = filters.maxCost;
    const minMass = filters.minMass;
    const maxMass = filters.maxMass;
    if(filterName) filtered = allHotDogs.filter(hd=>hd.name.toUpperCase().includes(filterName.toUpperCase()))
    else{filtered = allHotDogs;}
    if(countOfIngs){
        filtered = filtered.filter(hd=>hd.ingredients.length===countOfIngs)
    }
    if(minMass){
        filtered = filtered.filter(hd=>hd.mass>minMass)
    }
    if(maxMass){
        filtered = filtered.filter(hd=>hd.mass<maxMass)
    }
    if(minCost){
        filtered = filtered.filter(hd=>hd.cost>minCost)
    }
    if(maxCost){
        filtered = filtered.filter(hd=>hd.cost<maxCost)
    }
    if(ingredients.length>0){
            filtered = filtered.filter(hd=>{
                let ings = hd.ingredients;
                let condition = ingredients.length;
                ingredients.forEach(filter_ing => {
                    ings.forEach( ing=> {
                        if(ing.name.toUpperCase()===filter_ing.name.toUpperCase()&&ing.mass>=filter_ing.mass){
                            condition--;
                            return;
                        };
                    });
                });
                if(condition===0)return true;
            })
    }
    res.json(filtered);
});

app.post('/api/addHotDog',img, (req,res) =>{
    console.log("/api/addHotDog");
    let img = req.file;
    console.log(img)
    let hotdog = JSON.parse(req.body.hdInfo);
    const hotDogs =JSON.parse(fs.readFileSync('./data/hotDogs.json'));
    let lastId =JSON.parse(fs.readFileSync('./data/lastId.json'));
    if(img){
        const extention = img.filename.split('.')[1];
        const newHash = new Date().getTime();
        fs.renameSync(`./data/photos/${img.filename}`,`./data/photos/hdImg${lastId.lastId}${newHash}.${extention}`);
        hotdog.src = `/photos/hdImg${lastId.lastId}${newHash}.${extention}`
    }
    else{
        hotdog.src = `/photos/hotDogAnon.jpg`
    }
    
    hotdog.id = lastId.lastId++;
    fs.writeFile('./data/lastId.json',JSON.stringify(lastId),()=>{});
    hotDogs.unshift(hotdog);
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

app.put('/api/editHotDog',img, (req,res) =>{
    let img = req.file;
    const id = req.query.id;
    let editedHotDog = JSON.parse(req.body.hdInfo);
    if(img){
        const [fpath,extension] = editedHotDog.src.split('.');
        const newHash = new Date().getTime();
        fs.renameSync(`./data/photos/${img.filename}`,`./data/photos/hdImg${id}${newHash}.${extension}`);
        console.log(editedHotDog);
        if(editedHotDog.src!="/photos/hotDogAnon.jpg") fs.unlinkSync(`./data${editedHotDog.src}`)
        editedHotDog.src = `/photos/hdImg${id}${newHash}.${extension}`;
    }
    console.log(editedHotDog);
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