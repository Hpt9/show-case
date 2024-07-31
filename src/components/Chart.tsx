import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../scss/ChartCalendar.scss";
import { useTranslation } from "react-i18next";
export default function Chart() {
  const { t } = useTranslation();
  const now = new Date();
  const currentHour = now.getHours();
  const hoursArray = [currentHour];
  for (let i = 1; i < 6; i++) {
    let previousHour = (currentHour - 4 * i + 24) % 24;
    hoursArray.push(previousHour);
  }
  const data = [
    {
      name: "",
      pv: 0,
      amt: 0,
    },
    {
      name: `${
        hoursArray[5] < 10 ? "0" + hoursArray[5] + ":00" : hoursArray[5] + ":00"
      }`,
      pv: 50,
    },
    {
      name: `${
        hoursArray[4] < 10 ? "0" + hoursArray[4] + ":00" : hoursArray[4] + ":00"
      }`,
      pv: 60,
    },
    {
      name: `${
        hoursArray[3] < 10 ? "0" + hoursArray[3] + ":00" : hoursArray[3] + ":00"
      }`,
      pv: 40,
    },
    {
      name: `${
        hoursArray[2] < 10 ? "0" + hoursArray[2] + ":00" : hoursArray[2] + ":00"
      }`,
      pv: 80,
    },
    {
      name: `${
        hoursArray[1] < 10 ? "0" + hoursArray[1] + ":00" : hoursArray[1] + ":00"
      }`,
      pv: 20,
    },
    {
      name: `${
        hoursArray[0] < 10 ? "0" + hoursArray[0] + ":00" : hoursArray[0] + ":00"
      }`,
      pv: 50,
    },
  ];
  return (
    <div className="chart-div">
      <div className="chart-header">
        <p>{t("Home_Page.graphs.chart.h1")}</p>
        {/* <img src={DotMenu} alt="" /> */}
      </div>
      <div className="all-sent-recieved-data">
        <div>
          <p>10.5k</p>
          <p>{t("Home_Page.graphs.chart.semails")}</p>
        </div>
        <div>
          <p>700</p>
          <p>{t("Home_Page.graphs.chart.cemails")}</p>
        </div>
        <div>
          <p>10.5k</p>
          <p>{t("Home_Page.graphs.chart.wcap")}</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="67%">
        <LineChart
          // width={736}
          // height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            bottom: 5,
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
      {/* <button onClick={(e) => sendTask()}> sSEnd</button> */}
    </div>
  );
}
