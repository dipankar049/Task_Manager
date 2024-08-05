import React from 'react'
import { Link } from 'react-router-dom';
import calenderImage from '../assets/calendar2.png'
import routineImage from '../assets/routine.png'
import addTaskImage from '../assets/addTask.png'
import monthlyImage from '../assets/monthly.png'
import weeklyImage from '../assets/weekly.png'
import resetTaskImage from '../assets/undo.png'
import homeImage from '../assets/home.png'
import updateTaskImage from '../assets/updateTask3.png'


export default function MenubarUn({ addTask }) {
  return (
    <div className='w-16p h-screen pt-4 pl-3 text-base font-medium border-r-2 drop-shadow-sm'>
        <p className='text-2xl font-serif font-bold text-center mb-7 mt-1'>ABCD</p>
          <div className='rounded-tl w-full h-full p-2 divider'>
            {/* <div className='w-full p-1 pl-2 hover:bg-emerald-100 rounded-r-3xl rounded-l-md'> */}
            <Link className='w-full block p-1 pl-2 hover:bg-emerald-100 rounded-r-3xl rounded-l-md' to="/">
                <img src={homeImage} className='mb-1 mr-1' style={{height: '20px', width: '20px', display: 'inline'}}/>
                Home
            </Link>
            {/* </div> */}
            <hr className='border-gray-300 mr-5 my-[2px]'/>
            <Link className='w-full block p-1 pl-2 hover:bg-emerald-100 rounded-r-3xl rounded-l-md' to="/calendar">
                <img src={calenderImage} className='mb-1 mr-1' style={{height: '20px', width: '20px', display: 'inline'}}/>
                View Calender
            </Link>
            <hr className='border-gray-300 mr-5 my-[2px]'/>
            <Link className='w-full block p-1 pl-2 hover:bg-emerald-100 rounded-r-3xl rounded-l-md' to="#">
                <img src={routineImage} className='mb-1 mr-1 mb-2' style={{height: '20px', width: '20px', display: 'inline'}}/>
                Set Your Routine
            </Link>  
            <hr className='border-gray-300 mr-5 my-[2px]'/>
            <div className='w-full p-1 pl-2 cursor-pointer hover:bg-emerald-100 rounded-r-3xl rounded-l-md' onClick={addTask}>
                <img src={addTaskImage} className='mb-1 mr-1' style={{height: '20px', width: '20px', display: 'inline'}}/>Add New Task
            </div>
            <hr className='border-gray-300 mr-5 my-[2px]'/>
            <Link className='w-full block p-1 pl-2 hover:bg-emerald-100 rounded-r-3xl rounded-l-md' to="/updateTask">
                <img src={updateTaskImage} className='mb-1 mr-1' style={{height: '20px', width: '20px', display: 'inline'}}/>
                Update Daily Task
            </Link>
            <hr className='border-gray-300 mr-5 my-[2px]'/>
            <Link className='w-full block p-1 pl-2 hover:bg-emerald-100 rounded-r-3xl rounded-l-md' to="#">
                <img src={weeklyImage} className='mb-1 mr-1' style={{height: '20px', width: '20px', display: 'inline'}}/>
                Weekly Summery
            </Link>   
            <hr className='border-gray-300 mr-5 my-[2px]'/>
            <Link className='w-full block p-1 pl-2 hover:bg-emerald-100 rounded-r-3xl rounded-l-md' to="#">
                <img src={monthlyImage} className='mb-1 mr-1' style={{height: '20px', width: '20px', display: 'inline'}}/>
                Monthly Overview
            </Link> 
            <hr className='border-gray-300 mr-5 my-[2px]'/>
            <Link className='w-full block p-1 pl-2 hover:bg-emerald-100 rounded-r-3xl rounded-l-md' to="#">
                <img src={resetTaskImage} className='mb-1 mr-1' style={{height: '20px', width: '20px', display: 'inline'}}/>
                Reset Routine
            </Link> 
          </div>
          
          
        </div>
  )
}
