import React from 'react';

export default class AuthPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/auth/sign-up', req)
      .then(res => res.json())
      .then(result => {
        window.location.hash = 'sign-up';
      });
  }

  render() {
    return (
    <div className="container">
      <div className="row">
        <div className="col d-flex justify-content-center align-items-center mt-3 mb-3">
            <div className="bubble large-bubble d-flex justify-content-center align-items-center">
              <h1 className="text-info app-logo">Bubble</h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ul className="nav">
            <li className="nav-item h2">
              <a href="#" className="nav-link text-black">Sign Up</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <form>
            <div className="mb-3">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Username"
                name="username"
                onChange={this.handleChange}/>
            </div>
            <div className="mb-4">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  name="password"
                  onChange={this.handleChange}/>
            </div>
            <div className="mb-3 text-center text-">
              <button
                type="submit"
                className="btn btn-info btn-lg text-white rounded-pill"
                onSubmit={this.onSubmit}>
                SIGN UP
              </button>
            </div>
          </form>
        </div>
      </div>
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-between align-items-center">
              <div className="bubble" style={{ height: 4.688 + 'rem', width: 4.688 + 'rem' }}></div>
              <div className="bubble" style={{ height: 6.25 + 'rem', width: 6.25 + 'rem' }}></div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="ms-5">
              <div className="bubble" style={{ height: 6.25 + 'rem', width: 6.25 + 'rem' }}></div>
            </div>
          </div>
        </div>
    </div>
    );

  }
}
