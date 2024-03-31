import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Navbar from './Components/Navbar';
import Accueil from './Components/Accueil';
import NewAnnonce from './Components/NewAnnonce';
import Louer from './Louer';
import Contact from './Contact';
import ChoixLoyer from './ChoixLoyer';
import AjoutMaison from './AjoutMaison';
import Footer from './Footer';
function App() {
  return (
    <>
      <Router>
        <Navbar/>
          <Routes>
              <Route path="/" exact element={<Accueil/>} />
              <Route path="/new_annonce" exact element={<NewAnnonce/>} />
              <Route path="/louer" exact element={<Louer/>} />
              <Route path="/contact" exact element={<Contact/>} />
              <Route path="/choix_loyer/:uid" exact element={<ChoixLoyer/>} />
              <Route path="/ajout_maison" exact element={<AjoutMaison/>} />
          </Routes>
          <Footer/>
      </Router>
    </>
  )
}

export default App
