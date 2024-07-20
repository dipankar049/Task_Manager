import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import TaskManagerHome from './TaskManagerHome';
// import MyCalendar from './MyCalender.jsx'
import { SpecialTasksProvider } from './SpecialTasksContext.jsx';
import TaskManagerHome2 from './TaskManagerHome2.jsx';
// import MyCalendar2 from './MyCalendar2.jsx';
import MyCalendar3 from './MyCalender3.jsx';

const TaskManagerApp = () => {
  return (
    <SpecialTasksProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TaskManagerHome2 />} />
          <Route path="/calendar" element={<MyCalendar3 />} />
        </Routes>
      </BrowserRouter>
    </SpecialTasksProvider> 
  );
};

export default TaskManagerApp;
