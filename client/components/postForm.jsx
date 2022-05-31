import React from 'react';

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: '',
      caption: ''
    };
    this.fileInputRef = React.createRef();
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleCaptionChange = this.handleCaptionChange.bind(this);
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

  render() {
    return (
      <>
        <div className="row">
          <div className="col text-center mt-3">
            <h1>Create a new post</h1>
          </div>
        </div>
        <div className="row">
          <div className="col mb-4 mt-3">
            <div className="bubble mx-auto d-flex justify-content-center align-items-center">
              <img src="" alt="" />
              <i className="fa-solid fa-plus fa-3x text-info"></i>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <form>
              <div className="mb-3">
                <input required type="text" className="form-control form-control-lg" placeholder="Tags (separated by commas)" name="tags" onChange={this.handleTagsChange} value={this.state.tags} />
              </div>
              <div className="mb-4">
                <textarea required type="text" className="form-control form-control-lg" placeholder="What would you like to say?" name="caption" onChange={this.handleCaptionChange} value={this.state.caption} />
              </div>
              <div className="mb-3 text-center text-">
                <button type="submit" className="btn btn-info btn-lg text-white rounded-pill">POST</button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default PostForm;
