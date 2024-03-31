import { useState } from "react";
import { Link } from "react-router-dom";
// import '../assets/styles/navbar.css'
import '../styles/navbar.css'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
export default function Navbar(){
    const [show,setShow]=useState(false);

    return(
        <div className="navbar">
            <div className="logo">
                <h1>Mali-Immo</h1>
            </div>
            <div className={show ? "nav-links show" : "nav-links"} id="nav-links">
                <Link to="/">Accueil</Link>
                <Link to="/louer">Louer</Link>
                <Link to="/new_annonce">Deposer une annonce</Link>
                <Link to="/contact">Contact</Link>
                <Link>A propos</Link>
            </div>
            <button className="burger"onClick={() => setShow(!show)} >
                {/* <img src="../assets/img/burger.png" alt="buger icon" /> */}
                { show ? <CloseIcon/> : <MenuIcon/>}
            </button>
        </div>
    )
}