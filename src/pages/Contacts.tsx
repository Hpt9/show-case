import { useState } from "react";
import "../scss/Contacts.scss";
import { useTranslation } from "react-i18next";
import People from "../components/ContacsComponents/People";
import Roles from "../components/ContacsComponents/Roles";
import Company from "../components/ContacsComponents/Company";
export default function Contacts() {
  // const [cData,setCData] = useState()
  // useEffect(() => {
  //   fetch("http://localhost:8000/Contacts")
  //   .then((res) => res.json())
  //   .then((data:any) => {
  //       setCData(data)
  //   });
  //   }, []);
  const { t } = useTranslation();
  const [whichToShow, setWhichToShow] = useState("people");

  const handleButtonClick = (option: any) => {
    setWhichToShow(option);
  };
  const renderComponent = () => {
    if (whichToShow === "people") {
      return <People />;
    } else if (whichToShow === "roles") {
      return <Roles />;
    } else if (whichToShow === "company") {
      return <Company />;
    }
  };
  return (
    <div className="contactsDiv">
      <div className="contacts-main">
        <div className="type_changer">
          <button
            onClick={() => handleButtonClick("people")}
            className={whichToShow === "people" ? "active_button" : ""}
          >
            {t("Contacts.tabs.t1")}
          </button>
          <button
            onClick={() => handleButtonClick("roles")}
            className={whichToShow === "roles" ? "active_button" : ""}
          >
            {t("Contacts.tabs.t2")}
          </button>
          <button
            onClick={() => handleButtonClick("company")}
            className={whichToShow === "company" ? "active_button" : ""}
          >
            {t("Contacts.tabs.t3")}
          </button>
        </div>
        <div>{renderComponent()}</div>
      </div>
    </div>
  );
}
