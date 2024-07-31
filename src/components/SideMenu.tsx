import { useState, useEffect, useContext } from "react";
import "../scss/SideMenu.scss";
import { obj } from "../exportedArrays";
import Button from '@mui/material/Button';
import { motion, AnimatePresence } from "framer-motion";
import { isLoggedContext } from '../App';
import { useTranslation } from "react-i18next";
import Modal from '../components/SettingsModal';
import AZE from "../components/ph/azerbaijan.png"
import ENG from "../components/ph/united-kingdom.png"

export default function SideMenu() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const { activeIndex,setActiveIndex } = useContext(isLoggedContext);
  const storedIndex = sessionStorage.getItem('activeIndex');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [posX, setPosX] = useState('')
  const [posY, setPosY] = useState('')
  useEffect(() => {
    if (storedIndex) { setActiveIndex(parseInt(storedIndex)); }
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    console.log(setPosX,setPosY)
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth <= 800) { setIsVisible(false);handleCloseModal() } else { setIsVisible(true); }
  }, [windowWidth]);

  const variants = {
    hidden: { translateX: -100 },
    visible: { translateX: 0 }
  };


  const handleClick = (elang: string) => {
    i18n.changeLanguage(elang);
    // window.location.reload();
  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
  }
  const handleItemClick = (index: any, nav: string) => { 
    setActiveIndex(index); 
    window.history.pushState(null, "", nav); 
    window.dispatchEvent(new PopStateEvent("popstate")); 
    sessionStorage.setItem('activeIndex', index); 
  }; 
  const handleItemClick2 = (index: any) => {
    setActiveIndex(index);
    setIsModalOpen(true); // Open modal when "Settings" is clicked
    sessionStorage.setItem('activeIndex', index);
    console.log("Mouse click position - X:", posX, "Y:", posY);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="sidemenu-div"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variants}
          transition={{ duration: 0.1 }}
          key={"sidemenu"}
        >
          <div className="account">
            {obj.map((item, index) => (
              <div key={`item-${index}`} className={`item ${activeIndex === index ? "active-menu" : ""}`}
                onClick={() => {
                  if (item.sname === "Settings") {
                    handleItemClick2(index);
                  } else {
                    handleItemClick(index, item.navigate);
                  }
                }}
              >
                <span className={`item ${activeIndex === index ? "active" : ""}`}>
                  {item.svg}
                </span>
                <span>{t(`SideMenu.${item.sname}`)}</span>
              </div>
            ))}
          </div>
          <div className="language">
              <Button variant="outlined" onClick={() => handleClick("aze")}>
                <img src={AZE} alt="" width={15} height={15}/>
                <span>AZE</span>
              </Button>
              <Button variant="outlined" onClick={() => handleClick("en")}>
                <img src={ENG} alt="" width={15} height={15}/>
                <span>ENG</span>
              </Button>
          </div>
        </motion.div>
      )}
      {isModalOpen && <Modal onClose={handleCloseModal} positionX={posX} positionY={posY}/>}
    </AnimatePresence>
  );
}