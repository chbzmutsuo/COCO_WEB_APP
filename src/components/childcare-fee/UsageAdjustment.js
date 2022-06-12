import React from 'react';
import { useState, useEffect, useContext, } from 'react'
import { FloatingLabel, Form } from 'react-bootstrap';
import { UsageAdjustmentMaster } from '../../lib/childcare';

const UsageAdjustment = () => {
	const [result, setresult] = useState({})
	const [parentCondition, setparentCondition] = useState('')
	const [choices, setchoices] = useState(UsageAdjustmentMaster)

	console.log({ parentCondition })   //////////


	return (
		<div>

			<Form>
				<div className='w-full p-1'>
					<FloatingLabel controlId="floatingSelect" label="保護者の状況">
						<Form.Select aria-label="Floating label select example" onChange={(e) => setparentCondition(e.target.value)} >
							<option value="">選択してください</option>
							{Object.keys(choices.parentCondition).map((key, index) => {
								const optGroup = choices.parentCondition[key]
								const { firstChoice, secondChoiceValue } = optGroup

								return <optgroup key={index} label={firstChoice}>
									{secondChoiceValue.map((choiceValue, index) => {
										const { choice, rank } = choiceValue
										return <option key={index} value={rank}>{choice}</option>
									})}
								</optgroup>



							})}

						</Form.Select>
					</FloatingLabel>
				</div>


				<div className='w-full p-1'>
					<FloatingLabel controlId="floatingSelect" label="保護者の状況">
						<Form.Select aria-label="Floating label select example" onChange={(e) => setparentCondition(e.target.value)} >
							<option value="">選択してください</option>
							{Object.keys(choices.adjustmentIndex).map((key, index) => {
								const optGroup = choices.adjustmentIndex[key]
								const { firstChoice, secondChoiceValue } = optGroup

								return <optgroup key={index} label={firstChoice}>
									{secondChoiceValue.map((choiceValue, index) => {
										const { choice, indexNumber } = choiceValue
										console.log(choiceValue)   //////////
										return <option key={index} value={indexNumber}>{choice}</option>
									})}
								</optgroup>



							})}

						</Form.Select>
					</FloatingLabel>
				</div>
			</Form >

			<div>

				<div>
					<p className=' flex flex-row space-x-4'>
						<span>保護者の状況</span>
						<span>{parentCondition}</span>
					</p>
				</div>

			</div>
		</div >

	);
}

export default UsageAdjustment;
