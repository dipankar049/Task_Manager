// SpecialTasksContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const SpecialTasksContext = createContext();

export const useSpecialTasks = () => useContext(SpecialTasksContext);

export const SpecialTasksProvider = ({ children }) => {
  const initialTasks = JSON.parse(localStorage.getItem('specialTasks')) || [
    { id: 100, title: 'Dummy Task', date: new Date(2020, 1, 1) },
  ];

  const [specialTasks, setSpecialTasks] = useState(initialTasks);

  useEffect(() => {
    localStorage.setItem('specialTasks', JSON.stringify(specialTasks));
  }, [specialTasks]);

  

  return (
    <SpecialTasksContext.Provider value={{ specialTasks, setSpecialTasks }}>
      {children}
    </SpecialTasksContext.Provider>
  );
};
