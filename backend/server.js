const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const cityModel = require('./models/Cities');
const formModel = require('./models/AppointmentFormModel');
const { GridFSBucket } = require('mongodb');

const app = express();
const port = 5000;
const uri = 'mongodb+srv://melihemrealuc:5xUpiTfgPgR4fRE2@plazacluster.2eizcsh.mongodb.net/reactproject';
let bucket;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//Log success on opening connection
mongoose.connection.once('open', () => {

    bucket = new GridFSBucket(mongoose.connection.db, {
        bucketName: 'imageData'
    });

    console.log("MongoDB database connected successfully!");
});

// Log error on connection
mongoose.connection.on('error', e => {
    console.log("MongoDB database connection failed", e);
})

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get cities
app.get('/getCities', (req, res) => {
    cityModel.find()
        .then(cities => res.json(cities))
        .catch(e => res.json(e));
});

// Get images
app.get('/getImages', async (req, res) => {

    try {
        const cursor = bucket.find({});
        const allData = await cursor.toArray();

        const imageData = allData.map((data) => {
            return new Promise((res, rej) => {
                const chunks = [];
                const downloadStream = bucket.openDownloadStream(data._id);

                downloadStream.on('data', chunk => {
                    chunks.push(chunk);
                });

                downloadStream.on('error', e => {
                    rej(e);
                })

                downloadStream.on('end', () => {
                    const buffer = Buffer.concat(chunks);
                    const base64Image = buffer.toString('base64');
                    res({
                        filename: data.filename,
                        contentType: data.contentType,
                        image: `data:${data.contentType};base64,${base64Image}`,
                        imageId: data._id
                    });
                });
            });
        });

        const images = await Promise.all(imageData);
        res.json(images);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Upload form datas
app.post('/postForm', upload.single('file'), async (req, res) => {

    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded!' });
    }
    
    const uploadFileStream = bucket.openUploadStream(req.file.originalname, {
        contentType: req.file.mimetype
    });

    uploadFileStream.end(req.file.buffer);

    uploadFileStream.on('finish', async () => {
        try {
            const uploadedFile = await bucket.find( { filename: req.file.originalname} ).toArray()

            if(!uploadedFile || uploadedFile.length === 0 ){
                res.status(404).json( {message: "Uploaded image not found!"} );
            }

            const newForm = new formModel({
                name: req.body.name || '',
                surname: req.body.surname || '',
                phone: req.body.phone || '',
                imageId: uploadedFile[0]._id  
            });

            await newForm.save();
            res.status(200).json({ message: "Form and image uploaded successfully." });

        } catch (e) {
            console.error("Error while saving form data:", e);
            res.status(500).json({ error: e.message });
        }
    });

    uploadFileStream.on('error', (e) => {
        console.error("Error while uploading file:", e);
        res.status(500).json({ error: e.message });
    });
});

// Listening Frontend 
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})

//node server.js