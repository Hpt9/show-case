import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import LastEvents from "./LastEvents";
export default function CaseInsights() {
  const { t } = useTranslation();
  const [pArea, setPArea] = useState("");
  const [leadAttomey, setLeadAttomey] = useState("");
  const [caseStage, setCaseStage] = useState("");
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
    <div className="caseInsights">
      <p>{t("Cases.caseInsights")}</p>
      <LastEvents/>
    </div>
  );
}
