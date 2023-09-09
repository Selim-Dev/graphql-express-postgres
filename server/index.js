const express = require('express')
const {ApolloServer} = require('apollo-server-express')
const cookieSession = require('cookie-session')
const passport = require('passport')
require('dotenv').config()
const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/typeDefs')

const app = express()
const api = require('./api')
require('./models/User')
require('./auth/loginWithGoogle')
//req.user




app.use(express.json())
app.use(express.urlencoded({extended: true}))
// cookie session
app.use(cookieSession({
	maxAge: 24 * 60 * 60 * 1000,// iday
	keys: [process.env.COOKIE_KEY]
}))

// calling passport initialization
app.use(passport.initialize())
app.use(passport.session())


app.use('/api/v1',api)



let apolloServer ;
// graphQL 
async function startServer(){
	apolloServer = new ApolloServer({
		typeDefs,
		resolvers,
		context: (req,res)=>{
			console.log("🚀 ~ file: index.js:42 ~ startServer ~ req:", req)
			return {user: req?.user ? req.user : null}
		}
	})
	await apolloServer.start();	
	apolloServer.applyMiddleware({app})
}

startServer();

/// express server
const port = 5000;

app.listen(port, ()=>{
		console.log(`Server is running on port ${port}`)
})