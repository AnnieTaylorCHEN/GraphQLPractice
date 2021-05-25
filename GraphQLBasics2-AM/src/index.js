import { GraphQLServer } from 'graphql-yoga';
import { v4 as uuidv4 } from 'uuid';

// Dummy data

let users = [
	{
		id: 'user-1',
		name: 'Annie',
		email: 'annie@annie.com',
		postsTotal: 2,
	},
	{
		id: 'user-2',
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
];
let posts = [
	{
		id: '1',
		title: 'Chocolate Balls with Crunchy Peanut Butter Filling',
		body: 'Spice your fika time (Swedish coffee break) with those lovely chocolate balls with peanut butter fillings!',
		published: true,
		author: 'user-1',
	},
	{
		id: '2',
		title: 'How to Take Back Your Time',
		body: 'Determine never to be idle. No person will have occasion to complain of the want of time who never loses any. It is wonderful how much may be done if we are always doing.',
		published: false,
		author: 'user-2',
	},
	{
		id: '3',
		title: 'Wholewheat Vegetable Muffin with Poppy Seeds',
		body: 'In the dark, long, cold winter of Sweden, having a bowl of warm soup is such as great comfort, especially when you just come back from freezing outside. When we are not very hungry, then we eat mixed vegetable soup with some vegetable muffins. If you don’t like store-bought bread but don’t have time to make a loaf of fresh bread by yourself, the muffins are a simple and quick fix.',
		published: true,
		author: 'user-1',
	},
];

let comments = [
	{
		id: 'comment-1',
		text: 'Non irure dolore aute labore deserunt veniam pariatur consectetur commodo.',
		author: 'user-1',
		post: '1',
	},
	{
		id: 'comment-2',
		text: 'Eu commodo ut Lorem enim cupidatat laboris aute pariatur laboris.',
		author: 'user-1',
		post: '2',
	},
	{
		id: 'comment-3',
		text: 'Ipsum officia anim pariatur consequat consectetur aute ipsum.',
		author: 'user-2',
		post: '3',
	},
	{
		id: 'comment-4',
		text: 'Aliquip sunt culpa aliquip qui cillum laboris ipsum nostrud aliqua.',
		author: 'user-3',
		post: '1',
	},
];

//Type definitions (schema)
const typeDefs = `
    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments:[Comment!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        postsTotal: Int
        posts: [Post!]!
        comments:[Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }

    type Mutation {
        createUser(data: CreateUserInput): User!
		deleteUser(id: ID!):User!
        createPost(data: CreatePostInput): Post!
		deletePost(id: ID):Post!
        createComment(data: CreateCommentInput): Comment!
		deleteComment(id: ID!):Comment!
    }

	input CreateUserInput {
		name: String!
		email: String!
		age: Int
	}

	input CreatePostInput {
		title: String!
		body: String!
		published: Boolean!
		author: ID!
	}

	input CreateCommentInput {
		text: String!
		author: ID!
		post: ID!
	}

    type Query {
        post: Post!
        add(numbers: [Float!]!):Float!
        posts (query: String): [Post!]!
        comments: [Comment!]!
        users: [User!]!
    }
`;

//Resolvers
const resolvers = {
	Query: {
		post() {
			return {
				id: '1',
				title: 'post title',
				body: 'lorem',
				published: false,
			};
		},
		add(parent, args, ctx, info) {
			if (args.numbers.length === 0) {
				return 0;
			} else {
				return args.numbers.reduce((acc, cv) => {
					return acc + cv;
				});
			}
		},
		posts(parent, args, ctx, info) {
			if (args.query) {
				return posts.filter((post) =>
					post.title.toLowerCase().includes(args.query.toLowerCase())
				);
			} else {
				return posts;
			}
		},
		comments(parent, args, ctx, info) {
			return comments;
		},
		users(parent, args, ctx, info) {
			return users;
		},
	},
	Post: {
		author(parent, args, ctx, info) {
			return users.find((user) => user.id === parent.author);
		},
		comments(parent, args, ctx, info) {
			return comments.filter((comment) => comment.post === parent.id);
		},
	},
	User: {
		posts(parent, args, ctx, info) {
			return posts.filter((post) => post.author === parent.id);
		},
		comments(parent, args, ctx, info) {
			return comments.filter((comment) => comment.author === parent.id);
		},
	},
	Comment: {
		author(parent, args, ctx, info) {
			return users.find((user) => user.id === parent.author);
		},
		post(parent, args, ctx, info) {
			return posts.find((post) => post.id === parent.post);
		},
	},
	Mutation: {
		createUser(parent, args, ctx, info) {
			const emailTaken = users.some((user) => user.email === args.data.email);

			if (emailTaken) {
				throw new Error('Email taken');
			}

			const user = {
				id: uuidv4(),
				...args.data
			};

			users.push(user);

			return user;
		},
		deleteUser(parent, args, ctx, info) {
			const userIndex = users.findIndex( user => user.id === args.id)

			if (userIndex === -1){
				throw new Error('User not found')
			}

			const deletedUsers = users.splice(userIndex, 1)

			posts = posts.filter(post => {
				const match = post.author === author.id

				if (match) {
					comments = comments.filter(comment => comment.post !== post.id)
				}
				return !match
			})
			comments = comments.filter(comment => comment.author !== args.id)

			return deletedUsers[0]
		},
		createPost(parent, args, ctx, info) {
			const userExists = users.some((user) => user.id === args.data.author);

			if (!userExists) {
				throw new Error('User not found');
			}
			const post = {
				id: uuidv4(),
				...args.data
			};

			posts.push(post);
			return post;
		},
		deletePost(parent, args, ctx, info){
			const postIndex = posts.findIndex(post => post.id === args.id)

			if (postIndex === -1){
				throw new Error('post not found')
			}

			const deletedPosts = posts.splice(postIndex, 1)

			comments = comments.filter( comment => comment.post !== args.id)

			return deletedPosts[0]
		},
		createComment(parent, args, ctx, info) {
			const userExists = users.some((user) => user.id === args.data.author);
			const postExists = posts.some((post) => post.id === args.data.post);

			if (!userExists || !postExists) {
				throw new Error('user or post does not exist');
			}

			const comment = {
				id: uuidv4(),
				...args.data
			};

			comments.push(comment);
			return comment;
		},
		deleteComment(parent, args, ctx, info){
			const commentIndex = comments.findIndex(comment => comment.id === args.id)

			if (commentIndex === -1){
				throw new Error('comment not found')
			}

			const deletedComments = comments.splice(commentIndex, 1)
			return deletedComments[0]
		}
	},
};

const server = new GraphQLServer({
	typeDefs,
	resolvers,
});

server.start(() => {
	console.log('the graphql server is running!');
});
