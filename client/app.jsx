import React from 'react';
import PostForm from './components/postForm';
import BottomNav from './components/bottom-nav';
import CustomContainer from './pages/custom-container';
import BubblesRight from './components/bubbles-right';
import { parseRoute } from './lib';
import Feed from './pages/feed';
import PostDetails from './pages/post-details';
import AuthPage from './pages/auth';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.onhashchange = () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    };
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Feed />;
    }
    if (route.path === 'sign-up') {
      return <AuthPage />;
    }
    if (route.path === 'create-post') {
      return <PostForm />;
    }
    if (route.path === 'posts') {
      const postId = route.params.get('postId');
      return <PostDetails postId={postId}/>;
    }
  }

  render() {
    const { route } = this.state;
    return (
        <>
          <CustomContainer>
            <BottomNav action={route.path} />
            { this.renderPage() }
          <BubblesRight action={route.path} />
          </CustomContainer>
        </>
    );
  }
}
