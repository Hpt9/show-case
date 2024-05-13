import { useState, useEffect } from "react";
import axios from "axios";
import Dot3 from "../ph/3dot.svg";
import Dot from "../ph/Dot.svg"
import CallTable from "./CallTable";
import TextTable from "./TextTable";
import { useTranslation } from 'react-i18next';
import EmailTable from "./EmailTable";

export default function Commmunications() {
  const {t} = useTranslation();
  const [data, setData] = useState();
  const [whichToShow, setWhichToShow] = useState("call");
  const [dataTSent, setDataTSent] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:8000/Leads")
      .then((response) => {
        setData(response.data.communications);
        setDataTSent(response.data.communications.filter((item:any) => item.type.toLowerCase() === "call"));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleButtonClick = (option: string) => {
    const filteredData = data?.filter((item:any) => item.type.toLowerCase() === option);
    setDataTSent(filteredData);
    setWhichToShow(option);
  };

  const renderComponent = () => {
    if (whichToShow === "call") {
      return <CallTable data={dataTSent}/>;
    } else if (whichToShow === "text") {
      return <TextTable data={dataTSent}/>;
    }else if (whichToShow === "email") {
      return <EmailTable data={dataTSent}/>;
    }
  };
  console.log(dataTSent);
  return (
    <div className="communication_div" style={{position:"relative"}}>
      <div
      style={{
        position:"sticky",
        paddingTop:"5px",
        top:"-20px",
        left:"-10px",
        width:"100%",
        backgroundColor:"white",
        zIndex:"2000000000"
        }} className="trt">
        <h1>{t("Leads.dashboard.communications")}</h1>
        <img src={Dot3} alt="" />
      </div>
      <div
      style={{
        position:"sticky",
        paddingTop:"5px",
        top:"12px",
        width:"100%",
        backgroundColor:"white"
    }}>
      <div className="type_changer">
        <button
          onClick={() => handleButtonClick("call")}
          className={whichToShow === "call" ? "active_button" : ""}
        >
          {t("Leads.dashboard.call")}
        </button>
        <button
          onClick={() => handleButtonClick("text")}
          className={whichToShow === "text" ? "active_button" : ""}
        >
          {t("Leads.dashboard.text")}
        </button>
        <button
          onClick={() => handleButtonClick("email")}
          className={whichToShow === "email" ? "active_button" : ""}
        >
          {t("Leads.dashboard.email")}
        </button>
      </div>
      </div>
      <div className="comm_table_header">
                <div>{t("Leads.dashboard.conts")}</div>
                <div>{t("Leads.dashboard.type")}</div>
                <div>{t("Leads.dashboard.mess")}</div>
                <div><img src={Dot} alt=""/></div>
        </div>

      <div>{renderComponent()}</div>
    </div>
  );
}
