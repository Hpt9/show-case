
import 'devextreme/dist/css/dx.light.css';
import "./App.css";
import LoginPage from "./pages/LoginPage";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import Task from "./pages/Task";
import Contacts from "./pages/Contacts";
import Cases from "./pages/Cases";
import Communication from "./pages/Communication";
import Leads from "./pages/Leads";
import React, { useState, createContext } from "react";
import SideMenu from "./components/SideMenu";
import AppHeader from './components/Header';

export interface IsLoggedContextProps {
  isLogged: boolean;
  showMenu: boolean;
  activeIndex: number;
  language: string;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}
export const isLoggedContext = createContext<IsLoggedContextProps>({
  isLogged: false,
  showMenu: false,
  activeIndex:0,
  language:"",
  setShowMenu: () => {},
  setIsLogged: () => {},
  setActiveIndex: () => {},
  setLanguage: ()=>{}
});

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLogged, setIsLogged] = useState(true);
  const [showMenu, setShowMenu] = useState(true);
  const [language, setLanguage] = useState("");

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "/register",
      element: <RegisterPage />
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/calendar",
      element: <Calendar />,
    },
    {
      path: "/task",
      element: <Task />,
    },
    {
      path: "/contacts",
      element: <Contacts />,
    },
    {
      path: "/cases",
      element: <Cases />,
    },
    {
      path: "/communication",
      element: <Communication />,
    },
    {
      path: "/leads",
      element: <Leads />,
    },
  ]);

  
  return (
    <isLoggedContext.Provider value={{ isLogged, showMenu,activeIndex,language,setLanguage, setIsLogged, setShowMenu, setActiveIndex }}>
      <div className="div" key={657890-9876}>
        <AppHeader key={"suv5678io"}/>
        <div className="menu_main">
          {showMenu && <SideMenu key={"suv19876789"}/>}
          <RouterProvider router={router} />
        </div>
      </div>
    </isLoggedContext.Provider>
  );
}

export default App;