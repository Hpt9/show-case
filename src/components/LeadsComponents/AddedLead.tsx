import React, { useEffect, useState } from "react";
import axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";
import { useTranslation } from "react-i18next";

export default function AddedLead({ element }: any) {
  const { t } = useTranslation();
  return (
    <div className="added_lead_mini">
      <div>
        <h1>{element.heading}</h1>
        <p>{element.desc}</p>
        <div className="total_info">
            <p>{t("Leads.insight.total")}</p>
            <p>{element.total}%</p>
        </div>
        <LinearProgress variant="determinate" value={element.total} />
        <p className="elsts">{element.status}</p>
      </div>
      <div>
            <div className="comp_div">
                <div>
                    <span className="comp_circle crc"></span>
                    <span>{t("Leads.insight.comp")}</span>
                </div>
                <p>{element.total}%</p>
            </div>
            <div className="proc_div">
                <div>
                    <span className="proc_circle crc"></span>
                    <span>{t("Leads.insight.proc")}</span>
                </div>
                <p>{100 - element.total}%</p>
            </div>
      </div>
    </div>
  );
}
