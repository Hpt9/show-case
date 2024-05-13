import AddTaskModal from "../components/TaskComponents/AddTaskModal";
import "../scss/Task.scss";
import React,{useState,useEffect} from "react";
import Button from '@mui/material/Button';
import TasksBody from "../components/TaskComponents/TasksBody";
import { useTranslation } from "react-i18next";
import axios from "axios";

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
  const [data, setData] = useState(null);
  function getData() {
    axios.get('https://my-final-project-45l9.onrender.com/api/tasks')
      .then(response => {
        //setData(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }
  async function postData() {
    try {
      const headers = {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      };

      const response = await axios.post('https://my-final-project-45l9.onrender.com/api/tasks', 
      {
        name: "TestTask",
        dueDate: "2024-06-14T13:28:50.754Z",
        description: "for test",
        priority: "HIGH",
        reminder: {
          timePeriod: 2,
          timeType: "MINUTE"
        }
      },
      { headers });
      console.log('Post request successful:', response.data);
    } catch (error) {
      console.error('Error making post request:', error);
    }
  }
    
  return (
    <div className="task-main-div">
      <div className="taskPageHeader">
          <p>{t("Task.h1")}</p>
          <Button variant="contained" onClick={openModal}>{t("Task.btn")}</Button>
      </div>
      {/* <button onClick={getData}>GET</button>
      <button onClick={postData}>POST</button> */}
      <TasksBody/>
      {isModalOpen && 
      <div className="formToTask">
        <AddTaskModal closeModal={closeModal} isModalOpen={isModalOpen}/>
      </div>
      }
    </div>
  )
}
