import { useEffect, useState } from "react";
import axios from "axios";
import Dot3 from "../ph/3dot.svg";
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { useTranslation } from 'react-i18next';

const colors = [
    { background: "#FAEBFF", font: "#D769FF" },
    { background: "#EBEDFF", font: "#4153EE" },
    { background: "#FFEEE2", font: "#EA7B2C" }
];

const getRandomColorIndex = () => Math.floor(Math.random() * colors.length);

export default function Conversion() {
    const {t} = useTranslation();
    const [data, setData] = useState();
    const [colorIndices, setColorIndices] = useState([]);

    useEffect(() => {
        axios
            .get("https://hpt9.github.io/show-case-db/db.json")
            .then((response) => {
                console.log(response.data.Leads.conversions);
                setData(response.data.Leads.conversions);
                const indicesArray = Array.from({ length: response.data.Leads.conversions.length }, () => getRandomColorIndex());
                setColorIndices(indicesArray);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <h1>{t("Leads.insight.conv")}</h1>
            <div className="conversions_divs">
                {data && data.map((e: any, i: any) => (
                    <div className="conversion_inside_div" key={"asdadpoitg" + i}>
                        <div className="conversion_inside_div_left">
                            <div className="cidl_date" style={{ backgroundColor: colors[colorIndices[i]]?.background }}>
                                <p style={{ color: colors[colorIndices[i]]?.font }}>{e.date_day}</p>
                                <p style={{ color: colors[colorIndices[i]]?.font }}>{e.date_month}</p>
                            </div>
                            <div>
                                <p>{e.case_info}</p>
                                <div>
                                    <p>{e.hour}</p>
                                    <AvatarGroup max={2}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                                        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                                    </AvatarGroup>
                                </div>
                            </div>
                        </div>
                        <div className="conversion_inside_div_right">
                            <img src={Dot3} alt="" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}