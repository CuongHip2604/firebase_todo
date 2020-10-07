import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss';

function NotFound(props) {
  return (
    <div id="notfound">
      <div class="notfound">
        <div class="notfound-404">
        </div>
        <h2>404 - Page not found</h2>
        <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
        <Link to="/">Todos</Link>
      </div>
    </div>
  );
}

export default NotFound;