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
      isLiked: null,
      comment: '',
      userComments: null
    };
    this.handleLike = this.handleLike.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  handleCommentChange(event) {
    this.setState({
      comment: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        postId: this.state.post.postId,
        content: this.state.comment
      })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          comment: ''
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

    fetch(`api/comments/${this.props.postId}`)
      .then(res => res.json())
      .then(userComments => this.setState({ userComments }))
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
        <div className='mt-3 d-flex sticky-top bg-blue'>
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
      <div className='border-top border-bottom mt-3 p-3 d-flex justify-content-around'>
        <i className={`fa-solid fa-heart fa-xl ${likeColor}`} onClick={this.handleLike}></i>
        <i className="fa-solid fa-comment fa-xl text-info" data-bs-toggle="modal" data-bs-target="#commentModal"></i>
      </div>
        <div>
          {
            this.state.userComments?.map(comm => (
                <div key={comm.commentId} id={comm.commentId} className='post-text-div bg-white mt-3 p-3'>
                  <div>
                    <h5 className='text-info'>{comm.username}</h5>
                  </div>
                  <p>{comm.content}</p>
                </div>
            ))
          }
        </div>
      <div className="modal fade" id="commentModal" tabIndex="-1" aria-labelledby="commentModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="commentModalLabel">Comment</h5>
            </div>
              <form onSubmit={this.onSubmit}>
                <div className="modal-body">
                  <textarea
                    required
                    className="border-0"
                    placeholder='Your comment here...'
                    style={{ resize: 'none', height: 160 + 'px', width: 100 + '%' }}
                    onChange={this.handleCommentChange}
                    value={this.state.comment}>
                    </textarea>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-white border border-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-info text-white" data-bs-dismiss="modal">POST</button>
                </div>
              </form>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default PostDetails;
