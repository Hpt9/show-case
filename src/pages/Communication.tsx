import "../scss/Communication.scss"
import { useState } from "react";
import HGF from "../assets/photos/Hello-rafiki 1.svg"
import Button from '@mui/material/Button';
import SendMailModal from "../components/SendMailModal";
import { useTranslation } from "react-i18next";
export default function Communication() {
  const {t} = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="comm_div">
      <div className="inbox_div">
        <h3>{t("Communication.h1")}</h3>
        <div className="img_div">
          <img src={HGF} alt="" />
          <Button variant="contained"  onClick={openModal}>{t("Communication.b1")}</Button>
        </div>
      </div>
      {isModalOpen && 
      <div className="formToTask2">
        <SendMailModal closeModal={closeModal} isModalOpen={isModalOpen}/>
      </div>
      }
    </div>
  )
}
