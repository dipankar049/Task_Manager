// Modal.js
import React from 'react';
import './ModelAddTask.css'

const ModalEditTask = ({ show, onClose, onSubmit, taskInfo }) => {
  const [title, setTitle] = React.useState('');
  const [defaultTime, setDefaultTime] = React.useState('');

  if (!show) {
    return null;
  }

  const handleSubmit = () => {
    onSubmit({
      title: title ? title : taskInfo.title,
      defaultTime: defaultTime ? parseInt(defaultTime, 10) : taskInfo.defaultTime
    });
    // onSubmit(inputData);
    setTitle('');
    setDefaultTime('');
  };

  return (
    <div className="modal2">
      <div className="modal-content2">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit task:</h2>
        <label>
          Task name:
          <input 
            type="text" 
            className='border-2 border-black'
            // value={taskInfo.title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={taskInfo.title}
            required
          />
        </label>
        <label>
          Duration(in minutes):
          <input 
            type="number" 
            className='border-2 border-black'
            // value={taskInfo.defaultMinutes} 
            onChange={(e) => setDefaultTime(e.target.value)} 
            placeholder={taskInfo.defaultMinutes}
          />
        </label>
        <button 
        className='text-black hover:text-white border-2 border-black hover:bg-black rounded px-3 py-0 mt-4 ml-36p text-center' 
        onClick={handleSubmit}
        >Update</button>
      </div>
    </div>
  );
};

export default ModalEditTask;
