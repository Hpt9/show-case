import { useTranslation } from "react-i18next";
import LastEvents from "./LastEvents";
export default function CaseInsights() {
  const { t } = useTranslation();

  return (
    <div className="caseInsights">
      <p>{t("Cases.caseInsights")}</p>
      <LastEvents/>
    </div>
  );
}
