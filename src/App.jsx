import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TaskManagerApp from './components/TaskManagerApp'
import SPA from './components/SPA';
import UpdateTask from './components/UpdateTask';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <TaskManagerApp />
      {/* <SPA /> */}
      {/* <UpdateTask /> */}
    </>
  )
}

export default App
