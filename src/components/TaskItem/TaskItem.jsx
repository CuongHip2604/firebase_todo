import { Button, Checkbox, List, Modal } from 'antd';
import React from 'react';
import { EditTwoTone, DeleteTwoTone, ExclamationCircleOutlined } from '@ant-design/icons';
import './TaskItem.scss'
import PropTypes from 'prop-types';
import { database } from '../../Api/firebase';
import { getTask } from '../../store/slices/todoSlice';
import { useDispatch } from 'react-redux';

TaskItem.propTypes = {
  tasks: PropTypes.array,
}

TaskItem.defaultProps = {
  tasks: []
}

function TaskItem(props) {

  const {tasks} = props;
  const dispatch = useDispatch();

  const deleteTask = (id) => {
    database.ref('tasks').child(id).remove()
  }
  const editTask = (id) => {
    const action = getTask(id);
    dispatch(action)
  }
  const onChange = (item) => {
    const data = {
      ...item,
      isComplete: !item.isComplete,
      created: new Date().toISOString()
    }
    console.log(data);
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
      {
        tasks.length > 0 && (
          <List
            dataSource={tasks}
            renderItem={item => (
              <List.Item>
                <Checkbox defaultChecked={item.isComplete} onChange={() => onChange(item)} />
                <h3>{item.taskName}</h3>
                <div className="actions">
                  <Button type="text" danger>
                    <EditTwoTone onClick={() => editTask(item.id)}/>
                  </Button>
                  <Button type="text" danger>
                    <DeleteTwoTone twoToneColor="#f81d22" onClick={() => confirm(item.id)} />
                  </Button>
                </div>
              </List.Item>
            )}
          />
        )
      }
      {
        tasks.length === 0 && (
          <List
            loading
            dataSource={[]}
            renderItem={item => (
              <List.Item>
                <Checkbox />
                <h3>{item.taskName}</h3>
                <div className="actions">
                  <Button type="text" danger>
                    <EditTwoTone />
                  </Button>
                  <Button type="text" danger>
                    <DeleteTwoTone twoToneColor="#f81d22"/>
                  </Button>
                </div>
              </List.Item>
            )}
          />
        )
      }
      </div>
  );
}

export default TaskItem;