import {LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer,} from "recharts";
import { useTranslation } from "react-i18next";

export default function CaseLineChart() {
  const { t } = useTranslation();
  const date = new Date();
  function getMonthName(monthNumber: number) {
    const months = [
      `${t("months.January")}`,
      `${t("months.February")}`,
      `${t("months.March")}`,
      `${t("months.April")}`,
      `${t("months.May")}`,
      `${t("months.June")}`,
      `${t("months.July")}`,
      `${t("months.August")}`,
      `${t("months.September")}`,
      `${t("months.October")}`,
      `${t("months.November")}`,
      `${t("months.December")}`,
    ];
  
    if (monthNumber >= -12 && monthNumber <= 12) {
      const positiveIndex = monthNumber >= 0 ? monthNumber : 12 + monthNumber;
      return months[positiveIndex];
    } else {
      return "Invalid month number. Please provide a number between -12 and 12.";
    }
  }
  const data = [
    {
      name: ``,
      pv: 1,
    },
    {
      name: `${getMonthName(date.getMonth() - 4)}`,
      pv: 1,
    },
    {
      name: `${getMonthName(date.getMonth() - 3)}`,
      pv: 2,
    },
    {
      name: `${getMonthName(date.getMonth() - 2)}`,
      pv: 4,
    },
    {
      name: `${getMonthName(date.getMonth() - 1)}`,
      pv: 3,
    },
    {
      name: `${getMonthName(date.getMonth())}`,
      pv: 2,
    },
    {
      name: `${getMonthName(date.getMonth() + 1)}`,
      pv: 4,
    },
    {
      name: ``,
      pv: 5,
    },
  ];
  return (
    <div className="clineChart">
      <p>{t("Cases.lastPart.h1")}</p>
        <div>
            <span></span>
            <span>{t("Cases.lastPart.sp1")}</span>
        </div>

      <ResponsiveContainer width="100%" height="75%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 50,
            bottom: 5,
            left: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#00b5ed"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
