import React from 'react'
import { Link } from 'react-router-dom';
import calenderImage from '../assets/calendar2.png'
import routineImage from '../assets/routine.png'
import addTaskImage from '../assets/addTask.png'
import monthlyImage from '../assets/monthly.png'
import weeklyImage from '../assets/weekly.png'
import resetTaskImage from '../assets/undo.png'

export default function MenubarUn({ onAddNewTask }) {
  return (
    <div className='w-16p h-screen pt-4 pl-3 text-base font-medium border-r-2 drop-shadow-sm'>
        <p className='text-2xl font-serif font-bold text-center mb-7 mt-1'>ABCD</p>
          <div className='rounded-tl h-full p-2 divider'>
            <div className='w-full p-1 pl-2 hover:bg-emerald-100 rounded-r-3xl rounded-l-md'>
                <Link to="/calendar"><img src={calenderImage} className='mb-1 mr-1' style={{height: '20px', width: '20px', display: 'inline'}}/>View Calender</Link>
            </div>
            <hr className='border-gray-300 mr-5 my-[2px]'/>
            <div className='w-full p-1 pl-2 hover:bg-emerald-100 rounded-r-3xl rounded-l-md'>
                <img src={routineImage} className='mb-1 mr-1 mb-2' style={{height: '20px', width: '20px', display: 'inline'}}/>Set Your Routine
            </div>
            <hr className='border-gray-300 mr-5 my-[2px]'/>
            <div className='w-full p-1 pl-2 cursor-pointer hover:bg-emerald-100 rounded-r-3xl rounded-l-md' onClick={onAddNewTask}>
                <img src={addTaskImage} className='mb-1 mr-1' style={{height: '20px', width: '20px', display: 'inline'}}/>Add New Task
            </div>
            <hr className='border-gray-300 mr-5 my-[2px]'/>
            <div className='w-full p-1 pl-2 hover:bg-emerald-100 rounded-r-3xl rounded-l-md'>
                Update Daily Task
            </div>
            <hr className='border-gray-300 mr-5 my-[2px]'/>
            <div className='w-full p-1 pl-2 hover:bg-emerald-100 rounded-r-3xl rounded-l-md'>
                <img src={weeklyImage} className='mb-1 mr-1' style={{height: '20px', width: '20px', display: 'inline'}}/>Weekly Summery
            </div>
            <hr className='border-gray-300 mr-5 my-[2px]'/>
            <div className='w-full p-1 pl-2 hover:bg-emerald-100 rounded-r-3xl rounded-l-md'>
                <img src={monthlyImage} className='mb-1 mr-1' style={{height: '20px', width: '20px', display: 'inline'}}/>Monthly Overview
            </div>
            <hr className='border-gray-300 mr-5 my-[2px]'/>
            <div className='w-full p-1 pl-2 hover:bg-emerald-100 rounded-r-3xl rounded-l-md'>
                <img src={resetTaskImage} className='mb-1 mr-1' style={{height: '20px', width: '20px', display: 'inline'}}/>Reset Routine
            </div>
            {/* <hr className='border-gray-300 mr-5 my-[3px]'/> */}
          </div>
          
          
        </div>
  )
}
