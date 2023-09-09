const express = require('express');
const passport = require('passport')
const router = express.Router();

const successLoginUrl = 'http://localhost:3000/login/success';
const errorLoginUrl = 'http://localhost:3000/login/error';

router.get('/login/google',
	passport.authenticate("google",{scope: ['profile','email']})
);

router.get('/auth/google/callback',
	passport.authenticate("google",{
		failureMessage: "Failed to login with google",
		failureRedirect: errorLoginUrl,
		successRedirect:successLoginUrl 
	}),
	(req,res)=>{
		conhsole.log("🚀 ~ file: loginWithGoogle.js:16 ~ profile:", profile)
		res.redirect(successLoginUrl)
	}
)


module.exports = router;