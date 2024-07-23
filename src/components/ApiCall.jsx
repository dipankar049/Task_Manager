import React, { useEffect, useState } from 'react';

function ApiCall() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetch('/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Tasks from backend:</h1>
      <ul>
        {tasks.length > 0 ? (
          tasks.map(task => (
            <li key={task.id}>{task.title}</li>
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </ul>
    </div>
  );
}

export default ApiCall;
