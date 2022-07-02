import React from 'react';
import jwtDecode from 'jwt-decode';
import AppContext from './lib/app-context';
import PostForm from './components/post-form';
import BottomNav from './components/bottom-nav';
import CustomContainer from './pages/custom-container';
import BubblesRight from './components/bubbles-right';
import { parseRoute } from './lib';
import Feed from './pages/feed';
import PostDetails from './pages/post-details';
import AuthPage from './pages/auth';
import Profile from './pages/profile';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidMount() {
    window.onhashchange = () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    };
    const token = window.localStorage.getItem('bubble-jwt');
    const user = token ? jwtDecode(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('bubble-jwt', token);
    this.setState({ user });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Feed />;
    }
    if (route.path === 'sign-up' || route.path === 'sign-in') {
      return <AuthPage key={route.path} />;
    }
    if (route.path === 'create-post') {
      return <PostForm />;
    }
    if (route.path === 'posts') {
      const postId = route.params.get('postId');
      return <PostDetails postId={postId} key={postId}/>;
    }
    if (route.path === 'profile') {
      return <Profile />;
    }
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const { handleSignIn } = this;
    const contextValue = { user, route, handleSignIn };

    return (
      <AppContext.Provider value={contextValue}>
        <>
          <CustomContainer>
            <BottomNav/>
            { this.renderPage() }
            <BubblesRight/>
          </CustomContainer>
        </>
    </AppContext.Provider >
    );
  }
}
