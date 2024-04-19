import { useState } from "react"
import './styles/louer.css';
import { Link } from "react-router-dom";
import { LouerImagesHero } from "./Components/LouerImagesHero";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import LouerModeleHero from "./Components/LouerModeleHero";
export default function Louer() {
    //const [typeMaison, setTypeMaison] = useState("Type d'habitation");
    const [maisons, setMaisons] = useState([]);
    const [loader, setLoader] = useState(true);
     const [cuisine,setCuisine]=useState(false);

    var minPrix = 0;
    var maxPrix = 1000000;
    var prixMaison = 0;
    var indexQuartier=0;
    var typeMaison='';

    var quartierMaison = ''
    const quartiers = [
        {
            id_quartier: '1',
            nom_quartier: 'Niamakoro'
        },
        {
            id_quartier: '2',
            nom_quartier: 'Kalaban Coura'
        },
        {
            id_quartier: '3',
            nom_quartier: 'Niamana'
        },
        {
            id_quartier: '4',
            nom_quartier: 'Sebenicoro'
        },
        {
            id_quartier: '5',
            nom_quartier: 'Baco Djicoroni'
        },
        {
            id_quartier: '6',
            nom_quartier: 'Siracoro'
        },
        {
            id_quartier: '7',
            nom_quartier: 'Senou'
        },
        {
            id_quartier: '8',
            nom_quartier: 'Lafiabougou'
        },
    ];
    const composition = [
        {
            id_composition: '0',
            nom_composition: ''
        },
        {
            id_composition: '1',
            nom_composition: 'Rez-de-chausée'
        },
        {
            id_composition: '2',
            nom_composition: 'Premier étage'
        },
        {
            id_composition: '3',
            nom_composition: 'Deuxième étage'
        },

    ]
    const copyQuartier = quartiers.slice();
    const [dataQuartier, setDataQuartier] = useState(quartiers);
    // console.log(dataQuartier);



    useEffect(() => {

        fetch('http://localhost:5000/louer')
            .then(res => res.json())
            .then(data => {
                setMaisons(data);
                setLoader(false);
            })
            .catch(err => console.log(err))
    }, [])




    const [filters, setFilters] = useState({
        typeMaison: '',
        quartierFieldValue: '',
        tranchePrix: '',
        position: '',
        composition: '',
        magasin: '',
        cuisine: ''
    });


    const handleChange = (e) => {
        // setTypeMaison(e.target.value);
        // console.log(e.target.value);


        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
        //console.log(filters);

    }
    const filteredData = maisons.filter((item) => {
        prixMaison = parseInt(item.prix);
        const {quartierFieldValue, tranchePrix, position, composition, magasin} = filters;
        typeMaison=filters.typeMaison;

        //Trouver l'index du quartier dans le champ de recherche
        quartiers.map(quartier=>{
            if(quartier.nom_quartier==quartierFieldValue)
            {
                indexQuartier=quartier.id_quartier
            }
        });
       // console.log(indexQuartier);

        switch (tranchePrix) {
            case 'tranche0':
                maxPrix = 25000;
                break;
            case 'tranche1':
                minPrix = 25000;
                maxPrix = 50000;
                break;
            case 'tranche2':
                minPrix = 50000;
                maxPrix = 75000;
                break;
            case 'tranche3':
                minPrix = 75000;
                maxPrix = 100000;
                break;
            case 'tranche4':
                minPrix = 100000;
                maxPrix = 150000;
                break;

            case 'tranche5':
                minPrix = 150000;
                maxPrix = 10000000;
                break;
            default:
                <p>Tranche de prix incorrect ! </p>
        }
        
    //console.log(item.position);
        return (
            //item.typeMaisone.toLowerCase().includes(typeMaisone.toLowerCase()) &&
            //item.tranchePrix.toString().includes(tranchePrix) &&
            //item.position.toLowerCase().includes(position.toLowerCase())
            //item.composition==composition &&
            prixMaison >= minPrix &&
            prixMaison <= maxPrix &&
            item.position == position &&
            item.quartier == indexQuartier

        );

    });
    console.log(cuisine);

   // console.log(typeMaison);
    console.log(filteredData);

    let navigate = useNavigate();

    const userId = (id) => {
        navigate("/choix_loyer/" + id)
    }

    return (
        <div className="Louer" louerImagesHero={LouerImagesHero}>
            <p className="title">Rechercher une annonce sur MALI-IMMO...</p>
            <form action="">
                <div className="criteres">
                    <div className="element typeMaison">
                        <select name="typeMaison" value={filters.typeMaison} onChange={handleChange}>
                            <option value="">Type d'habitation</option>
                            <option value="maison">Maison</option>
                            <option value="appartement">Appartement</option>
                            <option value="magasin">Magasin</option>
                        </select>
                    </div>
                    <div className="element quartier">
                        <input type="text" placeholder="Quartier" list="quartiers" name="quartierFieldValue" value={filters.quartierFieldValue} onChange={handleChange} />
                        <datalist id="quartiers">
                            {
                                quartiers.map(quartier => (
                                    <option value={quartier.nom_quartierquartier}>{quartier.nom_quartier}</option>
                                ))
                            }

                        </datalist>
                    </div>

                    <div className="element position">
                        <select name="tranchePrix" value={filters.tranchePrix} onChange={handleChange}>
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
                        <select name="position" value={filters.position} onChange={handleChange}>
                            <option value="">Position</option>
                            <option value="1">Rez-de-chaussé</option>
                            <option value="2">Premier étage</option>
                            <option value="3">Deuxième étage</option>
                        </select>
                    </div>
                    <div className={typeMaison == "maison" || "" ? "element composition" : "pas_affichage"}>
                        <select name="composition" value={filters.composition} onChange={handleChange}>
                            <option value="" >Composition</option>
                            <option value="1">chambre unique</option>
                            <option value="composition1">1 chambre salon</option>
                            <option value="composition2">2 chambres salon</option>
                        </select>
                    </div>
                </div>
                <div className=" checkbox">
                    <div className={typeMaison == "maison" || "" ? "magasin" : "pas_affichage"}>
                        <input type="checkbox" name="magasin" value={filters.magasin} id="" onChange={handleChange} /><span>Avec magasin</span>
                    </div>
                    <div className={typeMaison == "maison" || "" ? "cuisine" : "pas_affichage"}>
                        <input type="checkbox" name="cuisine" value={filters.cuisine} id="" onChange={handleChange} onClick={()=>setCuisine(!cuisine)}/><span>Avec cuisine</span>
                    </div>
                </div>
                <button>Rechercher</button>
            </form>
            {!loader && <div className="resultats">
                {
                    maisons.map(maison => {
                        quartiers.map(quartier => {
                            if (quartier.id_quartier == maison.quartier) {
                                // maison.quartier = quartier.nom_quartier
                                quartierMaison = quartier.nom_quartier
                            }
                            composition.map(composition => {
                                if (composition.id_composition == maison.composition) {
                                    maison.composition = composition.nom_composition
                                }
                            })
                        })
                        return (
                            <div className="card">
                                <div className="content-img">
                                    <img src={maison.photo1} alt="" />
                                </div>
                                <p><span>{maison.composition}</span></p>
                                <p><span>{quartierMaison}</span></p>
                                <p><span>{maison.prix} FCFA</span></p>
                                <div className="btn-info">
                                    <button onClick={() => userId(maison.id)}>Plus d'info</button>
                                </div>
                            </div>
                        )
                    })}


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