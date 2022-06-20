import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from './redirect';

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: '',
      caption: '',
      file: '',
      didSubmit: false
    };
    this.fileInputRef = React.createRef();
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleCaptionChange = this.handleCaptionChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTagsChange(event) {
    this.setState({
      tags: event.target.value
    });
  }

  handleCaptionChange(event) {
    this.setState({
      caption: event.target.value
    });
  }

  handleFileChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const form = new FormData();
    form.append('tags', this.state.tags);
    form.append('caption', this.state.caption);
    form.append('image', this.fileInputRef.current.files[0]);
    this.setState({
      didSubmit: true
    });

    fetch('/api/createPost', {
      method: 'POST',
      headers: {
        'X-Access-Token': window.localStorage.getItem('bubble-jwt')
      },
      body: form
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          tags: '',
          caption: '',
          file: '',
          didSubmit: false
        });
        this.fileInputRef.current.value = null;
        window.location.hash = '';
      })
      .catch(err => console.error(err));
  }

  render() {
    if (this.context.user === null) return <Redirect to="sign-in" />;
    const spinnerUnhide = this.state.didSubmit === true
      ? ''
      : 'd-none';
    const submitBtnHide = this.state.didSubmit === false
      ? ''
      : 'd-none';
    return (
      <div className='mx-auto width-540'>
        <div className="row">
          <div className="col text-center mt-3">
            <h1>Create a new post</h1>
          </div>
        </div>
        <div className="row">
          <div className="col mb-4 mt-3">
            <div
            style={{ backgroundImage: `url(${this.state.file})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
              className="bubble large-bubble mx-auto d-flex justify-content-center align-items-center">
              <label htmlFor="icon-btn-file">
                <i className="fa-solid fa-plus fa-3x text-info"></i>
              </label>
              <input
                required
                type="file"
                name="image"
                ref={this.fileInputRef}
                accept='.png, .jpg, .jpeg, .gif, .webp'
                id="icon-btn-file"
                className='d-none'
                onChange={this.handleFileChange}/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <form onSubmit={this.handleSubmit}>
              <div className="mb-3">
                <input
                  required type="text"
                  className="form-control"
                  placeholder="Tags (separated by commas)"
                  name="tags" onChange={this.handleTagsChange}
                  value={this.state.tags} />
              </div>
              <div className="mb-4">
                <textarea
                  required type="text"
                  className="form-control form-ta-size"
                  placeholder="What would you like to say?"
                  name="caption" onChange={this.handleCaptionChange}
                  value={this.state.caption} />
              </div>
              <div className="mb-3 text-center d-flex justify-content-center align-items-center">
                <button type="submit" className={`btn btn-info btn-lg text-white rounded-pill ${submitBtnHide}`}>POST</button>
                <button className={`btn btn-info rounded-pill btn-lg d-flex ${spinnerUnhide}`} type="button" disabled>
                  <span className="spinner-border spinner-border text-white" role="status" aria-hidden="true"></span>
                  <span className="visually-hidden">Loading...</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default PostForm;

PostForm.contextType = AppContext;
