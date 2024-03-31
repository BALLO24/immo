import{ ImagesHero }from './ImagesHero'
import ModeleHero from "./ModeleHero"
export default function HeroBanner(){
    const containerStyles={
        width:"100%",
        // height:"400px",
        // height:"25%",
        margin:"0 auto",
      };
      
    return(
        <div style={containerStyles}>
            <ModeleHero ImagesHero={ImagesHero}/>
        </div>
    )
}