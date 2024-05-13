
import React, { useState } from 'react';
import styles from '../scss/RecentActivity.module.scss';
import Button from '@mui/material/Button';
import ActivityTable from './ActivityTable';
import { useTranslation } from 'react-i18next';
export default function RecentActivity() {
  const {t} = useTranslation();
  const [activeTab, setActiveTab] = useState('All');

  const handleTabClick = (tab:any) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.recent_div}>
      <div className={styles.recent_header}>
        <p className={styles.rca}>{t("Home_Page.recent_activity.h1")}</p>
      </div>
      {/* <div className={styles.table_tabs}>
        <div
          className={activeTab === 'All' ? styles.active_tab : ''}
          onClick={() => handleTabClick('All')}
        >
          {t("Home_Page.recent_activity.d1")}
        </div>
        <div
          className={activeTab === 'Invoice' ? styles.active_tab : ''}
          onClick={() => handleTabClick('Invoice')}
        >
          {t("Home_Page.recent_activity.d2")}
        </div>
        <div
          className={activeTab === 'Events' ? styles.active_tab : ''}
          onClick={() => handleTabClick('Events')}
        >
          {t("Home_Page.recent_activity.d3")}
        </div>
        <div
          className={activeTab === 'Documents' ? styles.active_tab : ''}
          onClick={() => handleTabClick('Documents')}
        >
          {t("Home_Page.recent_activity.d4")}
        </div>
        <div
          className={activeTab === 'Tasks' ? styles.active_tab : ''}
          onClick={() => handleTabClick('Tasks')}
        >
          {t("Home_Page.recent_activity.d5")}
        </div>
        <div
          className={activeTab === 'Deleted' ? styles.active_tab : ''}
          onClick={() => handleTabClick('Deleted')}
        >
          {t("Home_Page.recent_activity.d6")}
        </div>
      </div> */}
      <ActivityTable/>
    </div>
  );
}