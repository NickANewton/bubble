import React from 'react';

export default function NotFound() {
  return (
    <div className="mx-auto container content-width">
      <div className="row">
        <div className="col text-center mt-5">
          <h4 className='mb-4'>Uh oh! <br/> We could not find the page you are looking for!</h4>
          <a className="text-info h4" href="#">Return Home</a>
        </div>
      </div>
    </div>
  );
}
