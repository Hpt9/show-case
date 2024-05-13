import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer,} from "recharts";
import { useTranslation } from 'react-i18next';

export default function CaseBarChart() {
  const {t} = useTranslation();

  const data = [
    { name: `${t("Cases.bar.tab1")}`, pv: 12 },
    { name: `${t("Cases.bar.tab2")}`, pv: 9 },
    { name: `${t("Cases.bar.tab3")}`, pv: 16 },
    { name: `${t("Cases.bar.tab4")}`, pv: 3 },
    { name: `${t("Cases.bar.tab5")}`, pv: 6 }
];
  return (
    <div>
      <p>{t("Cases.bar.h1")}</p>
      <p>({t("Cases.bar.h1")})</p>
      <ResponsiveContainer width="100%" height="78%">        
        <BarChart
            data={data}
            margin={{
            top: 20,
            right: 0,
            left: -60,
            bottom: 0,}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" stackId="a" fill="#8884d8" />
            <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
