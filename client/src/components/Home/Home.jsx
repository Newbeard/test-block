import NewTask from '../NewTask/NewTask'
import Pagination from '../Pagination/Pagination'
import Task from '../Task/Task'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import {initTaskFromServer } from '../../redux/actions/task.action'


export default function Home(props) {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state)
  
  useEffect(() => {
    dispatch(initTaskFromServer())
  }, [dispatch])

  return (
    
   <>
   <div className="">
   <NewTask/>
   <Task tasks={tasks.tasks}/>
   <Pagination amountTask={tasks.amountTask}/>
   </div>
   </>
);
}



