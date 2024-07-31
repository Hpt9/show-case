import { useContext, useEffect } from "react";
import { isLoggedContext, IsLoggedContextProps } from "../App";
import { useNavigate,useLocation} from "react-router-dom"; 
import "../scss/Home.scss";
import HomeWorksTab from "../components/HomeWorksTab";
import AddItem from "../components/AddItem";
import RecentActivity from "../components/RecentActivity";
import ChartCalendar from "../components/ChartCalendar";
// import { useTranslation } from 'react-i18next';

export default function Home() {
  
  // const {t} = useTranslation();
  const location = useLocation()
  //console.log('handle route change here', location)
  const { isLogged, setShowMenu } = useContext<IsLoggedContextProps>(
    isLoggedContext
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogged) {
      setTimeout(()=>{
        navigate("/login")
        setShowMenu(false)
      },1000)
      // setTimeout(()=>setIsLogged(),3000)
      
    }
    if(location.pathname!==("/login" || "/register")){setShowMenu(true)}
  }, [isLogged, navigate]);
  return (
    <div className="home-main-div">
      <HomeWorksTab/>
      <AddItem/>
      <ChartCalendar/>
      <RecentActivity/>
    </div>
  );
}
