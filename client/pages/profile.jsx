import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class Profile extends React.Component {
  render() {
    const { user, handleSignOut } = this.context;
    if (user === null) return <Redirect to="sign-in" />;
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
        <div className="row">
          <div className="col">
            <div className="mt-5 text-center d-flex justify-content-center align-items-center">
              <button onClick={handleSignOut} className="btn btn-info btn-lg text-white rounded-pill">SIGN OUT</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.contextType = AppContext;
