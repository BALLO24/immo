import ImageGallery from "react-image-gallery";
import '../src/styles/index.scss';
import '../src/styles/louer.css';
import React, { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';

  
  export default function ChoixLoyer(){
    const [maison,setMaison]=useState([])
    const [loader,setLoader]=useState(true);
    const[chemin_photo1,setCheminPhoto1]=useState("")
    const[chemin_photo2,setCheminPhoto2]=useState("")
    const[chemin_photo3,setCheminPhoto3]=useState("")

    let params=useParams();
    const uid=params.uid
    useEffect(()=>{
      fetch("http://localhost:5000/choix_loyer",{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid })
      })
        .then(res=> res.json())
        .then(maison=> {
          setMaison(maison);
          console.log(maison[0].photo1);
          setLoader(false);
          const photo1=maison[0].photo1.split("").slice(6);
          const photo2=maison[0].photo2.split("").slice(6);
          const photo3=maison[0].photo3.split("").slice(6);
          photo1[0]='/';
          photo2[0]='/';
          photo3[0]='/';
          setCheminPhoto1(photo1.join(""))
          setCheminPhoto2(photo2.join(""))
          setCheminPhoto3(photo3.join(""))
      
        })

    },[])
    const images = [
      // {
      //   original: "https://picsum.photos/id/1018/1000/600/",
      //   thumbnail: "https://picsum.photos/id/1018/250/150/",
      // },
      // {
      //   original: "https://picsum.photos/id/1015/1000/600/",
      //   thumbnail: "https://picsum.photos/id/1015/250/150/",
      // },
      // {
      //   original: "https://picsum.photos/id/1019/1000/600/",
      //   thumbnail: "https://picsum.photos/id/1019/250/150/",
      // },
      {
        original: chemin_photo1,
        thumbnail: chemin_photo1,
      },
      {
        original: chemin_photo2,
        thumbnail: chemin_photo2,
      },
      {
        original: chemin_photo3,
        thumbnail: chemin_photo3,
      },


    ];

    return(
        <div className="choix_loyer">
          
              {!loader && <div className="gallery">
                <ImageGallery className="" originalHeight items={images} />
                {/* <div><img src={chemin_photo1}alt="jerjrejejejej" /></div> */}
                <h2>Description</h2>
                <p className="margin text">{maison[0].description}</p>
                <h2>Position</h2>
                <a className="margin" href={maison[0].localisation}>Voir la position sur Maps <OpenInNewIcon/></a>
                <h2 className="margin">Prix : {maison[0].prix} FCFA</h2>
                <h2 className="margin">Contacts</h2>
                <p className="margin">(+223) 82 08 38 14 & 64 60 00 36</p>
                <h2 className="margin">Réseaux sociaux</h2>
                <a className="margin-right"  aria-label="Chat WhatsApp" href="https://wa.me/+22382083814">
                <WhatsAppIcon className="green"/>
              </a>
              <a  aria-label="Chat Telegram" href="https://t.me/+22382083814">
                <TelegramIcon className="blue"/>
              </a>
              </div>
              
              }
        </div>
    )
  }
  