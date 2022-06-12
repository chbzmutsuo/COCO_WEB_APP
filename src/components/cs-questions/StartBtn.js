import React from 'react';
import BtnBasic from "@components/common/BtnBasic"

const StartBtn = ({ onClick, className }) => {
	return (
		<div>
			<BtnBasic center={true} fromScratch className={`bg-green-700 text-white rounded-2xl px-4 py-1 text-2xl ${className}`} onClick={onClick}>はじめる</BtnBasic>
		</div>
	);
}

export default StartBtn;
