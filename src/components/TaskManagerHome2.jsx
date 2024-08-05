import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { useSpecialTasks } from './SpecialTasksContext';
import Modal from './Modal';
import { Link } from 'react-router-dom';
import './TaskManager2.css'
import { ToastContainer, toast } from 'react-toastify';
import '../../node_modules/react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import ProgressBar from 'react-progressbar';

const TaskManagerHome2 = forwardRef((props, ref) => { 

  const [selectedTask, setSelectedTask] = useState(null);


  const today = new Date();
  const { specialTasks } = useSpecialTasks();   // fetch calendar(special) task by context API

  const todaySpecialTasks = specialTasks.filter((task) => {
    // filter today's task from calendar(special) task
    const dateObject = new Date(task.scheduledDate); // Convert string to Date object
    return dateObject.toDateString() === today.toDateString();
  });

  const monthSpecialTasks = specialTasks.filter((task) => {
    // filter monthly task from calendar(special) task
    const dateObject = new Date(task.scheduledDate); // Convert string to Date object
    return dateObject.getFullYear() === today.getFullYear() && dateObject.getMonth() === today.getMonth();
  });


  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    // fetch daily tasks from the backend when the component mounts
    const fetchData = async() => {
      await fetch('/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching data:', error));
    }
    fetchData();

    
  }, []);

  function fetchTask() {
    // fetch daily tasks from the backend
    fetch('/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching data:', error));
  }


  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let totalTime = 0;
    let spentTime = 0;
    
    tasks.forEach(task => {
      totalTime += task.defaultMinutes;
      if(task.completed) {
        spentTime += task.defaultMinutes;
      }
    });
    let percentage = Math.round((spentTime / totalTime) * 100);
    setProgress(percentage);
  },[tasks]);



  const [showModal, setShowModal] = useState(false);
  const handleShowModal = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleTaskCompletion = async (isCompleted) => {
    // post task completion status to databse
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

    fetchTask();  // fetch updated task as task status just updated
    notifyTaskCompleted();
    setShowModal(false);
  };

  const handleSpentHoursChange = (id, value) => {
    console.log(value);
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, spentHours: value } : task))
    );
  };

  const handleSpentMinutesChange = (id, value) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, spentMinutes: value } : task))
    );
  };


  useImperativeHandle(ref, () => ({
    handleSubmit
  }));

  const handleSubmit = () => {
    // New daily task added
    fetchTask();
    notifyTaskAdded();
  };

  
  const notifyTaskCompleted = () => toast("Marked as completed!");
  const notifyTaskAdded = () => toast("Task added successfully!");

  return (

        <div className='flex bg-emerald-50 h-full w-full p-6'>
          <div className="w-70p h-fit p-4 mr-4 bg-white rounded-lg drop-shadow-md pb-20">
            <div className='flex items-center justify-between'>
              <h2 className='inline-block font-serif text-3xl font-bold ml-4 mt-4 mb-6'>Today's Tasks</h2>
              <div className='relative w-1/2 rounded-lg '>
                <div className='bg-gray-300 rounded-lg overflow-hidden ml-40p'>
                  <ProgressBar completed={progress} bgcolor="#4caf50" height="16px" className=' rounded-lg'/>
                </div>
                <span className='absolute inset-0 flex items-center justify-center text-black font-semibold pl-42p'>{progress}%</span>
              </div>
            </div>
            {/* list of Calender tasks */}
            <ul>
              {todaySpecialTasks.map((task) => (
                <li key={task.id} className="flex justify-between w-98p h-12 p-2 pl-4 bg-white drop-shadow-md rounded-full m-4">
                  <span>📋{task.title}</span>
                  {/* button for update task status */}
                  <button disabled id={`${task.id}`}
                    className='text-green-600 hover:text-white border-2 border-green-600 hover:bg-black focus:ring-4 focus:outline-none focus:ring-green-300 rounded-full px-3 py-0 text-center' 
                    onClick={() => handleShowModal(task)}>
                    {task.completed ? '✔️Done' : '⏳Pending'}
                  </button>
                </li>
              ))}
              {/* list of Daily tasks */}
              {tasks.map((task) => (
                <li key={task.id} className="flex justify-between w-98p h-12 p-2 pl-4 bg-white drop-shadow-md rounded-full m-4">
                  <span>🕒{task.title}</span>

                  <div className='flex'>
                    <p>Duration:</p>
                    {/* input for spent hours */}
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
                    {/* input for spent minutess */}
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
                  {/* button for update task status */}
                  <button id={`${task.id}`}
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
                  📋{task.title} - {new Date(task.scheduledDate).toDateString().slice(0, -4)}{task.completed ? '✔️' : '⏳'}
                </li>
              ))}
            </ul>

            <div className='mt-8'>
              <Link className='bg-black hover:bg-blue-700 text-white py-1 px-4 m-2 rounded' to="/calendar">Calendar</Link>
            </div>

          </div>
          <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={(isCompleted) => handleTaskCompletion( isCompleted )}
            title={`Mark task "${selectedTask?.title}" as completed?`}
            taskState={selectedTask?.completed}
          />
          <ToastContainer />
        </div>
  );
});

export default TaskManagerHome2;