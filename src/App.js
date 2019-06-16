// src.App.js

import React, {Component} from 'react';
import './App.css';
import Header from './components/Header';
import Posts from './components/Posts';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";
import Pusher from 'pusher-js';

const client = new ApolloClient({
  uri : "http://localhost:4000/graphql"
});

// create component
class App extends Component{
  constructor(){
    super();
    //connect to Pusher
    this.pusher = new Pusher("Pusher_APP_KEY", {
      cluster: "eu",
      encrypted: true
    });
  }

  render (){
  return (
    <ApolloProvider client={client}>
     <div className="App">
        <Header />
        <section className="App-main">
          {/* pass the pusher object and apollo to the post component */}
          <Posts pusher={this.pusher} apollo_client={client}/>
        </section>
      </div>
    </ApolloProvider>
  );
  }
}

export default App;
