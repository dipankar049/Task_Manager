import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useSpecialTasks } from './SpecialTasksContext';
import { Link } from 'react-router-dom';
import Modal from './Modal'; // Assuming you have a Modal component
import './calendar.css'
import profileImage from '../assets/profile.png'
import MenubarUn from './MenubarUn';
import axios from 'axios';

const localizer = momentLocalizer(moment);
const MyCalendar3 = () => {
  const { specialTasks, setSpecialTasks } = useSpecialTasks();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectSlot = async(slotInfo) => {
    const title = window.prompt('New Event name');
    if (title) {
      const newEvent = {
        // id: specialTasks.length + 1,
        title,
        start: slotInfo.start.toLocaleDateString('en-CA'),
        end: slotInfo.end.toLocaleDateString('en-CA'),
        scheduledDate: slotInfo.start.toLocaleDateString('en-CA'),
        completed: 0, // Assuming a default completion status
      };
      // console.log(slotInfo.start.toISOString());
      console.log(slotInfo.start.toLocaleDateString('en-CA'));
      // console.log(slotInfo.start);
      
      try {
        await axios.post('/api/updateSpecialTask', newEvent);
      } catch (error) {
        console.error('Error sending data:', error);
      }
      const updatedTasks = [...specialTasks, newEvent];
      setSpecialTasks(updatedTasks);
      localStorage.setItem('specialTasks', JSON.stringify(updatedTasks));
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleConfirmCompletion = (isCompleted) => {
    setSpecialTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === selectedEvent.id ? { ...task, completed: isCompleted } : task
      )
    );
    setSelectedEvent(null);
  };

  const CustomEventComponent = ({ event }) => (
    // <span style={{ textDecoration: event.completed ? 'line-through' : 'none', color: event.completed ? 'gray' : 'black' }}>
    //   ✅{event.title}
    // </span>
    <span style={{  color: event.completed ? 'gray' : 'black', fontWeight: event.completed ? 'normal' : 'bold'}}>
      {event.completed ? '✅' : ''}{event.title}
    </span>
  );

  return (
    <div className='flex'>
      <MenubarUn />
      <div className='w-full'>
          <div className='flex justify-end h-12 p-2'>
            <div className='w-9 grid place-content-center border-2 p-1 border-black rounded-full'>
              <img src={profileImage} alt='Profile' style={{height: '24px'}} ></img>
            </div>
          </div>
        <div className='p-2 px-6 pl-4 h-screen w-full bg-cover bg-center bg-emerald-50' >
          <h2 className='font-serif text-5xl text-black font-bold m-2 text-center'>Your Calendar</h2>
          <Calendar
            localizer={localizer}
            events={specialTasks}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleEventClick}
            components={{
              event: CustomEventComponent,
            }}
          />
          {/* <Link to="/">Homepage</Link> */}
          <Modal
            show={!!selectedEvent}
            onClose={handleCloseModal}
            onConfirm={handleConfirmCompletion}
            title={`Mark task "${selectedEvent?.title}" as completed?`}
            taskState={selectedEvent?.completed}
          />
        </div>
      </div>
        
    </div>
    
  );
};

export default MyCalendar3;
