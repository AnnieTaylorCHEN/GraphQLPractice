const express = require('express');
const { graphqlHTTP} = require('express-graphql');

const app = express();

app.use(
	'/graphql',
	graphqlHTTP({
		graphiql: true,
	})
);

app.listen(4000, () => {
	console.log('server is starting at port 4000! ');
});
