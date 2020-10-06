import { Card } from 'antd';
import React, { useEffect, useState } from 'react';


import './LitsTask.scss';
import InputTask from './InputTask/InputTask';
import TaskItem from './TaskItem/TaskItem';
import Footer from './Footer/Footer';
import { database } from '../Api/firebase';
import { useDispatch } from 'react-redux';
import { getTasks } from '../store/slices/todoSlice';



function LitsTask(props) {
  const [listTask, setListTask] = useState([]);
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
      setListTask(arr);
      const getAll = getTasks(arr)
      dispatch(getAll);
    });
  }, [dispatch])
  return (
    <div className="list_task">
      <div className="card">
        <Card style={{ width: 600 }}>
          <h2 className="title">TO DO APP</h2>
          <InputTask />
          <TaskItem tasks={listTask} />
          <Footer tasks={listTask} />
        </Card>
      </div>
    </div>
  );
}

export default LitsTask;