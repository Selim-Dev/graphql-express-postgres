const express = require('express');
const loginWithGoogleApi = require('./loginWithGoogle');

const router = express.Router();



router.use(loginWithGoogleApi);


module.exports = router;