import React, { useEffect, useState, useRef } from 'react';
import { useSpecialTasks } from './SpecialTasksContext';
import Modal from './Modal';
import { Link } from 'react-router-dom';
import './TaskManager2.css'
import profileImage from '../assets/profile.png'
import MenubarUn from './MenubarUn';
import ModalAddTask from './ModelAddTask';
import { ToastContainer, toast } from 'react-toastify';
import '../../node_modules/react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const TaskManagerHome2 = () => { 
  const buttonsRef = useRef([]);

  const { specialTasks } = useSpecialTasks();
  const today = new Date();

  const notifyTaskCompleted = () => toast("Marked as completed!");
  const notifyTaskAdded = () => toast("Task added successfully!");

  const todaySpecialTasks = specialTasks.filter((task) => {
    const dateObject = new Date(task.date); // Convert string to Date object
    return dateObject.toDateString() === today.toDateString();
  });

  const monthSpecialTasks = specialTasks.filter((task) => {
    const dateObject = new Date(task.date); // Convert string to Date object
    return dateObject.getFullYear() === today.getFullYear() && dateObject.getMonth() === today.getMonth();
  });

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetch('/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  function fetchTask() {
    // Fetch data from the backend when the component mounts
    fetch('/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching data:', error));
  }

  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleShowModal = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleTaskCompletion = async (taskId, isCompleted) => {
    if(taskId == selectedTask.id) {
      try {
        await axios.post('/api/updateTaskStatus', 
          {
            taskID: selectedTask.id, 
            spentMinutes: selectedTask.spentMinutes || (selectedTask.defaultMinutes % 60), 
            spentHours: selectedTask.spentHours || Math.floor(selectedTask.defaultMinutes / 60), 
            completed: isCompleted ? 1 : 0
          });
      } catch (error) {
        console.error('Error sending data:', error);
      }
    }
    fetchTask();
    notifyTaskCompleted();
    setShowModal(false);
  };

  const handleSpentHoursChange = (id, value) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, spentHours: value } : task))
    );
  };

  const handleSpentMinutesChange = (id, value) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, spentMinutes: value } : task))
    );
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = async(inputData) => {
    if (inputData.title.trim() !== '') {
      try {
        const response = await axios.post('/api/addTasks',
           {
            title: inputData.title,
            defaultTime: inputData.defaultTime,
            spentHours: 0,
            spentMinutes: 0,
            completed: 0,
            state: 'active'
          });
      } catch (error) {
        console.error('Error sending data:', error);
      }
    }
    fetchTask();
    setModalOpen(false);
    notifyTaskAdded();
  };

  const handleAddNewTask = () => {
    handleOpenModal();
  };
  
  return (

      <div className='flex w-full h-full'>
      {/* <NavbarUn /> */}
        <MenubarUn onAddNewTask={handleAddNewTask}/>
        <div className='w-full'>
          <div className='flex justify-end h-12 p-2'>
            <div className='w-9 grid place-content-center border-2 p-1 border-black rounded-full'>
              <img src={profileImage} alt='Profile' style={{height: '24px'}} ></img>
            </div>
          </div>
          <div className='flex bg-emerald-50 h-full p-6'>
          <div className="w-70p h-fit p-4 mr-4 bg-white rounded-lg drop-shadow-md pb-20">
            <h2 className='font-serif text-3xl font-bold ml-4 mt-4 mb-6'>Today's Tasks</h2>
            <ul>
              {todaySpecialTasks.map((task) => (
                <li key={task.id} className="flex justify-between w-98p h-12 p-2 pl-4 bg-white drop-shadow-md rounded-full m-4">
                  <span>📋{task.title}</span>
                  <button disabled id={`${task.id}`} ref={el => buttonsRef.current[task.id] = el} 
                  className='text-green-600 hover:text-white border-2 border-green-600 hover:bg-black focus:ring-4 focus:outline-none focus:ring-green-300 rounded-full px-3 py-0 text-center' 
                  onClick={() => handleShowModal(task)}>
                    {task.completed ? '✔️Done' : '⏳Pending'}
                    </button>
                </li>
              ))}
              {tasks.map((task) => (
                <li key={task.id} className="flex justify-between w-98p h-12 p-2 pl-4 bg-white drop-shadow-md rounded-full m-4">
                  <span>🕒{task.title}</span>
                  <div className='flex'>
                  <p>Duration:</p>
                  <input
                    className='w-14 rounded p-2 bg-white'
                    type="number"
                    value={task.spentHours || ''}
                    disabled={task.completed}
                    onChange={(e) => handleSpentHoursChange(task.id, parseFloat(e.target.value))}
                    placeholder={task.defaultMinutes > 59 ? `${Math.floor(task.defaultMinutes / 60)}` : 0}
                    style={{'::placeholder': {color : 'black', opacity: 1}}}
                  />
                  <p>hr</p>
                  <input
                    className='w-14 rounded p-2 bg-white'
                    type="number"
                    value={task.spentMinutes || ''}
                    disabled={task.completed}
                    onChange={(e) => handleSpentMinutesChange(task.id, parseFloat(e.target.value))}
                    placeholder={`${Math.floor(task.defaultMinutes % 60)}`}
                    style={{'::placeholder': {color : 'black', opacity: 1}}}
                  />
                  <p>min</p>
                  </div>
                  <button id={`${task.id}`} ref={el => buttonsRef.current[task.id] = el} 
                  className='text-green-600 hover:text-white border-2 border-green-600 hover:bg-black focus:ring-4 focus:outline-none focus:ring-green-300 rounded-full px-3 py-0 text-center' 
                  onClick={() => handleShowModal(task)}>
                    {task.completed ? '✔️Done' : '⏳Pending'}
                    </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="h-fit w-28p p-6 pb-16 bg-white rounded-lg ml-2 drop-shadow-md">
            <h2 className='font-serif text-3xl font-bold mb-6'>Tasks for Month</h2>
            <ul className="special-task-list">
              {monthSpecialTasks.map((task) => (
                <li key={task.id} className="special-task-item">
                📋{task.title} - {new Date(task.date).toDateString().slice(0, -4)}{task.completed ? '✔️' : '⏳'}
              </li>
              ))}
            </ul>
            <div className='mt-8'>
              <Link className='bg-black hover:bg-blue-700 text-white py-1 px-4 m-2 rounded' to="/calendar">Calendar</Link>
            </div>
            
            
            
          </div>
        </div>
      </div>
      <ModalAddTask show={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmit} />
    <Modal
              show={showModal}
              onClose={() => setShowModal(false)}
              onConfirm={(isCompleted) => handleTaskCompletion(selectedTask.id, isCompleted)}
              title={`Mark task "${selectedTask?.title}" as completed?`}
              taskState={selectedTask?.completed}
            />
            <ToastContainer />
    </div>
  );
};

export default TaskManagerHome2;