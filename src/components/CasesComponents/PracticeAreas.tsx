import {useState,useEffect} from 'react'
import axios from "axios";
import Dot from "../ph/Dot.svg";
import Dot3 from "../ph/3dot.svg";
import { useTranslation } from "react-i18next";
import AddAreaModal from './AddAreaModal';
import EditPracticeArea from './EditPracticeArea';

export default function PracticeAreas() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [data, setData] = useState();
  //const openModal = () => {setIsModalOpen(true);};
  const closeModal = () => {setIsModalOpen(false);};
  const openModal2 = () => {setIsModal2Open(true);};
  const closeModal2 = () => {setIsModal2Open(false);};
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const [key, setKey] = useState(400);
    function editClicked(id:string) {
      console.log(id)
      setSelectedItemId(id);
    }
  const reloadActive = () => {setKey(prevKey => prevKey + 1);};
    useEffect(() => {
        axios
          .get("https://run.mocky.io/v3/33984b62-a8d2-45b5-8ba1-e478448b2f99")
          .then((response) => {
            //console.log(response.data.Practice_Areas)
            setData(response.data.Practice_Areas);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);
      const [isMobileView, setIsMobileView] = useState<boolean>(false);
    useEffect(() => {
        const handleResize = () => {
        setIsMobileView(window.innerWidth < 800);
        };
        handleResize(); // Check initial width
        window.addEventListener("resize", handleResize);
        return () => {
        window.removeEventListener("resize", handleResize);
        };
    }, []);
  return (
    <div className='active_table act_tbl_prac' key={key}>
        <div className='practive_area_adder'>
          <h3 style={{marginBottom:"20px"}}>{t("Cases.pArea")}</h3>
          {/* <Button variant="contained" onClick={openModal}>
            {t("Cases.addArea")}
            
          </Button> */}
        </div>
    <div className="header hd2">
        <div><img src={Dot} alt="" /></div>
        <div>{t("Cases.table.nameLoc")}</div>
        <div>{t("Cases.table.activeCases")}</div>
        <div>{t("Cases.table.createdBy")}</div>
        <div><img src={Dot} alt="" /></div>
    </div>
    {isMobileView ? (
      <div className="mobile_div md2">
        {data && data.map((item: any, index: number) => (
          <div key={index+"polikn"} className='mobile_user'>
            <div className="mu_header">
              <div>
                <img src="https://s3-alpha-sig.figma.com/img/a0a6/671c/3d922b97d7883edd90ba3f90da1e315a?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JwKa6Y87lwz7UOp3XE3gYWmThyDTgjVEJr7P1JODdSSz4B47MSnZO-raBkOl7EaR9T9MhreSJ1VorqqbhIgA98x~VATVfhgX~f9NJ31M9xELQzGpPx3hgBhXOtIgIxvIXZDCT8eC8FwNz0~eCL4XbEZdjH6e1w7XLNJk8YJnoROj1dPWSpnEsCoiqjmRNf9eDIGq29jyV7TUTR0dBobqi6jxNm5QDAEd72VFz1~OlChqZfJsMHYArtO7YzZ9M8ZRy~xCHtH2nhF6Sh2BpGMvLdjHhafD~7jYRGmyvRDNjQ2XGFZ5pg4bKCIn9mbKTcowJSujy-STPahbYx6XEUxalQ__" 
                alt="" />
                <div>
                  <p>{item.name}</p>
                  <p>{item.phone}</p>
                </div>
              </div>
              <div>
                <img src={Dot3} alt="" onClick={()=>{editClicked(item.id);openModal2()}}/>
              </div>
            </div>
            <div className='mu_info'>
              <div>
                <p>{t("Cases.table.activeCases")}</p>
                <p>{item.activeCase}</p>
              </div>
              <div>
                <p>{t("Cases.table.createdBy")}</p>
                <p>{item.createdBy}</p>
              </div>
              
              
            </div>
          </div>
        ))}
        
        </div>
    ) : (
      <div className="pc_div ">
        {data && data.map((item: any, index: number) => (
          <div className='pc_user pd2' key={index+"abhjui"}>
            <div>
              <img src={item.img} />
            </div>
            <div className='p_n'>
              <div className='user_p_n'>
                <p>{item.categor}</p>
                <p>{item.city}</p>
              </div>
            </div>
            <div>{item.activeCase}</div>
            <div>{item.createdBy}</div>
            <div onClick={()=>{editClicked(item.id);openModal2()}}><img src={Dot3} alt=""/></div>
          </div>
        ))}
      </div>
      
    )}
    {isModalOpen && (
          <div className="formToTask3">
            <AddAreaModal closeModal={closeModal} isModalOpen={isModalOpen}/>
          </div>
    )}
    {isModal2Open && (
          <div className="formToTask3">
            <EditPracticeArea id={selectedItemId} closeModal2={closeModal2} reloadActive={reloadActive}/>
          </div>
    )}
    </div>
  )
}
