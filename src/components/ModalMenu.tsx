import React, { useState, useEffect, useContext } from "react";
import { obj } from "../exportedArrays";
import { isLoggedContext } from '../App';
import HM from "../assets/photos/hamburgerMenu.svg";
import "../scss/Header.scss";
import { useTranslation } from "react-i18next";
import { SelectChangeEvent } from '@mui/material/Select';
import { Button } from "@mui/material";
import { setting_menu } from '../exportedArrays';


const ModalMenu = ({ closeModal }: any) => {
  const [lang, setLang] = React.useState('');
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const { activeIndex, setActiveIndex } = useContext(isLoggedContext);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 800);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isWideScreen]);

  const handleItemClick = (index: any, nav: string) => {
    setActiveIndex(index);
    window.history.pushState(null, "", nav);
    window.dispatchEvent(new PopStateEvent("popstate"));
    closeModal();
  };

  const handleItemClick2 = (index: any) => {
    setActiveIndex(index);
    setIsModalOpen(true);    
  };

  const handleChange = (event: SelectChangeEvent) => {
    setLang(event.target.value as string);
  };

  const handleClick = (elang: string) => {
    i18n.changeLanguage(elang);
    //window.location.reload();
  };

  return (
    <>
      {!isWideScreen && (
        <div className="modal" key={"rndasldml1"}>
          <div className="modal-content" key={"rndasldml2"}>
            <img src={HM} alt="" className="hm-class" onClick={closeModal} key={"rndasldml3"} />
            <div className="account2" key={"rndasldml19"}>
              <p style={{ textAlign: "center", padding: 0 }} key={"rndasldml86789"}></p>
              {obj.map((item, index) => (
                <div key={`item-${index}+aa`} className={`item ${activeIndex === index ? "active-menu2" : ""}`}
                  onClick={() => {
                    if (item.sname === "Settings") {
                      handleItemClick2(index);
                    } else {
                      handleItemClick(index, item.navigate);
                    }
                  }}>
                  <span className={`item ${activeIndex === index ? "active" : ""}`} key={"rndasldml1876567"}>
                    {item.svg}
                  </span>
                  <span key={"rndasldml112731786371"}>{t(`SideMenu.${item.sname}`)}</span>
                </div>
              ))}
            </div>
            <Button variant="outlined" onClick={() => handleClick("aze")}>Aze</Button>
            <Button variant="outlined" onClick={() => handleClick("eng")}>Eng</Button>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="modal_moble_sett">
          <div className="hd">
            <p>{t("settings.h1")}</p>
            <button onClick={() => setIsModalOpen(false)}>x</button>
          </div>
          <div className="mobile_sett_content">
            {setting_menu.map((e,i)=>
              <div className='menu_items_setting' key={i+"lpnnj"}>
                  {e.svg}
                  <p>{t(`settings.${e.sname}`)}</p>
              </div>)
            }
          </div>
          <div className='div_line last_line'></div>
        <div className='menu_items_setting mis'>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
            <path d="M20.6904 8.77611L17.2723 5.86097C17.0054 5.62486 16.636 5.57344 16.3072 5.72734C15.9787 5.88161 15.7734 6.18942 15.7734 6.55916V6.84632H14.6059V4.44432C14.6059 3.24278 13.6285 2.26503 12.427 2.26503H9.64509V1.09789C9.64509 0.728153 9.48069 0.420705 9.18338 0.204876C8.88571 -0.0109529 8.53662 -0.0518736 8.18752 0.0614728L2.07986 2.19622C1.34075 2.46311 0.858032 3.13052 0.858032 3.92105V16.085C0.858032 16.8654 1.34075 17.5425 2.07986 17.7993L8.18752 19.9344C8.53626 20.0575 8.88535 20.0061 9.18338 19.7906C9.48105 19.5857 9.64509 19.2674 9.64509 18.9078V17.7301H12.427C13.6285 17.7301 14.6059 16.7527 14.6059 15.5508V12.6458H15.7734V12.9334C15.7734 13.2926 15.9787 13.6008 16.3072 13.7547C16.6356 13.9089 17.0054 13.8575 17.2723 13.6214L20.6904 10.7168C20.9881 10.46 21.142 10.1316 21.142 9.74155C21.142 9.36131 20.9881 9.02272 20.6904 8.77611ZM7.96156 11.5786C7.96156 11.7735 7.79715 11.9379 7.59182 11.9379C7.39664 11.9379 7.23259 11.7735 7.23259 11.5786V8.42702C7.23259 8.22205 7.397 8.05765 7.59182 8.05765C7.79715 8.05765 7.96156 8.22169 7.96156 8.42702V11.5786ZM13.882 15.5512C13.882 16.3533 13.2294 17.0062 12.4273 17.0062H9.64546V2.98965H12.4273C13.2294 2.98965 13.882 3.64257 13.882 4.44468V6.84669H11.606C11.1338 6.84669 10.7438 7.2367 10.7438 7.71942V11.7738C10.7438 12.246 11.1338 12.6462 11.606 12.6462H13.882V15.5512Z" fill="#F15E54"/>
            </svg>
            <p>{t('settings.Log Out')}</p>
        </div>
        </div>
      )}
    </>
  );
};

export default ModalMenu;