import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from 'react-router-dom';

export default function Footer(){
    return(
        <div className='Footer' >
            <p> (c) 2023 Mali-Immo. All rights reserved</p>
            <footer className="content-footer">
                <div className="terms">
                    <Link>A propos de nous</Link>
                    <Link>Conditions d'utilisation</Link>
                    <Link>Plus d'informations</Link>
                    <Link>Besoin d'aide</Link>
                    <Link>Signaler une anomalie</Link>
                </div>
                <div className="reseau-social">
                    <a href="#" className='youtube'><YouTubeIcon/></a>
                    <a href="#" className='facebook'><FacebookIcon/></a>
                    <a href="#" className='instagram'><InstagramIcon/></a>
                    <a href="#" className='linkedIn'><LinkedInIcon/></a>
                    <a href="#" className='twitter'><TwitterIcon/></a>
                </div>
            </footer>
        </div>
    )
}