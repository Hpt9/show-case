import { useEffect, useState } from "react";
import Active from "./Active";
import Archived from "./Archived";
import axios from "axios";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import AddPeopleModal from "./AddPeopleModal";
import { motion} from "framer-motion";
import LOADING from "../ph/loadingAni.gif"
export default function People() {
  const { t } = useTranslation();
  const [whichToShow, setWhichToShow] = useState("active");
  const [data, setData] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [key, setKey] = useState(100);
  const reloadActive = () => {
    setKey(prevKey => prevKey + 1);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleButtonClick = (option: string) => {
    setWhichToShow(option);
  };

  const renderComponent = () => {
    if (whichToShow === "active") {
      return <Active activeData={data.active} reloadActive={reloadActive}/>;
    } else if (whichToShow === "archived") {
      return <Archived archivedData={data.archived} reloadActive={reloadActive}/>;
    }
  };

  useEffect(() => {
    axios
      .get("https://run.mocky.io/v3/43b81524-384d-4ae1-8e95-5a7955142f86", {
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:5173'
        }
      })
      .then(function (response) {
        console.log(response.data.Contacts)
        setData(response.data.Contacts);
        if(response.status===200){
          setIsLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [key]);
  if (isLoading) {
    return <div style={{width:"100%",display:"flex",justifyContent:"center"}}><img src={LOADING} alt="Loading" /></div>;
  }

  return (
    <motion.div
      className="contacts_people"
      initial={{ translateX: -100, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: -100, opacity: 0 }}
      transition={{ duration: 0.2 }}
      key={key}
    >
      <div>
        <h1>{t("Contacts.people.h1")}</h1>
        <Button
          variant="contained"
          className="modal_opener"
          onClick={openModal}
        >
          {t("Contacts.people.btn")}
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
        <div className="formToTask2">
          <AddPeopleModal closeModal={closeModal} isModalOpen={isModalOpen} reloadActive={reloadActive}/>
        </div>
      )}
    </motion.div>
  );
}
