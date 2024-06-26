import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import multer from 'multer';
import path from 'path';
const app = express();
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})


const port = 5000;

var mysqlConnexion = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'bdimmo'
});
mysqlConnexion.connect((err) => {
    if (!err) {
        console.log("Connection au DB immo ok");
    }
    else {
        console.log("Connection au DB echoué");
    }
})

app.get('/louer', (req, res) => {
    const sql = `SELECT * FROM maison order id desc`;
    mysqlConnexion.query(sql, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).json(data);
            console.log(data);
        }
    })
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
});

app.post('/upload', upload.array('myFiles'), (req, res, next) => {
    // console.log(req.files);
    const quartier = req.body.quartier;
    const composition = req.body.composition;
    const position = req.body.position;
    const magasin = req.body.magasin;
    const cuisine = req.body.cuisine;
    const description = req.body.description;
    const prix = req.body.prix;

    //liens des images
    const photo1 = req.files[0].path;
    const photo2 = req.files[1].path;

    const data = [magasin, cuisine, description, prix, composition, quartier, position, photo1, photo2]
    console.log(data);
    const sql = `INSERT INTO maison(magasin,cuisine,description,prix,composition,quartier,position,photo1,photo2) VALUES(?)`;
    mysqlConnexion.query(sql, [data], (err, data) => {
        if (err) {

            // res.status(500).send('erreur');
            console.log(err);
        }
        else {
            res.status(200).send('succes');
        }
    })
})

app.listen(port, () => { console.log(port); })