import React from 'react';

export default class Profile extends React.Component {
  render() {
    return (
      <div className="mx-auto container content-width">
        <div className="row">
          <div className="col d-flex justify-content-center align-items-center">
            <div>
              <img src="/images/prof2.png" alt="" className='bg-info' />
              <h2 className='text-info'>UserName</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
