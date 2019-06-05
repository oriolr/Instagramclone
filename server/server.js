// server/server.js

let express = require("express");
let graphqlHTTP = require("express-graphql");
let { buildSchema } = require("graphql");
let cors = require("cors");
let Pusher = require("pusher");
let bodyParser = require("body-parser");
let Multipart = require("connect-multiparty");

let schema = buildSchema(`
    type User {
        id : String!
        nickname : String!
        avatar : String!
    }

    type Post {
        id: String!
        user: User!
        caption : String!
        image : String!
    }
    type Query{
        user(id: String) : User!
        post(user_id: String, post_id: String) : Post!
        posts(user_id: String) : [Post]
    }
`);


// Maps id to User object
let userslist = {
    a: {
        id: "a",
        nickname: "Rosler",
        avatar: "https://avatars0.githubusercontent.com/u/11508340?s=460&v=4"
    },
};

let postslist = {
    a: {
        a:{
            id: "a",
            user: userslist["a"],
            caption: "Growing one project at a time",
            image: "https://static01.nyt.com/images/2018/06/26/arts/design/26banksy2/merlin_140236308_c92f6d2c-a041-46b7-b660-09fabce9ed5a-superJumbo.jpg?quality=90&auto=webp"
        },
        b: {
            id: "b",
            user: userslist["a"],
            caption: "Angular Book :)",
            image: "https://cdn-images-1.medium.com/max/1000/1*ltLfTw87lE-Dqt-BKNdj1A.jpeg"
        },
        c: {
            id: "c",
            user: userslist["a"],
            caption: "Me at Frontstack.io",
            image: "https://pbs.twimg.com/media/DNNhrp6W0AAbk7Y.jpg:large"
        },
        d: {
            id: "d",
            user: userslist["a"],
            caption: "Moviing the community",
            image: "https://pbs.twimg.com/media/DOXI0IEXkAAkokm.jpg"
        }
    }
};

//The root provides a resolver function for each API endpoint
let root = {
    user: function({ id }) {
        return userslist[id];
    },
    post: function({ user_id , post_id }) {
        return postslist[user_id][post_id];
    },
    post: function({ user_id }){
        return Object.values(postslist[user_id]);
    }
};

let app = express();
app.use(cors());
app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true
    })
);
// set application port
app.listen(4000);