import React from 'react';
import PostForm from './components/postForm';
import BottomNav from './components/bottom-nav';

export default class App extends React.Component {
  render() {
    return (
    <>
    <div className="container">
      <PostForm />
    </div>
    <BottomNav />
    </>
    );
  }
}
