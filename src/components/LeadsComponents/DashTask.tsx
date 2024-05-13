import { useEffect, useState } from "react";
import axios from "axios";
import Dot3 from "../ph/3dot.svg";
import Dot from "../ph/Dot.svg";
import { useTranslation } from 'react-i18next';

export default function DashTask() {
    const {t} = useTranslation();
    const [isMobileView, setIsMobileView] = useState<boolean>(false);
    const [data, setData]=useState()
    useEffect(()=>{
        axios.get('http://localhost:8000/Leads')
        .then(response => {
            setData(response.data.task)
        })
        .catch(error => {
            console.error(error);
        });
        
    },[])

    useEffect(() => {
        const handleResize = () => {setIsMobileView(window.innerWidth < 800);};
        handleResize(); // Check initial width
        window.addEventListener('resize', handleResize);
        return () => {window.removeEventListener('resize', handleResize);};}, 
    [])
  return (
    <div className="dash_task_div">
      <div
      style={{
        position:"sticky",
        paddingTop:"5px",
        top:"-20px",
        left:"-10px",
        width:"100%",
        backgroundColor:"white",
        zIndex:"2000000000"
        }} className="trt">
        <h1>{t("Leads.dashboard.task")}</h1>
        <img src={Dot3} alt="" />
      </div>
      <div className="dash_task_table_header">
        <div>{t("Leads.dashboard.name")}</div>
        <div>{t("Leads.dashboard.taskName")}</div>
        <div>{t("Leads.dashboard.due")}</div>
        <div>
          <img src={Dot} alt="" />
        </div>
      </div>
      <div>
        {isMobileView ? (
                <div className='lead_mobile'>
                    {data && data.map((e:any,i:any)=>(
                        <div className="lead_mobile_user" key={i+"lop765tymmmv"}>
                            <div>
                                <div>
                                    <img src={e.img} alt="" />
                                    <div>
                                        <p>{e.name}</p>
                                    </div>
                                </div>

                                <div>
                                    <img src={Dot3} alt="" />
                                </div>
                            </div>
                            <div>
                                <p>Task Name</p>
                                <p>{e.taskName}</p>
                            </div>
                            <div>
                                <p>Due</p>
                                <p>{e.due}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ):(
                <div className='lead_pc'>
                    {data && data.map((e:any,i:any)=>(
                        <div className="lead_pc_user"  key={i+"lopm76632ammv"}>
                            <div>{e.name}</div>
                            <div>{e.taskName}</div>
                            <div>{e.due}</div>
                            <div>
                                <img src={Dot3} alt="" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
    </div>
    </div>
  );
}
