import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './styles/louer.css';

export default function SupprimerMaison() {

    const [data, setData] = useState([])
    const [loader, setLoader] = useState(true);
    let navigate = useNavigate();

    useEffect(() => {

        fetch('http://localhost:5000/louer')
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoader(false);
                console.log(data);
            })
            .catch(err => console.log(err))
    }, []);
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
            nom_quartier: ''
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

    const userId = (id) => {
        if(confirm(" Voulez-vous vraiment supprimer la maison d'id : "+id)){
           fetch("http://localhost:5000/supprimer_maison",{
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({id})
           })
           .then(res=> {
            if(res.status==200){
                alert("Maison suppriméé avec succès")
                navigate('/supprimer_maison');
            }
           })
           .catch(err => console.log(err))
        }
        //navigate("/supprimer_maison/" + id)
    }

    return (
        <div>
            {
                !loader && <div className="resultats">
                    {
                        data.map(maison => {
                            quartiers.map(quartier => {
                                if (quartier.id_quartier == maison.quartier) {
                                    maison.quartier = quartier.nom_quartier
                                }
                            })

                            composition.map(composition => {
                                if (composition.id_composition == maison.composition) {
                                    maison.composition = composition.nom_composition
                                }
                            })
                            return (
                                    <div className="card">
                                        <div className="content-img">
                                            <img src={maison.photo1} alt="" />
                                        </div>
                                        <p><span>{maison.composition}</span></p>
                                        <p><span>{maison.quartier}</span></p>
                                        <p><span>{maison.prix} FCFA</span></p>
                                        <div className="btn-info">
                                            <button onClick={() => userId(maison.id)}>Supprimer</button>
                                        </div>
                                    </div>

                            )
                        })
                    }
                </div>
            }

        </div>
    )
}