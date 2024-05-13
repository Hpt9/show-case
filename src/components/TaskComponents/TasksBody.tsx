import React, { useState,useEffect } from 'react';
import InQueue from './InQueue';
import InProgress from './InProgress';
import NeedRevision from './NeedRevision';
import Complete from './Complete';
import { useTranslation } from "react-i18next";

export default function TasksBody() {
  const {t} = useTranslation();

  const [activeTab, setActiveTab] = useState('InQueue');
  const [link, setLink] = useState('http://localhost:8000/InQueue')
  const [activeIndex,setActiveIndex] = useState(1)
  const [data,setData] = useState()
//   const handleTabClick = (tab:any) => {
//     setActiveTab(tab);
//   };
  const handleTabClick = (tab:any,ind:number) => {
    setActiveTab(tab);
    setLink(`http://localhost:8000/${tab}`)
    setActiveIndex(ind)
  };
  useEffect(() => {
    fetch(link)
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        setData(data)
    });
    }, [link]);
    
  return (
    <div className='taskBody'>
      <div className='taskTabs'>
        <button
          className={activeTab === 'InQueue' ? 'active_btn' : ''} onClick={() => handleTabClick('InQueue',1)}
        >
          {t("Task.tabs.t1")}
        </button>
        <button
          className={activeTab === 'InProgress' ? 'active_btn' : ''}  onClick={() => handleTabClick('InProgress',2)}
        >
          {t("Task.tabs.t2")}
        </button>
        <button
          className={activeTab === 'NeedRevision' ? 'active_btn' : ''}  onClick={() => handleTabClick('NeedRevision',3)}
        >
          {t("Task.tabs.t3")}
        </button>
        <button
          className={activeTab === 'Complete' ? 'active_btn' : ''} onClick={() => handleTabClick('Complete',4)}
        >
          {t("Task.tabs.t4")}
        </button>
      </div>
      {activeIndex===1 && <InQueue data={data} key={"sa"}/>}
      {activeIndex===2 && <InProgress data={data} key={"sa2"}/>}
      {activeIndex===3 && <NeedRevision data={data} key={"sa3"}/>}
      {activeIndex===4 && <Complete data={data} key={"sa4"}/>}
   
    </div>
  );
}