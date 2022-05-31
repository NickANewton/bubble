import React from 'react';

class PostForm extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          <div className="bubble mx-auto mb-5 mt-5 d-flex justify-content-center align-items-center">
            <img src="" alt="" />
          </div>
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
    );
  }
}

export default PostForm;
