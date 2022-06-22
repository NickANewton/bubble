import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    fetch('/api/feed', {
      headers: {
        'X-Access-Token': window.localStorage.getItem('bubble-jwt')
      }
    })
      .then(res => res.json())
      .then(posts => this.setState({ posts }));
  }

  render() {
    if (this.context.user === null) return <Redirect to="sign-in" />;
    if (this.state.posts === []) return null;
    return (
      <>
        <div className='container'>
          <ul className='d-flex flex-wrap mt-3 mb-3 list-unstyled justify-content-around content-width mx-auto'>
            {
              this.state.posts.map(posts => {
                let size;
                const numLikes = Number(posts.numberOfLikes);
                if (numLikes < 4) {
                  size = 90;
                } else if (numLikes < 9) {
                  size = 130;
                } else {
                  size = 170;
                }
                return (
            <li key={posts.postId} id={posts.postId} className='mb-3 d-flex align-items-center'>
              <a href={`#posts?postId=${posts.postId}`}>
                <img src={posts.imageUrl} style={{ width: size + 'px', height: size + 'px' }}/>
              </a>
            </li>
                );
              })
          }
          </ul>
        </div>
      </>
    );
  }
}

export default Feed;

Feed.contextType = AppContext;
