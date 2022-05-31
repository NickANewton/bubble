import React from 'react';

class PostForm extends React.Component {
  render() {
    return (
      <>
        <div className="row">
          <div className="col text-center mt-3">
            <h1>Create a new post</h1>
          </div>
        </div>
        <div className="row">
          <div className="col mb-5 mt-3">
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
                <input type="text" className="form-control form-control-lg" placeholder="Tags (separated by commas)" name="tags" />
              </div>
              <div className="mb-4">
                <textarea type="text" className="form-control form-control-lg" placeholder="What would you like to say?" name="caption" />
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
