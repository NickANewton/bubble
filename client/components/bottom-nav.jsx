import React from 'react';
import AppContext from '../lib/app-context';

export default class BottomNav extends React.Component {
  render() {
    const { route } = this.context;
    const isAuthPage = route.path === ('sign-up' || 'sign-in')
      ? 'd-none'
      : '';
    return (
      <nav className={`navbar bg-white fixed-bottom side-nav ${isAuthPage}`}>
        <ul className='d-flex list-unstyled container-fluid justify-content-around align-items-center desktop-column ul-desktop-height'>
          <li className='d-none'>
            <div></div>
          </li>
          <li>
            <a className="navbar-item" href="#">
              <i className="fa-solid fa-house fa-lg text-info"></i>
            </a>
          </li>
          <li>
            <a className="navbar-item" href="#create-post">
              <i className="fa-solid fa-circle-plus text-grey fa-lg"></i>
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

BottomNav.contextType = AppContext;
