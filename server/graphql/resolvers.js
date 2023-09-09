const User = require('../models/User')
const books = [
	{
		title: 'The Awakening',
		author: 'Kate Chopin',
	},{
		title: 'City of Glass',
		author: 'Paul Auster',
	}
]


const resolvers = {
	Query: {
		books : (parent, args, context)=>{
			if(!context.user) return null
			// call to database
			// perform any operatton
			return books
		},
		users:  async () => {
			// call to database
			const users = await User.findAll();
			return users

		}
	}

}



module.exports = resolvers;