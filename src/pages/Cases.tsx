import "../scss/Cases.scss";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import AddCaseModal from "../components/CasesComponents/AddCaseModal";
import { useTranslation } from "react-i18next";
import OpenCase from "../components/CasesComponents/OpenCase";
import CloseCase from "../components/CasesComponents/CloseCase";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import PracticeAreas from "../components/CasesComponents/PracticeAreas";
import CaseCharts from "../components/CasesComponents/CaseCharts";
import CaseLineChart from "../components/CasesComponents/CaseLineChart";
import CaseInsights from "../components/CasesComponents/CaseInsights";

export default function Cases() {
  const { t } = useTranslation();
  const [whichToShow, setWhichToShow] = useState("active");
  const [data, setData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pArea, setPArea] = useState("");
  const [leadAttomey, setLeadAttomey] = useState("");
  const [caseStage, setCaseStage] = useState("");
  const [key, setKey] = useState(500);
  const reloadActive = () => {setKey(prevKey => prevKey + 1);};
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 800);
    };
    handleResize(); // Check initial width
    window.addEventListener("resize", handleResize);
    console.log(isMobileView)
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8000/Cases")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleButtonClick = (option: string) => {
    setWhichToShow(option);
  };
  const renderComponent = () => {
    if (whichToShow === "active") {
      return <OpenCase openCases={data?.open} reloadActive={reloadActive}/>;
    } else if (whichToShow === "archived") {
      return <CloseCase closeCase={data?.closed} reloadActive={reloadActive}/>;
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setPArea(event.target.value as string);
  };
  const handleChange2 = (event: SelectChangeEvent) => {
    setLeadAttomey(event.target.value as string);
  };
  const handleChange3 = (event: SelectChangeEvent) => {
    setCaseStage(event.target.value as string);
  };

  return (
    <div className="cases_div" key={key}>
      <div>
        <div className="cases_header">
          <h3>{t("SideMenu.Cases")}</h3>
          <Button variant="contained" onClick={openModal}>
          {t("Cases.addCase")}
          </Button>
        </div>
        <div>
          <div className="type_changer">
            <button
              onClick={() => handleButtonClick("active")}
              className={whichToShow === "active" ? "active_button" : ""}
            >
              {t("Cases.open")}
            </button>
            <button
              onClick={() => handleButtonClick("archived")}
              className={whichToShow === "archived" ? "active_button" : ""}
            >
              {t("Cases.closed")}
            </button>
          </div>
          <div className="filter_area">
          <div>
            <p>{t("Cases.pArea")}</p>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={pArea}
                onChange={handleChange}
                
              >
                <MenuItem value={10}>PAreea1</MenuItem>
                <MenuItem value={20}>PAreea2</MenuItem>
                <MenuItem value={30}>PAreea3</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <p>{t("Cases.lAttomey")}</p>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label2"
                id="demo-simple-select2"
                value={leadAttomey}
                onChange={handleChange2}
              >
                <MenuItem value={10}>Test1</MenuItem>
                <MenuItem value={20}>Test2</MenuItem>
                <MenuItem value={30}>Test3</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <p>{t("Cases.caseStage")}</p>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label3"
                id="demo-simple-select3"
                value={caseStage}
                onChange={handleChange3}
              >
                <MenuItem value={10}>Open</MenuItem>
                <MenuItem value={20}>Closed</MenuItem>
                <MenuItem value={30}>Progressing</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <Button variant="contained">{t("Cases.applyFilters")}</Button>
          </div>
        </div>
          <div>{renderComponent()}</div>
        </div>

        {isModalOpen && (
          <div className="formToTask3">
            <AddCaseModal closeModal={closeModal} isModalOpen={isModalOpen} />
          </div>
        )}
      </div>
      <PracticeAreas/>
      <CaseInsights/>
      <CaseCharts/>
      <CaseLineChart/>
    </div>
  );
}
