import React from 'react';

export default class BubblesRight extends React.Component {
  render() {
    const { action } = this.props;
    const isAuthPage = action === 'sign-up'
      ? 'd-none'
      : '';
    return <div className={`right-bubbles ${isAuthPage}`}></div>;
  }
}
