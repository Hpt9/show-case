import React,{useState,useEffect} from 'react';
import Dot from "../ph/Dot.svg"
import Dot3 from "../ph/3dot.svg"
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTranslation } from 'react-i18next';
import { motion,AnimatePresence} from "framer-motion";
import EditeMenuModal from './EditeMenuModal';

const Active = ({ activeData,reloadActive }:any) => {
  const {t} = useTranslation();
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  useEffect(() => {
    const handleResize = () => {setIsMobileView(window.innerWidth < 800);};
    handleResize(); // Check initial width
    window.addEventListener('resize', handleResize);
    return () => {window.removeEventListener('resize', handleResize);};}, 
    [activeData])

  function editClicked(id:string) {
    console.log(id)
    setSelectedItemId(id);
  }
  function openModal() {
    setIsModalOpen(true);
  }
  
  function closeModal() {
    setIsModalOpen(false);
  }
  return (
    <div className='active_table'>
      <div className="header">
          <div>
            <img src={Dot} alt="" />
          </div>
          <div>{t("Contacts.people.table.hs.np")}</div>
          <div>{t("Contacts.people.table.hs.cases")}</div>
          <div>{t("Contacts.people.table.hs.group")}</div>
          <div>{t("Contacts.people.table.hs.added")}</div>
          <div>{t("Contacts.people.table.hs.assignedTo")}</div>
          <div><img src={Dot} alt="" /></div>
      </div>
      {isMobileView ? (
        <motion.div className="mobile_div"
        style={{
          height:"470px",
          overflowY:"scroll"
        }}
        initial={{ translateX: -100, opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        exit={{ translateX: -100, opacity: 0 }}
        transition={{ duration: 0.2 }}
        >
          {activeData && activeData.map((item: any, index: number) => (
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
                  <img src={Dot3} alt="" onClick={e=>{editClicked(item.id);openModal()}}/>
                </div>
              </div>
              <div className='mu_info'>
                <div>
                  <p>{t("Contacts.people.table.hs.cases")}</p>
                  <p>{item.cases}</p>
                </div>
                <div>
                  <p>{t("Contacts.people.table.hs.group")}</p>
                  <p>{item.group}</p>
                </div>
                <div>
                  <p>{t("Contacts.people.table.hs.ll")}</p>
                  <p>{item.lastlogin}</p>
                </div>
                <div>
                  <p>{t("Contacts.people.table.hs.added")}</p>
                  <p>{item.added}</p>
                </div>
                <div>
                  <p>{t("Contacts.people.table.hs.assignedTo")}</p>
                  <p>{item.assignedTo}</p>
                </div>
              </div>
            </div>
          ))}
          
          </motion.div>
      ) : (
        <motion.div className="pc_div"
        initial={{ translateX: -100, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: -100, opacity: 0 }}
      transition={{ duration: 0.2 }}
        >
          {activeData && activeData.map((item: any, index: number) => (
            <div className='pc_user' key={index+"abhjui"}>
              <div>
                <img src={item.image.base64} />
              </div>
              <div className='p_n'>
                <div className='user_p_n'>
                  <p>{item.firstName}</p>
                  <p>0506567494</p>
                </div>
              </div>
              <div>Example</div>
              <div>{item.peopleGroup}</div>
              <div>12-12-2022</div>
              <div>Ferid</div>
              <div><img src={Dot3} alt="" onClick={e=>{editClicked(item.id);openModal()}}/></div>
            </div>
          ))}
        </motion.div>
        
      )}
      <Stack spacing={2}>
            <Pagination
              count={10}
              renderItem={(item) => (
                <PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item}/>)}/> </Stack>

        {isModalOpen && (
          <div className="formToTask2">
            <EditeMenuModal id={selectedItemId} closeModal={closeModal} reloadActive={reloadActive}/>
          </div>
        )}
    </div>
  );
};

export default Active;