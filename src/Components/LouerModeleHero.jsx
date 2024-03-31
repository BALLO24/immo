import React, { useState,useCallback,useRef,useEffect } from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function LouerModeleHero({LouerImagesHero}){
    const [currentIndex,setCurrentIndex]=useState(0);
    const slideStyles={
        width:"200px",
        height:"200px",
        //borderRadius:"10px",
        backgroundPosition:"center",
        backgroundSize:"cover",
        backgroundImage:`url(${ImagesHero[currentIndex].url})`,
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    };
    const sliderStyles={
        height:"100%",
        position:"relative",
    };
    const leftArrowStyles={

        position:"absolute",
        top:"50%",
        transform:"translateY(-50%)",
        left:"18px",
        fontSize:"20px",
        color:"white",
        zIndex:1,
        cursor:"pointer",
        //backgroundImage:`url('assets/img/left.png')`
    }
    const rightArrowStyles={
        position:"absolute",
        top:"50%",
        transform:"translateY(-50%)",
        right:"18px",
        fontSize:"20px",
        color:"white",
        zIndex:1,
        cursor:"pointer",
    };

    const titre={
        color:"white",
        fontSize:"3em",
    }

    const goToNext=useCallback(()=>{
        const isLastSlide=currentIndex===ImagesHero.length-1;
        const newIndex=isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    },[currentIndex,ImagesHero]);
    const goToPrevious=()=>{
        const isFirstSlide=currentIndex===0;
        const newIndex=isFirstSlide ? ImagesHero.length-1:currentIndex-1;
        setCurrentIndex(newIndex);
    }

    const timerRef=useRef(null);

useEffect(()=>{
    if(timerRef.current){
        clearTimeout(timerRef.current)
    }
    timerRef.current=setTimeout(()=>{
        goToNext();
    },3000);
    return ()=>clearTimeout(timerRef.current);
},[goToNext])



    return(
        <div style={sliderStyles}>
            <div style={leftArrowStyles} onClick={goToPrevious}> <ArrowBackIosIcon/> </div>
            <div style={rightArrowStyles} onClick={goToNext}><ArrowForwardIosIcon/></div>
            <div style={slideStyles}>
                <h1 style={titre}>{ImagesHero[currentIndex].text}</h1>
            </div>
        </div>
    )
}