const users = [
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
const posts = [
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

const comments = [
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

const db = {
	users,
	posts,
	comments,
};

export { db as default };
