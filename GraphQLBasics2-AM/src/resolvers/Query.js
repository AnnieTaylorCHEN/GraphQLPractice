const Query = {
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
	posts(parent, args, { db }, info) {
		if (args.query) {
			return posts.filter((post) =>
				post.title.toLowerCase().includes(args.query.toLowerCase())
			);
		} else {
			return db.posts;
		}
	},
	comments(parent, args, { db }, info) {
		return db.comments;
	},
	users(parent, args, { db }, info) {
		return db.users;
	},
};
export { Query as default };
