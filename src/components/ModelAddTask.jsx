// Modal.js
import React from 'react';
import './ModelAddTask.css'

const ModalAddTask = ({ show, onClose, onSubmit }) => {
  const [title, setTitle] = React.useState('');
  const [defaultTime, setDefaultTime] = React.useState('');

  if (!show) {
    return null;
  }

  const handleSubmit = () => {
    onSubmit({
      id: Date.now(),
      title,
      completed: false,
      spentHours: 0,
      spentMinutes: 0,
      defaultTime: parseInt(defaultTime, 10)
    });
    // onSubmit(inputData);
    setTitle('');
    setDefaultTime('');
  };

  return (
    <div className="modal2">
      <div className="modal-content2">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Enter Details</h2>
        <label>
          Task name:
          <input 
            type="text" 
            className='border-2 border-black'
            // value={title} 
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Duration(in minutes):
          <input 
            type="number" 
            className='border-2 border-black'
            // value={defaultTime} 
            onChange={(e) => setDefaultTime(e.target.value)} 
          />
        </label>
        <button className='text-black hover:text-white border-2 border-black hover:bg-black rounded px-3 py-0 mt-4 ml-36p text-center' onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default ModalAddTask;
