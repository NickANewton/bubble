import React from 'react';

export default function CustomContainer({ children }) {
  return (
    <div className="d-flex page-height-mobile page-height-desktop" >
        {children}
      </div>
  );
}
