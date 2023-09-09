import React from 'react'

import GoogleButton from 'react-google-button'

const Login = () => {
	const redirectToGoogleSSo = async () => {
		const googleLoginUrl = 'http://localhost:5000/api/v1/login/google'
		const newWindow = window.open(googleLoginUrl, "__blank", "width=500,height=600", "noopener , noreferrer")
		let timer= null ;
		if(newWindow){
			timer = setInterval(()=>{
				if(newWindow.closed){
					console.log('yaaaaaaaaaaaay authenticated')
					if(timer) clearInterval(timer)
				}
			},500)
		}

	}
	return (
		<GoogleButton onClick={redirectToGoogleSSo}/>
	)
}

export default Login