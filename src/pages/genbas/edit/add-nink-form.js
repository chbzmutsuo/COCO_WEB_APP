import React from 'react'
import { useState, useEffect, useContext, } from 'react'
import { Form } from 'react-bootstrap';

export default function AddNinkForm({ members }) {
	const [memberListCount, setmemberListCount] = useState([
		{ memberId: '', nink: null },
		{ memberId: '', nink: null },
		{ memberId: '', nink: null },
	]);

	const setMember = (e) => {
		let newObj = memberListCount

		newObj[e.target.dataset.index].memberId = e.target.value
		setmemberListCount(newObj)
		console.log(memberListCount)   //////////
	}
	return (
		<section className=''>
			<h3>人工登録</h3>

			<div><span>	<Form.Control type="date" placeholder="" /></span></div>
			<ul >
				{memberListCount.map((member, index) => {
					console.log(memberListCount[index].memberId)   //////////
					return <li key={index} className='flex flex-row space-x-4 m-2'>

						<Form.Select bsPrefix='form-select h-10 ' value={memberListCount[index].memberId} onChange={setMember} data-index={index}>
							<option value="">従業員選択</option>
							{members.map(each => {
								return <option key={each.member.id} value={each.member.id}>{each.member.name}</option>
							})}
						</Form.Select>
						<Form.Control type="number" placeholder="人工を入力" />
					</li>
				})}
			</ul>

			<button onClick={() => { memberListCount.push({ memberId: '', nink: null },) }}>add</button>

		</section >
	)
}
