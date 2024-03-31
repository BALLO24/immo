import './styles/ajout_maison.css'
import {useState } from "react";
import axios from "axios";

export default function AjoutMaison() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [quartier,setQuartier]=useState('1');
    const [composition, setComposition]=useState('1');
    const [position,setPosition]=useState('1');
    const [magasin, setMagasin] = useState("1");
    const [cuisine,setCuisine]=useState('1');
    const [description,setDescription]=useState('Description de la maison ici')
    const [prix,setPrix]=useState('')

    const handleFile = (e) => {
        setSelectedFiles(e.target.files)
    }

    /*useEffect(()=>{
        axios.get('http://localhost:5000/')
        .then(res => {
            setData(res.data[0])
            console.log(data.contenu);
        })
        .catch(err => console.log(err))
    },[])*/
    
    const handleUpload = (e) => {
        e.preventDefault();
        console.log(selectedFiles);
        const formData = new FormData();
        //formData.append('myFiles', selectedFiles);
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('myFiles', selectedFiles[i])
        }
        formData.append('quartier', quartier);
        formData.append('composition', composition);
        formData.append('position', position);
        formData.append('magasin', magasin);
        formData.append('cuisine', cuisine);
        formData.append('prix', prix);
        formData.append('description', description);
        console.log(formData);
        axios.post('http://localhost:5000/upload', formData)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        // fetch('http://localhost:5000/upload', {method:'POST', body: JSON.stringify(formData) })
        //     .then(response => response.json())
        //     .then(jsonResponse => console.log('Success: ', jsonResponse))
        //     .catch(error => console.log('Error: ', error));
    }
    return (
        <div>
            <form action="" encType="multipart/form-data" onSubmit={handleUpload}>
                <h1>Enregistrer une nouvelle maison</h1>
                <div className="input">
                    <label htmlFor="quartier">Quartier : </label>
                    <select name="quartier" onChange={e => setQuartier(e.target.value)}>
                        <option value="1">Kalaban Coura</option>
                        <option value="2">Niamakoro</option>
                        <option value="3">Daoudabougou</option>
                        <option value="4">Badalabougou</option>
                        <option value="5">Hamdallaye</option>
                        <option value="6">Banankabougou</option>
                        <option value="7">Senou</option>
                        <option value="8">Niamana</option>
                    </select>
                </div>
                <div className="input">
                    <label htmlFor="position">Composition : </label>
                    <select name="composition" onChange={e => setComposition(e.target.value)}>
                        <option value="1">Chambre unique</option>
                        <option value="2">Chambre Salon</option>
                        <option value="3">2 Chambres Salon</option>
                        <option value="4">3 Chambres Salon</option>
                    </select>
                </div>
                <div className="input">
                    <label htmlFor="position">Position : </label>
                    <select name="position" onChange={e => setPosition(e.target.value)}>
                        <option value="1">Rez-de-chaussée</option>
                        <option value="2">Premier étage</option>
                        <option value="3">Deuxième étage</option>
                    </select>
                </div>

                <div className="input">
                    <label htmlFor="magasin">Magasin : </label>
                    <select name="magasin" onChange={e => setMagasin(e.target.value)}>
                        <option value="1">Oui</option>
                        <option value="0">Non</option>
                    </select>
                </div>
                <div className="input">
                    <label htmlFor="cuisine">Cuisine : </label>
                    <select name="cuisine" onChange={e => setCuisine(e.target.value)}>
                        <option value="1">Oui</option>
                        <option value="0">Non</option>
                    </select>
                </div>
                <div className="input">
                    <label htmlFor="myFiles">Description : </label>
                    <textarea type="text" name="prix" className="myFiles" rows={15} value={description} onChange={e => setDescription(e.target.value)}></textarea>
                </div>
                <div className="input">
                    <label htmlFor="myFiles">Prix : </label>
                    <input type="text" name="prix" onChange={e => setPrix(e.target.value)}/>
                </div>
                {/* <div className="input">
                    <input type="text" name="text" onChange={handleText} />
                </div> */}
                <div className="input">
                    <label htmlFor="myFiles">Choisr les images : </label>
                    <input type="file" name="myFiles" className="myFiles" multiple onChange={handleFile} />
                </div>
                <button type="submit" className="upload-btn">Enregistrer</button>
                <br />
                {/* <img src={'images/'+ data.contenu} alt="Affichege Photo telechargé" /> */}
            </form>
        </div>
    )
}