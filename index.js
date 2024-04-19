import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import multer from 'multer';
import path from 'path';
import fs from 'fs'
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



//fonction pour supprimer une image

function supprimerImage(cheminImage) {
  fs.unlink(cheminImage, (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.error('Image introuvable :', cheminImage);
      } else {
        console.error('Erreur lors de la suppression de l\'image :', err);
      }
    } else {
      console.log('Image supprimée avec succès :', cheminImage);
    }
  });
}


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
    const sql = `SELECT * FROM maison order by id desc`;
    mysqlConnexion.query(sql, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).json(data);
        }
    })
});

app.post('/choix_loyer',(req,res)=>{
    // let uid=req.params.uid
    const {uid}=req.body
    console.log(uid);
    const sql=`SELECT * FROM maison WHERE id=${uid}`;
    mysqlConnexion.query(sql,(err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).json(data);
            console.log(data);
        }
    })
})


app.post('/supprimer_maison',(req,res)=>{
    // let uid=req.params.uid
    const {id}=req.body
    console.log(id);
    const sql=`SELECT * FROM maison WHERE id=${id}`;
    mysqlConnexion.query(sql,(err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            // res.status(200).json(data);
            // console.log(data[0].photo1);
            supprimerImage(data[0].photo1)
            supprimerImage(data[0].photo2)
            //supprimerImage(data[0].photo3)
            const sqlDel=`DELETE FROM maison WHERE id=${id}`;
            mysqlConnexion.query(sqlDel,(errDel,dataRes)=>{
                if(errDel){
                    res.status(500).send(errDel)
                }
                else{
                    res.status(200).send('success');
                }
            })

        }
    })
})


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
});

app.post('/upload', upload.array('myFiles'), (req, res, next) => {
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
    const photo3 = req.files[2].path;

    const data = [magasin, cuisine, description, prix, composition, quartier, position, photo1, photo2, photo3]
    console.log(data);
    const sql = `INSERT INTO maison(magasin,cuisine,description,prix,composition,quartier,position,photo1,photo2,photo3) VALUES(?)`;
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