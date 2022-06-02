import React from 'react';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    fetch('/api/feed')
      .then(res => res.json())
      .then(posts => this.setState({ posts }));
  }

  render() {
    return (
      <>
        <div className='container'>
          <ul className='d-flex flex-wrap mt-3 mb-3 list-unstyled justify-content-around width-440 mx-auto'>
            {
              this.state.posts.map(posts => (
            <li key={posts.postId} id={posts.postId} className='mb-3 d-flex align-items-center'>
              <img src={posts.imageUrl} alt="" />
            </li>
              ))
            }
          </ul>
        </div>
      </>
    );
  }
}

export default Feed;

/* <li className='mb-3 d-flex align-items-center'>
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
            </li> */
