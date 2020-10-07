import React from 'react';
import { Button, List, Radio } from 'antd';
import './Footer.scss';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { database } from '../../Api/firebase';

Footer.propTypes = {
  tasks: propTypes.array,
  onFilterClick: propTypes.func,
  onClearComplete: propTypes.func,
}

Footer.defaultProps = {
  tasks: [],
  onFilterClick: null,
  onClearComplete: null,
}

function Footer(props) {

  const { tasks, onFilterClick, onClearComplete } = props

  const handleFilter = (text) => {
    if (onFilterClick) {
      onFilterClick(text)
    }
  }
  const handleDeleteALlComplete = (tasks) => {
    if (onClearComplete) {
      onClearComplete(tasks)
    }
  }

  return (
    <div className="footer">
      <List>
        <List.Item>
          <h4>{tasks.length} items</h4>
          <div className="filters">
            <Radio.Group>
              <Radio.Button value="large" onClick={() => handleFilter('all')}>All</Radio.Button>
              <Radio.Button value="default" onClick={() => handleFilter('active')}>Active</Radio.Button>
              <Radio.Button value="small" onClick={() => handleFilter('complete')}>Completed</Radio.Button>
            </Radio.Group>
          </div>
          <div className="clear_tasks_complete">
            <Button type="link" danger onClick={() => handleDeleteALlComplete(tasks)}>
              Clear Completed
              </Button>
          </div>
        </List.Item>
      </List>
      <div className="btn-logout">
        <Button type="link" danger>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Footer;