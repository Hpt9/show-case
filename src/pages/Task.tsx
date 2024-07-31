import AddTaskModal from "../components/TaskComponents/AddTaskModal";
import "../scss/Task.scss";
import {useState} from "react";
import Button from '@mui/material/Button';
import TasksBody from "../components/TaskComponents/TasksBody";
import { useTranslation } from "react-i18next";

export default function Task() {
  //https://my-final-project-45l9.onrender.com/api/tasks
  const {t} = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
    
  return (
    <div className="task-main-div">
      <div className="taskPageHeader">
          <p>{t("Task.h1")}</p>
          <Button variant="contained" onClick={openModal}>{t("Task.btn")}</Button>
      </div>
      <TasksBody/>
      {isModalOpen && 
      <div className="formToTask">
        <AddTaskModal closeModal={closeModal} isModalOpen={isModalOpen}/>
      </div>
      }
    </div>
  )
}
