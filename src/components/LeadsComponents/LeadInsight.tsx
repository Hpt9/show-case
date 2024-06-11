import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import AddedLead from "./AddedLead";
import Conversion from "./Conversion";
import MobChartConv from "./MobChartConv";
import LeadsOver from "./LeadsOver";
import { useTranslation } from "react-i18next";
import {LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer,} from "recharts";

export default function LeadInsight() {
  const { t } = useTranslation();
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:8000/Leads")
      .then((response) => {
        setData(response.data.addedLeads);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
    useEffect(() => {
        const handleResize = () => {setIsMobileView(window.innerWidth < 800);};
        handleResize(); // Check initial width
        window.addEventListener('resize', handleResize);
        return () => {window.removeEventListener('resize', handleResize);};}, 
    [])
  const now = new Date();
  const currentHour = now.getHours();
  const hoursArray = [currentHour];
  for (let i = 1; i < 6; i++) {
    let previousHour = (currentHour - 4 * i + 24) % 24;
    hoursArray.push(previousHour);
  }
  const data_table = [
    {
      name: "",
      pv: 0,
    },
    {
      name: `${hoursArray[5] < 10 ? "0" + hoursArray[5] + ":00" : hoursArray[5] + ":00"}`,
      pv: 50,
    },
    {
      name: `${hoursArray[4] < 10 ? "0" + hoursArray[4] + ":00" : hoursArray[4] + ":00"}`,
      pv: 60,
    },
    {
      name: `${hoursArray[3] < 10 ? "0" + hoursArray[3] + ":00" : hoursArray[3] + ":00"}`,
      pv: 40,
    },
    {
      name: `${hoursArray[2] < 10 ? "0" + hoursArray[2] + ":00" : hoursArray[2] + ":00"}`,
      pv: 80,
    },
    {
      name: `${hoursArray[1] < 10 ? "0" + hoursArray[1] + ":00" : hoursArray[1] + ":00"}`,
      pv: 20,
    },
    {
      name: `${hoursArray[0] < 10 ? "0" + hoursArray[0] + ":00" : hoursArray[0] + ":00"}`,
      pv: 50,
    },
  ];
  return (
    <motion.div
      className="lInsight_div"
      initial={{ translateX: -100, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: -100, opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{borderRadius:"30px"}}
    >
      <div className="conv">
        <div className="conv_left">
          {data && data.map((e: any, i: any) => <AddedLead element={e} key={"asdasdsoli"+i}/>)}
        </div>
        {isMobileView ? 
          <div className="conv_right mobChartConv"><MobChartConv/></div>
           : 
          <div className="conv_right conversion"><Conversion/></div>
        }
      </div>
      {isMobileView?
        <div className="chart_mobile_lead">
          <h1>{t("Leads.insight.val")}</h1>
          <div>
            <p>{t("Leads.insight.entire")}</p>
            <div>
              <span></span>
              <p>{t("Leads.insight.web")}</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height="75%">
            <LineChart data={data_table} margin={{top: 25,right: 30, bottom: 5,left:-30}}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="pv" stroke="#00b5ed" activeDot={{ r: 8 }}/>
            </LineChart>
          </ResponsiveContainer> 
        </div>
        :
        <div className="insight_charts">
          <div>
            <h1>{t("Leads.insight.val")}</h1>
            <div>
            <p>{t("Leads.insight.entire")}</p>
            <div>
              <span></span>
              <p>{t("Leads.insight.web")}</p>
            </div>
            </div>
            <ResponsiveContainer width="100%" height="75%">
              <LineChart data={data_table} margin={{top: 25,right: 30, bottom: 5,left:-30}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="pv" stroke="#00b5ed" activeDot={{ r: 8 }}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
          <LeadsOver/>
        </div>
      }
    </motion.div>
  );
}