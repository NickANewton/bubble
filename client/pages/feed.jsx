import React from 'react';

class Feed extends React.Component {
  render() {
    return (
      <>
        <div className='container'>
          <ul className='d-flex flex-wrap mt-3 mb-3 list-unstyled justify-content-around width-440 mx-auto'>
            <li className='mb-3 d-flex align-items-center'>
              <img src="/images/image-1654108361874.webp" alt="" />
            </li>
            <li className='mb-3 d-flex align-items-center'>
              <img src="/images/image-1654036710760.jpeg" alt="" />
            </li>
            <li className='mb-3 d-flex align-items-center'>
              <img src="/images/image-1654108307779.jpeg" alt="" />
            </li>
            <li className='mb-3 d-flex align-items-center'>
              <img src="/images/image-1653957949934.png" alt="" />
            </li>
            <li className='mb-3 d-flex align-items-center'>
              <img src="/images/image-1654039483214.webp" alt="" />
            </li>
            <li className='mb-3 d-flex align-items-center'>
              <img src="/images/image-1654036586244.jpeg" alt="" />
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default Feed;
