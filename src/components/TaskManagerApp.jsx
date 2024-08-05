import React, {useRef, useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SpecialTasksProvider } from './SpecialTasksContext.jsx';
import TaskManagerHome2 from './TaskManagerHome2.jsx';
import MyCalendar3 from './MyCalender3.jsx';
import MenubarUn from './MenubarUn.jsx';
import Navbar from './Navbar.jsx';
import UpdateTask from './UpdateTask.jsx';
import ModalAddTask from './ModelAddTask';

const TaskManagerApp = () => {


  const [isModalOpen, setModalOpen] = useState(false);
  const handleAddTask = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const childARef = useRef();
  const handleSubmit = () => {
    if (childARef.current) {
      childARef.current.handleSubmit(); // Call addTask in ChildA
    }
    setModalOpen(false);
  };


  return (
    <SpecialTasksProvider>
      <BrowserRouter>
        <div className='flex w-full h-full'>
          <MenubarUn addTask={handleAddTask}/>
          <div className='w-full'>
            <Navbar />
            <Routes>
              <Route path="/" element={<TaskManagerHome2 ref={childARef}/>} />
              <Route path="/updateTask" element={<UpdateTask />} />
              <Route path="/calendar" element={<MyCalendar3 />} />
            </Routes>
          </div>
          <ModalAddTask show={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmit} />
        </div>
      </BrowserRouter>
    </SpecialTasksProvider>
  );
};

export default TaskManagerApp;
