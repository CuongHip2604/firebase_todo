import { Button, Checkbox, List, Modal } from 'antd';
import React from 'react';
import { EditTwoTone, DeleteTwoTone, ExclamationCircleOutlined } from '@ant-design/icons';
import './TaskItem.scss'
import { database } from '../../Api/firebase';
import { getTask } from '../../store/slices/todoSlice';
import { useDispatch } from 'react-redux';

import propTypes from 'prop-types';

TaskItem.propTypes = {
  tasks: propTypes.array,
}

TaskItem.defaultProps = {
  tasks: [],
}


function TaskItem(props) {

  const { tasks } = props
  const dispatch = useDispatch();


  const deleteTask = (id) => {
    database.ref('tasks').child(id).remove()
  }
  const editTask = (id) => {
    const data = {
      id: id,
      isOpen: true
    }
    const action = getTask(data);
    dispatch(action)
  }
  const onChange = (item) => {
    const data = {
      ...item,
      isComplete: !item.isComplete,
      created: new Date().toISOString()
    }
    database.ref('tasks').child(item.id).update(data)
  }
  const confirm = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete task ?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => deleteTask(id)
    })
  }

  return (
    <div className="task_item">
      <List
        dataSource={tasks}
        renderItem={item => (
          <List.Item>
            <Checkbox checked={item.isComplete} onChange={() => onChange(item)} />
            {
              !item.isComplete && (<h3>{item.taskName}</h3>)
            }
            {
              item.isComplete && (<h3 className="task_name_complete">{item.taskName}</h3>)
            }
            {
              !item.isComplete && (
                <div className="actions">
                  <Button type="text" danger>
                    <EditTwoTone onClick={() => editTask(item.id)} />
                  </Button>
                  <Button type="text" danger>
                    <DeleteTwoTone twoToneColor="#f81d22" onClick={() => confirm(item.id)} />
                  </Button>
                </div>
              )
            }
            {
              item.isComplete && (
                <div className="actions">
                  <Button type="text" danger disabled>
                    <EditTwoTone twoToneColor="#bfbfbf" />
                  </Button>
                  <Button type="text" danger disabled>
                    <DeleteTwoTone twoToneColor="#bfbfbf" />
                  </Button>
                </div>
              )
            }
          </List.Item>
        )}
      />
    </div>
  );
}

export default TaskItem;