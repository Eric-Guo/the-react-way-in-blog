import React from 'react';
import { BrowserRouter } from "react-router-dom";
import PostList from "./components/PostList";

function App() {
  return (
    <BrowserRouter>
      <PostList />
    </BrowserRouter>
  );
}

export default App;
