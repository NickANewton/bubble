import React from 'react';
import AppContext from '../lib/app-context';

export default class BottomNav extends React.Component {
  render() {
    const { route } = this.context;
    const isAuthPage = route.path === 'sign-up' || route.path === 'sign-in'
      ? 'd-none'
      : '';
    const iconHome = route.path === '' || route.path === 'posts'
      ? 'text-info'
      : 'text-grey';
    const iconPost = route.path === 'create-post'
      ? 'text-info'
      : 'text-grey';
    return (
      <nav className={`navbar bg-white fixed-bottom side-nav ${isAuthPage}`}>
        <ul className='d-flex list-unstyled container-fluid justify-content-around align-items-center desktop-column ul-desktop-height'>
          <li>
            <a className="navbar-item" href="#">
              <i className={`fa-solid fa-house fa-lg ${iconHome}`}></i>
            </a>
          </li>
          <li>
            <a className="navbar-item" href="#create-post">
              <i className={`fa-solid fa-circle-plus fa-lg ${iconPost}`}></i>
            </a>
          </li>
          <li className='d-none'>
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
