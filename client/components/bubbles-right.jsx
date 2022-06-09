import React from 'react';
import AppContext from '../lib/app-context';

export default class BubblesRight extends React.Component {
  render() {
    const { route } = this.context;
    const isAuthPage = route.path === ('sign-up' || 'sign-in')
      ? 'd-none'
      : '';
    return <div className={`right-bubbles ${isAuthPage}`}></div>;
  }
}

BubblesRight.contextType = AppContext;
