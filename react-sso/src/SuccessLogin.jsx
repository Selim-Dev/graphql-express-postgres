import React from 'react'
import { useEffect } from 'react'

const SuccessLogin = () => {
	useEffect(()=>{
		setTimeout(()=>{
			window.close()
		},2000)
	},[])
	return (
		<div>Login Success</div>
	)
}

export default SuccessLogin