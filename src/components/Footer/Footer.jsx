import React from 'react';
import { Button, List, Radio } from 'antd';
import './Footer.scss';
import PropTypes from 'prop-types';

Footer.propTypes = {
  tasks: PropTypes.array,
};

Footer.defaultProps = {
  tasks: []
}

function Footer(props) {

  const {tasks} = props

  return (
    <div className="footer">
        <List>
          <List.Item>
          <h4>{tasks.length} items</h4>
            <div className="filters">
              <Radio.Group>
                <Radio.Button value="large">All</Radio.Button>
                <Radio.Button value="default">Active</Radio.Button>
                <Radio.Button value="small">Completed</Radio.Button>
              </Radio.Group>
            </div>
            <div className="clear_tasks_complete">
              <Button type="link" danger>
                Clear Completed
              </Button>
            </div>
          </List.Item>
      </List>
    </div>
  );
}

export default Footer;