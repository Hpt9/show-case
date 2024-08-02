import CircularProgress from "@mui/joy/CircularProgress";
import { useTranslation } from "react-i18next";

export default function LeadsOver() {
  const { t } = useTranslation();
  return (
    <div className="leads_over_time_chart">
      <h1>{t("Leads.insight.overTime")}</h1>
      <div>
        <CircularProgress
          size="lg"
          determinate
          value={75}
          sx={{
            "--CircularProgress-size": "200px",
            "--CircularProgress-progressThickness": "30px",
            "--CircularProgress-trackThickness": "30px",
          }}
        >
          {`75%`}
        </CircularProgress>
      </div>
      <div className="divider">
        <div>
          <span></span>
          <span>{t("Leads.insight.month")}</span>
        </div>
        <div>
          <span></span>
          <span>{t("Leads.insight.date")}</span>
        </div>
      </div>
    </div>
  );
}
