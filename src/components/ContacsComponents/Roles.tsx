import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import Dot from "../ph/Dot.svg";
import Dot3 from "../ph/3dot.svg";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddRoleModal from "./AddRoleModal";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import LOADING from "../ph/loadingAni.gif"
import RoleEditMenu from "./RoleEditMenu";


export default function Roles() {
  const { t } = useTranslation();
  const [data, setData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [key, setKey] = useState(300);
  const reloadActive = () => {
    setKey(prevKey => prevKey + 1);
  };
  const openModal = () => {setIsModalOpen(true);};
  const closeModal = () => {setIsModalOpen(false);};
  const openModal2 = () => {setIsModal2Open(true);};
  const closeModal2 = () => {setIsModal2Open(false);};
  function editClicked(id:string) {
    console.log(id)
    setSelectedItemId(id);
  }
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
  useEffect(() => {
    axios
      .get("https://run.mocky.io/v3/43b81524-384d-4ae1-8e95-5a7955142f86")
      .then((response) => {
        setData(response.data.Roles);
        if(response.status===200){
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  if (isLoading) {
    return <div style={{width:"100%",display:"flex",justifyContent:"center"}}><img src={LOADING} alt="Loading" /></div>;
  }
  return (
    <motion.div
      className="contacts_roles"
      initial={{ translateX: -100, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: -100, opacity: 0 }}
      transition={{ duration: 0.2 }}
      key={key}
    >
      <div className="roles_header">
        <h1>{t(`Contacts.people.table.hs.Roles`)}</h1>
        <Button variant="contained" onClick={openModal}>
          {t(`Contacts.people.table.hs.addRole`)}
        </Button>
      </div>
      <div className="roles_table">
        <div className="table_header">
          <div>
            <img src={Dot} alt="" />
          </div>
          <div>{t(`Contacts.people.table.hs.np`)}</div>
          <div>Status</div>
          <div>Gmail</div>
          <div>
            <img src={Dot} alt="" />
          </div>
        </div>
        {isMobileView ? (
          <motion.div
            className="mobile_div"
            style={{
              height:"520px",
              overflowY:"scroll"
            }}
            initial={{ translateX: -100, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            exit={{ translateX: -100, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {data &&
              data.map((item: any, index: number) => (
                <div key={index + "polikn"} className="mobile_user">
                  <div className="mu_header">
                    <div>
                      <img
                        src="https://s3-alpha-sig.figma.com/img/3622/cfee/5ab1fb3f8707d4b43d1bbc10c1af9597?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hMMqgcF9L1ybsJ7AunWtH~zeMmrpaKvay8GdH0AQpLBNnoQWEWTzFktOHN2ueYdFAG2SC1lugAd~iWmq8zhPYXwRaNtHDTtPzmy160oIVI7HSF3xp~LwoIDJ9vL-NAY94kDTYP-SXcKq~ONJ-yylDZUvIFCZv4ZnQSCCW-fPksXsGW8IeyK3tIyenvOufiBmbca6WGLed1FP0ZQLha2IbkHEunx9o27j1cxCBZPU~fTctIVBf~7PZhVyPhcGURF6gWHKgAF3vG6BnnyUnCyMx-59nJ13EVVWt~MiO~CLxgomnCNu8IEGHuO8PO4gcJZgneFe3VtK03fxzhZRMDalGQ__"
                        alt=""
                      />
                      <div>
                        <p>{item.name}</p>
                        <p>{item.phone}</p>
                      </div>
                    </div>
                    <div>
                      <img src={Dot3} alt="" onClick={()=>{editClicked(item.id);openModal2()}}/>
                    </div>
                  </div>
                  <div className="mu_info">
                    <div>
                      <p>Status</p>
                      <p className={`${item.status}`}>
                        <span className="circle"></span>
                        <span>
                          {t(`Contacts.people.table.hs.status.${item.status}`)}
                        </span>
                      </p>
                    </div>

                    <div>
                      <p>Gmail</p>
                      <p>{item.gmail}</p>
                    </div>
                  </div>
                </div>
              ))}
          </motion.div>
        ) : (
          <motion.div
            className="table_body"
            initial={{ translateX: -100, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            exit={{ translateX: -100, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {data &&
              data.map((item: any, index: any) => (
                <div className="role_row" key={index}>
                  <div>
                    <img src={item.img} alt="" />
                  </div>
                  <div>
                    <p>{item.role}</p>
                    <p>{item.phone}</p>
                  </div>
                  <div>
                    <p className={`${item.status}`}>
                      <span className="circle"></span>
                      <span>
                        {t(`Contacts.people.table.hs.status.${item.status}`)}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p>{item.gmail}</p>
                  </div>
                  <div>
                    <img src={Dot3} alt="" onClick={()=>{editClicked(item.id);openModal2()}}/>
                  </div>
                </div>
              ))}
          </motion.div>
        )}
        <Stack spacing={2}>
          <Pagination
            count={10}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
        </Stack>

        {isModalOpen && (
          <div className="formToTask3">
            <AddRoleModal closeModal={closeModal} isModalOpen={isModalOpen} />
          </div>
        )}
        {isModal2Open && (
          <div className="formToTask3">
            <RoleEditMenu id={selectedItemId} closeModal2={closeModal2} reloadActive={reloadActive}/>
          </div>
        )}
      </div>
    </motion.div>
  );
}
