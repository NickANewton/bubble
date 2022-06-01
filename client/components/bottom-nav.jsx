import React from 'react';

class BottomNav extends React.Component {
  render() {
    return (
      <nav className="navbar bg-white fixed-bottom side-nav">
        <ul className='d-flex list-unstyled container-fluid justify-content-around align-items-center desktop-column ul-desktop-height'>
          <li className='d-none'>
            <div></div>
          </li>
          <li>
            <a className="navbar-item" href="#">
              <i className="fa-solid fa-house fa-lg text-grey"></i>
            </a>
          </li>
          <li>
            <a className="navbar-item" href="#">
              <i className="fa-solid fa-circle-plus text-info fa-lg"></i>
            </a>
          </li>
          <li>
            <a className="navbar-item" href="#">
              <i className="fa-solid fa-user text-grey fa-lg"></i>
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default BottomNav;
