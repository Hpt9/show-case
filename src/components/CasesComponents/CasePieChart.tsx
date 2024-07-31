import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useTranslation } from 'react-i18next';

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 }
];
const COLORS = ["#F0A479",  "#8A79F0","#D179F0"];
export default function CasePieChart() {
  const {t} = useTranslation();
  return (
    //{t("Contacts.people.table.hs.np")}
    <div>
      <p>{t("Cases.pie.h1")}</p>
      <p>({t("Cases.pie.h2")})</p>
      <ResponsiveContainer width="100%" height="68%" className={"chtr"}>
        <PieChart>
          <Pie
            data={data}
            innerRadius={80}
            outerRadius={120}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                className={`${entry}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
        <p>
            <span>0</span>
            <span>{t("Cases.pie.sp")}</span>
        </p>
      </ResponsiveContainer>
      <div className="locations">
            {/* locationlar backdan gelecek */}
            <div>
                <span className="lcircle crc1"></span>
                <span>Location 1</span>
            </div>
            <div>
                <span className="lcircle crc2"></span>
                <span>Location 2</span>
            </div>
            <div>
                <span className="lcircle crc3"></span>
                <span>Location 3</span>
            </div>
      </div>
    </div>
  );
}
