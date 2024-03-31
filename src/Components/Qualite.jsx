import '../styles/accueil.css'
const center={ textAlign:"center"}
export default function Qualite(){
    return(
        <div className='content-qualite'>
            <div className="title-qualite">
                <h1 >Faciles d'utilisation</h1>
            </div>
            <div style={center} className="qualites">
                <div className="qualite">
                    L'offre la plus complète.
                </div>
                <div className="qualite">
                    Des filtres avancés.
                </div>
                <div className="qualite">
                   Disponible 24H/24 et 7J/7.
                </div>
                <div className="qualite">
                    Agents très dynamiques.
                </div>
            </div>
        </div>
    )
}