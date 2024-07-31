import styles from '../scss/RecentActivity.module.scss';
import ActivityTable from './ActivityTable';
import { useTranslation } from 'react-i18next';
export default function RecentActivity() {
  const {t} = useTranslation();

  return (
    <div className={styles.recent_div}>
      <div className={styles.recent_header}>
        <p className={styles.rca}>{t("Home_Page.recent_activity.h1")}</p>
      </div>
      <ActivityTable/>
    </div>
  );
}