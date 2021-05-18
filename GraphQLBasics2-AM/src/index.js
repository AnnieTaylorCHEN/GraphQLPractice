import {GraphQLServer } from 'graphql-yoga'

// Dummy data 

const users = [
    {
        id: 'user-1',
        name: 'Annie',
        email: 'annie@annie.com',
        postsTotal: 2,
    },
    {
        id: 'user-12',
        name: 'Taylor',
        email: 'taylor@taylor.com',
        postsTotal: 5,
    },
    {
        id: 'user-3',
        name: 'Betty',
        email: 'betty@betty.com',
        postsTotal: 9,
    },
]
const posts = [
    {
        id: '1',
        title: 'Chocolate Balls with Crunchy Peanut Butter Filling',
        body: 'Spice your fika time (Swedish coffee break) with those lovely chocolate balls with peanut butter fillings!',
        published: true,
        author: 'user-1'
    },
    {
        id: '2',
        title: 'How to Take Back Your Time',
        body: 'Determine never to be idle. No person will have occasion to complain of the want of time who never loses any. It is wonderful how much may be done if we are always doing.',
        published: false,
        author: 'user-2'
    },
    {
        id: '3',
        title: 'Wholewheat Vegetable Muffin with Poppy Seeds',
        body: 'In the dark, long, cold winter of Sweden, having a bowl of warm soup is such as great comfort, especially when you just come back from freezing outside. When we are not very hungry, then we eat mixed vegetable soup with some vegetable muffins. If you don’t like store-bought bread but don’t have time to make a loaf of fresh bread by yourself, the muffins are a simple and quick fix.',
        published: true,
        author: 'user-1'
    },
]

//Type definitions (schema)
const typeDefs = `
    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        postsTotal: Int
        posts: [Post!]!
    }

    type Query {
        post: Post!
        add(numbers: [Float!]!):Float!
        posts (query: String): [Post!]!
    }
`

//Resolvers
const resolvers = {
    Query: {
        post(){
            return {
                id: '1',
                title: 'post title',
                body: 'lorem',
                published: false
            }
        },
        add(parent, args, ctx, info){
            if (args.numbers.length === 0 ) {
                return 0
            } else {
                return args.numbers.reduce((acc, cv) => { return acc + cv})
            }
        },
        posts( parent, args,ctx, info) {
            if (args.query) {
                return posts.filter(post => post.title.toLowerCase().includes(args.query.toLowerCase()))
            } else {
                return posts
            }
        }
    }, 
    Post: {
        author(parent, args, ctx, info){
            return users.find((user)=> user.id === parent.author )
        }
    }, 
    User: {
        posts(parent, args, ctx, info){
            return posts.filter((post) => post.author === parent.id)
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(()=> {
    console.log('the graphql server is running!')
})