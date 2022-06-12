import React from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'
import { useState, useEffect, useContext, } from 'react';
import BtnBasic from '@components/common/BtnBasic';
import { insertGenba } from '../../lib/hasura';
import { Genba } from '../../lib/hasura/Genba';
import { useRouter } from 'next/router';

export default function Create() {
	const router = useRouter()
	const [bukken_number, setbukken_number] = useState('')
	const [genba_name, setgenba_name] = useState('')
	const [genba_address, setgenba_address] = useState('')
	const [billing, setbilling] = useState('')
	const [outsourcing_price, setoutsourcing_price] = useState('')

	const createGenba = async () => {
		const body = { bukken_number, genba_name, genba_address, billing, outsourcing_price, }
		const result = await Genba.insertGenba(body)
		const { data, errors } = result
		if (!errors) { alert("データを登録しました"); router.replace('/genbas') }
		else { alert("入力が間違っています") }
	}

	return (
		<div>
			<h2>現場新規作成</h2>
			<p>入力する項目をクリック</p>

			<div className='flex flex-wrap '>
				<div className='w-1/2 p-1'>
					<FloatingLabel controlId="floatingInput" label="物件番号" className="mb-3 text-yellow-600">
						<Form.Control type="number" placeholder="物件番号" value={bukken_number} onChange={(e) => { setbukken_number(e.target.value) }} />
					</FloatingLabel>
				</div>

				<div className='w-1/2 p-1'>
					<FloatingLabel controlId="floatingInput" label="現場名" className="mb-3 text-yellow-600">
						<Form.Control type="text" placeholder="現場名" value={genba_name} onChange={(e) => { setgenba_name(e.target.value) }} />
					</FloatingLabel>
				</div>
				<div className='w-1/2 p-1'>
					<FloatingLabel controlId="floatingInput" label="住所" className="mb-3 text-yellow-600">
						<Form.Control type="text" placeholder="住所" value={genba_address} onChange={(e) => { setgenba_address(e.target.value) }} />
					</FloatingLabel>
				</div>
				<div className='w-1/2 p-1'>
					<FloatingLabel controlId="floatingInput" label="請求額" className="mb-3 text-yellow-600">
						<Form.Control type="number" placeholder="請求額" value={billing} onChange={(e) => { setbilling(e.target.value) }} />
					</FloatingLabel>
				</div>
				<div className='w-1/2 p-1'>
					<FloatingLabel controlId="floatingInput" label="外注費用" className="mb-3 text-yellow-600">
						<Form.Control type="number" placeholder="外注費用" value={outsourcing_price} onChange={(e) => { setoutsourcing_price(e.target.value) }} />
					</FloatingLabel>
				</div>


			</div>
			<BtnBasic center onClick={createGenba}>作成</BtnBasic>




		</div>
	)
}


// id- integer, primary key, unique, default: nextval('genbas_id_seq'::regclass)
// genba_name- text
// genba_address- text
// billing- integer
// outsourcing_price- integer
// member_id- integer, nullable
// owner_id- integer, nullable
// created_at- timestamp with time zone, nullable, default: now()
// updated_at- timestamp with time zone, nullable, default: now()
// bukken_number- integer, nullable
