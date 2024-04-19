import { Link } from "react-router-dom"
export default function(){
    return(
        <div>
            <h1>Admin Page</h1>
            <Link to="/ajout_maison">Ajouter une maison</Link>
            <Link to="/supprimer_maison">Supprimer une maison</Link>


        </div>
    )
}