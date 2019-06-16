// src/components/Posts/index.js
import React, {Component} from "react";
import "./Posts.css";
import { Query, renderToStringWithData } from "react-apollo";
import gql from "graphql-tag";
import Post from  "../Post";

class Posts extends Component{
    constructor(){
        super();
        this.state = {
            posts : []
        }
    }

componentDidMount(){
    //fetch the initial posts
    this.props.apollo_client
        .query({
            query:gql`
                {
                    posts(user_id: "a"){
                        id
                        user{
                            nickame
                            avatar
                        }
                        image
                        caption
                    }
                }
        `})
        .then(response => {
            this.setState({ posts: response.data.posts});
        });
}

    // subscribe to posts channel
    this.posts_channel = this.props.pusher.subscribe('posts-channel');

    // listen for a new post
    this.posts_channel.bind("new-post", data => {
        this.setState({ posts: this.state.posts.concat(data.post) });
        }, this);
}



        {({loading, error, data}) =>{
            if (loading) return <p>Loading Post...</p>;
            if (error) return <p>Error Fetching Posts...</p>;
            let posts = data.posts;
            render(){
                return  (
                <div className="Posts">
                    {posts.map(post => <Post nickname={post.user.nickname} avatar={post.user.avatar} image={post.image} caption={post.caption} key={post.id}/>)}
                </div>;
            );
          }
        }

    export default Posts;