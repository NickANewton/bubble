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
              <a href={`#posts?postId=${posts.postId}`}>
                <img src={posts.imageUrl} alt="" />
              </a>
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
