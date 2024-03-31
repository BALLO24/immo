import { useState } from "react"
import './styles/louer.css';
import { Link } from "react-router-dom";
import { LouerImagesHero } from "./Components/LouerImagesHero";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import LouerModeleHero from "./Components/LouerModeleHero";
export default function Louer() {
    const [typeMaison, setTypeMaison] = useState("Type d'habitation");
    const [maisons, setMaisons] = useState([]);
    const [loader, setLoader] = useState(true);
    useEffect(()=>{

        fetch('http://localhost:5000/louer')
        .then(res=>res.json())
        .then(data=>{setMaisons(data);
            console.log(data);
                    setLoader(false)})
        .catch(err=>console.log(err))
    }, [])

    const quartiers=[
        {
            id_quartier:'1',
            nom_quartier:'Niamakoro'
        },
        {
            id_quartier:'2',
            nom_quartier:'Kalaban Coura'
        },
        {
            id_quartier:'3',
            nom_quartier:'Niamana'
        },
        {
            id_quartier:'4',
            nom_quartier:''
        },
        {
            id_quartier:'5',
            nom_quartier:'Baco Djicoroni'
        },
        {
            id_quartier:'6',
            nom_quartier:'Siracoro'
        },
        {
            id_quartier:'7',
            nom_quartier:'Senou'
        },
        {
            id_quartier:'8',
            nom_quartier:'Lafiabougou'
        },
    ];

    const composition=[
        {
            id_composition:'0',
            nom_composition:''
        },
        {
            id_composition:'1',
            nom_composition:'Rez-de-chausée'
        },
        {
            id_composition:'2',
            nom_composition:'Premier étage'
        },
        {
            id_composition:'3',
            nom_composition:'Deuxième étage'
        },

    ]

    const handleChange = (e) => {
        setTypeMaison(e.target.value);
        console.log(e.target.value);
    }
    let navigate=useNavigate();

    const userId=(id)=>{
        navigate("/choix_loyer/"+id)
    }
    const [fieldQuartier,setFieldQuartier]=useState("");
    const onChange=(e)=>{
        setFieldQuartier(e.target.value);
    }

    return (
        <div className="Louer" louerImagesHero={LouerImagesHero}>
            {/* {loader && <img src={maisons[0].photo2} alt="" />} */}
            <p className="title">Rechercher une annonce sur MALI-IMMO...</p>
            <form action="">
                <div className="criteres">
                    <div className="element typeMaison">
                        <select value={typeMaison} onChange={handleChange}>
                            <option value="">Type d'habitation</option>
                            <option value="maison">Maison</option>
                            <option value="appartement">Appartement</option>
                            <option value="magasin">Magasin</option>
                        </select>
                    </div>
                    <div className="element quartier">
                        <input type="text" placeholder="Quartier" value={fieldQuartier}  onChange={onChange}/>
                        <div className="search_results">
                            <div>A</div>
                            <div>B</div>
                            <div>A</div>
                            <div>B</div>
                            <div>A</div>
                            <div>B</div>
                            <div>A</div>
                            <div>B</div>
                            <div>A</div>
                            <div>B</div>
                            <div>A</div>
                            <div>B</div>
                            <div>A</div>
                            <div>B</div>

                        </div>
                        
                     </div>

                    <div className="element position">
                        <select >
                            <option value="">Tranches de prix en FCFA</option>
                            <option value="tranche0">dessous de 25 000 FCFA</option>
                            <option value="tranche1">25 000 FCFA - 50 000 FCFA</option>
                            <option value="tranche2">50 000 FCFA - 75 000 FCFA</option>
                            <option value="tranche3">75 000 FCFA - 100 000 FCFA</option>
                            <option value="tranche4">100 000 FCFA - 150 000 FCFA</option>
                            <option value="tranche5">150 000 FCFA et plus</option>
                        </select>
                    </div>
                    <div className="element position">
                        <select >
                            <option value="">Position</option>
                            <option value="position0">Rez-de-chaussé</option>
                            <option value="position1">Premier étage</option>
                            <option value="position2">Deuxième étage</option>
                        </select>
                    </div>
                    <div className={typeMaison == "maison" || "" ? "element composition" : "pas_affichage"}>
                        <select >
                            <option value="" >Composition</option>
                            <option value="composition0">chambre unique</option>
                            <option value="composition1">1 chambre salon</option>
                            <option value="composition2">2 chambres salon</option>
                        </select>
                    </div>
                </div>
                <div className=" checkbox">
                    <div className={typeMaison == "maison" || "" ? "magasin" : "pas_affichage"}>
                        <input type="checkbox" name="" id="" /><span>Avec magasin</span>
                    </div>
                    <div className={typeMaison == "maison" || "" ? "cuisine" : "pas_affichage"}>
                        <input type="checkbox" name="" id="" /><span>Avec cuisine</span>
                    </div>
                </div>
                <button>Rechercher</button>
            </form>
            {!loader && <div className="resultats">
            { 
                maisons.map(maison =>{
                quartiers.map(quartier=>{
                    if(quartier.id_quartier==maison.quartier){
                         maison.quartier=quartier.nom_quartier
                    }
                    composition.map(composition =>{
                        if(composition.id_composition==maison.composition){
                            maison.composition=composition.nom_composition
                        }
                    })
                })
                return(
                    <div className="card">
                    <div className="content-img">
                        <img src={maison.photo1} alt="" />
                    </div>
                    <p><span>{maison.composition}</span></p>
                    <p><span>{maison.quartier}</span></p>
                    <p><span>{maison.prix} FCFA</span></p>
                    <div className="btn-info">
                        <button onClick={()=>userId(maison.id)}>Plus d'info</button>
                    </div>
                </div>
                )
            }) }

                
                <div className="card">
                    <div className="content-img">
                        <img src="../../img/maisons/mini1.jpg" alt="mini villa 1" />
                    </div>
                    <p><span>2 chambres salon</span></p>
                    <p><span>Niamakoro</span></p>
                    <p><span>75 000 FCFA</span></p>
                    <div className="btn-info">
                        <Link to="/choix_loyer">Plus d'info</Link>
                    </div>
                </div>
                <div className="card">
                    <div className="content-img">
                        <img src="../../img/maisons/mini2.jpg" alt="mini villa 2" />
                    </div>
                    <p><span>2 chambres salon</span></p>
                    <p><span>Kalaban Coura</span></p>
                    <p><span>50 000 FCFA</span></p>
                    <div className="btn-info">
                        <Link to="/choix_loyer">Plus d'info</Link>
                    </div>
                </div>
                <div className="card">
                    <div className="content-img">
                        <img src="../../img/maisons/mini3.jpg" alt="mini villa 3" />
                    </div>
                    <p><span>2 chambres salon</span></p>
                    <p><span>Kalaban Coura</span></p>
                    <p><span>75 000 FCFA</span></p>
                    <div className="btn-info">
                        <Link to="/choix_loyer">Plus d'info</Link>
                    </div>
                </div>
                <div className="card">
                    <div className="content-img">
                        <img src="../../img/maisons/mini4.jpg" alt="mini villa 4" />
                    </div>
                    <p><span>2 chambres salon</span></p>
                    <p><span>Kalaban Coura</span></p>
                    <p><span>60 000 FCFA</span></p>
                    <div className="btn-info">
                        <Link to="/choix_loyer">Plus d'info</Link>
                    </div>
                </div>
                <div className="card">
                    <div className="content-img">
                        <img src="../../img/maisons/mini5.jpg" alt="mini villa 5" />
                    </div>
                    <p><span>2 chambres salon</span></p>
                    <p><span>Kalaban Coura</span></p>
                    <p><span>50 000 FCFA</span></p>
                    <div className="btn-info">
                        <Link to="/choix_loyer">Plus d'info</Link>
                    </div>
                </div>
                <div className="card">
                    <div className="content-img">
                        <img src="../../img/maisons/mini6.jpg" alt="mini villa 6" />
                    </div>
                    <p><span>2 chambres salon</span></p>
                    <p><span>Kalaban Coura</span></p>
                    <p><span>50 000 FCFA</span></p>
                    <div className="btn-info">
                        <Link to="/choix_loyer">Plus d'info</Link>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}