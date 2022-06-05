import React from 'react';
import LikeCommBtnContainer from './like-comment-btn-container';
import LikeBtn from '../components/like-btn';

const styles = {
  image: {
    width: 18.75 + 'rem',
    height: 18.75 + 'rem'
  }
};

class PostDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null
    };
  }

  componentDidMount() {
    fetch(`api/posts/${this.props.postId}`)
      .then(res => res.json())
      .then(post => this.setState({ post }));
  }

  render() {
    if (!this.state.post) return null;
    const { imageUrl, caption, username } = this.state.post;
    return (
     <div className='container width-540'>
      <div className='mt-3 d-flex'>
        <a href="#" className='text-decoration-none text-info d-flex align-items-center'>
          <i className="fa-solid fa-arrow-left text-info fa-xl me-1"></i>
          <h3>Bubble Feed</h3>
        </a>
      </div>
      <div className='mx-auto d-flex justify-content-center mt-3'>
        <img src={imageUrl} alt="" style={styles.image} />
      </div>
       <div className='post-text-div bg-white mt-3 p-3'>
        <div>
          <h5 className='text-info'>{username}</h5>
        </div>
        <p>{caption}</p>
      </div>
      <LikeCommBtnContainer>
        <LikeBtn />
      </LikeCommBtnContainer>
    </div>
    );
  }
}

export default PostDetails;
