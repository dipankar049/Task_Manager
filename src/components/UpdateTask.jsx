import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Modal from './Modal';
import ModalEditTask from './ModelEditTask';

export default function UpdateTask() {
const [tasks, setTasks] = useState([]);
useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetch('/api/updateTasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [tasks]);

  const changeTaskStatus = async(task) => { 
    try {
        await axios.post('/api/updateTaskState', 
        {
            taskID: task.id, 
            state: (task.state == 'active') ? 'deactive' : 'active'
        });
    } catch (error) {
        console.error('Error sending data:', error);
    }
  }

  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleShowModal = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const removeTask = async(taskID, permit) => {
    if(permit) {
        try {
            await axios.post('/api/removeTask', { taskID });
        } catch (error) {
            console.error('Error sending data:', error);
        }
    }
    setShowModal(false);
  }

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (task) => {
    setModalOpen(true);
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = async({title, defaultTime}) => {
    const taskID = selectedTask.id;
    try {
      await axios.post('/api/renameTask', { taskID, title, defaultTime });
    } catch (error) {
        console.error('Error sending data:', error);
    }
    setModalOpen(false);
  }

  return (
    <div className='flex bg-emerald-50 h-full w-full p-6'>
      <div className="w-full h-fit p-4 bg-white rounded-lg drop-shadow-md pb-20">
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between w-98p h-12 p-2 pl-4 bg-white drop-shadow-md rounded-full m-4">
            <span>🕒{task.title}</span>
            <button
              className='text-black font-bold hover:text-green-600 px-3 py-0 text-center'
              onClick={() => {handleOpenModal(task)}}
            >
            Modify Task
            </button>
            <button id={`${task.id}`}
              className='text-green-600 hover:text-white border-2 border-green-600 hover:bg-black focus:ring-4 focus:outline-none focus:ring-green-300 rounded-full px-3 py-0 text-center' 
              onClick={() => changeTaskStatus(task)}>
              {/* {task.completed ? '✔️Done' : '⏳Pending'} */}
              {(task.state == 'active') ? 'Deactive' : 'Active'}
            </button>
            {(task.state != 'active') ? <button
              className='text-red-500 font-bold mr-4'
              onClick={() => handleShowModal(task)}
            >Remove</button> : ''}
          </li>
        ))}
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={(permit) => removeTask(selectedTask.id, permit)}
          title={`Are you sure want to remove "${selectedTask?.title}" this task? This can't be undo`}
          buttonContent={'Remove'}
        />
        <ModalEditTask show={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmit} taskInfo={selectedTask} />
      </div>
    </div>
  )
}
