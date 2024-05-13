import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";
import { setting_menu } from '../exportedArrays';
const SettingsModal = ({ onClose }:any) => {
  const {t} = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className='settModal'
      style={{
        position: 'fixed',
        
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(107, 120, 142, 0.2)',
        display: 'flex',
        width:'100%',
        height:'100vh',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999999999999999
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.3 }}
        className='setting_modal_pc'
        style={{
          width:270,
          backgroundColor: 'white',
          borderRadius: '20px',
          maxWidth: '80%',
          maxHeight: '80%',
          overflow: 'auto',
          position: 'absolute',
          top:420,
          left:270,
          ...(window.innerWidth<1024 ? { top: 190 }:{ top: 220 }),
          ...(window.innerWidth<1024 ? { left: 105 }:{ left: 270 })

        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='set_modal_head'>
            <h2>{t("settings.h1")}</h2>
            <button onClick={onClose}>X</button>
        </div>
        <div className='div_line'></div>
        <div className='settings_content'>
            {setting_menu.map((e,i)=>
            <div className='menu_items_setting' key={i+"lpnnj"}>
                {e.svg}
                <p>{t(`settings.${e.sname}`)}</p>
            </div>)}
        </div>
        <div className='div_line last_line'></div>
        <div className='menu_items_setting mis'>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
            <path d="M20.6904 8.77611L17.2723 5.86097C17.0054 5.62486 16.636 5.57344 16.3072 5.72734C15.9787 5.88161 15.7734 6.18942 15.7734 6.55916V6.84632H14.6059V4.44432C14.6059 3.24278 13.6285 2.26503 12.427 2.26503H9.64509V1.09789C9.64509 0.728153 9.48069 0.420705 9.18338 0.204876C8.88571 -0.0109529 8.53662 -0.0518736 8.18752 0.0614728L2.07986 2.19622C1.34075 2.46311 0.858032 3.13052 0.858032 3.92105V16.085C0.858032 16.8654 1.34075 17.5425 2.07986 17.7993L8.18752 19.9344C8.53626 20.0575 8.88535 20.0061 9.18338 19.7906C9.48105 19.5857 9.64509 19.2674 9.64509 18.9078V17.7301H12.427C13.6285 17.7301 14.6059 16.7527 14.6059 15.5508V12.6458H15.7734V12.9334C15.7734 13.2926 15.9787 13.6008 16.3072 13.7547C16.6356 13.9089 17.0054 13.8575 17.2723 13.6214L20.6904 10.7168C20.9881 10.46 21.142 10.1316 21.142 9.74155C21.142 9.36131 20.9881 9.02272 20.6904 8.77611ZM7.96156 11.5786C7.96156 11.7735 7.79715 11.9379 7.59182 11.9379C7.39664 11.9379 7.23259 11.7735 7.23259 11.5786V8.42702C7.23259 8.22205 7.397 8.05765 7.59182 8.05765C7.79715 8.05765 7.96156 8.22169 7.96156 8.42702V11.5786ZM13.882 15.5512C13.882 16.3533 13.2294 17.0062 12.4273 17.0062H9.64546V2.98965H12.4273C13.2294 2.98965 13.882 3.64257 13.882 4.44468V6.84669H11.606C11.1338 6.84669 10.7438 7.2367 10.7438 7.71942V11.7738C10.7438 12.246 11.1338 12.6462 11.606 12.6462H13.882V15.5512Z" fill="#F15E54"/>
            </svg>
            <p>{t('settings.Log Out')}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SettingsModal;