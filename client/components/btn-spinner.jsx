import React from 'react';

export default class Spinner extends React.Component {
  render() {
    const spinnerUnhide = this.props.isLoading === true
      ? ''
      : 'd-none';
    return (
      <div className='d-flex justify-content-center'>
        <button className={`btn btn-info rounded-pill btn-lg d-flex ${spinnerUnhide}`} type="button" disabled>
          <span className="spinner-border spinner-border text-white" role="status" aria-hidden="true"></span>
          <span className="visually-hidden">Loading...</span>
        </button>
      </div>
    );
  }
}
