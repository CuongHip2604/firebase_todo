import { DownOutlined } from '@ant-design/icons';
import { Button, Input, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { database } from '../../Api/firebase';
import { getTask } from '../../store/slices/todoSlice';
import './InputTask.scss';


function InputTask(props) {

  const [value, setValue] = useState('');
  const taskSelected = useSelector(state => state.todos.taskSelected);
  const isOpen = useSelector(state => state.todos.isOpen);
  const dispatch = useDispatch();

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
    const action = {
      id: taskSelected.id,
      isOpen: false
    }
    dispatch(getTask(action))
    database.ref('tasks').child(taskSelected.id).update(data)
    setValue('')

  }

  const cancle = () => {
    const action = {
      id: taskSelected.id,
      isOpen: false
    }
    dispatch(getTask(action))
    setValue('')
  }


  return (
    <div className="input_task">
      <Input
        size="large"
        placeholder="What needs to be done?"
        value={value}
        onChange={onChange}
        prefix={<DownOutlined style={{ color: '#bfbfbf' }} />}
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
          <Radio.Group size='small'>
            <Button type="primary" className="update" size="large" onClick={updateTask}>
              UPDATE
            </Button>
            <Button type="text" size="large" danger onClick={cancle}>
              CANCLE
            </Button>
          </Radio.Group>
        )
      }
    </div>
  );
}

export default InputTask;