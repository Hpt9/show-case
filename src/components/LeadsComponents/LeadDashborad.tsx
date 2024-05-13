import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import ESignnature from './ESignnature';
import InTakeForms from './InTakeForms';
import Commmunications from './Commmunications';
import DashTask from './DashTask';
import { motion} from "framer-motion";

export default function LeadDashboard() {
  const {t} = useTranslation();
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  useEffect(() => {
    const handleResize = () => {setIsMobileView(window.innerWidth < 800);};
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {window.removeEventListener('resize', handleResize);};}, 
    [])
    
    //console.log(data)
  return (
    <motion.div className='lead_mn'
      initial={{ translateX: -100, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: -100, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <ESignnature/>
      <InTakeForms/>
      <Commmunications/>
      <DashTask/>
    </motion.div>
  );

};
