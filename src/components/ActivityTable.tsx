import { useState, useEffect } from 'react';
import Dot from '../assets/photos/Dot.svg';
import DotMenu from '../assets/photos/Group.svg';
import { user } from '../exportedArrays';
import { motion } from 'framer-motion';
import '../scss/ActivityTable.scss';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';
// import { isLoggedContext } from '../App';


export default function ActivityTable() {
  const {t} = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  const [divToShow, setDivToShow] = useState<JSX.Element[]>([]);
  //const [page, setPage] = React.useState(1);

  //console.log(language)

  // const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
  //   setPage(value);
  // };

  const divs1: JSX.Element[] = user.map((u, i) => {
    return (
      <motion.div
        className="user-row"
        key={i}
        initial={{ opacity: 0, translateX: '50px' }}
        whileInView={{ opacity: 1, translateX: '0px' }}
        viewport={{ once: false }}
      >
        <div className="user-pp">
          <img src={u.pp} alt="" />
        </div>
        <div className="name-phone">
          <p>{u.name}</p>
          <p>{u.phone}</p>
        </div>
        <div className="ucompany">
          <span>{u.company}</span>
        </div>
        <div className="udate">
          <span>{u.date}</span>
        </div>
        <div className="status">
          <div className={`${u.status[0]}_status`}>
            <div className="circle"></div>
            <div>{localStorage.getItem("i18nextLng")=="aze"?u.status[1]:u.status[0]}</div>
          </div>
        </div>
        <div className="edit_menu">
          <img src={DotMenu} alt="" />
        </div>
      </motion.div>
    );
  });

  const divs2: JSX.Element[] = user.map((u, i) => {
    return (
      <div className="mobile-user-row" key={i + 2000}>
        <div className="profile-details">
          <img src={u.pp} alt="" />
          <div className="na-ph">
            <p>{u.name}</p>
            <p>{u.phone}</p>
          </div>
        </div>
        <div className="fonter">
          <span>{t("Home_Page.recent_activity.table.headers.d2")}</span>
          <span>{u.company}</span>
        </div>
        <div className="fonter">
          <span>{t("Home_Page.recent_activity.table.headers.d3")}</span>
          <span>{u.date}</span>
        </div>
        <div>
          <span>{t("Home_Page.recent_activity.table.headers.d4")}</span>
          <div className="status">
            <div className={`${u.status[0]}_status`}>
              <div className="circle"></div>
              <div>{localStorage.getItem("i18nextLng")=="aze"?u.status[1]:u.status[0]}</div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setDivToShow(isMobile ? divs2 : divs1);
  }, [isMobile]);

  return (
    <div className="activityTable">
      <div className="table">
        <div className="headers">
          <div>
            <img src={Dot} alt="" />
          </div>
          <div>{t("Home_Page.recent_activity.table.headers.d1")}</div>
          <div>{t("Home_Page.recent_activity.table.headers.d2")}</div>
          <div>{t("Home_Page.recent_activity.table.headers.d3")}</div>
          <div>{t("Home_Page.recent_activity.table.headers.d4")}</div>
          <div>
            <img src={Dot} alt="" />
          </div>
        </div>
        <div className='recent_act_table_body'>
          {divToShow.map((div) => {
          return div;
        })}
        </div>
      </div>
      <div className="pagination">
        {/* <Stack spacing={2}>
          <Pagination count={5} page={page} onChange={handleChange} />
        </Stack> */}
      </div>
    </div>
  );
}