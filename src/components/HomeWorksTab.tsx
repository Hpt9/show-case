import "../scss/HomeWorksTab.scss"
import Button from '@mui/material/Button';
import Demo from "../assets/photos/demo.svg"
import Invite from "../assets/photos/invite.svg"
import Case from "../assets/photos/addcase.svg"
import Guide from "../assets/photos/guide.svg"
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
export default function HomeWorksTab() {
const {t} = useTranslation();
  return (
    <div className='tabs-div'>
        <motion.div
        initial={{ opacity: 0 , scale:0}}
        animate={{ opacity: 1, scale:1}}
        transition={{ duration:.3 }}
        >
            <div>
                <img src={Demo} alt="" />
                <p>{t('Home_Page.tab_names.first.name')}</p>
            </div>
            <p>{t('Home_Page.tab_names.first.desc')}</p>
            <Button variant="contained">{t('Home_Page.tab_names.first.butt')}</Button>
        </motion.div>
        <motion.div
        initial={{ opacity: 0 , scale:0}}
        animate={{ opacity: 1, scale:1 }}
        transition={{ duration:.4 }}
        >
            <div>
                <img src={Invite} alt="" />
                <p>{t('Home_Page.tab_names.second.name')}</p>
            </div>
            <p>{t('Home_Page.tab_names.second.desc')}</p>
            <Button variant="contained">{t('Home_Page.tab_names.second.butt')}</Button>
        </motion.div>
        <motion.div
        initial={{ opacity: 0 , scale:0}}
        animate={{ opacity: 1, scale:1 }}
        transition={{ duration:.5 }}
        >
            <div>
                <img src={Guide} alt="" />
                <p className='special'>{t('Home_Page.tab_names.third.name')}</p>
            </div>
            <p>{t('Home_Page.tab_names.third.desc')}</p>
            <Button variant="contained">{t('Home_Page.tab_names.third.butt')}</Button>
        </motion.div>
        <motion.div
        initial={{ opacity: 0 , scale:0}}
        animate={{ opacity: 1, scale:1 }}
        transition={{ duration:.6 }}
        >
            <div>
                <img src={Case} alt="" />
                <p>{t('Home_Page.tab_names.fourth.name')}</p>
            </div>
            <p>{t('Home_Page.tab_names.fourth.desc')} </p>
            <Button variant="contained">{t('Home_Page.tab_names.fourth.butt')}</Button>
        </motion.div>
    </div>
  )
}
