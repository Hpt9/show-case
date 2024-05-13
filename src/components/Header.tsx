import { useEffect, useState } from "react";
import Logo from "../assets/photos/Asset 4 1.svg";
import HM from "../assets/photos/hamburgerMenu.svg";
import "../scss/Header.scss";
import { motion, AnimatePresence } from "framer-motion";
import ModalMenu from "./ModalMenu";

export default function AppHeader() {
  
  const variants = {
    hidden: { translateX: -100 },
    visible: { translateX: 0 }
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AnimatePresence>
      <div className="header-div">
        {windowWidth <= 800 ? (
          <img
            src={HM}
            alt=""
            className="modal_opener"
            onClick={openModal}
          />
        ) : (
          <motion.img
            src={Logo}
            alt=""
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            transition={{ duration: 0.1 }}
          />
        )}
      </div>
      {isModalOpen && <ModalMenu closeModal={closeModal}/>}
    </AnimatePresence>
  );
}