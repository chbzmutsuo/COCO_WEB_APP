import React from 'react'

export default function Center({ children, className }) {
	return (
		<div className={`text-center mx-auto w-full ${className} `} > {children}</ div>
	)
}
