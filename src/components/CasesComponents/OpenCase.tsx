import Dot from "../ph/Dot.svg";
import Dot3 from "../ph/3dot.svg";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion} from "framer-motion";
import EditOpenCaseModal from "./EditOpenCaseModal";

export default function OpenCase({ openCases,reloadActive }: any) {
  const { t } = useTranslation();
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const openModal = () => {setIsModalOpen(true);};
  const closeModal = () => {setIsModalOpen(false);};
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

  function editClicked(id:string) {
    console.log(id)
    setSelectedItemId(id);
  }
  return (
    <motion.div className="active_table"
      initial={{ translateX: -100, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: -100, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="header">
        <div>
          <img src={Dot} alt="" />
        </div>
        <div>{t("Cases.table.name")}</div>
        <div>{t("Cases.table.caseStage")}</div>
        <div>{t("Cases.table.firmMember")}</div>
        <div>{t("Cases.table.nextEvent")}</div>
        <div>{t("Cases.table.nextTask")}</div>
        <div>{t("Cases.table.status")}</div>
        <div>
          <img src={Dot} alt="" />
        </div>
      </div>
      {isMobileView ? (
        <div className="mobile_div">
          {openCases &&
            openCases.map((item: any, index: number) => (
              <div key={index + "polikn"} className="mobile_user">
                <div className="mu_header">
                  <div>
                    <img
                      src="https://s3-alpha-sig.figma.com/img/a0a6/671c/3d922b97d7883edd90ba3f90da1e315a?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JwKa6Y87lwz7UOp3XE3gYWmThyDTgjVEJr7P1JODdSSz4B47MSnZO-raBkOl7EaR9T9MhreSJ1VorqqbhIgA98x~VATVfhgX~f9NJ31M9xELQzGpPx3hgBhXOtIgIxvIXZDCT8eC8FwNz0~eCL4XbEZdjH6e1w7XLNJk8YJnoROj1dPWSpnEsCoiqjmRNf9eDIGq29jyV7TUTR0dBobqi6jxNm5QDAEd72VFz1~OlChqZfJsMHYArtO7YzZ9M8ZRy~xCHtH2nhF6Sh2BpGMvLdjHhafD~7jYRGmyvRDNjQ2XGFZ5pg4bKCIn9mbKTcowJSujy-STPahbYx6XEUxalQ__"
                      alt=""
                    />
                    <div>
                      <p>{item.name}</p>
                      <p>{item.phone}</p>
                    </div>
                  </div>
                  <div onClick={()=>{editClicked(item.id);openModal()}}>
                    <img src={Dot3} alt="" />
                  </div>
                </div>
                <div className="mu_info">
                  <div>
                    <p>{t("Cases.table.caseStage")}</p>
                    <p>{item.caseStage}</p>
                  </div>
                  <div>
                    <p>{t("Cases.table.nextEvent")}</p>
                    <p>{item.nextEvent}</p>
                  </div>
                  <div>
                    <p>{t("Cases.table.firmMember")}</p>
                    <p>{item.firmMembers}</p>
                  </div>
                  <div>
                    <p>{t("Cases.table.nextTask")}</p>
                    <p>{item.nextTask.date}</p>
                  </div>
                  <div>
                    <p>{t("Cases.table.status")}</p>
                    <p>{item.nextTask.stg}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="pc_div">
          {openCases &&
            openCases.map((item: any, index: number) => (
              <div className="pc_user" key={index + "abhjui"}>
                <div>
                  <img src="https://s3-alpha-sig.figma.com/img/a0a6/671c/3d922b97d7883edd90ba3f90da1e315a?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JwKa6Y87lwz7UOp3XE3gYWmThyDTgjVEJr7P1JODdSSz4B47MSnZO-raBkOl7EaR9T9MhreSJ1VorqqbhIgA98x~VATVfhgX~f9NJ31M9xELQzGpPx3hgBhXOtIgIxvIXZDCT8eC8FwNz0~eCL4XbEZdjH6e1w7XLNJk8YJnoROj1dPWSpnEsCoiqjmRNf9eDIGq29jyV7TUTR0dBobqi6jxNm5QDAEd72VFz1~OlChqZfJsMHYArtO7YzZ9M8ZRy~xCHtH2nhF6Sh2BpGMvLdjHhafD~7jYRGmyvRDNjQ2XGFZ5pg4bKCIn9mbKTcowJSujy-STPahbYx6XEUxalQ__" />
                </div>
                <div className="p_n">
                  <div className="user_p_n">
                    <p>{item.name}</p>
                    <p>{item.phone}</p>
                  </div>
                </div>
                <div>{item.caseStage}</div>
                <div>{item.firmMembers}</div>
                <div>{item.nextEvent}</div>
                <div>
                  {item.nextTask.stg} {item.nextTask.date}
                </div>
                <div>{item.status}</div>
                <div onClick={()=>{editClicked(item.id);openModal()}}>
                  <img src={Dot3} alt=""/>
                </div>
              </div>
            ))}
        </div>
      )}
      {isModalOpen && (
          <div className="formToTask3">
            <EditOpenCaseModal id={selectedItemId} closeModal={closeModal} reloadActive={reloadActive} />
          </div>
      )}
    </motion.div>
  );
}
