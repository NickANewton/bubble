import React from 'react';

class LikeBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: null
    };
    this.handleLike = this.handleLike.bind(this);
    this.handleUnlike = this.handleUnlike.bind(this);
  }

  handleLike(event) {
    fetch('/api/likes', {
      method: 'POST',
      body: {
        userId: 2,
        postId: this.props.postId
      }
    });
    this.setState({
      isLiked: 'liked'
    });
  }

  handleUnlike(event) {
    fetch('/api/likes', {
      method: 'DELETE',
      body: {
        userId: 2,
        postId: this.postId
      }
    });
    this.setState({
      isLiked: 'notLiked'
    });
  }

  render() {
    return (
      <i className="fa-solid fa-heart fa-xl text-info"></i>
    );
  }
}

export default LikeBtn;
