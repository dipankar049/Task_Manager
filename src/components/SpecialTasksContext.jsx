// SpecialTasksContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
const SpecialTasksContext = createContext();

export const useSpecialTasks = () => useContext(SpecialTasksContext);



export const SpecialTasksProvider = ({ children }) => {
  // const initialTasks = JSON.parse(localStorage.getItem('specialTasks')) || [ 
  //   { id: 100, title: 'Dummy Task', scheduledDate: new Date(2020, 1, 1) },
  // ];
  // const initialTasks = 
  const [specialTasks, setSpecialTasks] = useState([]);
  
  useEffect(() => {
    fetch('/api/specialTask')
    .then(response => response.json())
    .then(data => setSpecialTasks(data))
    .catch(error => console.error('Error fetching data:', error));
  },[]);
  

  useEffect(() => {
    localStorage.setItem('specialTasks', JSON.stringify(specialTasks));
  }, [specialTasks]);

  return (
    <SpecialTasksContext.Provider value={{ specialTasks, setSpecialTasks }}>
      {children}
    </SpecialTasksContext.Provider>
  );
};
