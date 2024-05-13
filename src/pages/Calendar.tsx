import { useState } from "react";
import Agenda from "../components/Agenda";
import Today from "../components/Today";
import WeekCalendar from "../components/WeekCalendar";
import "@mobiscroll/react/dist/css/mobiscroll.scss";
import "../scss/Calendar.scss";
import MonthEventCalendar from "../components/MonthCalendar";
import { useTranslation } from "react-i18next";

export default function Calendar() {
  const {t} = useTranslation();
  const [whichToShow, setWhichToShow] = useState("day");

  const handleButtonClick = (option: any) => {
    setWhichToShow(option);
  };

  const renderComponent = () => {
    if (whichToShow === "day") {
      return <Today />;
    } else if (whichToShow === "agenda") {
      return <Agenda />;
    } else if (whichToShow === "week") {
      return <WeekCalendar />;
    } else if (whichToShow === "month") {
      return <MonthEventCalendar />;
    }
  };

  return (
    <div className="calendar_viewer_div">
        <div>
        <div className="type_changer">
          <button
            onClick={() => handleButtonClick("day")}
            className={whichToShow === "day" ? "active_button" : ""}
          >
            {t("Calendar.tabs.t1")}
          </button>
          <button
            onClick={() => handleButtonClick("week")}
            className={whichToShow === "week" ? "active_button" : ""}
          >
            {t("Calendar.tabs.t2")}
          </button>
          <button
            onClick={() => handleButtonClick("month")}
            className={whichToShow === "month" ? "active_button" : ""}
          >
            {t("Calendar.tabs.t3")}
          </button>
          <button
            onClick={() => handleButtonClick("agenda")}
            className={whichToShow === "agenda" ? "active_button" : ""}
          >
            {t("Calendar.tabs.t4")}
          </button>
        </div>
        <div>{renderComponent()}</div>
        </div>
    </div>
  );
}
