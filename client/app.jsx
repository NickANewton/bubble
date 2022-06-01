import React from 'react';
import PostForm from './components/postForm';
import BottomNav from './components/bottom-nav';
import CustomContainer from './pages/custom-container';
import BubblesRight from './components/bubbles-right';

export default class App extends React.Component {
  render() {
    return (
    <>
      <CustomContainer>
        <BottomNav />
        <PostForm />
        <BubblesRight />
      </CustomContainer>
    </>
    );
  }
}
