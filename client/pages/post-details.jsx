import React from 'react';

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
      post: null,
      isLiked: null
    };
    this.handleLike = this.handleLike.bind(this);
  }

  handleLike(event) {
    fetch('/api/likes', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ postId: this.state.post.postId })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          isLiked: true
        });
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    fetch(`api/posts/${this.props.postId}`)
      .then(res => res.json())
      .then(post => this.setState({ post }))
      .catch(err => console.error(err));

    fetch(`api/likes/${this.props.postId}`)
      .then(res => res.json())
      .then(data => this.setState({
        isLiked: data[0].exists
      }))
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.post) return null;
    const { imageUrl, caption, username } = this.state.post;
    let likeColor;
    if (this.state.isLiked === true) {
      likeColor = 'text-info';
    } else {
      likeColor = 'text-grey';
    }
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
        <div className='border-top border-bottom mt-3 p-3 d-flex justify-content-center'>
          <i className={`fa-solid fa-heart fa-xl ${likeColor}`} onClick={this.handleLike}></i>
        </div>
    </div>
    );
  }
}

export default PostDetails;
