const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const Filter = require('node-image-filter');
const pictures = require('./picturesModel');

app.use(express.json());

app.get('/pictures', (req, res) => {
    img = '';
    for (var i = 1; i < pictures.length; i++) {
        img += "<img src='" + pictures[i].link + "'/>";
    }
    html = `<!DOCTYPE html><html><body><h1>Saved images</h1>${img}</body></html>`
    fs.writeFile(__dirname + "/Saved_Pictures/gallery.html", html, 
    function(err) {
        if(err) {
            return console.log(err);
        }
    console.log("The file was saved!");
    }); 
    res.send(pictures);
});

//for getting one picture
app.get('/picture/:id', (req, res) => {
    const item = pictures.find((arr) => { 
        return arr.id === parseInt(req.params.id)
    });
    if (!item) {
        res.status(404).send('Item not found');
    }
    res.send(item);
});

//saves file with filter
app.post('/save', (req, res) => {
    const id = pictures.length + 1;
    const imagePath = path.join(__dirname, '/Pictures/' + req.body.name);
    const savePath = path.join(__dirname, '/Saved_Pictures/' + id + req.body.name);
    const filters = req.body.filters;
    const pictureArr = {
        id: id,
        link: id + req.body.name,
        filters: filters
    }
    pictures.push(pictureArr);
    var i = 0;
    var done = true;
    if (filters.length === 0) {
        fs.createReadStream(imagePath).pipe(fs.createWriteStream(savePath));
        res.send(pictures);
    }
    while(done && i < filters.length) {
        done = false;
        done = applyFilter(filters[i], imagePath, savePath);
        if (done) {
            i++;
        }
    }
    res.send(pictures);
});

async function applyFilter(filterType, imagePath, savePath,) {
    var filePath = fs.existsSync(savePath) ? savePath : imagePath;
    if (filterType === 'sepia') {
        filter = Filter.preset.sepia;
    }
    else if (filterType === 'blur') {
        filter = Filter.preset.blur
    }
    else if (filterType === 'grayscale') {
        filter = Filter.preset.grayscale;
    }
    else if (filterType === 'brightness') {
        filter = Filter.preset.brightness;
    }
    else if (filterType === 'invert') {
        filter = Filter.preset.invert;
    }
    var done = await Filter.render(filePath, filter, async function (result) {
        await result.data.pipe(fs.createWriteStream(savePath)); // save local
        return true;
    })
    return done;
}

//deletes picture
app.delete('/picture/:id', (req, res) => {
    const item = pictures.find((arr) => { 
        return arr.id === parseInt(req.params.id)
    });
    if (!item) {
        res.status(404).send('Item not found');
    }
    const index = pictures.indexOf(item);
    pictures.splice(index, 1);
    fs.unlinkSync(__dirname + 'Saved_Picture/' + index + 'test.png');
    res.send(pictures);
})

module.exports = app;