import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { motion } from 'framer-motion'

export default function BtnClose({ onClick, className, style }) {
	return (
		<motion.div
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
		>
			<FontAwesomeIcon
				style={style}
				className={`text-2xl w-6 h-6 rounded-full   bg-slate-400 border-4 text-black p-2 ${className}`}
				icon={faClose}
				onClick={onClick} />
		</motion.div>
	)
}
