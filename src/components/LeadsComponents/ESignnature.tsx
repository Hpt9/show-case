import { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/joy/CircularProgress";
import Dot from "../ph/Dot.svg";
import All from "./All";
import Pending from "./Pending";
import Signed from "./Signed";
import UnSent from "./UnSent";
import { useTranslation } from "react-i18next";

export default function ESignnature() {
  const { t } = useTranslation();
  const [data, setData] = useState();
  const [whichToShow, setWhichToShow] = useState("all");
  const [dataTSent, setDataTSent] = useState();
  const [key, setKey] = useState(600);
  const reloadActive = () => {setKey(prevKey => prevKey + 1);};
  useEffect(() => {
    axios
      .get("https://hpt9.github.io/show-case-db/db.json")
      .then((response) => {
        setData(response.data.Leads.eSignature);
        setDataTSent(response.data.Leads.eSignature.all);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  const handleButtonClick = (option: string) => {
    if (option === "all") {
      setDataTSent(data?.all);
    } else {
      const filteredData = data?.all.filter(
        (item:any) => item.status.toLowerCase() === option
      );
      setDataTSent(filteredData);
    }
    setWhichToShow(option);
  };

  const renderComponent = () => {
    if (whichToShow === "all") {
      return <All data={dataTSent} reloadActive={reloadActive}/>;
    } else if (whichToShow === "pending") {
      return <Pending data={dataTSent} reloadActive={reloadActive}/>;
    } else if (whichToShow === "signed") {
      return <Signed data={dataTSent} reloadActive={reloadActive}/>;
    } else if (whichToShow === "unsent") {
      return <UnSent data={dataTSent} reloadActive={reloadActive}/>;
    }
  };
  return (
    <div className="esignature" key={key}>
      <div
      // style={{
      //   position:"sticky",
      //   paddingTop:"5px",
      //   top:"-20px",
      //   left:"-10px",
      //   width:"100%",
      //   backgroundColor:"white",
      //   zIndex:"2000000000"
      //   }} 
        className="trt">
        <h1>{t("Leads.dashboard.eSigRequest")}</h1>
      </div>
      <div className="records">
        <div>
          <p>{t("Leads.dashboard.pending")}</p>
          <span className="dth">{data?.pending}</span>
        </div>
        <div>
          <p>{t("Leads.dashboard.signed")}</p>
          <span className="dth">{data?.signed}</span>
        </div>
        <div>
          <p>{t("Leads.dashboard.unsent")}</p>
          <span className="dth">{data?.unsent}</span>
        </div>
        <div>
          <CircularProgress size="lg" determinate value={66.67}>
            {`${data?.total}%`}
          </CircularProgress>
        </div>
      </div>
      <div className="esig_table" 
      //style={{position:"relative"}}
      >
        <div
        // style={{
        //     position:"sticky",
        //     paddingTop:"5px",
        //     top:"12px",
        //     width:"100%",
        //     backgroundColor:"white"
        // }}
        >
            <div className="type_changer">
            <button
                onClick={() => handleButtonClick("all")}
                className={whichToShow === "all" ? "active_button" : ""}
            >
                {t("Leads.dashboard.all")}
            </button>
            <button
                onClick={() => handleButtonClick("pending")}
                className={whichToShow === "pending" ? "active_button" : ""}
            >
                {t("Leads.dashboard.pending")}
            </button>
            <button
                onClick={() => handleButtonClick("signed")}
                className={whichToShow === "signed" ? "active_button" : ""}
            >
                {t("Leads.dashboard.signed")}
            </button>
            <button
                onClick={() => handleButtonClick("unsent")}
                className={whichToShow === "unsent" ? "active_button" : ""}
            >
                {t("Leads.dashboard.unsent")}
            </button>
            </div>
        </div>
        <div className="esig_table_header">
          <div>{t("Leads.dashboard.name")}</div>
          <div>{t("Leads.dashboard.phone")}</div>
          <div>{t("Leads.dashboard.status")}</div>
          <div>
            <img src={Dot} alt="" />
          </div>
        </div>

        <div>{renderComponent()}</div>
      </div>
    </div>
  );
}
