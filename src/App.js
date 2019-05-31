// src.App.js

import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Post from './components/Post';

class App extends Component {
  render() {
    return <div className="App">
        <Header />
        <section className="App-main">
          <Post nickname="Rosler" avatar="https://avatars0.githubusercontent.com/u/11508340?s=460&v=4" caption="Growing one project at a time" image="https://static01.nyt.com/images/2018/06/26/arts/design/26banksy2/merlin_140236308_c92f6d2c-a041-46b7-b660-09fabce9ed5a-superJumbo.jpg?quality=90&auto=webp" />
          <Post nickname="OG" avatar="https://avatars0.githubusercontent.com/u/11508340?s=460&v=4" caption="Galaxy in Jankai" image="https://target.scene7.com/is/image/Target/GUEST_6aa19f7f-43e2-4531-b9b8-ed3f28ee5695?wid=488&hei=488&fmt=webp" />

          {/* more post */}
        </section>
      </div>;
  }
}

export default App;
