import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useSpecialTasks } from './SpecialTasksContext';
import Modal from './Modal'; // Assuming you have a Modal component
import './calendar.css'
import axios from 'axios';

const localizer = momentLocalizer(moment);
const MyCalendar3 = () => {
  const { specialTasks, setSpecialTasks } = useSpecialTasks();   // fetch calendar(special) task by context API
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectSlot = async(slotInfo) => {
    // adding new calender(special) task
    const title = window.prompt('New Event name');
    if (title) {
      const newEvent = {
        title,
        start: slotInfo.start.toLocaleDateString('en-CA'),
        end: slotInfo.end.toLocaleDateString('en-CA'),
        scheduledDate: slotInfo.start.toLocaleDateString('en-CA'),
        completed: 0, // initially completion status false
      };
      // post new calender(special) task to backend 
      try {
        await axios.post('/api/updateSpecialTask', newEvent);
      } catch (error) {
        console.error('Error sending data:', error);
      }
    }
    updateTask(); // refetch updated task as new task added
  };


  function updateTask() {
    // fetch special(calender) task from backend
    fetch('/api/specialTask')
    .then(response => response.json())
    .then(data => setSpecialTasks(data))
    .catch(error => console.error('Error fetching data:', error));
  }


  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleConfirmCompletion = async(isCompleted) => {
    // update special(calender) task completion status
    try {
      await axios.post('/api/updateSpecialTaskStatus', 
        {
          id: selectedEvent.id, 
          completed: isCompleted ? 1 : 0
        });
    } catch (error) {
      console.error('Error sending data:', error);
    }
    updateTask(); // refetch updated task as task status changed
    setSelectedEvent(null);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  
  const CustomEventComponent = ({ event }) => (
    // custom event styling
    <span style={{  color: event.completed ? 'gray' : 'black', fontWeight: event.completed ? 'normal' : 'bold'}}>
      {event.completed ? '✅' : ''}{event.title}
    </span>
  );

  return (

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

      <Modal
        show={!!selectedEvent}
        onClose={handleCloseModal}
        onConfirm={handleConfirmCompletion}
        title={`Mark task "${selectedEvent?.title}" as completed?`}
        taskState={selectedEvent?.completed}
      />
    </div>
  );
};

export default MyCalendar3;
