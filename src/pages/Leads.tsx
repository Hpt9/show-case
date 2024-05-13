import "../scss/Leads.scss";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LeadDashboard from "../components/LeadsComponents/LeadDashborad";
import LeadInsight from "../components/LeadsComponents/LeadInsight";
import { Button } from "@mui/material";
import AddLeadModal from "../components/LeadsComponents/AddLeadModal";

export default function Leads() {
  const {t} = useTranslation();
  const [whichToShow, setWhichToShow] = useState("leadD");
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    if (whichToShow === "leadD") {
      return <LeadDashboard />;
    } else if (whichToShow === "leadI") {
      return <LeadInsight />;
    }
  };
  
  return (
    <div className="leads">
      <div className="lead_header">
        <div className="type_changer">
          <button
            onClick={() => handleButtonClick("leadD")}
            className={whichToShow === "leadD" ? "active_button" : ""}
          >
            {t("Leads.leadsDashborad")}
          </button>
          <button
            onClick={() => handleButtonClick("leadI")}
            className={whichToShow === "leadI" ? "active_button" : ""}
          >
            {t("Leads.leadsInsight")}
          </button>
        </div>
        <Button variant="contained" onClick={openModal}>{t("Leads.addLead")}</Button>
      </div>
      <div>{renderComponent()}</div>
      

      {isModalOpen && 
          <div className="formToTask3 addLeadModal">
            <AddLeadModal closeModal={closeModal} isModalOpen={isModalOpen}/>
          </div>
      }
    </div>
  );
}
