import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

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
    const { route } = this.context;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/auth/${route.path}`, req)
      .then(res => res.json())
      .then(result => {
        if (route.path === 'sign-up') {
          window.location.hash = 'sign-in';
          this.setState({
            username: '',
            password: ''
          });
        } else if (result.user && result.token) {
          this.context.handleSignIn(result);
        }
      });
  }

  render() {
    const { user, route } = this.context;

    if (user) return <Redirect to="" />;

    const submitBtnText = route.path === 'sign-up'
      ? 'SIGN UP'
      : 'SIGN IN';
    const altLinkText = route.path === 'sign-up'
      ? 'Sign-In'
      : 'Sign-Up';
    const altHash = route.path === 'sign-up'
      ? '#sign-in'
      : '#sign-up';
    const altMessage = route.path === 'sign-up'
      ? 'Sign-up to create an account'
      : 'Please sign-in to continue';
    return (
    <div className="mx-auto width-540">
      <div className="row">
        <div className="col d-flex justify-content-center align-items-center mt-3 mb-3">
            <div className="bubble large-bubble d-flex justify-content-center align-items-center">
              <h1 className="text-info app-logo">Bubble</h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ul className="nav mb-2">
            <li className="nav-item h2 d-flex">
              <a href={altHash} className="text-secondary">{altLinkText}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col">
            <form onSubmit={this.handleSubmit}>
              <div className="mb-3">
                <input
                  required
                  autoFocus
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Username"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}/>
              </div>
              <div className="mb-3">
                  <input
                    required
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}/>
              </div>
              <div className='mb-3'>
                <p className='text-center'>{altMessage}</p>
              </div>
              <div className="mb-3 text-center">
                <button
                  type="submit"
                  className="btn btn-info btn-lg text-white rounded-pill">
                  {submitBtnText}
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

AuthPage.contextType = AppContext;
