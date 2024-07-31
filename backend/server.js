const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const cors = require('cors');
const cityModel = require('./models/Cities');

const app = express();
const uri = 'mongodb+srv://melihemrealuc:5xUpiTfgPgR4fRE2@plazacluster.2eizcsh.mongodb.net/reactproject';
let gfs;

app.use(cors());
app.use(express.json());

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.once('open', () => {
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('cardImages');
    console.log("MongoDB database connected successfully!");
});
mongoose.connection.on('error', e => {
    console.log("MongoDB database connection failed", e);
})

const storage = new GridFsStorage({
    url: uri,
    file: (req, file) => {
        return {
            filename: `${Date.now()}-${file.originalname}`,
            bucketName: 'cardImages'
        };
    }
});

const upload = multer({ storage });

app.get('/getCities', (req, res) =>{
    cityModel.find()
    .then(cities => res.json(cities))
    .catch(e => res.json(e));
})

app.post('/uploadImages', upload.single('file'), (req, res) => {
    res.json({ file: req.file });
});

app.listen(5000, () => {
    console.log(`Server is running on port: 5000`);
})

//node server.js