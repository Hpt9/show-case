import { useState, useEffect } from "react";
import CoActive from "./CoActive";
import CoArchived from "./CoArchived";
import axios from "axios";
import { Button } from "@mui/material";
import AddCompanyModal from "./AddCompanyModal";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import LOADING from "../ph/loadingAni.gif"


export default function Company() {
  const { t } = useTranslation();
  const [whichToShow, setWhichToShow] = useState("active");
  const [data, setData] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleButtonClick = (option: any) => {
    setWhichToShow(option);
  };
  const renderComponent = () => {
    if (whichToShow === "active") {
      return <CoActive activeData={data?.active} />;
    } else if (whichToShow === "archived") {
      return <CoArchived archivedData={data?.archived} />;
    }
  };
  useEffect(() => {
    axios
      .get("https://my-final-project-45l9.onrender.com/api/company")
      .then(function (response) {
        setData(response.data);
        if(response.status===200){
     setIsLoading(false);
        }
   
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  if (isLoading) {
    return <div style={{width:"100%",display:"flex",justifyContent:"center"}}><img src={LOADING} alt="Loading" /></div>;
  }
  
  return (
    <motion.div
      className="contacts_company"
      initial={{ translateX: -100, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: -100, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div>
        <h1>{t("Contacts.people.company")}</h1>
        <Button variant="contained" onClick={openModal}>
          {t("Contacts.people.addCompany")}
        </Button>
      </div>
      <div>
        <div className="type_changer">
          <button
            onClick={() => handleButtonClick("active")}
            className={whichToShow === "active" ? "active_button" : ""}
          >
            {t("Contacts.type_changer.active")}
          </button>
          <button
            onClick={() => handleButtonClick("archived")}
            className={whichToShow === "archived" ? "active_button" : ""}
          >
            {t("Contacts.type_changer.archived")}
          </button>
        </div>
        <div>{renderComponent()}</div>
      </div>
      {isModalOpen && (
        <div className="formToTask4">
          <AddCompanyModal closeModal={closeModal} isModalOpen={isModalOpen} />
        </div>
      )}
    </motion.div>
  );
}
