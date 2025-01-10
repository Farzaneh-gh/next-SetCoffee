"use client";
import React, { useState ,useEffect} from "react";
import styles from "./ScrollToTopButton.module.css";
import { MdKeyboardArrowUp } from "react-icons/md";

function ScrollToTopButton() {
    const [visibleButton,setVisibleButton] = useState(false);
    const goToTopHandler = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }
    useEffect(()=>{
        const showScrollButtonHandler = () => {
            if(window.scrollY>100){
                setVisibleButton(true)
            }else{
                if(window.scrollY<100){
                setVisibleButton(false)
            }
            }
        }
        window.addEventListener("scroll",showScrollButtonHandler);
        return ()=>window.removeEventListener("scroll",showScrollButtonHandler)
    },[visibleButton])
  return (
    <div className={visibleButton?styles.visible_button:styles.button} onClick={goToTopHandler}>
      <MdKeyboardArrowUp className={styles.icon} />
    </div>
  );
}

export default ScrollToTopButton;
