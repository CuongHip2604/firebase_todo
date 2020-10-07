import { Card } from 'antd';
import React, { useEffect, useState } from 'react';


import './LitsTask.scss';
import InputTask from './InputTask/InputTask';
import TaskItem from './TaskItem/TaskItem';
import Footer from './Footer/Footer';
import { database } from '../Api/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../store/slices/todoSlice';



function LitsTask(props) {
  const [listTask, setListTask] = useState([]);
  const tasks = useSelector(state => state.todos.tasks)
  const dispatch = useDispatch();

  useEffect(() => {
    database.ref("tasks").on("value", (snapshot) => {
      let arr = [];
      for (let key in snapshot.toJSON()) {
        let value = snapshot.toJSON()[key];
        let data = {
          ...value,
          id: key,
        };
        arr.push(data);
      }
      if (arr.length > 0) {
        arr.sort((a, b) => {
          return new Date(b.created).getTime() - new Date(a.created).getTime();
        });
      }
      setListTask(arr);
      const getAll = getTasks(arr)
      dispatch(getAll);
    });
  }, [dispatch])

  const handleFilter = (text) => {
    let tasksFiter = [];
    switch (text) {
      case 'all':
        tasksFiter = tasks.filter(el => !el.isComplete || el.isComplete);
        break;
      case 'active':
        tasksFiter = tasks.filter(el => !el.isComplete)
        break;
      case 'complete':
        tasksFiter = tasks.filter(el => el.isComplete)
        break;

      default:
        break;
    }
    tasksFiter.sort((a, b) => {
      return new Date(b.created).getTime() - new Date(a.created).getTime();
    });
    setListTask(tasksFiter)
  }

  const handleClear = (tasks) => {
    if (tasks.length > 0) {
      tasks.forEach(item => {
        if (item.isComplete) {
          database.ref('tasks').child(item.id).remove();
        }
      })
      setListTask([])
    }
  }

  return (
    <div className="list_task">
      <div className="card">
        <Card style={{ width: 600 }}>
          <h2 className="title">Todos</h2>
          <InputTask />
          <TaskItem tasks={listTask} />
          <Footer tasks={listTask} onFilterClick={handleFilter} onClearComplete={handleClear} />
        </Card>
      </div>
    </div>
  );
}

export default LitsTask;