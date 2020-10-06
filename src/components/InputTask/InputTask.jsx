import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { database } from '../../Api/firebase';
import { Button, Input } from 'antd';
import './InputTask.scss';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


function InputTask(props) {

  const [value, setValue] = useState('');
  const taskSelected = useSelector(state => state.todos.taskSelected);
  const isOpen = useSelector(state => state.todos.isOpen);

  const onChange = (e) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    if (taskSelected) {
      setValue(taskSelected.taskName)
    }
  }, [taskSelected])

  const addTask = () => {
    const data = {
      taskName: value,
      isComplete: false,
      created: new Date().toISOString()
    }
    database.ref('tasks').push(data)
    setValue('')
  }
  const updateTask = () => {
    const data = {
      taskName: value,
      isComplete: false,
      created: new Date().toISOString()
    }
    database.ref('tasks').child(taskSelected.id).update(data)
    setValue('')
  }


  return (
    <div className="input_task">
      <Input
        size="large"
        placeholder="What needs to be done?"
        value={value}
        onChange={onChange}
        prefix={<DownOutlined style={{color: '#bfbfbf'}}/>}
      />
      {
        !isOpen && (
          <Button type="primary" size="large" onClick={addTask}>
              ADD
          </Button>

        )
      }
      {
        isOpen && (
          <Button type="primary" size="large" onClick={updateTask}>
              UPDATE
          </Button>
        )
      }
    </div>
  );
}

export default InputTask;