import React from 'react';
import PostForm from './components/postForm';
import BottomNav from './components/bottom-nav';
import CustomContainer from './pages/custom-container';
import BubblesRight from './components/bubbles-right';
import { parseRoute } from './lib';
import Feed from './pages/feed';

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
    if (route.path === 'create-post') {
      return <PostForm />;
    }
  }

  render() {
    return (
    <>
      <CustomContainer>
        <BottomNav />
        { this.renderPage() }
        <BubblesRight />
      </CustomContainer>
    </>
    );
  }
}
