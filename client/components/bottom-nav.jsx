import React from 'react';

class BottomNav extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm bg-white fixed-bottom">
        <ul className='d-flex list-unstyled container-fluid justify-content-around align-items-center'>
          <li>
            <a className="navbar-brand" href="#">
              <i className="fa-solid fa-house fa-lg"></i>
            </a>
          </li>
          <li>
            <a className="navbar-brand" href="#">
              <i className="fa-solid fa-circle-plus text-info fa-lg"></i>
            </a>
          </li>
          <li>
            <a className="navbar-brand" href="#">
              <i className="fa-regular fa-user text-info fa-lg"></i>
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default BottomNav;
