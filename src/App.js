import React from 'react';
import './App.css';
import PostList from "./PostList";

function App() {
  return (
    <div className="App">
      <header>
        <h1>帖子列表</h1>
      </header>
      <PostList />
    </div>
  );
}

export default App;
