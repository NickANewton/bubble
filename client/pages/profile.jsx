import React from 'react';
import AppContext from '../lib/app-context';

export default class Profile extends React.Component {
  render() {
    const { user } = this.context;
    return (
      <div className="mx-auto container content-width">
        <div className="row">
          <div className="col d-flex justify-content-center align-items-center">
            <div className="text-center mt-5">
              <img src="/images/prof2.png" alt="" className='bg-info' />
              <h2 className='text-info mt-4'>{user.username}</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.contextType = AppContext;
